type Locale = 'en' | 'ro'

interface RootState {
  version: string,
  locale: Locale
}

type SharedStoreMethods = {
  [k: string]: string | undefined,
  selected?: string | undefined,
  last?: string | undefined,
  active?: string | undefined
}
