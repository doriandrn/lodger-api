// import { strings, numbers, arrays, objects } from '~lib/String'
const S = require('~/lib/String')
const { strings, numbers, arrays, objects } = S

describe('.asRxDBType', () => {
  describe('+', () => {
    describe('strings', () => {
      const testType = 'string'

      test('Anything else but known string types returns string', () => {
        expect('whatever'.asRxDBType).toBe(testType)
        expect('blablaunknown'.asRxDBType).toBe(testType)
        expect('string'.asRxDBType).toBe(testType)
        expect(''.asRxDBType).toBe(testType)
      })

      Object
        .keys(strings)
        .filter(s => typeof strings[s as string] === 'number')
        .map(type => {
          test(type, () => {
            expect(type.asRxDBType).toBe(testType)
          })
        })
    })

    describe('numbers', () => {
      const testType = 'number'

      Object
        .keys(numbers)
        .filter(s => typeof numbers[s as string] === 'number')
        .map(type => {
          test(type, () => {
            expect(type.asRxDBType).toBe(testType)
          })
        })
    })

    describe('arrays', () => {
      const testType = 'array'

      Object
        .keys(arrays)
        .filter(s => typeof arrays[s as string] === 'number')
        .map(type => {
          test(type, () => {
            expect(type.asRxDBType).toBe(testType)
          })
        })
    })

    describe('objects', () => {
      const testType = 'object'

      Object
        .keys(objects)
        .filter(s => typeof objects[s as string] === 'number')
        .map(type => {
          test(type, () => {
            expect(type.asRxDBType).toBe(testType)
          })
        })
    })
  })
})

describe('slug', () => {
  test('slugifica', () => {
    expect('Dorian haleste'.slug).toBe('dorian-haleste')
  })
})

describe('.stripLeading()', () => {
  test('it just removes the prelimiary "$" sign', () => {
    expect('$test'.stripLeading('$')).toBe('test')
    expect('$$test'.stripLeading('$')).toBe('test')
    expect('test 4$'.stripLeading('$')).toBe('test 4$')
    expect('test'.stripLeading('$')).toBe('test')
  })
})

describe('.plural', () => {
  describe('taxonomies', () => {
    test('returns the correct RO plural', () => {
      expect('asociatie'.plural).toEqual('asociatii')
      expect('apartament'.plural).toEqual('apartamente')
    })
  })
})

// DEPRECATED
// describe('.customSplit()', () => {
//   test('splits in { what, mutation }', () => {
//     const { mutation, what } = 'fa/CEVA'.customSplit()
//     expect(mutation).toBe('CEVA')
//     expect(what).toBe('fa')
//   })

//   test('throws if "/" sign is not present', () => {
//     const splt = 'caca'.customSplit()
//     expect(splt).toBe('caca')
//   })
// })
