import Subscriber from '../../../src/lib/Subscriber'

describe('Subscriber', () => {
  describe('constructor', () => {

    test('taxonomy is defined', () => {
      const sub = new Subscriber(taxonomy)
      console.info('SUB', sub)
      expect(sub.taxonomy).toBeDefined()
    })

  })
})
