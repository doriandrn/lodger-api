interface Asociatie {
  _id: string
  name: string
  balanta: Bani

  organizatie?: Organizatie,
  // administratori: [Utilizator],
  utilizatori?: [Utilizator],
  servicii: [Serviciu],
  furnizori?: [Furnizor],
  tranzactii?: Tranzactie[]
}

const getter = 'modal/data'
const modalOpen = 'modal/open'
const modalContent = 'modal/content'

const plural = 'asociatii'

const fields = [
  {
    id: '_id',
    notInDb: true,
    notInForm: true,
    value: g => g[modalOpen] && g[modalContent] === 'asociatie.new' ? null : g[getter]._id,
  },
  {
    id: 'name',
    required: true,
    focus: true,
    index: true,
    showInList: 'primary',
    value: g => g[modalOpen] && g[modalContent] === 'asociatie.new' ? null : g[getter].name,
    v: 'max:32|min:3',
    transform: 'capitalize'
  },
  {
    id: 'organizatie',
    type: 'object'
    // v: 'ro=cif|en=ssn', //TODO: stringu e doar de demo -> implement cif validation
    // value: g => g[modalOpen] && g[modalContent] === 'asociatie.new' ? null : g[getter].idN,
  },
  {
    id: 'moneda',
    required: true
  },
  {
    id: 'balanta',
    type: 'number',
    value: g => g[getter].balanta,
    showInList: 'details'
  },
  {
    id: 'incasari',
    type: 'array',
    ref: 'incasari',
    value: g => g[getter].incasari,
    notInForm: true
  },
  {
    id: 'utilizatori',
    type: 'array',
    ref: 'utilizatori',
    value: g => g[getter].utilizatori,
    notInForm: true
  },
  {
    id: 'servicii',
    type: 'array',
    ref: 'servicii',
    value: g => g[getter].servicii,
    showInList: 'secondary',
    notInForm: true
  },
  {
    id: 'furnizori',
    type: 'array',
    ref: 'furnizori',
    value: g => g[getter].furnizori,
    notInForm: true
  },
  {
    id: 'filtreCheltuieli',
    value: g => g[getter].filtreCheltuieli,
    type: 'array',
    notInForm: true
  },
  {
    id: 'preferinte',
    value: g => g[getter].preferinte,
    type: 'object',
    notInForm: true
  }
]

const methods = <T>{
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
    console.log('STATIC!', this)
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
