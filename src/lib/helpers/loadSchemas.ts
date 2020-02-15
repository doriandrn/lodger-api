import dynamicTargets from 'dynamic-targets'; // This is a virtual module for Rollup

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default function load (schemas) {
  return schemas.map(schema => {
    // console.log('s,', schema)
    const fileName = `${capitalize(schema)}.ts`
    dynamicTargets[fileName]().then(() => {
      console.log(`imported ${fileName}`)
    })
  })
}
