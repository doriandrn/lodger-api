import { RxDocument, RxCollection } from 'rxdb'
import LodgerConfig from 'lodger.config'
import TaxonomyError from '../Error'
import notify from '../helpers/notify'

/**
  * Taxonomy item
  *
  * @interface LodgerTaxonomy
  */
 interface LodgerTaxonomy<N extends Taxonomie, S> {
  readonly hasReference: boolean,

  readonly collection: RxCollection<N>,
  readonly store: Store<S>

  put (data: Object): Promise<RxDocument<N>> | void
  trash (id: string): Promise<RxDocument<N>>
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
  referenceTaxonomies?: Taxonomy<Taxonomie>[]
  dependantTaxonomies?: Taxonomy<Taxonomie>[]

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
    store.registerModule(this.name, {})
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
    await this.collection.findOne(id).remove()
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
    data: { _id ?: string},
  ) {
    if (!data || Object.keys(data).length < 1)
      throw new TaxonomyError('Missing fields %%', data)

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = data._id ?
      'upsert' :
      'insert'


    /**
     * do the insert / upsert and following actions
     */
    try {
      const doc = await this.collection[method](data)
      const id = doc._id
      this.store.dispatch(`set_last`, id)
      this.select({ doc, id, subscriber })

      notify({
        type: 'success',
        text: `pus ${this.name} ${id}`
      })
      return doc
    } catch (e) {
      notify({
        type: 'error', text: String(e)
      })
    }
  }

  /**
   * select an item
   * brings in the active Document from DB
   *
   * @param taxonomie
   * @param id
   */
  async select (
    id: string | string[]
    // data: SelectedItemData
  ) {
    this.store.dispatch('select', id)
    // const { plural, store: { dispatch } } = this
    // const isObj = typeof data === 'object' && data !== null

    // const id = isObj && data.id ? data.id : data
    // const subscriber = isObj && data.subscriber ? data.subscriber : undefined

    // await dispatch(`${taxonomie}/select`, id)


    // // deselect
    // if (!id) {
    //   await dispatch(`${taxonomie}/select`, undefined)
    //   return
    // }

    // // delay this, await for changes from rxdbb
    // const doc = isObj && data.doc ?
    //   data.doc :
    //   await vueHelper.getItem(plural, id, subscriber)

    // debug('selected doc', doc._id)

    // if (!doc) {
    //   throw new LodgerError('invalid id supplied on select %%', id)
    // } else {
    //   this._activeDocument = { taxonomie, doc }
    //   await dispatch(`${taxonomie}/select`, id)
    // }

    // on deselect, unsubscribe
    // if (id === null) await this.unsubscribe(plural, subscriber) //todo: use data.subscribe .unsubscribe()
  }

  // /**
  //  * Binds a RXCollection to taxonomy
  //  *
  //  * @memberof Taxonomy
  //  * @param {RxCollection<Taxonomie>} collection
  //  * @returns {RxCollection | undefined}
  //  */
  // get collection () {
  //   return this.collection
  // }

  // set collection (col: RxCollection<Taxonomie>) {
  //   this.collection = col
  // }

  /**
   * Reference taxonomies of a taxonomy
   * @memberof Taxonomy
   * @returns {Array} taxonomii
   */
  // get referenceTaxonomies () {
  //   const { fields } = this.form

  //   return <Taxonomie[]>fields
  //     .filter(field => field.id.indexOf('Id') === field.id.length - 2)
  //     .map(field => field.id.replace('Id', ''))
  // }

  /**
   * Checks for a reference taxonomy of taxonomy
   *
   * @readonly
   * @memberof Taxonomy
   * @returns {Boolean} has a reference taxonomy or not
   */
  get hasReference () {
    return this.referenceTaxonomies.length > -1
  }



  /**
   * @readonly
   * @memberof Taxonomy
   * @returns {String} plural of taxonomy
   */
  // get plural () {
  //   return this.form.plural
  // }

  /**
   * @readonly
   * @memberof Taxonomy
   * Taxonomy default config
   */
  get config () {
    const { taxonomii } = LodgerConfig
    const { defaults } = taxonomii
    return taxonomii[this.plural] || defaults
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
