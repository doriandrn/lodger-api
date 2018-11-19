/* eslint-disable */
import { Lodger } from '../../custom/Lodger'
import cfgs from '../../cfgs'
import { testUser, existingUser } from '../../__mocks__/utilizatori'
import prompt from 'prompt-async'

const lodger = new Lodger(cfgs)
let utilizator

const delogeazaUtilizator = async () => {
  utilizator = await lodger.Utilizator
  const { delogeaza } = utilizator
  if (typeof delogeaza === 'function') {
    delogeaza()
  }
}

describe('Autentificare', () => {
  beforeAll(delogeazaUtilizator)

  test('Un cont cu acelasi email nu exista', async () => {
    const { inscrie } = await lodger.Utilizator
    await inscrie(existingUser).catch(err => {
      expect(err).toBeDefined()
    })
  })

  test('Cu email si parola', async () => {
    const { autentifica } = await lodger.Utilizator
    const { token } = await autentifica({
      metoda: 'email',
      credentiale: testUser
    })
    expect(token).toBeDefined()
    utilizator = await lodger.Utilizator
    expect(utilizator.autentificat).toBeTruthy()
  })

  test('[Unit] Nu poate fi apelat cu alta metoda decat cele cunoscute', async () => {
    const { autentifica } = await lodger.Utilizator
    try {
      await autentifica({
        metoda: '',
        credentiale: {}
      })
      fail()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })

  test('Dezactiveaza cont', async () => {
    utilizator = await lodger.Utilizator
    console.log('uti', utilizator)
    const { updateaza } = utilizator
    const { activ } = await updateaza({ activ: false })
    expect(activ).toBeFalsy()
  })

  test('Activeaza cont', async () => {
    const { updateaza } = await lodger.Utilizator
    const { activ } = await updateaza({ activ: true })
    expect(activ).toBeTruthy()
  })

  test('Schimba numele', async () => {
    const { updateaza } = await lodger.Utilizator
    const { nume } = await updateaza({ nume: 'Ion Doe' })
    expect(nume).toBe('Ion Doe')
  })

  test('Elimina - (Sterge cont definitiv)', async () => {
    const { _elimina } = await lodger.Utilizator
    await _elimina()
    const { profil } = await lodger.Utilizator
    expect(profil).toMatchObject({})
  })
})

describe('Inscriere', () => {
  // Curatenie! -> delogeaza orice utilizator activ
  beforeAll(delogeazaUtilizator)

  test('Inscrie ok', async () => {
    expect(testUser.id).toBeUndefined()
    const { inscrie } = await lodger.Utilizator
    const newUser = await inscrie(testUser)
    expect(newUser).toHaveProperty('id')
  })

  // Autentificam noul cont inscris iar la preluarea profilului, 'confirmat' tre' sa fie fals.
  test('Contul nou inscris asteapta confirmare', async () => {
    const { autentifica, autentificat } = await lodger.Utilizator
    expect(autentifica).toBeDefined()
    expect(autentificat).toBeFalsy()
    await autentifica({ metoda: 'email', credentiale: testUser })
  })

  test('Nu se poate confirma cu updateaza', async () => {
    const { updateaza } = await lodger.Utilizator
    expect(updateaza).toBeUndefined()
  })

  // Trebuie gasita o metoda ca token ul sa fie testat automat direct din email
  // test('Confirma email', async () => {
  //   prompt.start()
  //   const token = await prompt.get('token')
  //   expect(typeof token).toBe('string')
  //   confirmat = await confirmaEmail({token})
  //   expect(confirmat).toEqual(user.id)
  // })
})
/* eslint-enable */
