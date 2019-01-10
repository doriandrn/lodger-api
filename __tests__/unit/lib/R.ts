import R from '../../../src/lib/R'

describe('Renderless component', () => {
  describe('new', () => {
    test('inits ok', () => {
      const r = new R()
      expect(r.documents).toBeDefined()
    })

    test('passes the tax prop', () => {
      const taxonomy = {
        config: { criteriu: { limit: 5 } }
      }
      const r = new R({ propsData: { taxonomy } })
      expect(r.taxonomy).toEqual(taxonomy)
    })

    test('injects smh', () => {
      const xxx = 'lol'
      const r = new R({ provide: { xxx } })
      console.info('R', r)
      expect(r.xxx).toEqual(xxx)
    })
  })

  describe('teardown', () => {

  })
})
