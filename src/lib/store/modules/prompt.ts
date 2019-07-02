const state = () => ({
  _happened: false,
  type: null,
  message: null
})

const mutations = {
  PROMPT: (state, { type, message }) => {
    state.type = type
    state.message = message
    state._happened = true
  },
  PROMPT_OK: state => {
    state.type = null
    state.message = null
    state._happened = false
  },
  PROMPT_CANCEL: state => {
    state.type = null
    state.message = null
  }
}

const actions = {
  confirm: ({ commit, dispatch }) => {
    dispatch('modal/close', true, { root: true })
    commit('PROMPT_OK')
  },
  new: ({ commit, dispatch }, prompt) => {
    dispatch('modal/open', 'prompt', { root: true })
    commit('PROMPT', prompt)
  },
  cancel: ({ commit }) => {
    commit('PROMPT_CANCEL')
  }
}

const getters = {
  type: state => state.type,
  message: state => state.message,
  prompted: state => state._happened
}

export default {
  state,
  actions,
  mutations,
  getters
}
