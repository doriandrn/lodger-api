const fields = [
  /**
   * desi globale, serviciile sunt pt asociatii.
   * excludem asta din db, pastram pt referinta
   */
  {
    id: 'asociatieId',
    notInDb: true
  },

  {
    id: 'denumire',
    required: true,
    showInList: 'primary',
    isPrimary: true,
    index: true
  },
  {
    id: 'furnizori',
    type: 'array',
    notInForm: true
  },
  {
    id: 'contoare',
    type: 'contoare'
  }
]

const plural = 'servicii'

const actions = {
  confirm: 'adaugaServiciu'
}

const global = true
const multipleSelect = true

const predefinite = ['apa', 'electricitate', 'gaze', 'termoficare', 'internet', 'evacuare-gunoi-menajer']

export {
  fields,
  plural,
  actions,
  predefinite,
  global,
  multipleSelect
}
