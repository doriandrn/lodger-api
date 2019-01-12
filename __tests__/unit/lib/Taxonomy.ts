import vue from 'vue'

import Taxonomy from '~/lib/Taxonomy/index'
import STaxonomy from '~/lib/Taxonomy/Subscribable'
import DB from '~/lib/DB'
import vuex from 'vuex'

import collections from '../../../__fixtures__/taxes/collections'
import testdbsetup from '../../../__fixtures__/db/test'
vue.use(vuex)

describe('Taxonomy class', () => {
  let db, cols, store

  beforeAll(async () => {
    db = await DB.create(testdbsetup)
    await Promise.all(collections.map(col => db.collection(col)))

    cols = await db.collections
    store = new vuex.Store({})
  })

  describe('constructor', () => {
    test('it inits ok for a known tax', () => {
      const sosete = new Taxonomy(cols['sosete'], store)
      console.info('sosete', Object.keys(sosete))
      expect(sosete).toBeDefined()
      expect(sosete.name).toBe('sosete')
    })
  })

  describe('@extends', () => {
    describe('Subscribable Taxonomy', () => {

    })

    describe('Searchable Taxonomy', () => {

    })
  })

  afterAll(async () => {
    await db.destroy()
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
