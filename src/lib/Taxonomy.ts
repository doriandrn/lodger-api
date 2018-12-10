import { Taxonomii } from "index";
import { RxDocument } from 'rxdb'
import { Form } from './Form'

/**
 * Taxonomy
 *  get subscribed: Boolean
 *  get hasReference: Boolean
 *
 */

 interface LodgerTaxonomy<N extends string> {
   new (): LodgerTaxonomy<N>,
   readonly form: Form,

   readonly name: N,
   readonly plural: Plural<N>,
   readonly subscribed: Boolean,
   readonly hasReference: Boolean,
   readonly referenceTaxonomies: LodgerTaxonomy<Taxonomie>[],
   readonly dependantTaxonomies: LodgerTaxonomy<Taxonomie>[],
   activeDocuments: {
     [k in SubscribersList]: RxDocument<N, any>
   },
   readonly getters: Getters
 }

//  interface LodgerTaxonomyCreator<T extends Taxonomii> {
//    new (): LodgerTaxonomy<T>
//  }

 interface LodgerTaxes {
   [k: keyof Taxonomii]: LodgerTaxonomy<k>
 }

 export class Taxonomy implements LodgerTaxonomy {


  constructor (
    name: Taxonomie
  ) {
    try {
      this.form = Form.loadByName(name)
    } catch (e) {
      throw new TaxonomyError('Wrong taxonomy: %%', name)
    }
  }
 }

