import { RxDocument, RxCollection, RxCollectionCreator, RxDatabase, RxDatabaseBase } from 'rxdb'
import { observable, computed, action } from 'mobx'

import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import { LodgerFormCreator, Form } from "../Form"
import notify from '../helpers/notify'

import { env } from '../defs/env'

export type TaxonomyCreator<I> = LodgerFormCreator<I> & RxCollectionCreator

type LodgerTaxonomyCreatorOptions = {
  multipleSelect ?: boolean,
  timestamps ?: boolean
}

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
interface LodgerTaxonomy<N extends Taxonomie, Interface = {}> {
  put (doc: LodgerDocument & Partial<Interface>): Promise<RxDocument<N>> | void
  trash (id: string): Promise<RxDocument<N> | null>

  readonly last ?: string
}

let db: RxDatabase

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

  @observable lastItems: string[] = []

  /**
   * Last added item's id
   *
   * @readonly
   * @memberof Taxonomy
   */
  @computed get last () {
    return this.lastItems[0]
  }

  set last (id : string | undefined) {
    if (id) this.lastItems.unshift(id)
    else this.lastItems.shift()
  }

  /**
   * DB handler
   *
   * @static
   * @memberof Taxonomy
   */
  static set db (xdb) {
    db = xdb
  }

  static get db () {
    return db
  }

  get plural () {
    return this.form.plural
  }

  /**
   * Init function that builds up the schema and form
   *
   * @static
   * @param {TaxonomyCreator<Taxonomie>} data
   * @param {LodgerTaxonomyCreatorOptions} [options={}]
   * @returns {Taxonomy}
   * @memberof Taxonomy
   */
  static async init (
    data: TaxonomyCreator<Taxonomie>,
    options: LodgerTaxonomyCreatorOptions = {}
  ) {
    if (!db)
      throw new TaxonomyError('Please setup a DB first')

    try {
      const { fields, methods, statics, name } = data
      const { timestamps } = options

      const form = new Form({ name, fields }, {
        captureTimestamp: timestamps
      })

      const { schema } = form

      const collectionCreator = {
        name,
        schema,
        methods,
        statics
      }

      const collection = await db.collection(collectionCreator)

      return new this(form, collection, options)
    } catch (e) {
      throw new TaxonomyError(e)
    }
  }

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {Form<T, Interface>} form
   * @param {RxCollection<T>} collection
   * @memberof Taxonomy
   */
  constructor (
    protected form: Form<Interface>,
    protected collection: RxCollection<T>,
    readonly options ?: LodgerTaxonomyCreatorOptions,
  ) {
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
    if (this.last === id) this.last = undefined
    return await this.collection.findOne(id).remove()
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
    doc: Partial<Interface> & LodgerDocument
  ) {
    if (!doc || Object.keys(doc).length < 1)
      throw new TaxonomyError('Invalid doc supplied %%', { doc })

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = doc._id ?
      'upsert' :
      'insert'

    const { name, options } = this

    if (options && options.timestamps) {
      Object.assign(doc, { [method === 'insert' ? 'createdAt': 'updatedAt']: new Date().getTime() })
    }

    /**
     * do the insert / upsert and following actions
     */
    try {
      const _doc = await this.collection[method](doc)
      const id = _doc._id

      this.last = id

      notify({
        type: 'success',
        text: `[${method}] ${name}!${['dev', 'test'].indexOf(env) > -1 ? `(${id})` : ''}`
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
