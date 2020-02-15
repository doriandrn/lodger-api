require('~/lib/String')

describe('.toRxDBType()', () => {
  describe('positive', () => {
    test('returns "string" (default type) for unknown inputs', () => {
      expect('whatever'.toRxDBType()).toBe('string')
      expect('string'.toRxDBType()).toBe('string')
    })

    test('returns "number"', () => {
      expect('dateTime'.toRxDBType()).toBe('number')
      expect('date'.toRxDBType()).toBe('number')
      expect('number'.toRxDBType()).toBe('number')
    })

    test('returns "array"', () => {
      expect('furnizori'.toRxDBType()).toBe('array')
      expect('servicii'.toRxDBType()).toBe('array')
    })

    test('returns object', () => {
      expect('object'.toRxDBType()).toBe('object')
      expect('bani'.toRxDBType()).toBe('object')
    })
  })

  describe('negative', () => {
    //
  })

})

describe('slugify()', () => {
  test('slugifica', () => {
    expect('Dorian haleste'.slugify()).toBe('dorian-haleste')
  })
})

describe('.stripLeading$()', () => {
  test('it just removes the prelimiary "$" sign', () => {
    expect('$test'.stripLeading$()).toBe('test')
    expect('$$test'.stripLeading$()).toBe('test')
    expect('test 4$'.stripLeading$()).toBe('test 4$')
    expect('test'.stripLeading$()).toBe('test')
  })
})

describe('.cusomSplit()', () => {
  test('splits in { what, mutation }', () => {
    const { mutation, what } = 'fa/CEVA'.cusomSplit()
    expect(mutation).toBe('CEVA')
    expect(what).toBe('fa')
  })

  test('throws if "/" sign is not present', () => {
    const splt = 'caca'.cusomSplit()
    expect(splt).toBe('caca')
  })
})
