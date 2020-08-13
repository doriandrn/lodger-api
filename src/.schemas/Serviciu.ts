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
  // asociatieId: {
  //   ref: 'asociatie'
  // },

  denumire: {
    required: true,
    preview: 0,
    primary: true,
    index: true
  },

  furnizori: {
    type: 'array',
    ref: 'furnizor'
  },

  contoare: {
    type: 'contoare',
    ref: 'contoare',
    preview: 1
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
