import Vue from 'vue'
import deepEqual from 'deep-equal'
import { Taxonomy } from "./Taxonomy"

type Unwatcher = Function

interface LodgerSubscriber {
  data: SubscriberData
  criteriu: Criteriu

  new (
    name: string,
    taxonomy: Taxonomy,
    criteriu?: Criteriu
  ): Unwatcher
}

/**
 * Empty instance of a Subscriber Data holder item
 */
const emptySubscriberData: SubscriberData = {
  docs: [],
  items: {},
  criteriu: {},
  fetching: false
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
export class Subscriber implements LodgerSubscriber {
  data: SubscriberData
  criteriu: Criteriu

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
    this.data = R[name][plural]
    this.criteriu = criteriu || taxonomy.config.criteriu

    if (R[name][plural]) {
      R[name][plural].fetching = true
      return
    }

    Vue.set(R[name], plural, Object.assign({}, emptySubscriberData))

    // Skip taxonomies with multiple select
    if (taxonomy.isMultipleSelect) return

    const everyKeyInCriteriu: { [key in CriteriuKeys]: any } = (vm: Vue): Criteriu => ({ ...vm.subsData[name][plural].criteriu })

    return this.$watch(everyKeyInCriteriu, (newC: Criteriu, oldC: Criteriu) => {
      if (!newC || deepEqual(newC, oldC) ) return
      taxonomy.subscribe(newC, name)
    }, { deep: true, immediate: false })
  }
}
