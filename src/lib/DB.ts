import * as RxDB from 'rxdb'

import { env } from 'defs/env'

switch (env) {
  default:
    RxDB.plugin(require('pouchdb-adapter-memory'))
    break

  case 'production':
    RxDB.plugin(require('pouchdb-adapter-leveldb'))
    break
}

export default RxDB
