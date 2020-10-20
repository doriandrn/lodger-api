/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

type DistribuirePeApartamente = object

type Distribuire = {
  mod: DistribuirePeApartamente,
  apartamente: Apartament[]
}

declare global {
  interface Factura {
    suma: Money
    nrFactura  ?: number
    dataScadenta ?: Date
    distribuire ?: Distribuire

    furnizorId: string
    asociatieId: string

  }
}

const fields: FieldsCreator<Factura>  = {
  suma: {
    type: '$',
    preview: 0,
    index: true,
    required: true
  },
  nrFactura: {
    type: 'number',
    search: true,
    default: 1,
    index: true,
    value: g => Number(g.nrUltimaChitanta || 0) + 1
  },
  dataScadenta: {
    type: 'date',
    preview: 1
  },

  furnizorId: {
    required: true,
    type: 'search',
    ref: 'furnizori'
  },

  asociatieId: {
    required: true,
    index: true,
    value: (g) => g['asociatie/active'] || g['asociatie/selected']
  }
}

export {
  fields
}
