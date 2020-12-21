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

    state : {
      counters: {
        [k in Taxonomie]: number
      }
      createdAt ?: string
      updatedAt ?: string
    }
  }

  type Money = {
    value: string // string because could be saved from bigInt. support for cryptocurrencies
    moneda: Currency
  }
}
