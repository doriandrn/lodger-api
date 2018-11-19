import { RxDatabaseCreator } from 'rxdb'

declare global {
  type BuildOptions = {
    dbCon: RxDatabaseCreator,
    usePersistedState?: boolean
    modules?: Module[]
  }

  type Module = {
    name: string
  }

  interface LodgerPlugin {
    name: string
  }
}
