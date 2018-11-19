import LodgerStore from 'lodger/lib/Store'
import { sharedStoreMethods } from 'lodger/lib/helpers/store'

const taxonomies = ['masina']

const testModule = {
  test: {
    namespaced: true,
    state: {
      test: 'ya'
    },
    getters: {
      test: (state) => state.test
    }
  }
}

describe('LodgerStore', () => {
  describe('static .use() -> module', () => {
    describe('positive', () => {
      test('uses the test module', () => {
        LodgerStore.use(testModule)
        const store = new LodgerStore()
        const tGetter = store.getters['test/test']
        expect(tGetter).toBeDefined()
      })
    })
    
    describe('negative', () => {
      test('fails if invalid module supplied', () => {
        try {
          LodgerStore.use([])
        } catch (e) {
          expect(e).toBeDefined()
        }
      })
    })
  })

  describe('new ()', () => {
    let store: LodgerStore
    let storeGettersKeys: []

    beforeAll(() => {
      store = new LodgerStore(taxonomies)
      storeGettersKeys = Object.keys(store.getters)
    })

    describe('positive', () => {
      
      test('no arguments -> empty store', () => {
        const s = new LodgerStore()
        expect(s).toBeDefined()
      })

      test.each(taxonomies)('contains %s module (as taxonomy)', (s) => {
        Object.keys(sharedStoreMethods).forEach(methodOrGetter => {
          expect(storeGettersKeys).toContain(`${s}/${methodOrGetter}`)
        })
      })
    })
  })
})
