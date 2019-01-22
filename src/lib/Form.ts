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

type FormOptions = {
  // todo
}

export type LodgerFormCreator<T> = {
  name?: string
  plural?: Plural<string>
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
  readonly name: N

  readonly isActive: boolean
  readonly captureTimestamp: boolean

  value (newForm: boolean): FormValue<I>
  addField (field: FieldCreator<I>): void
}

type FormValue<I> = {
  [k in keyof I]: any
}

type FormFields<I> = {
  [k in keyof I] ?: Field<I>
}

/**
 * Lodder Form class
 *
 * @class Form
 * @implements {LodgerForm}
 */
class Form<N extends string, I> implements LodgerForm<N, I> {
  protected fields : FormFields<I> = {}
  protected collection ?: RxCollectionCreator

  private _onsubmit : Function[] = [] // hook

  readonly indexables ?: string[]
  readonly plural : Plural<Taxonomie>
  readonly captureTimestamp : boolean = false

  isActive: boolean = false

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
    opts ?: FormOptions
  ) {
    // const { plural, methods, statics } = data
    // if (!name) throw new FormError('Form should have a name %%', data)
    if (!fields.length)
      throw new FormError('missing fields on form %%', name)

    this.plural = String(name).plural()
    fields.map(field => this.addField(field))

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
  get capturesTimestamp () {
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
   * register a new onsubmit function
   *
   * @memberof Form
   */
  set onsubmit (f: Function) {
    this._onsubmit.push(f.bind(this))
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
    })

    return $data
  }

  /**
   * Adds fields programatically as
   * we also need to fill in the required array
   *
   * @param {FieldCreator} field
   * @memberof Form
   */
  addField (field: FieldCreator) {
    this.fields[field.id] = new Field(field)
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

    const formPath: string = `${ formsPath }/${ name }`

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
