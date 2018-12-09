import * as RxDB from 'rxdb'
import Debug from 'debug'

const debug = Debug('lodger:db')
const { NODE_ENV } = process.env

const memoryAdapter = require('pouchdb-adapter-memory')
const httpAdapter = require('pouchdb-adapter-http')
const idbAdapter = require('pouchdb-adapter-idb')

// RxDB.QueryChangeDetector.enable()
// RxDB.QueryChangeDetector.enableDebugging()

// type Adapter = 'http' | 'idb' | 'memory'

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

switch (NODE_ENV) {
  default:
    RxDB.plugin(memoryAdapter)
    break

  case 'production':
    RxDB.plugin(httpAdapter)
    RxDB.plugin(idbAdapter)
    break
}

export default async function (
  collections: RxDB.RxCollectionCreator[],
  config?: RxDB.RxDatabaseCreator
) {
  debug('Initing')
  const db = await RxDB.create(Object.assign({}, config))

  // show leadership in title
  db.waitForLeadership().then(() => {
    if (NODE_ENV !== 'dev') return
    document.title = `♛ ${document.title}`
  })
  await Promise.all(collections.map(c => db.collection(c)))
  return db
}
