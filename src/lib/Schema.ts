import { RxJsonSchema, RxJsonSchemaTopLevel } from "rxdb"
import { Field } from './Field'

/**
 *
 *
 * @interface LodgerSchema
 */
interface LodgerSchema extends RxJsonSchema {
  add (field: RxJsonSchemaTopLevel): void
  new (): RxJsonSchema
}

type LodgerDocument = {
  _id: string
}

/**
 *
 *
 * @class Schema
 * @extends {RxJsonSchema}
 * @implements {LodgerSchema}
 */
export default class Schema<Name extends string, Interface extends LodgerDocument> implements RxJsonSchema, LodgerSchema {
  readonly type = 'object'
  readonly version = 0
  readonly properties: { [k in keyof Interface] : RxJsonSchemaTopLevel } = {}
  readonly required: string[] = []

  /**
   * Constructs a valid RxJsonSchema out of a Lodger Form Data item
   *
   * @param {LodgerFormCreator} form
   * @param {boolean} [addCommonMethods]
   *
   * @memberof Schema
   * @returns {RxJsonSchema} schema
   */
  constructor (
    readonly name: Name,
    fields: Field<Interface>[]
    // options?: LodgerSchemaOptions
  ) {
    for (const fieldId in fields) {
      const { storage } = fields[fieldId]
      if (storage !== 'db')
        continue

      this.properties[fieldId] = fields[fieldId].rxSchema
    }
  }
}
