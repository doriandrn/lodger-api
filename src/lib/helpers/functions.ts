
// import Debug from 'debug'


// /**
//  * Criteriu default pentru o taxonmoie ceruta
//  *
//  * @param {string} taxonomie
//  * @param {object} criteriuCerut - poate fi diferit decat default
//  */
// const getCriteriu = (
//   taxonomie: Plural<Taxonnomie>,
//   criteriuCerut?: Criteriu
// ) => {
//   if (typeof taxonomie !== 'string')
//     throw new Error('taxonomie incorecta')
//   if (criteriuCerut && typeof criteriuCerut !== 'object')
//     throw new Error('criteriu incorect')

//   const { defaults } = LodgerConfig.taxonomii
//   const debug = Debug('functions:getCriteriu')

//   const criteriu = Object.assign({},
//     { ...defaults.criteriu },
//     { ...getTaxonomyConfig(taxonomie).criteriu },
//     { ...criteriuCerut })

//   // Object.assign(criteriu, getTaxonomyConfig(taxonomie).criteriu)
//   // debug(taxonomie, 'criteriu inainte de criteriuCerut', criteriu)
//   // debug(taxonomie, 'criteriu cerut', { ...criteriuCerut })

//   // if (criteriuCerut) {
//   //   debug('CRITERIU CERUT', criteriuCerut)
//   //   let sort = {}
//   //   if (criteriuCerut.sort) {
//   //     // let { key, direction } = criteriuCerut.sort
//   //     // if (key === 'la' && taxonomie === 'servicii') key = 'denumire'
//   //     sort = key ? { [key]: direction || 1 } : {}
//   //   }

//   //   Object.assign(criteriu, {...criteriuCerut }, { sort })
//   // }

//   // switch (taxonomie) {
//   //   case 'blocuri':
//   //   case 'incasari':
//   //   case 'cheltuieli':
//   //     Object.assign(criteriu.find, { asociatieId: g => g['asociatie/activa']._id })

//   //   case 'apartamente':
//   //     Object.assign(criteriu.find, { bloc: { $in: g => g['bloc/ids'] } })
//   // }
//   // servicii,furnizori, asociatii sunt globale, n-au nevoie de criteriu de cautare

//   debug(taxonomie, 'DUPA:', criteriu)
//   return criteriu
// }

// export {
//   traverse,
//   getCriteriu,
//   getTaxonomyConfig,
// }
