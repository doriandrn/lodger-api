/// <reference path="main.d.ts" />

import Debug from 'debug'
import { RxDatabase, RxDatabaseCreator, RxCollectionCreator, RxDocument } from 'rxdb'

import fs from 'fs'
import yaml from 'json2yaml'

import LodgerStore from '~/lib/Store'
import DB from '~/lib/DB'
import LodgerError from '~/lib/Error'

import { string_similarity } from '~/lib/helpers/search'
import { Taxonomy } from '~/lib/Taxonomy'

import { env } from '~/lib/defs/env'
import { Form } from '~/lib/Form'

/**
 * Taxonomies
 *
 * @enum {number}
 */
enum Taxonomii {
  Apartament, Asociatie, Bloc, Cheltuiala,
  Contor, Factura, Furnizor, Incasare,
  Serviciu, Utilizator
}

/**
 * Forms, includes each for Taxonomies
 *
 * @enum {number}
 */
enum Forms {
  Financiar, Preferinte
}

/**
 * Errors definitions
 *
 * @enum {string}
 */
enum Errors {
  missingDB = 'Missing database',
  invalidPluginDefinition = 'Invalid plugin definition',
  pluralsAlreadyDefined = 'Plurals are already defined, aborting',
  missingCoreDefinitions = 'Invalid Lodger build. Missing core definitions',
  invalidPreferenceIndex = 'Invalid preference index supplied',
  invalidPropertySupplied = 'Invalid property supplied',
  noPlural = 'Could not find plural definition for %%',
  missingData = 'Missing data %%',
  couldNotWriteFile = 'Cannot write file'
}

type FormsHolder = { [k in Taxonomie | Forms]: Form }

type BuildOptions = {
  dbCon: RxDatabaseCreator,
  usePersistedState?: boolean
  modules?: LodgerModule[]
}

interface LodgerPlugin {
  name: string
  install (): void
}

type NotificationType = 'error' | 'success' | 'info' | 'warn'

interface Notification {
  type: NotificationType,
  text: string
}

/**
 * The API
 *
 * @class Lodger
 * @implements {LodgerAPI}
 * @requires <rxdb> RxDatabase
 * @requires <vuex> VueX
 */
class Lodger {
  subscribers: SubscribersList = {
    main: {},
    registru: {},
    listeDePlata: {},
    statistici: {},
    playground: {}
    // altSubscriber: { ... }
  }

  buildOpts: BuildOptions = {
    dbCon: {
      name: 'Lodger/',
      adapter: 'memory',
      password: 'l0dg3rp4$$',
      ignoreDuplicate: Boolean(env === 'test')
    },
    usePersistedState: false
  }
  plugins: LodgerPlugin[] = []

  constructor (
    protected taxonomies: Taxonomy[],
    forms: FormsHolder,
    protected db: RxDatabase,
    readonly store: LodgerStore
  ) {
  }

  /**
   * Notifies the user about an update/change
   *
   * @kind Store action wrapper
   * @param {Notification} notification
   * @memberof Lodger
   */
  notify (notification: Notification) {
    this.store.dispatch('notify', notification)
  }


  /**
   * Cauta in searchMap
   * @param input - string de cautat
   * @alias Taxonomy.search
   */
  search (
    input: string,
    searchTaxonomy ?: Taxonomie
  ) {
    if (!input) return
    const debug = Debug('lodger:search')

    const searchMap = this.getters['searchMap']
    if (!searchMap) {
      debug('no search map found in getters, search not working !!')
      return
    }
    const results: SearchResults = {}

    Object.assign(results, {
      clear: () => {
        Object.keys(results).forEach(result => results[result] = [])
      }
    })

    Object.keys(searchMap).forEach(tax => {
      if (searchTaxonomy && searchTaxonomy !== tax) return
      const iterator = searchMap[tax].entries()
      results[tax] = []

      for (let [key, value] of iterator) {
        if (typeof value === 'function') continue
        const relevance = string_similarity(String(input), value)
        results[tax]
          .push({ id: key, relevance, value })
      }

      results[tax] = results[tax]
        .sort((a, b) => Number(a.relevance) - Number(b.relevance))
        .reverse()
        .slice(0, 6)
    })

    return results
  }

   /**
   * Subscribes to multiple taxonomies with
   * same criteria
   *
   * @memberof Lodger
   * @returns {void}
   *
   */
  subscribe (
    taxonomii: Taxonomy[],
    criteriuCerut ?: Criteriu,
    subscriberName : string = 'main',
  ) {
    // // always have it as an array
    // taxonomii = typeof taxonomii === 'string' ?
    //   Array(taxonomii) :
    //   taxonomii

    taxonomii.forEach(taxonomie => {
      taxonomie.subscribe(subscriberName, criteriuCerut)
    })
  }

  /**
   * Array of taxonomies that have no reference
   * root taxonomies
   *
   * @returns {Array}
   */
  get taxonomiesWithoutReference () {
    const { forms } = this
    return this.taxonomii.filter(tax => {
      const refs = forms[tax].referenceTaxonomies
      return !(refs && refs.length)
    })
  }

  /**
   * Sets a preference either in DB or store
   *
   */
  async setPreference (preference: string, value: any) {
    const debug = Debug('lodger:set')
    const { store } = this
    const allowedTaxonomies = ['client', 'user']
    if (!preference) throw new LodgerError(Errors.invalidPreferenceIndex)
    const taxonomy = preference.split('.')[0]
    if (!taxonomy || allowedTaxonomies.indexOf(taxonomy) < 0) {
      throw new LodgerError(Errors.invalidPreferenceIndex)
    }

    debug('setting preference', preference, value)

    switch (taxonomy) {
      case 'client':
        store.commit('preferences/update', {
          path: preference.replace('client.', ''),
          value
        })
        break

      case 'user':
        // db.collections.utilizator....
        break
    }
  }

  /**
   * Lodger Getters
   * All UI connects with this
   * combines DB & Store getters
   *
   */
  get getters () {
    return this.store.getters
  }


  /**
   * Combined preferences getter
   * gets values from DB and store
   */
  get preferences () {
    const { db, store } = this
    const preferences: Preferences = {
      client: store.getters.preferences,
      user: db.collections['preferences']
    }
    return preferences
  }

  /**
   * Init / build function
   *
   * Build steps: (order matters)
   * 1. Hook up the taxonomies
   * 2. Lodger Forms based on taxonomies
   * 3. DB
   * 4. Store
   *
   * @param {object} options
   * @returns {Lodger}
   *
   */
  static async build (options?: BuildOptions) {
    const debug = Debug('lodger:build')
    // custom options
    if (options) Object.assign(this.buildOpts, { ...options })
    const { dbCon } = options || buildOpts

    debug(`Building in ${env} mode ...`)

    // strings
    const taxes: Taxonomie[] = Object.keys(Taxonomii).filter(tax => typeof Taxonomii[tax as any] === 'number')
    const formsNames = [...taxes, ...Object.keys(Forms).filter(form => typeof Forms[form as any] === 'number')]

    // objects initializers / clses
    const forms: FormsHolder = Object.assign({},
      ...await Promise.all(formsNames.map(formName =>
        ({ [formName]: Form.load(formName) })
      ))
    )
    debug('frms', forms)
    const Taxonomies = Object.assign({}, ...taxes.map(tax => ( { [tax]: new Taxonomy(tax, forms[tax]) }) ))
    debug('Txs', Object.keys(Taxonomies))
    debug(`Loaded ${Object.keys(taxes).length} taxes ok.`)

    const _collections: RxCollectionCreator[] = taxes.map(tax => {
      // const f = Taxonomies[tax].form
      const f = forms[tax]
      const { name, plural, collection } = f
      debug('C', name, plural, collection)
      return collection
    })
    debug('cols', _collections)
    const db = await DB(_collections, dbCon)
    const store = new LodgerStore(taxes)

    // bind collections to taxonomies
    Object.keys(Taxonomies).forEach(tax => {
      debug('t', tax)
      Taxonomies[tax].collection = db.collections[Taxonomies[tax].plural]
    })

    /**
     * When a taxonomy item gets SELECTED,
     * try to call all DB methods for refrences of the taxonomy
     *
     */
    store.subscribe(async ({ type, payload }, state) => {
      const path = type.split('/')
      if (path[1] !== 'select') return
      const debug = Debug('lodger:SELECTstoreSubscriber')
      const tax = path[0]

      debug('payload', payload)
      if (!payload) return

      const id = typeof payload === 'string' ? payload : payload.id
      if (id === store.getters[`tax/selected`]) return

      const reference = { [`${tax}Id`]: id }
      const { referenceTaxonomies } = forms[tax]

      // taxonomies that depend on the selected tax and subscriber
      // todo: move from here
      const dependentTaxonomies: Taxonomie[] = []
      Object.keys(forms).forEach((taxForm) => {
        const { referenceTaxonomies } = forms[taxForm]
        if (!referenceTaxonomies || referenceTaxonomies.indexOf(tax) < 0) return
        dependentTaxonomies.push(<Taxonomie>taxForm)
      })
      debug(`${tax} dep taxes:`, dependentTaxonomies)

      // call methods of references documents
      referenceTaxonomies.forEach(async (refTax: Taxonomie) => {
        const refdoc = store.getters[`${refTax}/activeDoc`]
        // debug(`refdoc ${tax} (${refTax})`, refdoc)
        if (!refdoc) return
        const method = refdoc[`toggle_${tax}`]
        if (!method || typeof method !== 'function') return
        await method(id)
        debug(`called references methods for ${refTax}`)
      })

      // update find criteria in DH with selected Item
      if (dependentTaxonomies.length) {
        dependentTaxonomies.forEach(dTax => {
          const subscriber = payload.subscriber || 'main'
          const { plural } = forms[dTax]
          const holder = vueHelper.subsData[subscriber][plural]
          if (!holder || !holder.criteriu) return
          debug('asignez', dTax, subscriber, reference)
          holder.criteriu.find = { ...reference }

          // deselect
          store.dispatch(`${dTax}/select`, { id: null, subscriber })
        })
        debug('ass dun')
      }
    })

    debug('built')

    return new Lodger(
      Taxonomies,
      forms,
      db,
      store
    )
  }

  /**
   * Extend Lodger :)
   * Todo!
   *
   * @param {LodgerPlugin} plugin
   *
   */
  static use (plugin: LodgerPlugin) {
    const debug = Debug('lodger:use')
    if (!plugin || typeof plugin !== 'object') {
      throw new LodgerError(Errors.invalidPluginDefinition)
    }
    const { name } = plugin
    debug('using plugin', name)
    this.plugins.push(plugin)
  }

  /**
   * Destroys the Lodger instance
   *
   */
  async destroy () {
    await this.unsubscribeAll()
    await this.db.destroy()
  }

  /**
   * Exports the DB
   * as a YML file with ext .ldb
   * date is captured
   *
   */
  async export (path?: string, cryptedData?: boolean, filename?: string) {
    const debug = Debug('lodger:export')
    const json = await this.db.dump()
    const extension = 'ldb'
    if (!path) path = `${require('os').homeDir}/downloads/`

    if (!filename) {
      const date = new Date()
      filename = `LdgDB-${date}`
    }
    fs.writeFile(`${path}/${filename}.${extension}`, yaml.stringify(json), (e: Error) => {
      if (e) throw new LodgerError(Errors.couldNotWriteFile)
      debug(`written ${filename}.${extension} in path`)
    })
  }

  /**
   * TODO!!
   */
  async import () {

  }


  protected get subscribedTaxes () {
    return subscribedTaxes
  }

  /**
   * For taxonomies that have references
   * get the referred ids
   *
   * @returns {Object}
   */
  get activeReferencesIds () {
    const { getters } = this.store
    return (references: Taxonomie[]) => assignRefIdsFromStore({
      references,
      getters
    })
  }

}

export {
  Lodger,
  Errors,
  Taxonomii
}
