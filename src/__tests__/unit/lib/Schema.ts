import Schema from '~/lib/Schema'
import schema1 from 'fixtures/schemas/withMethods'

const name = 'schema1'
Object.assign(schema1, { name })

describe('Schema', () => {
  describe('ctor', () => {
    test('inits ok wih just fields', () => {
      const schema = new Schema(schema1)
      console.info('schema', schema)
      expect(schema.title).toBe(name)
    })
  })
})
