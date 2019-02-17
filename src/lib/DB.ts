import * as RxDB from 'rxdb'

import memoryAdapter from 'pouchdb-adapter-memory'
import idbAdapter from 'pouchdb-adapter-idb'
import httpAdapter from 'pouchdb-adapter-http'

import { env } from 'defs/env'

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
