import Vue from 'vue'
import deepEqual from 'deep-equal'
import { RxDocument } from 'rxdb'
import { Taxonomy } from "./Taxonomy"
import SubscriberError from './Error'
import R from './R'

type Unwatcher = Function

/**
 *
 *
 * @interface LodgerSubscriber
 * @template T
 */
interface LodgerSubscriber<T extends Taxonomie> {
  name: string

  docs: RxDocument<T>[]
  items: {}
  fetching: boolean
  selected: RxDocument<T>[] | undefined
  readonly ids: string[]

  criteriu: Criteriu
  subscribe (): Unwatcher
}

type Criteriu = {
  limit?: number,
  index?: number,
  sort?: SortOptions,
  filter?: FilterOptions
}

/**
 * Creates a new subscriber for a specific taxonomy
 *
 * @class Subscriber
 * @implements {LodgerSubscriber}
 * @requires Vue,R
 */
export class Subscriber<N extends Taxonomie> implements LodgerSubscriber<N> {
  docs = []
  items = {}
  fetching = false
  readonly ids: string[]

  criteriu: Criteriu = {}
  selected: RxDocument<N>[] | undefined

  _reference: any
  _subscribed: Boolean = false

  /**
   * Creates an instance of Subscriber.
   *
   * @param {string} name - eg. 'registru'
   * @param {Taxonomy} taxonomy
   * @param {Criteriu} criteriu - initial sort / filter criteria if it shall not use the default one
   * @memberof Subscriber
   */
  constructor (
    readonly name: string, // subscriber name
    protected taxonomy: Taxonomy
  ) {
    // define the subscriber if it doesn't exist
    if (!R.subsData[name])
      Vue.set(R.subsData, name, {})

    // call first time hooks.
    if (!taxonomy.subscribed) {
      this.criteriu = taxonomy.config.criteriu
      this.firstInitHook()
    }

    // Skip taxonomies with multiple select
    if (taxonomy.isMultipleSelect) return

    this.init()
  }

  /**
   * Helper to get R's criteria keys to pass in to watcher
   *
   * @readonly
   * @type {{ [key in keyof Criteriu]: any }}
   * @memberof Subscriber
   */
  get everyKeyInCriteriu (): { [key in keyof Criteriu]: any } {
    return (vm: Vue): Criteriu => ({ ...vm.subsData[name][plural].criteriu })
  }

  /**
   * Init function
   *
   * @memberof Subscriber
   */
  init () {
    const holder = R.subsData[name][plural]

    if (holder) {
      holder.fetching = true
      return
    }

    this.docs = holder.docs
    this.items = holder.items
    this.fetching = holder.fetching

    holder.criteriu =
    this.criteriu = holder.criteriu

    this.ids = holder.ids(plural, name)

    holder.$watch(everyKeyInCriteriu, (newC: Criteriu, oldC: Criteriu) => {
      if (!newC || deepEqual(newC, oldC) ) return
      this.subscribe(newC)
    }, { deep: true, immediate: false })
  }

  /**
   * Assign this defaults as reactives
   *
   * @memberof Subscriber
   */
  firstInitHook () {
    Vue.set(R[this.name], this.plural, Object.assign({}, { ...this }))
  }

  /**
   * (re)Subscribes with given Criteria
   *
   * @param {Criteriu} [criteriu]
   * @memberof Subscriber
   */
  subscribe (criteriu: Criteriu = this.criteriu) {
    if (criteriu) this.criteriu = criteriu
    const { name, taxonomy: { collection, plural } } = this
    let { limit, index, sort, find } = criteriu
    const paging = Number(limit || 0) * (index || 1)

    this._reference = collection
      .find(find)
      .limit(paging)
      .sort(sort)
      .$
      .subscribe(async (changes: RxDocument<any>[]) => {
        // DO NOT RETURN IF NO CHANGES!!!!!!!
        // debug(`${plural} for subscriber[${subscriberName}]`, changes)
        const data = R.subsData[name][plural]
        const selectedId = this.selected ? this.selected._id : undefined

        // update data objects inside
        data.docs = changes.map(change => Object.freeze(change)) || []
        data.items = Object.assign({},
          ...changes.map((item: RxDocument<Taxonomie>) => ({ [item._id]: item._data }))
        )

        try {
          const doc = data.items[selectedId] ?
            changes.filter(change => change._id === selectedId)[0] :
            await collection.findOne(selectedId)
          this.selected = doc
        } catch (e) {
          // an invalid ID was provided,  maybe?
          throw new SubscriberError('invalid ID supplied', { plural, selectedId })
        }

        data.fetching = false
        if (!this._subscribed) this._subscribed = true
      })
  }
}
