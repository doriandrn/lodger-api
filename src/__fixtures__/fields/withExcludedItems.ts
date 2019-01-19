import fields from './normal'

const fieldsWithExcludedItems = [
  ...fields,
  { id: 'x4', excludeFrom: 'db' },
  { id: 'x5', excludeFrom: 'db', required: true }
]

export default fieldsWithExcludedItems
