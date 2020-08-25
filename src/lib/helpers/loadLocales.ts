/**
 * Rollup helper file
 * to dynamically load schemas based on filename
 */

import locales from 'locales'; // This is a virtual module for Rollup

export default async function load (langs: string[]) {
  const x = {}
  await Promise.all(langs.map(async langCode => { x[langCode] = await locales[langCode]() } ))
  // console.log('x',  x)
  return x
}
