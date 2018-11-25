/**
 * o cheltuiala = parte dintr-o factura
 */

const fields = [
  {
    id: 'asociatieId',
    ref: 'asociatii',
    required: true,
    index: true,
  },
  {
    id: 'facturi',
    type: 'search',
    taxonomy: 'facturi',
    ref: 'facturi',
    // required: true TODO: e necesar? ?????????
  },
  {
    id: 'suma',
    type: 'bani',
    required: true,
    index: true,
    showInList: 'secondary'
  },
  {
    id: 'moneda',
    notInForm: true,
    required: true,
    showInList: 'secondary',
    value: getters => getters['asociatie/activa'].moneda
  },
  {
    id: 'modDistribuire',
    type: 'distribuire'
  },
  {
    id: 'apartamenteEligibile',
    type: 'selApartamente',
    options: getters => getters['asociatie/apartamente']
  },

]

const plural = 'cheltuieli'

export {
  plural,
  fields
}
