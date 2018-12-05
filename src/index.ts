/// <reference path="main.d.ts" />

import Debug from 'debug'
import { RxDatabase, RxCollectionCreator, RxDocument, isRxDocument } from 'rxdb'

import fs from 'fs'
import yaml from 'json2yaml'
import equal from 'deep-equal'

import LodgerStore from '~/lib/Store'
import { buildOpts, BuildOptions } from '~/lib/build/opts'
import { getCriteriu, taxIsMultipleSelect } from '~/lib/helpers/functions'
import { handleOnSubmit, assignRefIdsFromStore } from '~/lib/helpers/forms'
import DB from '~/lib/DB'
import { Form } from '~/lib/Form'
import { LodgerError } from '~/lib/Errors'

import Vue from 'vue'

import { string_similarity } from '~/lib/helpers/search'
import { predefinite } from 'forms/serviciu'

const { NODE_ENV } = process.env

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
  // contor = 'contor',
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

const plugins: LodgerPlugin[] = []

const vueHelperObj: SubscriberData = {
  docs: [],
  items: {},
  criteriu: {},
  fetching: false
}


// Filters the documents array for the one with the id
const _theDoc = (docs: RxDocument<Taxonomie, any>[], id: string) => {
  if (!docs.length) throw new LodgerError('empty docs provided')
  const doc = docs.filter(doc => doc._id === id)[0]
  if (!(doc && isRxDocument(doc))) throw new LodgerError('no doc found %%', { id })
  return doc
}

/**
 * Main holder for temporary items subscribed to
 *
 * -> a vue helper for reactivity
 * holds RX documents
 * and methods to accezss / manipulate them
 */
const vueHelper = new Vue({
  data () {
    return {
      subsData: {}
    }
  },
  // created () {
  //   const debug = Debug('lodger:helper:created')
  //   this.$on('updatedData', data => {
  //     debug('G', data)
  //     // const { subscriberName, plural } = data
  //   })
  // },
  computed: {
    ids () {
      return (tax: Plural<Taxonomie>, subName: string) => {
        return Object.keys(this.subsData[subName][tax])
      }
    }
  },
  methods: {
    async getItem (
      taxonomie: Plural<Taxonomie>,
      id: string,
      subscriberName ?: string
    ) {
      let item: RxDocument<Taxonomie> | undefined
      const debug = Debug('lodger:getItem')

      if (subscriberName === undefined)
        subscriberName = 'main'

      const { subsData } = this

      // // return item
      // return new Promise(async (resolve, reject) => {
      //   // await rxdb to update data first.
      //   await this.$nextTick()

      try {
        const s = subsData[subscriberName][taxonomie]
        // debug('S', subscriberName, taxonomie, s, s.docs.length)
        if (s.docs && s.docs.length) return _theDoc(s.docs, id)
      } catch (e) {
        Object.keys(this.subsData).forEach(sub => {
          if (item) return
          // debug('trying sub', sub)
          const s = subsData[sub][taxonomie]
          // debug(`D[${sub}][${taxonomie}]:`, s)

          if (!(s && s.docs && s.docs.length)) return
          item = _theDoc(s.docs, id)
          if (item) debug('item gasit din a 2a', { taxonomie, subscriberName, s, item })
        })

      } finally {
        // item = await collections[plural].findOne(id).exec()
      }
      return item
      // // })
      // })
    }
  }
})

class Lodger {
  constructor (
    protected taxonomii: Taxonomii[],
    protected forms: Forms,
    protected db: RxDatabase,
    readonly store: LodgerStore
  ) {
    const debug = Debug('lodger:constructor')

    // const subscriberData = this.subscriberData.bind(this)

    taxonomii.forEach(tax => {
      const { plural } = forms[tax]

      Object.defineProperty(this, plural, {
        get () {
          debug('getter tax apelat')
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

    // console.error(Object.getOwnPropertyNames(this))

    // todo, remove on prod
    // try { window.dh = vueHelper } catch (e) {}
  }

  /**
   * Notifies the user about an update/change
   * - Store action wrapper -
   */
  notify (notification: LdgNotification) {
    // console.info(notification)
    // this.store.dispatch('notify', notification)
  }

  /**
   * Adds / updates an entry in the DB
   *
   * @param taxonomie
   * @param data
   */
  async put (
    taxonomy: Taxonomie,
    data: any,
    subscriber ?: string
  ) {
    // const debug = Debug('lodger:put')
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
      store: { getters },
      forms
     } = <Lodger>this

    // if (!collections) throw new LodgerError(Errors.missingCoreDefinitions)

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
      debug('D initializat subscriber: ', subscriberName)
    }

    taxonomii.forEach(taxonomie => {
      const { plural } = forms[taxonomie]
      const colectie = collections[plural]
      if (!colectie) throw new LodgerError('invalid collection %%', plural)

      const criteriu = Object.assign({}, { ...getCriteriu(plural, JSON.parse(JSON.stringify(criteriuCerut || {})) ) })

      debug(`${taxonomie}: criteriu cerut`, { ...criteriuCerut })
      debug(`${taxonomie}: criteriu`, criteriu)

      let { limit, index, sort, find } = criteriu
      const paging = Number(limit || 0) * (index || 1)
      let unwatch

      // first init -> define the data object container
      if (!vueHelper.subsData[subscriberName][plural]) {
        const freshO = Object.assign({}, vueHelperObj)
        freshO.criteriu = Object.assign({}, criteriu)

        Vue.set(vueHelper.subsData[subscriberName], plural, freshO)
        debug(`setat gol D[${subscriberName}][${plural}]`, freshO)

        // add watcher for criteriu and when it changes
        // fire this subscribe func again
        if (!taxIsMultipleSelect(taxonomie)) {
          const everyKeyInCriteriu: { [key in CriteriuKeys]: any } = (vm: Vue): Criteriu => ({ ...vm.subsData[subscriberName][plural].criteriu })

          unwatch = vueHelper.$watch(everyKeyInCriteriu, (newC: Criteriu, oldC: Criteriu) => {
            if (!newC || equal(newC, oldC) ) return
            this.subscribe(taxonomie, newC, subscriberName)
          }, { deep: true, immediate: false })
        }

        // insert predefined services on first init
        // todo: make this a hook and call funcs
        if (plural === 'servicii') {
          predefinite.forEach(async denumire => { await collections[plural].insert({ denumire }) })
          debug('first init, adaugat predefinite')
        }
      } else {
        // vueHelper[subscriberName][plural].criteriu = criteriu
        vueHelper.subsData[subscriberName][plural].fetching = true
        // this.unsubscribe(plural, subscriberName) // todo: update ot new sub model
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
            debug('got active doc', taxonomie, x.items[selectedId])
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
          debug('am scris items', x.items)
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
        return vueHelper.subsData[subscriberName][plural].items
      } catch (e) { throw new LodgerError('nu exista %%', { plural, subscriberName })}
    }

  }
}

export {
  Lodger,
  Errors,
  Taxonomii
}
