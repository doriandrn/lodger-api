import {
  Form,
  Errors,
  prepareRxSchema,
  LodgerFormCreator,
  LodgerFormConstructor
} from '~/lib/Form'

// import { stub1, stub2, fields, name } from '@/__stubs__/playground'

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

const fields = [
  { id: 'x1' },
  { id: 'x2', required: true, index: true },
  { id: 'x3' }
]

const fieldsWithExcludedItems = [
  ...fields,
  { id: 'x4', excludeFrom: 'db' },
  { id: 'x5', excludeFrom: 'db', required: true }
]


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
  const __stub1__: LodgerFormConstructor = new Form(stub1)
  const __stub2__: LodgerFormConstructor = new Form(stub2)
  console.error(__stub1__)

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

  describe('prepareRxSchema()', () => {
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

    test('excludes fields', () => {
      const { schema: { properties } } = __stub2__
      expect(properties).not.toHaveProperty('x5')
    })

    test('indexed fields have -index- prop', () => {
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

  describe('.load() - Loads a form by name', () => {
    let form
    const formToLoadAndTest = 'asociatie'
    beforeAll(async () => {
      form = await Form.load(formToLoadAndTest)
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
    describe('positive', () => {

      test('returns a fully inited <Form> if found and ok', () => {
        expect(form).toBeDefined
      })

      test('form name is the same  as requested', () => {
        expect(form.name).toBe(formToLoadAndTest)
      })
    })
  })
})
