'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-db601d79.js');

const plural$1 = 'apartamente';
const selectedApGetter = 'apartament/activeDoc';
const fields = [{
  id: '_id',
  notInDb: true,
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
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      if (!this.balanta) this.balanta = 0;
      let incasari = this.incasari || [];
      this.balanta += data.suma;
      incasari.push(data.id);
      this.incasari = incasari;
      yield this.save();
    });
  }

};

exports.fields = fields;
exports.plural = plural$1;
exports.actions = actions;
exports.methods = methods;
