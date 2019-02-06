declare global {
  type Serviciu = {
    denumire: string,
    furnizori: Furnizor[],
    contoare: Contor[]

    asociatieId: string
  }
}

const fields: FieldCreator<Serviciu>[] = [
  /**
   * desi globale, serviciile sunt pt asociatii.
   * excludem asta din db, pastram pt referinta
   */
  {
    id: 'asociatieId',
    excludeFrom: 'db'
  },

  {
    id: 'denumire',
    required: true,
    showInList: 'primary',
    primary: true,
    index: true
  },
  {
    id: 'furnizori',
    type: 'array',
    excludeFrom: ['addForm', 'editForm']
  },
  {
    id: 'contoare',
    type: 'contoare'
  }
]

const predefinite =
  [
    'apa',
    'electricitate',
    'gaze',
    'termoficare',
    'internet',
    'evacuare-gunoi-menajer'
  ]

const hooks = {
  onFirstTimeSubscribe: ({ put }) => {
    predefinite.map(async service => { await put(service) })
  }
}

export {
  fields,
  hooks
}
