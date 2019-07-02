import fields from './normal'
import { FieldsCreator } from '~/lib/Field'

const fieldsWithExcludedItems : FieldsCreator<any> = {
  ...fields,
  x4: { excludeFrom: 'db' },
  x5: { excludeFrom: 'db', required: true }
}

export default fieldsWithExcludedItems
