import Vue from 'vue'
import deepEqual from 'deep-equal'
import { predefinite } from 'forms/serviciu'
import { LodgerError } from '~/lib/Errors'
import { taxIsMultipleSelect } from '~/lib/helpers/functions'
import { RxDocument, isRxDocument } from 'rxdb'

const subscribedTaxes: Taxonomie[] = []

/**
 * More like a schema of a simple holder item
 */
const vueHelperObj: SubscriberData = {
  docs: [],
  items: {},
  criteriu: {},
  fetching: false
}

/**
 * Inits a subscriber
 *
 * Creates the el in
 *
 * @param subscriberName
 * @param taxonomy
 *
 * @returns {Function<SubscrberUnwatcher>} unwatch
 */
export function initSubscriber (
  subscriberName: string,
  taxonomy: Plural<Taxonomie>,
  subscribe: LodgerSubscriber
) {
  if (!this)
    throw new LodgerError('Could not init subscriber - invalid this %%', subscriberName)

  if (this[subscriberName][taxonomy]) {
    this[subscriberName][taxonomy].fetching = true
    return
  }

  let unwatch

  Vue.set(this[subscriberName], taxonomy, Object.assign({}, vueHelperObj))

  // add watcher for criteriu and when it changes
  // fire this subscribe func again
  if (!taxIsMultipleSelect(taxonomy)) {
    const everyKeyInCriteriu: { [key in CriteriuKeys]: any } = (vm: Vue): Criteriu => ({ ...vm.subsData[subscriberName][plural].criteriu })

    unwatch = this.$watch(everyKeyInCriteriu, (newC: Criteriu, oldC: Criteriu) => {
      if (!newC || deepEqual(newC, oldC) ) return
      subscribe(taxonomy, newC, subscriberName)
    }, { deep: true, immediate: false })
  }

  return unwatch
}

/**
 * FIrst time init hook for a taxonomy
 * @param param0
 */
export async function initialSubscribe ({ taxonomie, plural, collections, store }) {
  // const debug = Debug('lodger:initialSubscribe')
  switch (taxonomie) {
    // insert predefined services
    case 'serviciu':
      predefinite.forEach(async denumire => { await collections[plural].insert({ denumire }) })
      break

    // insert admin user
    case 'utilizator':
      const { _id } = await collections[plural].insert({
        name: 'Administrator',
        rol: 'admin'
      })
      store.dispatch('utilizator/set_active', _id)
      break
  }

  subscribedTaxes.push(taxonomie)
}

// Filters the documents array for the one with the id
export const getRxDocumentById = (docs: RxDocument<Taxonomie, any>[], id: string) => {
  if (!docs.length)
    throw new LodgerError('Empty docs provided: %%')
  const doc = docs.filter(doc => doc._id === id)[0]
  if (!(doc && isRxDocument(doc)))
    throw new LodgerError('No document found %%', { id })
  return doc
}
