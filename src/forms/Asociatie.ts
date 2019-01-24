import { RxDocument, RxCollectionBase } from "rxdb";
import { LodgerTaxonomyCreator } from '../lib/Taxonomy'

declare global {
  type Organizatie = {
    nume: string,
    cif?: number,
    rocif?: boolean
  }

  type Asociatie = {
    _id: string
    name: string
    balanta: Bani

    servicii: Serviciu[]
    organizatie?: Organizatie,
    utilizatori?: Utilizator[]
    furnizori?: Furnizor[]
    tranzactii?: Tranzactie[]
    incasari?: Incasare[]

    preferinte: {
      moneda: string

      sfarsitLuna: number
      genereazaListeAutomat: boolean

      filtre: {
        [k in keyof Taxonomie]: {
          [f: string]: any
        }
      }
    }
  }
}

/**
 * Taxonomy: Asociatie
 *
 * @interface Asociatie
 */
interface AsociatieAPI {
  readonly administratori: Utilizator[]

  initBalanta (): void
  incaseaza (incasare: Incasare): Promise<RxDocument<Incasare>>
  toggleServiciu: (serviciu: ID<'Serviciu'>) => void
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

const methods: RxCollectionBase<Asociatie, AsociatieAPI> = {
  async initBalanta (data: {balanta: Bani}) {
    if (this.balanta !== undefined) return
    this.balanta = data.balanta
    await this.save()
  },
  async incaseaza (data: Incasare) {
    if (!this.balanta) this.balanta = 0
    let incasari = this.incasari || []
    this.balanta += data.suma
    incasari.push(data._id)
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

export default <LodgerTaxonomyCreator>{
  fields,
  plural,
  methods,
  statics,
  setari
}
