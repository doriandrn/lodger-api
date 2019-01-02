import { RxJsonSchema, RxJsonSchemaTopLevel } from "rxdb";
import { LodgerFormCreator, LodgerFormItemCreator } from "./Form";
import { Field } from './Field'

/**
 *
 *
 * @interface LodgerSchema
 */
interface LodgerSchema extends RxJsonSchema {
  addField (field: RxJsonSchemaTopLevel): void
  // new (formData: LodgerForm): RxJsonSchema
}

/**
 * Common fields for all taxonomies
 *
 */
const commonFields: LodgerFormItemCreator[] = [
  // Data adaugarii / when added
  {
    id: 'la',
    type: 'dateTime',
    required: true, // for filters / sorts
    index: true,
    excludeFrom: ['addForm', 'editForm'],
    showInList: 'secondary'
  }
]

/**
 *
 *
 * @class Schema
 * @extends {RxJsonSchema}
 * @implements {LodgerSchema}
 */
export default class Schema implements LodgerSchema {
  title = ''
  properties = {}
  type = 'object'
  version = 0
  required: string[] = []

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
    form: LodgerFormCreator,
    addCommonMethods ?: boolean
  ) {
    const { name, fields } = form

    this.title = name

    const filteredFields = fields
      .filter(field => !(field.excludeFrom &&
        (field.excludeFrom.indexOf('db') > -1 ||
        field.excludeFrom.indexOf('all') > -1)))

    if (addCommonMethods && name !== 'serviciu')
        filteredFields.concat(commonFields)

    filteredFields.map(field => this.addField(new Field(field)))
  }

  /**
   *
   *
   * @param {LodgerFormItemCreator} field
   * @memberof Schema
   */
  addField (field: RxJsonSchemaTopLevel) {
    const { id, required } = field
    if (required && this.required.indexOf(id) < 0)
      this.required.push(id)

    Object.assign(this.properties, field.toJSONSchema())
  }
}
