import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import {
  createEmptyStoreModule,
  setupSharedMethods,
  setupFromFile
} from 'lodger/lib/helpers/store'

const taxonomies = ['car', 'plane']

describe('helpers for store', () => {
  describe('.createEmptyStoreModule', () => {
    describe('positive', () => {
    const _module = createEmptyStoreModule()
      test('it returns an empty Vuex-ready module', () => {
        expect(_module.state).toBeDefined()
        expect(_module.getters).toEqual({})
        expect(_module.actions).toEqual({})
        expect(_module.mutations).toEqual({})
      })

      test('returned object works as a vuex module', () => {
        const modules = { _module }
        try {
          const store = new Vuex.Store({ modules })
          expect(store).toBeDefined()
        } catch (e) {
          expect(e).toBeUndefined()
        }
      })
    })
  })

  describe('.setupFromFile()', () => {
    describe('positive', () => {

    })
  })

  describe('.setupSharedMethods()', () => {
    describe('positive', () => {
      // ONE METHOD AND ITS ACTION
      const selected = 'select'

      const Xmodule = setupSharedMethods({
        selected
      })

      const { state, actions, mutations, namespaced, getters } = Xmodule
      test('it adds the named method to state', () => {
        expect(Object.keys(state)).toContain('selected')
      })

      test('initial state is undefiend', () => {
        expect(state.selected).toBeUndefined()

        // make sure key exists but the value is undefined
        expect(state.selected).toEqual(undefined)
      })

      test('key is present in getters', () => {
        expect(getters.selected).toBeDefined()
      })

      test('actions has the action', () => {
        expect(actions.select).toBeDefined()
      })
      
      test('mutations has the action', () => {
        expect(mutations.select).toBeDefined()
      })

      test('returns a valid Vuex module if no module supplied', () => {
        const modules = { Xmodule }

        try {
          const store = new Vuex.Store({
            modules
          })
          expect(store).toBeDefined()
        } catch (e) {
          expect(e).toBeUndefined()
        }
      })

      
    })

    describe('negative', () => {
      test('cannot be called with an empty name', () => {
        const selected = ''
        try {
          const modul = setupSharedMethods({
            selected
          })
          expect(modul).toBeUndefined()
        } catch (e) {
          expect(e).toBeDefined()
        }
      })

      test('throws if sharedMethods argument is not an object of type { string: string }', () => {
        expect(() => { setupSharedMethods( [] ) }).toThrow()
      })
    })
  })
})