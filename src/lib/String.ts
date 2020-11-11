import { JsonSchemaTypes } from "rxdb";
import { Currency } from './maintainable/currencies'

/**
 * Accepted -strings- for a LodgerSchema field's type
 *
 * @enum {number}
 */
export enum strings {
  buildingName, fullName,
  search, select, serviceName,
  string, textarea, userAvatar
}

/**
 * Accepted 'number's for a LodgerSchema field
 *
 * @enum {number}
 */
export enum numbers {
  date, dateTime, number, rol
}

/**
 * Accepted 'array's for a LodgerSchema field
 *
 * @enum {number}
 */
export enum arrays {
  array, contoare, distribuire,
  furnizori, selApartamente, servicii, scari
}

/**
 * Accepted 'object's for a LodgerSchema field
 *
 * @enum {number}
 */
export enum objects {
  contactFields, object, organizatie, $
}


declare global {
  /**
   * String helpers extensions
   *
   * @interface String
   */
  interface String {
    stripLeading: (symbol: string) => String,
    slug: string,
    plural: Plural<string>

    asMoney: Money,
    asRxDBType: JsonSchemaTypes
  }
}

const plurals = {
  apartament: 'apartamente',
  asociatie: 'asociatii',
  bloc: 'blocuri',
  contor: 'contoare',
  cheltuiala: 'cheltuieli',
  factura: 'facturi',
  furnizor: 'furnizori',
  incasare: 'incasari',
  serviciu: 'servicii',
  tranzactie: 'tranzactii',
  utilizator: 'utilizatori'
}

/**
 * Removes the '$' at the begining of a string
 *
 * @returns {String} the parsed string
 * @memberof String
 */
String.prototype.stripLeading = function (symbol: string): String {
  if (this.indexOf(symbol) !== 0) return String(this)
  return String(this.replace(symbol, '').trim().stripLeading(symbol))
}

Object.defineProperties(String.prototype, {
  /**
   * Plurals. @todo use Intl
   */
  plural: {
    get () {
      return plurals[this] || String(this)
    }
  },

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
  asRxDBType: {
    get () {
      const _default = 'string'
      const _this = this.toString()

      if (Object.keys(strings).indexOf(_this) > -1) return _default
      if (Object.keys(objects).indexOf(_this) > -1) return 'object'
      if (Object.keys(numbers).indexOf(_this) > -1) return 'number'
      if (Object.keys(arrays).indexOf(_this) > -1) return 'array'
      return _default
    }
  },


  /**
   * Splits a $ string into Money object
   *
   * @memberof String
   * @returns {Money}
   */
  asMoney: {
    get () {
      const split = this.split(' ')

      return {
        currency: split[0] as unknown as Currency,
        amount: split[1]
      }
    }
  },

  /**
   * Slugifies a string
   *
   * @memberof String
   * @returns {String} the slug
   */
  slug: {
    get () {
      return this.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
  }
})

export default { String }
