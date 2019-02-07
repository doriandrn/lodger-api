import SubscribableTaxonomy from '~/lib/Taxonomy/Subscribable'

import { RxDatabase, RxCollection } from 'rxdb'
import { Form } from '~/lib/Form'
import Subscriber from '~/lib/Subscriber'
import { createFromCollections } from '~/lib/DB'

import collections from 'fixtures/taxes/collections'
import testdbsetup from 'fixtures/db/test'

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
      // test('is read from config', () => {
      //   expect($tax.defaultCriteria)
      // })
    })

    describe('.subscribe()', () => {
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
    })

    afterAll(async () => {
      await db.destroy()
    })
  })

  describe('Searchable Taxonomy', () => {

  })
})
