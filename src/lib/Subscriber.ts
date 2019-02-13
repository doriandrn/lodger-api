import { RxCollection, RxDocument } from 'rxdb'
import { action, observable, computed, reaction, toJS } from 'mobx';
import lodgerConfig from 'lodger.config'

declare global {
  type Criteriu = {
    limit?: number,
    index?: number,
    sort?: {
      [key: string]: number
    },
    filter?: {
      [key: string]: any
    }
  }
}

/**
 * Single RXCollection subscriber interface
 *
 * @interface LodgerSubscriber
 * @template T
 */
interface LodgerSubscriber {
  readonly criteria: Criteriu

  select (id: string): RxDocument<any>
  edit (id: string): RxDocument<any>

  subscribe (criteria ?: Criteriu): void // Subscription
  kill (): void
}

type SubscriberOptions = {
  progressivePaging ?: boolean
  allowMultipleSelect ?: boolean
}


/**
 * Creates a new data sucker for any RxCollection
 * refreshes data on criteria change
 *
 * @class Subscriber
 * @implements {LodgerSubscriber}
 */
export default class Subscriber<N extends Taxonomie> implements LodgerSubscriber {
  private documents: RxDocument<N>[] = [] // main data holder, reactive by itself

  @observable criteria: Criteriu = { ...lodgerConfig.taxonomii.defaults.criteriu }
  @observable fetching: Boolean = false

  @observable subscribed: Boolean = false

  @observable selectedId ?: string | string[]
  @observable activeId ?: string

  @computed get selected () { return this.selectedId }
  @computed get active () { return this.activeId }

  @computed get ids () { return Object.keys(this.items) }

  @computed get items () {
    return Object.assign({},
      ...this.documents
        .map(item => ({ [item._id]: item._data }))
    )
  }

  @computed get selectedDoc () {
    return this.documents.filter(doc => doc._id === this.selectedId)[0]
  }

  @computed get editing () {
    return this.documents.filter(doc => doc._id === this.activeId)[0]
  }

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
    protected collection: RxCollection<N>,
    readonly options ?: SubscriberOptions
  ) {
    // Register the reaction on criteria change
    reaction(() => ({ ...this.criteria }), (newC) => {
      this.kill = this.subscribe(toJS(newC))
    })

    // Trigger the very first subscribe
    this.subscribe()

    if (options) {
      if (options.allowMultipleSelect) {
        this.selectedId = []
      }
    }
  }

  /**
   * Observables changes wwhenever data changes
   *
   * @private
   * @param {RxDocument<any>[]} changes
   * @memberof Subscriber
   */
  @action private handleSubscriptionData (changes: RxDocument<any>[]) {
    if (!this.subscribed) this.subscribed = true

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
    { limit, index, sort, filter }: Criteriu = { ... this.criteria }
  ) {
    this.subscribeRequested()
    const { options } = this
    limit = Number(limit)
    index = Number(index)
    const paging = options && options.progressivePaging ?
      (limit || 0) * (index || 1) :
      (limit + limit * index)

    const { unsubscribe } = this.collection
      .find(filter)
      .limit(paging)
      .sort(toJS(sort))
      .$
      .subscribe(changes => this.handleSubscriptionData(changes))

    return unsubscribe
  }

  /**
   * (De)selects an item by it's id
   *
   * @param {string} id
   * @memberof Subscriber
   */
  @action select (id: string) {
    if (typeof this.selectedId !== 'string' && this.selectedId && this.options && this.options.allowMultipleSelect) {
      if (this.selectedId.indexOf(id) < 0)
        this.selectedId.push(id)
      else
        this.selectedId.splice(this.selectedId.indexOf(id), 1)
    } else {
      this.selectedId = id
    }
  }

  /**
   * Sets the active document to be furtherly edited
   *
   * @param {string} id
   * @memberof Subscriber
   */
  @action edit (id: string) {
    this.activeId = id
  }
}
