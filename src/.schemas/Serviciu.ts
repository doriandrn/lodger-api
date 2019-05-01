/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

declare global {
  type Serviciu = {
    denumire: string,
    furnizori: Furnizor[],
    contoare: Contor[]

    asociatieId: string
  }
}

const fields: FieldsCreator<Serviciu> = {
  /**
   * desi globale, serviciile sunt pt asociatii.
   * excludem asta din db, pastram pt referinta
   */
  asociatieId: {
    excludeFrom: ['db']
  },

  denumire: {
    required: true,
    showInList: 'primary',
    primary: true,
    index: true
  },

  furnizori: {
    type: 'array',
    excludeFrom: ['addForm', 'editForm']
  },

  contoare: {
    type: 'contoare'
  }
}

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
  predefinite,
  hooks
}
