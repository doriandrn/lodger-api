import { RxJsonSchema } from 'rxdb'
import { FormItemTypes } from '../defs/forms/itemTypes'
import defaultSchema from '../defs/forms/schema'

import { LodgerFormCreator, LodgerFormItemCreator } from 'lib/Form'

import Debug from 'debug'
const debug = Debug('lodger:forms')

/**
 * Converteste tipurile campurilor 'noastre' in primare
 *
 * Explicatie:
 * DB-ul nu stie decat de tipurile primare:
 * -> boolean, string, number, array, object
 * Schema noastra e mult mai detaliata
 *
 * @param {string} type
 * @returns {string} - tipul primar, eg. 'string'
 */
type RxDBType = 'string' | 'number' | 'array' | 'object'

function toRxDBtype(type: FormItemTypes): RxDBType {
  const _default = 'string'
  const { strings, numbers, arrays, objects } = formItemTypes

  if (!type || strings.indexOf(type) > -1) return _default
  if (objects.indexOf(type) > -1) return 'object'
  if (numbers.indexOf(type) > -1) return 'number'
  if (arrays.indexOf(type) > -1) return 'array'
  return _default
}


/**
 * Makes a valid RxJsonSchema out of a Form
 */
function prepareRxSchema (
  form: LodgerFormCreator,
  addCommonMethods ?: boolean
) {
  const { name, fields } = form
  const schema: RxJsonSchema = JSON.parse(JSON.stringify(defaultSchema))
  schema.title = name

  fields
    .filter(field => !(field.excludeFrom && field.excludeFrom.indexOf('db')))
    .forEach(field => {
      pushFieldToSchema(field, schema)
    })

  if (addCommonMethods && name !== 'serviciu')
    addCommonFieldsToSchema(schema)

  return schema
}

/**
 * Transforms a lodger form field to a valid RxSchema one
 *
 * @param field
 */
const toSchemaField = (field: LodgerFormItemCreator) => {
  if (!field.id)
    throw new Error('Field missing id')

  const { id, step, indexRef, index } = field
  let { type, ref } = field

  if (!id || !type) throw new Error('Invalid declaration for field')

  type = toRxDBtype(type)
  ref = ref ? {
    ref,
    items: { type: 'string' }
  } : undefined

  if (ref && indexRef) {
    Object.assign(ref, { index: indexRef })
  }

  const fieldData = { type }

  // cheiImutabile.forEach(((cheie: string) => {
  //   if (!formItem[cheie]) return
  //   Object.assign(descriereCamp, { [cheie]: formItem[cheie] })
  // })
  if (index) Object.assign(field, { index })

  if (step) Object.assign(field, { multipleOf: step })
  if (ref) Object.assign(field, ref)

  return { [id]: fieldData }
}


/**
 * Adauga un camp la schema Rx
 *
 * @param {Object} formItem - campu'
 * @param {Object} schema - schema colectiei
 * @returns {object} schema modificata
 */
function pushFieldToSchema (
  formItem: LodgerFormItemCreator,
  schema: RxJsonSchema
) {
  if (!formItem || !schema)
    throw new TypeError('parametri insuficienti')
  if (typeof formItem !== 'object' || typeof schema !== 'object')
    throw new TypeError('parametri incorecti')

  const { required, properties } = schema

  schema.properties = properties || {}
  schema.required = required || []

  const { id } = formItem
  if (!id) {
    throw new TypeError(`No ID supplied for formItem ${formItem}`)
  }

  if (formItem.required && required && required.indexOf(id) < 0) schema.required.push(id)
  Object.assign(schema.properties, toSchemaField(formItem))
  return schema
}

/**
 * Pt taxonomia ceruta
 * ia formul
 * si tot ce are nevoie de Id de altceva
 * se populeaza
 *
 * @param { references, getters }
 * @returns {Object} eg { asociatieId: 'XXXX' }
 */
function assignRefIdsFromStore (context: any) {
  const { references, getters } = context
  if (!(references && references.length)) return
  type cheieIdTaxonomie = (x: Taxonomie) => string
  const refsObj: {[k: cheieIdTaxonomie]: any} = {}
  references.map((tax: Taxonomie) => {
    refsObj[`${tax}Id`] = getters[`${tax}/selected`]
  })

  return refsObj
}

/**
 * Manipulates the final data before submitting the form to the DB
 *
 * @param data
 */
function handleOnSubmit (
  data : LodgerForm,
  context ?: any
) {
  const manipulatedData: any = {}

  // not data.denumire pt servicii :/
  if (!data.la && !data.denumire) data.la = Date.now()
  Object.keys(data).forEach(what => {
    let value = data[what]
    if (value === null || value === 'undefined') {
      debug('fara val', what)
      return
    }

    manipulatedData[what] = value
  })

  if (!context) return manipulatedData
  const { referencesIds } = context

  Object.assign(manipulatedData, referencesIds)
  // debug('data after hOS', manipulatedData)
  return manipulatedData
}


/**
 * Common fields for all taxonomies
 *
 * @param schema
 * @param commonFields
 */
const addCommonFieldsToSchema = (
  schema: RxJsonSchema,
  commonFields: [LodgerFormItemCreator] = [{
    // Data adaugarii / when added
    id: 'la',
    type: 'dateTime',
    required: true, // for filters / sorts
    index: true,
    excludeFrom: ['addForm', 'editForm'],
    showInList: 'secondary'
  }]
) => {
  commonFields.forEach(item => {
    Object.assign(schema.properties, toSchemaField(item))
  })
}

export {
  toRxDBtype,
  toSchemaField,
  pushFieldToSchema,
  handleOnSubmit,
  addCommonFieldsToSchema,
  assignRefIdsFromStore,
  prepareRxSchema
}
