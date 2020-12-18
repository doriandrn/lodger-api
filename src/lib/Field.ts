import { RxJsonSchemaTopLevel, RxDocument, JsonSchemaTypes } from "rxdb";
import FieldError from './Error'

// These 3 lines are a hack for Rollup & Jest to work together.
// Test with: yarn rollup -c & jest field
import { strings, numbers, arrays, objects } from './String'
import S from './String'

// This should only be imported for DEVELOPMENT PURPOSES
import fakeData from 'helper/dev/fakeData'

import { computed } from 'mobx'

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
    value?: (context ?: FieldGivenContext<any>) => any

    // field description
    type ?: FieldTypes // our form types. DEFAULT: 'string'
    required ?: boolean // if the field is required
    encrypted ?: boolean // encrypt field's value
    index ?: boolean // should be indexable <=> sorts & search
    primary ?: boolean // skip _id field and make this primary instead
    // excludeFrom ?: ItemExcludableFrom | ItemExcludableFrom[]

    key ?: string // or name -> to be used for grouping checkboxes / radio groups
    options ?: Array<any> | Object // for selects and other multiple options els
    fieldset ?: number // corresponding fieldsets' array number - groups fields into fieldsets

    // numeric inputs
    step ?: number // incrementer for number inputs, step or multipleOf
    min ?: number
    max ?: number
    final ?: boolean // cannot be modified at all
    freezed ?: boolean // cannot be changed later on after first init

    v ?: string // validation string (for vee-validate)

    // references
    ref ?: ReferenceTaxonomy // referenceTaxonomy
    indexRef ?: boolean // index by references?

    // frontend stuff
    // showInList ?: 'primary' | 'secondary' | 'details'[]
    preview ?: number
    onclick ?: {
      [method: string]: string
    }
    oninput ?: {
      [method: string]: string
    }
    focus ?: boolean // if this should be the first option to focus on
    search ?: boolean // if searchable
    items ?: { type: 'string' | 'object' | 'array', properties: { [k: string]: any} }
  }
}

/**
 * @interface FieldAPI
 */
interface FieldAPI {
  readonly default : any | Function
  readonly rxSchema : RxJsonSchemaTopLevel
  readonly _type: FieldTypes

  value (context ?: FieldGivenContext<any>): any
  onclick ?: (context ?: FieldGivenContext<any>) => void
}

// excluded _id, we use it as a key. others are optional
export type FieldsCreator<Schema> = {
  [i in Exclude<keyof Schema, ['_id', '@', 'upd@']>]: FieldCreator
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
  readonly items ?: { type: 'string' | 'object' | 'array', properties: { [k: string]: any} }
  readonly multipleOf ?: number // multiplier if number
  readonly v ?: string // validation string

  readonly storage ?: 'db' | 'store'  = 'db' // where to store data, in db or store

  readonly default : any
  readonly value : (context ?: FieldGivenContext<any>) => any = () => this.default || undefined
  readonly fakeValue : any
  readonly preview ?: number
  readonly oninput ?: {
    transform ?: string
  }

  readonly _type ?: FieldTypes
  readonly _index ?: boolean // should be indexed to search for
  readonly encrypted ?: boolean
  key : string = 'index'
  focus ?: boolean
  search ?: boolean
  fieldset ?: number
  final ?: boolean
  readonly options ?: string[] | {}
  freezed ?: boolean // cannott be edited by the user after init

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

    const {
      ref,
      focus,
      encrypted,
      index,
      indexRef,
      type,
      step,
      required,
      v,
      value,
      preview,
      oninput,
      key,
      fieldset,
      freezed,
      final,
      search,
      options
    } = data

    if (preview !== undefined) this.preview = preview
    this._type = type // hold this for reference
    this.type = String(type || '').asRxDBType
    if (oninput) this.oninput = oninput
    if (focus) this.focus = focus
    if (options) this.options = options
    if (final) this.final = final
    if (key) this.key = key
    if (key === 'attachments') this.type = undefined
    if (search) this.search = search
    if (index !== undefined) this._index = true
    if (fieldset !== undefined) this.fieldset = fieldset
    if (encrypted !== undefined) this.encrypted = encrypted

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

    if (freezed)
      this.freezed = true

    // assign default value, can be undefined
    if (data.default !== undefined)
      this.default = data.default

    // bind the value function
    const { storage } = this
    if (value && typeof value === 'function')
      this.value = value.bind({ storage })

    Object.defineProperty(this, 'fakeValue', {
      get () { return fakeData[type || 'string'] }
    })

    if (this._type === '$') {
      this.freezed = true

      if (!this.default)
        this.default = ({ displayCurrency }) => ({
          value: 0,
          moneda: displayCurrency
        })

      this.items = {
        type: 'object',
        properties: {
          value: {
            type: 'number'
          },
          moneda: {
            type: 'number'
          }
        }
      }
    }
  }

  @computed get label (): () => string {
    return (o: {[i: string]: string} = {[this.key]: 'unnamed'}) => {
      try {
        return o[this.key]
      } catch (e) {
        return 'undefined label'
      }
    }
  }


  /**
   * Used for Schema constructors,
   * returns only the properties needed for it
   */
  get rxSchema (): RxJsonSchemaTopLevel {
    const schema = {}
    const excludes = ['storage', 'value', 'v', 'default']
    Object.keys(this).forEach(prop => {
      if (this[prop] === undefined) return
      if (excludes.indexOf(prop) > -1) return

      schema[prop] = this[prop]
    })
    return schema
  }
}
