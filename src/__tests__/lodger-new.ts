import { Lodger, BuildOptions } from '~/index'
import Debug from 'debug'
import BroadcastChannel from 'broadcast-channel'
// import { predefinite } from '~/lib/.schemas/Serviciu'

Debug.enable('lodger:*')

describe('Lodger', () => {
  beforeAll(async () => {
    await BroadcastChannel.clearNodeFolder()
  })

  describe('.build()', () => {
    let L: Lodger
    beforeAll(async () => { L = await Lodger.build() })

    describe('positive', () => {
      test('matches snapshot', () => {
        expect(L).toMatchSnapshot('lodger-new')
      })

      test('detects it IS IN "TEST" environment', () => {
        expect(process.env.NODE_ENV).toBe('test')
      })

      test('.db property is unaccessibile', () => {
        expect(L.db).toBeUndefined()
      })

      describe('taxonomies\' relationship', () => {
        // test('all taxes have the "children" key with a value', () => {
        //   expect(L.taxonomies
        //     .map(tax => L[tax])
        //     .filter(tax => {
        //       console.log(tax.form.schema.name.toUpperCase(), '\n parents:', tax.parents, '\n children:', tax.children)
        //       return tax.children })
        //     .length
        //   ).toEqual(L.taxonomies.length)
        // })
      })


      // test('.forms = object containing all forms based on tax', () => {
      //   expect(L.forms).toBeDefined()
      //   expect(typeof L.forms).toBe('object')
      // })a

      test('runs with no options / arguments', async () => {
        const lodger = await Lodger.build()
        expect(lodger).toBeDefined()
        await lodger.destroy()
      })

      test('overwrites allowed build options', async () => {
        const options: BuildOptions = {
          db: {
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

  // describe('.subscribe()', () => {
  //   let lodger: Lodger
  //   let debug
  //   const tax = 'asociatie'
  //   const taxP = 'asociatii'

  //   beforeAll(async () => {
  //     lodger = await Lodger.build()
  //     debug = Debug('lodger:test.subscribe')
  //   })

  //   describe('positive', () => {
  //     test('it subscribes and gets content/data for a taxonomy', async () => {
  //       await lodger.subscribe(tax)
  //       expect(lodger[taxP]()).toBeDefined()
  //     })


  //     test('returns the subscriber for unsubscribing', async () => {
  //       const subscriberName = 'blabla'
  //       const unsubscribe = await lodger.subscribe(tax, {}, subscriberName)
  //       const aTaxSub = unsubscribe['asociatii']

  //       expect(typeof aTaxSub.unsubscribe).toBe('function')
  //     })

  //     test('first init hook gets called only once', async () => {
  //       const taxToTest = 'utilizator'
  //       const pl = 'utilizatori'

  //       await lodger.subscribe(taxToTest)
  //       await delay(300)
  //       await lodger.subscribe(taxToTest, null, 'xx')
  //       expect(lodger.subscribedTaxes).toContain(taxToTest)
  //       console.error(lodger.subscribedTaxes)
  //     })
  //   })

  //   describe('negative', () => {

  //   })

  //   describe('First time subscribe behaviour', () => {
  //     describe('Predefined DB items', () => {
  //       describe('users', () => {
  //         describe('positive', () => {
  //           let adminId
  //           test('inserts admin on first sub', async () => {
  //             await lodger.subscribe('utilizator')
  //             await delay(300)
  //             const utilizatori = lodger.utilizatori()
  //             adminId = Object.keys(utilizatori)[0]
  //             expect(adminId).toBeDefined()
  //             expect(Object.keys(utilizatori)[1]).toBeUndefined()
  //           })

  //           test('active utilizator/administrator = above inserted user', () => {
  //             // console.error('wtf', lodger.getters['utilizator/activ'])
  //             expect(lodger.getters['utilizator/activ']).toEqual(adminId)
  //           })
  //         })
  //       })

  //       describe('services', () => {
  //         describe('positive', () => {
  //           test('predefineds get inserted on first subscribe', async () => {
  //             await lodger.subscribe('serviciu')
  //             await delay(500)
  //             const servicii = lodger.servicii()
  //             expect(servicii).toBeDefined()
  //             // expect(Object.keys(servicii).length).toEqual(predefinite.length)
  //           })
  //         })

  //         describe('negative', () => {
  //           test('predefineds dont get inserted on second subscribe', async () => {
  //             await lodger.subscribe('serviciu')
  //             await delay(500)
  //             const servicii = lodger.servicii()
  //             expect(servicii).toBeDefined()
  //             // expect(Object.keys(servicii).length).toEqual(predefinite.length)
  //           })

  //           test('predefineds dont get inserted on another subscriber subscribe()', async () => {
  //             await lodger.subscribe('serviciu', null, 'coca')
  //             await delay(500)
  //             const servicii = lodger.servicii('coca')
  //             expect(servicii).toBeDefined()
  //             // expect(Object.keys(servicii).length).toEqual(predefinite.length)
  //           })
  //         })
  //       })
  //     })
  //   })

  //   describe('Criteria', () => {
  //     const subName = 'criteriaTest'
  //     const tax = 'asociatie'
  //     const plural = 'asociatii'
  //     const limit = 2

  //     beforeAll(async () => {
  //       for (let i of Array(limit*3).keys()) {
  //         const { _id } = await lodger.put(tax, fakeData(tax))
  //         console.error('i', _id)
  //         await delay(10)
  //       }
  //       await delay(1500)
  //     })

  //     describe('positive', () => {
  //       test('limits the items', async () => {
  //         const criteriu = { limit }
  //         const sub = await lodger.subscribe(tax, criteriu, subName)
  //         await delay(200)
  //         const items = lodger[plural](subName)

  //         expect(Object.keys(items).length).toEqual(limit)
  //         await sub[plural].unsubscribe()
  //       })

  //       test('loads more items with given index', async () => {
  //         const criteriu = { limit, index: limit*2 }
  //         const sub = await lodger.subscribe(tax, criteriu, subName)
  //         await delay(200)
  //         const items = lodger[plural](subName)

  //         expect(Object.keys(items).length).toEqual(limit*3)
  //         await sub[plural].unsubscribe()
  //       })

  //     })

  //     describe('Sort', () => {
  //       describe('positive', () => {
  //         test('name - AZ (+limit)', async () => {
  //           const limit = 5
  //           const sort = { name: 1 }
  //           const criteriu = { limit, sort }
  //           const sub = await lodger.subscribe(tax, criteriu, subName)
  //           await delay(200)
  //           const items = lodger[plural](subName)

  //           // expect(Object.keys(items).length).toEqual(limit*3)
  //           expect(Object.values(items).map(item => item.name))
  //             .toEqual(expect.arrayContaining(Object.values(items).map(i => i.name).sort()))
  //           await sub[plural].unsubscribe()
  //         })
  //       })
  //     })
  //   })

  //   describe('Multiple Taxonomies behaviour', () => {
  //     const subName = 'multipleTaxes'
  //     const multipleTaxes = [`${tax}`, 'apartament', 'bloc']
  //     let unsubMultipleTaxes
  //     let forms

  //     beforeAll(() => {
  //       forms = lodger.forms
  //     })

  //     test('it subscribes multiple taxonomies at once', async () => {
  //       unsubMultipleTaxes = await lodger.subscribe(multipleTaxes, undefined, subName)
  //       expect(lodger.asociatii(subName)).toBeDefined()
  //     })

  //     test('keys length is equal in both cases', () => {
  //       expect(Object.keys(unsubMultipleTaxes).length).toEqual(multipleTaxes.length)
  //     })

  //     test('unsubscriber is created ok for all taxes', async () => {
  //       const pluralsMultipleTaxes = multipleTaxes
  //         .map(tx => forms[tx].plural)

  //       expect(pluralsMultipleTaxes).toEqual(Object.keys(unsubMultipleTaxes))
  //     })

  //     test('unsubscribes all taxonomies and data gets wiped from dataHolder', async (done) => {
  //       const pluralsMultipleTaxes = multipleTaxes
  //         .map(tx => forms[tx].plural)

  //       expect.assertions(pluralsMultipleTaxes.length)

  //       await Promise.all(Object.keys(unsubMultipleTaxes)
  //         .map(async taxToUnsub => {
  //           await unsubMultipleTaxes[taxToUnsub].unsubscribe()
  //           expect(unsubMultipleTaxes[taxToUnsub].closed).toBeTruthy()
  //           // expect(lodger[pluralsMultipleTaxes[unsubMultipleTaxes[taxToUnsub]]](subName)).toBeUndefined()
  //         }))

  //       done()
  //     })
  //   })

  //   describe('Custom Subscriber behaviour', () => {
  //     let subscriberName: string

  //     beforeAll(async () => {
  //       subscriberName = 'asub'
  //       await lodger.subscribe('asociatie', {}, subscriberName)
  //     })

  //     describe('positive', () => {
  //       test('it creates a new subscriber from given subscriberName (3rd arg)', async () => {
  //         const asocs = await lodger.asociatii(subscriberName)
  //         expect(asocs).toBeDefined()
  //       })

  //       test('when a new item is created, dataholder has it', async (done) => {
  //         const { _id } = await lodger.put('asociatie', fakeData('asociatie'), subscriberName)

  //         expect.assertions(1)

  //         // give rxdb some lil' time to update entries
  //         setTimeout(() => {
  //           const asocs = lodger.asociatii(subscriberName)
  //           expect(asocs[_id]).toBeDefined()
  //           done()
  //         }, 500)
  //       }, 600)

  //     })
  //   })

  //   describe('Unsubscribe behaviour', () => {})

  //   afterAll(async () => {
  //     await lodger.destroy()
  //   })
  // })

  // describe('Public API', () => {
  //   let lodger: Lodger
  //   let getters: LodgerGetters

  //   beforeAll(async () => {
  //     lodger = await Lodger.build()
  //   })

  //   let commonId: string | null = null

  //   describe('.put()', () => {
  //     const debug = Debug('lodger:tests:put')
  //     const testTax = 'asociatie'

  //     describe(`positive [${testTax}]`, () => {
  //       let asoc
  //       const moneda = 'ron'

  //       beforeAll(async () => {
  //         const name = 'bla'
  //         try {
  //           asoc = await lodger.put(testTax, {
  //             name,
  //             moneda
  //           })
  //         } catch (e) {
  //           debug('PUT FAILED', e)
  //         }
  //       })

  //     })

  //     describe('negative', () => {
  //       test('throws if no data is supplied', async () => {
  //         try {
  //           await lodger.put('asociatie', {})
  //         } catch (e) {
  //           expect(e).toBeDefined()
  //           expect(String(e).indexOf('data')).toBeTruthy()
  //         }
  //       })

  //       test('throws if wrong/unknown taxonomy', async () => {
  //         try {
  //           await lodger.put('masina', { name: 'Honda' })
  //         } catch (e) {
  //           expect(e).toBeDefined()
  //         }
  //       })

  //       test('throws if data doesnt match schema', async () => {
  //         try {
  //           await lodger.put('asociatie', { lol: 'fool' } )
  //         } catch (e) {
  //           expect(e).toBeDefined()
  //         }
  //       })
  //     })

  //     // test('adds a new bloc at prev created assoc', async () => {

  //     // })
  //   })

  //   describe('.trash()', () => {
  //     test('deletes the prev added assoc', () => {
  //       expect(async () => { await lodger.trash('asociatie', commonId) }).not.toThrow()
  //       // expect(getters['asociatie/ids']).not.toContain(commonId)
  //     })
  //   })

  //   describe('.select()', () => {
  //     let testerId
  //     const tax = 'asociatie'
  //     const gn = `${tax}/selected`
  //     let g

  //     /**
  //      * Adaugam 5 asociatii sa avem 5 id-uri cu care sa ne jucam :)
  //      */
  //     beforeAll(async () => {
  //       const ns = 4

  //       for (let i of Array(ns).keys()) {
  //         const { _id } = await lodger.put(tax, fakeData(tax))
  //         if (i === 3) testerId = _id
  //       }
  //       g = lodger.getters
  //     })

  //     describe('positive', () => {
  //       test('selects ok an item by it\'s id', async () => {
  //         await lodger.select(tax, testerId)
  //         expect(g[gn]).toEqual(testerId)
  //       })

  //       test('cannot select the same item again', async () => {
  //         const selected = await lodger.select(tax, testerId)
  //         expect(selected).toBeUndefined()
  //       })

  //       test('deselects an item if NULL is given as 2nd arg', async () => {
  //         await lodger.select(tax, null)
  //         expect(g[gn]).toBeFalsy()
  //       })

  //       test('accepts an OBJECT (with id) as 2nd arg', async () => {
  //         await lodger.select(tax, {
  //           id: testerId
  //         })
  //         expect(g[gn]).toBe(testerId)
  //       })

  //       test('updates dependend taxonomies when smh gets selected', () => {

  //       })
  //     })

  //     describe('negative', () => {
  //       test('throws if taxonomy does not exist', () => {
  //         try {
  //           lodger.select('masina', 'abc123')
  //         } catch (e) {
  //           expect(e).toBeDefined()
  //         }
  //       })

  //       test(`does NOT deselect the item if ID does not exist or wrong supplied`, async () => {
  //         const curSelectedId = g[gn]
  //         await lodger.select(tax, 'bla')
  //         expect(g[gn]).toBe(curSelectedId)

  //         await lodger.select(tax, '')
  //         expect(g[gn]).toBe(curSelectedId)
  //       })
  //     })
  //   })

  //   describe('.[taxonomy]() getters', () => {
  //     // beforeEach(async () => {
  //     //   await delay(2500)
  //     // })
  //     let forms
  //     const subName = 'test'
  //     beforeAll(() => {
  //       taxonomii.map(async tax => {
  //         try {
  //           lodger.subscribe(tax, null, subName)
  //           await lodger.put(tax, fakeData(tax))
  //           await delay(500) //give rxdb time to update the changes
  //         } catch (e) {
  //           console.error(e)
  //         }

  //       })
  //       forms = lodger.forms
  //     })

  //     describe('positive', () => {
  //       taxonomii.map(tax => {
  //         test(`${tax} is defined`, async () => {
  //           const { plural } = forms[tax]
  //           await delay(100)
  //           expect(lodger[`${plural}`](subName)).toBeDefined()
  //         })

  //         test(`${tax} item matches schema`, async () => {
  //           const { plural, schema: { properties } } = forms[tax]
  //           await delay(100)
  //           const items = lodger[`${plural}`](subName)
  //           const allSchemaKeys = Object.keys(properties)
  //           const oneItem = Object.keys(items)[0]

  //           const containingItems = Object.keys(items[oneItem])
  //             .filter(item => ['_id', '_rev'].indexOf(item) < 0)
  //           expect(allSchemaKeys).toEqual(expect.arrayContaining(containingItems))
  //         })
  //       })

  //       test('returns the items of another sub', async () => {
  //         const subName = 'listeDePlata'
  //         await lodger.subscribe('apartament', undefined, subName)
  //         await delay(500)
  //         expect(lodger.apartamente(subName)).toBeDefined()
  //       })
  //     })

  //     describe('negative', () => {
  //       test('throws if subscriber supplied doesnt exist', () => {
  //         try {
  //           const aps = lodger.apartamente('subInexistent')
  //         } catch (e) {
  //           expect(e).toBeDefined()
  //         }
  //       })
  //     })
  //   })

  //   describe('.export()', () => {
  //     describe('positive', () => {
  //       test('it exports with no path given in downloads folder', async () => {
  //         try {

  //           await lodger.export()
  //         } catch (e) {
  //           expect(e).toBeUndefined()
  //         }
  //       })
  //     })

  //     describe('negative', () => {
  //       test('it fails if wrong path is supplied', () => {
  //         try {
  //           lodger.export('xx/xx')
  //         } catch (e) {
  //           expect(e).toBeDefined()
  //         }
  //       })

  //     })
  //   })

  //   describe('.search()', () => {

  //   })

  //   describe('.setPreference()', () => {
  //     describe('positive', () => {
  //       test('sets a new preferences value in store', async () => {
  //         await lodger.setPreference('client.interface.fontSize', 3)
  //         expect(lodger.preferences.client.fontSize).toBe(3)
  //       })

  //       test('sets a new preferences value in DB', async () => {
  //         await lodger.setPreference('user.language', 'ro')
  //         expect(lodger.preferences.user.language).toBe('ro')
  //       })
  //     })

  //     describe('negative', () => {
  //       test('throws if starting taxonomy is not known', async () => {
  //         // expect(async () => { await lodger.setPreference('caca.maca', null) }).toThrow()
  //         try {
  //           await lodger.setPreference('caca.maca', null)
  //         } catch (e) {
  //           expect(e).toBeDefined()
  //           expect(String(e).indexOf(Errors.invalidPreferenceIndex)).toBeTruthy()
  //         }
  //       })
  //       test('throws if invalid properties specified', async () => {
  //         try {
  //           await lodger.setPreference('client.', null)
  //         } catch (e) {
  //           expect(String(e).indexOf(Errors.invalidPropertySupplied)).toBeTruthy()
  //         }


  //         try {
  //           await lodger.setPreference('client.xxx', 0)

  //         } catch (e) {
  //           expect(String(e).indexOf(Errors.invalidPropertySupplied)).toBeTruthy()
  //         }
  //       })
  //     })
  //   })

  //   describe('.subscriberData getter', () => {

  //     describe('positive', () => {
  //       test('it creates the requested dummy objected if it s not defined in subsData', () => {
  //         const data = lodger.subscriberData('asociatie', 'subscriber')
  //         expect(data).toBeDefined()
  //         expect(data.items).toBeDefined()
  //       })

  //       test('returns empty if not defined', () => {
  //         const data = lodger.subscriberData('blabla', 'subscriber')
  //         expect(data).toBeDefined()
  //         expect(data.items).toBeDefined()
  //       })

  //       test('', () => {

  //       })
  //     })

  //     describe('negative', () => {

  //     })
  //   })

  //   afterAll(async () => {
  //     if (!lodger) return
  //     await lodger.destroy()
  //   })
  // })
})
