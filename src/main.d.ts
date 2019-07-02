import { Taxonomii } from './index'

declare module "*.json" {
  const value: any;
  export default value;
}

declare global {
  type Taxonomie = keyof typeof Taxonomii


  type Plural<T> = T extends Taxonomie ? string : string

  type LodgerDocument = {
    _id: string,

    '@': string
    'upd@': string
  }

  /**
   * Monede
   *
   * @enum {number}
   * @todo add all
   */
  enum Monede {
    RON, EUR, USD
  }

  type Bani = {
    suma: number
    moneda: Monede
  }
}
