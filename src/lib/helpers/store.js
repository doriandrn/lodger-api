import LodgerError from '../Error';
import { sharedStoreMethods } from 'defs/sharedStoreMethods';
/**
 * Creates an empty store module
 */
function createEmptyStoreModule() {
    /**
     * Empties
     */
    const state = {};
    const getters = {};
    const actions = {};
    const mutations = {};
    return {
        namespaced: true,
        state,
        actions,
        mutations,
        getters
    };
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
function setupSharedMethods(sharedMethods = sharedStoreMethods, module = createEmptyStoreModule(), moduleName, plural) {
    if (typeof sharedMethods !== 'object') {
        throw new LodgerError('invalid methods supplied');
    }
    // pt servicii si contoare
    const isMultiple = taxIsMultipleSelect(moduleName);
    Object.keys(sharedMethods).forEach(methodName => {
        const action = sharedMethods[methodName];
        const multipleSelect = isMultiple && action === 'select';
        module.state[methodName] = undefined;
        module.getters[methodName] = (S, G) => {
            if (multipleSelect) {
                const doc = G[`${moduleName}/activeDoc`];
                return doc ? doc[plural] : undefined;
            }
            else {
                return S[methodName] && S[methodName].id ? S[methodName].id : S[methodName];
            }
        };
        module.actions[action] = ({ commit, dispatch }, data) => {
            commit(action, data);
            // const otherActionsToDispatch = otherActions(moduleName, methodName)
            // otherActionsToDispatch.forEach(action => {
            //   dispatch(action, )
            // })
        };
        module.mutations[action] = (s, data) => {
            s[methodName] = data;
        };
    });
    // module.getters['activeDoc'] = (S: RootState) => S.doc || {}
    return module;
}
/**
 * Loads a taxonomy's store data from it's filename in store
 */
function setupFromFile(taxonomy) {
    return {};
}
export { sharedStoreMethods, createEmptyStoreModule, setupSharedMethods, setupFromFile };
//# sourceMappingURL=store.js.map