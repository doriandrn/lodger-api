import { Form, LodgerFormCreator } from '~/lib/Form'
import fieldsWithExcludedItems from 'fixtures/fields/withExcludedItems'

/**
 * DO NOT CHANGE ANY OF THESE
 * as existing tests run on them
 *
 * Rather, create new / extend the stubs / vars and export them
 */
const name = 'xx'

const formData: LodgerFormCreator<TestFormFields> = {
  name,
  fields: fieldsWithExcludedItems
}

type TestFormFields = {
  x1: string
}

describe('Form', () => {
  let form: Form<TestFormFields>

  beforeAll(() => {
    form = new Form(formData)
  })

  describe('.fields', () => {
    test('contains all fields', () => {
      expect(Object.keys(formData.fields).length).toEqual(Object.keys(form.fields).length)
    })
  })

  describe('constructor', () => {
    test('matches snapshot',  () => {
      expect(form).toMatchSnapshot(name)
    })

    describe('options', () => {
      describe('.captureTimestamp', () => {
        test('.fields[@] is defined', () => {
          const formWithCT = new Form(formData, {
            captureTimestamp: true
          })
          expect(formWithCT.fieldsIds.indexOf('@')).toBeGreaterThan(-1)
        })
      })
    })
  })

  describe('.schema', () => {
    test('is defined', () => {
      expect(form.schema).toBeDefined()
    })

    test('properties obj contains the same no as fields', () => {
      const { schema } = form
      const { properties } = schema
      expect(Object.keys(properties).length).toEqual(Object.keys(form.fields).length)
    })
  })

  describe('.value()', () => {
    // nu e  cel mai ok test, redo
    test('it contains all keys', () => {
      expect(Object.keys(form.value()))
      .toEqual(form.fieldsIds)
    })

  })

  describe('.plural', () => {
    test('returns the inernationalized name string', () => {
      expect(form.plural).toEqual(form.name.plural())
    })
  })


  // describe('.load() - Loads a form by name', () => {
  //   let form: Form<string,any>
  //   const formToLoadAndTest = 'apartament'
  //   beforeAll(async () => {
  //     try {
  //       form = await Form.load(formToLoadAndTest)
  //     } catch (e) {
  //       console.error('wtf', e)
  //     }
  //   })

  //   describe('positive', () => {

  //     test('returns a fully inited <Form> if found and ok', () => {
  //       expect(form).toBeDefined()
  //       expect(form.name).toBeDefined()
  //     })

  //     test('form name is the same  as requested', () => {
  //       expect(form.name).toBe(formToLoadAndTest)
  //     })
  //   })

  //   describe('negative', () => {
  //     test('throws if called with anything else than string', async () => {
  //       try {
  //         await Form.load('')
  //       } catch (e) {
  //         expect(e).toBeDefined()
  //       }

  //     })
  //     test('throws for unknown filenames', async () => {
  //       try {
  //         await Form.load('ceva')
  //       } catch (e) {
  //         expect(e).toBeDefined()
  //       }
  //     })
  //   })
  // })


})
