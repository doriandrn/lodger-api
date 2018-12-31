
import { predefinite } from 'forms/serviciu'
import { LodgerError } from '~/lib/Errors'

import { RxDocument, isRxDocument } from 'rxdb'

const subscribedTaxes: Taxonomie[] = []



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
