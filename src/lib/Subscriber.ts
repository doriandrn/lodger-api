import { RxCollection, RxDocument } from 'rxdb'
import { action, observable, computed } from 'mobx';

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

  // subscribe (criteriu ?: Criteriu): Subscription
  kill (): void
}

/**
 * Creates a new subscriber for a specific taxonomy
 *
 * @class Subscriber
 * @implements {LodgerSubscriber}
 */
export default class Subscriber<N extends Taxonomie> implements LodgerSubscriber<N> {
  documents: RxDocument<N>[] = [] // main data holder

  @observable subscribed: Boolean = false
  @observable _selected ?: string

  @observable fetching: Boolean = false
  @observable activeCriteria: Criteriu = {}

  @action selectDocument (id ?: string) {
    this._selected = id
  }

  @computed get selected () {
    return this._selected
  }

  @computed get ids () {
    return Object.keys(this.items)
  }

  @computed get items () {
    return Object.assign({},
      ...this.documents
        .map(item => ({ [item._id]: item._data }))
    )
  }

  @computed get criteriu () {
    return this.activeCriteria
  }

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
  }

  // get data () {
  //   const { component } = this
  //   return {
  //     ids: component.ids,
  //     items: component.items,
  //     documents: {
  //       active: component.activeDoc,
  //       selected: component.selectedDoc
  //     }
  //   }
  // }

  @action handleSubscriptionData (changes: RxDocument<any>[]) {
    this.documents = changes.map(change => Object.freeze(change))
    this.fetching = false
    if (!this.subscribed) this.subscribed = true
  }

  /**
   * (re)Subscribes with given Criteria
   * happens internaly when criteriu is changed
   *
   * @param {Criteriu} [criteriu]
   * @memberof Subscriber
   */
  protected subscribe ({ limit, index, sort, filter }: Criteriu) {
    const paging = Number(limit || 0) * (index || 1)

    return this.collection
      .find(filter)
      .limit(paging)
      .sort(sort)
      .$
      .subscribe(this.handleSubscriptionData)
  }

  kill () {}
}
