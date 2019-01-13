/**
 * @param {Object} { methodName: action }
 */
export type SharedStoreMethods = {
  [k: string]: string,
  last: string
}

export const sharedStoreMethods: SharedStoreMethods = {
  selected: 'select',
  last: 'set_last',
}
