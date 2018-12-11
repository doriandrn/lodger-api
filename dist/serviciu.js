'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const fields = [
/**
 * desi globale, serviciile sunt pt asociatii.
 * excludem asta din db, pastram pt referinta
 */
{
  id: 'asociatieId',
  notInDb: true
}, {
  id: 'denumire',
  required: true,
  showInList: 'primary',
  isPrimary: true,
  index: true
}, {
  id: 'furnizori',
  type: 'array',
  notInForm: true
}, {
  id: 'contoare',
  type: 'contoare'
}];
const plural$1 = 'servicii';
const actions = {
  confirm: 'adaugaServiciu'
};
const multipleSelect = true;
const predefinite = ['apa', 'electricitate', 'gaze', 'termoficare', 'internet', 'evacuare-gunoi-menajer'];

exports.fields = fields;
exports.plural = plural$1;
exports.actions = actions;
exports.predefinite = predefinite;
exports.multipleSelect = multipleSelect;
