import { RxJsonSchema, RxJsonSchemaTopLevel } from "rxdb"
import SchemaError from './Error'
import { Field } from './Field'
import { env } from './defs/env'

/**
 *
 *
 * @interface LodgerSchema
 */
interface LodgerSchema extends RxJsonSchema {
  add (field: FieldCreator<any>): void
  new (): RxJsonSchema
}


/**
 * Errors Definition
 * @readonly
 * @enum {string}
 *
 * @todo account for translations
 */
enum Errors {
  invalidRequested = 'Invalid file requested: %%',
  invalidName = 'Invalid name supplied: %%',
  missingFields = 'Missing fields on form %%',
  fieldExists = 'Field already exists, %%'
}

type LodgerSchemaOptions = {}

const datamodelDir = ['dev', 'test']
  .indexOf(env) > -1 ? '.schemas' : '.'

type SchemaProperties<Interface> = {
  [k in keyof Interface] : RxJsonSchemaTopLevel
}

/**
 *
 *
 * @class Schema
 * @extends {RxJsonSchema}
 * @implements {LodgerSchema}
 */
export default class Schema<Name extends string, Interface> implements RxJsonSchema, LodgerSchema {
  readonly type = 'object'
  readonly version = 0
  readonly properties : SchemaProperties<Interface> = {}
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
    fields: FieldCreator<Interface>[],
    options?: LodgerSchemaOptions
  ) {
    if (!fields || !fields.length)
      throw new SchemaError(Errors.missingFields, { name })

    fields.map(f => this.add(f))
  }

  /**
   * Adds fields programatically as
   * we also need to fill in the required array
   *
   * @param {FieldCreator} field
   * @memberof Schema
   */
  add (field: FieldCreator<Interface>) {
    const { id } = field
    if (this.properties[id])
      throw new SchemaError(Errors.fieldExists, { id })
    const { rxSchema, v, storage } = new Field(field)
    if (storage !== 'db') return
    const required =  v && v.indexOf('required') > -1
    this.properties[id] = rxSchema

    if (required && this.required.indexOf(id) < 0)
      this.required.push(id)
  }

  get ids () {
    return Object.keys(this.properties)
  }

  /**
   *
   *
   * @readonly
   * @memberof Schema
   */
  get indexables () {
    return this.ids.filter(fieldId => this.properties[fieldId].index)
  }

  /**
   * Loads a 'known' schema by name
   *
   * @param name
   */
  static async load (name: string): Promise<Schema<string, any>> {
    const schemaPath: string = `../${ datamodelDir }/${ name }`

    try {
      const { fields } =  await import(schemaPath)
      return new Schema(name, fields)
    } catch (err) {
      throw new SchemaError(err)
    }
  }
}
