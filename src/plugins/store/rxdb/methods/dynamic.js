import { spleet } from '../../../../helpers/functions'

const DBMethods = db => async ({ type, payload }) => {
  if (type.indexOf('/') < 0) return
  const { what, mutation } = spleet(type)
  const col = db[defs.get(what)]
  if (!col || !what) return
  debug('DBMethod:', type, payload)
  debug('-> asociatieActiva', asociatieActiva)

  switch (what) {
    case 'asociatie':
      if (asociatieActiva) {
        if (typeof asociatieActiva[mutation] === 'function') {
          await asociatieActiva[mutation](payload)
          debug(`Executat DB method: asociatieActiva[${mutation}]; Parametri: `, payload)
        }
        if (mutation === 'EXPORT') {
          // TODO: fiecare colectie, nu doar asociatiile
          col.dump().then(json => {
            debug('exportez', json)
            // TODO: nu merge, JSON 2 YML
            const file = new File(JSON.stringify(json), 'export.lodger', { type: "text/json;charset=utf-8" })
            FileSaver.saveAs(file)
          })
        }
      }
      break

    case 'apartament':
      if (mutation === 'incaseaza') {
        const ap = await db.apartamente.findOne({ _id: payload.deLa }).exec()
        await ap.incaseaza(payload)
        debug('Incasat si la apartament')
      }
      break
  }
}

export default DBMethods
