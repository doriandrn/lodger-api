declare global {
  type Bani = {
    suma: number
    moneda: Monede
  }

  interface Cheltuiala {
    catre: Furnizor,
    suma: Bani,
    dataScadenta: Date,
    distribuire: Distribuire

    readonly apartamenteEligibile: []
  }
}


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
