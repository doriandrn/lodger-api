const getter = `utilizator/activeDoc`

const fields = [
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
    value: g => g[getter].nume
  },
  {
    id: 'emailPublic',
    value: g => g[getter].emailPublic
  },
  {
    id: 'rol',
    required: true,
    notInForm: true
  },
  {
    id: 'alteDetaliiContact',
    type: 'contactFields',
    notInForm: true
  },
  {
    id: 'preferinte',
    type: 'object',
    notInForm: true
  }
]

const plural = 'utilizatori'

const methods = {
  async UPDATEAZA(campuri) {
    // TODO: nu permite updatarea anumitor chei
    Object.keys(campuri).forEach(camp => {
      this[camp] = campuri[camp]
    })
    await this.save()
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
  plural,
  methods,
  settings
}
