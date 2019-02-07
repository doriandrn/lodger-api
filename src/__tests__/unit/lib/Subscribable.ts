import SubscribableTaxonomy from '~/lib/Taxonomy/Subscribable'

import { RxDatabase, RxCollection } from 'rxdb'
import { Form } from '~/lib/Form'
import Subscriber from '~/lib/Subscriber'
import { createFromCollections } from '~/lib/DB'

import collections from 'fixtures/taxes/collections'
import testdbsetup from 'fixtures/db/test'

const delay = (value) => new Promise(resolve =>
  setTimeout(() => resolve(), value)
)

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

      $tax = taxes['sosete']
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
        expect($tax.name).toEqual('sosete')
      })
    })

    describe('.defaultCriteria', () => {
      test('is always defined', () => {
        expect($tax.defaultCriteria).toBeDefined()
      })
      test('is read from config', () => {
        expect($tax.defaultCriteria.limit).toBeGreaterThan(0)
      })
    })

    describe('.subscribe() & Subscriber', () => {
      let subscriber: Subscriber<any>

      beforeAll(() => {
        subscriber = $tax.subscribe()
      })

      test('no args - .subscribers has -main-', () => {
        expect($tax.subscribers.main).toBeDefined()
      })

      test('subscribed flag is true', () => {
        expect($tax.subscribed).toBeTruthy()
      })

      test('observes data', async () => {
        const item = await $tax.put({ name: 'gigi', lungime: 5 })
        const { _id } = item
        await delay(300)
        const { main } = $tax.subscribers
        expect(main.ids).toContain(_id)
        expect(main.items[_id]).toBeDefined()
      })

      describe('Criteria', () => {
        let testerName = 'criteriaTester', tester: Subscriber<any>

        beforeAll(() => {
          // create a new sub to play with
          $tax.subscribe(testerName)
          tester = $tax.subscribers[testerName]
        })

        test('has subscribed with default criteria', () => {

        })

        test('resubscribes on change', () => {
          const limit = 2
          $tax.subscribe(testerName, { limit })
          expect(tester.criteriu.limit).toBe(limit)
        })

        describe('.limit', () => {
          let limit = 2
          beforeAll(async () => {
            $tax.subscribe(testerName, { limit })
            for (let i = 0; i < limit*2; i ++ ) {
              await $tax.put({ name: 'xx', lungime: 3 })
            }
            await delay(300)
          })
          test('indicator is equal', () => {
            expect(tester.criteriu.limit).toEqual(limit)
          })

          test('ids length is the same as limit', () => {
            expect(tester.ids.length).toEqual(limit)
          })
        })
      })

      describe('Multiple Subscribers', () => {
        test('matches sshot', () => {
          expect($tax.subscribers).toMatchSnapshot('subscribers')
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

    })

    afterAll(async () => {
      await db.destroy()
    })
  })
})
