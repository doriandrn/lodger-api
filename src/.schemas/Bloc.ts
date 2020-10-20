/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

type Scara = {
  id: number
  etaje: number
  lift: boolean
  mansarda: boolean
}

declare global {
  interface Bloc extends LodgerDocument {
    name: string
    scari ?: Scara[]
    adresa: string

    asociatieId: string
  }
}

const fields: FieldsCreator<Bloc> = {
  name: {
    placeholder: 'ex. M11, COCOR-2, A3...',
    oninput: {
      transform: 'uppercase:all',
    },
    type: 'buildingName',
    required: true,
    preview: 0,
    index: true,
    search: true,
    v: 'min:1|max:20',
    focus: true,
    value: ({ activeDoc }) => activeDoc.name
  },
  scari: {
    type: 'scari',
    preview: 1,
    default: [{
      id: 1,
      etaje: 4,
      lift: false,
      mansarda: false
    }],
    value: ({ activeDoc }) => activeDoc.scari
  },
  adresa: {
    type: 'textarea',
    search: true,
    value: ({ activeDoc }) => activeDoc.adresa
  },
  asociatieId: {
    required: true,
    ref: 'asociatie',
    value: ({ g }) => g.asociatieId
  }
}

export {
  fields
}

/**
 * It's assumed the item has an _id
 */

// Building
//   @parents Taxonomies.Organization (generated for UX purposes)

//   _id
//     value // this means it has a value, it's stored in the store and so it will get it from there

//   !name : string // ! = indexable
//     placeholder 'ex. M11, COCOR-2, A3...'
//     validate 'min:1|max:20'
//     focus true // boolean or function
//     value ({ activeDoc }) => activeDoc.name
//     oninput
//       transform 'uppercase:all'

//   address ?: Textarea
//     validate 'min:20'

//   scari ?: Scara[] // this won't be indexed,  cant search for it
