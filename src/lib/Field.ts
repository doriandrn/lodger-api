import { RxJsonSchemaTopLevel, RxDocument, JsonSchemaTypes } from "rxdb";
import faker from 'faker'

import FieldError from './Error'

// These 3 lines are a hack for Rollup & Jest to work together.
// Test with: yarn rollup -c & jest field
import { strings, numbers, arrays, objects } from './String'
import S from './String'
const { String } = S

type ItemExcludableFrom = 'db' | 'addForm' | 'editForm' | 'all'
type ReferenceTaxonomy = Plural<Taxonomie>

// Can be used to pass in the field additional params for when calculating the value
type FieldGivenContext<T> = {
  selectedDoc ?: RxDocument<T>,
  activeDoc : RxDocument<T>
}

type FieldTypes = keyof typeof strings |
  keyof typeof numbers |
  keyof typeof arrays |
  keyof typeof objects |
  undefined

// enum cheiImutabile { 'primary' | 'index' | 'encrypted' | 'required'

declare global {
  // type ID<X extends Taxonomie> = string

  type FieldCreator = {
    // id : keyof T // item's identifier, correlates to DB's item key

    placeholder ?: string // sample data

    // values
    default?: any | Function
    value?: (context : FieldGivenContext<any>) => any

    // field description
    type ?: FieldTypes // our form types. DEFAULT: 'string'
    required ?: boolean // if the field is required
    encrypted ?: boolean // encrypt field's value
    index ?: boolean // should be indexable <=> sorts & search
    primary ?: boolean // skip _id field and make this primary instead
    excludeFrom ?: ItemExcludableFrom | ItemExcludableFrom[]

    name ?: string // used for grouping checkboxes / radio groups
    options ?: Array<any> | Object // for selects and other multiple options els

    // numeric inputs
    step ?: number // incrementer for number inputs, step or multipleOf
    min ?: number
    max ?: number
    final ?: boolean // cannot be changed later on after first init

    v ?: string // validation string (for vee-validate)

    // references
    ref ?: ReferenceTaxonomy // referenceTaxonomy
    indexRef ?: boolean // index by references?

    // frontend stuff
    showInList ?: 'primary' | 'secondary' | 'details'[]
    onclick ?: {
      [method: string]: string
    }
    oninput ?: {
      [method: string]: string
    }
    focus ?: boolean // if this should be the first option to focus on
  }
}

/**
 * @interface FieldAPI
 */
interface FieldAPI {
  readonly default : any | Function
  readonly rxSchema : RxJsonSchemaTopLevel

  value (context : FieldGivenContext<any>): any
  onclick ?: (context ?: FieldGivenContext<any>) => void
}

// excluded _id, we use it as a key.
export type FieldsCreator<Schema> = {
  [i in Exclude<keyof Schema, '_id'>]: FieldCreator
}


/**
 *
 * @class Form Field Item
 * @implements {SchemaField}
 * @requires [String]
 * @extends RxJsonSchemaTopLevel
 */
export class Field implements FieldAPI {
  readonly type: JsonSchemaTypes = 'string'

  // readonly label : string = translate(_id, 'fields')

  readonly ref ?: ReferenceTaxonomy
  readonly items ?: { type: 'string' }
  readonly index ?: boolean // should be indexed to search for
  readonly multipleOf ?: number // multiplier if number
  readonly v ?: string // validation string

  readonly storage ?: 'db' | 'store'  = 'db' // where to store data, in db or store

  readonly default : any
  readonly value : (context : FieldGivenContext<any>) => any = () => this.default || undefined
  readonly fakeValue : any
  label ?: string

  /**
   * Creates an instance of Field.
   *
   * @param {FieldCreator<T>} data
   * @memberof Field
   */
  constructor (
    data ?: FieldCreator
  ) {
    if (!data) {
      // throw new FieldError('Field could not be created. No data supplied.')
      return
    }

    const { index, label, ref, indexRef, type, step, required, v, value } = data
    this.type = String(type || '').toRxDBType()

    this.label = label

    if (index) this.index = true

    // transform the ref
    if (ref) {
      this.ref = ref
      this.items = { type: 'string' }
      if (indexRef) this.index = indexRef
    }

    // steps for numbers
    if (step !== undefined) {
      if (this.type !== 'number')
        throw new FieldError('Type must be "number" for .step')

        this.multipleOf = step
    }

    // hook in required to validation string
    if (required) {
      this.v = required && v && v.indexOf('required') < 0 ?
        v :
        `required|${v}`
    }

    // assign default value, can be undefined
    this.default = typeof data.default === 'function' ?
      data.default() :
      data.default

    // bind the value function
    const { storage } = this
    if (value && typeof value === 'function')
      this.value = value.bind({ storage })

    this.fakeValue = (() => {
      switch (type) {
        default:
          return null

        case 'bani':
          return Number(faker.finance.amount(100, 10000, 4))

        case 'number':
          return Number(faker.random.number({ min: 20, max: 300 }))

        case 'fullName':
          return `${faker.name.firstName()} ${faker.name.lastName()}`

        case 'dateTime':
          return Date.now() + faker.random.number({ min: 9000000, max: 100000000 })

        case 'blocName':
          return faker.random.alphaNumeric(2)

        case 'serviceName':
          return faker.hacker.adjective()
      }
    })()
  }


  /**
   * Used for Schema constructors,
   * returns only the properties needed for it
   */
  get rxSchema (): RxJsonSchemaTopLevel {
    const schema = {}
    const excludes = ['storage', 'value', 'default', 'v']
    Object.keys(this).forEach(prop => {
      if (this[prop] === undefined) return
      if (excludes.indexOf(prop) > -1) return
      schema[prop] = this[prop]
    })
    return schema
  }
}
