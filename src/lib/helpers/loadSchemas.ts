import dynamicTargets from 'dynamic-targets'; // This is a virtual module for Rollup
import Schema from '~/lib/Schema'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default async function load (schemas: Schema<any, any>[]) {
  return await Promise.all(schemas.map(async schemaFileName => {
    // console.log('s,', schema)
    const fileName = `${capitalize(schemaFileName)}.ts`
    const schema = await dynamicTargets[fileName]()
    console.log('s', schema)
    return schema
  }))
}
