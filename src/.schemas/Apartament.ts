/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  /**
   *
   *
   * @interface Apartament
   */
  interface Apartament extends LodgerDocument {
    nr : number
    balanta: Bani

    proprietar ?: string
    suprafata ?: number
    locatari ?: number
    camere ?: number
    etaj ?: number
    scara ?: number | string
    contoare ?: Contor[]

    incasari ?: Incasare[]
    cheltuieli ?: Cheltuiala[]

    blocId: string
    asociatieId: string
  }

  interface ApartamentAPI {
    incaseaza (): void
  }
}

const selectedApGetter = 'apartament/activeDoc'

const fields: FieldsCreator<Apartament> = {
  nr: {
    type: 'number',
    default: g => {
      //TODO: numerotare pentru hoteluri, 101 et 1, 201 et 2
      const { apartamente } = g['bloc/activeDoc']
      if (!apartamente || !apartamente.length) return 1

      // TODO: asta e pt hoteluri, daca toate ap de pe etaj la scara
      const sortate = apartamente
        .map(ap => g.apartamente[ap].nr)
        .sort((a, b) => Number(a) - Number(b))
        .reverse()

      return sortate[0] + 1
    },
    value: g => g[selectedApGetter].nr,
    required: true,
    index: true,
    showInList: 'secondary'
  },
  proprietar: {
    placeholder: 'Ion Barbu',
    oninput: {
      transform: 'capitalize'
    },
    showInList: 'primary',
    v: 'alpha_spaces|max:32',
    value: g => g[selectedApGetter].proprietar
  },
  suprafata: {
    type: 'number',
    showInList: ['details'],
    default: null, // TODO: ia de la apartamentul de la etajul de dedesubt, in functie de cate ap sunt
    step: 0.01,
    value: g => g[selectedApGetter].suprafata
  },
  locatari: {
    index: true,
    type: 'number',
    showInList: ['details'],
    default: 2,
    min: 0,
    max: 10,
    value: g => g[selectedApGetter].locatari
  },
  camere: {
    type: 'number',
    index: true,
    showInList: ['details'],
    default: 2,
    max: 12,
    min: 1,
    value: g => g[selectedApGetter].camere
  },
  etaj: {
    type: 'number',
    required: true,
    default: g => g['etaj/selectat'].etaj,
    value: g => g[selectedApGetter].etaj
  },
  blocId: {
    required: true,
    default: g => g['etaj/selectat'].bloc,
    value: g => g[selectedApGetter].bloc
  },
  asociatieId: {
    required: true,
    default: g => g['asociatie/activeDoc']._id,
    value: g => g['asociatie/activeDoc']._id
  },
  scara: {
    type: 'number',
    required: true,
    default: g => g['etaj/selectat'].scara,
    value: g => g[selectedApGetter].scara
  },
  balanta: {
    type: 'bani',
    default: null,
    required: true,
    showInList: ['details'],
    index: true,
    value: g => g[selectedApGetter].balanta
  },
  contoare: {
    type: 'contoare',
    showInList: ['details'],
    value: g => g[selectedApGetter].contoare
  },
  incasari: {
    type: 'array',
    ref: 'incasari'
  },
  cheltuieli: {
    type: 'array',
    ref: 'cheltuieli'
  }
}

const methods = {
  async incaseaza (data: Incasare) {
    if (!this.balanta) this.balanta = 0
    let incasari = this.incasari || []
    this.balanta += data.suma
    incasari.push(data._id)
    this.incasari = incasari
    await this.save()
  }
}

export {
  methods,
  fields
}
