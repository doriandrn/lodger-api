import vue from 'vue'
import vuex, { Store } from 'vuex'
import { RxDatabase, RxCollection } from 'rxdb'

import DB from '~/lib/DB'

import Taxonomy from '~/lib/Taxonomy/index'

import collections from 'fixtures/taxes/collections'
import testdbsetup from 'fixtures/db/test'


vue.use(vuex)

export async function init () {
  const db = await DB.create(Object.assign({}, { ...testdbsetup }, {
    name: `${testdbsetup.name}/${Date.now()}`
  }))

  await Promise.all(collections.map(col => db.collection(col)))

  const cols = db.collections
  const store = new vuex.Store({})

  return { db, cols, store }
}

describe('Taxonomy class', () => {
  let db: RxDatabase, store: Store<any>, cols: RxCollection[],
    taxes = {}, $tax: Taxonomy<any>

  beforeAll(async () => {
    const i = await init()
    db = i.db
    store = i.store
    cols = i.cols
    Object.keys(cols).map(col => {
      taxes[col] = new Taxonomy(cols[col], store)
    })
    $tax = taxes['sosete']
  })

  afterAll(async () => {
    await db.destroy()
  })

  describe('constructor', () => {
    test('it inits ok for a known tax', () => {
      const { sosete } = taxes
      expect(sosete).toBeDefined()
      expect(sosete.name).toBe('sosete')
    })
  })

  describe('.put()', () => {
    let soseta, _id

    beforeAll(async () => {
      soseta = await $tax.put({ name: 'verde', lungime: 2 })
      _id = soseta._id
    })

    test('item gets added ok', () => {
      expect(soseta).toBeDefined()
    })

    test('item is assigned an _id', () => {
      expect(soseta._id).toBeDefined()
    })

    test(`getter 'last' is the last added item's id`, async () => {
      const { _id } = soseta

      const lastAddedId = $tax.getters['last']
      expect(lastAddedId).toBe(_id)

      const x = await $tax.put({ name: 'gigi', lungime: 5 })
      expect(x._id).toBe($tax.getters.last)
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

  describe('.trash()', () => {
    let _id: string

    beforeAll(async () => {
      const x = await $tax.put({ name: 'xx', lungime: 4 })
      _id = x._id
    })
    
    test('removes ok the item by its id', () => {
      expect(async () => { await $tax.trash(_id) }).not.toThrow()
    })

    test('store last id updates to previous id', () => {
      expect(_id).not.toEqual($tax.getters.last)
    })
  })
})
