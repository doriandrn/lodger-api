// import FormError from './Error'
import { Field, FieldsCreator } from './Field'
import Schema from './Schema';

type FormOptions = {
  captureTimestamp ?: boolean
}

type FormFields<I> = {
  [k in Extract<keyof I, string>] : Field
} | {}

export type LodgerFormCreator<T> = {
  name: string
  plural?: Plural<String>
  fields?: FieldsCreator<T>,
  fieldsets ?: number[] // consecutive: todo: post gh issue on ts for consecutive type
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
}

/**
 *
 * @interface LodgerForm
 */
interface FormAPI<I> {
  $active: boolean

  value (newForm: boolean): FormValue<I>
}

type FormValue<I> = {
  [k in keyof I] ?: any
}


/**
 * Lodder Form class
 *
 * @class Form
 * @implements {LodgerForm}
 */
class Form<I>
implements FormAPI<I> {
  private _onsubmit : Function[] = [] // hooks

  readonly name : string
  readonly plural : string
  // readonly captureTimestamp : boolean = false
  readonly schema : Schema<string, I>
  readonly fields : FormFields<I> = {}
  readonly fieldsets ?: string[]

  $active: boolean = false


  /**
   * Creates an instance of Form.
   *
   * @param {LodgerFormCreator} data - Form input data
   * @param {boolean} [generateRxCollection=true] - some forms don't require this
   *
   * @memberof Form
   */
  constructor (
    data ?: LodgerFormCreator<I>,
    protected opts ?: FormOptions
  ) {
    const { fields, fieldsets, name, hooks } = data || {
      name: 'untitled',
      fields: {}
    }

    this.name = name
    this.fields = {}

    this.plural = this.name.plural

    if (fields) {
      Object.keys(fields).map((key: string) => {
        Object.assign(fields[key], { key })
        this.fields[ key ] = new Field( fields[ key ] )
      })
    }

    if (fieldsets) {
      this.fieldsets = fieldsets
    }

    if (hooks) {
      this.taxHooks = hooks
    }

    if (opts) {
      const { captureTimestamp } = opts

      if (captureTimestamp) {
        const timestampKeys: string[] = ['createdAt', 'updatedAt']
        const captureTimestampField: FieldCreator = {
          type: 'dateTime',
          // required: true, // for filters / sorts
          index: true
        }
        timestampKeys.map(key => {
          this.fields[key] = new Field({ ...captureTimestampField })
        })
      }
    }

    this.schema = new Schema(name, this.fields)

    // default onsubmit func
    this.onsubmit = () => {}
  }

  /**
   * Fakes data for testing
   *
   * @readonly
   * @memberof Form
   */
  get fakeData () {
    return Object
      .fromEntries(this.fieldsIds
        .filter(fieldId => fieldId.indexOf('Id') < 0)
        .map(fieldId => ([fieldId, this.fields[fieldId].fakeValue ])))
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
   * Quick access to all fields' ids
   *
   * @readonly
   * @memberof Form
   * @returns {string[]}
   */
  get fieldsIds () {
    return Object.keys(this.fields)
  }

  get previewFields () {
    return this.fieldsIds
      .filter(field => this.fields[field].preview > -1)
      .sort((a, b) => this.fields[a].preview - this.fields[b].preview)
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
    context ?: any
  ): FormValue<I> {
    let $data = {} as any

    this.fieldsIds.forEach(fieldId => {
      const field = this.fields[fieldId]
      if (field.storage !== 'db') return // todo: pune din store
      $data[fieldId] = field.value(context)
    })

    return $data
  }
}

export {
  Form,
  Errors
}
