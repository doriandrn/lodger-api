import vue from 'vue'

import Taxonomy from '~/lib/Taxonomy/index'
import STaxonomy from '~/lib/Taxonomy/Subscribable'
import DB from '~/lib/DB'
import vuex from 'vuex'

import collections from '../../../__fixtures__/taxes/collections'
import testdbsetup from '../../../__fixtures__/db/test'
vue.use(vuex)

describe('Taxonomy class', () => {
  let db, cols, store,
    taxes = {}

  beforeAll(async () => {
    db = await DB.create(testdbsetup)
    await Promise.all(collections.map(col => db.collection(col)))

    cols = await db.collections
    store = new vuex.Store({})

    Object.keys(cols).map(col => {
      taxes[col] = new Taxonomy(cols[col], store)
    })
    console.info('taxes', Object.keys(taxes))
  })

  describe('constructor', () => {
    test('it inits ok for a known tax', () => {
      const { sosete } = taxes
      expect(sosete).toBeDefined()
      expect(sosete.name).toBe('sosete')
    })
  })

  describe('.put()', () => {
    let soseta, _id, $tax

    beforeAll(async () => {
      const _tax = 'sosete'
      $tax = taxes[_tax]
      soseta = await $tax.put({ name: 'verde', lungime: 2 })
      _id = soseta._id
    })

    test('item gets added ok', () => {
      expect(soseta).toBeDefined()
    })

    test('item is assigned an _id', () => {
      expect(soseta._id).toBeDefined()
    })

    test(`getter 'last' is the item's id`, () => {
      const { _id } = soseta
      console.log('g', $tax.getters)
      const lastAddedId = $tax.getters['sosete/last']
      expect(lastAddedId).toBe(_id)
    })

    // test('(!!) if added from same subscriber, item gets selected immediately after', () => {
    //   const { _id } = soseta
    //   expect(store.getters['soseta/selected']).toBe(_id)
    // })

    test('updates the current item if _id is provided and ok', async () => {
      const name = 'new sos'
      const newSoseta = Object.assign({}, {
        _id,
        name,
        lungime: 3
      })
      const updatedSoseta = await $tax.put(newSoseta)

      expect(_id).toEqual(updatedSoseta._id)
      expect(name).toEqual(updatedSoseta.name)
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
