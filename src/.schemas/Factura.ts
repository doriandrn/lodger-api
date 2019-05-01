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

const fields: FieldsCreator<Factura>  = {
  suma: {
    type: 'bani',
    showInList: 'primary',
    index: true,
    required: true,
    label: 'defaults.sum'
  },
  nrFactura: {
    type: 'number',
    default: 1,
    index: true,
    value: g => Number(g.nrUltimaChitanta || 0) + 1
  },
  dataScadenta: {
    type: 'date',
    showInList: 'secondary'
  },

  furnizorId: {
    required: true,
    type: 'search',
    ref: 'furnizori'
  },

  asociatieId: {
    required: true,
    index: true,
    value: (g) => g['asociatie/active'] || g['asociatie/selected']
  }
}

export {
  fields
}
