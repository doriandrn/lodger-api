
type SplitObject = {
  what: string,
  mutation: string
}

interface String {
  stripLeading$: () => string,
  spleet: () => SplitObject,
  slugify: () => string
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
