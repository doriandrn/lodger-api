import Schema, { commonFields } from '~/lib/Schema'
import schema1 from 'fixtures/schemas/withMethods'
import { isRxSchema, RxSchema, RxJsonSchema } from 'rxdb'

const name = 'schema1'

Object.assign(schema1, { name })

describe('Schema', () => {
  let schema: Schema<string, any>

  beforeAll(() => {
    schema = new Schema(schema1)
    console.info('test schema', schema)
  })

  describe('ctor', () => {
    test('is defined', () => {
      expect(schema).toBeDefined()
    })

    test('matches sshot', () => {
      expect(schema).toMatchSnapshot()
    })

  })

  describe('.rx', () =>  {
    let rx: RxJsonSchema, rxSchema: RxSchema

    beforeAll(() => {
      rx = schema.rx
      rxSchema = RxSchema.create(rx)
    })

    test('is a valid RxSchema', () => {
      expect(rxSchema).toBeDefined()
      expect(isRxSchema(rxSchema)).toBeTruthy()
    })

    describe('.title', () => {
      test('matches given name', () => {
        expect(rx.title).toBe(name)
      })
    })
  })



  describe('.version', () => {
    test('is 0 on first run', () => {
      expect(schema.version).toBe(0)
    })

    test('increases if a new field is added after being constructed', () => {
      schema.add({ id: 'caca' })
      expect(schema.version).toBe(1)
    })
  })

  describe('add()', () => {
    test('inserts a new field programatically', () => {
      schema.add({ id: 'cucu' })
      expect(schema.properties.cucu).toBeDefined()
    })
  })

  describe('.indexables - indexable fields', () => {
    test('contains all fields\' ids with index: true', () => {
      expect(schema.indexables).toContainEqual('')
    })

    test('contains keys from commmon methods', () => {
      const cfskeys = commonFields.map(field => field.id)
      expect(Object.keys(schema.properties)).toContain(cfskeys)
    })
  })

  describe('.load', () => {
    test('overwrites form and returns an instance of schema', async () => {
      const sch = await Schema.load('Asociatie')
      expect(typeof sch).toBe(Schema)
    })
  })
})
