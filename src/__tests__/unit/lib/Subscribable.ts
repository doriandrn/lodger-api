import SubscribableTaxonomy from '~/lib/Taxonomy/Subscribable'

import Subscriber from 'rxcollection-subscriber'
import DB from '~/lib/DB'

import sosete from 'fixtures/taxes/sosete'
import testdbsetup from 'fixtures/db/test'

const testTax = 'sosete'

describe('@extends Taxonomy', () => {
  describe('Subscribable', () => {
    let $tax: SubscribableTaxonomy<any>

    beforeAll(async () => {
      SubscribableTaxonomy.db = await DB.create(testdbsetup)
      $tax = await SubscribableTaxonomy.init(sosete)
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
      await SubscribableTaxonomy.db.destroy()
    })
  })
})
