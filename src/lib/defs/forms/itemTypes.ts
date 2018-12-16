import { timer } from "rxjs";

// type FieldString = 'text' | 'textarea' | 'select' | 'search' | 'string' | undefined
// type FieldNumber = 'number' | 'date-time' | 'bani' | 'date'
// type FieldArray = 'array' | 'scari' | 'contactFields' | Plural<Taxonomie>
// type FieldObject = 'object'

// const strings: FieldString[] = ['text', 'textarea', 'select', 'search']
// const numbers: FieldNumber[] = ['number', 'date-time', 'bani', 'date']
// const arrays: FieldArray[] = ['array', 'scari', 'servicii', 'furnizori', 'contactFields', 'contoare', 'distribuire', 'selApartamente']
// const objects: FieldObject[] = ['object']

// export type FormItemTypes = FieldString | FieldNumber | FieldArray | FieldObject

// const formItemTypes: FormItemTypes = {
//   strings,
//   numbers,
//   arrays,
//   objects
// }

// export default formItemTypes


/**
 * Private item types for FormItemCreator -> RxDB
 */

const enum strings {
  text, textarea, select, search, string
}

const enum numbers {
  number, dateTime, bani
}

const enum arrays {
  array, scari, contactFields
}

const enum objects {
  object
}

type FormItemTypes = keyof typeof strings |
  keyof typeof numbers |
  keyof typeof arrays |
  keyof typeof objects

export {
  strings,
  numbers,
  arrays,
  objects,
  FormItemTypes
}
