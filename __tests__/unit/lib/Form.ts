import { Form, Errors } from 'lodger/lib/Form'
import { stub1, stub2, fields, name } from 'lodger/lib/forms/__stubs__/playground'

describe('Form', () => {
  const __stub1__ = new Form(stub1)
  const __stub2__ = new Form(stub2)

  describe('new()', () => {
    // describe('negative', () => {
    //   const name = 'aFormName'
    //   const plural = 'formsCollection'
    //   test('throws if fields is empty', () => {
    //     const fields: Fields = []
    //     expect(() => new Form({ fields }, name, plural)).toThrow()
    //   })
    // })

  })

  describe('.schema', () => {
    
    test('is defined', () => {
      const { schema } = __stub1__
      expect(schema).toBeDefined()
    })

    test('title matches name', () => {
      const { schema } = __stub1__
      expect(schema.title).toBe(name)
    })

    test('matches fields length', () => {
      const { schema } = __stub1__
      const keys = Object.keys(schema.properties)
      expect(keys.length).toBe(fields.length)
    })

    describe('.required[]', () => {
      const { schema } = __stub2__
      const { required } = schema
      // console.log(schema, typeof schema)

      test('adds required fields', () => {
        expect(required).toContain('x2')
        expect(required).not.toContain('x5')
      })

      test('does NOT contain duplicates', () => {
        expect(required).toEqual(['x2'])
      })
    })

    test('excludes fields that have the notInDb property', () => {
      const { schema: { properties } } = __stub2__
      expect(properties).not.toHaveProperty('x5')
    })

    test('indexed fields have index prop', () => {
      const { schema: { properties } } = __stub2__
      expect(properties.x2.index).toBeDefined()
    })

    describe('adds common-shared fields', () => {
      test('la - @ - time the doc was added', () => {
        const { schema: { properties } } = __stub2__
        expect(properties.x2.la).toBeDefined()
      })
    })
    
  })

  describe('.collection', () => {
    test('makes collection', () => {
      const { collection } = __stub1__
      expect(collection).toBeDefined()
    })

    test('methods are passed in if existing', () => {
      const { collection } = __stub1__
      expect(collection.methods).toEqual(stub1.methods)
    })
  })

  describe('.loadByName() - Loads a form by name', () => {
    describe('negative', () => {
      test('throws if called with anything else than string', () => {
        expect(() => Form.loadByName('')).toThrow()
      })
      test('throws for unknown filenames', () => {
        expect(() => Form.loadByName('ceva')).toThrow()
      })
    })
    describe('positive', () => {
      test('returns a fully inited <Form> if found and ok', () => {
        const form = Form.loadByName('asociatie')
        expect(form.name).toBe('asociatie')
      })
    })
  })
})
