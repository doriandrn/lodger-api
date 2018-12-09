(window["webpackJsonpLodger"] = window["webpackJsonpLodger"] || []).push([[0],{

/***/ "WuGB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const plural = 'apartamente';
const selectedApGetter = 'apartament/activeDoc';
const fields = [{
  id: '_id',
  notInDb: true,
  // skip it's already defiend by rxdb
  notInForm: true,
  value: g => g[selectedApGetter]._id
}, {
  id: 'nr',
  type: 'number',
  default: g => {
    //TODO: numerotare pentru hoteluri, 101 et 1, 201 et 2
    const {
      apartamente
    } = g['bloc/activeDoc'];
    if (!apartamente || !apartamente.length) return 1; // TODO: asta e pt hoteluri, daca toate ap de pe etaj la scara

    const sortate = apartamente.map(ap => g.apartamente[ap].nr).sort((a, b) => Number(a) - Number(b)).reverse();
    return sortate[0] + 1;
  },
  value: g => g[selectedApGetter].nr,
  required: true,
  index: true,
  showInList: 'secondary'
}, {
  id: 'proprietar',
  placeholder: 'Ion Barbu',
  transform: 'capitalize',
  showInList: 'primary',
  v: 'alpha_spaces|max:32',
  value: g => g[selectedApGetter].proprietar
}, {
  id: 'suprafata',
  type: 'number',
  showInList: 'details',
  default: null,
  // TODO: ia de la apartamentul de la etajul de dedesubt, in functie de cate ap sunt
  step: 0.01,
  value: g => g[selectedApGetter].suprafata
}, {
  id: 'locatari',
  index: true,
  type: 'number',
  showInList: 'details',
  default: 2,
  min: 0,
  max: 10,
  value: g => g[selectedApGetter].locatari
}, {
  id: 'camere',
  type: 'number',
  index: true,
  showInList: 'details',
  default: 2,
  max: 12,
  min: 1,
  value: g => g[selectedApGetter].camere
}, {
  id: 'etaj',
  type: 'number',
  required: true,
  notInForm: true,
  default: g => g['etaj/selectat'].etaj,
  value: g => g[selectedApGetter].etaj
}, {
  id: 'blocId',
  required: true,
  notInForm: true,
  default: g => g['etaj/selectat'].bloc,
  value: g => g[selectedApGetter].bloc
}, {
  id: 'asociatieId',
  required: true,
  notInForm: true,
  default: g => g['asociatie/activeDoc']._id,
  value: g => g['asociatie/activeDoc']._id
}, {
  id: 'scara',
  type: 'number',
  required: true,
  notInForm: true,
  default: g => g['etaj/selectat'].scara,
  value: g => g[selectedApGetter].scara
}, {
  id: 'balanta',
  type: 'bani',
  default: null,
  required: true,
  showInList: 'details',
  index: true,
  value: g => g[selectedApGetter].balanta
}, {
  id: 'contoare',
  type: 'contoare',
  showInList: 'details',
  value: g => g[selectedApGetter].contoare
}, {
  id: 'incasari',
  type: 'array',
  notInForm: true,
  ref: 'incasari'
}, {
  id: 'datorii',
  type: 'array',
  notInForm: true,
  ref: 'cheltuieli'
}];
const actions = {
  confirm: 'adaugaAp'
};
const methods = {
  incaseaza(data) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.balanta) _this.balanta = 0;
      let incasari = _this.incasari || [];
      _this.balanta += data.suma;
      incasari.push(data.id);
      _this.incasari = incasari;
      yield _this.save();
    })();
  }

};


/***/ })

}]);