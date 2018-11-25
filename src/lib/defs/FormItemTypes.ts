type FieldString = 'text' | 'textarea' | 'select' | 'search' | 'string' | undefined
type FieldNumber = 'number' | 'date-time' | 'bani' | 'date'
type FieldArray = 'array' | 'scari' | 'contactFields' | Plural<Taxonomie>
type FieldObject = 'object'

const strings: FieldString[] = ['text', 'textarea', 'select', 'search']
const numbers: FieldNumber[] = ['number', 'date-time', 'bani', 'date']
const arrays: FieldArray[] = ['array', 'scari', 'servicii', 'furnizori', 'contactFields', 'contoare', 'distribuire', 'selApartamente']
const objects: FieldObject[] = ['object']

export type FormItemTypes = FieldString | FieldNumber | FieldArray | FieldObject

const formItemTypes: FormItemTypes = {
  strings,
  numbers,
  arrays,
  objects
}

export default formItemTypes
