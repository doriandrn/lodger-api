// import { strings, numbers, arrays, objects } from '~lib/String'
const S = require('~/lib/String')
const { strings, numbers, arrays, objects } = S

describe('.toRxDBType()', () => {
  describe('+', () => {
    describe('strings', () => {
      const testType = 'string'

      test('Anything else but known string types returns string', () => {
        expect('whatever'.toRxDBType()).toBe(testType)
        expect('blablaunknown'.toRxDBType()).toBe(testType)
        expect('string'.toRxDBType()).toBe(testType)
        expect(''.toRxDBType()).toBe(testType)
      })

      Object
        .keys(strings)
        .filter(s => typeof strings[s as string] === 'number')
        .map(type => {
          test(type, () => {
            expect(type.toRxDBType()).toBe(testType)
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
            expect(type.toRxDBType()).toBe(testType)
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
            expect(type.toRxDBType()).toBe(testType)
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
            expect(type.toRxDBType()).toBe(testType)
          })
        })
    })

  })

})

describe('slugify()', () => {
  test('slugifica', () => {
    expect('Dorian haleste'.slugify()).toBe('dorian-haleste')
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
