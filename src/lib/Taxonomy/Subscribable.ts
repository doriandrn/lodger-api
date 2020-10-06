import Taxonomy, { TaxonomyCreator } from './'
import SubscribableTaxonomyError from '~/lib/Error'
import Subscriber from 'rxcollection-subscriber'
import LodgerError from '~/lib/Error'
import { computed, reaction, observable } from 'mobx'
import { table } from 'console'
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
  @observable _refsIds: {[k in Taxonomii]: string} = {}

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

  @computed get refsIds () {
    return this._refsIds
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

    reaction(() => sub.selectedId, (id) => {
      const { parents, children, collection: { name } } = this
      if (children && children.length) {
        children.map(tax => {
          const $tax = this.$lodger[tax] || this.$lodger[tax.plural]
          if (!$tax) return
          const { form: { plural }, subscribers } = $tax
          const taxSub = subscribers[subscriberName]

          if (taxSub) {

            let sOrP, op, val
            if ($tax.parents && $tax.parents.length) {
              if (!taxSub.refsIds) {
                taxSub.refsIds = observable({})
              }

              const isSingular = $tax.parents.indexOf(name) > -1
              sOrP = isSingular ? `${name}Id` : this.form.plural
              op = isSingular ? '$eq' : '$in'
              val = isSingular ? id : [id]

              taxSub.refsIds[sOrP] = val
            }

            if (sOrP && op && val) {
              taxSub.criteria.filter = { [sOrP]: { [op]: val } }
            } else if (taxSub.criteria.filter[sOrP]) {
              delete taxSub.criteria.filter[sOrP]
            }

            if ($tax.children) $tax.children.forEach(t => {
              const tsub = this.$lodger[t].subscribers[subscriberName]
              if (tsub && tsub.selectedId) tsub.select(tsub.selectedId)
            })
          }
        })
      }
    })

    reaction(() => sub.activeId, async (id) => {
      if (!id) return
      const activeDoc = await this.collection.findOne(id).exec()
      this.$lodger.modal.activeDoc = activeDoc
      Object.assign(this.$lodger.modal, { sub })
    })

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

  // referencesIds (subName: string) {
  //   const sub = this.subscribers[subName]
  //   if (!sub)
  //     throw new LodgerError('Invalid subscriber requested for refsIds')

  //   const { parents } = this
  //   if (!parents) return

  //   // const x = {}

  //   parents.map(tax => {
  //     const $tax = this.$lodger[tax] || this.$lodger[tax.plural]
  //     if (!$tax) return

  //     const { form: { plural }, subscribers } = $tax
  //     const taxSub = subscribers[subName]

  //     if (taxSub) {
  //       const { selectedId } = taxSub
  //       if (selectedId)
  //         this.refsIds[subName][plural === tax ? plural : `${tax}Id`] = plural === tax ? [ selectedId ] : selectedId
  //     }
  //   })

  //   // return x
  // }

  get hooks () {
    return this.form.taxHooks
  }
}
