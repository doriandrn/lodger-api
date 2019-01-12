/**
 * @param {Object} { methodName: action }
 */
export type SharedStoreMethods = {
  [k: string]: string,
  // selected?: string | undefined,
  last: string
}

export const sharedStoreMethods: SharedStoreMethods = {
  selected: 'select',
  last: 'set_last',
}
