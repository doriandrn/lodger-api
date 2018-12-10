(window["webpackJsonpLodger"] = window["webpackJsonpLodger"] || []).push([[9],{

/***/ "k0bU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actiuni = exports.campuri = void 0;
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
exports.campuri = campuri;
const actiuni = {
  confirm: 'initDone'
};
exports.actiuni = actiuni;

/***/ })

}]);