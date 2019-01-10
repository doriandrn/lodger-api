import Vue from 'vue'
import Component from 'vue-class-component'
import deepEqual from 'deep-equal'
import { RxDocument, RxCollection, RxLocalDocument, RxDocumentBase } from 'rxdb'
import { Subscription } from 'rxjs

type Criteriu = {
  limit?: number,
  index?: number,
  sort?: SortOptions,
  filter?: FilterOptions
}

type SubscriberData<N extends Taxonomie> = {
  readonly documents: RxDocument<N>[]
  readonly items ?: { [k: string]: N }
  readonly ids: string[]
}

interface SubscriberHolder<N extends Taxonomie> extends SubscriberData<N> {
  criteriu: Criteriu
  readonly fetching: boolean

  subscribe (criteriu ?: Criteriu): Subscription
}

/**
 * Main holder for temporary items subscribed to
 * RENDERLESS Vue Component
 *
 * -> a vue helper for reactivity
 * holds RX documents
 * and methods to accezss / manipulate them
 *
 * @export
 * @returns {Vue} data holder object
 */
@Component({
  watch: {
    criteriu (newC: Criteriu, oldC: Criteriu) {
      if (!newC || deepEqual(newC, oldC) ) return
      this.subscribe(newC)
    }
  },
  props: {
    taxonomy: {
      type: Object
    }
  }
})
export default class R<N extends Taxonomie> extends Vue implements SubscriberHolder<N> {
  documents: RxDocument<N>[] = [] // main data holder
  fetching = false // refreshing data indicator
  criteriu: Criteriu = {} // criteria. watched deep.

  subscribed?: boolean
  collection?: RxCollection

  get items () {
    return Object.assign({},
      ...this.documents
        .map(item => ({ [item._id]: item._data }))
    )
  }

  get ids () { return Object.keys(this.items) }

  get activeDoc () { return }
  get selectedDoc () { return }

  /**
   * (re)Subscribes with given Criteria
   * happens internaly when criteriu is changed
   *
   * @param {Criteriu} [criteriu]
   * @memberof Subscriber
   */
  protected subscribe (criteriu: Criteriu) {
    const { limit, index, sort, filter } = criteriu
    const paging = Number(limit || 0) * (index || 1)

    return this.collection
      .find(filter)
      .limit(paging)
      .sort(sort)
      .$
      .subscribe((changes: RxDocument<any>[]) => {
        // DO NOT RETURN IF NO CHANGES!!!!!!!

        // update data objects inside
        this.documents = changes.map(change => Object.freeze(change))
        this.fetching = false
        if (!this.subscribed) this.subscribed = true
      })
  }
}
