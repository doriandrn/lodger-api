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
export default function (notification: Notification) {
  // Bound to store
  if (this && typeof this.dispatch === 'function' && this.actions.notify) {
    this.dispatch('notify', notification)
    return
  }

  // Simple
  let { type, text } = notification
  type = typeof console[type] === 'function' ? type : 'log'
  console[type](text)
}
