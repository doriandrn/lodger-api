(window["webpackJsonpLodger"] = window["webpackJsonpLodger"] || []).push([[8],{

/***/ "mbEA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plural = exports.actions = exports.fields = void 0;
const gi = `incasare/activeDoc`;
const fields = [{
  id: 'apartamentId',
  //aka DE LA
  required: true,
  type: 'search',
  ref: 'apartamente'
}, {
  id: 'suma',
  type: 'bani',
  showInList: 'primary',
  index: true,
  required: true,
  label: 'defaults.sum'
}, {
  id: 'nrChitanta',
  type: 'number',
  default: 1,
  index: true,
  value: getters => Number(getters['incasare/activeDoc'].nrUltimaChitanta || 0) + 1
}, {
  id: 'moneda',
  notInForm: true,
  required: true,
  value: getters => getters['incasare/activeDoc'].moneda
}, // ASTEA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
// TREBUIE SA FIGUREZE
/// !!!!!!!!!!!!!!!!
{
  id: 'blocId',
  notInForm: true,
  required: true,
  index: true,
  value: g => g['bloc/selected'].id
}, {
  id: 'asociatieId',
  notInForm: true,
  required: true,
  index: true,
  value: g => g['asociatie/selected'].id
}];
exports.fields = fields;
const actions = {
  confirm: 'incaseaza'
};
exports.actions = actions;
const plural = 'incasari';
exports.plural = plural;

/***/ })

}]);