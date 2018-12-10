(window["webpackJsonpLodger"] = window["webpackJsonpLodger"] || []).push([[6],{

/***/ "aBzF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actiuni = exports.campuri = void 0;
const campuri = [{
  id: 'subiect',
  required: true
}, {
  id: 'tip',
  type: 'select',
  options: ['bug', 'enhacement', 'feature', 'other'],
  default: 'bug',
  required: true
}, {
  id: 'mesaj',
  required: true,
  type: 'textarea',
  placeholder: 'Părerea / Sugestia / Critica ta'
}];
exports.campuri = campuri;
const actiuni = {
  confirm: 'trimiteFeedback'
};
exports.actiuni = actiuni;

/***/ })

}]);