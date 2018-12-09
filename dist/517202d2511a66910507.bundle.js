exports.ids = [8];
exports.modules = {

/***/ "mbEA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
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
const actions = {
  confirm: 'incaseaza'
};
const plural = 'incasari';


/***/ })

};;