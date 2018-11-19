import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
/**
 * Preferences MODULE
 */
declare global {
  type PreferencesState = {
    theme: string,
    [k: string]: any
  }
}

const state: PreferencesState = {
  theme: 'default'
}

const getters: GetterTree<PreferencesState, RootState> = {
  theme: state => state.theme
}

const actions: ActionTree<PreferencesState, RootState> = {
  update: ({ commit }, { path, value }) => {
    commit(`UPDATE_${path}`, value)
  }
}

const mutations: MutationTree<PreferencesState> = {
  'UPDATE_theme': (s, value) => {
    s['theme'] = value
  }
}

export default <Module<PreferencesState, RootState>>{
  getters,
  state,
  actions,
  mutations
}
