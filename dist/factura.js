'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const fields = [{
  id: 'furnizorId',
  required: true,
  type: 'search',
  ref: 'furnizori'
}, {
  id: 'suma',
  type: 'bani',
  showInList: 'primary',
  index: true,
  required: true,
  label: 'defaults.sum'
}, {
  id: 'nrFactura',
  type: 'number',
  default: 1,
  index: true,
  value: getters => Number(getters['asociatie/nrUltimaChitanta'] || 0) + 1
}, {
  id: 'dataScadenta',
  type: 'date',
  showInList: 'secondary'
}, {
  id: 'moneda',
  notInForm: true,
  required: true,
  value: getters => getters['asociatie/moneda']
}, // ASTA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
// TREBUIE SA FIGUREZE
// asociatieId = idul asociatiei apului
/// !!!!!!!!!!!!!!!!
{
  id: 'asociatieId',
  notInForm: true,
  required: true,
  index: true,
  value: g => g['asociatie/active'] || g['asociatie/selected']
}];
const plural$1 = 'facturi';

exports.fields = fields;
exports.plural = plural$1;
