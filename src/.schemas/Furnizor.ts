/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  interface Furnizor {
    name: string
    servicii: Serviciu[]
    organizatie?: Organizatie
  }
}

export const fields: FieldsCreator<Furnizor> = {
  name: {
    required: true,
    showInList: 'primary',
    index: true
  },
  servicii: {
    type: 'servicii',
    required: true,
    value: ({ activeDoc }) => activeDoc.servicii,
    ref: 'serviciu'
  },
  organizatie: {
    type: 'organizatie'
  }
}
