import { Taxonomii } from "index";
import { RxDocument, RxCollection, RxDatabase } from 'rxdb'
import { Form } from './Form'
import LodgerConfig from 'lodger.config'
import { TaxonomyError } from './Errors'
import { predefinite } from 'forms/serviciu'
import { RootState } from "./Store";
import { GetterTree } from 'vuex'

 /**
  * @interface LodgerTaxonomy
  */
 interface LodgerTaxonomy<N extends Taxonomie> {
   readonly plural: Plural<N>,
   readonly subscribed: Boolean,
   readonly hasReference: Boolean,
   readonly referenceTaxonomies: LodgerTaxonomy<Taxonomie>[],
   readonly dependantTaxonomies: LodgerTaxonomy<Taxonomie>[],
   readonly getters: GetterTree<Taxonomie, RootState>,

   collection: RxCollection<N>,
   storeModule: {}

   actives: {
    documents: { [k in keyof SubscribersList]: RxDocument<N, any> },
    subscribers: LodgerSubscriber[]
   }

   put (data: Object): Promise<RxDocument<N>> | void
   trash (id: string): Promise<Boolean>
   select (id: string, subscriberName: string): void

   subscribe: () => Promise<Subscriber> //wrapper to lodger.subscribe(tax)
   onFirstTimeInit: () => void
 }

export interface LodgerTaxonomyCreator<N extends Taxonomie> {
  new (name: N, form: Form, collection: RxCollection<N>): LodgerTaxonomy<N>,
}

 type LodgerTaxes = {
   [k in Taxonomii]: () => LodgerTaxonomy<Taxonomie>
 }

/**
 * @class Taxonomy
 * @implements {Taxonomie} LodgerTaxonomy
 *
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */
export class Taxonomy implements LodgerTaxonomy<Taxonomie> {
  collection: RxCollection<Taxonomie>
  actives = {
    documents: {},
    subscribers: []
  }

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {Taxonomie} name
   * @param {Form} form
   * @memberof Taxonomy
   */
  constructor (
    readonly name: Taxonomie,
    readonly form: Form
  ) {
  }

  async subscribe (
    subscriberName : string = 'main',
    criteriuCerut ?: Criteriu,
  ) {

  }

  /**
   * Inserts a new item in DB
   *
   * @param {Object} data
   * @returns {RxDocument<Taxonomie>} the fresh document
   * @memberof Taxonomy
   */
  async put (
    data: { _id ?: string},
  ) {
    if (!data || Object.keys(data).length < 1)
      throw new TaxonomyError(Errors.missingData, data)

    const { collection } = this

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = data._id ?
      'upsert' :
      'insert'

    // const form = forms[taxonomy]
    // const references = form.referenceTaxonomies
    // const referencesIds = this.activeReferencesIds(references)

    /**
     * add references, default values, etc
     */
    const internallyHandledData = handleOnSubmit(data, { referencesIds, store })

    /**
     * do the insert / upsert and following actions
     */
    try {
      const doc = await collection[method](internallyHandledData)
      const id = doc._id
      this.store.dispatch(`${taxonomy}/set_last`, id)
      this.select(taxonomy, { doc, id, subscriber })

      this.notify({
        type: 'success',
        text: `pus ${taxonomy} ${id}`
      })
      return doc
    } catch (e) {
      this.notify({
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
    data: SelectedItemData
  ) {
    const { plural, store: { dispatch } } = this
    const isObj = typeof data === 'object' && data !== null

    const id = isObj && data.id ? data.id : data
    const subscriber = isObj && data.subscriber ? data.subscriber : undefined

    await dispatch(`${taxonomie}/select`, id)

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

  set collection (col: RxCollection<Taxonomie>) {
    this.collection = col
  }

  /**
   * Reference taxonomies of a taxonomy
   * @memberof Taxonomy
   * @returns {Array} taxonomii
   */
  get referenceTaxonomies () {
    const { fields } = this.form

    return <Taxonomie[]>fields
      .filter(field => field.id.indexOf('Id') === field.id.length - 2)
      .map(field => field.id.replace('Id', ''))
  }

  /**
   * Checks for a reference taxonomy of taxonomy
   *
   * @readonly
   * @memberof Taxonomy
   * @returns {Boolean} has a reference taxonomy or not
   */
  get hasReference () {
    return true
  }

  /**
   * @readonly
   * @memberof Taxonomy
   * @returns {Boolean} if subscribed anywhere
   */
  get subscribed () {
    return this.actives.subscribers.length > 0
  }

  /**
   * @readonly
   * @memberof Taxonomy
   * @returns {String} plural of taxonomy
   */
  get plural () {
    return this.form.plural
  }

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
  get isMultipleSelecct () {
    return ['Serviciu', 'Contor'].indexOf(this.name) > -1
  }

  async onFirstTimeSubscribe () {
    const { name, collection, store } = this
    switch (name) {
      // insert predefined services
      case 'Serviciu':
        predefinite.forEach(async denumire => { await collection.insert({ denumire }) })
        break

      // insert admin user
      case 'Utilizator':
        const { _id } = await collection.insert({
          name: 'Administrator',
          rol: 'admin'
        })
        store.dispatch('utilizator/set_active', _id)
        break
    }

    subscribedTaxes.push(name)
  }
}

const subscribedTaxes: Taxonomie[] = []

type LodgerTaxonomyCreatorContext = {
  db: RxDatabase,
  store: Store
}

export class TaxonomiesHolder implements LodgerTaxes {
  subscribedTaxes = []

  constructor (
    taxonomii: Taxonomie[],
    context: LodgerTaxonomyCreatorContext,
    collections: RxCollection<Taxonomie>[]
  ) {
    taxonomii.forEach(async (tax: Taxonomie) => {
      const form = await Form.load(tax)
      const { plural } = form
      this[tax] = new Taxonomy(tax, form, collections[plural])
    })
  }
}

// const xx: LodgerTaxonomyCreator<Taxonomie> = new Taxonomy('asociatie', 'form', 'collection')
/**
 * gets the sorting options for tax
 * @returns an object with each key used as a sorting option
 */
// get sortOptions () {
//   const { indexables, name } = this

//   if (!['serviciu', 'contor'].indexOf(name)) {
//     indexables.push('la')
//   }

//   // TODO: !!! ia din common methods
//   const sorts = {}
//   indexables.forEach(indexable => {
//     const label = `sort.${indexable === 'name' ? 'az' : indexable}`
//     Object.assign(sorts, { [indexable]: { label } })
//   })

//   // debug(`${name} => sortable fields`, sorts)

//   return sorts
// }
/**
 * Items to be display to user,
 * @returns {Object} the keys of the fields: their position
 *
 */
// get __displayItemKeys () {
//   const { fields } = this.data

//   return Object.assign({}, ...fields
//     .filter(field => field.showInList)
//     .map(field => ({ [field.id]: field.showInList }) )
//   )
// }
