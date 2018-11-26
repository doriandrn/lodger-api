import { RxDatabaseCreator } from 'rxdb'
const { NODE_ENV } = process.env

export type BuildOptions = {
  dbCon: RxDatabaseCreator,
  usePersistedState?: boolean
  modules?: LodgerModule[]
}

export type LodgerModule = {
  name: string
}

export const buildOpts: BuildOptions = {
  dbCon: {
    name: 'Lodger/',
    adapter: 'memory',
    password: 'l0dg3rp4$$',
    ignoreDuplicate: NODE_ENV === 'test'
  },
  usePersistedState: false
}
