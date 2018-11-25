// import { version } from './package'
const version = require('../package.json').version

type Sort = {}
type Find = {} | null

export type Criteriu = {
  limit?: number,
  index?: number,
  sort?: Sort,
  find?: Find
}

type LodgerConfig = {
  version: string,
  taxonomii: {
    defaults: {
      criteriu: Criteriu
    },
    [k: string]: {
      criteriu: Criteriu
    }
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
  taxonomii
}

export default config
