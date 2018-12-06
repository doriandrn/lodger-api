import LodgerStore, { customOpts } from '~/lib/Store'
import { sharedStoreMethods } from '~/lib/helpers/store'

const taxonomii = ['masina']

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
  describe('custom options generator', () => {
    describe('positive', () => {
      test('works with taxonomii and forms context', () => {
        expect(customOpts({
          taxonomii,
          forms: [{
            plural: 'masini'
          }]
        })).toBeDefined()
      })
    })

    describe('negative', () => {
      test('it throws if invalid invalid context provided', () => {
        try {
          const opts = customOpts({})
          console.error(opts)
        } catch (e) {
          expect(e).toBeDefined()
        }
      })
    })
  })

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
      test('fails if invalid module', () => {
        try {
          LodgerStore.use([])
        } catch (e) {
          expect(e).toBeDefined()
        }

        try {
          LodgerStore.use({})
        } catch (e) {
          expect(e).toBeDefined()
        }

        try {
          LodgerStore.use('modul')
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
      store = new LodgerStore(taxonomii)
      storeGettersKeys = Object.keys(store.getters)
    })

    describe('positive', () => {
      test('no arguments -> empty store', () => {
        const s = new LodgerStore()
        expect(s).toBeDefined()
      })

      test.each(taxonomii)('contains %s module (as taxonomy)', (s) => {
        Object.keys(sharedStoreMethods).forEach(methodOrGetter => {
          expect(storeGettersKeys).toContain(`${s}/${methodOrGetter}`)
        })
      })
    })
  })
})
