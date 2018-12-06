import Vue from 'vue'
import Vuex, { ModuleTree, Module, StoreOptions } from 'vuex'

import { Taxonomii } from '../index'
import { setupSharedMethods } from './helpers/store'
import { LodgerError } from './Errors';
import * as RootModule from './store/index'
import Debug from 'debug'

Vue.use(Vuex)

const debug = Debug('lodger:Store')
const modules: ModuleTree<RootState> = {}

export type Locale = 'en' | 'ro'

export interface RootState {
  version: string,
  locale: Locale
}

enum Errors {
  invalidModule = 'Invalid Module'
}

export const customOpts = (
  context: Lodger,
  options: StoreOptions<RootState>
) => {
  if (!context.taxonomii && !context.forms) return
  const { taxonomii, forms } = context

  /**
   * Builds modules based on taxonomies
   * TODO: make this a method ?!
   */
  if (!(taxonomii && taxonomii.length))
    throw new LodgerError('No taxes supplied')

  taxonomii.forEach((tax: Taxonomii) => {
    const { plural } = forms[tax]

    modules[tax] = setupSharedMethods(
      undefined, undefined, tax, plural
    )
  })

  if (RootModule && RootModule.modules) {
    // LodgerStore.use(RootModule, false)
    Object.assign(options, RootModule)
    Object.keys(RootModule.modules).forEach(module => {
      LodgerStore.use({ [module]: <Module<any, RootState>>RootModule.modules[module] }, module !== 'toast')
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
  static use (module: {[k: string]: Module<any, RootState>}, namespaced: boolean = true) {
    if (!module || typeof module !== 'object') {
      throw new LodgerError(Errors.invalidModule)
    }
    const key = Object.keys(module)[0]
    if (!key || !module[key]) throw new LodgerError(Errors.invalidModule)

    debug('using module', key)

    modules[key] = Object.assign({}, module[key], { namespaced })
  }
}
