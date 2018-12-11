'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-db601d79.js');

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
const plural$1 = 'utilizatori';
const methods = {
  UPDATEAZA(campuri) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      // TODO: nu permite updatarea anumitor chei
      Object.keys(campuri).forEach(camp => {
        this[camp] = campuri[camp];
      });
      yield this.save();
    });
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

exports.fields = fields;
exports.plural = plural$1;
exports.methods = methods;
exports.settings = settings;
