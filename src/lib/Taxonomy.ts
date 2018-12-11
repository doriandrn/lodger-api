import { Taxonomii } from "index";
import { RxDocument, RxCollection } from 'rxdb'
import { Form } from './Form'
import { TaxonomyError } from './Errors'
import { RootState } from "./Store";

/**
 * Taxonomy
 *  get subscribed: Boolean
 *  get hasReference: Boolean
 *
 */

 interface LodgerTaxonomy<N extends Taxonomie> {
   new (name: N): LodgerTaxonomy<N>,
   readonly form: Form | Promise<Form>,

   readonly name: N,
   readonly plural: Plural<N>,
   readonly subscribed: Boolean,
   readonly hasReference: Boolean,
   readonly referenceTaxonomies: LodgerTaxonomy<Taxonomie>[],
   readonly dependantTaxonomies: LodgerTaxonomy<Taxonomie>[],
   collection: RxCollection<N>
   activeDocuments: {
     [k in SubscribersList]: RxDocument<N, any>
   },
   readonly getters: GetterTree<Taxonomie, RootState>
   sortOptions: SortOptions
 }

 interface LodgerTaxes {
   [k: keyof Taxonomii]: LodgerTaxonomy<k>
 }

 export class Taxonomy implements LodgerTaxonomy<Taxonomii> {
  form: Form | Promise<Form>

  constructor (
    name: T
  ) {
    try {
      this.form = Promise.resolve(Form.loadByName(name))

    } catch (e) {
      throw new TaxonomyError('Wrong taxonomy: %%', name)
    }
  }
 }

