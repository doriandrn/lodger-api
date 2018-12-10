'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const fields = [{
  id: 'name',
  required: true,
  showInList: 'primary',
  index: true
}, {
  id: 'servicii',
  type: 'servicii',
  required: true,
  servicii: g => g['asociatie/activeDoc'].servicii,
  ref: 'serviciu'
}, {
  id: 'idN'
}];
const actiuni = {
  confirm: 'adaugaFurnizor'
};
const plural = 'furnizori';

exports.fields = fields;
exports.actiuni = actiuni;
exports.plural = plural;
