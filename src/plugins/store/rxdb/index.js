// import Db from '../../../db/index'
// import CRUD from './methods/CRUD'
// import dynamic from './methods/dynamic'
// import unsubscribe from './methods/unsubscribe'
// import ldgSchema from '../../../schema'
// import { no$ } from '../../../helpers/functions'
// import { subscribeToDbSchema } from './subs'

// const { NODE_ENV } = process.env

// // const findCriteria = key => {
// //   // if (['blocuri', 'incasari', 'cheltuieli'].indexOf)
// //   switch (key) {
// //     case 'blocuri':
// //     case 'incasari':
// //     case 'cheltuieli':
// //       return { asociatieId: getters['asociatie/activa']._id }

// //     case 'apartament':
// //       return { bloc: { $in: getters['bloc/ids'] } }
// //   }
// //   // servicii,furnizori, asociatii sunt globale, n-au nevoie de criteriu de cautare
// //   return
// // }

// // // let subscribers = []
// // const subscribedTo = item => Object.keys(subs).indexOf(item._singular) > -1

// /**
//  * Plugin pt. Vuex
//  * Face conexiunea la db si functiile se subscriu la mutatii
//  * 
//  * @param {*} db dupa initializare
//  */
// export default function rxdb () {
//   const db = Db
//   if (!db) throw 'db naspa'

//   return async function (store) {
//     const { commit, getters, dispatch } = store

//     subscribeToDbSchema(db, store, ldgSchema)

//     switch (NODE_ENV) {
//       default:
//         store.subscribe(unsubscribe())
//         store.subscribe(CRUD(db, { commit, getters, dispatch }))
//         // // store.subscribe(schimbaAsociatie(subs, subscribe, db))
//         store.subscribe(dynamic(db))
//         return

//       case 'test':
//         store.subscribe(({ type, payload }) => {
//           if (type !== 'TEST') return
//           dispatch('runTest')
//         })
//         return
//     }

//     console.error('parsat')
//   }
// }
