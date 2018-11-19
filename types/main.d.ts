/// <reference path="build.d.ts" />

import { RxDocument, RxDatabase, RxCollection, RxCollectionCreator } from "rxdb"
import { Form } from 'lodger/lib/Form'
import { Store } from 'vuex'
import { Taxonomii } from "../index"

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

  type Criteriu = {
    limit?: number,
    index?: number,
    sort?: Sort,
    find?: Find
  }

  type Plural = <T>(definitie: T) => T

  type Sort = {}
  type Find = {} | null

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
  }

  /**
   * An user notification
   */
  type LdgNotification = {
    type: 'error' | 'success' | 'info' | 'warn',
    text: string
  }
}
