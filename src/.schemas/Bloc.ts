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

const fields: FieldCreator<Bloc>[] = [
  {
    id: 'name',
    placeholder: 'ex. M11, COCOR-2, A3...',
    oninput: {
      transform: 'uppercase:all',
    },
    type: 'text',
    required: true,
    showInList: 'primary',
    index: true,
    v: 'min:1|max:20',
    focus: true,
    value: ({ activeDoc }) => activeDoc.name
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
    value: ({ activeDoc }) => activeDoc.scari
  },
  {
    id: 'adresa',
    type: 'textarea',
    value: ({ activeDoc }) => activeDoc.adresa
  }
]

const plural = 'blocuri'

export {
  plural,
  fields
}

/**
 * It's assumed the item has an _id
 */

// Building
//   @parents Taxonomies.Organization

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
