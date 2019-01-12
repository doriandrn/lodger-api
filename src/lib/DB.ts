import * as RxDB from 'rxdb'

import memoryAdapter from 'pouchdb-adapter-memory'
import idbAdapter from 'pouchdb-adapter-idb'
import httpAdapter from 'pouchdb-adapter-http'

import { env } from 'defs/env'

// RxDB.QueryChangeDetector.enable()
// RxDB.QueryChangeDetector.enableDebugging()

// const adapters = {
//   production: ['http', 'idb'],
//   development: ['memory']
// }

// Object.keys(adapters).forEach(env, () => {
//   adapters[env].forEach((adapterType: Adapter) => {
//     if (NODE_ENV !== env) return
//     const adapter = `pouchdb-adapter-${adapterType}`
//     RxDB.plugin(adapter)
//   })
// })

switch (env) {
  default:
    RxDB.plugin(memoryAdapter)
    break

  case 'production':
    RxDB.plugin(httpAdapter)
    RxDB.plugin(idbAdapter)
    break
}

export default RxDB

// /**
//  * RxDB instantiator
//  *
//  * @export
//  * @async
//  * @param {RxDB.RxCollectionCreator[]} collections
//  * @param {RxDB.RxDatabaseCreator} [config]
//  * @returns {RxDB} the fresh database
//  */
// export default async function (
//   collections: RxDB.RxCollectionCreator[],
//   config?: RxDB.RxDatabaseCreator
// ) {
//   debug('Initing')
//   const db =

//   // show leadership in title
//   db.waitForLeadership().then(() => {
//     if (env !== 'dev') return
//     if (!process.browser && env !== 'dev') return
//     document.title = `♛ ${document.title}`
//   })
//   await Promise.all(collections.map(c => db.collection(c)))
//   return db
// }
