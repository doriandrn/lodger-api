import { RxDocument, RxDatabase, RxCollection, RxCollectionCreator } from "rxdb"
import { Form } from  '~/lib/Form'
import { Store } from 'vuex'
import { Taxonomii } from './index'

declare module "*.json" {
  const value: any;
  export default value;
}

declare global {

  // interface LodgerTaxonomyCreator<x extends Taxonomie> {
  //   name: x,
  //   plural: Plural<x>
  //   form: LodgerForm<x>
  // }


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

  type PreferinteUtilizator = JSON | object | null



  type Tranzactie = [Incasare & Cheltuiala]



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




  type ActiveDocumentHolder = {
    taxonomie: Taxonomie,
    doc: RxDocument<Taxonomie>
  }

}
