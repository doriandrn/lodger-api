import Debug from 'debug'
import { RxDatabase, RxDatabaseCreator, RxCollectionCreator, RxDocument } from 'rxdb'
import fs, { PathLike } from 'fs'
import yaml from 'json2yaml'

import config from './lodger.config'
import { env } from '~/lib/defs/env'

import LodgerError from '~/lib/Error'

import DB from '~/lib/DB'
import Taxonomy from '~/lib/Taxonomy/Subscribable'

import notify from 'helper/notify'

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


type FormsHolder = { [k in Taxonomie & Forms]: Form<k> }

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

/**
 *
 * @class The main API
 * @implements {LodgerAPI}
 * @requires <rxdb> RxDatabase
 */
class Lodger implements LodgerAPI {

  /**
   * Creates an instance of Lodger.
   * @param {FormsHolder} forms
   * @param {RxDatabase} db
   * @memberof Lodger
   */
  constructor (
    taxonomies: TaxesList = {},
    protected plugins: LodgerPlugin[] = []
  ) {
    Object.defineProperties(this, taxonomies)
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

  // /**
  //  * Array of taxonomies that have no reference
  //  * root taxonomies
  //  *
  //  * @returns {Array}
  //  */
  // get taxonomiesWithoutReference () {
  //   const { forms } = this
  //   return this.taxonomies.filter(tax => {
  //     const refs = forms[tax].referenceTaxonomies
  //     return !(refs && refs.length)
  //   })
  // }

  /**
   * Sets a preference either in DB or store
   *
   */
  // async setPreference (preference: string, value: any) {
  //   const debug = Debug('lodger:set')
  //   const { store } = this
  //   const allowedTaxonomies = ['client', 'user']
  //   if (!preference) throw new LodgerError(Errors.invalidPreferenceIndex)
  //   const taxonomy = preference.split('.')[0]
  //   if (!taxonomy || allowedTaxonomies.indexOf(taxonomy) < 0) {
  //     throw new LodgerError(Errors.invalidPreferenceIndex)
  //   }

  //   debug('setting preference', preference, value)

  //   switch (taxonomy) {
  //     case 'client':
  //       store.commit('preferences/update', {
  //         path: preference.replace('client.', ''),
  //         value
  //       })
  //       break

  //     case 'user':
  //       // db.collections.utilizator....
  //       break
  //   }
  // }

  // /**
  //  * Lodger Getters
  //  * All UI connects with this
  //  * combines DB & Store getters
  //  *
  //  */
  // get getters () {
  //   return this.store.getters
  // }


  /**
   * Combined preferences getter
   * gets values from DB and store
   */
  // get preferences () {
  //   const { db, store } = this
  //   const preferences: Preferences = {
  //     client: store.getters.preferences,
  //     user: db.collections['preferences']
  //   }
  //   return preferences
  // }

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
    Taxonomy.db = await DB.create(options.db)

    // strings only from enums


    // const formsNames = [...taxes, ...Object.keys(Forms).filter(form => typeof Forms[form as any] === 'number')]

    // // objects initializers / clses
    // const forms: FormsHolder = Object.assign({},
    //   ...await Promise.all(formsNames.map(formName =>
    //     ({ [formName]: Form.load(formName) })
    //   ))
    // )

    const Taxonomies = Object.assign({},
      ...taxes.map(async tax =>
        ({ [tax]: await Taxonomy.init(tax) })
      ))


    /**
     * When a taxonomy item gets SELECTED,
     * try to call all DB methods for refrences of the taxonomy
     *
     */
    // store.subscribe(async ({ type, payload }, state) => {
    //   const path = type.split('/')
    //   if (path[1] !== 'select') return
    //   const debug = Debug('lodger:SELECTstoreSubscriber')
    //   const tax = path[0]

    //   debug('payload', payload)
    //   if (!payload) return

    //   const id = typeof payload === 'string' ? payload : payload.id
    //   if (id === store.getters[`tax/selected`]) return

    //   const reference = { [`${tax}Id`]: id }
    //   const { referenceTaxonomies } = forms[tax]

    //   // taxonomies that depend on the selected tax and subscriber
    //   // todo: move from here
    //   const dependentTaxonomies: Taxonomie[] = []
    //   Object.keys(forms).forEach((taxForm) => {
    //     const { referenceTaxonomies } = forms[taxForm]
    //     if (!referenceTaxonomies || referenceTaxonomies.indexOf(tax) < 0) return
    //     dependentTaxonomies.push(<Taxonomie>taxForm)
    //   })
    //   debug(`${tax} dep taxes:`, dependentTaxonomies)

    //   // call methods of references documents
    //   referenceTaxonomies.forEach(async (refTax: Taxonomie) => {
    //     const refdoc = store.getters[`${refTax}/activeDoc`]
    //     // debug(`refdoc ${tax} (${refTax})`, refdoc)
    //     if (!refdoc) return
    //     const method = refdoc[`toggle_${tax}`]
    //     if (!method || typeof method !== 'function') return
    //     await method(id)
    //     debug(`called references methods for ${refTax}`)
    //   })

    //   // update find criteria in DH with selected Item
    //   if (dependentTaxonomies.length) {
    //     dependentTaxonomies.forEach(dTax => {
    //       const subscriber = payload.subscriber || 'main'
    //       const { plural } = forms[dTax]
    //       const holder = vueHelper.subsData[subscriber][plural]
    //       if (!holder || !holder.criteriu) return
    //       debug('asignez', dTax, subscriber, reference)
    //       holder.criteriu.find = { ...reference }

    //       // deselect
    //       store.dispatch(`${dTax}/select`, { id: null, subscriber })
    //     })
    //     debug('ass dun')
    //   }
    // })

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
    await Taxonomy.destroy()
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
  taxonomies,
  Lodger,
  Errors,
  Taxonomii,
  notify
}
