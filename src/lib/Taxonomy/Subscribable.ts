import Taxonomy, { TaxonomyCreator } from './'
import SubscribableTaxonomyError from '~/lib/Error'
import Subscriber from 'rxcollection-subscriber'
import LodgerError from '~/lib/Error'
import { computed } from 'mobx'
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
      return
      // throw new LodgerError('Cannot subscribe - A subscriber with this name already exists!')

    const sub = this.subscribers[subscriberName] = new Subscriber(this.collection, options)

    if (hooks) {
      // Object.keys(hooks).map(hook => hooks[hook].bind(this))

      // run onEmpty hook
      if (hooks.empty) {
        await sub.updates
        if (!sub.ids.length)
          hooks.empty.call(this)
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

  @computed referencesIds (subName: string) {
    const sub = this.subscribers[subName]
    if (!sub)
      throw new LodgerError('Invalid subscriber requested for refsIds')

    const { parents } = this
    if (!parents) return

    const x = {}

    parents.map(tax => {
      const $tax = this.$lodger[tax] || this.$lodger[tax.plural]
      if (!$tax) return
      const { form: { plural }, subscribers } = $tax
      const taxSub = subscribers[subName]

      if (taxSub) {
        const { selectedId } = taxSub
        if (selectedId)
          x[plural === tax ? plural : `${tax}Id`] = plural === tax ? [ selectedId ] : selectedId
      }
    })

    return x
  }

  get hooks () {
    return this.form.taxHooks
  }
}
