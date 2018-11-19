import Vue from 'vue'
import Vuex, { ModuleTree, Module } from 'vuex'
import { Taxonomii } from 'lodger'
import { setupSharedMethods } from 'lodger/lib/helpers/store'
import { LodgerError } from 'lodger/lib/Errors';
import * as RootModule from 'lodger/lib/store/index'
import Debug from 'debug'

Vue.use(Vuex)

const debug = Debug('lodger:Store')
const modules: ModuleTree<RootState> = {}

enum Errors {
  invalidModule = 'Invalid Module'
}

const customOpts = (context, options) => {
  const { taxonomii, forms } = context

  /**
   * Builds modules based on taxonomies
   * TODO: make this a method ?!
   */
  if (!(taxonomii && taxonomii.length)) throw new LodgerError('No taxes supplied')

  taxonomii.forEach((tax: Taxonomii) => {
    const { plural } = forms[tax]
    modules[tax] = setupSharedMethods(undefined, undefined, tax, plural)
  })

  if (RootModule && RootModule.modules) {
    // LodgerStore.use(RootModule, false)
    Object.assign(options, RootModule)
    Object.keys(RootModule.modules).forEach(module => {
      LodgerStore.use({ [module]: RootModule.modules[module] }, module !== 'toast')
    })
  }

  options.modules = modules

  return options
}

// export default class LodgerStore implements StoreOptions<RootState> {
export default class LodgerStore extends Vuex.Store<RootState> {
  readonly modules: ModuleTree<any> = {}

  constructor (
    readonly context: any,
    readonly options: {} = {}
  ) {
    super(customOpts(context, options))
  }

  /**
   * Use a store module
   * to be used before calling the constructor
   *
   * @param module
   * @param {Boolean} namespaced - if it should be namespaced
   */
  static use (module: Module<any, RootState>, namespaced: boolean = true) {
    if (!module || typeof module !== 'object') {
      throw new LodgerError(Errors.invalidModule)
    }
    const key = Object.keys(module)[0]
    if (!key || !module[key]) throw new LodgerError(Errors.invalidModule)

    debug('using module', key, module[key])

    modules[key] = Object.assign({}, module[key], { namespaced })
  }
}
