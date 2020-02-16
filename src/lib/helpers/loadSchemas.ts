/**
 * Rollup helper file
 * to dynamically load schemas based on filename
 */

import dynamicTargets from 'dynamic-targets'; // This is a virtual module for Rollup
import Schema from '~/lib/Schema'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default async function load (schemas: Schema<any, any>[]) {
  return await Promise.all(schemas.map(async schemaFileName => {
    const fileName = `${capitalize(schemaFileName)}.ts`
    const schema = { ...await dynamicTargets[fileName]() }
    Object.defineProperty(schema, 'name', {
      writable: false,
      value: String(fileName.split('.')[0]).toLowerCase()
    })

    return schema
  }))
}
