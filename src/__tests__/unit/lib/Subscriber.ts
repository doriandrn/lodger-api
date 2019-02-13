import { RxCollection, isRxDocument } from 'rxdb';
import { createFromCollections } from '~/lib/DB'

import Subscriber from '~/lib/Subscriber'
import delay from '~/lib/helpers/delay'

import collections from 'fixtures/taxes/collections'
import testdbsetup from 'fixtures/db/test'

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

describe('Subscriber', () => {
  let collection: RxCollection

  beforeAll(async () => {
    const { cols } = await createFromCollections([collections[1]], testdbsetup)
    collection = cols.sosete

    for (let i = 0; i < 10; i ++ ) {
      await collection.insert({ name: 'YOLO', lungime: 3 })
    }
    await delay(1000)
  })

  describe('constructor', () => {
    describe('options', () => {

    })
  })

  describe('Observes data', () => {
    let subscriber: Subscriber<any>
    let _id: string

    beforeAll(async () => {
      subscriber = new Subscriber(collection)
      const item = await collection.insert({ name: 'gigi', lungime: 5 })
      _id = item._id
      await delay(300)
    })

    afterAll(() => subscriber.kill())

    test('.fetching = false', () => {
      expect(subscriber.fetching).toBeFalsy()
    })

    test('.ids contains the newly added item id', () => {
      expect(subscriber.ids).toContain(_id)
    })

    test('.items has the key with ID', () => {
      expect(subscriber.items[_id]).toBeDefined()
    })
  })

  describe('.criteria', () => {
    let tester: Subscriber<any>

    beforeEach(() => { tester = new Subscriber(collection) })
    afterEach(() => { tester.kill() })

    describe('Change reactions', () => {

      test('.fetching = true whenever criteria changes', () => {
        tester.criteria.limit = 1
        expect(tester.fetching).toBeTruthy()
      })

      describe('.limit', () => {
        let limit = 3

        beforeEach(async () => {
          tester.criteria.limit = limit
          await delay(200)
        })

        test('getter is equal', () => {
          expect(tester.criteria.limit).toEqual(limit)
        })

        test('ids length match', () => {
          expect(tester.ids.length).toEqual(limit)
        })

        test('reacts & resubscribes on immediate re-change', () => {
          limit = 2
          tester.criteria.limit = limit
          expect(tester.criteria.limit).toBe(limit)
        })
      })

      describe('.index', () => {
        let index = 1
        let idsCurrentIndex

        beforeAll(async () => {
          idsCurrentIndex = tester.ids
          tester.criteria.index = index
          await delay(300)
        })
        test('indexes length has increased', () => {
          expect(idsCurrentIndex.length).toBeGreaterThan(tester.ids.length )
        })
      })

      describe('.filter', () => {})

      describe('.sort', () => {
        let sort = { name: 1 }
        const firstAZname = 'Aaa'
        const firstZAname = 'zzz'

        beforeAll(async () => {
          await collection.insert({ name: firstAZname, lungime: 9 })
          await collection.insert({ name: firstZAname, lungime: 9 })
        })

        describe('AZ', () => {
          beforeEach(async () => {
            tester.criteria.sort = { name: 1 }
            await delay(500)
          })

          test('updates accordingly', () => {
            expect(tester.criteria.sort).toEqual(sort)
          })

          test(`first item name is ${firstAZname}`, () => {
            const { items, ids } = tester
            expect(items[Object.keys(items)[0]].name).toEqual(firstAZname)
            expect(items[ids[0]].name).toEqual(firstAZname)
          })
        })

        describe('ZA', () => {
          beforeEach(async () => {
            tester.criteria.sort = { name: -1 }
            await delay(500)
          })

          test(`first item name is ${firstZAname}`, () => {
            const { items, ids } = tester
            expect(items[ids[0]].name).toEqual(firstZAname)
          })
        })
      })
    })
  })

  describe('.select', () => {
    let oneRandomId: string = ''
    let sub: Subscriber<any>
    const noOfItems = 10 // number of items to insert

    beforeAll(async () => {
      sub = new Subscriber(collection)
      for (let i = 0; i < noOfItems; i ++ ) {
        await collection.insert({ name: 'YOLO', lungime: 3 })
      }
      await delay(1000)
    })

    afterAll(() => sub.kill())

    beforeEach(() => {
      oneRandomId = sub.ids[getRandomInt(noOfItems - 1)]
      sub.select(oneRandomId)
    })

    test('selectedId ', () => {
      expect(sub.selected).toBeDefined()
      expect(sub.selected).toEqual(oneRandomId)
    })

    describe('.selectedDoc', () => {
      test('is RxDocument', () => {
        expect(isRxDocument(sub.selectedDoc)).toBeTruthy()
      })

      test('is the right one', () => {
        expect(sub.selectedDoc._id).toEqual(oneRandomId)
      })
    })

  })
})
