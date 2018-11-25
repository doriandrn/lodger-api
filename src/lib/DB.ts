import * as RxDB from 'rxdb'
import Debug from 'debug'

const debug = Debug('lodger:db')
const { NODE_ENV } = process.env

// RxDB.QueryChangeDetector.enable()
// RxDB.QueryChangeDetector.enableDebugging()

switch (NODE_ENV) {
  default:
    RxDB.plugin(require('pouchdb-adapter-memory'))
    break

  case 'production':
    RxDB.plugin(require('pouchdb-adapter-http'))
    RxDB.plugin(require('pouchdb-adapter-idb'))
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
