import {
  toRxDBtype,
  pushFieldToSchema,
  toSchemaField,
  handleOnSubmit
} from '~/lib/helpers/forms'

import { fields, fieldsWithExcludedItems } from '@/__fixtures__/forms/fields'
import { RxJsonSchema } from 'rxdb';

describe('helpers/forms', () => {


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
})
