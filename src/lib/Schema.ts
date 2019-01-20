import { RxJsonSchema, RxJsonSchemaTopLevel } from "rxdb";
import { LodgerFormCreator, Form } from "./Form";
import { Field } from './Field'

/**
 *
 *
 * @interface LodgerSchema
 */
interface LodgerSchema extends RxJsonSchema {
  addField (field: RxJsonSchemaTopLevel): void
}

type CommonFields = {
  _id: string
  '@': number // Data adaugarii / datetime when added
}

export type LodgerSchemaCreator<T> = LodgerFormCreator<T> & {
  name: string // name is required here, despite in form
  methods?: { [k: string]: () => void }
  statics?: { [k: string]: () => void }
  sync?: boolean
  settings?: any
}

/**
 * Common fields for all TAXONOMIES
 *
 */
const commonFields: FieldCreator<CommonFields>[] = [
  {
    id: '_id',
    excludeFrom: 'all',
    value: ({ activeDoc }) => activeDoc._id
  },
  {
    id: '@',
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
export default class Schema<Name extends string, Interface> extends Form<Name, Interface> implements RxJsonSchema, LodgerSchema {
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
    data: LodgerSchemaCreator<T>,
    options?: LodgerSchemaOptions
  ) {
    super(data.name, data.fields)
    const { name, fields } = data

    this.title = name
    this.properties = this.fields
    // delete this.fields
    console.info('sch', this)
    // console.info('sch', Schema.load)

    const filteredFields = fields
      .filter(field => !(field.excludeFrom &&
        (field.excludeFrom.indexOf('db') > -1 ||
        field.excludeFrom.indexOf('all') > -1)))

    // if (addCommonMethods && name !== 'serviciu')
    //     filteredFields.concat(commonFields)

    filteredFields.map(field => this.addField(new Field(field)))
  }

  /**
   * Adds fields programatically as
   * we also need to fill in the required array
   *
   * @param {FieldCreator} field
   * @memberof Schema
   */
  addField (field: RxJsonSchemaTopLevel) {
    const { id, required } = field
    if (required && this.required.indexOf(id) < 0)
      this.required.push(id)

    Object.assign(this.properties, field.toJSONSchema())
  }
}
