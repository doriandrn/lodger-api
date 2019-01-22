import { RxJsonSchema, RxJsonSchemaTopLevel } from "rxdb";
import { LodgerFormCreator, Form } from "./Form";
import { Field } from './Field'

/**
 *
 *
 * @interface LodgerSchema
 */
interface LodgerSchema extends RxJsonSchema {
  add (fieldId: string, field: RxJsonSchemaTopLevel): void
}

type CommonFields = {
  _id: string // item's ID
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
export const commonFields: FieldCreator<CommonFields>[] = [
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
export default class Schema<Name extends string, Interface extends LodgerDocument> extends Form<Name, Interface> implements RxJsonSchema, LodgerSchema {
  readonly title: string = ''
  readonly properties: { [k in keyof Interface]: RxJsonSchemaTopLevel } = {}
  readonly type = 'object'
  readonly version = 0
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
    data: LodgerSchemaCreator<T>,
    options?: LodgerSchemaOptions
  ) {
    super(data.name, data.fields)

    this.title = this.name

    for (const fieldId in this.fields) {
      this.properties[fieldId] = this.fields[fieldId].rxSchema
    }

    commonFields.map(field => { this.add(field) })

    console.info('sch', this, this.title)

    // const filteredFields = fields
    //   .filter(field => !(field.excludeFrom &&
    //     (field.excludeFrom.indexOf('db') > -1 ||
    //     field.excludeFrom.indexOf('all') > -1)))

    // // if (addCommonMethods && name !== 'serviciu')
    // //     filteredFields.concat(commonFields)

    // filteredFields.map(field => this.add(new Field(field)))
    const { title, properties, version, type, required } = this
    return { title, properties, version, type, required }
  }

  /**
   * Adds fields programatically as
   * we also need to fill in the required array
   *
   * @param {FieldCreator} field
   * @memberof Schema
   */
  add (field: FieldCreator<any>) {
    (() => super.addField(field))()
    const { id } = field

    // console.info('ZIS', this)
    if (field.required && this.required.indexOf(id) < 0)
    this.required.push(id)

    const { rxSchema } = this.fields[id]
    Object.assign(this.properties, { [id]: rxSchema })
  }
}
