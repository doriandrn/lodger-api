import { RxDocument } from "rxdb";

declare global {

  /**
   * Taxonomy: Asociatie
   *
   * @interface Asociatie
   */
  interface Asociatie {
    _id: string
    name: string
    moneda: string

    servicii: Serviciu[]
    organizatie?: Organizatie,
    utilizatori?: Utilizator[]
    furnizori?: Furnizor[]
    tranzactii?: Tranzactie[]
    incasari?: Incasare[]

    readonly administratori: () => [Utilizator]
    readonly balanta: () => Bani

    initBalanta (): void
    incaseaza (incasare: Incasare): Promise<RxDocument<Incasare>>
    toggleServiciu: (serviciu: ID<'Serviciu'>) => void
  }
}

const getter = 'modal/data'
const modalOpen = 'modal/open'
const modalContent = 'modal/content'

const plural = 'asociatii'

const fields: FieldCreator<Asociatie>[] = [
  {
    id: '_id',
    excludeFrom: 'all',
    value: ({ getters }) => getters[modalOpen] && getters[modalContent] === 'asociatie.new' ? null : getters[getter]._id,
  },
  {
    id: 'name',
    required: true,
    focus: true,
    index: true,
    showInList: 'primary',
    value: ({ getters }) => getters[modalOpen] && getters[modalContent] === 'asociatie.new' ? null : getters[getter].name,
    v: 'max:32|min:3',
    oninput: {
      transform: 'capitalize'
    }
  },
  {
    id: 'organizatie',
    type: 'object'
    // v: 'ro=cif|en=ssn', //TODO: stringu e doar de demo -> implement cif validation
    // value: ({ getters }) => getters[modalOpen] && getters[modalContent] === 'asociatie.new' ? null : getters[getter].idN,
  },
  {
    id: 'moneda',
    required: true
  },
  {
    id: 'balanta',
    type: 'number',
    value: ({ getters }) => getters[getter].balanta,
    showInList: ['details']
  },
  {
    id: 'incasari',
    type: 'array',
    ref: 'incasari',
    value: ({ getters }) => getters[getter].incasari,
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'utilizatori',
    type: 'array',
    ref: 'utilizatori',
    value: ({ getters }) => getters[getter].utilizatori,
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'servicii',
    type: 'array',
    ref: 'servicii',
    value: ({ getters }) => getters[getter].servicii,
    showInList: 'secondary',
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'furnizori',
    type: 'array',
    ref: 'furnizori',
    value: ({ getters }) => getters[getter].furnizori,
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'filtreCheltuieli',
    value: ({ getters }) => getters[getter].filtreCheltuieli,
    type: 'array',
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'preferinte',
    value: ({ getters }) => getters[getter].preferinte,
    type: 'object',
    excludeFrom: ['addForm', 'editForm']
  }
]

const methods = {
  async initBalanta (data: {balanta: Bani}) {
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
