/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  interface Incasare extends LodgerDocument {
    denumire: string
    suma: Money
    nrChitanta: number

    apartamentId: string
    blocId: string
    asociatieId: string

    proiect: string
    plata: Plata
  }
}

const fields: FieldsCreator<Incasare> = {
  denumire: {
    preview: 0
  },
  suma: {
    type: '$',
    preview: 1,
    index: true,
    required: true
  },
  nrChitanta: {
    type: 'number',
    default: 1,
    preview: 0,
    index: true,
    value: ({ activeDoc }) => (activeDoc.nrUltimaChitanta || 0) + 1
  },
  proiect: {
    preview: 3,
    index: true
  },

  //aka DE LA
  apartamentId: {
    required: true,
    type: 'search',
    ref: 'apartamente',
    preview: 2
  },

  // ASTEA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
  // TREBUIE SA FIGUREZE
  /// !!!!!!!!!!!!!!!!
  blocId: {
    required: true,
    index: true,
    value: (g) => g['bloc/selected'].id
  },
  asociatieId: {
    required: true,
    index: true,
    value: (g) => g['asociatie/selected'].id
  },

  plata: {
    type: 'object',
    default: () => ({
      metoda: 'fiat:banca',
      // metoda: 'crypto:nano',
      valoare: {
        suma: 101.23,
        moneda: 'RON'
      },
      achitata: {
        status: false,
        la: 0
      }
    })
  }
}

export {
  fields
}
