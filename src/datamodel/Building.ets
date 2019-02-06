Building
  @parents Organization
  
  _id
    value

  name !: string
    placeholder 'ex. M11, COCOR-2, A3...'
    validate 'min:1|max:20'
    focus true // boolean or function
    value ({ activeDoc }) => activeDoc.name
    oninput
      transform 'uppercase:all'

  address ?: Textarea
    validate 'min:20'

  scari ?: Scara[] // this won't be indexed,  cant search for it