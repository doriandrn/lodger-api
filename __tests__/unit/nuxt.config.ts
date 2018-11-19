// import { Nuxt, Builder } from 'nuxt-edge'
// import { Nuxt } from 'nuxt-edge/dist/nuxt-start'
// import { Builder } from 'nuxt-edge'
// import Debug from 'debug'
// import typescriptSupport from '../fixtures/nuxt/typescript-support'

// Debug.enable('lodger:*')

// const nuxt = new Nuxt(typescriptSupport)
// nuxt.hook('build:done', () => {
//   debug('builduit')
// })
// let context = null
// // nuxt.hook('render:context', ctx => {
// //   context = ctx
// // })

// const builder = new Builder(nuxt)
// const debug = Debug('lodger:nuxt')
// debug('nuxt ok', Object.getPrototypeOf(builder))

describe('lodger + nuxt', () => {
  // test('builder context', async () => {
    
  //   // debug('build', builder.build)
  //   try {
  //     context = await builder.build({
  //       debug: true
  //     })
  //   } catch (e) {
  //     debug('eee', e)
  //   } finally {
  //     debug('lol', context)
  //   }
  //   // debug('context', context)
  //   // const context = await nuxt.renderRoute('/')
  //   debug('context', context)
  //   // debug('ffs')
  //   expect(context).toBeDefined()
    
  // }, 5000)
  // test('builder inits ok', () => {
  //   expect(builder).toBeInstanceOf(Builder)
  // })
  // test('all plugins load ok', () => {
  //   // console.dir('nuxt', Object.keys(nuxt))
  //   expect(nuxt.lodger).toBeDefined()
  // })
})
