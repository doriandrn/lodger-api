import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import { LodgerError } from 'lodger/lib/Errors';
import { taxIsMultipleSelect } from 'lodger/lib/helpers/functions';

// const namespaced: boolean = true


interface RootState {
  [key: string]: any
}

type EmptyState = {}

/**
 * @param { methoName: action }
 */
const sharedStoreMethods: SharedStoreMethods = {
  selected: 'select',
  last: 'set_last',
  // referencesIds: 'set_referencesIds'
  // active: 'activate'
}

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

// const otherActions = (taxonomy, actionName) => {
//   switch (actionName) {
//     case 'select':
//       return [
//         `${taxonomy}/set_referencesIds`
//       ]

//     default:
//       return []
//   }

// }


/**
  * Shared methods across taxonomies, called individually
  *
  * @param taxonomy
  * @requires sharedMethods
  */
function setupSharedMethods (
  sharedMethods: SharedStoreMethods = sharedStoreMethods,
  module: Module<EmptyState, RootState> = createEmptyStoreModule(),
  moduleName ?: Taxonomii | string,
  plural ?: Plural
) {
  if (typeof sharedMethods !== 'object') {
    throw new LodgerError('invalid methods supplied')
  }

  // pt servicii si contoare
  const isMultiple: boolean = taxIsMultipleSelect(moduleName)

  Object.keys(sharedMethods).forEach(methodName => {
    const action : string | undefined = sharedMethods[methodName]
    const multipleSelect : boolean = isMultiple && action === 'select'

    module.state[methodName] = undefined
    module.getters[methodName] = (S: RootState, G: GetterTree<RootState, any>) => {
      if (multipleSelect) {
        const doc = G[`${moduleName}/activeDoc`]
        return doc ? doc[plural] : undefined
      } else {
        return S[methodName] && S[methodName].id ? S[methodName].id : S[methodName]
      }
    }
    module.actions[action] = ({ commit, dispatch }, data) => {
      commit(action, data)

      // const otherActionsToDispatch = otherActions(moduleName, methodName)

      // otherActionsToDispatch.forEach(action => {
      //   dispatch(action, )
      // })
    }
    module.mutations[action] = (s, data) => {
      s[methodName] = data
    }
  })

  // module.getters['activeDoc'] = (S: RootState) => S.doc || {}

  return <Module<SharedStoreMethods, RootState>>module
}

/**
 * Loads a taxonomy's store data from it's filename in store
 */
function setupFromFile (taxonomy: Taxonomii) {
  return <Module<Taxonomie, RootState>>{

  }
}

export {
  sharedStoreMethods,
  createEmptyStoreModule,
  setupSharedMethods,
  setupFromFile
}
