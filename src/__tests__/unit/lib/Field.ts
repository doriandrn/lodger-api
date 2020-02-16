import { Field } from '~/lib/Field'

/**
 * Setup a dummy id to use everywhere
 */

describe('Field', () => {
  describe('new()', () => {
    let emptyField : Field

    describe('no args', () => {
      beforeAll(() => {
        emptyField = new Field()
      })

      test('constructs ok', () => {
        expect(emptyField).toBeDefined()
      })

      describe('.type', () => {
        test('is set', () => {
          expect(emptyField.type).toBeDefined()
        })

        test('is string', () => {
          expect(emptyField.type).toBe('string')
        })
      })
    })
  })


  describe('.v - validation string', () => {
    test('adds "required" to it if field is required', () => {
      const field = new Field({ required: true })
      expect(field.v.indexOf('required')).toBeGreaterThan(-1)
    })
  })

  describe('.ref - references', () => {
    describe('+', () => {
      test('is undefined if no references passed', () => {
        const field = new Field()
        expect(field.ref).toBeUndefined()
      })

      test('adds references required stuff', () => {
        const ref = 'asociatii'
        const field = new Field({ ref })

        expect(field.ref).toBe(ref)
        expect(field.items.type).toBe('string')
      })
    })
  })

  describe('.type', () => {
    describe('+', () => {
      test('gets converted', () => {
        const field = new Field({ type: 'dateTime' })
        expect(field.type).toBe('number')
      })
    })
  })

  describe('.multipleOf', () => {
    describe('+', () => {
      test('transforms .step to .multipleOf if type is "number"', () => {
        const step = 5
        const field = new Field({ type: 'number', step })
        expect(field.multipleOf).toBe(step)
      })
    })

    describe('-', () => {
      test('throws if type is not "number"', () => {
        expect(() => new Field({ step: 4 })).toThrow()
      })
    })
  })

  describe('.default', () => {
    describe('+', () => {
      test('assigns a static value', () => {
        const defVal = 'foo'
        const field = new Field({ default: defVal })
        expect(field.default).toEqual(defVal)
      })

      test('if function calculates its value', () => {
        const defVal = 'foo'
        const defFunc = () => defVal
        const field = new Field({ default: defFunc })
        expect(field.default).toEqual(defVal)
      })
    })
  })

  describe('.value()', () => {
    describe('+', () => {
      test('ok without context', () => {
        const field = new Field({ value: () => 'foo' })
        expect(field.value()).toEqual('foo')
      })

      test('applies context given data', () => {
        const getters = {
          foo: 'bar'
        }
        const field = new Field({ value: ({ getters }) => getters['foo'] })
        expect(field.value({ getters })).toEqual(getters['foo'])
      })

      test('is undefined if "value" property missing', () => {
        const field = new Field()
        expect(field.value()).toBeUndefined()
      })
    })

    describe('-', () => {

    })
  })

  describe('.label', () => {
    test('is assigned', () => {
      const field = new Field()
      expect(field.label).toBeDefined()
    })
  })

  describe('.description', () => {

  })

  describe('.rxSchema', () => {
    const testField = new Field().rxSchema

    describe('+', () => {
      test('type gets converted with .toRxDBtype()', () => {
        const field = new Field({ type: 'bani' }).rxSchema
        expect(field.type).toBe('object')
      })

      test('adds references to fields', () => {
        const fieldCuReferinta = { ref: 'altaColectie' }
        const fieldCuReferintaTransformat = new Field(fieldCuReferinta).rxSchema

        expect(fieldCuReferintaTransformat).toHaveProperty('ref')
        expect(typeof fieldCuReferintaTransformat.ref).toBe('string')
      })

      test('excludes null/undefined keys', () => {
        Object.values(testField).forEach(field => {
          expect(field).toBeDefined()
        })
      })

      test('has the "index" property if supplied in field', () => {
        expect(new Field({ index: true }).rxSchema.index).toBeTruthy()
      })

      test('matches snapshot', () => {
        expect(testField).toMatchSnapshot('testField')
      })
    })
  })
})
