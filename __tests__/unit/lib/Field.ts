// import { Field } from '../../../src/lib/Field'
import { Field } from '~/lib/Field'

describe('Field', () => {
  describe('new()', () => {
    describe('+', () => {
      const id = 'test'
      test('constructs with ID', () => {
        const field = new Field({ id })

        expect(field).toBeDefined()
        expect(field.id).toEqual(id)
        expect(field.type).toBe('string')
      })

      test('adds references required stuff', () => {
        const ref = 'asociatii'
        const field = new Field({ id, ref })

        expect(field.ref).toBe(ref)
        expect(field.items.type).toBe('string')
      })
    })
  })
})
