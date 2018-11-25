/**
 * @param { methoName: action }
 */
export type SharedStoreMethods = {
  [k: string]: string | undefined,
  selected?: string | undefined,
  last?: string | undefined,
}

export const sharedStoreMethods: SharedStoreMethods = {
  selected: 'select',
  last: 'set_last',
}
