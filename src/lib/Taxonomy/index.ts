import { RxDocument, RxCollection, RxCollectionCreator, RxJsonSchema, RxDatabase } from 'rxdb'
import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import { LodgerFormCreator, Form } from "../Form"
import notify from '../helpers/notify'

import { setupSharedMethods } from '../helpers/store'
import Schema from '../Schema';
import { Store } from 'vuex';

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
 interface LodgerTaxonomy<N extends Taxonomie, Interface = {}> {
  put (doc: LodgerDocument<Interface>): Promise<RxDocument<N>> | void
  trash (id: string): Promise<RxDocument<N> | null>

  // static init (data: LodgerTaxonomyCreator<Interface>): Taxonomy<T, Interface>
}

export type LodgerTaxonomyCreator<I> = LodgerFormCreator<I> & RxCollectionCreator

type LodgerTaxonomyCreatorOptions = {
  multipleSelect: boolean,
  shortGetters ?: boolean, // if the taxonomy should contain hot access to getters
  store ?: boolean // whether it should use a Store module to store data
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
let $store: Store<any>, $db: RxDatabase

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
  extends Form<T, Interface>
  implements LodgerTaxonomy<T, Interface> {

  // private referenceTaxonomies?: Taxonomy<Taxonomie>[]
  // private dependantTaxonomies?: Taxonomy<Taxonomie>[]

  static async init (data: LodgerTaxonomyCreator<{}>, options) {
    const { name, methods, statics, fields } = data

    const form = new Form(data.name, data.fields)
    // const schema = new Schema(name, form.fields)

    const collectionCreator: RxCollectionCreator = {
      name,
      schema: form.super,
      methods,
      statics
    }

    const collection = await $db.collection(collectionCreator)

    return new Taxonomy({ name, fields }, collection, options)

  }

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {RxCollection<T>} collection
   * @param {Store<T>} store
   * @memberof Taxonomy
   */
  constructor (
    data: LodgerFormCreator<Interface>,
    protected collection: RxCollection<T>,
    options ?: LodgerTaxonomyCreatorOptions,
  ) {
    super(data.name, data.fields, {
      captureTimestamp: true,
    })

    const { name } = this

    // commonFields.map(field => super.addField(field))

    if (options) {
      if (options.shortGetters) {
         // define our getters with shortnames
        Object.keys($store.getters)
        .filter(key => key.startsWith(name))
        .map(key => {
          const shortKey = key.replace(`${name}/`, '')
          Object.defineProperty(this, shortKey, {
            get () { return $store.getters[key] }
          })
        })
      }

      if (options.store) {
        if (!$store) {
          $store = new Store({})
        }
        $store.registerModule(name, setupSharedMethods())
      }
    }
  }

  get name () {
    return super.plural
  }


  /**
   * Removes a Document by ID from the collection
   *
   * @param {string} id
   * @returns {RxDocument<T>} removed document
   * @memberof Taxonomy
   */
  async trash (id: string) {
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
    doc: LodgerDocument<Interface>
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

  get defaultCriteriu () {
    return this.config.criteriu
  }

  /**
   *
   *
   * @readonly
   * @memberof Taxonomy
   * @returns {Boolean} if taxonomy represents a multiple select choice
   */
  get isMultipleSelect () {
    return ['Serviciu', 'Contor'].indexOf(this.name) > -1
  }
}
