(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "aBzF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "campuri", function() { return campuri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actiuni", function() { return actiuni; });
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
const actiuni = {
  confirm: 'trimiteFeedback'
};

/***/ })

}]);