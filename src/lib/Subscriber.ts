import Vue from 'vue'
import deepEqual from 'deep-equal'
import { RxDocument } from 'rxdb'
import { Taxonomy } from "./Taxonomy"
import R from './R'

type Unwatcher = Function

interface LodgerSubscriber<T extends Taxonomie> {
  docs: RxDocument<T>[],
  items: {},
  fetching: boolean
  criteriu: Criteriu
  readonly ids: string[]

  selected: RxDocument<T>[] | undefined

  new (
    name: string,
    taxonomy: Taxonomy,
    criteriu?: Criteriu
  ): Unwatcher
}

type Find = {} | null

type Criteriu = {
  limit?: number,
  index?: number,
  sort?: SortOptions,
  filter?: FilterOptions,
  find?: Find
}

// type CriteriuKeys = keyof Criteriu


/**
 * Creates a new subscriber for a specific taxonomy
 *
 * @class Subscriber
 * @implements {LodgerSubscriber}
 * @requires Vue
 */
export class Subscriber implements LodgerSubscriber<Taxonomie> {
  docs = []
  items = {}
  fetching = false
  readonly ids: string[]

  criteriu: Criteriu = {}
  selected: RxDocument<Taxonomie>[] | undefined

  /**
   * Creates an instance of Subscriber.
   *
   * @param {string} name - eg. 'registru'
   * @param {Taxonomy} taxonomy
   * @param {Criteriu} criteriu - initial sort / filter criteria if it shall not use the default one
   * @memberof Subscriber
   *
   * @returns {Unwatcher} unwatch
   */
  constructor (
    name: string, // subscriber name
    taxonomy: Taxonomy,
    criteriu?: Criteriu
  ) {
    const { plural } = taxonomy
    const holder = R.subsData[name][plural]

    if (holder) {
      holder.fetching = true
      return
    }

    this.docs = holder.docs
    this.items = holder.items
    this.fetching = holder.fetching
    this.ids = holder.ids(plural, name)

    this.criteriu = criteriu || taxonomy.config.criteriu

    // Vue.set(R[name], plural, Object.assign({}, emptySubscriberData))

    // Skip taxonomies with multiple select
    if (taxonomy.isMultipleSelect) return

    const everyKeyInCriteriu: { [key in keyof Criteriu]: any } = (vm: Vue): Criteriu => ({ ...vm.subsData[name][plural].criteriu })

    return holder.$watch(everyKeyInCriteriu, (newC: Criteriu, oldC: Criteriu) => {
      if (!newC || deepEqual(newC, oldC) ) return
      taxonomy.subscribe(newC, name)
    }, { deep: true, immediate: false })
  }
}
