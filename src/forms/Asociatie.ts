import { RxDocument } from "rxdb";

declare global {
  type Organizatie = {
    nume: string,
    cif?: number,
    rocif?: boolean
  }

  /**
   * Taxonomy: Asociatie
   *
   * @interface Asociatie
   */
  interface Asociatie {
    _id: string
    name: string

    servicii: Serviciu[]
    organizatie?: Organizatie,
    utilizatori?: Utilizator[]
    furnizori?: Furnizor[]
    tranzactii?: Tranzactie[]
    incasari?: Incasare[]

    readonly administratori: Utilizator[]
    readonly balanta: Bani

    preferinte: {
      moneda: string

      sfarsitLuna: number
      genereazaListeAutomat: boolean

      filtre: {
        [k: Taxonomie]: {
          [f: string]: any
        }
      }
    }

    initBalanta (): void
    incaseaza (incasare: Incasare): Promise<RxDocument<Incasare>>
    toggleServiciu: (serviciu: ID<'Serviciu'>) => void
  }
}

const plural = 'asociatii'

const fields: FieldCreator<Asociatie>[] = [
  {
    id: 'name',
    required: true,
    focus: true,
    index: true,
    showInList: 'primary',
    value: ({ activeDoc }) => activeDoc.name,
    v: 'max:32|min:3',
    oninput: { transform: 'capitalize' }
  },
  {
    id: 'organizatie',
    type: 'object',
    value: ({ activeDoc }) => activeDoc.organizatie
    // v: 'ro=cif|en=ssn', //TODO: stringu e doar de demo -> implement cif validation
  },
  {
    id: 'moneda',
    required: true
  },
  {
    id: 'balanta',
    type: 'number',
    value: ({ activeDoc }) => activeDoc.balanta,
    showInList: ['details']
  },
  {
    id: 'incasari',
    type: 'array',
    ref: 'incasari',
    value: ({ activeDoc }) => activeDoc.incasari,
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'utilizatori',
    type: 'array',
    ref: 'utilizatori',
    value: ({ activeDoc }) => activeDoc.utilizatori,
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'servicii',
    type: 'array',
    ref: 'servicii',
    value: ({ activeDoc }) => activeDoc.servicii,
    showInList: 'secondary',
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'furnizori',
    type: 'array',
    ref: 'furnizori',
    value: ({ activeDoc }) => activeDoc.furnizori,
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'filtreCheltuieli',
    value: ({ activeDoc }) => activeDoc.filtreCheltuieli,
    type: 'array',
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'preferinte',
    value: ({ activeDoc }) => activeDoc.preferinte,
    type: 'object',
    excludeFrom: ['addForm', 'editForm']
  }
]

const methods = {
  async initBalanta (data: {balanta: Bani}) {
    if (this.balanta !== undefined) return
    this.balanta = data.balanta
    await this.save()
  },
  async incaseaza (data: Incasare) {
    if (!this.balanta) this.balanta = 0
    let incasari = this.incasari || []
    this.balanta += data.suma
    incasari.push(data.id)
    this.incasari = incasari
    await this.save()
  },
  async toggle_serviciu (serviciu) {
    if (!serviciu) return
    let { servicii } = this
    if (!servicii) servicii = []
    const index = servicii.indexOf(serviciu)
    if (index > -1) {
      servicii.splice(index, 1)
    } else {
      servicii.push(serviciu)
    }

    // this.update('servicii', servicii)
    this.update({
      $set: {
        servicii
      }
    })
  },
  async UPDATEAZA (fields) {
    // TODO: nu permite updatarea anumitor chei
    Object.keys(fields).forEach(camp => {
      this[camp] = fields[camp]
    })
    await this.save()
  }
}

const statics = {
  selected: async function (id) {
    // console.log('STATIC!', this)
    return await this.findOne(id).exec()
  }
}

// DRY: la buatoane, daca au 'click', n-au nevoie de id
const setari = {
  date: {
    fields: [
      {
        type: 'button',
        click: 'exportDb',
      },
      {
        type: 'button',
        click: 'importDb'
      }
    ]
  },
  periculoase: {
    order: -1,
    avansat: true,
    fields: [
      {
        type: 'button',
        click: 'sterge'
      }
    ]
  },
}

export {
  fields,
  plural,
  methods,
  statics,
  setari
}

// export const campuri = [
//   {
//     id: 'balanta',
//     label: 'asociatie.init.balanta',
//     required: true,
//     type: 'bani',
//     '@change': 'asociatie/initBalanta',
//     value (getters) { return getters['asociatie/balanta'] }
//   },
//   {
//     id: 'dataDinLunaListe',
//     label: 'asociatie.init.dataDinLuna',
//     required: true,
//     type: 'number',
//     max: 28,
//     min: 1
//   }
// ]
// export const setari = {
//   regionale: {
//     campuri: [
//       {
//         id: 'limba',
//         type: 'select',
//         '@change': 'schimbaLimba',
//         value: g => g.locale,
//         options: g => g.limbiChoose
//       },
//       {
//         id: 'moneda',
//         type: 'select',
//         value: g => g.moneda,
//         options: g => g.monede
//       }
//     ]
//   }
// }

