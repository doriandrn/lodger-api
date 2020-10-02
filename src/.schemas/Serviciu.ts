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

  // contoare: {
  //   type: 'contoare',
  //   ref: 'contoare',
  //   preview: 1
  // }
}

const predefinite =
  [
    'apa',
    'el',
    'gaze',
    'termo',
    'net',
    'gunoi'
  ]

const hooks = {
  // serviciile predifinite pe empty
  empty: () => {
    predefinite.map(async service => { await this.put({denumire: service}) })
  }
}

export {
  fields,
  predefinite,
  hooks
}
