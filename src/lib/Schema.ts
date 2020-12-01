import { RxJsonSchema, RxJsonSchemaTopLevel } from "rxdb"
import SchemaError from './Error'

enum Errors {
  missingProps = 'Missing properties on schema %%',
  propExists = 'Property "%%" already exists',
  idUndef = 'ID for field %% cannot be undefined',
  invalidField = 'Invalid field %% supplied'
}

/**
 * @interface LodgerSchema
 */
interface LodgerSchema extends RxJsonSchema {
  add (id: string, field: Field): void
}

type LodgerSchemaOptions = {}

// const datamodelDir = ['dev', 'test']
//   .indexOf(env) > -1 ? '.schemas' : '.'

type SchemaProperties<Interface> = {
  [k in keyof Interface] ?: RxJsonSchemaTopLevel
}

/**s
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
  readonly indexes : string[] = []
  protected _fields : any = {}

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
    fields ?: { [i: string]: Field },
    options?: LodgerSchemaOptions
  ) {
    if (!fields || !Object.keys(fields).length)
      throw new SchemaError(Errors.missingFields, { name })

    Object.keys(fields).map(f => this.add(fields[f].id || f, fields[f]))

    if (options) {}
  }

  /**
   * Adds properties programatically as
   * we also need to fill in the required array
   *
   * @param {FieldCreator} field
   * @memberof Schema
   */
  add (id: string, field ?: Field) {
    if (!id)
      throw new SchemaError(Errors.idUndef, field)

    if (this.properties[id])
      throw new SchemaError(Errors.propExists, id)

    if (field && !field.rxSchema)
      throw new SchemaError(Errors.invalidField, field)

    const { rxSchema, v, storage, _index, _type } = field

    if (storage !== 'db') return

    const required =  v && v.indexOf('required') > -1
    this.properties[id] = rxSchema || {}
    this._fields[id] = field

    if (required && this.required.indexOf(id) < 0)
      this.required.push(id)

    if (_index) {
      if (_type !== '$')
        this.indexes.push(id)
      else
        this.indexes.push(`${id}.[].value`)
    }
  }

  get ids () {
    return Object.keys(this.properties)
  }

  get $fields () {
    return this._fields
  }
}
