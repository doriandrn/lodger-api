(window["webpackJsonpLodger"] = window["webpackJsonpLodger"] || []).push([[7],{

/***/ "UdaM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plural = exports.actiuni = exports.fields = void 0;
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
exports.fields = fields;
const actiuni = {
  confirm: 'adaugaFurnizor'
};
exports.actiuni = actiuni;
const plural = 'furnizori';
exports.plural = plural;

/***/ })

}]);