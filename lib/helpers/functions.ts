// import { Taxonomii } from 'lodger/index'
import LodgerConfig from '../../../lodger.config'
import Debug from 'debug'
import { Taxonomii } from '../../index';
// Debug.enable('functions:*')

type TraversableObject = { [index: string]: TraversableObject }
/**
 * Traverseaza un obiect cu o functie
 *
 * @param {object} obiectul de traversat
 * @param {function} fn - callback -> cheie, valoare
 */
function traverse (o: TraversableObject, fn: Function) {
  for (let i in o) {
    fn.apply(this, [i, o[i]])
    if (o[i] !== null && typeof(o[i]) === "object") traverse(o[i], fn)
  }
}

/**
 * Returneaza config-ul pentru o taxonomie sau default
 *
 * @param {string} taxonomie
 */
const getTaxonomyConfig = (tax: Plural) => {
  const { taxonomii } = LodgerConfig
  const { defaults } = taxonomii
  if (!tax) return defaults
  const config = taxonomii[tax]
  return config ? config : defaults
}

/**
 * Criteriu default pentru o taxonmoie ceruta
 *
 * @param {string} taxonomie
 * @param {object} criteriuCerut - poate fi diferit decat default
 */
const getCriteriu = (taxonomie: Plural, criteriuCerut?: Criteriu) => {
  if (typeof taxonomie !== 'string') throw new Error('taxonomie incorecta')
  if (criteriuCerut && typeof criteriuCerut !== 'object') {
    throw new Error('criteriu incorect')
  }

  const { defaults } = LodgerConfig.taxonomii
  const debug = Debug('functions:getCriteriu')

  const criteriu = Object.assign({},
    { ...defaults.criteriu },
    { ...getTaxonomyConfig(taxonomie).criteriu })

  Object.assign(criteriu, getTaxonomyConfig(taxonomie).criteriu)
  debug(taxonomie, 'criteriu inainte de criteriuCerut', criteriu)
  debug(taxonomie, 'criteriu cerut', { ...criteriuCerut })

  if (criteriuCerut) {
    debug('CRITERIU CERUT', criteriuCerut)
    let sort = {}
    if (criteriuCerut.sort) {
      let { key, direction } = criteriuCerut.sort
      if (key === 'la' && taxonomie === 'servicii') key = 'denumire'
      sort = key ? { [key]: direction || 1 } : {}
    }

    Object.assign(criteriu, {...criteriuCerut }, { sort })
  }
  // console.info('criteriu', criteriu, criteriuCerut)
  // switch (taxonomie) {
  //   case 'blocuri':
  //   case 'incasari':
  //   case 'cheltuieli':
  //     Object.assign(criteriu.find, { asociatieId: g => g['asociatie/activa']._id })

  //   case 'apartamente':
  //     Object.assign(criteriu.find, { bloc: { $in: g => g['bloc/ids'] } })
  // }
  // servicii,furnizori, asociatii sunt globale, n-au nevoie de criteriu de cautare

  debug(taxonomie, 'DUPA:', criteriu)
  return criteriu
}


/**
 * Scoate '$' de la inceputul unui string
 * @param {string} str
 */
const no$ = (str: string): string => {
  if (typeof str !== 'string') return str
  if (str.indexOf('$') !== 0) return str
  return no$(str.replace('$', '').trim())
}

/**
 * Imparte un string de mutatie ('asociatie/INCASEAZA')
 * @param {string} str
 */
const spleet = (str: string) => {
  if (typeof str !== 'string' || str.indexOf('/') < 0) return str
  const split = String(str).split('/')

  return {
    what: split[0],
    mutation: split[1]
  }
}

/**
 * slug-ifica... destul de descriptiv :)
 * @param {string} text
 */
const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const taxIsMultipleSelect = (tax: Taxonomii) => ['serviciu', 'contor'].indexOf(tax) > -1

export {
  traverse,
  no$,
  spleet,
  slugify,
  getCriteriu,
  getTaxonomyConfig,
  taxIsMultipleSelect
}
