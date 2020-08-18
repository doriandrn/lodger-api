/**
 * Rollup helper file
 * to dynamically load schemas based on filename
 */

import locales from 'locales'; // This is a virtual module for Rollup

export default async function load (langs: string[]) {
  return await Promise.all(langs.map(async langCode => ({ ...await locales[langCode]() }) ))
}
