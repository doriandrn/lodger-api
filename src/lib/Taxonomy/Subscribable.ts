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
  readonly data: SubscriberDataHolder
  readonly subscribed: boolean,

  subscribe (name: string, criteriu ?: Criteriu): Promise<Subscriber<N>>
  unsubscribeAll: (subscriberName?: string) => void

  onFirstTimeInit: () => void
}

type SubscriberList<N> = {
  [k: string]: Subscriber<N>[]
}

export default class STaxonomy extends Taxonomy implements SubscribableTaxonomy {
  protected subscribers: SubscriberList

  constructor () {
    super()
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
    const { collection, store } = this
    this.subscribers[subscriberName] = new Subscriber(collection, store).subscribe(criteriuCerut)
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

  async onFirstTimeSubscribe () {
    const { name, collection, store } = this
    switch (name) {
      // insert predefined services
      case 'Serviciu':
        predefinite.forEach(async denumire => { await collection.insert({ denumire }) })
        break

      // insert admin user
      case 'Utilizator':
        const { _id } = await collection.insert({
          name: 'Administrator',
          rol: 'admin'
        })
        store.dispatch('utilizator/set_active', _id)
        break
    }

  }
}
