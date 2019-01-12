import { predefinite } from 'forms/serviciu'


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
