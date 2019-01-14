declare global {
  type Scara = {
    id: number
    etaje: number
    lift: boolean
    mansarda: boolean
  }
  interface Bloc {
    _id: string
    name: string
    scari ?: Scara[]
    adresa: string

    asociatieId: string
  }
}

const bs = 'bloc/activeDoc'

const fields: FieldCreator<Bloc>[] = [
  // {
  //   id: '_id',
  //   notInDb: true,
  //   notInForm: true,
  //   value: g => g[bs]._id
  // },
  {
    id: 'name',
    placeholder: 'ex. M11, COCOR-2, A3...',
    transform: 'uppercase:all',
    type: 'text',
    required: true,
    showInList: 'primary',
    index: true,
    v: 'min:1|max:20',
    focus: true,
    value: g => g[bs].name
  },
  {
    id: 'scari',
    type: 'scari',
    default: [{
      id: 1,
      etaje: 4,
      lift: false,
      mansarda: false
    }],
    value: g => g[bs].scari
  },
  {
    id: 'adresa',
    type: 'textarea',
    value: g => g[bs].adresa
  },
  {
    id: 'asociatieId',
    type: 'select',
    notInForm: true,
    required: true,
    value: g => g['asociatie/active'] || g['asociatie/selected']
  }
]

const plural = 'blocuri'

export {
  plural,
  fields
}
