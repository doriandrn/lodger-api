import { Getter } from 'vuex'

/**
 * Monede
 *
 * @enum {number}
 */
enum Monede {
  RON, EUR, USD
}

interface Incasare {
  suma: Bani,
  nrChitanta: number
  moneda: Monede

  apartamentId: ID<Apartament>
  blocId: ID<Bloc>
  asociatieId: ID<Asociatie>
}


const fields: Fields<Incasare> = [
  {
    id: 'suma',
    type: 'bani',
    showInList: 'primary',
    index: true,
    required: true,
    label: 'defaults.sum'
  },
  {
    id: 'nrChitanta',
    type: 'number',
    default: 1,
    index: true,
    value: ({ activeDocument }) => (activeDocument.nrUltimaChitanta || 0) + 1
  },
  {
    id: 'moneda',
    notInForm: true,
    required: true,
    value: ({ activeDocument }) => activeDocument.moneda
  },

  {
    id: 'apartamentId', //aka DE LA
    required: true,
    type: 'search',
    ref: 'apartamente'
  },
  // ASTEA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
  // TREBUIE SA FIGUREZE
  /// !!!!!!!!!!!!!!!!
  {
    id: 'blocId',
    notInForm: true,
    required: true,
    index: true,
    value: (g: Getter<AsociatieState, RootState>) => g['bloc/selected'].id
  },
  {
    id: 'asociatieId',
    notInForm: true,
    required: true,
    index: true,
    value: (g: Getter<AsociatieState, RootState>) => g['asociatie/selected'].id
  }
]

const actions = {
  confirm: 'incaseaza'
}

const plural = 'incasari'

export {
  fields,
  actions,
  plural
}
