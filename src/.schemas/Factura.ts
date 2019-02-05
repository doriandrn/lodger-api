type DistribuirePeApartamente = object

type Distribuire = {
  mod: DistribuirePeApartamente,
  apartamente: Apartament[]
}

declare global {
  interface Factura {
    suma: Bani
    nrFactura  ?: number
    dataScadenta ?: Date
    distribuire ?: Distribuire

    furnizorId: string
    asociatieId: string

  }
}

const fields: FieldCreator<Factura>[]  = [
  {
    id: 'furnizorId', //aka DE LA
    required: true,
    type: 'search',
    ref: 'furnizori'
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
    id: 'nrFactura',
    type: 'number',
    default: 1,
    index: true,
    value: getters => Number(getters['asociatie/nrUltimaChitanta'] || 0) + 1
  },
  {
    id: 'dataScadenta',
    type: 'date',
    showInList: 'secondary'
  },
  // {
  //   id: 'moneda',
  //   notInForm: true,
  //   required: true,
  //   value: getters => getters['asociatie/moneda']
  // },

  {
    id: 'asociatieId',
    notInForm: true,
    required: true,
    index: true,
    value: (g) => g['asociatie/active'] || g['asociatie/selected']
  }
]

const plural = 'facturi'

export {
  fields,
  plural
}
