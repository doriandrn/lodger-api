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
    rol: 'dev' | 'admin' | 'presedinte' | 'locator'
    contact?: DateContact
    preferinte: PreferinteUtilizator
  }
}

const fields: FieldCreator<Utilizator>[] = [
  // {
  //   id: '_id',
  //   notInDb: true,
  //   notInForm: true,
  //   value: g => g[getter]._id
  // },
  {
    id: 'name',
    required: true,
    primary: true,
    showInList: 'primary',
    value: ({ activeDoc }) => activeDoc.name
  },
  {
    id: 'contact',
    type: 'contactFields',
    excludeFrom: 'addForm',
    value: ({ activeDoc }) => activeDoc.contact
  },
  {
    id: 'rol',
    required: true,
    excludeFrom: [],
    value: ({ activeDoc }) => activeDoc.rol
  },
  {
    id: 'preferinte',
    type: 'object',
    excludeFrom: [],
  }
]

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
