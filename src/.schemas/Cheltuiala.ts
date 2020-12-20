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
    modDistribuire: Distribuire
    proiect: string
    snapshotsApartamente: {}

    readonly distribuire: []
    readonly asociatieId: string
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
  // proiect: {
  //   preview: 3,
  //   index: true
  // },
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
  // progres: {
  //   type: 'meter',
  //   default: 0,
  //   freezed: true
  // },
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
    default: () => ({})
  },
  snapshotsApartamente: {
    final: true,
    type: 'object',
    default: () => ({})
  }
}

export {
  fields
}
