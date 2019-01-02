// import fx from 'fx'

/**
 * Error logger
 */
export default class LodgerError extends Error {
  constructor(m: string, details?: any) {
    if (details) {
      m = m.replace('%%', `"${JSON.stringify(details)}"`)
    }
    super(m)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LodgerError.prototype)
  }
}
