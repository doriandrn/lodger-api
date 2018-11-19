import Debug from 'debug'
const debug = Debug('lodger:CRUD')

const addDelete = (db, { commit, dispatch, getters }) => async ({ type, payload }) => {
  if (type.indexOf('/') < 0) return
  if (['ADAUGA', 'STERGE'].indexOf(String(type).split('/')[1]) < 0) return

  const what = String(type).split('/')[0] // added item type
  const col = db[defs.get(what)] // collection
  if (!col || !what) return

  // add = true, delete = false
  const add = type.indexOf('ADAUGA') > -1
  // debug('addOrDelete:add', add)
  debug(`Urmeaza sa ${add ? 'adauga' : 'sterg'} ${what}`)

  /**
   * ADD
   */
  if (add) {
    const newItem = await col[payload._id ? 'upsert' : 'insert']({ ...payload })
    if (!newItem) throw eroare('ceva a mers prost la adaugarea itemului')
    commit(`${what}/SET_ULTIM`, newItem._id)
    if (what === 'asociatie') dispatch('asociatie/schimba', newItem._id)
    if (what === 'incasare') {
      const incasData = { id: newItem._id, suma: newItem.suma }
      commit('asociatie/incaseaza', incasData)
      commit('apartament/incaseaza', Object.assign(incasData, { deLa: payload.deLa }))
    }
    debug('OK! Adaugat: ', newItem)
    const ss = `${what}.${payload._id ? 'updatat' : 'adaugat'}`
    const heading = `${ss}.h`
    // const text = `${ss}.p`
    const text = ''
    // selecteaza un item dupa ce a fost adaugat / updatat
    dispatch(`${what}/selecteaza`, payload._id || newItem._id)
    dispatch('notificare', {
      type: 'success',
      text: {
        heading,
        text
      }
    })
  } else {
    /**
    * DELETE
    */
    debug('PL', payload)
    const tobedel = await col.findOne(what === 'serviciu' ? { denumire: payload } : payload).exec()
    debug('de sters:', tobedel)
    if (!tobedel) throw eroare(`${what}.notFoundToBeDeleted`)
    await tobedel.remove()
    if (what === 'asociatie') asociatieActiva = null
    // TODO: notificare succes ca a fost sters
    debug('OK! Sters: ', col)
  }
  // await handleFollowingMutations(what, payload, newItem, store, add)
}

export default addDelete
