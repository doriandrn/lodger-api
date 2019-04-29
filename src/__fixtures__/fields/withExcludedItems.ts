import fields from './normal'

const fieldsWithExcludedItems : FieldCreator<any>[] = [
  ...fields,
  { excludeFrom: 'db' },
  { excludeFrom: 'db', required: true }
]

export default fieldsWithExcludedItems
