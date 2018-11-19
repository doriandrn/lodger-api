import { Asociatie } from '../../custom/lib/Asociatie'
import { Utilizator } from '../../custom/lib/Utilizator'
import { testUser } from '../../__mocks__/utilizatori'
import { testAsociatie } from '../../__mocks__/asociatii'

const utilizator = new Utilizator()
const { autentifica } = utilizator

describe('CRUD', () => {
  let asociatie

  beforeAll(async () => {
    await autentifica({
      metoda: 'email',
      credentiale: testUser
    })
    asociatie = new Asociatie()
  })

  test('Adauga', async () => {
    const { adauga } = asociatie
    if (!adauga) fail()
    const { id } = await adauga(testAsociatie)
    expect(id).toBeDefined()
  })
})
