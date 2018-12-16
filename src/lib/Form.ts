/**
 * Forms for Lodger
 * are quite diferrently structured
 * than a normal JsonSchema
 */
import Debug from 'debug'
import { RxJsonSchema, RxCollectionCreator, RxJsonSchemaTopLevel } from 'rxdb'
import {
  prepareRxSchema,
} from './helpers/forms'

import { FormItemTypes } from './defs/forms/itemTypes'
import { env } from './defs/env'
import { FormError } from './Errors'
import { GetterTree } from 'vuex'
import { RootState } from './Store'

type ItemReference = Plural<Taxonomie> | object
type FormExcludables = 'db' | 'addForm' | 'editForm'
type ItemExcludableFrom = FormExcludables[]

export type LodgerFormItemCreator = {
  id: string,
  name?: string,
  label?: string

  type?: FormItemTypes,
  required?: boolean,
  encrypted?: boolean,

  default?: any
  value?: any

  step?: number,
  index?: boolean,
  ref?: ItemReference,
  items?: object,
  indexRef?: boolean,

  excludeFrom?: ItemExcludableFrom

  v?: string // validation string
  click?: string
  showInList?: 'primary' | 'secondary' | 'details'[]
}

export type cheiImutabile = 'primary' | 'index' | 'encrypted' | 'required'


/**
 * Form Errors Definition
 *
 * TODO: account for translations
 */
enum Errors {
  invalidRequested = 'Invalid form requested: %%',
  invalidName = 'Invalid name supplied',
  noData = 'Form %% is missing data',
  missingName = 'Forms should have a name',
  missingPlural = 'A plural definition is required for %%'
}

if (process.env.NODE_ENV === 'test') {
  Debug.enable('Form:*')
}

export declare type LodgerFormCreator = {
  name?: string
  plural: Plural<Taxonomie>
  fields: LodgerFormItemCreator[]

  methods?: { [k: string]: () => void }
  statics?: { [k: string]: () => void }
  sync?: boolean
}

/**
 * path to forms -> load on the fly
 */
const formsPath = ['dev', 'test']
  .indexOf(env) > -1 ?
    'forms' :
    '.'

/**
 * All indexabble fields
 * @returns {Array} the ids of all fields with index: true
 */
const indexables = (fields: LodgerFormItemCreator[]) =>
  fields
    .filter(field => field.index)
    .map(field => field.id)



export interface LodgerFormConstructor {
  new (data: LodgerFormCreator): LodgerForm
}

interface LodgerForm {
  name: string
  indexables: string[]
  collection: undefined | RxCollectionCreator
}

/**
 * Form class
 */
class Form implements LodgerForm {
  readonly name: string
  readonly indexables: string[]
  fields: LodgerFormItemCreator[]
  collection: undefined | RxCollectionCreator

  constructor (
    data: LodgerFormCreator,
    generateRxCollection : boolean = true
  ) {
    const { fields, name, plural, methods, statics } = data
    if (!name) throw new FormError('Form should have a name %%', data)

    this.name = name
    this.indexables = indexables(fields)
    this.fields = fields

    if (generateRxCollection) {
      const schema = prepareRxSchema(data)
      const collection = {
        name: plural,
        schema,
        methods,
        statics
      }
      this.collection = collection
    }
  }

  /**
   * Makes a Vue-ready $data {object} suitable to be completed
   * by the user in the end form
   * as it will turn reactive
   */
  value (
    isNewForm: boolean,
    getters?: GetterTree<any, RootState>
  ) {
    const { fields, name } = this
    // const debug = Debug('Form:value')
    let $data = {} as any

    fields.forEach(camp => {
      const { label, required, click, excludeFrom } = camp
      let { id, value } = camp

      let _def = camp.default

      if (click && !id) camp.id = click

      // skip excluded fields
      if (isNewForm && excludeFrom && (excludeFrom.indexOf('db') || excludeFrom.indexOf('addForm')))
        value = undefined

      // apply getters to funcs
      value = typeof value === 'function' && getters ? value(getters) : undefined
      _def = typeof _def === 'function' ? _def(getters) : undefined

      // label
      camp.label = label || `${name ? `${name}.new.` : ''}${id}`

      // validarea de required
      if (required || (camp.v && camp.v.indexOf('required') < 0))
        camp.v = `required|${camp.v || ''}`

      // valoarea finala
      $data[id] = null
      $data[id] = value !== null && value !== undefined ? value : _def
    })

    return $data
  }

  /**
   * Loads a 'known' form by name
   *
   * @param name
   */
  static load (name: string): Promise<Form> {
    const debug = Debug('lodger:Form')
    if (!name) throw new FormError('no name supplied for form')
    let form

    return import(`${formsPath}/${name}`).then((formData: LodgerFormCreator) => {
      form = { ...formData }
      // if (form.default) form = form.default
      Object.assign(form, { name })
      debug('✓', name)
      return new Form({ ...form })
    }).catch(err => { throw new FormError(err) })
  }
}

export {
  Form,
  Errors,
  prepareRxSchema
}
