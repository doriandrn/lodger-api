import { Field } from '~/lib/Field'
import { strings, arrays, objects, numbers } from '~/lib/String'

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
      expect(field.v && field.v.indexOf('required')).toBeGreaterThan(-1)
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
        if (field.items) {
          expect(field.items.type).toBe('string')
        }
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

  describe('.fakeValue', () => {
    describe('generates fake values accordingly', () => {
      describe('strings', () => {
        Object
          .keys(strings)
          .filter(s => typeof strings[s as any] === 'number')
          .map(type => {
            test(type, () => {
              const field = new Field({ type })
              expect(typeof field.fakeValue).toBe('string')
              expect(field.fakeValue.length).toBeGreaterThan(1)
            })
          })
      })

      describe('numbers', () => {
        Object
          .keys(numbers)
          .filter(s => typeof numbers[s as any] === 'number')
          .map(type => {
            test(type, () => {
              const field = new Field({ type })
              expect(typeof field.fakeValue).toBe('number')
            })
          })
      })


      // todo: add for other types
      })
    })
  })

  describe('.label', () => {
    test('is defined & unnamed', () => {
      const field = new Field()
      expect(field.label()).toBeDefined()
    })
  })

  describe('.description', () => {

  })

  describe('.rxSchema', () => {
    const testField = new Field().rxSchema

    describe('+', () => {
      test('type gets converted with String.asRxDBtype', () => {
        const field = new Field({ type: '$' }).rxSchema
        expect(field.type).toBe('string')
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

      // deprecated
      // test('has the "index" property if supplied in field', () => {
      //   expect(new Field({ index: true }).rxSchema.index).toBeTruthy()
      // })

      test('matches snapshot', () => {
        expect(testField).toMatchSnapshot('testField')
      })
    })
  })
})
