import { Taxonomy } from '~/lib/Taxonomy'

describe('Taxonomy class', () => {
  describe('constructor', () => {
    describe('positive', () => {
      test('it inits ok for a known tax', () => {
        const asociatie = new Taxonomy('asociatie')
        expect(asociatie).toBeDefined()
        expect(asociatie.form).toBeDefined()
      })
    })

    describe('negative', () => {
      test('it throws for an unknown taxonomy', () => {
        try {
          new Taxonomy('masina')
        } catch (e) {
          expect(e).toBeDefined()
        }

        try {
          new Taxonomy()
        } catch (e) {
          expect(e).toBeDefined()
        }

        try {
          new Taxonomy(3)
        } catch (e) {
          expect(e).toBeDefined()
        }
      })

    })
  })
})
