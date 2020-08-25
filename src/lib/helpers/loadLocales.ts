/**
 * Rollup helper file
 * to dynamically load schemas based on filename
 */

import locales from 'locales'; // This is a virtual module for Rollup

export default async function load (langs: string[]) {
  const _locales = {}
  await Promise.all(langs.map(async langCode => {
    const t = await locales[langCode]()
    _locales[langCode] = t.default
  }))
  return _locales
}
