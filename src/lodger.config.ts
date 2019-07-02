const version = require('../package.json').version
import { env } from 'defs/env'
import { RxDatabaseCreator } from 'rxdb';

type LodgerConfig = {
  version: string,
  build: {
    db: RxDatabaseCreator
  },
  store?: {
    persist: false
  },
  taxonomii: {
    defaults: {
      criteriu: Criteriu
    },
    [k: string]: {
      criteriu: Criteriu
    }
  }
}

const build = {
  db: {
    name: 'Lodger/',
    adapter: 'memory',
    password: 'l0dg3rp4$$',
    ignoreDuplicate: Boolean(env === 'test')
  }
}

const taxonomii = {
  defaults: {
    criteriu: {
      limit: 25,
      index: 0,
      sort: {},
      find: null
    }
  },
  asociatii: {
    criteriu: {
      limit: 100
    }
  }
}

const config: LodgerConfig = {
  version,
  taxonomii,
  build
}

export default config
