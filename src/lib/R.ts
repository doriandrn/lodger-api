// // import Vue from 'vue'
// // import Component from 'vue-class-component'
// import deepEqual from 'deep-equal'
// import { RxDocument, RxCollection, RxLocalDocument, RxDocumentBase } from 'rxdb'
// import { Subscription } from 'rxjs'
// import { observable, computed, action } from 'mobx'

// type Criteriu = {
//   limit?: number,
//   index?: number,
//   sort?: SortOptions,
//   filter?: FilterOptions
// }

// type SubscriberData<N extends Taxonomie> = {
//   readonly documents: RxDocument<N>[]
//   readonly items ?: { [k: string]: N }
//   readonly ids: string[]
// }

// interface SubscriberHolder<N extends Taxonomie> extends SubscriberData<N> {
//   criteriu: Criteriu
//   readonly fetching: boolean

//   subscribe (criteriu ?: Criteriu): Subscription
// }

// /**
//  * Main holder for temporary items subscribed to
//  * RENDERLESS Vue Component
//  *
//  * -> a vue helper for reactivity
//  * holds RX documents
//  * and methods to accezss / manipulate them
//  *
//  * @export
//  * @returns {Vue} data holder object
//  */
// @Component({
//   watch: {
//     criteriu (newC: Criteriu, oldC: Criteriu) {
//       if (!newC || deepEqual(newC, oldC) ) return
//       this.subscribe(newC)
//     }
//   },
//   props: {
//     taxonomy: {
//       type: Object
//     }
//   }
// })
// export default class R<N extends Taxonomie> extends Vue implements SubscriberHolder<N> {

//   @observable fetching = false // refreshing data indicator
//   @observable criteriu: Criteriu = {} // criteria. watched deep.

//   @observable subscribed?: boolean

//   collection?: RxCollection



//   get ids () { return Object.keys(this.items) }

//   get activeDoc () { return }
//   get selectedDoc () { return }


// }
