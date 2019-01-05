import { JsonSchemaTypes } from "rxdb";

type SplitObject = {
  what: string,
  mutation: string
}

declare global {
  /**
   * String helpers extensions
   *
   * @interface String
   */
   interface String {
    stripLeading$: () => string,
    spleet: () => SplitObject,
    slugify: () => string,
    toRxDBtype: () => JsonSchemaTypes
  }
}


/**
 * Accepted 'string's for a LodgerSchema field
 *
 * @enum {number}
 */
enum strings {
  search, select, string, text, textarea
}

/**
 * Accepted 'number's for a LodgerSchema field
 *
 * @enum {number}
 */
enum numbers {
  date, dateTime, number
}

/**
 * Accepted 'array's for a LodgerSchema field
 *
 * @enum {number}
 */
enum arrays {
  array, contactFields, contoare, distribuire,
  furnizori, selApartamente, servicii, scari
}

/**
 * Accepted 'object's for a LodgerSchema field
 *
 * @enum {number}
 */
enum objects {
  bani, object
}

/**
 * Removes the '$' at the begining of a string
 *
 * @returns {String} the parsed string
 * @memberof String
 */
String.prototype.stripLeading$ = function (): string {
  if (this.indexOf('$') !== 0) return String(this)
  return this.replace('$', '').trim().stripLeading$()
}

/**
 * Splits a mutation string (eg. 'asociatie/INCASEAZA')
 * @memberof String
 * @returns {SplitObject}
 */
String.prototype.spleet = function (): SplitObject {
  const split = this.split('/')

  return {
    what: split[0],
    mutation: split[1]
  }
}

/**
 * Slugifies a string
 *
 * @memberof String
 * @returns {String} the slug
 */
String.prototype.slugify = function (): string {
  return this.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Converts a LodgerField type to RxDB compatible one
 *
 * Explicatie:
 * DB-ul nu stie decat de tipurile primare:
 * -> boolean, string, number, array, object
 * Schema noastra e mult mai detaliata
 *
 * @returns {string} - tipul primar, eg. 'string'
 */
String.prototype.toRxDBtype = function (): JsonSchemaTypes {
  const _default = 'string'

  if (Object.keys(strings).indexOf(this) > -1) return _default
  if (Object.keys(objects).indexOf(this) > -1) return 'object'
  if (Object.keys(numbers).indexOf(this) > -1) return 'number'
  if (Object.keys(arrays).indexOf(this) > -1) return 'array'
  return _default
}

export default String

export {
  strings,
  numbers,
  arrays,
  objects
}
