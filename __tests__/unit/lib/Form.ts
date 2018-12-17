import {
  Form,
  Errors,
  prepareRxSchema,
  LodgerFormCreator,
  LodgerFormConstructor
} from '~/lib/Form'


import fields from '@/__fixtures__/forms/fields/normal'
import fieldsWithExcludedItems from '@/__fixtures__/forms/fields/withExcludedItems'

/**
 * DO NOT CHANGE ANY OF THESE
 * as existing tests run on them
 *
 * Rather, create new / extend the stubs / vars and export them
 */
const name = 'xx'
const plural = 'xxs'

const methods = {
  async lol () {},
  syncMethod () {}
}

const stub1: LodgerFormCreator = {
  name,
  plural,
  fields,
  methods
}

const stub2: LodgerFormCreator = {
  name,
  fields: fieldsWithExcludedItems,
  plural
}


describe('Form', () => {
  let __stub1__: LodgerFormConstructor
  let __stub2__: LodgerFormConstructor

  beforeAll(() => {
    __stub1__ = new Form(stub1)
    __stub2__ = new Form(stub2)
    console.error(__stub2__)
  })


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



  describe('.collection', () => {
    describe('positive', () => {
      test('makes collection', () => {
        const { collection } = __stub1__
        expect(collection).toBeDefined()
        expect(collection.schema).toBeDefined()
      })

      test('methods are passed in if existing', () => {
        const { collection } = __stub1__
        expect(collection.methods).toEqual(stub1.methods)
      })

      test('statics are passed', () => {
        const { collection } = __stub1__
        expect(collection.statics).toEqual(stub1.statics)
      })
    })

    describe('schema', () => {
      test('is defined', () => {
        const { schema } = __stub1__.collection
        expect(schema).toBeDefined()
      })

      test('title matches name', () => {
        const { schema } = __stub1__.collection
        expect(schema.title).toBe(name)
      })

      // test('matches fields length', () => {
      //   const { schema } = __stub1__.collection
      //   const keys = Object.keys(schema.properties)
      //   expect(keys.length).toBe(fields.length)
      // })

      describe('.required[]', () => {

        test('adds required fields', () => {
          const { schema } = __stub2__.collection
          const { required } = schema
          expect(required).toContain('x2')
          expect(required).not.toContain('x5')
        })

        test('does NOT contain duplicates', () => {
          const { schema } = __stub2__.collection
          const { required } = schema
          expect(required).toEqual(['x2'])
        })

        test('excluded from db fields dont show up', () => {
          const { schema } = __stub2__.collection
          expect(schema.properties.x5).toBeUndefined()
        })
      })

      test('excludes fields', () => {
        const { schema: { properties } } = __stub2__.collection
        expect(properties).not.toHaveProperty('x5')
      })

      test('indexable fields have -index- prop', () => {
        const { schema: { properties } } = __stub2__.collection
        expect(properties.x2.index).toBeDefined()
      })

      describe('adds common-shared fields', () => {
        test('la - @ - time the doc was added', () => {
          const { schema: { properties } } = __stub2__.collection
          expect(properties.la).toBeDefined()
        })
      })

    })
  })

  describe('.load() - Loads a form by name', () => {
    let form
    const formToLoadAndTest = 'asociatie'
    beforeAll(async () => {
      form = await Form.load(formToLoadAndTest)
    })

    describe('positive', () => {

      test('returns a fully inited <Form> if found and ok', () => {
        expect(form).toBeDefined()
        expect(form.name).toBeDefined()
        expect(form.collection).toBeDefined()
      })

      test('form name is the same  as requested', () => {
        console.error(form)
        expect(form.name).toBe(formToLoadAndTest)
      })
    })

    describe('negative', () => {
      test('throws if called with anything else than string', async () => {
        try {
          await Form.load('')
        } catch (e) {
          expect(e).toBeDefined()
        }

      })
      test('throws for unknown filenames', async () => {
        try {
          await Form.load('ceva')
        } catch (e) {
          expect(e).toBeDefined()
        }
      })
    })
  })


})
