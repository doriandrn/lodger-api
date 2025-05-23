import { Form, LodgerFormCreator } from '~/lib/Form'
import fieldsWithExcludedItems from 'fixtures/fields/withExcludedItems'
import { _ensureStorageTokenExists } from 'rxdb/dist/typings/rx-database'

/**
 * DO NOT CHANGE ANY OF THESE
 * as existing tests run on them
 *
 * Rather, create new / extend the stubs / vars and export them
 */
const name = 'xx'

type TestFormFields = {
  x1: string
}

describe('Form', () => {
  const formData: LodgerFormCreator<TestFormFields> = {
    name,
    fields: { ...fieldsWithExcludedItems }
  }

  let form: Form<TestFormFields>
  let formWithCT: Form<any>
  let schema: Schema<TestFormFields>

  beforeAll(() => {
    form = new Form(formData)
    formWithCT = new Form(formData, {
      captureTimestamp: true
    })

    schema = form.schema
  })

  test('it doesnt affect the other instance of form', () => {
    expect(formWithCT.fieldsIds).not.toEqual(form.fieldsIds)
  })

  describe('constructor', () => {

    test('matches snapshot',  () => {
      expect(form).toMatchSnapshot(name)
    })
  })

  describe('options', () => {
    describe('.captureTimestamp', () => {

      test('matches snapshot', () => {
        expect(formWithCT).toMatchSnapshot('options.captureTimestamp')
      })

      test('field.createdAt is defined', () => {
        expect(formWithCT.fieldsIds.indexOf('createdAt')).toBeGreaterThan(-1)
      })

      test('field.updatedAt is defined', () => {
        expect(formWithCT.fieldsIds.indexOf('updatedAt')).toBeGreaterThan(-1)
      })

    })
  })

  describe('.fields', () => {
    test('contains all fields', () => {
      expect(Object.keys(formData.fields).length).toEqual(Object.keys(form.fields).length)
    })

    test('labels are properly translated based on locale', () => {
      expect('')
    })
  })

  describe('.schema', () => {
    test('is defined', () => {
      expect(schema).toBeDefined()
    })

    test('properties obj contains the same no as fields', () => {
      const { properties } = schema
      expect(Object.keys(properties)).toEqual(Object.keys(form.fields))

    })
  })

  describe('.value()', () => {
    // nu e  cel mai ok test, redo
    test('it contains all keys', () => {
      expect(Object.keys(form.value()))
      .toEqual(form.fieldsIds)
    })
  })

  describe('.fakeData', () => {
    test('it contains the schema keys', () => {
      expect(Object.keys(form.fakeData)).toEqual(Object.keys(form.schema.properties))
    })

    test('at least one property has value', () => {
      expect(Object.values(form.fakeData).filter(v => v !== undefined).length).toBeGreaterThan(0)
    })

    test('generates diferrent data when requested again', () => {
      expect(Object.values(form.fakeData)).not.toEqual(Object.values(form.fakeData))
    })
  })

  describe('.plural', () => {
    test('returns the inernationalized name string', () => {
      expect(form.plural).toEqual(form.name.plural)
    })
  })
})
