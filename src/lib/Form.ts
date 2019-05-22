// import FormError from './Error'
import { Field, FieldsCreator } from './Field'
import Schema from './Schema';
import String from './String';

type FormOptions = {
  captureTimestamp ?: boolean
}

type FormFields<I> = {
  [k in keyof I] : Field
}

export type LodgerFormCreator<T> = {
  name: string
  plural?: Plural<String>
  fields?: FieldsCreator<T>
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
  readonly captureTimestamp : boolean = false
  readonly schema : Schema<string, I>

  $active: boolean = false

  readonly fields !: FormFields<I>

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
    opts ?: FormOptions
  ) {
    const { fields, name } = data || {
      name: 'untitled',
      fields: {}
    }

    this.name = name
    this.fields = { ...fields }

    this.plural = this.name.plural()

    if (fields) {
      Object.keys(fields).map(field => {
        this.fields[ field ] = new Field(fields[field])
      })
    }

    if (opts) {
      const { captureTimestamp } = opts

      if (captureTimestamp) {
        this.fields['createdAt'] = new Field({
          type: 'dateTime',
          required: true, // for filters / sorts
          index: true,
          excludeFrom: ['addForm', 'editForm'],
          showInList: 'secondary'
        })

        this.fields['updatedAt'] = new Field({
          type: 'dateTime',
          index: true,
          excludeFrom: ['addForm', 'editForm'],
          showInList: 'secondary'
        })
      }
    }

    this.schema = new Schema(name, this.fields)

    // default onsubmit func
    this.onsubmit = () => {

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
