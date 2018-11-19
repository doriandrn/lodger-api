import Debug from 'debug'
import { Store, GetterTree } from 'vuex'
import { RxDatabase, RxCollectionCreator, RxDocument, isRxDocument } from 'rxdb'
import fs from 'fs'

import yaml from 'json2yaml'
import equal from 'deep-equal'

import LodgerStore from 'lodger/lib/Store'
import { getCriteriu, taxIsMultipleSelect } from 'lodger/lib/helpers/functions'
import { handleOnSubmit, assignRefIdsFromStore } from 'lodger/lib/helpers/forms'
import DB from 'lodger/lib/DB'
import { Form } from 'lodger/lib/Form'
import { LodgerError } from 'lodger/lib/Errors'

import Vue from 'vue'

import { predefinite } from 'lodger/lib/forms/serviciu'

const { NODE_ENV } = process.env

const buildOpts: BuildOptions = {
  dbCon: {
    name: 'Lodger/',
    adapter: 'memory',
    password: 'l0dg3rp4$$',
    ignoreDuplicate: NODE_ENV === 'test'
  },
  usePersistedState: false
}

const subscribers: SubscribersList = {
  main: {},
  registru: {},
  listeDePlata: {},
  statistici: {},
  playground: {}
  // altSubscriber: { ... }
}

enum Taxonomii {
  asociatie = 'asociatie',
  bloc = 'bloc',
  apartament = 'apartament',
  factura = 'factura',
  incasare = 'incasare',
  cheltuiala = 'cheltuiala',
  serviciu = 'serviciu',
  furnizor = 'furnizor',
  utilizator = 'utilizator'
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

const loadForms = (taxonomies: Taxonomii[]) => Object.assign({}, ...taxonomies.map((tax: Taxonomii) => ({ [tax]: Form.loadByName(tax) }) ))

type SubscribersList = { [k: string]: {} }

const plugins: Plugin[] = []

const docsHolderObj = {
  docs: [],
  items: {},
  criteriu: {},
  fetching: false
}

/**
 * Main holder for temporary items subscribed to
 *
 * -> a vue helper for reactivity
 * holds RX documents
 * and methods to accezss / manipulate them
 */
const docsHolder = new Vue({
  data () {
    return Object.assign({}, { ...subscribers })
  },
  methods: {
    async getItem (
      taxonomie: Plural<Taxonomie>,
      id: string | object,
      subscriberName : string = 'main'
    ) {
      let item: RxDocument<Taxonomie> | undefined
      const debug = Debug('lodger:getItem')

      // Filters the documents array for the one with the id
      const _theDoc = (docs: RxDocument<Taxonomie, any>[]) => {
        const doc = docs.filter(doc => doc._id === id)[0]
        if (!(doc && isRxDocument(doc))) throw new LodgerError('no doc found %%', id)
        return doc
      }

      try {
        const s = this.$data[subscriberName][taxonomie]
        item = _theDoc(s.docs)
        if (item) debug('item gasit din prima', { taxonomie, subscriberName, s, item })
      } catch (e) {
        Object.keys(this.$data).forEach(sub => {
          debug('SEX', sub)
          if (item) return
          const s = this.$data[sub][taxonomie]
          debug('tried s', sub, s, taxonomie)
          if (!(s && s.docs)) return
          debug('SBF', s)
          item = _theDoc(s.docs)
          if (item) debug('item gasit din a 2a', { taxonomie, subscriberName, s, item })
        })

      } finally {
        if (!item) {
          throw new LodgerError('item not found', arguments)
          // item = await collections[plural].findOne(id).exec()
        }
      }

      return item
    }
  }
})

class Lodger {
  constructor (
    protected taxonomii: Taxonomii[],
    protected forms: Forms,
    protected db: RxDatabase,
    readonly store: Store<RootState>
  ) {
    // const debug = Debug('lodger:constructor')
    const { subscriberData } = this

    taxonomii.forEach(tax => {
      const { plural } = forms[tax]

      Object.defineProperty(this, plural, {
        get () {
          return (subscriberName: string = 'main') => subscriberData(tax, subscriberName)
        }
      })
    })

    // hooks up the active document
    store.subscribe(async ({ type, payload }) => {
      if (!payload || payload.id === undefined) return
      const path = type.split('/')
      if (path[1] !== 'select') return
      const taxonomie = path[0]
      const { plural } = forms[taxonomie]

      if (payload.id && !payload.hadDoc) {
        let doc
        doc = await docsHolder.getItem(plural, payload.id, payload.subscriber)
        this._activeDocument = { taxonomie, doc }
      }

      // on deselect, unsubscribe
      if (payload.id === null) {
        this.unsubscribe(plural, payload.subscriber)
      }
    })

    // todo, remove on prod
    try { window.dh = docsHolder } catch (e) {}
  }

  /**
   * Notifies the user about an update/change
   * - Store action wrapper -
   */
  notify (notification: LdgNotification) {
    this.store.dispatch('notify', notification)
  }

  /**
   * Adds / updates an entry in the DB
   *
   * @param taxonomie
   * @param data
   */
  async put (
    taxonomy: Taxonomie,
    data: LodgerFormData,
    subscriber ?: string
  ) {
    const debug = Debug('lodger:put')
    if (!data || Object.keys(data).length < 1) throw new LodgerError(Errors.missingData, data)

    const {
      db,
      store,
      forms
    } = this

    const { plural } = forms[taxonomy]
    // if (!plural) throw new LodgerError(Errors.noPlural, taxonomy)
    const colectie = db.collections[plural]

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = data._id ?
      'upsert' :
      'insert'

    const form = forms[taxonomy]
    const references = form.referenceTaxonomies
    const referencesIds = this.activeReferencesIds(references)

    /**
     * add references, default values, etc
     */
    const internallyHandledData = handleOnSubmit(data, { referencesIds, store })

    /**
     * do the insert / upsert and following actions
     */
    try {
      const doc = await colectie[method](internallyHandledData)
      const id = doc._id
      store.dispatch(`${taxonomy}/set_last`, id)
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
  async trash (taxonomie: Taxonomii, id: ItemID) {
    const { db, forms } = this
    const debug = Debug('lodger:trash')
    const { plural } = forms[taxonomie]
    if (!plural) throw new LodgerError('wtf')
    const col = db.collections[plural]
    const doc: RxDocument<Taxonomii> = await col.findOne(id)
    await doc.remove()
    debug(`deleted ${taxonomie} ID ${id}`)
    return true
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
    // const debug = Debug('lodger:select')
    const { dispatch } = this.store

    if (typeof data === 'object') {
      const { doc } = data

      if (doc) {
        this._activeDocument = { taxonomie, doc }
        data.doc = undefined
        data.hadDoc = true
      }
    }

    await dispatch(`${taxonomie}/select`, data)
  }

  /**
   * deselect an item
   */
  async deselect (
    taxonomie: Taxonomie,
    subscriber ?: string
  ) {
    await this.store.dispatch(`${taxonomie}/select`, { id: null, subscriber })
  }

  /**
   * Active document for taxonomy
  */
  protected set _activeDocument (docHolder) {
    let { taxonomie, doc } = docHolder
    const debug = Debug('lodger:_activeDocument')
    const gName = `${taxonomie}/activeDoc`
    const { store } = this

    if (!store.getters.hasOwnProperty(gName)) {
      Object.defineProperty(store.getters, gName, {
        configurable: false,
        get () { return doc },
        set (newDoc) { doc = newDoc; debug('resetat', newDoc, doc) }
      })
    } else {
      store.getters[gName] = doc
    }
  }

   /**
   * Updateaza datele subscriberi-lor,
   * date folosite de getteri pentru a fi
   * afisate in interfata
   *
   * TODO: de exportat de -aici
   *
   * Usage: subscribes DB changes to a given variable (binder)
   *
   */
  subscribe (
    subscriberName : string = 'main',
    taxonomii: Taxonomii | Taxonomii[],
    criteriuCerut ?: Criteriu
  ) {
    const debug = Debug('lodger:subscribe')

    const {
      db: { collections },
      forms,
      store: { dispatch }
     } = <Lodger>this

    if (!collections) throw new LodgerError(Errors.missingCoreDefinitions)

    // always have it as an array
    if (typeof taxonomii === 'string') taxonomii = Array(taxonomii)

    debug('--- SUBSCRIBING ---\n', taxonomii, '\ncriteriu cerut: ', criteriuCerut)

    // const multipleTaxonomies: boolean = taxonomii.length > 1
    if (!subscribers[subscriberName]) Object.assign(subscribers, { [subscriberName]: {} })

    const subscriber = <Subscriber>subscribers[subscriberName]

    if (!docsHolder.$data[subscriberName]) Vue.set(docsHolder, subscriberName, {})

    taxonomii.forEach(taxonomie => {
      const { plural, referenceTaxonomies } = forms[taxonomie]
      const colectie = collections[plural]
      if (!colectie) throw new LodgerError('invalid collection %%', plural)
      // const criteriu = { ...getCriteriu(plural, JSON.parse(JSON.stringify(criteriuCerut || {})) ) }
      const criteriu = Object.assign({}, { ...getCriteriu(plural, JSON.parse(JSON.stringify(criteriuCerut || {})) ) })

      debug(`${taxonomie}: criteriu cerut`, { ...criteriuCerut })
      debug(`${taxonomie}: criteriu`, criteriu)

      let { limit, index, sort, find } = criteriu
      const paging = Number(limit || 0) * (index || 1)

      // first init -> define the data object container
      if (!docsHolder.$data[subscriberName][plural]) {
        const freshO = Object.assign({}, docsHolderObj)
        freshO.criteriu = Object.assign({}, criteriu)

        Vue.set(docsHolder[subscriberName], plural, freshO)

        // add watcher for criteriu and when it changes
        // fire this subscribe func again
        if (!taxIsMultipleSelect(taxonomie)) {
          // const everyKeyInCriteriu = (vm) => {
          //   const c = vm[subscriberName][plural].criteriu
          //   return { ...c }
          // }
          const everyKeyInCriteriu = vm => ({ ...vm[subscriberName][plural].criteriu })

          docsHolder.$watch(everyKeyInCriteriu, (newC, oldC) => {
            if (!newC || equal(newC, oldC) ) return
            // const diff = {}
            // if (newC.find) Object.assign(diff, { find: { ...newC.find } })
            // if (newC.sort) Object.assign(diff, { sort: newC.sort })
            // debug('parsedNew', diff)
            this.subscribe(subscriberName, taxonomie, newC)
          }, { deep: true, immediate: false })
        }

        // insert predefined services on first init
        // todo: make this a hook and call funcs
        if (plural === 'servicii') {
          predefinite.forEach(async denumire => { await collections[plural].insert({ denumire }) })
          debug('first init, adaugat predefinite')
        }
      } else {
        // docsHolder[subscriberName][plural].criteriu = criteriu
        docsHolder.$data[subscriberName][plural].fetching = true
        this.unsubscribe(plural, subscriberName)
      }

      subscriber[plural] = colectie
        .find(find)
        .limit(paging)
        .sort(sort)
        .$
        .subscribe((changes: RxDocument<any>[]) => {
          // DO NOT RETURN IF NO CHANGES!!!!!!!
          debug(`${plural} for subscriber[${subscriberName}]`, changes)

          // update data objects inside
          docsHolder.$data[subscriberName][plural].docs = changes.map(change => Object.freeze(change)) || []
          docsHolder.$data[subscriberName][plural].items = Object.assign({},
            ...changes.map((item: RxDocument<any>) => ({ [item._id]: item._data }))
          )
          docsHolder.$data[subscriberName][plural].fetching = false
        })
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
    const { db, store } = this
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
    let { dbCon } = options || buildOpts
    const debug = Debug('lodger:build')
    debug(`building in ${NODE_ENV} mode ...`)

    const taxonomii: Taxonomii[] = <Taxonomii[]>Object.keys(Taxonomii)

    const forms = loadForms(taxonomii)

    const _collections: RxCollectionCreator[] = taxonomii.map(tax => forms[tax].collection)
    const db = await DB(_collections, dbCon)
    const store = new LodgerStore({ taxonomii, forms })
    // const { collections } = await db

    if (options) Object.assign(buildOpts, { ...options })

    /**
     * When a taxonomy item gets SELECTED,
     * try to call all DB methods for refrences of the taxonomy
     *
     */
    // store.subscribe(DBGettersMethods({ collections, plurals, store }) )
    store.subscribe(async ({ type, payload }, state) => {
      const path = type.split('/')
      if (path[1] !== 'select') return
      const debug = Debug('lodger:SELECTstoreSubscriber')
      const tax = path[0]

      debug('payload', payload)

      const id = typeof payload === 'string' ? payload : payload.id
      if (id === undefined) return

      const reference = { [`${tax}Id`]: id }
      const { referenceTaxonomies } = forms[tax]

      // taxonomies that depend on the selected tax and subscriber
      // todo: move from here
      const dependentTaxonomies: Taxonomie[] = []
      Object.keys(forms).forEach(taxForm => {
        const { referenceTaxonomies } = forms[taxForm]
        if (!referenceTaxonomies || referenceTaxonomies.indexOf(tax) < 0) return
        dependentTaxonomies.push(taxForm)
      })
      debug('DT', tax, dependentTaxonomies)

      // call methods of references documents
      referenceTaxonomies.forEach(async refTax => {
        const refdoc = store.getters[`${refTax}/activeDoc`]
        debug(`refdoc ${tax} (${refTax})`, refdoc)
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
          const holder = docsHolder[subscriber][plural]
          if (!holder || !holder.criteriu) return
          debug('asignez',  dTax, subscriber, reference)
          holder.criteriu.find = { ...reference }

          // deselect
          store.dispatch(`${dTax}/select`, { id: null, subscriber })
        })
        debug('ass dun')
      }
    })

    return new Lodger(
      taxonomii,
      forms,
      db,
      store
    )
  }

  /**
   * Extend Lodger :)
   * Todo!
   *
   * @param {Plugin} plugin
   *
   */
  static use (plugin: Plugin) {
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
   *
   */
  async unsubscribe (taxPlural: Plural<Taxonomie>, subscriberName: string = 'main') {
    const sub = subscribers[subscriberName]
    const debug = Debug('lodger:unsub')
    debug('sub', sub)
    if (!sub[taxPlural]) {
      throw new LodgerError('subscriber nedefinit', {taxPlural, subscriberName})
    }
    await sub[taxPlural].unsubscribe()
  }

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

    return (
      taxonomy: Taxonomii,
      subscriberName: string
    ) => {
      const { plural }  = forms[taxonomy]
      try {
        return docsHolder.$data[subscriberName][plural]
      } catch (e) { throw new LodgerError('nu exista %%', { plural, subscriberName })}
    }

  }
}

export {
  Lodger,
  Errors,
  Taxonomii
}
