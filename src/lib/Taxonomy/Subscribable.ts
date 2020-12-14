import Taxonomy, { TaxonomyCreator } from './'
import SubscribableTaxonomyError from '~/lib/Error'
import Subscriber from 'rxcollection-subscriber'
import { computed, reaction, observable } from 'mobx'
import merge from 'deepmerge'

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
    const {
      hooks,
      subscribers,
      plural,
      $lodger: {
        state,
        modal,
        taxonomies,
        $taxonomies,
        mainSubName
      }
    } = this

    if (subscribers[subscriberName])
      return
      // throw new LodgerError('Cannot subscribe - A subscriber with this name already exists!')

    const descriptor = `${subscriberName}-${taxonomies.indexOf(plural)}`
    const subState = state.subs[descriptor] ||
      Object.assign(state.subs, { [descriptor]: {} }) && state.subs[descriptor]
    const sub = this.subscribers[subscriberName] = new Subscriber(this.collection, merge(options, subState))

    if (this.parents && this.parents.length && !sub.refsIds) {
      sub.refsIds = observable({})
    }

    let allTaxes : Taxonomie[] = []

    const updateTaxes = (taxes: Taxonomie[], id : string, name: string) => {
      if (!taxes || !taxes.length)
        return

      if (!allTaxes.length)
        allTaxes = [ ...taxonomies ]

      taxes.map((tax: Taxonomie) => {
        const $tax = $taxonomies[tax] || $taxonomies[tax.plural]
        if (!$tax)
          return true

        if (allTaxes && allTaxes.length && allTaxes.indexOf(tax.plural) > -1) {
          allTaxes.splice(allTaxes.indexOf(tax.plural), 1)
        } else {
          return true
        }

        const { subscribers, parents, children } = $tax
        const taxSub = subscribers[subscriberName] ||
          subscribers[mainSubName]

        if (!taxSub) {
          console.error('Invalid subscriber requested', subscriberName, tax)
          return
        }

        let sOrP, op, val

        // deselect selected items of children
        if (taxSub.selectedId)
          taxSub.select(taxSub.selectedId)

        if (taxSub.refsIds) {
          if (parents && parents.length && (parents.indexOf(name) > -1 || parents.indexOf(name.plural) > -1)) {
            const isSingular = parents.indexOf(name) > -1
            sOrP = isSingular ? `${name}Id` : this.form.plural

            op = isSingular ? '$eq' : '$in'
            val = isSingular ? id : [id]

            taxSub.refsIds[sOrP] = val
          }
        }

        if (sOrP && op && val) {
          const filter = { [sOrP]: { [op]: val } }
          console.info('Settting filters on ', descriptor, filter)
          taxSub.criteria.filter = filter
        } else {
          if (taxSub.criteria.filter) {
            try {
              console.info('Deleting filter on', descriptor, sOrP)
              delete taxSub.criteria.filter[sOrP]
            } catch (e) {
              console.error('Could not delete filter', sOrP, 'on', tax, e)
            }

            if (Object.keys(taxSub.criteria.filter).length === 0) {
              console.info('Settting filter to NULL on', descriptor, Object.keys(taxSub.criteria.filter))
              taxSub.criteria.filter = null
            }
          }
        }

      })
    }

    if (hooks) {
      // Object.keys(hooks).map(hook => hooks[hook].bind(this))

      // run onEmpty hook
      if (hooks.empty) {
        await sub.updates
        if (!sub.ids.length)
          hooks.empty.call(this)
      }
    }

    reaction(() => sub.selectedId, (id) => {
      Object.assign(subState, { selectedId: id })
      if (subscriberName === 'single')
        return

      allTaxes = [] // has to be reset every time !
      updateTaxes(this.children, id, this.name)
    })

    // Trigger the modal on activeId change
    reaction(() => sub.activeId, async (id) => {
      Object.assign(subState, { activeId: id })
      if (!id) return
      const activeDoc = await this.collection.findOne(id).exec()
      modal.activeDoc = activeDoc
      Object.assign(modal, { sub })
    })

    reaction(() => ({ ...sub.criteria }), (criteria, prevCriteria) => {
      console.info('Criteria changed', criteria, prevCriteria)
      Object.assign(subState, { criteria: JSON.parse(JSON.stringify(criteria)) })
    })
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
