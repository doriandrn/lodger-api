/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  type Distribuire = {
    [apartamentId: string]: {
      suma: Money,
      procent: number
    }
  }

  interface Cheltuiala {
    denumire: string,
    catre: Furnizor,
    suma: Money,
    facturi: Factura[],
    dataScadenta: Date,
    distribuire: Distribuire
    proiect: string

    readonly apartamenteEligibile: []
    readonly asociatieId: string
  }
}

const fields: FieldsCreator<Cheltuiala> = {
  asociatieId: {
    ref: 'asociatii',
    required: true,
    index: true,
  },
  denumire: {
    preview: 0
  },
  proiect: {
    preview: 3,
    index: true
  },
  dataScadenta: {
    type: 'dateTime',
    preview: 0,
  },
  catre: {
    type: 'string',
    ref: 'furnizori'
  },
  facturi: {
    type: 'search',
    ref: 'facturi',
    // required: true TODO: e necesar? ?????????
  },
  suma: {
    type: '$',
    required: true,
    index: true,
    preview: 1,
  },
  distribuire: {
    type: 'distribuire'
  },
  apartamenteEligibile: {
    type: 'selApartamente',
    options: ({ getters }) => getters['asociatie/apartamente']
  }
}

export {
  fields
}
