import faker from 'faker'
import currencies from '../../maintainable/currencies'

const holder = {}

Object.defineProperties(holder, {
  $: {
    get () { return `${faker.random.arrayElement(currencies)} ${faker.finance.amount(100, 10000, 4)}` }
  },
  string: {
    get () { return faker.lorem.words(3) }
  },
  number: {
    get () { return Number(faker.random.number({ min: 20, max: 300 })) }
  },
  fullName: {
    get () { return `${faker.name.firstName()} ${faker.name.lastName()}` }
  },
  dateTime: {
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
