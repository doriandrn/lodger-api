import SubscribableTaxonomy from '~/lib/Taxonomy/Subscribable'
import { init } from './index'

describe('@extends', () => {
  describe('Subscribable Taxonomy', () => {
    let db, store, cols,
      taxes = {}, $tax

    beforeAll(async () => {
      console.error('pppp')
      const i = await init()
      console.error('bbbb')
      db = i.db
      store = i.store
      cols = i.cols

      Object.keys(cols).map(col => {
        taxes[col] = new SubscribableTaxonomy(cols[col], store)
      })
      console.error('tx', taxes)
      $tax = taxes['sosete']
    })

    describe('ctor', () => {
      test('creates ok the tax', () => {
        expect($tax.name).toEqual('sosete')
      })
    })

    afterAll(async () => {
      await db.destroy()
    })
  })

  describe('Searchable Taxonomy', () => {

  })
})
