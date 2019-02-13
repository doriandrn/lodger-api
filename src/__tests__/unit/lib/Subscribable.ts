import SubscribableTaxonomy from '~/lib/Taxonomy/Subscribable'

import { RxDatabase, RxCollection } from 'rxdb'
import { Form } from '~/lib/Form'
import Subscriber from '~/lib/Subscriber'
import { createFromCollections } from '~/lib/DB'

import collections from 'fixtures/taxes/collections'
import testdbsetup from 'fixtures/db/test'

const testTax = 'sosete'

describe('@extends', () => {
  describe('Subscribable Taxonomy', () => {
    let db: RxDatabase, cols: RxCollection[],
    taxes = {}, $tax: Taxonomy<any>

    beforeAll(async () => {
      const i = await createFromCollections(collections, testdbsetup)

      db = i.db
      cols = i.cols

      Object.keys(cols).map(col => {
        taxes[col] = new SubscribableTaxonomy(new Form(), cols[col])
      })

      $tax = taxes[testTax]
    })

    describe('ctor', () => {
      test('creates ok the tax', () => {
        expect($tax).toBeDefined()
      })

      test('is not subscribed', () => {
        expect($tax.subscribed).toBeFalsy()
      })

      describe('options', () => {

      })

      test('.name', () => {
        expect($tax.name).toEqual(testTax)
      })
    })

    describe('.defaultCriteria', () => {
      test('is always defined', () => {
        expect($tax.defaultCriteria).toBeDefined()
      })
      test('is read from config', () => {
        expect($tax.defaultCriteria.limit).toBeGreaterThan(0)
      })

          // test('has subscribed with default criteria', () => {
    //   expect(tester.criteriu).toEqual($tax.defaultCriteria)
    // })
    })

    describe('.subscribe() & Subscriber', () => {
      let subscriber: Subscriber<any>

      beforeAll(() => {
        $tax.subscribe()
        subscriber = $tax.subscribers.main
      })

      test('no args - .subscribers has -main-', () => {
        expect($tax.subscribers.main).toBeDefined()
      })

      test('subscribed flag indicates true', () => {
        expect($tax.subscribed).toBeTruthy()
      })

      describe('Multiple Subscribers', () => {
        const subs = ['a', 'b', 'c']
        beforeAll(() => {
          subs.map(sub => {
            $tax.subscribe(sub)
          })
        })
        test('all are defined', () => {
          expect(Object.keys($tax.subscribers)).toEqual(expect.arrayContaining(subs))
        })
      })
    })

    describe('.unsubscribe()', () => {
      let sname: string, kill: Function
      beforeAll(() => {
        sname = 'unsubTest'
        $tax.subscribe(sname)
        kill = $tax.subscribers[sname].kill = jest.fn()
        $tax.unsubscribe(sname)
      })

      test('subscriber is killed', () => {
        expect(kill).toHaveBeenCalled()
      })

      test('property is removed from subscribersList', () => {
        expect($tax.subscribers[sname]).toBeUndefined()
      })
    })

    describe('.unsubscribeAll()', () => {
      beforeAll(() => {
        $tax.unsubscribeAll()
      })

      test('kills all', () => {
        expect(Object.keys($tax.subscribers).length).toEqual(0)
      })
    })

    afterAll(async () => {
      await db.destroy()
    })
  })
})
