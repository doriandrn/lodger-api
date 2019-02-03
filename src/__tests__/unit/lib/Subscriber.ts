import Subscriber from 'lib/Subscriber'

describe('Subscriber', () => {
  describe('constructor', () => {

    test('taxonomy is defined', () => {
      const sub = new Subscriber(taxonomy)
      expect(sub.taxonomy).toBeDefined()
    })

  })
})
