(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "UdaM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actiuni", function() { return actiuni; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
const fields = [{
  id: 'name',
  required: true,
  showInList: 'primary',
  index: true
}, {
  id: 'servicii',
  type: 'servicii',
  required: true,
  servicii: g => g['asociatie/activeDoc'].servicii,
  ref: 'serviciu'
}, {
  id: 'idN'
}];
const actiuni = {
  confirm: 'adaugaFurnizor'
};
const plural = 'furnizori';

/***/ })

}]);