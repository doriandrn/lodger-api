import {
  toRxDBtype,
  pushFieldToSchema,
  toSchemaField,
  handleOnSubmit
} from 'lodger/lib/helpers/forms'

import { fields, fieldsWithExcludedItems } from 'lodger/lib/forms/__stubs__/playground'
import { RxJsonSchema } from 'rxdb';

describe('helpers/forms', () => {
  describe('.toRxDBtype()', () => {
    describe('positive', () => {
      test('returns "string" (default type) for unknown inputs', () => {
        expect(toRxDBtype('whatever')).toBe('string')
        expect(toRxDBtype(null)).toBe('string')
        expect(toRxDBtype('string')).toBe('string')
        expect(toRxDBtype(undefined)).toBe('string')
      })

      test('returneaza "number" pentru valorile aferente', () => {
        expect(toRxDBtype('date-time')).toBe('number')
        expect(toRxDBtype('bani')).toBe('number')
        expect(toRxDBtype('date')).toBe('number')
        expect(toRxDBtype('number')).toBe('number')
      })

      test('returneaza "array" pentru valorile aferente', () => {
        expect(toRxDBtype('furnizori')).toBe('array')
        expect(toRxDBtype('servicii')).toBe('array')
      })

      test('returns object for object', () => {
        expect(toRxDBtype('object')).toBe('object')
      })
    })

    describe('negative', () => {
      //
    })

  })

  describe('.pushFieldToSchema()', () => {
    describe('positive', () => {
      test('adds required fields to required[]', () => {
        const schema: RxJsonSchema = {} as any
        fieldsWithExcludedItems.forEach(field => {
          pushFieldToSchema(field, schema)
        })
        expect(schema.required).toContain('x2')
      })
    })

    describe('negative', () => {
      test('throws if insufficient arguments', () => {
        expect(() => { pushFieldToSchema() }).toThrow()
      })

      test('throws if field doesn t have an id', () => {
        expect(() => { pushFieldToSchema({ salut: 'yolo '}) }).toThrow()
      })

      test('throws if duplicated id detected', () => {
        //..
      })

      test('throws with wrong parameters', () => {
        expect(() => { pushFieldToSchema(1, 2) }).toThrow()
        expect(() => { pushFieldToSchema(true, null) }).toThrow()
        expect(() => { pushFieldToSchema('bam bam', []) }).toThrow()
      })
    })
  })

  describe('.toSchemaField()', () => {
    const id = 'un field random'
    const testField = toSchemaField({ id })

    describe('positive', () => {
      test('returned object\'s key equals the id', () => {
        expect(Object.keys(testField)[0]).toBe(id)
      })

      test('type gets converted with .toRxDBtype()', () => {
        expect(toSchemaField({
          id,
          type: 'bani'
        })[id].type).toBe('number')
      })

      test('adds references to fields', () => {
        const fieldCuReferinta = {
          id,
          ref: 'altaColectie'
        }
        const fieldCuReferintaTransformat = toSchemaField(fieldCuReferinta)[id]
        expect(fieldCuReferintaTransformat).toHaveProperty('ref')

        expect(typeof fieldCuReferintaTransformat.ref).toBe('string')
        expect(fieldCuReferinta.ref.ref).toBeUndefined()
      })

      test('excludes null/undefined keys', () => {
        Object.values(testField[id]).forEach(field => {
          expect(field).toBeDefined()
        })
      })

      test('adds the "index" property if supplied in field', () => {
        const id = 'indexable'
        expect(toSchemaField({
          id,
          index: true
        })[id].index).toBeTruthy()
      })
    })

    describe('negative', () => {
      test('throws if missing id', () => {
        expect(() => { toSchemaField({}) }).toThrow()
      })
    })
  })

  describe('.sortOptions', () => {
    describe('positive', () => {})
    describe('negative', () => {})
  })

  describe('.handleOnSubmit()', () => {
    describe('positive', () => {
      test('adds the current time for all "la" fields', () => {
        const data = handleOnSubmit({
          la: undefined
        })
        expect(data.la).toBeDefined()
      })

      test('skips empty/undefined/null values', () => {
        const data = handleOnSubmit({
          x: -1,
          y: 0,
          z: 1,
          foo: null,
          bar: undefined
        })
        expect(data.x).toBeDefined()
        expect(data.y).toBeDefined()
        expect(data.z).toBeDefined()
        expect(data.foo).toBeUndefined()
        expect(data.bar).toBeUndefined()
      })
    })
    describe('negative', () => {})
  })

  // TODO! ia din forms dupa nume si gaseste fiedl cu Id la sf
  // describe('.getReferenceTaxonomy()', () => {
  //   describe('positive', () => {
  //     test('returns the item with', () => {

  //     })
  //   })
  // })

  describe('.dynamicFormData() -> renamed to componentData()', () => {
    describe('positive', () => {

    })

    describe('negative', () => {

    })
  })
})
