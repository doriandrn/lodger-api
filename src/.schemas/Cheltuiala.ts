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
    progres: number,
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
    preview: 0,
    search: true
  },
  // proiect: {
  //   preview: 3,
  //   index: true
  // },
  dataScadenta: {
    type: 'dateTime',
    preview: 0,
    default: () => new Date().getTime() + 2629743830 // 1mo
  },
  catre: {
    type: 'string',
    ref: 'furnizori'
  },
  progres: {
    type: 'number',
    default: 0
  },
  // facturi: {
  //   type: 'search',
  //   ref: 'facturi',
  //   // required: true TODO: e necesar? ?????????
  // },
  suma: {
    type: '$',
    required: true,
    index: true,
    preview: 1,
  },
  distribuire: {
    type: 'distribuire',
    default: 0,
    options: ['suprafata', 'locatari', 'contor', 'custom']
  },
  apartamenteEligibile: {
    type: 'selApartamente'
  }
}

export {
  fields
}
