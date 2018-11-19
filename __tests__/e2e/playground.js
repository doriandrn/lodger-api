/* eslint-disable */
import Vue from 'vue'
import { Lodger } from '../../custom/Lodger'
import { testUser, existingUser } from '../../__mocks__/utilizatori'
import cfgs from '../../cfgs'

const lodger = new Lodger(cfgs)
const { api } = lodger
console.log('store', lodger.store)
let utilizator
describe('pg', () => {
  beforeAll (async () => {
    utilizator = await lodger.Utilizator
    const { delogeaza } = utilizator
    if (typeof delogeaza === 'function') {
      delogeaza()
    }
  })

  test('metodele pt utilizator exista', () => {
    const {utilizator} = lodger
    expect(utilizator).toBeDefined()
  })

  test('Modulele se initializeaza ok', async () => {
    expect(api).toBeDefined()
    // expect(await lodger.Utilizator.autentifica({})).toBeUndefined()
  })

  test('schimba metodele dupa autentificare', async () => {
    const { autentifica } = utilizator
    const { token } = await autentifica({
      metoda: 'email',
      credentiale: testUser
    })
    expect(token).toBeDefined()
    utilizator = await lodger.Utilizator
    expect(utilizator.autentificat).toBeTruthy()
    
    setTimeout(async () => {
      utilizator = await lodger.Utilizator
      console.log('utilizator', utilizator)
      const { profil, autentifica, delogeaza } = utilizator
      expect(autentifica).toBeUndefined()
      expect(delogeaza).toBeDefined()
      expect(profil.nume).toBe(testUser.nume)
    }, 2500);
    // expect(Utilizator.profil.nume).toBe(testUser.nume)
  })
})
/* eslint-enable */
