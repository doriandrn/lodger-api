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
    balanta: Money

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

const fieldsets = ['descriere', 'localizare', 'registru']

const fields: FieldsCreator<Apartament> = {
  nr: {
    type: 'number',
    search: true,
    default: async function (data) {
      if (!data.blocId)
        return 1

        const bloc = await this.blocuri.getDocument(data.blocId)
      return ( bloc.state.ultimulApNr || 0 ) + 1
    },
    required: true,
    index: true,
    preview: 0,
  },
  proprietar: {
    type: 'fullName',
    search: true,
    placeholder: 'Ion Barbu',
    oninput: {
      transform: 'capitalize'
    },
    preview: 1,
    v: 'alpha_spaces|max:32',
  },
  suprafata: {
    fieldset: 0,
    type: 'number',
    default: null, // TODO: ia de la apartamentul de la etajul de dedesubt, in functie de cate ap sunt
    step: 0.01,
  },
  locatari: {
    fieldset: 0,
    index: true,
    type: 'number',
    default: 2,
    min: 0,
    max: 10,
  },
  camere: {
    fieldset: 0,
    type: 'number',
    index: true,
    default: 2,
    max: 12,
    min: 1,
  },
  etaj: {
    fieldset: 1,
    type: 'number',
    required: true,
  },
  blocId: {
    required: true,
    fieldset: 1,
    ref: 'bloc'
  },
  asociatieId: {
    required: true,
    fieldset: 1,
    ref: 'asociatie'
  },
  scara: {
    fieldset: 1,
    type: 'number',
    required: true,
  },
  balanta: {
    type: '$',
    default: null,
    required: true,
    preview: 2,
    index: true
  },
  contoare: {
    type: 'contoare'
  },
  incasari: {
    type: 'array',
    ref: 'incasari',
    fieldset: 2,
  },
  cheltuieli: {
    type: 'array',
    ref: 'cheltuieli',
    fieldset: 2,
  },
}

// const methods = {
//   async incaseaza (data: Incasare) {
//     if (!this.balanta) this.balanta = 0
//     let incasari = this.incasari || []
//     this.balanta += data.suma
//     incasari.push(data._id)
//     this.incasari = incasari
//     await this.save()
//   }
// }

const hooks = {
  postInsert: ($ldg) => async (data, $doc) => {
    const bloc = await $ldg.blocuri.collection.findOne(data.blocId).exec()
    bloc.atomicUpdate(docd => {
      docd.state.ultimulApNr = data.nr
      return docd
    })
    return $doc
  }
}

export {
  // methods,
  hooks,
  fields,
  fieldsets
}
