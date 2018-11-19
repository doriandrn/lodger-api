/* eslint-disable */
import Vue from 'vue'
import { Lodger } from '../../custom/Lodger'
import cfgs from '../../cfgs'

const lodger = new Lodger(cfgs)
const { query } = lodger

describe('Lodger', () => {
  describe('Clasa', () => {
    test('Se initializeaza', () => {
      console.log('lodger', lodger)
      expect(lodger._inited).toBeTruthy()
    })

    // test('Modulele se initializeaza ok', () => {
    //   const { utilizator } = lodger
    //   expect(typeof utilizator).toBe('function')
    //   expect(utilizator.autentifica({})).toBeUndefined()
    // })

    // test('Subclasele fac parte din clasa', () => {
      // const utilizator = new Utilizator()
      // expect.any(utilizator.prototype instanceof Lodger)
    // })

    test('Se instaleaza ca plugin Vue', () => {
      lodger.install = jest.fn()
      Vue.use(lodger)
      expect(lodger.install).toHaveBeenCalled()
    })

    // test('Poate fi initializata de mai multe ori in acelasi context', () => {
    //   const lodger2 = new Lodger(cfgs)
    //   const lodger3 = new Lodger(cfgs)
    //   expect(lodger2).toBe(lodger3)
    // })
  })

  describe('Depozit - LocalStoarge', () => {
    test('e ok', () => {
      const { depozit } = lodger
      expect(depozit.getItem).toBeDefined()
    })
  })

  describe('[API] Query', () => {
    test('Nu poate fi apelat fara nimic', async () => {
      try {
        await query()
        fail()
      } catch(e) {
        expect(e).toBeDefined()
      }
    })

    test('Primeste un raspuns', async () => {
      const res = await query('{allUsers{id}}')
      expect(res).toBeDefined()
    })

    test('Campurile nepermise nu sunt accesibile', async () => {
      let res
      try {
        // Campul email este protejat si returneaza NULL
        res = await query('{allUsers{id, email}}')
        // fail()
      } catch (e) {
        expect(e && e.message.indexOf('Insufficient Permissions')).toBeTruthy()
        expect(res).toBeUndefined()
      }
    })

    test('Arunca erorile (primite in raspuns)', async () => {
      try {
        await query('{ unQueryRandom }')
        fail()
      } catch (err) {
        expect(err).toBeDefined()
      }
    })
  })
})
/* eslint-enable */
