exports.ids = [10];
exports.modules = {

/***/ "aSoU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setari", function() { return setari; });
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

/***/ })

};;