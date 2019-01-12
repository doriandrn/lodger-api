import Taxonomy from '~/lib/Taxonomy/index'
import STaxonomy from '~/lib/Taxonomy/Subscribable'
import DB from '~/lib/DB'
import collections from '../../__fixtures__/taxes/collections'
import testdbsetup from '../../__fixtures__/db/test'


describe('Taxonomy class', () => {
  let db

  beforeAll(async () => {
    db = await DB(collections, testdbsetup)
  })

  describe('constructor', () => {
    describe('positive', () => {
      test('it inits ok for a known tax', () => {
        const asociatie = new Taxonomy('asociatie')
        expect(asociatie).toBeDefined()
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

        // this  should work actually
        try {
          new Taxonomy(3)
        } catch (e) {
          expect(e).toBeDefined()
        }
      })

    })
  })

  describe('@extends', () => {
    describe('Subscribable Taxonomy', () => {

    })
  })
})

/**
 *

taxonomii: {
  asociatie: {
    referencesTaxonomies:
  }
}

Taxonomies holder
+:
  it creates a container that holds all requested taxonomies

-:


Taxonomy
  .plural getter
    +:
      it returns the plural string based on name
    -:
      throws if invalid

  subscribe

*/
