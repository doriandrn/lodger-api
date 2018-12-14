import { Taxonomii } from "index";
import { RxDocument, RxCollection } from 'rxdb'
import { Form } from './Form'
import { TaxonomyError } from './Errors'
import { RootState } from "./Store";
import { GetterTree } from 'vuex'

/**
 * Taxonomy
 *  get subscribed: Boolean
 *  get hasReference: Boolean
 *
 */

 interface LodgerTaxonomy<N extends Taxonomie> {
  //  readonly form: Form,
  //  readonly name: N,
   readonly plural: Plural<N>,
   readonly subscribed: Boolean,
   readonly hasReference: Boolean,
   readonly referenceTaxonomies: LodgerTaxonomy<Taxonomie>[],
   readonly dependantTaxonomies: LodgerTaxonomy<Taxonomie>[],
   readonly getters: GetterTree<Taxonomie, RootState>,

  //  collection: RxCollection<N>,
   activeDocuments: {
     [k in keyof SubscribersList]: RxDocument<N, any>
   },
   sortOptions: SortOptions,
   subscribe: () => Promise<Subscriber>
 }

export interface LodgerTaxonomyCreator<N extends Taxonomie> {
  new (name: N, form: Form, collection: RxCollection<N>): LodgerTaxonomy<N>,
}

 type LodgerTaxes = {
   [k in Taxonomii]: () => LodgerTaxonomy<k>
 }

export class Taxonomy implements LodgerTaxonomy<Taxonomie> {

  constructor (
    name: Taxonomie,
    readonly form: Form,
    collection: RxCollection<Taxonomie>
  ) {
    // try {
    //   this.form = Promise.resolve(Form.loadByName(name))
    // } catch (e) {
    //   throw new TaxonomyError('Wrong taxonomy: %%', name)
    // }

  }

    /**
   * Reference taxonomies of a taxonomy
   *
   * @returns {Array} taxonomii
   */
  get referenceTaxonomies () {
    const { data: { fields } } = this.form

    return <Taxonomie[]>fields
      .filter(field => field.id.indexOf('Id') === field.id.length - 2)
      .map(field => field.id.replace('Id', ''))
  }


  get hasReference () {
    return true
  }

  get subscribed () {
    return true
  }

  /**
   *
   */
  get plural () {
    return this.form.plural
  }
}

export class TaxonomiesHolder implements LodgerTaxes {

  constructor (
    taxonomii: Taxonomie[],
    collections: RxCollection<Taxonomie>[]
  ) {
    taxonomii.forEach(async (tax: Taxonomie) => {
      const form = await Form.loadByName(tax)
      const { plural } = form
      this[tax] = new Taxonomy(tax, form, collections[plural])
    })
  }
}

// const xx: LodgerTaxonomyCreator<Taxonomie> = new Taxonomy('asociatie', 'form', 'collection')
