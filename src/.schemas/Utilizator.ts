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
    name: string
    avatar: string
    rol: keyof Roluri
    contact?: DateContact
    preferinte?: PreferinteUtilizator
  }
}

const fields: FieldsCreator<Utilizator> = {
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
    max: 6
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

const hooks = {
  onFirstTimeSubscribe: async ({ put, dispatch }) => {
    await put({
      name: 'Administrator',
      rol: 'admin'
    })
  }
}

const settings = {
  locale: {
    type: 'langSelect'
  },
  online: {
    campuri: [
      {
        id: 'parola',
        required: false,
        encrypted: true
      },
      {
        id: 'social',
        required: false,
        encrypted: true
      }
    ]
  }
}

export {
  fields,
  hooks,
  methods,
  settings
}
