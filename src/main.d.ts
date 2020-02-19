import { Taxonomii } from './index'
import { Currency } from 'lib/maintainable/currencies'

declare module "*.json" {
  const value: any;
  export default value;
}

declare global {
  type Taxonomie = keyof typeof Taxonomii
  type Plural<T> = T extends Taxonomie ? string : string

  type LodgerDocument = {
    _id: string,

    '@' ?: string
    'upd@' ?: string
  }

  type Money = {
    amount: string // string because could be saved from bigInt. support for cryptocurrencies
    currency: Currency
  }
}
