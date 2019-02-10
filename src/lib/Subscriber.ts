import { RxCollection, RxDocument } from 'rxdb'
import { action, observable, computed, reaction } from 'mobx';
import lodgerConfig from 'lodger.config'
import { hasInterceptors } from 'mobx/lib/internal';

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
interface LodgerSubscriber {
  readonly criteriu: Criteriu

  subscribe (criteriu ?: Criteriu, opts ?: SubscribeOptions): void // Subscription
  select (id: string): RxDocument<any>
  kill (): void
}

type SubscribeOptions = {
  progressivePaging ?: boolean
}


/**
 * Creates a new subscriber for a specific taxonomy
 *
 * @class Subscriber
 * @implements {LodgerSubscriber}
 */
export default class Subscriber<N extends Taxonomie> implements LodgerSubscriber {
  private documents: RxDocument<N>[] = [] // main data holder, reactive by itself

  @observable criteria: Criteriu = { ...lodgerConfig.taxonomii.defaults.criteriu }

  @observable subscribed: Boolean = false
  @observable selectedId ?: string

  @observable fetching: Boolean = false
  // private activeCriteria: Criteriu

  @action selectDocument (id ?: string) {
    this.selectedId = id
  }

  @computed get selected () {
    return this.selectedId
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

  // @computed get criteriu () {
  //   return this.activeCriteria
  // }

  get activeDoc () { return }
  get selectedDoc () { return }

  kill : () => void = () => {}

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
    // this.activeCriteria = observable({ ...initialCriteria  })
    this.subscribe()
    reaction(() => ({ ...this.criteria }), (newC) => {
      console.error({ ...newC })
      this.kill = this.subscribe({ ...newC })
    })
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

  @action private handleSubscriptionData (changes: RxDocument<any>[]) {
    if (!this.subscribed) this.subscribed = true
    // this.documents = changes.map(change => Object.freeze(change))
    this.documents = changes
    this.fetching = false
  }

  @action private subscribeRequested () {
    this.fetching = true
  }

  /**
   * (re)Subscribes with given Criteria
   * happens internaly when criteriu is changed
   *
   * @param {Criteriu} [criteriu]
   * @memberof Subscriber
   */
  subscribe (
    { limit, index, sort, filter }: Criteriu = { ... this.criteria },
    options ?: SubscribeOptions
  ) {
    this.subscribeRequested()

    // progressive listing data
    const paging = options && options.progressivePaging ?
      Number(limit || 0) * (index || 1) :
      Number(limit)

    const { unsubscribe } = this.collection
      .find(filter)
      .limit(paging)
      .sort(sort)
      .$
      .subscribe(changes => this.handleSubscriptionData(changes))

    return unsubscribe
  }

  select (id: string) {

  }
}

