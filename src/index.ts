import { addRxPlugin, createRxDatabase, RxDatabase, RxDatabaseCreator, RxDocument } from 'rxdb'
import axios from 'axios'
import { observable, computed } from 'mobx'
import merge from 'deepmerge'
import { convert } from 'cashify'
import numeral from 'numeral'
// import yaml from 'json2yaml'

import config from './lodger.config'

import LodgerError from '~/lib/Error'
import Taxonomy from '~/lib/Taxonomy/Subscribable'

import loadSchemas from 'helper/loadSchemas'
import notify from 'helper/notify'

// Currencies
import currencyList from 'currency-list'
import rates from 'rates'

// Languages and localization
import langs from 'langs'
import locales from 'locales'
import { Rates } from 'cashify/dist/lib/options'
import { Field } from './lib/Field'

const { env: { NODE_ENV }, browser } = process

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

const taxonomies: Taxonomie[] = Object
  .keys(Taxonomii)
  .filter(tax => typeof Taxonomii[tax as any] === 'number')

/**
 * Forms, includes each for Taxonomies
 *
 * @enum {number}
 */
enum Forms {
  Feedback, Financiar, Preferinte
}

/**
 * Errors definitions

 * @enum {string}
 */
enum Errors {
  missingDB,
  invalidPluginDefinition,
  couldNotWriteFile
}


// type FormsHolder = { [k in Taxonomie & Forms]: Form<k> }

type BuildOptions = {
  db: RxDatabaseCreator,
  modules?: LodgerModule[]
}

type Lang = {
  code: string,
  name: string,
  nativeName ?: string
}

/**
 *
 *
 * @interface LodgerPlugin
 */
interface LodgerPlugin {
  name: string
  install (): void
}


type TaxesList = {
  [k in Taxonomii]: Taxonomy<Taxonomie>
}

interface LodgerAPI {
  put (taxonomie: Taxonomie, data: {}): Promise<RxDocument<Taxonomie>>
  trash (): void

  import (): void
  export (path: PathLike, cryptData ?: boolean, filename ?: string): Promise<void>

  destroy (): Promise<void>
}

type Breadcrumb = {
  tax: Taxonomie,
  id: string,
  status: boolean
}

type State = {
  hasUpdate: boolean,
  appPreferences : {
    display : {
      locale : string,
      currency : number,
      hotkeys: boolean,
      theme ?: number,
      prefersSysTheme ?: boolean // altternaive 2 dark mode
    },
    plugins ?: {
      active: []
    }
  },
  subs ?: {
    [k: string]: object
  },
  rates : {
    rates: {
      [k: number]: number
    },
    timestamp: number
  },
  // breadcrumbs: Breadcrumb[],
  modal: {
    activeDoc ?: RxDocument | null,
    closeable ?: boolean,
    firstTime ?: boolean,

    sub ?: { edit: () => void }
    close ?: Function
  }
}

let plugins: LodgerPlugin[] = []
// const currencies = Object.keys(rates.data)

const defaultState: State = {
  hasUpdate: false,
  appPreferences: {
    display: {
      theme: 0,
      locale: 'en',
      currency: 1,
      hotkeys: true
    }
  },
  subs: {},
  modal: {
    activeDoc: null,
    closeable: true,
    sub: undefined,
    close: function () {
      if (!this.closeable)
        return

      this.activeDoc = null
      if (this.sub && this.sub.edit && typeof this.sub.edit === 'function')
        this.sub.edit()
    }
  },
  rates: {
    rates: rates.data,
    timestamp: rates.timestamp
  }
}

/**
 *
 * @class The main API
 * @implements {LodgerAPI}
 * @requires <rxdb> RxDatabase
 */
class Lodger implements LodgerAPI {
  @observable appState: State = this.restoreState ?
    merge(defaultState, this.restoreState) :
    defaultState

  @computed get state () {
    return this.appState
  }

  set state (s) {
    merge(this.appState, s)
  }

  readonly taxonomies: Taxonomie[] = Object.keys(this.$taxonomies)
  static db ?: RxDatabase
  static boundRels : boolean = false

  /**
   * Main Init function
   *
   * Steps: (order matters)
   * 1. Hook up the taxonomies
   * 2. Lodger Forms based on taxonomies
   * 3. DB
   * 4. Store
   *
   * @param {object} options
   * @returns {Lodger}
   *
   */
  static async init (options ?: BuildOptions) {
    const opts = merge({ ... config.build }, options || {} )
    const { state } = opts

    const taxesSchemas = await loadSchemas(taxonomies)
    const taxes = taxesSchemas.map(sch => new Taxonomy(sch, { timestamps: true }))
    const Taxonomies  = taxes.reduce((a, b) => ({ ...a, [b.plural]: b }), {})
    const collectionsCreator = Object.keys(Taxonomies).reduce((a, b) => ({ ...a, [b]: Taxonomies[b]._collectionCreator }), {})

    try {
      await Lodger.bindRelationships(Taxonomies)
      Lodger.boundRels = true
    } catch (e) {
      console.error('Could not bind relationships', e)
    }

    await Lodger.setupRxDB(opts.db, collectionsCreator)

    // Assign collections to taxonomies
    Object.keys(Taxonomies).forEach((taxName: string) => {

    })

    return new Lodger(
      Taxonomies,
      plugins,
      state
    )
  }

  /**
   * Creates an instance of Lodger.
   * @memberof Lodger
   */
  constructor (
    readonly $taxonomies: TaxesList,
    protected plugins: LodgerPlugin[] = [],
    protected restoreState ?: Partial<State>
  ) {
    // Bind shortcuts for every tax to `this` for easy access
    Object.assign(this, $taxonomies)

    // Bind lodger context to taxes for easy access
    this.taxonomies.forEach(tax => {
      Object.defineProperties($taxonomies[tax], {
        '$lodger': {
          value: this,
          writable: false
        },
        collection: {
          value: Lodger.db[tax],
          writable: false
        }
      })
    })
  }

 /**
  * Assigns taxonomy relations
  * children / parents
  * parents are required for a taxonomy to be added
  * children are just relations
  *
  * @returns void
  * @param {*} $taxonomies
  * @memberof Lodger
  */
  private static async bindRelationships ($taxonomies: TaxesList) {
    if (Lodger.boundRels)
      return

    const taxes = Object.keys($taxonomies)

    return await Promise.all(taxes.map((tax: Taxonomie) => {
      const $tax = $taxonomies[tax]

      const parents: Taxonomie[] = []
      const children: Taxonomie[] = []
      const { schema: { required }} = $tax.form

      taxes.forEach(t => {
        const $t = $taxonomies[t]
        const { name, plural } = $t.form
        const parentsKeys = [`${name}Id`, plural]
          .filter(key => $tax.form.fieldsIds.indexOf(key) > -1 && required.indexOf(key) > -1)[0]

        if (parentsKeys) {
          parents.push(parentsKeys.replace('Id', ''))
        }

        const childrenKeys = $t.form.fieldsIds
          .filter(key => [`${$tax.form.name}Id`, $tax.form.plural].indexOf(key) > -1)
          // key !== 'servicii'

        if (childrenKeys.length) {
          children.push($t.form.plural)
        }
      })

      if (parents && parents.length > 0)
        $tax.parents = parents

      if (children && children.length > 0)
        $tax.children = children.filter(c => parents.map(p => p.plural).indexOf(c.replace('Id', '').plural) === -1)

      if ($tax.children.length) {
        const countersField = new Field({
          type: 'object',
          default: $tax.children.reduce((a, b) => ({ ...a, [ b.plural ]: 0 }), {})
        })
        $tax.form.schema.add('counters', countersField)
        $tax.form.internalFields['counters'] = countersField
      }

      return tax
    }))
  }

  /**
   * Updates currency rates
   *
   * @memberof Lodger
   */
  updateRates () {
    const { timestamp } = this.state.rates
    const conv = new Date(timestamp).getTime()
    const diff = Date.now() - conv

    if (diff < 1000000) {
      notify({
        text: 'too early: ' + diff,
        type: 'error'
      })
      return
    }

    axios
      .get('https://doriandrn.github.io/currencies-rates/rates.json')
      .then(data => { this.rates = data.data })
      .catch(e => { notify({
        text: 'Rates could not be fetched - ' + e,
        type: 'error'
      }) })
  }

  /**
   * Converts diff currencies amounts
   *
   * @param {number} suma
   * @param {number} to
   * @param {number} [from=this.displayCurrency]
   * @param {Rates} [rates=this.rates]
   * @param {number} [base=2781]
   * @returns {object} converted
   * @memberof Lodger
   */
  convert (
    suma: number,
    to: number,
    from: number = this.displayCurrency,
    rates: Rates<any> = this.rates,
    base: number = 2781
  ) {
    return convert(suma, { from, to, base, rates })
  }

  format (suma: number, moneda: number = this.displayCurrency) {
    return numeral(suma).format(this.isCrypto(moneda) ? '0,0[.]00000000' : '0,0[.]00')
  }

  isCrypto (moneda: number = this.displayCurrency) {
    const { cryptocurrency } = Lodger.currencyList
    if (!cryptocurrency)
      return

    return Object.keys(cryptocurrency).map(n => Number(n)).indexOf(moneda) > -1
  }

  /**
   * @alias Taxonomy.put
   *
   * Inserts/updates a new document in DB
   * updates if data has ._id key
   *
   * @param {Taxonomie} taxonomie
   * @param {Taxonomy<Taxonomie>} data
   * @returns {Promise<RxDocument<Taxonomie>>}
   * @memberof Lodger
   */
  put (taxonomie: Taxonomie, data: Taxonomy<Taxonomie>): Promise<RxDocument<Taxonomie>> {
    this[taxonomie].put(data)
    let userId

    try {
      userId = this.activeUserId
      console.log('iu', userId)
    } catch (e) {
      console.warn('no user selected')
    }
    // this.istoric.push({
    //   userId,
    //   action: data._id ? 'added' : 'updated',
    //   taxonomie
    // })
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
    taxonomii: Taxonomii[],
    criteriuCerut ?: Criteriu,
    subscriberName : string = 'main',
  ) {
    Object.keys(taxonomii).forEach(taxonomie => {
      this.$taxonomies[taxonomie].subscribe(subscriberName, { ... criteriuCerut })
    })
  }

  /**
   *
   *
   * @static
   * @memberof Lodger
   */
  static async setupRxDB (dbOpts: RxDatabaseCreator, collections) {
    addRxPlugin(require('rxdb-search'))

    if (NODE_ENV === 'development') {
      addRxPlugin(require('pouchdb-adapter-memory'))
    } else {
      if (browser) {
        addRxPlugin(require('pouchdb-adapter-idb'))
      } else {
        addRxPlugin(require('pouchdb-adapter-leveldb'))
      }
    }

    Lodger.db = await createRxDatabase(dbOpts)
    await Lodger.db.addCollections(collections)
  }

  /**
   * Extend Lodger :)
   * Todo!
   *
   * @param {LodgerPlugin} plugin
   *
   */
  static use (plugin: LodgerPlugin) {
    if (!plugin || typeof plugin !== 'object') {
      throw new LodgerError(Errors.invalidPluginDefinition)
    }
    // const { name } = plugin
    plugins.push(plugin)
  }

  /**
   * Destroys the Lodger instance
   *
   */
  async destroy () {
    try {
      // await this.unsubscribeAll()
      await Taxonomy.destroy()
    } catch (e) {
      console.error('Lodger could not be destroyed. Reason: ', e)
    }
  }

  /**
   * Exports the DB
   * as a YML file with ext .ldb
   * date is captured
   *
   */
  async export (path?: string, cryptedData?: boolean, filename?: string) {
    if (!Lodger.db)
      throw new LodgerError('No database to export')

    const json = await Lodger.db.dump()
    const extension = 'ldb'
    if (!path) path = `${require('os').homeDir}/downloads/`

    if (!filename) {
      const date = new Date()
      filename = `LdgDB-${date}`
    }
    // fs.writeFile(`${path}/${filename}.${extension}`, yaml.stringify(json), (e: Error) => {
    //   if (e) throw new LodgerError(Errors.couldNotWriteFile)
    //   // debug(`written ${filename}.${extension} in path`)
    // })
  }

  /**
   * TODO!!
   */
  async import () {

  }

  /**
   * Gets the translation for a specific item.
   *
   * @static
   * @param {string} key
   * @returns {string}
   * @memberof Lodger
   */
  translate (key: string) {
    const { i18n } = this
    return key.split('.').reduce((o,i)=>o[i], i18n)
  }

  get supportedLangs () {
    return langs
  }

  @computed get i18n () {
    return locales ? locales[this.locale] : {}
  }

  @computed get crumbs () {
    const { subs } = this.state

    return Object.keys(subs)
      .filter(k => (k.indexOf(this.mainSubName) === 0 || k.indexOf('single') === 0) && subs[k].activeId || subs[k].selectedId)
      .map((subDescriptor : string) => {
        const { activeId, selectedId } = subs[subDescriptor]
        const id = selectedId || activeId
        const tax = this.taxonomies[Number(subDescriptor.split('-')[1])]
        return {
          id, tax, status: true
        } as Breadcrumb
      })
  }

  get mainSubName () {
    return 'prince'
  }

  @computed get activeUserId () {
    const { mainSubName } = this
    const subState = this.state.subs[`${mainSubName}-0`]

    return subState && subState.activeId ?
      subState.activeId :
      undefined
  }


  /** SHORTCUTS */
  get locale () {
    return this.state.appPreferences?.display.locale
  }

  set locale (language: string) {
    const langCode = language.indexOf('-') > -1 ?
      language.split('-')[0] :
      language

    if (langs.map((lang: Lang) => lang.code).indexOf(langCode) < 0)
      throw new LodgerError('Language not supported')

    this.state.appPreferences.display.locale = langCode
  }

  /** Currencies and rates */
  static get currencies () {
    return Object.keys(rates.data).map(id => Number(id))
  }

  static get currencyList () {
    return currencyList
  }

  get displayCurrency () {
    return this.state.appPreferences.display.currency
  }

  set displayCurrency (index: number) {
    this.appState.appPreferences.display.currency = index
  }

  get rates () {
    return this.state.rates?.rates || {}
  }

  set rates (rates: Object) {
    Object.assign(this.state.rates, {
      rates: rates.data,
      timestamp: rates.timestamp
    })
  }

  /** Modals */
  get modal () {
    return this.state.modal
  }

  set modal (data) {
    merge(this.appState.modal, data)
  }
}

export {
  taxonomies,
  Lodger,
  Errors,
  Taxonomii,
  notify
}
