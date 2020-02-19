import { Lodger, Errors } from '~/index'
import BroadcastChannel from 'broadcast-channel'

describe('Lodger', () => {
  let L: Lodger
  beforeAll(async () => {
    await BroadcastChannel.clearNodeFolder()
    L = await Lodger.build()
  })

  describe('first run', () => {
    test('locale is defined (default)', () => {
      expect(L.locale).toBeDefined()
    })

    describe('.supportedLangs', () => {
      test('is defined', () => {
        expect(L.supportedLangs).toBeDefined()
      })

      // test('contains the supported languages only', () => {

      // })
    })
  })

  describe('during runtime - setting .locale', () => {
    test('can be set to a supported language', () => {
      L.locale = 'ro'
      expect(L.locale).toEqual('ro')
    })

    test('throws if language is not supported', () => {
      try {
        L.locale = 'xx'
      } catch (e) {
        expect(e).toBeDefined()
        // expect(String(e).indexOf(Errors.invalidLang)).toBeTruthy()
      }
    })

    describe('form fields labels return the correct translation', () => {

    })
  })

  afterAll(async () => {
    await L.destroy()
  })
})
