import { addRxPlugin, createRxDatabase } from 'rxdb'

import { env } from 'defs/env'

switch (env) {
  default:
    addRxPlugin(require('pouchdb-adapter-memory'))
    break

  case 'production':
    addRxPlugin(require('pouchdb-adapter-leveldb'))
    break
}

export {
  create: createRxDatabase
}
