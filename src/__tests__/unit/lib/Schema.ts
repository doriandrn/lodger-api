import Schema from '~/lib/Schema'
import { isRxSchema, RxSchema, RxJsonSchema } from 'rxdb'

import schema1 from 'fixtures/schemas/withMethods'
const name = 'schema1'

Object.assign(schema1, { name })

describe('Schema', () => {
  let schema: Schema<string, any>
  let rxSchema: RxSchema

  beforeAll(() => {
    schema = new Schema(name, schema1.fields)
    rxSchema = RxSchema.create(schema)

    console.info(name, schema)
  })

  describe('ctor', () => {
    test('is defined', () => {
      expect(schema).toBeDefined()
    })

    test('matches sshot', () => {
      expect(schema).toMatchSnapshot(name)
    })

    test('is a valid RxSchema', () => {
      expect(rxSchema).toBeDefined()
      // expect(isRxSchema(rxSchema)).toBeTruthy()
    })

    describe('options', () => {

    })
  })


  // describe('.title', () => {
  //   test('matches given name', () => {
  //     expect(rxSchema.title).toBe(name)
  //   })
  // })



  describe('.version', () => {
    test('is 0 on first run', () => {
      expect(schema.version).toBe(0)
    })

    // test('increases if a new field is added after being constructed', () => {
    //   schema.add({ id: 'caca' })
    //   expect(schema.version).toBe(1)
    // })
  })

  describe('add()', () => {
    test('inserts a new field programatically', () => {
      schema.add({ id: 'cucu' })
      expect(schema.properties.cucu).toBeDefined()
    })
  })

  describe('.indexables - indexable fields', () => {
    test('contains all fields\' ids with index: true', () => {
      expect(schema.indexables).toContainEqual('x2')
    })

    // test('contains keys from commmon methods', () => {
    //   const cfskeys = commonFields.map(field => field.id)
    //   expect(Object.keys(schema.properties)).toContain(cfskeys)
    // })
  })

  describe('.load', () => {
    test('loads a known taxonomy schema by name', async () => {
      const sch = await Schema.load('asociatie')
      expect(sch).toBeDefined()
      expect(typeof sch).toBe(Schema)
    })
  })
})
