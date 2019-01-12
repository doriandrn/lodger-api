import consola from 'consola'

type Notification = {
  type: 'error' | 'success' | 'info' | 'warn',
  text: string
}

/**
 * @kind Store action wrapper
 * fallsback to console
 *
 * @param {Notification} notification
 */
function notify (notification: Notification) {
  // Bound to store
  if (this && typeof this.dispatch === 'function' && this.actions.notify) {
    this.dispatch('notify', notification)
    return
  }

  // Simple -> Consola
  const { type, text } = notification
  consola[type](text)
}

export default notify
