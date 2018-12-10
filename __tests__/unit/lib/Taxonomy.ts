import { Taxonomy } from '~/lib/Taxonomy'

describe('Taxonomy class', () => {
  describe('constructor', () => {
    describe('positive', () => {
      test('')
    })

    describe('negative', () => {
      test('it throws for an unknown taxonomy', () => {
        try {
          new Taxonomy('masina')
        } catch (e) {
          expect(e).toBeDefined()
        }
      })
    })
  })
})
