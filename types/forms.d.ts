import { RxJsonSchema, RxCollectionCreator } from 'rxdb'
import { Taxonomii } from 'lodger'

declare global {
  type Strings = 'text' | 'textarea' | 'select' | 'search' | 'string' | undefined
  type Numbers = 'number' | 'date-time' | 'bani' | 'date'
  type Arrays = 'array' | 'scari' | 'furnizori' | 'servicii' | 'contactFields' | Taxonomii
  type Objects = 'object'

  type KnownItemTypes = Strings | Numbers | Arrays | Objects
  type cheiImutabile = 'primary' | 'index' | 'encrypted' | 'required'

  type ItemName = string

  type RxDBType = 'string' | 'number' | 'array' | 'object'
  type ItemReference = Plural | object

  type Item = {
    id: string,
    name?: ItemName,
    label?: string

    type?: KnownItemTypes,
    required?: boolean,
    encrypted?: boolean,

    default?: any
    value?: any

    step?: number,
    index?: boolean,
    ref?: ItemReference,
    items?: object,
    indexRef?: boolean,

    notInDb?: boolean // exclude field from DB schema
    notInForm?: boolean // exclude field from client's end

    v: string // validation string
    click: string
    showInList: 'primary' | 'secondary' | 'details'
  }

  type Fields = Item[]
  type FormName = string
  type FormMethods = {
    [k: string]: () => Promise<any>
  }



  type ExcludedOverwrites = 'properties' | 'required' | 'title' | 'compoundIndexes'
  type AllowedSchemaOverwrites = Without<RxJsonSchema, ExcludedOverwrites>
}
