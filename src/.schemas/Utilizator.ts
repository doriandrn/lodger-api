/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'

type DateContact = {
  emailPublic?: string,
  telefonPublic?: string,
  alteEmailuri: [string],
  alteTelefoane?: [string],
  sociale?: [Social]
}

type Social = {
  retea: string,
  username: string
}

enum Roluri {
  admin,
  moderator,
  vizitator,
  locatar,
  proprietar
}

declare global {
  interface Utilizator {
    _id: string
    permisiuni: object,
    codPIN: number,
    name: string
    avatar: string
    rol: keyof Roluri
    contact?: DateContact
    preferinte?: PreferinteUtilizator
  }
}
const fields: FieldsCreator<Utilizator> = {
  // permisiuni: {
  //   type: 'object',
  //   items: {
  //     type:
  //   },
  //   default: ($ldg) => {

  //   }
  // },
  avatar: {
    type: 'userAvatar',
    preview: 0,
  },
  name: {
    type: 'fullName',
    required: true,
    primary: true,
    preview: 1,
    focus: true,
    search: true,
    oninput: {
      transform: 'capitalize:all'
    },
    value: ({ activeDoc }) => activeDoc.name
  },
  contact: {
    type: 'contactFields',
    default: () => ({ email: [], tel: [] }),
    value: ({ activeDoc }) => activeDoc.contact
  },
  // preferinte: {
  //   type: 'object',
  //   default: {
  //     locale: () => 'ro-RO'
  //   }
  // },
  rol: {
    type: 'number',
    min: 0,
    max: 6,
    default: 1
  },
  codPIN: {
    type: 'number',
    min:  1000,
    max: 9999,
    // encrypted: true,
    required: true
  }
}

const methods = {
  async UPDATEAZA(campuri) {
    // TODO: nu permite updatarea anumitor chei
    Object.keys(campuri).forEach(camp => {
      this[camp] = campuri[camp]
    })
    await this.save()
  }
}

// const hooks = {
//   onFirstTimeSubscribe: async ({ put, dispatch }) => {
//     await put({
//       name: 'Administrator',
//       rol: 'admin'
//     })
//   }
// }

export {
  fields,
  methods
}
