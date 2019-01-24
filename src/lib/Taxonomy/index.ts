import { RxDocument, RxCollection, RxCollectionCreator, RxJsonSchema } from 'rxdb'
import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import { LodgerFormCreator, Form } from "../Form"
import notify from '../helpers/notify'

import { setupSharedMethods } from '../helpers/store'
import Schema from '../Schema';

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
 interface LodgerTaxonomy<N extends Taxonomie, Interface = {}> {
  put (data: PutData<Interface>): Promise<RxDocument<N>> | void
  trash (id: string): Promise<RxDocument<N> | null>
}

export type LodgerTaxonomyCreator<I> = LodgerFormCreator<I> & RxCollectionCreator

type PutData<I> = {
  [i in keyof I] ?: any
}

type CommonFields = {
  _id ?: string // item's ID
  la: number // Data adaugarii / datetime when added
}

/**
 * Common fields for all TAXONOMIES
 *
 */
export const commonFields: FieldCreator<CommonFields>[] = [
  // {
  //   id: '_id',
  //   excludeFrom: 'all',
  //   value: ({ activeDoc }) => activeDoc._id
  // },
  {
    id: 'la',
    type: 'dateTime',
    required: true, // for filters / sorts
    index: true,
    excludeFrom: ['addForm', 'editForm'],
    showInList: 'secondary'
  }
]

/**
 * @class Taxonomy
 * @implements {LodgerTaxonomy}
 *
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */
export default class Taxonomy<T extends Taxonomie, Interface = {}> extends Form implements LodgerTaxonomy<T, Interface> {
  // private referenceTaxonomies?: Taxonomy<Taxonomie>[]
  // private dependantTaxonomies?: Taxonomy<Taxonomie>[]
  readonly name: Plural<T>
  protected collection: RxCollection<T>

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {RxCollection<T>} collection
   * @param {Store<T>} store
   * @memberof Taxonomy
   */
  constructor (
    data: LodgerTaxonomyCreator<Interface>,
  ) {
    super(data.name, data.fields)
    this.name = data.name.plural()
    const { methods, statics } = data
    const { name, $db, $store } = this

    commonFields.map(field => super.addField(field))

    const collectionCreator: RxCollectionCreator = {
      name,
      schema: new Schema(this),
      methods,
      statics
    }

    $db.collection(collectionCreator).then((col: RxCollection<T>) => {
      this.collection = col
    })
    $store.registerModule(name, setupSharedMethods())

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

  /**
   * name getter
   *
   * @readonly
   * @memberof Taxonomy
   */
  // get name () {
  //   return this.collection.name
  // }


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
   * @param {Object} data
   * @returns {RxDocument<Taxonomie>} the fresh document
   *
   * @memberof Taxonomy
   */
  async put (
    data: PutData<Interface>
  ) {
    if (!data || Object.keys(data).length < 1)
      throw new TaxonomyError('Missing data %%', data)

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = data._id ?
      'upsert' :
      'insert'

    const { name } = this

    /**
     * do the insert / upsert and following actions
     */
    try {
      const doc = await this.collection[method](data)
      const id = doc._id
      this.$store.dispatch(`${name}/set_last`, id)

      notify({
        type: 'success',
        text: `pus ${name} ${id}`
      })
      return doc
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
