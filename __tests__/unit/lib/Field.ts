import { Field } from '~/lib/Field'

describe('Field', () => {
  describe('new()', () => {
    describe('+', () => {
      test('constructs just with ID', () => {
        expect(new Field({ id: 'test' })).toBeDefined()
      })
    })

    describe('-', () => {
      test('throws if no ID supplied', () => {
        expect(new Field()).toThrow()
      })
    })
  })
})
