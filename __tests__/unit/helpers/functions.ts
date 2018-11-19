import {
  traverse,
  slugify,
  no$,
  spleet,
  getCriteriu,
  getTaxonomyConfig
} from 'lodger/lib/helpers/functions'
import lodgerConfig from '../../../lodger.config'

describe('Functii ajutatoare', () => {
  describe('traverse', () => {
    test('traverseaza', () => {
      const obiect = {
        cheie: {
          cheie: {
            cheie: 'valoare'
          }
        }
      }
      const test: any[] = []
      traverse(obiect, (k, v) => {
        test.push(k)
      })
      expect(test.length).toBe(3)
    })
  })

  describe('slugify', () => {
    test('slugifica', () => {
      expect(slugify('Dorian haleste')).toBe('dorian-haleste')
      expect(slugify(32)).toBe('32')
    })
  })

  // describe('getTaxonomyConfig', () => {
  //   const cheiPrincipale = ['limit', 'index', 'sort', 'find']
  //   test('returneaza default-ul din config - pentru orice taxonomie daca nu e ceruta', () => {
  //     const criteriu = getTaxonomyConfig()
  //     expect(typeof criteriu).toBe('object')
  //     const chei = Object.keys(criteriu)
  //     expect(chei).toEqual(expect.arrayContaining(cheiPrincipale))
  //   })

  //   test('returneaza criteriul cerut pentru taxonomie', () => {
  //     const criteriuDefaultAsociatie = lodgerConfig.taxonomii.$asociatie.criteriu
  //     const criteriu = getTaxonomyConfig('asociatie')
  //     expect(criteriu.limit).toBe(criteriuDefaultAsociatie.limit)
  //   })
  // })

  describe('getTaxonomyConfig', () => {
    const cheiPrincipale = ['limit', 'index', 'sort', 'find']
    test('returneaza default-ul din config - pentru orice taxonomie daca nu e ceruta', () => {
      const { criteriu } = getTaxonomyConfig()
      expect(typeof criteriu).toBe('object')
      const chei = Object.keys(criteriu)
      expect(chei).toEqual(expect.arrayContaining(cheiPrincipale))
    })

    test('returneaza criteriul cerut pentru taxonomie', () => {
      const criteriuDefaultAsociatii = lodgerConfig.taxonomii.asociatii.criteriu
      const { criteriu } = getTaxonomyConfig('asociatii')
      expect(criteriu.limit).toBe(criteriuDefaultAsociatii.limit)
    })
  })

  describe('getCriteriu', () => {

    test('suprascrie valorile cerute in query', () => {
      const limit = 77
      const sort = { la: 'lala' }
      const criteriu = getCriteriu('asociatie', {
        limit,
        sort
      })
      expect(criteriu.limit).toBe(limit)
      expect(criteriu.sort).toBe(sort)
    })

    test('arunca daca e cerut cu string sau altceva', () => {
      expect(() => { getCriteriu({}) }).toThrow('taxonomie incorecta')
      expect(() => { getCriteriu(23) }).toThrow('taxonomie incorecta')

    })

    test('returneaza criteriu default pt o taxonomie cunoscuta', () => {
      const { limit, index, sort, find } = getCriteriu('asociatii')
      expect(limit).toBe(lodgerConfig.taxonomii.asociatii.criteriu.limit)
    })
  })

  describe('.no$', () => {
    test('it just removes the prelimiary "$" sign', () => {
      expect(no$('$test')).toBe('test')
      expect(no$('$$test')).toBe('test')
      expect(no$('test 4$')).toBe('test 4$')
      expect(no$('test')).toBe('test')
      expect(no$(123)).toBe(123)
      expect(no$(null)).toBe(null)
    })
  })

  describe('spleet', () => {
    test('imparte stringu in 2', () => {
      const { mutation, what } = spleet('fa/CEVA')
      expect(mutation).toBe('CEVA')
      expect(what).toBe('fa')
    })
    test('nu merge cu stringuri incorecte', () => {
      const splt = spleet('caca')
      expect(splt).toBe('caca')
    })
  })
})
