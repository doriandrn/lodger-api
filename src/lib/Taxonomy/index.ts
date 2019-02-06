import { RxDocument, RxCollection, RxCollectionCreator, RxJsonSchema, RxDatabase } from 'rxdb'
import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import { LodgerFormCreator, Form } from "../Form"
import notify from '../helpers/notify'

import { sharedStoreMethods } from 'defs/sharedStoreMethods'
import { setupSharedMethods } from '../helpers/store'

import { observable } from 'mobx'

import Schema from '../Schema'

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
 interface LodgerTaxonomy<N extends Taxonomie, Interface = {}> {
  put (doc: LodgerDocument<Interface>): Promise<RxDocument<N>> | void
  trash (id: string): Promise<RxDocument<N> | null>
}

export type LodgerTaxonomyCreator<I> = LodgerFormCreator<I> & RxCollectionCreator

type LodgerTaxonomyCreatorOptions = {
  multipleSelect ?: boolean,
  shortGetters ?: boolean, // if the taxonomy should contain hot access to getters
  // store ?: boolean // whether it should use a Store module to store data
}

type LodgerDocument<I> = {
  [ab in keyof I] ?: any
  // readonly id ?: string,
}


/**
 * Store module
 *
 * may or may not be used
 * if one form  has the store option
 * it activates
 */
const $store: Store<any> = new Store({})
let $db: RxDatabase

/**
 * @class Taxonomy
 * @implements {LodgerTaxonomy}
 *
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */
export default class Taxonomy<T extends Taxonomie, Interface = {}>
  implements LodgerTaxonomy<T, Interface> {

  readonly isMultipleSelect ?: boolean = false
  // private referenceTaxonomies?: Taxonomy<Taxonomie>[]
  // private dependantTaxonomies?: Taxonomy<Taxonomie>[]

  static async init (
    data: LodgerTaxonomyCreator<{}>,
    options?: LodgerTaxonomyCreatorOptions
  ) {
    const { name, methods, statics, fields } = data

    const form = new Form(name, fields)
    const schema = new Schema(name, fields)

    const collectionCreator: RxCollectionCreator = {
      name,
      schema,
      methods,
      statics
    }

    const collection = await $db.collection(collectionCreator)

    return new Taxonomy(form, collection, options)
  }

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {Form<T, Interface>} form
   * @param {RxCollection<T>} collection
   * @memberof Taxonomy
   */
  constructor (
    protected form: Form<T, Interface>,
    protected collection: RxCollection<T>,
    options ?: LodgerTaxonomyCreatorOptions,
  ) {
    const { name } = this

    $store.registerModule(name, setupSharedMethods())

    if (options) {

      if (options.multipleSelect) {
        this.isMultipleSelect = true
      }
      console.error(mapGetters(name, Object.keys(sharedStoreMethods)))
      if (options.shortGetters) {
        Object.assign(this, mapGetters(name, Object.keys(sharedStoreMethods)))
        // define our getters with shortnames
        //   Object.keys($store.getters)
        //   .filter(key => key.startsWith(name))
        //   .map(key => {
        //     const shortKey = key.replace(`${name}/`, '')
        //     Object.defineProperty(this, shortKey, {
        //       get () { return $store.getters[key] }
        //     })
        //   })
      }
    }
  }

  /**
   *
   *
   * @readonly
   * @memberof Taxonomy
   */
  get name () {
    return this.collection.name
  }


  /**
   * Removes a Document by ID from the collection
   *
   * @param {string} id
   * @returns {RxDocument<T>} removed document
   * @memberof Taxonomy
   */
  async trash (id: string) {
    const { last, name } = this
    await this.collection.findOne(id).remove()

    // sets the previous id
    if (last === id) $store.dispatch(`${name}/set_last`, last)
  }


  /**
   * Inserts/upserts a new item in DB
   *
   * @param {Object} doc
   * @returns {RxDocument<Taxonomie>} the fresh document
   *
   * @memberof Taxonomy
   */
  async put (
    doc: Partial<Interface>
  ) {
    if (!doc || Object.keys(doc).length < 1)
      throw new TaxonomyError('Invalid doc supplied %%', { doc })

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = doc._id ?
      'upsert' :
      'insert'

    const { name } = this

    /**
     * do the insert / upsert and following actions
     */
    try {
      const _doc = await this.collection[method](doc)
      const id = _doc._id

      $store.dispatch(`${name}/set_last`, id)

      notify({
        type: 'success',
        text: `pus ${name} ${id}`
      })

      return _doc
    } catch (e) {
      notify({ type: 'error', text: String(e) })
    }
  }

  /**
   * @readonly
   * @memberof Taxonomy
   * Taxonomy default config
   */
  get config () {
    const { taxonomii } = LodgerConfig
    const { defaults } = taxonomii
    return taxonomii[this.name] || defaults
  }
}
