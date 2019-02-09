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
        $tax.subscribe()
        subscriber = $tax.subscribers.main
      })

      test('no args - .subscribers has -main-', () => {
        expect($tax.subscribers.main).toBeDefined()
      })

      test('subscribed flag indicates true', () => {
        expect($tax.subscribed).toBeTruthy()
      })


      describe('Observes data', () => {
        let subscriber: Subscriber<any>
        let _id: string

        beforeAll(async () => {
          subscriber = $tax.subscribers.main
          const item = await $tax.put({ name: 'gigi', lungime: 5 })
          _id = item._id
          await delay(300)
        })

        test('.ids contains the newly added item id', () => {
          expect(subscriber.ids).toContain(_id)
        })

        test('.items has the key with ID', () => {
          expect(subscriber.items[_id]).toBeDefined()
        })
      })

      describe('Criteria', () => {
        let testerName = 'criteriaTester', tester: Subscriber<any>

        beforeAll(() => {
          // create a new sub to play with
          $tax.subscribe(testerName)
          tester = $tax.subscribers[testerName]
        })

        test('has subscribed with default criteria', () => {
          expect(tester.criteriu).toEqual($tax.defaultCriteria)
        })

        describe('Change reactions', () => {

          // add a couple of items to play with
          beforeAll(async () => {
            for (let i = 0; i < 10; i ++ ) {
              await $tax.put({ name: 'xx', lungime: 3 })
            }
            await delay(1000)
          })

          describe('.limit', () => {
            let limit = 3

            beforeAll(async () => {
              tester.criteriu.limit = limit
              await delay(200)
            })

            test('getter is equal', () => {
              expect(tester.criteriu.limit).toEqual(limit)
            })

            test('ids length match', () => {
              expect(tester.ids.length).toEqual(limit)
            })

            test('reacts & resubscribes on immediate re-change', () => {
              limit = 2
              tester.criteriu.limit = limit
              expect(tester.criteriu.limit).toBe(limit)
            })
          })

          describe('.index', () => {
            let index = 1
            let idsCurrentIndex

            beforeAll(async () => {
              idsCurrentIndex = tester.ids
              tester.criteriu.index = index
              await delay(300)
            })
            test('indexes length has increased', () => {
              expect(idsCurrentIndex.length).toBeGreaterThan(tester.ids.length )
            })
          })

          describe('.sort', () => {
            let sort = { name: 1 }
            const firstAZname = 'aaa'
            const firstZAname = 'zzz'

            describe('AZ', () => {
              beforeAll(async () => {
                await $tax.put({ name: firstAZname, lungime: 9 })
                await $tax.put({ name: firstZAname, lungime: 9 })
                tester.criteriu.sort = sort
                await delay(300)
              })

              test('updates accordingly', () => {
                expect(tester.criteriu.sort).toEqual(sort)
              })

              test('sorts ok', () => {
                // console.error(Object.keys(tester.items))
                expect(tester.items[tester.ids[0]].name).toEqual(firstAZname)
              })
            })

            describe('reverse', () => {
              beforeAll(async () => {
                tester.criteriu.sort = { name: -1 }
                await delay(500)
              })

              test('still ok, ZA', async () => {
                const { items, ids } = tester
                expect(items[ids[0]].name).toEqual(firstZAname)
              })
            })
          })
        })
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
