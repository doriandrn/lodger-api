import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import LodgerError from '../Error';

import { sharedStoreMethods, SharedStoreMethods } from 'defs/sharedStoreMethods'

interface RootState {
  [key: string]: any
}

type EmptyState = {}


/**
 * Creates an empty store module
 */
function createEmptyStoreModule () {

  /**
   * Empties
   */
  const state: EmptyState = {} as any
  const getters: GetterTree<EmptyState, RootState> = {}
  const actions: ActionTree<EmptyState, RootState> = {}
  const mutations: MutationTree<EmptyState> = {}

  return <Module<EmptyState, RootState>>{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
  }
}

/**
  * Shared methods across taxonomies, called individually
  *
  * @param taxonomy
  * @requires sharedMethods
  */
function setupSharedMethods (
  sharedMethods: SharedStoreMethods = sharedStoreMethods
) {
  if (typeof sharedMethods !== 'object') {
    throw new LodgerError('invalid methods supplied')
  }

  const module: Module<any, RootState> = createEmptyStoreModule()

  Object.keys(sharedMethods).forEach(methodName => {
    const action : string = sharedMethods[methodName]
    const MUTATION: string = String(action).toUpperCase()

    Object.assign(module.state, { [methodName]: undefined })
    Object.assign(module.getters, { [methodName]: (S: RootState) => S[methodName] })
    Object.assign(module.actions, { [action]: ({ commit }, data) => commit(MUTATION, data) })
    Object.assign(module.mutations, { [MUTATION]: (s, data) => s[methodName] = data })
  })

  return <Module<any, RootState>>module
}

export {
  createEmptyStoreModule,
  setupSharedMethods
}
