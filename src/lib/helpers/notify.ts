import consola from 'consola'

type Notification = {
  type: 'error' | 'success' | 'info' | 'warn',
  text: string
}

/**
 * Notifies the user and also us, the devs, of anything!
 * 
 * @kind Store action wrapper
 * fallsback to console
 *
 * @param {Notification} notification
 */
function notify (notification: Notification) {
  /** 
   * if/when bound to Store
   * to be used on frontend mostly
   *
   */ 
  if (this && typeof this.dispatch === 'function' && this.actions.notify) {
    this.dispatch('notify', notification)
    return
  }

  // Fallback -> Consola
  const { type, text } = notification
  consola[type](text)

  // Always throw the err for stack reporting
  if (type === 'error') throw new Error(text)
}

export default notify
