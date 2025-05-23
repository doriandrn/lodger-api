import { FieldsCreator } from "~/lib/Field";

type Sosete = {
  name ?: string,
  numar: Number,
  lungime: Number
}

const fields: FieldsCreator<Sosete> = {
  name: {},
  numar: {
    type: 'number',
    index: true
  },
  lungime: {
    type: 'number'
  }
}

export default {
  name: 'soseta',
  fields
}
