
/// <reference path="../main.d.ts" />
import { FieldsCreator } from '../lib/Field'
declare global {
  interface Contor {
    tip: string
  }
}

const fields: FieldsCreator<Contor> = {
  tip: {
  },

}

export {
  fields
}
