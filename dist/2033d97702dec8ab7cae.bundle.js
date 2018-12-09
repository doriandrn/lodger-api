exports.ids = [3];
exports.modules = {

/***/ "0jyb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/**
 * o cheltuiala = parte dintr-o factura
 */
const fields = [{
  id: 'asociatieId',
  ref: 'asociatii',
  required: true,
  index: true
}, {
  id: 'facturi',
  type: 'search',
  taxonomy: 'facturi',
  ref: 'facturi' // required: true TODO: e necesar? ?????????

}, {
  id: 'suma',
  type: 'bani',
  required: true,
  index: true,
  showInList: 'secondary'
}, {
  id: 'moneda',
  notInForm: true,
  required: true,
  showInList: 'secondary',
  value: getters => getters['asociatie/activa'].moneda
}, {
  id: 'modDistribuire',
  type: 'distribuire'
}, {
  id: 'apartamenteEligibile',
  type: 'selApartamente',
  options: getters => getters['asociatie/apartamente']
}];
const plural = 'cheltuieli';


/***/ })

};;