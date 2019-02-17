import { RxDatabase, RxCollection } from 'rxdb'

import DB from '~/lib/DB'
import { Form } from '~/lib/Form'
import Taxonomy from '~/lib/Taxonomy/index'

import collections from 'fixtures/taxes/collections'
import testdbsetup from 'fixtures/db/test'

describe('Taxonomy class', () => {
  let db: RxDatabase, cols: RxCollection[],
    taxes = {}, $tax: Taxonomy<any>

  beforeAll(async () => {

    db = await DB.create(testdbsetup)

    Object.keys(cols).map(col => {

      taxes[col] = new Taxonomy(schema, {
        db,
        store: true,
        shortGetters: true
      })
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

      expect($tax.last).toBe(_id)

      const x = await $tax.put({ name: 'gigi', lungime: 5 })
      expect(x._id).toBe($tax.last)
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
      expect(_id).not.toEqual($tax.last)
    })
  })

  describe('@hooks', () => {
    describe('inited', () => {

    })
  })

  describe('.config', () => {
    const cheiPrincipale = ['limit', 'index', 'sort', 'find']

    test('returneaza default-ul din config - pentru orice taxonomie daca nu e ceruta', () => {
      const { criteriu } = $tax.config
      expect(typeof criteriu).toBe('object')
      const chei = Object.keys(criteriu)
      expect(chei).toEqual(expect.arrayContaining(cheiPrincipale))
    })

    // test('returneaza criteriul cerut pentru taxonomie', () => {

    // })
  })

  // describe('getCriteriu', () => {

  //   test('suprascrie valorile cerute in query', () => {
  //     const limit = 77
  //     const sort = { la: 'lala' }
  //     const criteriu = getCriteriu('asociatie', {
  //       limit,
  //       sort
  //     })
  //     expect(criteriu.limit).toBe(limit)
  //     expect(criteriu.sort).toBe(sort)
  //   })

  //   test('arunca daca e cerut cu string sau altceva', () => {
  //     expect(() => { getCriteriu({}) }).toThrow('taxonomie incorecta')
  //     expect(() => { getCriteriu(23) }).toThrow('taxonomie incorecta')

  //   })

  //   test('returneaza criteriu default pt o taxonomie cunoscuta', () => {
  //     const { limit, index, sort, find } = getCriteriu('asociatii')
  //     expect(limit).toBe(lodgerConfig.taxonomii.asociatii.criteriu.limit)
  //   })
  // })


  // describe('.collection', () => {
  //   describe('positive', () => {
  //     test('makes collection', () => {
  //       const { collection } = __stub1__
  //       expect(collection).toBeDefined()
  //       expect(collection.schema).toBeDefined()
  //     })

  //     test('methods are passed in if existing', () => {
  //       const { collection } = __stub1__
  //       expect(collection.methods).toEqual(stub1.methods)
  //     })

  //     test('statics are passed', () => {
  //       const { collection } = __stub1__
  //       expect(collection.statics).toEqual(stub1.statics)
  //     })
  //   })


  // })
})
