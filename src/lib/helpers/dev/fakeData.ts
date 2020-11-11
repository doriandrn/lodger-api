import faker from 'faker'
import currencies from '@/src/lib/static/data/currencies/ids.json'

const holder = {}

Object.defineProperties(holder, {
  $: {
    get () { return { moneda: `${faker.random.arrayElement(currencies)}`, value: `${faker.finance.amount(100, 10000, 4)}` } }
  },
  id: {
    get () { return '...' }
  },
  string: {
    get () { return faker.lorem.words(3) }
  },
  number: {
    get () {
      return Number(faker.random.number({ min: 0, max: 300 }))
    }
  },
  fullName: {
    get: () => `${ faker.name.firstName() } ${ faker.name.lastName() }`
  },
  dateTime$: {
    get () { return Date.now() + faker.random.number({ min: 9000000, max: 100000000 }) }
  },
  buildingName: {
    get () { return faker.random.alphaNumeric(2) }
  },
  serviceName: {
    get () { return faker.hacker.adjective() }
  }
})

export default holder
