/**
 * Custom store module
 * reactive within itself only
 * (vuex affects data also)
 */

/**
 * @interface Asociatie
 */
interface Asociatie {
  selected: string
}

type State extends Object
/**
 * This teh API
 *
 * @interface ZtoreI
 * @template S
 */
interface ZtoreI<S> {
  getters: Getters<S>
  dispatch: (action: Action<S>, payload: any) => void

  extend (path: StorePath, state: State): void
}

export default class Ztore<S> implements ZtoreI<S> {
  readonly protected state: S
  readonly getters: Getters<S>

  constructor (startupState ?: S) {
    if (startupState) this.state = startupState
  }
}
