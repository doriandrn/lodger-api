import Schema, { LodgerSchemaCreator } from './Schema'
import { RxCollectionCreator } from 'rxdb'

class Collection<Name extends string, Interface> extends Schema<Name, Interface> implements RxCollectionCreator {
  constructor (data: LodgerSchemaCreator<Interface>) {
    super(data)
  }
}
