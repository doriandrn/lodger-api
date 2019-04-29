import Schema from './Schema'
import { Field } from './Field';

type FormOptions = {
  captureTimestamp ?: boolean // generates a rxSchema ready to be used as a collection creator
}

type FormFields<I> = {
  [k in keyof I] ?: Field<I>
}

export type LodgerFormCreator<T> = {
  name?: string
  plural?: Plural<string>
  fields: FieldCreator<T>[]
}

/**
 *
 * @interface LodgerForm
 */
interface LodgerForm<N extends string, I> {
  readonly name: N
  $active: boolean

  value (newForm: boolean): FormValue<I>
}

type FormValue<I> = {
  [k in keyof I]: any
}


/**
 * Lodder Form class
 *
 * @class Form
 * @implements {LodgerForm}
 */
class Form<N extends string, I>
extends FrontEndSchema<N, I>
implements LodgerForm<N, I> {
  private _onsubmit : Function[] = [] // hooks

  readonly plural : Plural<N>
  readonly captureTimestamp : boolean = false

  $active: boolean = false

  private fields: FormFields<I> = {}

  /**
   * Creates an instance of Form.
   *
   * @param {LodgerFormCreator} data - Form input data
   * @param {boolean} [generateRxCollection=true] - some forms don't require this
   *
   * @memberof Form
   */
  constructor (
    readonly name : N = 'untitled',
    fields: FieldCreator<I>[] = [],
    opts ?: FormOptions
  ) {
    super(name, fields, opts && opts.schema ? opts.schema : {})
    this.name = name
    this.plural = name.plural()

    fields.map(field => {
      this.fields[ field.id ] = new Field(field)
    })

    if (opts) {

      if (opts.captureTimestamp) {
        super.add({
          id: 'la',
          type: 'dateTime',
          required: true, // for filters / sorts
          index: true,
          excludeFrom: ['addForm', 'editForm'],
          showInList: 'secondary'
        })
      }
    }

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
    context ?: FormContext<I>
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
  // Errors
}
