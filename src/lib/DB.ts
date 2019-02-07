import * as RxDB from 'rxdb'

import memoryAdapter from 'pouchdb-adapter-memory'
import idbAdapter from 'pouchdb-adapter-idb'
import httpAdapter from 'pouchdb-adapter-http'

import { env } from 'defs/env'
import { RxCollectionCreator } from 'rxdb';

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

/**
 * Helper function mostly used for tests
 *
 * @param collections
 * @param dbSetup
 */
export async function createFromCollections (
  collections: RxCollectionCreator[],
  dbSetup: any
) {
  const db = await RxDB.create(Object.assign({}, { ...dbSetup }, {
    name: `${dbSetup.name}/${Date.now()}`
  }))

  await Promise.all(collections.map(col => db.collection(col)))

  const cols = db.collections

  return { db, cols }
}

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
