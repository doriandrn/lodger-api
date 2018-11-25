// import { no$ } from "../../../helpers/functions"
// import { sanitizeDBItems } from "../../../helpers/db"

// const subs = {}

// /**
//  * Creeaza un obiect cu subscriberi si inscrie actiunile din store la DB
//  * 
//  * @param db 
//  * @param store - Vuex
//  * @param {*} o 
//  */
// const subscribeToDbSchema = (db, { commit }, o) => {
//   if (!db || !commit) return
//   const cheiPrincipale = Object.keys(o).filter(k => k.indexOf('$') === 0)
//   if (!cheiPrincipale.length) return
//   cheiPrincipale.forEach(key => {
//     const k = no$(key)
//     if (!db[k]) return

//     if (k !== 'asociatii' && !subscribedTo(o[key])) {
//       subscribeToDbSchema({ commit }, o[key])
//     }

//     subs[o[key]._singular] = db[k].find(findCriteria(k)).$.subscribe(async items => {
//       if (!items) return
//       if (items.length < -1) {
//         if (k === 'servicii') predefinite.forEach(async denumire => { await db[k].insert({ denumire }) })
//         return
//       }

//       commit(`set_${k}`, sanitizeDBItems(items))

//       // if (!asociatieActiva && k === 'asociatii') {
//       //   const asociatie = items[0]
//       //   if (asociatie) commit('asociatie/SCHIMBA_ACTIVA', asociatie._id)
//       // }
//     })
//   })
// }

// export { subs, subscribeToDbSchema }
