(window["webpackJsonpLodger"] = window["webpackJsonpLodger"] || []).push([[10],{

/***/ "aSoU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setari = void 0;
const setari = {
  regionale: {
    campuri: [{
      id: 'limba',
      type: 'select',
      '@change': 'schimbaLimba',
      value: g => g.locale,
      options: g => g.limbiChoose
    }, {
      id: 'moneda',
      type: 'select',
      value: g => g.moneda,
      options: g => g.monede
    }]
  }
};
exports.setari = setari;

/***/ })

}]);