/**
 * Monede
 *
 * @enum {number}
 */
enum Monede {
  RON, EUR, USD
}

declare global {
  interface Incasare {
    suma: Bani,
    nrChitanta: number
    moneda: Monede

    apartamentId: string
    blocId: string
    asociatieId: string
  }
}

const fields: FieldCreator<Incasare> = {
  suma: {
    type: 'bani',
    showInList: 'primary',
    index: true,
    required: true,
    label: 'defaults.sum'
  },
  nrChitanta: {
    type: 'number',
    default: 1,
    index: true,
    value: ({ activeDocument }) => (activeDocument.nrUltimaChitanta || 0) + 1
  },

  //aka DE LA
  apartamentId: {
    id: 'apartamentId',
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
    value: (g: Getter<AsociatieState, RootState>) => g['bloc/selected'].id
  },
  asociatieId: {
    required: true,
    index: true,
    value: (g: Getter<AsociatieState, RootState>) => g['asociatie/selected'].id
  }
}

export {
  fields
}
