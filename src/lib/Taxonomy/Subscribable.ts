import Taxonomy, { TaxonomyCreator } from './'
import SubscribableTaxonomyError from '~/lib/Error'
import Subscriber from 'rxcollection-subscriber'
import LodgerError from '~/lib/Error'
// import { LodgerFormCreator } from '../Form'

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

  constructor () {
    super(...arguments)
  }

  static init () {
    return super.init.apply(this, arguments)
  }

  /**
   * Returns all data from subscribers
   *
   * @readonly
   * @memberof Taxonomy
   */
  get data () {
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
  async subscribe (
    subscriberName : string = 'main',
    options
  ): void {
    const { hooks, subscribers } = this
    if (subscribers[subscriberName])
      throw new LodgerError('Cannot subscribe - A subscriber with this name already exists!')

    const sub = this.subscribers[subscriberName] = new Subscriber(this.collection, options)

    if (hooks) {
      Object.keys(hooks).map(hook => hooks[hook].bind(this))

      // run onEmpty hook
      if (hooks.empty) {
        await sub.updates
        if (!sub.ids.length) {
          hooks['empty'](this)
        }
      }

    }
  }

  /**
   *
   *
   * @param {string} [subscriberName='main']
   * @memberof STaxonomy
   */
  unsubscribe (subscriberName : string = 'main') {
    const subscriber = this.subscribers[subscriberName]

    try {
      if (subscriber.kill)
        subscriber.kill()
    } catch (e) {}

    delete this.subscribers[subscriberName]
  }

  /**
   * Kills all active listeners for a given subscriber name
   *
   * @returns {Promise}
   * @memberof Taxonomy
   */
  protected unsubscribeAll () {
    const { subscribers } = this
    if (!subscribers || !Object.keys(subscribers).length)
      throw new SubscribableTaxonomyError('no subs')
    Object.keys(subscribers).forEach(s => { this.unsubscribe(s) })
  }

  get subscriberParentIds () {

  }

  get hooks () {
    return this.form.taxHooks
  }
}
