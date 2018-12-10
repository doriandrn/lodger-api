'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-db601d79.js');

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
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      this.balanta = data.balanta;
      yield this.save();
    });
  },

  incaseaza(data) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      if (!this.balanta) this.balanta = 0;
      let incasari = this.incasari || [];
      this.balanta += data.suma;
      incasari.push(data.id);
      this.incasari = incasari;
      yield this.save();
    });
  },

  toggle_serviciu(serviciu) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      if (!serviciu) return;
      let {
        servicii
      } = this;
      if (!servicii) servicii = [];
      const index = servicii.indexOf(serviciu);

      if (index > -1) {
        servicii.splice(index, 1);
      } else {
        servicii.push(serviciu);
      } // this.update('servicii', servicii)


      this.update({
        $set: {
          servicii
        }
      });
    });
  },

  UPDATEAZA(fields) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      // TODO: nu permite updatarea anumitor chei
      Object.keys(fields).forEach(camp => {
        this[camp] = fields[camp];
      });
      yield this.save();
    });
  }

};
const statics = {
  selected: function (id) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      // console.log('STATIC!', this)
      return yield this.findOne(id).exec();
    });
  }
}; // DRY: la buatoane, daca au 'click', n-au nevoie de id

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

exports.fields = fields;
exports.plural = plural;
exports.methods = methods;
exports.statics = statics;
exports.setari = setari;
