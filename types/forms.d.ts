import { RxJsonSchema, RxCollectionCreator } from 'rxdb'
import { Taxonomii } from '../index'

declare global {



  type ItemName = string

  type RxDBType = 'string' | 'number' | 'array' | 'object'




  type ExcludedOverwrites = 'properties' | 'required' | 'title' | 'compoundIndexes'
  type AllowedSchemaOverwrites = Without<RxJsonSchema, ExcludedOverwrites>
}
