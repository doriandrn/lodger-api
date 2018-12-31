import { Taxonomii } from "index";
import { RxDocument, RxCollection, RxDatabase } from 'rxdb'
import { Form } from './Form'
import { TaxonomyError } from './Errors'
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
   activeDocuments: {
     [k in keyof SubscribersList]: RxDocument<N, any>
   },
  //  sortOptions: SortOptions,
   subscribe: () => Promise<Subscriber> //wrapper to lodger.subscribe(tax)
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
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */
export class Taxonomy implements LodgerTaxonomy<Taxonomie> {
  constructor (
    readonly name: Taxonomie,
    readonly form: Form
  ) {
  }

  /**
   * Binds a RXCollection to taxonomy
   *
   * @param {RxCollection<Taxonomie>} collection
   * @returns {RxCollection | undefined}
   */
  get collection () {
    return this.collection
  }

  set collection (col: RxCollection<Taxonomie>) {
    this.collection = col
  }

  /**
   * Reference taxonomies of a taxonomy
   *
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
   * @returns {Boolean} has a reference taxonomy or not
   */
  get hasReference () {
    return true
  }

  /**
   *
   * @returns {Boolean} if subscribed anywhere
   */
  get subscribed () {
    return true
  }

  /**
   * @returns {String} plural of taxonomy
   */
  get plural () {
    return this.form.plural
  }
}

type LodgerTaxonomyCreatorContext = {
  db: RxDatabase,
  store: Store
}

export class TaxonomiesHolder implements LodgerTaxes {

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
