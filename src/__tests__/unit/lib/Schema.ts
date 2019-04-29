import Schema from '~/lib/Schema'
import schema1 from 'fixtures/schemas/withMethods'

const name = 'schema1'
// Object.assign(schema1, { name })

describe('Schema', () => {
  let schema: Schema<string, any>

  beforeAll(() => {
    schema = new Schema(name, schema1.fields)
  })

  describe('ctor', () => {
    test('is defined', () => {
      expect(schema).toBeDefined()
    })

    test('matches sshot', () => {
      expect(schema).toMatchSnapshot(name)
    })

    // deprecated -> rxschema.create() no longer avail
    // test('is a valid RxSchema', () => {
    //   expect(rxSchema).toBeDefined()
    //   expect(isRxSchema(rxSchema)).toBeTruthy()
    // })

    test('fields match', () => {
      const keys = Object.keys(schema.properties)
      expect(keys.length).toBe(schema1.fields.length)
    })

    describe('options', () => {

    })
  })

  describe('.required[]', () => {
    test('has all required fields', () => {
      expect(schema.required).toEqual(schema1.fields.filter(field => field.required).map(field => field.id))
    })
  })

  describe('.properties', () => {
    test('excluded from db fields dont show up', () => {
      expect(schema.properties.x5).toBeUndefined()
    })
  })

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

    test('inserts a required field in .required[]', () => {
      const id = 'reqTest'
      schema.add({ id, required: true })
      expect(schema.required).toContain(id)
    })
  })

  describe('.indexables', () => {
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
      const sch = await Schema.load('bloc')
      expect(sch).toBeDefined()
      expect(sch instanceof Schema).toBeTruthy()
    })
  })
})
