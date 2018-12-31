/// <reference path="main.d.ts" />

import Debug from 'debug'
import { RxDatabase, RxCollectionCreator, RxDocument } from 'rxdb'
import Vue from 'vue'

import fs from 'fs'
import yaml from 'json2yaml'

import vueHelper from '~/lib/R'

import LodgerStore from '~/lib/Store'
import { buildOpts, BuildOptions } from '~/lib/build/opts'
import { getCriteriu } from '~/lib/helpers/functions'
import { handleOnSubmit, assignRefIdsFromStore } from '~/lib/helpers/forms'
import DB from '~/lib/DB'
// import { Form } from '~/lib/Form'
import { LodgerError } from '~/lib/Errors'

import { string_similarity } from '~/lib/helpers/search'
import { TaxonomiesHolder, Taxonomy } from './lib/Taxonomy';

import { env } from '~/lib/defs/env'
import { Form } from './lib/Form';

const subscribers: SubscribersList = {
  main: {},
  registru: {},
  listeDePlata: {},
  statistici: {},
  playground: {}
  // altSubscriber: { ... }
}

enum Taxonomii {
  Apartament, Asociatie, Bloc, Cheltuiala,
  Contor, Factura, Furnizor, Incasare,
  Serviciu, Utilizator
}

enum Forms {
  Financiar, Preferinte
}


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


const plugins: LodgerPlugin[] = []

/**
 *
 * @class Lodger
 */
class Lodger {
  constructor (
    protected taxonomii: Taxonomy[],
    forms: FormsHolder,
    protected db: RxDatabase,
    readonly store: LodgerStore
  ) {
    // const debug = Debug('lodger:constructor')

    taxonomii.forEach(tax => {
      const { plural } = taxonomii[tax]

      Object.defineProperty(this, plural, {
        get () {
          return (subscriberName: string = 'main') => {
            try {
              return vueHelper.subsData[subscriberName][plural].items
            } catch (e) {
              throw new LodgerError('not yet defined. wait more! :) %%', { subscriberName, plural })
            }
          }
        }
      })
    })
  }

  /**
   * Notifies the user about an update/change
   *
   * @kind Store action wrapper
   * @param {LdgNotification} notification
   */
  notify (notification: LdgNotification) {
    // console.info(notification)
    // this.store.dispatch('notify', notification)
  }

  /**
   * Adds / updates an entry in the DB
   *
   * @param {Taxonomie} taxonomie
   * @param {any} data - any -> usually Object
   */
  async put (
    taxonomy: Taxonomie,
    data: any,
    subscriber ?: string
  ) {
    // const debug = Debug('lodger:put')
    if (!data || Object.keys(data).length < 1)
      throw new LodgerError(Errors.missingData, data)

    const {
      // db,
      // store,
      taxonomii
    } = this

    const { collection } = taxonomii[taxonomy]
    // if (!plural) throw new LodgerError(Errors.noPlural, taxonomy)

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = data._id ?
      'upsert' :
      'insert'

    // const form = forms[taxonomy]
    // const references = form.referenceTaxonomies
    // const referencesIds = this.activeReferencesIds(references)

    /**
     * add references, default values, etc
     */
    const internallyHandledData = handleOnSubmit(data, { referencesIds, store })

    /**
     * do the insert / upsert and following actions
     */
    try {
      const doc = await collection[method](internallyHandledData)
      const id = doc._id
      this.store.dispatch(`${taxonomy}/set_last`, id)
      this.select(taxonomy, { doc, id, subscriber })

      this.notify({
        type: 'success',
        text: `pus ${taxonomy} ${id}`
      })
      return doc
    } catch (e) {
      this.notify({
        type: 'error', text: String(e)
      })
    }
  }

  /**
   * Removes a Document from the DB
   *
   * @param taxonomie
   * @param id
   */
  async trash (taxonomie: Taxonomie, id: ItemID) {
    const { taxonomii } = this
    const { collection } = taxonomii[taxonomie]

    const doc: RxDocument<Taxonomii> = await collection.findOne(id)
    return await doc.remove()
  }

  /**
   * select an item
   * brings in the active Document from DB
   *
   * @param taxonomie
   * @param id
   */
  async select (
    taxonomie: Taxonomie,
    data: SelectedItemData
  ) {
    const debug = Debug('lodger:select')
    const { dispatch } = this.store
    const form  = this.forms[taxonomie]
    if (!form) throw new LodgerError('invalid taxonomy %%', taxonomie)

    const { plural } = form
    const isObj = typeof data === 'object' && data !== null

    const id = isObj && data.id ? data.id : data
    const subscriber = isObj && data.subscriber ? data.subscriber : undefined

    await dispatch(`${taxonomie}/select`, id)

    // // deselect
    // if (!id) {
    //   await dispatch(`${taxonomie}/select`, undefined)
    //   return
    // }

    // // delay this, await for changes from rxdbb
    // const doc = isObj && data.doc ?
    //   data.doc :
    //   await vueHelper.getItem(plural, id, subscriber)

    // debug('selected doc', doc._id)

    // if (!doc) {
    //   throw new LodgerError('invalid id supplied on select %%', id)
    // } else {
    //   this._activeDocument = { taxonomie, doc }
    //   await dispatch(`${taxonomie}/select`, id)
    // }

    // on deselect, unsubscribe
    // if (id === null) await this.unsubscribe(plural, subscriber) //todo: use data.subscribe .unsubscribe()
  }

  /**
   * Active document for taxonomy
  */
  protected set _activeDocument (docHolder: ActiveDocumentHolder) {
    let { taxonomie, doc } = docHolder
    const debug = Debug('lodger:_activeDocument')
    const gName = `${taxonomie}/activeDoc`
    const { store } = this

    if (!store.getters.hasOwnProperty(gName)) {
      Object.defineProperty(store.getters, gName, {
        configurable: false,
        get () { return doc },
        set (newDoc) { doc = newDoc }
      })
    } else {
      store.getters[gName] = doc
    }
  }

  /**
   * Cauta in searchMap
   * @param input - string de cautat
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
   * Updateaza datele subscriberi-lor,
   * date folosite de getteri pentru a fi
   * afisate in interfata
   *
   * TODO: de exportat de -aici
   *
   * Usage: subscribes DB changes to a given variable (binder)
   * @returns {Subscriber}
   *
   */
  subscribe (
    taxonomii: Taxonomii | Taxonomii[],
    criteriuCerut ?: Criteriu,
    subscriberName : string = 'main',
  ) {
    const debug = Debug('lodger:subscribe')

    const {
      db: { collections },
      store,
      forms
     } = <Lodger>this

     const { getters } = store

    // always have it as an array
    taxonomii = typeof taxonomii === 'string' ?
      Array(taxonomii) :
      taxonomii

    debug('--- SUBSCRIBING ---\n', taxonomii, '\ncriteriu cerut: ', criteriuCerut)

    if (!subscribers[subscriberName])
      Object.assign(subscribers, { [subscriberName]: {} })

    const subscriber = <Subscriber>subscribers[subscriberName]

    if (!vueHelper.subsData[subscriberName]) {
      Vue.set(vueHelper.subsData, subscriberName, {})
    }

    taxonomii.forEach(taxonomie => {
      const { plural } = forms[taxonomie]
      const colectie = collections[plural]
      if (!colectie) throw new LodgerError('invalid collection %%', plural)

      const criteriu = Object.assign({}, {
        ...getCriteriu(plural, JSON.parse(JSON.stringify(criteriuCerut || {})) )
      })

      let { limit, index, sort, find } = criteriu
      const paging = Number(limit || 0) * (index || 1)

      if (subscribedTaxes.indexOf(taxonomie) < 0) {
        initialSubscribe({ taxonomie, plural, collections, store })
      }

      if (typeof unwatch === 'function')
        vueHelper.subsData[subscriberName][plural].unwatch = unwatch

      subscriber[plural] = colectie
        .find(find)
        .limit(paging)
        .sort(sort)
        .$
        .subscribe(async (changes: RxDocument<any>[]) => {
          // DO NOT RETURN IF NO CHANGES!!!!!!!
          // debug(`${plural} for subscriber[${subscriberName}]`, changes)
          const x = vueHelper.subsData[subscriberName][plural]
          const selectedId = getters[`${taxonomie}/selected`]

          // update data objects inside
          x.docs = changes.map(change => Object.freeze(change)) || []
          x.items = Object.assign({},
            ...changes.map((item: RxDocument<Taxonomie>) => ({ [item._id]: item._data }))
          )
          x.fetching = false

          // set the active document from selected id
          if (x.items[selectedId]) {
            const doc = changes.filter(change => change._id === selectedId)[0]
            this._activeDocument = { doc, taxonomie }
            debug('got active doc', taxonomie, x.items[selectedId]._id)
          } else {
            // ID is not in changes, lookup DB, otherwise it's invalid
            const doc = await collections[plural].findOne(selectedId)
            if (!doc) {
              throw new LodgerError('invalid id supplied', plural, selectedId)
            } else {
              this._activeDocument = { doc, taxonomie }
            }
            // an invalid ID was provided,  maybe?
          }
          // vueHelper.$emit('updatedData', { subscriberName, plural })
          debug(`new ${plural}`, Object.keys(x.items).length)
        })
      })

    return subscriber
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
   * Active plugins list
   */
  private get plugins () {
    return plugins
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
    if (options) Object.assign(buildOpts, { ...options })
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
    plugins.push(plugin)
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

  /**
   * Unsubscribe a single taxonomy from a single sub.
   * DEPRECATED
   *
   */
  // async unsubscribe (taxPlural: Plural<Taxonomie>, subscriberName: string = 'main') {
  //   const sub: Subscriber = subscribers[subscriberName]
  //   const debug = Debug('lodger:unsub')
  //   // debug('sub', sub)
  //   if (!sub[taxPlural]) {
  //     throw new LodgerError('subscriber nedefinit', {taxPlural, subscriberName})
  //   }
  //   await sub[taxPlural].unsubscribe()

  //   // unwatch & delete the data obj
  //   await vueHelper.subsData[subscriberName][taxPlural].unwatch()
  //   Vue.set(vueHelper.subsData[subscriberName], taxPlural, null)
  // }

  /**
   * Kills all active listeners for a given subscriber name
   * @param subscriberName
   */
  async unsubscribeAll (subscriberName: string = 'main') {
    const sub = subscribers[subscriberName]
    const debug = Debug('lodger:unsubAll')
    return await Promise.all(
      Object.keys(sub).map(async subscriber => {
        await sub[subscriber].unsubscribe()
        debug('unsubscribed', subscriber)
      })
    )
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

  get subscriberData () {
    const { forms } = this
    const debug = Debug('lodger:subscriberData')

    return (
      taxonomy: Taxonomii,
      subscriberName: string
    ) => {
      const { plural }  = forms[taxonomy]

      try {
        return vueHelper.subsData[subscriberName][plural].items
      } catch (e) {
        if (!vueHelper.subsData)
          Vue.set(vueHelper.subsData, subscriberName, {})


        debug('nu exista %%', { plural, subscriberName })
      }
    }

  }
}

export {
  Lodger,
  Errors,
  Taxonomii
}
