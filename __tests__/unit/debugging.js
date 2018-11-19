import * as debugging from '../../custom/utils/debugging'

describe('functii de debug lodger', () => {
  test('initDebug', () => {
    const { initDebug } = debugging
    let gol = {}

    const dfn = initDebug.bind(gol, {
      debugActivat: true,
      niveleDebug: ['smth']
    })
 
    const test = new dfn()
    console.log('dFnafter', test, gol)
    expect(test.smth).toBeDefined()
    expect(typeof test.smth).toBe('function')
  })
})
