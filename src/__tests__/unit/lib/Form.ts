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
  let form: Form<'xx', TestFormFields>

  beforeAll(() => {
    form = new Form(name, formData.fields)
  })

  describe('.fields', () => {
    test('contains all fields', () => {
      expect(formData.fields.length).toEqual(Object.keys(form.fields).length)
    })
  })

  describe('constructor', () => {
    describe('matches snapshot',  () => {
      expect(form).toMatchSnapshot(name)
    })

    describe('options', () => {
      describe('.captureTimestamp', () => {
        const formWithCT = new Form(name, formData.fields, {
          captureTimestamp: true
        })
        expect(formWithCT.fieldsIds.indexOf('la')).toBeGreaterThan(-1)
      })
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
