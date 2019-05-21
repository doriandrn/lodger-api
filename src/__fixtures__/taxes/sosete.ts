import { FieldsCreator } from "~/lib/Field";

type Sosete = {
  numar: Number,
  lungime: Number
}

const fields: FieldsCreator<Sosete> = {
  numar: {
    type: 'number',
    index: true
  },
  lungime: {
    type: 'number'
  }
}

export default {
  fields
}
