import { RxDocument, RxCollection } from 'rxdb'
import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import { GetterTree } from 'vuex'

import notify from '../helpers/notify'

import { setupSharedMethods } from '../helpers/store'

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
 interface LodgerTaxonomy<N extends Taxonomie> {
  put (data: Object): Promise<RxDocument<N>> | void
  trash (id: string): Promise<RxDocument<N> | null>
}

/**
 * @class Taxonomy
 * @implements {LodgerTaxonomy}
 *
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */
export default class Taxonomy<T extends Taxonomie> implements LodgerTaxonomy<T> {
  // private referenceTaxonomies?: Taxonomy<Taxonomie>[]
  // private dependantTaxonomies?: Taxonomy<Taxonomie>[]
  readonly getters: GetterTree<> = {}

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {RxCollection<T>} collection
   * @param {Store<T>} store
   * @memberof Taxonomy
   */
  constructor (
    protected collection: RxCollection<T>,
    readonly store: Store<T>
  ) {
    const { name } = this
    store.registerModule(name, setupSharedMethods())
    const { getters } = store

    // define this.getters with shortnames
    Object.keys(getters)
      .filter(key => key.startsWith(name))
      .map(key => {
        const shortKey = key.replace(`${name}/`, '')
        Object.defineProperty(this.getters, shortKey, {
          get () { return this.store.getters[key] }
        })
      })
  }

  /**
   * name getter
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
    data: { _id ?: string },
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
      this.store.dispatch(`${name}/set_last`, id)

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
