import Taxonomy from './'
import Subscriber from '../Subscriber'

/**
 *
 *
 * @interface SubscribableTaxonomy
 * @extends {LodgerTaxonomy<any, S>}
 * @template N
 * @template S
 */
interface SubscribableTaxonomy<N, S> {
  readonly subscribers: SubscriberList<N>
  readonly data: SubscriberDataHolder,
  readonly subscribed: boolean,

  subscribe (name: string, criteriu ?: Criteriu): Promise<Subscriber<N>>
  unsubscribeAll: (subscriberName?: string) => void
}

type SubscriberList<N> = {
  [k: string]: Subscriber<N>[]
}

export default class STaxonomy<T extends Taxonomie, I> extends Taxonomy<T, I> implements SubscribableTaxonomy<T, I> {
  private subscribers: SubscriberList<T> = {}

  constructor (
    protected form: Form<T, I>,
    protected collection: RxCollection<T>,
    options ?: LodgerTaxonomyCreatorOptions
  ) {
    super(form, collection, options)
  }

  /**
   * Returns all data from subscribers
   *
   * @readonly
   * @memberof Taxonomy
   */
  get data () {
    return
  }

  /**
   * @readonly
   * @memberof Taxonomy
   * @returns {Boolean} if subscribed anywhere
   */
  get subscribed () {
    return Object.keys(this.subscribers).length > 0
  }

  get defaultCriteria () {
    return super.config.criteriu
  }

  /**
   * Subscribes
   *
   * @param {string} [subscriberName='main']
   * @param {Criteriu} [criteriuCerut]
   * @returns {Promise<Subscriber<T>>} the unwatcher for subscriber
   * @memberof Taxonomy
   */
  subscribe (
    subscriberName : string = 'main',
    criteriuCerut ?: Criteriu
  ): Promise<Subscriber<T>> {
    let subscriber = this.subscribers[subscriberName]
    if (!subscriber) {
      subscriber = this.subscribers[subscriberName] = new Subscriber(this.collection, this.defaultCriteria)
    }

    const { criteriu } = subscriber

    if (criteriuCerut) {
      Object.assign(criteriu, { ...criteriuCerut })
    }

    return subscriber.subscribe(criteriu)
  }

  unsubscribe (subscriberName : string = 'main') {
    const subscriber = this.subscribers[subscriberName]
    subscriber.kill()
    delete this.subscribers[subscriberName]
  }

  /**
   * Kills all active listeners for a given subscriber name
   *
   * @param {string} [subscriberName='main']
   * @returns {Promise}
   * @memberof Taxonomy
   */
  unsubscribeAll (subscriberName: string = 'main') {
    const subscribers = this.subscribers[subscriberName]

    return Promise.all(
      Object.keys(subscribers).map(async subscriber => {
        await subscribers[subscriber].unsubscribe()
      })
    )
  }
}
