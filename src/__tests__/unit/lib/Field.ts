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

        expect(field).toBeDefined()
        expect(field.id).toEqual(id)
        expect(field.type).toBe('string')
      })
    })
  })

  describe('.v - validation string', () => {
    test('adds "required" to it if field is required', () => {
      const field = new Field({ id, required: true })
      expect(field.v.indexOf('required')).toBeGreaterThan(-1)
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

  describe('.rxSchema', () => {
    const id = 'un field random'
    const testField = new Field({ id }).rxSchema

    describe('positive', () => {
      test('id is stripped because it s always kept as an index in  the container', () => {
        expect(testField.id).toBeUndefined()
      })

      test('type gets converted with .toRxDBtype()', () => {
        const field = new Field({ id, type: 'bani' }).rxSchema
        expect(field.type).toBe('object')
      })

      test('adds references to fields', () => {
        const fieldCuReferinta = { id, ref: 'altaColectie' }
        const fieldCuReferintaTransformat = new Field(fieldCuReferinta).rxSchema

        expect(fieldCuReferintaTransformat).toHaveProperty('ref')
        expect(typeof fieldCuReferintaTransformat.ref).toBe('string')
      })

      test('excludes null/undefined keys', () => {
        Object.values(new Field(testField)).forEach(field => {
          expect(field).toBeDefined()
        })
      })

      test('has the "index" property if supplied in field', () => {
        const id = 'indexable'
        expect(new Field({ id, index: true }).rxSchema.index).toBeTruthy()
      })

      test('has the "index" property if supplied in field', () => {
        const id = 'indexable'
        expect(new Field({ id, index: true }).rxSchema.index).toBeTruthy()
      })
    })
  })
})
