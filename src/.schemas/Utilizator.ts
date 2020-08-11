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

declare global {
  interface Utilizator {
    _id: string
    name: string
    avatar: string
    rol: keyof ['dev' | 'admin' | 'presedinte' | 'locator']
    contact?: DateContact
    preferinte: PreferinteUtilizator
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
    value: ({ activeDoc }) => activeDoc.name
  },
  contact: {
    type: 'contactFields',
    excludeFrom: 'addForm',
    value: ({ activeDoc }) => activeDoc.contact
  },
  rol: {
    type: 'number',
    required: true,
    excludeFrom: [],
    value: ({ activeDoc }) => activeDoc.rol
  },
  preferinte: {
    type: 'object',
    excludeFrom: [],
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
