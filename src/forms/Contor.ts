declare global {
  interface Contor {
    tip: string
  }
}

const fields: FieldCreator<Contor>[] = [
  {
    id: 'tip'
  }
]

export {
  fields
}
