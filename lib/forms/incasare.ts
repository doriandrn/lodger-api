import { Getter } from 'vuex'
const gi = `incasare/activeDoc`

const fields: Fields = [
  {
    id: 'apartamentId', //aka DE LA
    required: true,
    type: 'search',
    ref: 'apartamente'
  },
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
    value: getters => Number(getters['incasare/activeDoc'].nrUltimaChitanta || 0) + 1
  },
  {
    id: 'moneda',
    notInForm: true,
    required: true,
    value: getters => getters['incasare/activeDoc'].moneda
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
