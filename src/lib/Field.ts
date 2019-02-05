import { RxJsonSchemaTopLevel, RxDocument, JsonSchemaTypes, RxJsonSchema } from "rxdb";
import { GetterTree } from "vuex";
// import { RootState } from "./Store";
import FieldError from './Error'
import String, { strings, numbers, arrays, objects } from './String'

type ItemExcludableFrom = 'db' | 'addForm' | 'editForm' | 'all'
type ReferenceTaxonomy = Plural<Taxonomie>

// Can be used to pass in the field additional params for when calculating the value
type FieldGivenContext<N> = {
  getters: GetterTree<N, RootState>,
  selectedDoc ?: RxDocument<N>,
  activeDoc : RxDocument<N>
}

type FieldTypes = keyof typeof strings |
  keyof typeof numbers |
  keyof typeof arrays |
  keyof typeof objects |
  undefined

// enum cheiImutabile { 'primary' | 'index' | 'encrypted' | 'required'

declare global {
  type ID<X extends Taxonomie> = string

  type FieldCreator<T> = {
    id : keyof T // item's identifier, correlates to DB's item key

    label ?: string // what the user sees
    placeholder ?: string // sample data

    // values
    default?: any | Function
    value?: (context : FieldGivenContext<T>) => any

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
 * @interface FormField
 * @extends RxJsonSchemaTopLevel
 */
interface FormField<T> extends RxJsonSchemaTopLevel {
  readonly rxSchema : RxJsonSchemaTopLevel
  value (context ?: FieldGivenContext<T>): any
  onclick ?: (context ?: FieldGivenContext<T>) => void
}

/**
 *
 * @class Form Field Item
 * @implements {SchemaField}
 * @requires [String]
 * @extends RxJsonSchemaTopLevel
 */
export class Field<T> implements FormField<T> {
  readonly id: keyof T
  readonly type: JsonSchemaTypes

  readonly ref ?: ReferenceTaxonomy
  readonly items ?: { type: 'string' }
  readonly index ?: boolean
  readonly multipleOf ?: number
  readonly v ?: string

  readonly storage ?: 'db' | 'store'  = 'db' // where to store data, in db or store

  readonly default?: any
  readonly value : (context ?: FieldGivenContext<T>) => any

  /**
   * Creates an instance of Field.
   *
   * @param {FieldCreator<T>} data
   * @memberof Field
   */
  constructor (
    data: FieldCreator<T>
  ) {
    const { id, index, ref, indexRef, type, step, required, v, value } = data
    this.type = String(type || '').toRxDBType()
    this.id = id

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

    this.value = () => undefined

    // bind the value function
    const { storage } = this
    if (value && typeof value === 'function')
      this.value = value.bind({ id, storage })
  }

  /**
   * Used for Schema constructors,
   * returns only the properties needed for it
   */
  get rxSchema (): RxJsonSchemaTopLevel {
    const schema = {}
    const excludes = ['storage', 'id', 'value', 'default']
    Object.keys(this).forEach(prop => {
      if (this[prop] === undefined) return
      if (excludes.indexOf(prop) > -1) return
      schema[prop] = this[prop]
    })
    return schema
  }

  // /**
  //  * Field value calculator
  //  *
  //  * @param {FieldGivenContext<T>} context
  //  * @returns {*}
  //  * @memberof Field
  //  */
  // value (context ?: FieldGivenContext<T>): any {
  //   if (!context) return
  //   return this.value
  // }

}
