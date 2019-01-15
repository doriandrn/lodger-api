import { Subscription } from 'rxjs'
import { RxCollection } from 'rxdb'
import R from './R'

declare global {
  type Criteriu = {
    limit?: number,
    index?: number,
    sort?: SortOptions,
    filter?: FilterOptions
  }
}

/**
 * A single subscriber for a Taxonomy (and form maybe?)
 *
 * @interface LodgerSubscriber
 * @template T
 */
interface LodgerSubscriber<I> {
  readonly criteriu: Criteriu
  readonly component: R<I>

  subscribe (criteriu ?: Criteriu): Subscription
  selectDocument (id ?: string): void
  kill (): void
}

/**
 * Creates a new subscriber for a specific taxonomy
 *
 * @class Subscriber
 * @implements {LodgerSubscriber}
 * @requires Vue,R
 */
export default class Subscriber<N extends Taxonomie> implements LodgerSubscriber<N> {
  readonly _reference: any
  readonly _subscribed: Boolean = false
  readonly component: R<N>
  subscribe : (criteriu: Criteriu) => Subscription

  /**
   * Creates an instance of Subscriber.
   *
   * @param {string} name - eg. 'registru'
   * @param {Taxonomy} taxonomy
   * @param {Criteriu} criteriu - initial sort / filter criteria if it shall not use the default one
   * @memberof Subscriber
   */
  constructor (
    protected collection: RxCollection<N>
  ) {
    this.component = new R()
    this.subscribe = this.component.subscribe
  }

  get criteriu () {
    return this.component.criteriu
  }

  get data () {
    const { component } = this
    return {
      ids: component.ids,
      items: component.items,
      documents: {
        active: component.activeDoc,
        selected: component.selectedDoc
      }
    }
  }

  kill () {}
  selectDocument () {}
}
