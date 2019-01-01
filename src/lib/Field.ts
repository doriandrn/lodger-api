import { RxJsonSchemaTopLevel } from "rxdb";
import { LodgerFormItemCreator } from "./Form";

interface SchemaField extends RxJsonSchemaTopLevel {
  new (field: LodgerFormItemCreator): RxJsonSchemaTopLevel
}

// enum cheiImutabile { 'primary' | 'index' | 'encrypted' | 'required'

/**
 *
 *
 * @class Field
 * @implements {SchemaField}
 */
export class Field implements SchemaField {

  /**
   * Creates an instance of Field.
   *
   * @param {LodgerFormItemCreator} field
   * @memberof Field
   */
  constructor (field: LodgerFormItemCreator) {
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

  toRxJSONSchema () {

  }
}
