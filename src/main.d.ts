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

  type Bani = {
    suma: number
    moneda: Monede
  }
}

/**
 * Monede
 *
 * @enum {number}
 * @todo add all
 */
export enum Monede {
  RON, EUR, USD, BCH
}
