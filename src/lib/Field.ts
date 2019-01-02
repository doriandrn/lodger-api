import { RxJsonSchemaTopLevel } from "rxdb";

interface SchemaField extends RxJsonSchemaTopLevel {
  toRxJSONSchema (): RxJsonSchemaTopLevel
}

type ItemReference = Plural<Taxonomie> | object
type ItemExcludableFrom = FormExcludables[]
type FormExcludables = 'db' | 'addForm' | 'editForm' | 'all'

// enum cheiImutabile { 'primary' | 'index' | 'encrypted' | 'required'

type FieldCreator = {
  id: string,
  name?: string,

  label?: string
  placeholder?: string

  type?: FormItemTypes
  required?: boolean
  encrypted?: boolean

  default?: any
  value?: any

  step?: number,
  index?: boolean,
  ref?: ItemReference
  items?: object
  indexRef?: boolean

  excludeFrom?: ItemExcludableFrom

  v?: string // validation string
  click?: string
  showInList?: 'primary' | 'secondary' | 'details'[]
}

/**
 *
 *
 * @class Form Field Item
 * @implements {SchemaField}
 * @extends RxJsonSchemaTopLevel
 */
export class Field implements SchemaField {

  /**
   * Creates an instance of Field.
   *
   * @param {FieldCreator} field
   * @memberof Field
   */
  constructor (
    private field: FieldCreator
  ) {
  }

  /**
   *
   *
   * @returns {RxJsonSchemaTopLevel}
   * @memberof Field
   */
  toRxJSONSchema () {
    const { field } = this
    const { id, step, indexRef, index } = field
    if (!id) throw new Error('Invalid declaration for field')

    let { type, ref } = field

    type = String(type).toRxDBtype()
    const fieldData = { type }

    ref = ref ? {
      ref,
      items: { type: 'string' }
    } : undefined

    if (ref && indexRef) {
      Object.assign(ref, { index: indexRef })
    }

    // cheiImutabile.forEach(((cheie: string) => {
    //   if (!formItem[cheie]) return
    //   Object.assign(descriereCamp, { [cheie]: formItem[cheie] })
    // })

    if (index) Object.assign(fieldData, { index })
    if (step) Object.assign(fieldData, { multipleOf: step })
    if (ref) Object.assign(fieldData, ref)

    return { [id]: fieldData }
  }
}
