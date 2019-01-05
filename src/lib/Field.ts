import { RxJsonSchemaTopLevel, RxDocument, JsonSchemaTypes } from "rxdb";
import { GetterTree } from "vuex";
import { RootState } from "./Store";
import String, { strings, numbers, arrays, objects } from './String'

type ItemExcludableFrom = 'db' | 'addForm' | 'editForm' | 'all'
type ReferenceTaxonomy = Plural<Taxonomie>

// Can be used to pass in the field additional params for when calculating the value
type FieldGivenContext<N> = {
  getters: GetterTree<N, RootState>,
  selectedDoc ?: RxDocument<N>,
  activeDoc ?: RxDocument<N>
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

    type ?: FieldTypes // our form types. DEFAULT: string
    required ?: boolean // is this field required?
    encrypted ?: boolean

    default?: (context: FieldGivenContext<T>) => any | any
    value?: (context: FieldGivenContext<T>) => any | any

    step ?: number // incrementer for number inputs, step or multipleOf
    index ?: boolean // should be indexed / searchable
    name ?: string // used for grouping radios
    options ?: Array<any> | Object // for selects and other multiple options els

    ref ?: ReferenceTaxonomy // referenceTaxonomy
    indexRef ?: boolean // index by references?

    v ?: string // validation string for vee-validate

    excludeFrom ?: ItemExcludableFrom | ItemExcludableFrom[]
    click ?: string
    showInList ?: 'primary' | 'secondary' | 'details'[]
  }
}

/**
 * @interface FormField
 * @extends RxJsonSchemaTopLevel
 */
interface FormField<T> extends RxJsonSchemaTopLevel {
  toRxJSONSchema (): RxJsonSchemaTopLevel
  onclick ?: (context: FieldGivenContext<T>) => void
}

/**
 *
 *
 * @class Form Field Item
 * @implements {SchemaField}
 * @requires [String]
 * @extends RxJsonSchemaTopLevel
 */
export class Field<T> implements FormField<T> {
  id: keyof T
  type: JsonSchemaTypes

  ref ?: ReferenceTaxonomy
  items ?: { type: 'string' }
  index ?: boolean
  multipleOf ?: number

  /**
   * Creates an instance of Field.
   *
   * @param {FieldCreator<T>} data
   * @memberof Field
   */
  constructor (
    data: FieldCreator<T>
  ) {
    const { id, ref, indexRef, type, step } = data
    this.type = String(type || '').toRxDBtype()
    this.id = id

    // transform the ref
    if (ref) {
      this.ref = ref
      this.items = { type: 'string' }
      if (indexRef) this.index = indexRef
    }
    if (step) this.multipleOf = step
  }

  get fieldData () {
    return {}
  }

  /**
   *
   *
   * @returns {RxJsonSchemaTopLevel}
   * @memberof Field
   */
  toRxJSONSchema () {
    // const { data, ref } = this
    // const { id, step, index } = data
    // if (!id) throw new Error('Invalid declaration for field')

    // type = String(type).toRxDBtype()
    // const fieldData = { type }

    // ref = ref ? {
    //   ref,
    //   items: { type: 'string' }
    // } : undefined

    // if (ref && indexRef) {
    //   Object.assign(ref, { index: indexRef })
    // }

    // cheiImutabile.forEach(((cheie: string) => {
    //   if (!formItem[cheie]) return
    //   Object.assign(descriereCamp, { [cheie]: formItem[cheie] })
    // })

    // if (index) Object.assign(fieldData, { index })
    // if (step) Object.assign(fieldData, { multipleOf: step })
    // if (ref) Object.assign(fieldData, ref)

    return { [this.id]: this.fieldData }
  }
}
