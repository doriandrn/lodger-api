/**
 * Forms for Lodger
 * are quite diferrently structured
 * than a normal JsonSchema
 */
import Debug from 'debug'
import { RxCollectionCreator } from 'rxdb'

import { env } from './defs/env'
import FormError from './Error'

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


export type LodgerFormCreator<T> = {
  name?: string
  plural: Plural<string>
  fields: FieldCreator<T>[]
}

const formsPath = ['dev', 'test']
  .indexOf(env) > -1 ? 'forms' : '.'

/**
 *
 *
 * @interface LodgerForm
 */
interface LodgerForm<N extends string, I> {
  name: N
  // collection: undefined | RxCollectionCreator
  // indexables ?: string[]
  fields : Field<I>[]
  store: {}
  readonly captureTimestamp: boolean

  readonly isActive: boolean
  readonly isTaxonomy: boolean

  value (newForm: boolean): FormValue<I>
}

type FormValue<I> = {
  [k in keyof I]: any
}

type FormFields<I> = {
  [k in keyof I]: Field<I>
}

/**
 * Lodder Form class
 *
 * @class Form
 * @implements {LodgerForm}
 */
class Form<N extends string, I> implements LodgerForm<N, I> {
  protected fields : FormFields<I>
  protected collection ?: RxCollectionCreator

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
    readonly name : N,
    fields: FieldCreator<I>[],
    // opts ?: FormOptions
  ) {
    // const { plural, methods, statics } = data
    // if (!name) throw new FormError('Form should have a name %%', data)
    if (!fields.length)
      throw new FormError('missing fields on form %%', name)

    this.plural = String(name).plural()
    this.fields = { ...fields.map(field => ({ [field.id]: new Field(field) }) ) }

    // if (this.isTaxonomy) {
    //   const schema = new Schema(data, true)
    //   const collection = {
    //     name: plural,
    //     schema,
    //     methods,
    //     statics
    //   }
    //   this.collection = collection
    //   this.indexables = Object.keys(schema.properties).filter(prop => schema.properties[prop].index)
    // }
  }

  get isTaxonomy () {
    return false
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
   * Gets the value of current active form
   *
   * @summary for new forms, values are all undefined
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
  static async load (name: string): Promise<Form<any, D>> {
    const debug = Debug('lodger:Form')
    // if (!name)
    //   throw new FormError('no name supplied for form')

    const formPath: string = `${formsPath}/${String(name).toLowerCase()}`

    try {
      const formData: LodgerFormCreator<D> = await import(formPath)
      // Object.assign(formData, { name })
      debug('✓', name)
      return new Form(name, formData.fields)
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
