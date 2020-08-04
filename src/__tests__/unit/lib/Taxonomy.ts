import Taxonomy from '~/lib/Taxonomy/index'

import { createRxDatabase, addRxPlugin } from 'rxdb'
import sosete from 'fixtures/taxes/sosete'
import testdbsetup from 'fixtures/db/test'

describe('Taxonomy class', () => {
  let $tax: Taxonomy<any>

  beforeAll(async () => {
    addRxPlugin(require('pouchdb-adapter-memory'))
    const db = await createRxDatabase(testdbsetup)
    Taxonomy.db = db
    try {
      $tax = await Taxonomy.init(sosete, { timestamps: true })
    } catch (e) {
      console.log('Taxonomy init failed', e)
    }
  })

  afterAll(async () => {
    await Taxonomy.db.destroy()
  })

  // test('inits with no parameters', async () => {
  //   let x
  //   try {
  //     x = await Taxonomy.init({ name: 'cocosi' })
  //   } catch (e) {
  //     console.error('wtf', e)
  //   }
  //   expect(x).toBeDefined()
  // })

  describe('constructor', () => {
    test('matches snapshot', () => {
      expect($tax).toMatchSnapshot('sosete')
    })

    test('it inits ok for a known tax', () => {
      expect($tax).toBeDefined()
      expect($tax.name).toBe(sosete.name)
    })

    test('form is defined and accesibile', () => {
      expect($tax.form).toBeDefined()
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

  describe('.children', () => {
    test('can be set', () => {
      $tax.children = [1, 2]
      expect($tax.children).toBeDefined()
    })

    test('throws if not an array', () => {})
  })

  describe('.destroy()', () => {
    beforeAll(async () => {
      await Taxonomy.destroy()
    })

    test('destroys the db', () => {
      expect($tax).toBeDefined()
      expect($tax.db).toBeUndefined()
    })
  })
})
