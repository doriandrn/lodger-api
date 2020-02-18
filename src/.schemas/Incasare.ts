/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  interface Incasare extends LodgerDocument {
    suma: Money,
    nrChitanta: number

    apartamentId: string
    blocId: string
    asociatieId: string
  }
}

const fields: FieldsCreator<Incasare> = {
  suma: {
    type: '$',
    showInList: 'primary',
    index: true,
    required: true
  },
  nrChitanta: {
    type: 'number',
    default: 1,
    index: true,
    value: ({ activeDoc }) => (activeDoc.nrUltimaChitanta || 0) + 1
  },

  //aka DE LA
  apartamentId: {
    required: true,
    type: 'search',
    ref: 'apartamente'
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
  }
}

export {
  fields
}
