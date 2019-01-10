import Ztore from '../../../src/lib/Ztore'

// fixture
const state = {
  locale: 'ro',

  asociatie: {
    subscriberA: {
      documents: [],
      selected: '',
      active: ''
    },
    subscriberB: {
      selected: '',
      active: ''
    }
  }
}

describe('new', () => {
  test('it creates a store from given state', () => {
    const store = new Ztore(state)
  })
})
