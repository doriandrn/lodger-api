import { Lodger, Errors } from '~/index'
import Debug from 'debug'
import { isRxDatabase } from 'rxdb'
import fakeData from '~/lib/helpers/dev/fakeData'
import BroadcastChannel from 'broadcast-channel'

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
    beforeAll(async () => {
      lodger = await Lodger.build()
    })

    describe('positive', () => {
      test('it subscribes and gets default content for a taxonomy', async () => {
        await lodger.subscribe('asociatie')
        expect(lodger.asociatii()).toBeDefined()
      })

      test('it creates a new subscriber from given subscriberName (3rd arg)', async () => {
        await lodger.subscribe('asociatie', {}, 'aSub')
        const asocs = await lodger.asociatii('aSub')
        expect(asocs.toBeDefined())
      })

    })

    describe('negative', () => {

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
      /**
       * Adaugam 5 asociatii sa avem 5 id-uri cu care sa ne jucam :)
       */
      beforeAll(async () => {
        const ns = 5

        for (let i of Array(ns).keys()) {
          const { _id } = await lodger.put(tax, fakeData(tax))
          if (i === 3) testerId = _id
        }
      })
      describe('positive', () => {
        test('selects ok an item by it\'s id', () => {
          lodger.select(tax, testerId)
          expect(lodger.getters[`${tax}/selected`]).toEqual(testerId)
        })
      })

      describe('negative', () => {

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
