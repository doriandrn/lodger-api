import { RxJsonSchema } from 'rxdb'
import FormItemTypes from 'lodger/lib/defs/FormItemTypes'
import Debug from 'debug'
import { Taxonomii } from '../../index';
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
function toRxDBtype(type: KnownItemTypes): RxDBType {
  const _default = 'string'
  const { strings, numbers, arrays, objects } = FormItemTypes

  if (!type || strings.indexOf(type) > -1) return _default
  if (objects.indexOf(type) > -1) return 'object'
  if (numbers.indexOf(type) > -1) return 'number'
  if (arrays.indexOf(type) > -1) return 'array'
  return _default
}

/**
 * Transforms a lodger form field to a valid RxSchema one
 *
 * @param formItem
 */
const toSchemaField = (formItem: Item) => {
  if (!formItem.id)
    throw new Error('camp fara id')

  const { id, step, indexRef, index } = formItem
  let { type, ref } = formItem

  type = toRxDBtype(type)
  ref = ref ? {
    ref,
    items: {
      // Folosim doar id-uri pt. referinta intre obiecte, de aici 'string'
      type: 'string'
    }
  } : undefined

  if (ref && indexRef) {
    Object.assign(ref, { index: indexRef })
  }

  const field = { type }

  // cheiImutabile.forEach(((cheie: string) => {
  //   if (!formItem[cheie]) return
  //   Object.assign(descriereCamp, { [cheie]: formItem[cheie] })
  // })
  if (index) Object.assign(field, { index })

  if (step) Object.assign(field, { multipleOf: step })
  if (ref) Object.assign(field, ref)

  return { [id]: field }
}


/**
 * Adauga un camp la schema Rx
 *
 * @param {Object} formItem - campu'
 * @param {Object} schema - schema colectiei
 * @returns {object} schema modificata
 */
const pushFieldToSchema = (formItem: Item, schema: RxJsonSchema) => {
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
function assignRefIdsFromStore (context: any): void {
  const { references, getters } = context
  if (!(references && references.length)) return
  const refsObj = {}
  references.map(tax => {
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
  data : LodgerFormData,
  context ?: any
) {
  const manipulatedData: any = {}
  debug('data before hOS', data)

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
  debug('data after hOS', manipulatedData)
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
  commonFields: [Item] = [{
    // Data adaugarii / when added
    id: 'la',
    type: 'date-time',
    required: true, // for filters / sorts
    index: true,
    notInForm: true,
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
  assignRefIdsFromStore
}
