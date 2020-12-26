/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  type Distribuire = {
    [apartamentId: string]: number
  }

  interface Cheltuiala {
    denumire: string,
    catre: Furnizor,
    suma: Money,
    dataScadenta: Date

    modDistribuire: number

    readonly distribuire: Distribuire
    readonly snapshotsApartamente: {}
    readonly asociatieId: string
    readonly state: {
      progres: number
    }

    distribuie: () => Distribuire
  }
}

const fields: FieldsCreator<Cheltuiala> = {
  asociatieId: {
    ref: 'asociatii',
    required: true,
    index: true,
    final: true
  },
  denumire: {
    preview: 0,
    search: true
  },
  dataScadenta: {
    type: 'dateTime',
    final: true,
    preview: 0,
    default: () => new Date().getTime() + 2629743830 // 1mo
  },
  catre: {
    final: true,
    required: true,
    ref: 'furnizori'
  },
  suma: {
    type: '$',
    required: true,
    index: true,
    preview: 1,
    final: true
  },
  modDistribuire: {
    type: 'number',
    default: 0,
    final: true,
    options: ['suprafata', 'locatari', 'contor', 'custom']
  },
  distribuire: {
    final: true,
    type: 'selApartamente',
    ref: 'apartamente',
    default: () => ({})
  },
  snapshotsApartamente: {
    final: true,
    type: 'object',
    default: () => ({})
  }
}

const methods = {
  /**
   * Distribuie suma la apartamente dupa ids si mod
   * @param suma
   * @param ids
   * @param mod
   */
  distribuie: function (valoare: number, ids: string[], mod : number = 0) {
    if (valoare === undefined || ids === undefined)
      return

    const sub = this.apartamente.subscribers[`single-cheltuiala`]
    const { items } = sub

    const distrKey = fields.modDistribuire.options[mod]
    const allUnits = ids.reduce((a, b) => a + items[b][distrKey], 0)
    const cpu = Number(valoare) / allUnits

    return ids.reduce((a, b) => ({ ...a, [b]: items[b][distrKey] * cpu }), {})
  },

  /**
   * Snapshots aps as they are before doing a transaction
   *
   * @param ids
   */
  ssAps: function (ids: string[]) {
    const { apartamente } = this
    const sub = apartamente.subscribers[`single-cheltuiala`]
    const { items } = sub

    return ids
      .reduce((a, b) => ({
        ...a,
        [b]: apartamente.form.fieldsIds
          .reduce((x, y) => ({
            ...x,
            [y]: items[b]._doc ? items[b]._doc._data[y] : apartamente.data[b]._doc._data[y]
          }), {})
      }), {})
  }
}

export {
  fields,
  methods
}
