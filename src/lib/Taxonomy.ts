import { Taxonomii } from "index";
import { RxDocument, RxCollection, RxDatabase, RxDocumentBase, RxQuery } from 'rxdb'
import { Form } from './Form'
import { Subscriber } from './Subscriber'
import LodgerConfig from 'lodger.config'
import TaxonomyError from './Error'
import { predefinite } from 'forms/serviciu'
import { RootState } from "./Store";
import { GetterTree, ActionTree, Dispatch } from 'vuex'

 /**
  * @interface LodgerTaxonomy
  */
 interface LodgerTaxonomy<N extends Taxonomie> {
  readonly plural: Plural<N>,
  readonly subscribed: Boolean,
  readonly hasReference: Boolean,
  readonly referenceTaxonomies: Taxonomy<Taxonomie>[],
  readonly dependantTaxonomies: Taxonomy<Taxonomie>[],
  readonly searchMap: SearchMap<N>

  collection: RxCollection<N>,
  store: {
    getters: GetterTree<Taxonomie, RootState>,
    dispatch: Dispatch
  }
  actives: {
    readonly documents: RxDocument<N, any>[],
    subscribers: {
      [k in keyof SubscribersList]: Subscriber<N>[]
    }
  }

  put (data: Object): Promise<RxDocument<N>> | void
  trash (id: string): Promise<RxDocument<N>>
  select (id: string, subscriberName: string): void
  search (input: string): Promise<SearchResults>

  subscribe (name: string, criteriu ?: Criteriu): Promise<Subscriber<N>>
  unsubscribeAll: (subscriberName?: string) => void

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
export class Taxonomy<T extends Taxonomie> implements LodgerTaxonomy<T> {
  collection: RxCollection<T>
  actives = {
    documents: [],
    subscribers: {}
  }

  /**
   * Creates an instance of Taxonomy.
   *
   * @param {Taxonomie} name
   * @param {Form} form
   * @memberof Taxonomy
   */
  constructor (
    readonly name: T,
    readonly form: Form
  ) {
  }

  /**
   * Subscribes
   *
   * @param {string} [subscriberName='main']
   * @param {Criteriu} [criteriuCerut]
   * @returns {Promise<Subscriber<T>>} the unwatcher for subscriber
   * @memberof Taxonomy
   */
  subscribe (
    subscriberName : string = 'main',
    criteriuCerut ?: Criteriu
  ): Promise<Subscriber<T>> {
    return new Subscriber(subscriberName, this).subscribe(criteriuCerut)
  }

  /**
   * Kills all active listeners for a given subscriber name
   *
   * @param {string} [subscriberName='main']
   * @returns {Promise}
   * @memberof Taxonomy
   */
  unsubscribeAll (subscriberName: string = 'main') {
    const subscribers = this.actives.subscribers[subscriberName]

    return Promise.all(
      Object.keys(subscribers).map(async subscriber => {
        await subscribers[subscriber].unsubscribe()
      })
    )
  }

  /**
   * Removes a Document by ID from the DB
   *
   * @param {string} id
   * @returns {RxDocument<T>} removed document
   * @memberof Taxonomy
   */
  async trash (id: string) {
    const doc: RxQuery<T, RxDocument<T>> = await this.collection.findOne(id)
    return await doc.remove()
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

    const { collection, form } = this

    /**
     * If form submitted with an _id, must be an upsert
     */
    const method = data._id ?
      'upsert' :
      'insert'

    /**
     * add references, default values, etc
     */
    const finalData = form.value(true)

    // const internallyHandledData = handleOnSubmit(data, { referencesIds, store })

    /**
     * do the insert / upsert and following actions
     */
    try {
      const doc = await collection[method](finalData)
      const id = doc._id
      this.store.dispatch(`set_last`, id)
      this.select({ doc, id, subscriber })

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

  // set collection (col: RxCollection<Taxonomie>) {
  //   this.collection = col
  // }

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
  get isMultipleSelect () {
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
// /**
//  * Pt taxonomia ceruta
//  * ia formul
//  * si tot ce are nevoie de Id de altceva
//  * se populeaza
//  *
//  * @param {Object} { references, getters }
//  * @returns {Object} eg { asociatieId: 'XXXX' }
//  */
// function assignRefIdsFromStore (context: any) {
//   const { references, getters } = context
//   if (!(references && references.length)) return

//   const refsObj = {}

//   references.map((tax: Taxonomie) => {
//     refsObj[`${tax}Id`] = getters[`${tax}/selected`]
//   })

//   return refsObj
// }


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


// // Filters the documents array for the one with the id
// export const getRxDocumentById = (docs: RxDocument<Taxonomie, any>[], id: string) => {
//   if (!docs.length)
//     throw new LodgerError('Empty docs provided: %%')
//   const doc = docs.filter(doc => doc._id === id)[0]
//   if (!(doc && isRxDocument(doc)))
//     throw new LodgerError('No document found %%', { id })
//   return doc
// }

//
  /**
   * Active document for taxonomy
  */
//  protected set _activeDocument (docHolder: ActiveDocumentHolder) {
//   let { taxonomie, doc } = docHolder
//   const debug = Debug('lodger:_activeDocument')
//   const gName = `${taxonomie}/activeDoc`
//   const { store } = this

//   if (!store.getters.hasOwnProperty(gName)) {
//     Object.defineProperty(store.getters, gName, {
//       configurable: false,
//       get () { return doc },
//       set (newDoc) { doc = newDoc }
//     })
//   } else {
//     store.getters[gName] = doc
//   }
// }
