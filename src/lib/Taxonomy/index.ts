import { RxDocument, RxCollection, RxCollectionCreator, RxDatabase } from 'rxdb'
import { observable, computed } from 'mobx'

import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import { LodgerFormCreator, Form } from "../Form"
import notify from '../helpers/notify'

import { env } from '../defs/env'

export type TaxonomyCreator<I> = LodgerFormCreator<I>

type LodgerTaxonomyCreatorOptions = {
  multipleSelect ?: boolean,
  timestamps ?: boolean
}

enum Errors {
  noDB = 'Please setup a DB first!'
}

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
interface LodgerTaxonomy<N extends Taxonomie, Interface = {}> {
  readonly collection: RxCollection
  readonly last ?: string

  put (doc: LodgerDocument & Partial<Interface>): Promise<RxDocument<N>> | void
  trash (id: string): Promise<void | null>
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
  @observable refsIds: string[] = []
  @observable totals: number = 0

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
  static set db (xdb: RxDatabase) {
    db = xdb
  }

  /**
   * @alias db.destroy
   *
   * @static
   * @memberof Taxonomy
   */
  static async destroy () {
    if (!db) return
    await db.destroy()
  }

  get plural () {
    return this.form.plural
  }

  /**
   * Init function that builds up the form and collection
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
      throw new TaxonomyError(Errors.noDB)

    try {
      const { name, fields, fieldsets, methods, statics, hooks } = data
      const { timestamps } = options

      const form = new Form({ name, fields, fieldsets, hooks }, {
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
    collection: RxCollection<T>,
    readonly options ?: LodgerTaxonomyCreatorOptions,
  ) {
    // kinda hide the property for snapshots
    Object.defineProperty(this, 'collection', {
      enumerable: false,
      writable: false,
      value: collection
    })
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
    try {
      await this.collection.findOne(id).remove()
      if (this.last === id) this.last = undefined
      this.totals -= 1
    } catch (e) {
      notify({
        type: 'error',
        text: e
      })
    }
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
      this.totals += 1

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
