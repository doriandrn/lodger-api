import { RxDocument, RxDatabase, RxCollection, RxCollectionCreator } from "rxdb"
import { Form } from  '~/lib/Form'
import { Store } from 'vuex'
import { Taxonomii } from './index'

declare module "*.json" {
  const value: any;
  export default value;
}

declare global {
  type Taxonomie = keyof typeof Taxonomii
  type ItemID = string | null

  type Plural<T> = T extends Taxonomie ? string : string
  type Tranzactie = [Incasare & Cheltuiala]
}
