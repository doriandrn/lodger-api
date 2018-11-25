/**
 * Error logger
 */
class LodgerError extends Error {
  constructor(m: string, details?: any) {
    if (details) {
      m = m.replace('%%', `"${JSON.stringify(details)}"`)
    }
    super(m)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, LodgerError.prototype)
  }
}

/**
 * Error logger for forms
 */

class FormError extends LodgerError {
  constructor(m: string, details?: any) {
    super(m, details)

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, FormError.prototype)
  }
}

export {
  LodgerError,
  FormError
}
