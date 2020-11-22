import { addRxPlugin, createRxDatabase, RxDatabaseCreator, RxDocument } from 'rxdb'
import axios from 'axios'
import { observable, computed } from 'mobx'
import merge from 'deepmerge'
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

type State = {
  activeUserId ?: string
  appPreferences : {
    display : {
      locale : string,
      currency ?: number,
      theme ?: number,
      sysColorsOrInverted ?: boolean // altternaive 2 dark mode
    },
    plugins ?: {
      active: []
    }
  },
  subscribers ?: {
    [k: string]: object
  },
  rates : {
    rates: undefined,
    timestamp: number
  },
  modal: {
    activeDoc ?: RxDocument | null,
    closeable ?: boolean,
    firstTime ?: boolean,

    close ?: Function
  }
}

let plugins: LodgerPlugin[] = []

// const locale = observable.box('ro')
// const currencies = Object.keys(rates.data)
// const displayCurrency = observable.box(currencies[0])
// const currencyRates = observable.box({ rates: undefined, timestamp: 0 }, { deep: false })

/**
 *
 * @class The main API
 * @implements {LodgerAPI}
 * @requires <rxdb> RxDatabase
 */
class Lodger implements LodgerAPI {
  @computed get i18n () {
    return locales ? locales[this.locale] : {}
  }

  @observable appState: State = {
    appPreferences: {
      display: {
        theme: 0,
        locale: 'en'
      }
    },
    modal: {
      activeDoc: null
    },
    rates: {
      rates: rates.data,
      timestamp: rates.timestamp
    }
  }

  @computed get state () {
    return this.appState
  }

  set state (s) {
    merge(this.appState, s)
  }

  get supportedLangs () {
    return langs
  }

  taxonomies: Taxonomie[]

  /**
   * Creates an instance of Lodger.
   * @memberof Lodger
   */
  constructor (
    taxonomies: TaxesList = taxonomies,
    protected plugins: LodgerPlugin[] = [],
    protected restoreState ?: State
  ) {
    // Assign taxonomies to this
    this.taxonomies = taxonomies.map(tax => {
      Object.defineProperty(Lodger.prototype, tax.form.plural, {
        value: tax,
        writable: false
      })

      /**
       * Assign taxonomy relations
       * children / parents
       * parents are required for a taxonomy to be added
       * children are just relations
       *
       */
      const parents = []
      const children = []
      const { schema: { required }} = tax.form

      taxonomies.forEach(t => {
        const { name, plural } = t.form
        const parentsKeys = [`${name}Id`, plural]
          .filter(key => tax.form.fieldsIds.indexOf(key) > -1 && required.indexOf(key) > -1)[0]

        const childrenKeys = t.form.fieldsIds.filter(key => [`${tax.form.name}Id`, tax.form.plural].indexOf(key) > -1)

        if (parentsKeys) {
          parents.push(parentsKeys.replace('Id', ''))
        }

        if (childrenKeys.length) {
          children.push(t.form.plural)
        }

      })

      if (parents && parents.length > 0)
        tax.parents = parents

      if (children && children.length > 0)
        tax.children = children

      return tax.form.plural
    })

    this.taxonomies.map(t => {
      if (this[t]) {
        Object.defineProperty(this[t], '$lodger', {
          value: this,
          writable: false
        })
      }
    })

    this.modal = {
      close: function () {
        console.log('modalThis', this)
        if (!this.closeable)
          return

        this.activeDoc = null
        // if (this.sub)
        //   this.sub.edit()
      }
    }

    if (restoreState)
      this.state = restoreState
  }

  /** SHORTCUTS */
  get locale () {
    return this.state.appPreferences?.display.locale
  }

  set locale (language) {
    const langCode = language.indexOf('-') > -1 ?
      language.split('-')[0] :
      language

    if (langs.map((lang: Lang) => lang.code).indexOf(langCode) < 0)
      throw new LodgerError('Language not supported')

    this.state = { appPreferences: { display: { locale: langCode } }
  }

  /** Currencies */
  static get currencies () {
    return Object.keys(rates.data).map(id => Number(id))
  }

  static get currencyList () {
    return currencyList
  }

  get displayCurrency () {
    return this.state.appPreferences.display.currency || 1
  }

  set displayCurrency (index: number) {
    this.appState.appPreferences.display.currency = index
  }

  get rates () {
    return this.state.rates?.rates || {}
  }

  set rates (rates: Object) {
    this.state = { rates }
  }

  get modal () {
    return this.state.modal
  }

  set modal (data) {
    this.state.modal = data
  }

  updateRates () {
    const { timestamp } = this.rates
    console.log(timestamp, Date.now(), Date.now() - timestamp)

    axios
      .get('https://doriandrn.github.io/currencies-rates/rates.json')
      .then(data => { this.rates = data })
      .catch(e => { console.error('could not fetch rates', e) })
  }


  /**
   * Gets the translation for a specific item.
   *
   * @static
   * @param {string} key
   * @returns {string}
   * @memberof Lodger
   */
  @computed get translate () {
    const { i18n } = this
    return (key: string) => key.split('.').reduce((o,i)=>o[i], i18n)
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
      userId = this.state.activeUserId
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
      this.taxonomies[taxonomie].subscribe(subscriberName, { ... criteriuCerut })
    })
  }

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
    const opts = merge({ ... config.build }, options )
    const { state } = opts

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

    Taxonomy.db = await createRxDatabase(opts.db)

    const taxOpts = {
      timestamps: true
    }

    const taxesSchemas = await loadSchemas(taxonomies)
    const Taxonomies = await Promise.all(taxesSchemas.map(async schema => await Taxonomy.init(schema, taxOpts)))

    return new Lodger(
      Taxonomies,
      plugins,
      state
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
    if (!plugin || typeof plugin !== 'object') {
      throw new LodgerError(Errors.invalidPluginDefinition)
    }
    const { name } = plugin
    plugins.push(plugin)
  }

  async search (input: string, taxonomy ?: Taxonomy) {
    if (taxonomy) {}

    return results
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
    const json = await this.db.dump()
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
}

export {
  taxonomies,
  Lodger,
  Errors,
  Taxonomii,
  notify
}
