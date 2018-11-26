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

  type Organizatie = {
    nume: string,
    cif?: number,
    rocif?: boolean
  }

  type Social = {
    retea: string,
    username: string
  }

  type Plural<T> = T extends Taxonomie ? string : string

  type DateContact = {
    emailPublic?: string,
    telefonPublic?: string,
    alteEmailuri: [string],
    alteTelefoane?: [string],
    sociale?: [Social]
  }

  type Bani = number

  interface Incasare {
    suma: Bani,
    deLa: ItemID
  }

  type DistribuirePeApartamente = object

  type Distribuire = {
    mod: DistribuirePeApartamente,
    apartamente: Apartament[]
  }

  interface Cheltuiala {
    catre: Furnizor,
    suma: Bani,
    dataScadenta: Date,
    distribuire: Distribuire
  }

  interface Contor {

  }

  type PreferinteUtilizator = JSON | object | null

  interface Utilizator {
    _id: string,
    nume?: string,
    contact?: DateContact,
    preferinte?: PreferinteUtilizator
  }

  interface Furnizor {
    nume: string,
    organizatie?: Organizatie
  }

  type Serviciu = {
    denumire: string,
    furnizori: [Furnizor],
    contoare: [Contor]
  }

  type Tranzactie = [Incasare & Cheltuiala]

  interface Apartament {
    _id: string
  }

  enum Languages {
    en,
    ro
  }

  interface UserPreferences {
    language: Languages
  }

  interface Preferences {
    client: PreferencesState,
    user: UserPreferences,
  }

  interface Forms {
    [key: string]: Form
  }

  type SelectedItemData = string | {
    id: string,

    doc?: RxDocument<Taxonomie>,
    hadDoc?: boolean,
    subscriber?: string
  }

  interface LodgerPlugin {
    name: string
  }


  /**
   * An user notification
   */
  type LdgNotification = {
    type: 'error' | 'success' | 'info' | 'warn',
    text: string
  }

  type SearchResults = {
    [k: string]: Result[]
  }

  // a search result
  type Result = {
    id: string,
    value: string,
    relevance: number,
  }

  type ActiveDocumentHolder = {
    taxonomie: Taxonomie,
    doc: RxDocument<Taxonomie>
  }

  type Sort = {}
  type Find = {} | null

  type Criteriu = {
    limit?: number,
    index?: number,
    sort?: Sort,
    find?: Find
  }

  type CriteriuKeys = keyof Criteriu

  type Subscriber = {
    [k: string]: {
      unsubscribe: () => void
    }
  }

  type SubscriberData = {
    docs: RxDocument<Taxonomie>[],
    items: {},
    fetching: boolean,
    criteriu?: Criteriu,
  }

  type SubscribersList = { [k: string]: Subscriber }
  type SubscribersDataHolder = { [k: string]: SubscriberData }

  type GettersDBTaxonomii = {
    [k in Taxonomii]: () => RxCollection<any>
  }
}
