import { Field } from '~/lib/Field'

/**
 * Setup a dummy id to use everywhere
 */
const id = 'test'

describe('Field', () => {
  describe('new()', () => {
    describe('+', () => {
      test('constructs with ID', () => {
        const field = new Field({ id })
        console.info('Field', field)
        expect(field).toBeDefined()
        expect(field.id).toEqual(id)
        expect(field.type).toBe('string')
      })
    })
  })

  describe('.ref - references', () => {
    describe('+', () => {
      test('is undefined if no references passed', () => {
        const field = new Field({ id })
        expect(field.ref).toBeUndefined()
      })

      test('adds references required stuff', () => {
        const ref = 'asociatii'
        const field = new Field({ id, ref })

        expect(field.ref).toBe(ref)
        expect(field.items.type).toBe('string')
      })
    })
  })

  describe('.type', () => {
    describe('+', () => {
      test('gets converted', () => {
        const field = new Field({ id, type: 'dateTime' })
        expect(field.type).toBe('number')
      })
    })
  })

  describe('.multipleOf', () => {
    describe('+', () => {
      test('transforms .step to .multipleOf if type is "number"', () => {
        const step = 5
        const field = new Field({ id, type: 'number', step })
        expect(field.multipleOf).toBe(step)
      })
    })

    describe('-', () => {
      test('throws if type is not "number"', () => {
        expect(() => new Field({ id, step: 4 })).toThrow()
      })
    })
  })

  describe('.default', () => {
    describe('+', () => {
      test('assigns a static value', () => {
        const defVal = 'foo'
        const field = new Field({ id, default: defVal })
        expect(field.default).toEqual(defVal)
      })

      test('if function calculates its value', () => {
        const defVal = 'foo'
        const defFunc = () => defVal
        const field = new Field({ id, default: defFunc })
        expect(field.default).toEqual(defVal)
      })
    })
  })

  describe('.value()', () => {
    describe('+', () => {
      test('ok without context', () => {
        const field = new Field({ id, value: () => 'foo' })
        expect(field.value()).toEqual('foo')
      })

      test('applies context given data', () => {
        const getterTree = {
          foo: 'bar'
        }
        const field = new Field({ id, value: ({ getters }) => getters['foo'] })
        expect(field.value({ getters: getterTree as any })).toEqual('bar')
      })

      test('is undefined if "value" property missing', () => {
        const field = new Field({ id })
        expect(field.value()).toBeUndefined()
      })
    })

    describe('-', () => {

    })
  })

})
