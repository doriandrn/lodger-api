import { RxDocument } from "rxdb"
import counters from './counters'

const counterUpdates = ({
  incDec,
  taxes,
  data,
  $taxonomies,
  plural
}) => {
  const { inc, dec } = counters(plural)

  return taxes.map(async (tax: Taxonomie) => {
    const id = data[`${tax}Id`] || data[tax]
    if (!id)
      throw new Error(`Missing ${tax} tax id (${id}) to update counters ${JSON.stringify({ taxes, data })}`)

    const isMultiple = typeof id === 'object' && id.length >= 1
    const { collection } = $taxonomies[tax.plural]

    const parentDocs = isMultiple ?
      await collection.findByIds(id) :
      await collection.findOne(id).exec()

    if (!parentDocs)
      throw new Error(`Missing parent(s) doc(s): ${ id } ${ tax }`)

    if (isMultiple) {
      if (parentDocs.size)
      await Promise.all(id.map(async _id => {
        const _doc = parentDocs.get(_id)
        await _doc.atomicUpdate(incDec ? inc : dec)
      }))
    } else {
      await parentDocs.atomicUpdate(incDec ? inc : dec)
    }
  })
}

export default {
  counters: function (hookName: string) {
    const { parents, $lodger: { $taxonomies }, plural } = this
    const incDec = hookName !== 'Remove'

    return async (data, $doc: RxDocument) => {
      if (hookName === 'Save' && !$doc._isTemporary)
        return

      await Promise.all(counterUpdates({
        incDec,
        taxes: parents,
        data,
        plural,
        $taxonomies
      }))
    }
  }
}
