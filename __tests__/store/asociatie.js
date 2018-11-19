import * as asociatie from '../../store/asociatie'
// import { createLocalVue } from 'vue-test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Debug from 'debug'

// import lodger from '../../plugins/lodger'

// const localVue = createLocalVue()
// Vue.use(lodger)
Vue.use(Vuex)

const debug = Debug('lodger:teststore')

const asUser = 'cj8ik346ma3hv01101oocx3sz'
const mock = {
  administratorId: asUser,
  denumire: 'Test Asoc',
  id: 'test',
  slug: 'test-asoc'
}

const { actions, getters } = asociatie

describe('Asociatie', () => {
  let store
  let setDataMock

  beforeAll(() => {
    store = new Vuex.Store(asociatie)
  })

  // beforeEach(() => {
    // setDataMock = jest.fn()
    // console.log('setDataMock', setDataMock)
  // })
  
  // suita
  test('CRUD', async () => {
    const { dispatch } = store
    // debug(store)
    await dispatch('adauga', mock)

    const { lista, entitati } = getters
    debug('lista', lista)
    
    // este si in entitati
    expect(entitati.length).toBe(1)
    // lista contine id-ul noii asociatii
    expect(lista.indexOf(mock.id)).toBe(1)
  })
})
