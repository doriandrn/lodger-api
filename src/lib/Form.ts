/**
 * Forms for Lodger
 * are quite diferrently structured
 * than a normal JsonSchema
 */
import Debug from 'debug'
import { RxCollectionCreator } from 'rxdb'

import { env } from './defs/env'
import FormError from './Error'
import Schema from './Schema'
import { Field } from './Field'

/**
 * Errors Definition
 * @readonly
 * @enum {string}
 *
 * @todo account for translations
 */
enum Errors {
  invalidRequested = 'Invalid form requested: %%',
  invalidName = 'Invalid name supplied',
  noData = 'Form %% is missing data',
  missingName = 'Forms should have a name',
  missingPlural = 'A plural definition is required for %%'
}

if (env === 'test')
  Debug.enable('Form:*')

type FieldsSchema = {}
type FieldsCreator<T extends FieldsSchema, any> = FieldCreator<T>[]

export type LodgerFormCreator<T> = {
  name?: string
  plural: Plural<Taxonomie>
  fields: Field<T>[]

  methods?: { [k: string]: () => void }
  statics?: { [k: string]: () => void }
  sync?: boolean
  setari?: any
}

const formsPath = ['dev', 'test']
  .indexOf(env) > -1 ? 'forms' : '.'

// export interface LodgerFormConstructor {
//   new (data: LodgerFormCreator): LodgerForm
// }

/**
 *
 *
 * @interface LodgerForm
 */
interface LodgerForm<I> {
  // name: string
  // collection: undefined | RxCollectionCreator
  // indexables ?: string[]
  fields : Field<I>[]
  readonly captureTimestamp: boolean

  value (newForm: boolean): FormValue<I>
}

type FormValue<I> = {
  [k in keyof I]: any
}

type FormFields<I> = {
  [k in keyof I]: Field<I>
}

/**
 * Forms are read from within the `lib/forms/` directory
 *
 * @class Form
 * @implements {LodgerForm}
 */
class Form<I> implements LodgerForm<I> {
  name : string
  fields : FormFields<I>
  collection ?: RxCollectionCreator

  readonly indexables ?: string[]
  readonly plural : Plural<Taxonomie>

  /**
   * Creates an instance of Form.
   *
   * @param {LodgerFormCreator} data - Form input data
   * @param {boolean} [generateRxCollection=true] - some forms don't require this
   *
   * @memberof Form
   */
  constructor (
    data: LodgerFormCreator<I>,
    generateRxCollection : boolean = true
  ) {
    const { fields, name, plural, methods, statics } = data
    if (!name) throw new FormError('Form should have a name %%', data)
    if (!fields || !Object.keys(fields).length)
      throw new FormError('missing fields on form %%', name)

    this.name = name
    this.plural = plural
    this.fields = { ...fields.map(field => ({ [field.id]: new Field(field) }) ) }

    if (generateRxCollection) {
      const schema = new Schema(data, true)
      const collection = {
        name: plural,
        schema,
        methods,
        statics
      }
      this.collection = collection
      this.indexables = Object.keys(schema.properties).filter(prop => schema.properties[prop].index)
    }
  }


  /**
   * Makes a Vue-ready $data {object} suitable to be completed
   * by the user in the frontend -> new form
   * (as it will turn reactive)
   *
   * @readonly
   * @memberof Form
   * @returns {Object}
   */
  get data () {
    return Object.assign({}, ...Object.keys(this.fields))
  }

  /**
   * Everytime the value is accessed
   * if 'la' field is present
   *
   * @readonly
   * @memberof Form
   */
  get capureTimestamp () {
    return Object.keys(this.data).indexOf('la') > -1
  }

  /**
   * Quick access to all fields' ids
   *
   * @readonly
   * @memberof Form
   * @returns {string[]}
   */
  get fieldsIds () {
    return Object.keys(this.fields)
  }

  /**
   *
   * @summary for new forms, values are all undefined
   *
   * @returns {Object} data item (Vue $data - ready)
   */
  value (
    context ?: FormContext<I>
  ): FormValue<I> {
    // const debug = Debug('Form:value')
    let $data = {} as any

    this.fieldsIds.forEach(fieldId => {
      const field = this.fields[fieldId]
      $data[fieldId] = field.value(context)
      // const { label, required, click, excludeFrom } = camp
      // let { id, value } = camp

      // let _def = camp.default

      // if (click && !id) camp.id = click

      // // skip excluded fields
      // if (isNewForm && excludeFrom && (excludeFrom.indexOf('db') || excludeFrom.indexOf('addForm')))
      //   value = undefined

      // // apply getters to funcs
      // value = typeof value === 'function' && getters ? value(getters) : undefined
      // _def = typeof _def === 'function' ? _def(getters) : undefined

      // // label
      // camp.label = label || `${name ? `${name}.new.` : ''}${id}`

      // // validarea de required
      // if (required || (camp.v && camp.v.indexOf('required') < 0))
      //   camp.v = `required|${camp.v || ''}`

      // // valoarea finala
      // $data[id] = null
      // $data[id] = value !== null && value !== undefined ? value : _def
    })

    return $data
    // const manipulatedData: any = {}

    // // not data.denumire pt servicii :/
    // if (!data.la && !data.denumire) data.la = Date.now()
    // Object.keys(data).forEach(what => {
    //   let value = data[what]
    //   if (value === null || value === 'undefined') {
    //     return
    //   }

    //   manipulatedData[what] = value
    // })

    // // if (!context) return manipulatedData
    // // const { referencesIds } = context

    // // Object.assign(manipulatedData, referencesIds)

    // return manipulatedData

    // return this.handleOnSubmit($data)
  }

  /**
   * Loads a 'known' form by name
   *
   * @param name
   */
  static async load (name: n extends keyof Forms): Promise<Form<Taxonomie>> {
    const debug = Debug('lodger:Form')
    if (!name)
      throw new FormError('no name supplied for form')

    const formPath: string = `${formsPath}/${String(name).toLowerCase()}`

    try {
      const formData: LodgerFormCreator = await import(formPath)
      Object.assign(formData, { name })
      debug('✓', name)
      return new Form(formData)
    } catch (err) {
      debug('x', name)
      throw new FormError(err)
    }

  }
}

export {
  Form,
  Errors
}
