import Taxonomy from './'
import Subscriber from 'rxcollection-subscriber'
import { Form } from '../Form'
import { computed } from 'mobx';

/**
 *
 *
 * @interface SubscribableTaxonomy
 * @extends {LodgerTaxonomy<any, S>}
 * @template N
 * @template S
 */
interface SubscribableTaxonomy<T extends Taxonomie> {
  readonly subscribers: SubscriberList<T>
  readonly data: SubscriberDataHolder,
  readonly subscribed: boolean
}

type SubscriberList<T extends Taxonomie> = {
  [k: string]: Subscriber<T>
}

export default class STaxonomy<T extends Taxonomie, I>
extends Taxonomy<T, I>
implements SubscribableTaxonomy<T> {
  readonly subscribers: SubscriberList<T> = {}

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
  @computed get data () {
    return this.subscribers
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
   * Subscribes.
   *
   * @param {string} [subscriberName='main']
   * @param {Criteriu} [criteriuCerut]
   * @returns {Promise<Subscriber<T>>} the unwatcher for subscriber
   * @memberof Taxonomy
   */
  subscribe (
    subscriberName : string = 'main',
    options
  ): void {
    if (this.subscribers[subscriberName]) return
    this.subscribers[subscriberName] = new Subscriber(this.collection, options)
  }

  /**
   *
   *
   * @param {string} [subscriberName='main']
   * @memberof STaxonomy
   */
  unsubscribe (subscriberName : string = 'main') {
    const subscriber = this.subscribers[subscriberName]
    if (subscriber.kill) subscriber.kill()
    delete this.subscribers[subscriberName]
  }

  /**
   * Kills all active listeners for a given subscriber name
   *
   * @returns {Promise}
   * @memberof Taxonomy
   */
  protected unsubscribeAll () {
    Object.keys(this.subscribers).map(subscriber => {
      this.unsubscribe(subscriber)
    })
  }
}
