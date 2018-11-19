import lodgerConfig from '../../../lodger.config'
/**
 * MODULES
 */
// TOAST
import { createModule } from 'vuex-toast'

// MODAL
import modal from './modules/modal'
import prompt from './modules/prompt'

const { version } = lodgerConfig
const state: RootState = {
  locale: 'ro',
  version
}

const actions: ActionTree < Toast, RootState > = {
  notify: ({ dispatch }, notificare: LdgNotification) => {
    dispatch('@@toast/ADD_TOAST_MESSAGE', notificare)
  }
}

const modules = {
  toast: createModule({ dismissInterval: 5000 }),
  modal,
  prompt
}

export {
  state,
  actions,
  modules
}
