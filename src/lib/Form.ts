/**
 * Forms for Lodger
 * are quite diferrently structured
 * than a normal JsonSchema
 */
import Debug from 'debug'
import { RxJsonSchema, RxCollectionCreator } from 'rxdb'
import {
  pushFieldToSchema,
  addCommonFieldsToSchema
} from './helpers/forms'

import { FormItemTypes } from './defs/formItemTypes'
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

// type cheiImutabile = 'primary' | 'index' | 'encrypted' | 'required'


type FormMethods = {
  [k: string]: () => Promise<any>
}

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

// interface LodgerFormCreator {
//   name: FormName
//   plural: Plural<Taxonomie>
//   fields: Fields
//
//
// }

if (process.env.NODE_ENV === 'test') {
  Debug.enable('Form:*')
}

const defaultSchema: RxJsonSchema = {
  title: '',
  properties: {},
  required: [],
  type: 'object',
  version: 0
}

export type LodgerFormCreator = {
  name: string
  plural: Plural<Taxonomie>
  fields: LodgerFormItemCreator[]

  methods?: FormMethods
  statics?: FormMethods
  sync?: boolean
}



const formsPath = ['dev', 'test'].indexOf(process.env.NODE_ENV) > -1 ? 'forms' : '.'

/**
 * A valid RxJsonSchema out of the form
 */
const toRxSchema = (formData: LodgerFormCreator) => {
  const { name, fields } = formData
  const schema: RxJsonSchema = JSON.parse(JSON.stringify(defaultSchema))
  schema.title = name

  fields
    .filter(field => !field.excludeFrom.indexOf('db'))
    .forEach(field => {
      pushFieldToSchema(field, schema)
    })

  if (name !== 'serviciu') addCommonFieldsToSchema(schema)

  return schema
}

/**
 * All indexabble fields
 * @returns {Array} the ids of all fields with index: true
 */
const lookupIndexables = (fields: Fields) =>
  fields
    .filter(field => field.index)
    .map(field => field.id)

/**
 * Makes a RxCollection valid collection from the form
 */
function toRxCollection (context: Form) {
  const {
    schema,
    data: { plural, methods, statics }
  } = context
  const name = plural
  return { name, schema, methods, statics }
}

interface Form {
  new (data: LodgerFormCreator): Form

  schema: RxJsonSchema
  indexables: string[]
  collection: RxCollectionCreator
}

/**
 * Form class
 */
class Form implements Form {
  constructor (
    data: LodgerFormCreator
  ) {
    this.indexables = lookupIndexables(data.fields)
    this.schema = toRxSchema(data)
    this.collection = toRxCollection(this)

    // this.sortOptions = sortOptions({ indexables, name })
  }

  /**
   * gets the sorting options for tax
   * @returns an object with each key used as a sorting option
   */
  get sortOptions () {
    const { indexables, name } = this

    if (!['serviciu', 'contor'].indexOf(name)) {
      indexables.push('la')
    }

    // TODO: !!! ia din common methods
    const sorts = {}
    indexables.forEach(indexable => {
      const label = `sort.${indexable === 'name' ? 'az' : indexable}`
      Object.assign(sorts, { [indexable]: { label } })
    })

    // debug(`${name} => sortable fields`, sorts)

    return sorts
  }

  /**
   * Makes a Vue-ready $data {object} suitable to be completed
   * by the user in the end form
   * as it will turn reactive
   */
  componentData (
    isNewForm: boolean,
    getters?: GetterTree<any, RootState>
  ) {
    const { data: { fields }, name } = this
    const debug = Debug('lodger:Form.ts:componentData')
    let $data = {} as any

    fields.forEach(camp => {
      const {
        label,
        required,
        click,
        notInForm,
        notInDb
      } = camp
      let { id, value } = camp
      debug('camp.value (f)', value)
      let _def = camp.default

      if (click && !id) camp.id = click

      // skip fields
      if (isNewForm) {
        if (!notInForm || notInDb) value = null
      }

      // apply getters to funcs
      if (typeof value === 'function' && getters) {
        try {
          value = value(getters)
          debug('valoare dupa apel functie: ', value)
        } catch (e) {
          debug('failed to get val', label, getters)
          value = null
        }
      }

      if (typeof _def === 'function') _def = _def(getters)

      // label
      camp.label = label || `${name ? `${name}.new.` : ''}${id}`

      // validarea de required
      if (required || (camp.v && camp.v.indexOf('required') < 0)) camp.v = `required|${camp.v || ''}`

      // valoarea finala
      $data[id] = null
      $data[id] = value !== null && value !== undefined ? value : _def
    })

    return $data
  }

  /**
   * Loads a known form by name
   *
   * @param name
   */
  static loadByName (name: string): Promise<Form> {
    const debug = Debug('lodger:Form')
    if (!name) throw new FormError('no name supplied for form')
    let form

    return import(`${formsPath}/${name}`).then(formData => {
      form = { ...formData }
      if (form.default) form = form.default
      Object.assign(form, { name })
      debug('✓', name)
      return new Form({ ...form })
    }).catch(err => { throw new FormError(err) })
  }

  get name () {
    return this.data.name
  }

  get plural () {
    return this.data.plural
  }

  /**
   * Reference taxonomies of a taxonomy
   *
   * @returns {Array} taxonomii
   */
  get referenceTaxonomies () {
    const { data: { fields } } = this

    return <Taxonomie[]>fields
      .filter(field => field.id.indexOf('Id') === field.id.length - 2)
      .map(field => field.id.replace('Id', ''))
  }


  /**
   * Items to be display to user,
   * @returns {Object} the keys of the fields: their position
   *
   */
  get __displayItemKeys () {
    const { fields } = this.data

    return Object.assign({}, ...fields
      .filter(field => field.showInList)
      .map(field => ({ [field.id]: field.showInList }) )
    )
  }
}

export {
  Form,
  Errors
}
