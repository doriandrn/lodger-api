const state = {
  open: false,
  content: null,
  data: null
}

const getters = {
  open: state => state.open,
  content: state => state.content,
  data: state => state.data
}

const mutations = {
  OPEN: (state, content) => {
    if (content) state.content = content
    state.open = true
  },
  DATA: (state, data) => {
    state.data = data
  },
  CLOSE: (state) => {
    state.open = false
    state.content = null
    state.data = null
  }
}

const actions = {
  open: ({ commit }, content) => {
    console.log('CC', content)
    switch (typeof content) {
      case 'object':
        commit('DATA', content.data)
        commit('OPEN', content.id)
        return

      case 'string':
        commit('DATA', content)
        break
    }
    commit('OPEN', content)
  },
  close: ({ commit, dispatch, getters, rootGetters }) => {
    const prompt = rootGetters['modal/content'] === 'prompt'
    commit('CLOSE')
    if (prompt) dispatch('prompt/cancel', null, { root: true })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}