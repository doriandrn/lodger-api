import { Taxonomii } from "lodger"
import faker from 'faker'

export default function fakeData (taxonomy: Taxonomii) {
  const name = faker.company.companyName()
  const monede = ['ron', 'usd', 'eur']
  const moneda = faker.random.arrayElement(monede)

  switch (taxonomy) {
    case 'asociatie':
      return {
        name,
        moneda,
        balanta: Number(faker.finance.amount(100, 10000, 4))
      }

    case 'bloc':
      return {
        name: faker.random.alphaNumeric(2)
      }

    case 'apartament':
      return {
        nr: 1,
        proprietar: `${faker.name.firstName()} ${faker.name.lastName()}`,
        etaj: 0,
        scara: 1,
        balanta: faker.random.number({ min: -10000, max: 100 }),
        suprafata: faker.random.number({ min: 20, max: 300 }),
        locatari: faker.random.number({ min: 0, max: 9 })
      }

    case 'incasare':
      return {
        moneda,
        suma: Number(faker.finance.amount(100, 10000, 4)),
        nrChitanta: 1
      }

    case 'factura':
      return {
        nrFactura: 1,
        suma: faker.random.number({ min: -100000, max: -100 }),
        moneda,
        dataScadenta: Date.now() + faker.random.number({ min: 9000000, max: 100000000 })
      }

    case 'furnizor':
      return {
        name: faker.company.companyName(),
        servicii: []
        // servicii: faker.random.arrayElement(this.$store.getters[''])
      }

    case 'serviciu':
      return {
        denumire: faker.hacker.adjective()
      }

    case 'cheltuiala':
      return {
        moneda,
        // suma: Number(faker.finance.amount(1000, 10000, 6))
        suma: faker.random.number({ min: -100000, max: -100 }),

      }

    case 'utilizator':
      return {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        rol: 'administrator'
      }
  }
}
