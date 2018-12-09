(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "k0bU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "campuri", function() { return campuri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actiuni", function() { return actiuni; });
const campuri = [{
  id: 'balanta',
  label: 'asociatie.init.balanta',
  required: true,
  type: 'bani',
  '@change': 'asociatie/initBalanta',

  value(getters) {
    return getters['asociatie/balanta'];
  }

}, {
  id: 'dataDinLunaListe',
  label: 'asociatie.init.dataDinLuna',
  required: true,
  type: 'number',
  max: 28,
  min: 1
}];
const actiuni = {
  confirm: 'initDone'
};

/***/ })

}]);