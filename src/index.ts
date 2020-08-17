

// import yaml from 'json2yaml'

// import { env } from '~/lib/defs/env'
import config from './lodger.config'
import { addRxPlugin, createRxDatabase, RxDatabaseCreator, RxDocument } from 'rxdb'
import supportedLangs from '~/lib/maintainable/langs'

import LodgerError from '~/lib/Error'
import Taxonomy from '~/lib/Taxonomy/Subscribable'

import notify from 'helper/notify'
import loadSchemas from 'helper/loadSchemas'
import { observable, computed } from 'mobx'

switch (process.env) {
  default:
    addRxPlugin(require('pouchdb-adapter-memory'))
    break

  case 'production':
    addRxPlugin(require('pouchdb-adapter-leveldb'))
    break
}

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

let plugins: LodgerPlugin[] = []
// let navigator = (typeof(window) !== undefined && window.navigator ? window.navigator : { language: 'ro-RO' })

let locale: string, translations

/**
 *
 * @class The main API
 * @implements {LodgerAPI}
 * @requires <rxdb> RxDatabase
 */
class Lodger implements LodgerAPI {
  @observable locale: string = locale
  get i18n () {
    return { ...translations }
  }

  /**
   * Creates an instance of Lodger.
   * @memberof Lodger
   */
  constructor (
    taxonomies: TaxesList = taxonomies,
    protected plugins: LodgerPlugin[] = []
  ) {
    // Assign taxonomies to this
    this.taxonomies = taxonomies.map(tax => {
      Object.defineProperty(this, tax.form.plural, {
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

      taxonomies.forEach(t => {
        const { name, plural } = t.form
        const parentsKeys = [`${name}Id`, plural].filter(key => tax.form.fieldsIds.indexOf(key) > -1)[0]
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


    // this.taxonomies = taxonomies.map(tax => tax.form.plural)
    this.supportedLangs = supportedLangs
  }

  static get locale () {
    return locale
  }

  static get shit () {
    return translations
  }

  static set locale (language) {
    const langCode = language.indexOf('-') > -1 ?
      language.split('-')[0] :
      language

    console.log('l' ,langCode)

    if (supportedLangs.map(lang => lang.code).indexOf(langCode) < 0)
      throw new LodgerError('Language not supported')

    locale = langCode
    console.log('ll', locale)

    try {
      translations = { ...require('./lib/locales/' + langCode).default }
      console.log('x', translations)
    } catch (e) {
      throw new Error('Could not find translations file for language: ', langCode, e)
    }
  }


  /**
   * Gets the translation for a specific item.
   *
   * @static
   * @param {string} key
   * @param {string} context
   * @returns
   * @memberof Lodger
   */
  static translate (key: string, context: string) {
    return translations[context][key] || translations[key]
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
      this.taxonomies[taxonomie].subscribe(subscriberName, criteriuCerut)
    })
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
  static async build (options: BuildOptions = { ... config.build }) {
    Taxonomy.db = await createRxDatabase(options.db)

    const taxesSchemas = await loadSchemas(taxonomies)
    const Taxonomies = await Promise.all(taxesSchemas.map(async schema => await Taxonomy.init(schema)))

    return new Lodger(
      Taxonomies,
      plugins
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
