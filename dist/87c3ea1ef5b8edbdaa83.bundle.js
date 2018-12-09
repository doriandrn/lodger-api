exports.ids = [1];
exports.modules = {

/***/ "3RaG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statics", function() { return statics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setari", function() { return setari; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const getter = 'modal/data';
const modalOpen = 'modal/open';
const modalContent = 'modal/content';
const plural = 'asociatii';
const fields = [{
  id: '_id',
  notInDb: true,
  notInForm: true,
  value: g => g[modalOpen] && g[modalContent] === 'asociatie.new' ? null : g[getter]._id
}, {
  id: 'name',
  required: true,
  focus: true,
  index: true,
  showInList: 'primary',
  value: g => g[modalOpen] && g[modalContent] === 'asociatie.new' ? null : g[getter].name,
  v: 'max:32|min:3',
  transform: 'capitalize'
}, {
  id: 'organizatie',
  type: 'object' // v: 'ro=cif|en=ssn', //TODO: stringu e doar de demo -> implement cif validation
  // value: g => g[modalOpen] && g[modalContent] === 'asociatie.new' ? null : g[getter].idN,

}, {
  id: 'moneda',
  required: true
}, {
  id: 'balanta',
  type: 'number',
  value: g => g[getter].balanta,
  showInList: 'details'
}, {
  id: 'incasari',
  type: 'array',
  ref: 'incasari',
  value: g => g[getter].incasari,
  notInForm: true
}, {
  id: 'utilizatori',
  type: 'array',
  ref: 'utilizatori',
  value: g => g[getter].utilizatori,
  notInForm: true
}, {
  id: 'servicii',
  type: 'array',
  ref: 'servicii',
  value: g => g[getter].servicii,
  showInList: 'secondary',
  notInForm: true
}, {
  id: 'furnizori',
  type: 'array',
  ref: 'furnizori',
  value: g => g[getter].furnizori,
  notInForm: true
}, {
  id: 'filtreCheltuieli',
  value: g => g[getter].filtreCheltuieli,
  type: 'array',
  notInForm: true
}, {
  id: 'preferinte',
  value: g => g[getter].preferinte,
  type: 'object',
  notInForm: true
}];
const methods = {
  initBalanta(data) {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.balanta = data.balanta;
      yield _this.save();
    })();
  },

  incaseaza(data) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.balanta) _this2.balanta = 0;
      let incasari = _this2.incasari || [];
      _this2.balanta += data.suma;
      incasari.push(data.id);
      _this2.incasari = incasari;
      yield _this2.save();
    })();
  },

  toggle_serviciu(serviciu) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (!serviciu) return;
      let {
        servicii
      } = _this3;
      if (!servicii) servicii = [];
      const index = servicii.indexOf(serviciu);

      if (index > -1) {
        servicii.splice(index, 1);
      } else {
        servicii.push(serviciu);
      } // this.update('servicii', servicii)


      _this3.update({
        $set: {
          servicii
        }
      });
    })();
  },

  UPDATEAZA(fields) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      // TODO: nu permite updatarea anumitor chei
      Object.keys(fields).forEach(camp => {
        _this4[camp] = fields[camp];
      });
      yield _this4.save();
    })();
  }

};
const statics = {
  selected: function () {
    var _ref = _asyncToGenerator(function* (id) {
      // console.log('STATIC!', this)
      return yield this.findOne(id).exec();
    });

    return function selected(_x) {
      return _ref.apply(this, arguments);
    };
  }() // DRY: la buatoane, daca au 'click', n-au nevoie de id

};
const setari = {
  date: {
    fields: [{
      type: 'button',
      click: 'exportDb'
    }, {
      type: 'button',
      click: 'importDb'
    }]
  },
  periculoase: {
    order: -1,
    avansat: true,
    fields: [{
      type: 'button',
      click: 'sterge'
    }]
  }
};


/***/ })

};;