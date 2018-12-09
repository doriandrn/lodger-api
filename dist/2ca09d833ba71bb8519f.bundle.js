exports.ids = [11];
exports.modules = {

/***/ "VjXs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const getter = `utilizator/activeDoc`;
const fields = [// {
//   id: '_id',
//   notInDb: true,
//   notInForm: true,
//   value: g => g[getter]._id
// },
{
  id: 'name',
  required: true,
  primary: true,
  showInList: 'primary',
  value: g => g[getter].nume
}, {
  id: 'emailPublic',
  value: g => g[getter].emailPublic
}, {
  id: 'rol',
  required: true,
  notInForm: true
}, {
  id: 'alteDetaliiContact',
  type: 'contactFields',
  notInForm: true
}, {
  id: 'preferinte',
  type: 'object',
  notInForm: true
}];
const plural = 'utilizatori';
const methods = {
  UPDATEAZA(campuri) {
    var _this = this;

    return _asyncToGenerator(function* () {
      // TODO: nu permite updatarea anumitor chei
      Object.keys(campuri).forEach(camp => {
        _this[camp] = campuri[camp];
      });
      yield _this.save();
    })();
  }

};
const settings = {
  online: {
    campuri: [{
      id: 'parola',
      required: false,
      encrypted: true
    }, {
      id: 'social',
      required: false,
      encrypted: true
    }]
  }
};


/***/ })

};;