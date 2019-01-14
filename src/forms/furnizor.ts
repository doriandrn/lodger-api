declare global {
  interface Furnizor {
    name: string
    servicii: Serviciu[]
    organizatie?: Organizatie
  }
}

export const fields: FieldCreator<Furnizor>[] = [
  {
    id: 'name',
    required: true,
    showInList: 'primary',
    index: true
  },
  {
    id: 'servicii',
    type: 'servicii',
    required: true,
    value: ({ activeDoc }) => activeDoc.servicii,
    ref: 'serviciu'
  },
  {
    id: 'organizatie',
    type: 'organizatie'
  }
]

export const plural = 'furnizori'
