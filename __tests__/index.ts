import { Lodger, Errors } from '~/index'
import Debug from 'debug'
import { isRxDatabase } from 'rxdb'
import fakeData from '~/lib/helpers/dev/fakeData'
import BroadcastChannel from 'broadcast-channel'

const delay = (value) => new Promise(resolve =>
  setTimeout(() => resolve(), value)
)


Debug.enable('lodger:*')

describe('Lodger', () => {
  beforeAll(async () => {
    await BroadcastChannel.clearNodeFolder()
  })

  describe('.build()', () => {
    let L: Lodger
    beforeAll(async () => {
      L = await Lodger.build()
    })
    describe('positive', () => {
      test('this is "run" in test environment', () => {
        expect(process.env.NODE_ENV).toBe('test')
      })

      test('.db = RxDatabase', async () => {
        expect(isRxDatabase(L.db)).toBeTruthy()
      })

      test('.forms = object containing all forms based on tax', () => {
        expect(L.forms).toBeDefined()
        expect(typeof L.forms).toBe('object')
      })

      test('runs with no options / arguments', async () => {
        const lodger = await Lodger.build()
        expect(lodger).toBeDefined()
        await lodger.destroy()
      })

      test('overwrites allowed build options', async () => {
        const options = {
          dbCon: {
            name: 'lodgerica' + new Date().getTime(),
            adapter: 'memory'
          }
        }
        const lodger = await Lodger.build(options)
        expect(lodger).toBeDefined()
        await lodger.destroy()
      })
    })

    afterAll(async () => {
      await L.destroy()
    })
  })

  describe('.subscribe()', () => {
    let lodger: Lodger
    let debug
    const tax = 'asociatie'
    const taxP = 'asociatii'


    beforeAll(async () => {
      lodger = await Lodger.build()
      debug = Debug('lodger:test.subscribe')
    })

    describe('positive', () => {
      test('it subscribes and gets content/data for a taxonomy', async () => {
        await lodger.subscribe(tax)
        expect(lodger[taxP]()).toBeDefined()
      })

      test('returns the subscriber for unsubscribing', async () => {
        const subscriberName = 'blabla'
        const unsubscribe = await lodger.subscribe(tax, {}, subscriberName)
        const aTaxSub = unsubscribe['asociatii']

        expect(typeof aTaxSub.unsubscribe).toBe('function')
      })

      describe('Multiple Taxonomies behaviour', () => {
        const subName = 'multipleTaxes'
        const multipleTaxes = [`${tax}`, 'apartament', 'bloc']
        let unsubMultipleTaxes
        let forms

        beforeAll(() => {
          forms = lodger.forms
        })

        test('it subscribes multiple taxonomies at once', async () => {
          unsubMultipleTaxes = await lodger.subscribe(multipleTaxes, undefined, subName)
          expect(lodger.asociatii(subName)).toBeDefined()
        })

        test('keys length is equal in both cases', () => {
          expect(Object.keys(unsubMultipleTaxes).length).toEqual(multipleTaxes.length)
        })

        test('unsubscriber is created ok for all taxes', async () => {
          const pluralsMultipleTaxes = multipleTaxes
            .map(tx => forms[tx].plural)

          expect(pluralsMultipleTaxes).toEqual(Object.keys(unsubMultipleTaxes))
        })

        test('unsubscribes all taxonomies and data gets wiped from dataHolder', async () => {
          const pluralsMultipleTaxes = multipleTaxes
            .map(tx => forms[tx].plural)

          Object.keys(unsubMultipleTaxes)
            .forEach(async taxToUnsub => {
              await unsubMultipleTaxes[taxToUnsub].unsubscribe()
              expect(unsubMultipleTaxes[taxToUnsub].isClosed).toBeTruthy()
              expect(lodger[pluralsMultipleTaxes[unsubMultipleTaxes[taxToUnsub]]](subName)).toBeUndefined()
            })
        })
      })

    })

    describe('negative', () => {

    })

    describe('Custom Subscriber behaviour', () => {
      let subscriberName: string

      beforeAll(async () => {
        subscriberName = 'asub'
        await lodger.subscribe('asociatie', {}, subscriberName)
      })

      describe('positive', () => {
        test('it creates a new subscriber from given subscriberName (3rd arg)', async () => {
          const asocs = await lodger.asociatii(subscriberName)
          expect(asocs).toBeDefined()
        })

        test('when a new item is created, dataholder has it', async (done) => {
          const { _id } = await lodger.put('asociatie', fakeData('asociatie'), subscriberName)
          console.error('pus', _id)
          await delay(3000)
          const asocs = lodger.asociatii(subscriberName)
          const asocs2 = lodger.asociatii()
          console.error('ass', asocs, asocs2)
          expect(asocs[_id]).toBeDefined()
          done()
        })
      })
    })

    afterAll(async () => {
      await lodger.destroy()
    })
  })

  describe('.unsubscribe()', () => {
    const subscriberName = 'XXX'
    let taxonomies
    let subscribers
    let lodger

    beforeAll(async () => {
      lodger = await Lodger.build()


    })

    describe('positive', () => {


      test(`it unsubscribes asociatie from ${subscriberName}`, async () => {
        await lodger.unsubscribe('asociatii', subscriberName)
        const asocs = await lodger.asociatii(subscriberName)
        console.error('asocs', asocs)
        expect(asocs).toBeUndefined()
      })
    })

    afterAll(async () => {
      await lodger.destroy()
    })
  })

  describe('Public API', async () => {
    let lodger: Lodger
    let getters: LodgerGetters

    beforeAll(async () => {
      lodger = await Lodger.build()
    })

    let commonId: string | null = null

    describe('.put()', () => {
      const debug = Debug('lodger:tests:put')

      describe('positive (adds a new taxonomy item: asociatie)', () => {
        let asoc
        beforeAll(async () => {
          const name = 'bla'
          const moneda = 'ron'
          try {
            asoc = await lodger.put('asociatie', {
              name,
              moneda
            })
          } catch (e) {
            debug('PUT FAILED', e)
          }
        })
        test('item was added ok', () => {
          expect(asoc).toBeDefined()
        })

        test('item was assigned an id', () => {
          const { _id } = asoc
          expect(_id).toBeDefined()
        })

        test(`getter 'asociatie/last' is the item's id`, () => {
          const { _id } = asoc
          const lastAddedId = lodger.getters['asociatie/last']
          expect(lastAddedId).toBe(_id)
        })

        test('item gets selected', () => {
          const { _id } = asoc
          expect(lodger.getters['asociatie/selected']).toBe(_id)
        })
      })

      describe('negative', () => {
        test('throws if no data is supplied', async () => {
          try {
            await lodger.put('asociatie', {})
          } catch (e) {
            expect(e).toBeDefined()
            expect(String(e).indexOf('data')).toBeTruthy()
          }
        })

        test('throws if wrong/unknown taxonomy', async () => {
          try {
            await lodger.put('masina', { name: 'Honda' })
          } catch (e) {
            expect(e).toBeDefined()
          }
        })

        test('throws if data doesnt match schema', async () => {
          try {
            await lodger.put('asociatie', { lol: 'fool' } )
          } catch (e) {
            expect(e).toBeDefined()
          }
        })
      })

      // test('adds a new bloc at prev created assoc', async () => {

      // })
    })

    describe('.trash()', () => {
      test('deletes the prev added assoc', () => {
        expect(async () => { await lodger.trash('asociatie', commonId) }).not.toThrow()
        // expect(getters['asociatie/ids']).not.toContain(commonId)
      })
    })

    describe('.select()', () => {
      let testerId
      const tax = 'asociatie'
      const gn = `${tax}/selected`
      let g

      /**
       * Adaugam 5 asociatii sa avem 5 id-uri cu care sa ne jucam :)
       */
      beforeAll(async () => {
        const ns = 5

        for (let i of Array(ns).keys()) {
          const { _id } = await lodger.put(tax, fakeData(tax))
          if (i === 3) testerId = _id
        }

        g = lodger.getters
      })

      describe('positive', () => {
        test('selects ok an item by it\'s id', async () => {
          await lodger.select(tax, testerId)
          expect(g[gn]).toEqual(testerId)
        })

        test(`does NOT deselect the item if ID does not exist or wrong supplied`, async () => {

          const curSelectedId = g[gn]
          await lodger.select(tax, 'bla')
          expect(g[gn]).toBe(curSelectedId)

          await lodger.select(tax, '')
          expect(g[gn]).toBe(curSelectedId)
        })

        test('deselects an item if NULL is given as 2nd arg', async () => {
          await lodger.select(tax, null)
          expect(g[gn]).toBe(null)
        })

        test('accepts an OBJECT (with id) as 2nd arg', async () => {
          await lodger.select(tax, {
            id: testerId
          })
          expect(g[gn]).toBe(testerId)
        })

        test('updates dependend taxonomies when smh gets selected', () => {

        })
      })

      describe('negative', () => {
        test('throws if taxonomy does not exist', () => {
          try {
            lodger.select('masina', 'abc123')
          } catch (e) {
            expect(e).toBeDefined()
          }
        })
      })
    })

    describe('.[taxonomy]() getters', () => {
      describe ('positive', () => {
        test('all taxes are defined & accesable', () => {
          // TODO: scrie un for, nu fi lazy
          expect(lodger.apartamente).toBeDefined()
          expect(lodger.asociatii).toBeDefined()
        })

        test('returns the items of main subscriber if called with no args', () => {
          expect(lodger.apartamente()).toReturn()
        })

        test('returns the items of another sub', () => {
          expect(lodger.apartamente('listeDePlata')).toReturn()
        })
      })

      describe('negative', () => {
        test('throws if subscriber supplied doesnt exist', () => {
          try {
            const aps = lodger.apartamente('subInexistent')
          } catch (e) {
            expect(e).toBeDefined()
          }
        })
      })
    })

    describe('.setPreference()', () => {
      describe('positive', () => {
        test('sets a new preferences value in store', async () => {
          await lodger.setPreference('client.interface.fontSize', 3)
          expect(lodger.preferences.client.fontSize).toBe(3)
        })

        test('sets a new preferences value in DB', async () => {
          await lodger.setPreference('user.language', 'ro')
          expect(lodger.preferences.user.language).toBe('ro')
        })
      })

      describe('negative', () => {
        test('throws if starting taxonomy is not known', async () => {
          // expect(async () => { await lodger.setPreference('caca.maca', null) }).toThrow()
          try {
            await lodger.setPreference('caca.maca', null)
          } catch (e) {
            expect(e).toBeDefined()
            expect(String(e).indexOf(Errors.invalidPreferenceIndex)).toBeTruthy()
          }
        })
        test('throws if invalid properties specified', async () => {
          try {
            await lodger.setPreference('client.', null)
          } catch (e) {
            expect(String(e).indexOf(Errors.invalidPropertySupplied)).toBeTruthy()
          }


          try {
            await lodger.setPreference('client.xxx', 0)

          } catch (e) {
            expect(String(e).indexOf(Errors.invalidPropertySupplied)).toBeTruthy()
          }
        })
      })
    })

    // describe('._formData(formName)', () => {
    //   describe('positive', () => {
    //     test('returns the requested form by name', () => {
    //       const name = 'asociatie'
    //       expect(lodger._formData(name)).toBe(lodger.forms.filter(form => form.name === name)[0].data)
    //     })
    //   })

    //   describe('negative', () => {
    //     test('throws if argument is diff than string', () => {
    //       try {
    //         lodger._formData({ name: 'baba' })
    //       } catch (e) {
    //         expect(e).toBeDefined()
    //       }

    //       try {
    //         lodger._formData(1)
    //       } catch (e) {
    //         expect(e).toBeDefined()
    //       }

    //       try {
    //         lodger._formData(['asociatie'])
    //       } catch (e) {
    //         expect(e).toBeDefined()
    //       }
    //     })

    //     test('throws if no form found with the speciffied name', () => {
    //       try {
    //         lodger._formData('invalid')
    //       } catch (e) {
    //         expect(e).toBeDefined()
    //       }
    //     })
    //   })
    // })

    afterAll(async () => {
      if (!lodger) return
      await lodger.destroy()
    })
  })
})
