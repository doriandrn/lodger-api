(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		12: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["/7QA",13]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "/7QA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Taxonomii = exports.Errors = exports.Lodger = void 0;

var _debug = _interopRequireDefault(__webpack_require__("NOtv"));

var _rxdb = __webpack_require__("p9ch");

var _fs = _interopRequireDefault(__webpack_require__("Po9p"));

var _json2yaml = _interopRequireDefault(__webpack_require__("gkHL"));

var _deepEqual = _interopRequireDefault(__webpack_require__("f66B"));

var _Store = _interopRequireDefault(__webpack_require__("5Fil"));

var _opts = __webpack_require__("huy0");

var _functions = __webpack_require__("ABXj");

var _forms = __webpack_require__("REmU");

var _DB = _interopRequireDefault(__webpack_require__("FOda"));

var _Form = __webpack_require__("512P");

var _Errors = __webpack_require__("LORn");

var _vue = _interopRequireDefault(__webpack_require__("Kw5r"));

var _search = __webpack_require__("5u1Y");

var _serviciu = __webpack_require__("0fNj");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const {
  NODE_ENV
} = process.env;
const subscribers = {
  main: {},
  registru: {},
  listeDePlata: {},
  statistici: {},
  playground: {} // altSubscriber: { ... }

};
var Taxonomii;
exports.Taxonomii = Taxonomii;

(function (Taxonomii) {
  Taxonomii["asociatie"] = "asociatie";
  Taxonomii["bloc"] = "bloc";
  Taxonomii["apartament"] = "apartament";
  Taxonomii["factura"] = "factura";
  Taxonomii["incasare"] = "incasare";
  Taxonomii["cheltuiala"] = "cheltuiala";
  Taxonomii["serviciu"] = "serviciu";
  Taxonomii["furnizor"] = "furnizor";
  Taxonomii["utilizator"] = "utilizator";
})(Taxonomii || (exports.Taxonomii = Taxonomii = {}));

var Errors;
/**
 * Loads all forms for taxonomies
 * @param taxonomies
 */

exports.Errors = Errors;

(function (Errors) {
  Errors["missingDB"] = "Missing database";
  Errors["invalidPluginDefinition"] = "Invalid plugin definition";
  Errors["pluralsAlreadyDefined"] = "Plurals are already defined, aborting";
  Errors["missingCoreDefinitions"] = "Invalid Lodger build. Missing core definitions";
  Errors["invalidPreferenceIndex"] = "Invalid preference index supplied";
  Errors["invalidPropertySupplied"] = "Invalid property supplied";
  Errors["noPlural"] = "Could not find plural definition for %%";
  Errors["missingData"] = "Missing data %%";
  Errors["couldNotWriteFile"] = "Cannot write file";
})(Errors || (exports.Errors = Errors = {}));

function loadForms(_x) {
  return _loadForms.apply(this, arguments);
}

function _loadForms() {
  _loadForms = _asyncToGenerator(function* (taxonomies) {
    return Object.assign({}, ...(yield Promise.all(taxonomies.map(
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(function* (tax) {
        return {
          [tax]: yield _Form.Form.loadByName(tax)
        };
      });

      return function (_x8) {
        return _ref5.apply(this, arguments);
      };
    }()))));
  });
  return _loadForms.apply(this, arguments);
}

const plugins = [];
const vueHelperObj = {
  docs: [],
  items: {},
  criteriu: {},
  fetching: false
};
const subscribedTaxes = [];

function initialSubscribe(_x2) {
  return _initialSubscribe.apply(this, arguments);
} // Filters the documents array for the one with the id


function _initialSubscribe() {
  _initialSubscribe = _asyncToGenerator(function* ({
    taxonomie,
    plural,
    collections,
    store
  }) {
    // const debug = Debug('lodger:initialSubscribe')
    switch (taxonomie) {
      // insert predefined services
      case 'serviciu':
        _serviciu.predefinite.forEach(
        /*#__PURE__*/
        function () {
          var _ref6 = _asyncToGenerator(function* (denumire) {
            yield collections[plural].insert({
              denumire
            });
          });

          return function (_x9) {
            return _ref6.apply(this, arguments);
          };
        }());

        break;
      // insert admin user

      case 'utilizator':
        const {
          _id
        } = yield collections[plural].insert({
          name: 'Administrator',
          rol: 'admin'
        });
        store.dispatch('utilizator/set_active', _id);
        break;
    }

    subscribedTaxes.push(taxonomie);
  });
  return _initialSubscribe.apply(this, arguments);
}

const _theDoc = (docs, id) => {
  if (!docs.length) throw new _Errors.LodgerError('empty docs provided');
  const doc = docs.filter(doc => doc._id === id)[0];
  if (!(doc && (0, _rxdb.isRxDocument)(doc))) throw new _Errors.LodgerError('no doc found %%', {
    id
  });
  return doc;
};
/**
 * Main holder for temporary items subscribed to
 *
 * -> a vue helper for reactivity
 * holds RX documents
 * and methods to accezss / manipulate them
 */


const vueHelper = new _vue.default({
  data() {
    return {
      subsData: {}
    };
  },

  // created () {
  //   const debug = Debug('lodger:helper:created')
  //   this.$on('updatedData', data => {
  //     debug('G', data)
  //     // const { subscriberName, plural } = data
  //   })
  // },
  computed: {
    ids() {
      return (tax, subName) => {
        return Object.keys(this.subsData[subName][tax]);
      };
    }

  },
  methods: {
    getItem(taxonomie, id, subscriberName) {
      var _this = this;

      return _asyncToGenerator(function* () {
        let item;
        const debug = (0, _debug.default)('lodger:getItem');
        if (subscriberName === undefined) subscriberName = 'main';
        const {
          subsData
        } = _this; // // return item
        // return new Promise(async (resolve, reject) => {
        //   // await rxdb to update data first.
        //   await this.$nextTick()

        try {
          const s = subsData[subscriberName][taxonomie]; // debug('S', subscriberName, taxonomie, s, s.docs.length)

          if (s.docs && s.docs.length) return _theDoc(s.docs, id);
        } catch (e) {
          Object.keys(_this.subsData).forEach(sub => {
            if (item) return; // debug('trying sub', sub)

            const s = subsData[sub][taxonomie]; // debug(`D[${sub}][${taxonomie}]:`, s)

            if (!(s && s.docs && s.docs.length)) return;
            item = _theDoc(s.docs, id);
            if (item) debug('item gasit din a 2a', {
              taxonomie,
              subscriberName,
              s,
              item
            });
          });
        } finally {// item = await collections[plural].findOne(id).exec()
        }

        return item; // // })
        // })
      })();
    }

  }
});

class Lodger {
  constructor(taxonomii, forms, db, store) {
    this.taxonomii = taxonomii;
    this.forms = forms;
    this.db = db;
    this.store = store;
    const debug = (0, _debug.default)('lodger:constructor'); // const subscriberData = this.subscriberData.bind(this)

    taxonomii.forEach(tax => {
      const {
        plural
      } = forms[tax];
      Object.defineProperty(this, plural, {
        get() {
          // debug('getter tax apelat')
          return (subscriberName = 'main') => {
            try {
              return vueHelper.subsData[subscriberName][plural].items;
            } catch (e) {
              throw new _Errors.LodgerError('not yet defined. wait more! :) %%', {
                subscriberName,
                plural
              });
            }
          };
        }

      });
    }); // console.error(Object.getOwnPropertyNames(this))
    // todo, remove on prod
    // try { window.dh = vueHelper } catch (e) {}
  }
  /**
   * Notifies the user about an update/change
   * - Store action wrapper -
   */


  notify(notification) {} // console.info(notification)
  // this.store.dispatch('notify', notification)

  /**
   * Adds / updates an entry in the DB
   *
   * @param taxonomie
   * @param data
   */


  put(taxonomy, data, subscriber) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      // const debug = Debug('lodger:put')
      if (!data || Object.keys(data).length < 1) throw new _Errors.LodgerError(Errors.missingData, data);
      const {
        db,
        store,
        forms
      } = _this2;
      const {
        plural
      } = forms[taxonomy]; // if (!plural) throw new LodgerError(Errors.noPlural, taxonomy)

      const colectie = db.collections[plural];
      /**
       * If form submitted with an _id, must be an upsert
       */

      const method = data._id ? 'upsert' : 'insert';
      const form = forms[taxonomy];
      const references = form.referenceTaxonomies;

      const referencesIds = _this2.activeReferencesIds(references);
      /**
       * add references, default values, etc
       */


      const internallyHandledData = (0, _forms.handleOnSubmit)(data, {
        referencesIds,
        store
      });
      /**
       * do the insert / upsert and following actions
       */

      try {
        const doc = yield colectie[method](internallyHandledData);
        const id = doc._id;
        store.dispatch(`${taxonomy}/set_last`, id);

        _this2.select(taxonomy, {
          doc,
          id,
          subscriber
        });

        _this2.notify({
          type: 'success',
          text: `pus ${taxonomy} ${id}`
        });

        return doc;
      } catch (e) {
        _this2.notify({
          type: 'error',
          text: String(e)
        });
      }
    })();
  }
  /**
   * Removes a Document from the DB
   *
   * @param taxonomie
   * @param id
   */


  trash(taxonomie, id) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      const {
        db,
        forms
      } = _this3;
      const debug = (0, _debug.default)('lodger:trash');
      const {
        plural
      } = forms[taxonomie];
      if (!plural) throw new _Errors.LodgerError('wtf');
      const col = db.collections[plural];
      const doc = yield col.findOne(id);
      yield doc.remove();
      debug(`deleted ${taxonomie} ID ${id}`);
      return true;
    })();
  }
  /**
   * select an item
   * brings in the active Document from DB
   *
   * @param taxonomie
   * @param id
   */


  select(taxonomie, data) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      const debug = (0, _debug.default)('lodger:select');
      const {
        dispatch
      } = _this4.store;
      const form = _this4.forms[taxonomie];
      if (!form) throw new _Errors.LodgerError('invalid taxonomy %%', taxonomie);
      const {
        plural
      } = form;
      const isObj = typeof data === 'object' && data !== null;
      const id = isObj && data.id ? data.id : data;
      const subscriber = isObj && data.subscriber ? data.subscriber : undefined;
      yield dispatch(`${taxonomie}/select`, id); // // deselect
      // if (!id) {
      //   await dispatch(`${taxonomie}/select`, undefined)
      //   return
      // }
      // // delay this, await for changes from rxdbb
      // const doc = isObj && data.doc ?
      //   data.doc :
      //   await vueHelper.getItem(plural, id, subscriber)
      // debug('selected doc', doc._id)
      // if (!doc) {
      //   throw new LodgerError('invalid id supplied on select %%', id)
      // } else {
      //   this._activeDocument = { taxonomie, doc }
      //   await dispatch(`${taxonomie}/select`, id)
      // }
      // on deselect, unsubscribe
      // if (id === null) await this.unsubscribe(plural, subscriber) //todo: use data.subscribe .unsubscribe()
    })();
  }
  /**
   * Active document for taxonomy
  */


  set _activeDocument(docHolder) {
    let {
      taxonomie,
      doc
    } = docHolder;
    const debug = (0, _debug.default)('lodger:_activeDocument');
    const gName = `${taxonomie}/activeDoc`;
    const {
      store
    } = this;

    if (!store.getters.hasOwnProperty(gName)) {
      Object.defineProperty(store.getters, gName, {
        configurable: false,

        get() {
          return doc;
        },

        set(newDoc) {
          doc = newDoc;
        }

      });
    } else {
      store.getters[gName] = doc;
    }
  }
  /**
   * Cauta in searchMap
   * @param input - string de cautat
   */


  search(input, searchTaxonomy) {
    if (!input) return;
    const debug = (0, _debug.default)('lodger:search');
    const searchMap = this.getters['searchMap'];

    if (!searchMap) {
      debug('no search map found in getters, search not working !!');
      return;
    }

    const results = {};
    Object.assign(results, {
      clear: () => {
        Object.keys(results).forEach(result => results[result] = []);
      }
    });
    Object.keys(searchMap).forEach(tax => {
      if (searchTaxonomy && searchTaxonomy !== tax) return;
      const iterator = searchMap[tax].entries();
      results[tax] = [];

      for (let [key, value] of iterator) {
        if (typeof value === 'function') continue;
        const relevance = (0, _search.string_similarity)(String(input), value);
        results[tax].push({
          id: key,
          relevance,
          value
        });
      }

      results[tax] = results[tax].sort((a, b) => Number(a.relevance) - Number(b.relevance)).reverse().slice(0, 6);
    });
    return results;
  }
  /**
  * Updateaza datele subscriberi-lor,
  * date folosite de getteri pentru a fi
  * afisate in interfata
  *
  * TODO: de exportat de -aici
  *
  * Usage: subscribes DB changes to a given variable (binder)
  * @returns {Subscriber}
  *
  */


  subscribe(taxonomii, criteriuCerut, subscriberName = 'main') {
    var _this5 = this;

    const debug = (0, _debug.default)('lodger:subscribe');
    const {
      db: {
        collections
      },
      store,
      forms
    } = this;
    const {
      getters
    } = store; // always have it as an array

    taxonomii = typeof taxonomii === 'string' ? Array(taxonomii) : taxonomii;
    debug('--- SUBSCRIBING ---\n', taxonomii, '\ncriteriu cerut: ', criteriuCerut);
    if (!subscribers[subscriberName]) Object.assign(subscribers, {
      [subscriberName]: {}
    });
    const subscriber = subscribers[subscriberName];

    if (!vueHelper.subsData[subscriberName]) {
      _vue.default.set(vueHelper.subsData, subscriberName, {}); // debug('D initializat subscriber: ', subscriberName)

    }

    taxonomii.forEach(taxonomie => {
      const {
        plural
      } = forms[taxonomie];
      const colectie = collections[plural];
      if (!colectie) throw new _Errors.LodgerError('invalid collection %%', plural);
      const criteriu = Object.assign({}, _objectSpread({}, (0, _functions.getCriteriu)(plural, JSON.parse(JSON.stringify(criteriuCerut || {}))))); // debug(`${taxonomie}: criteriu cerut`, { ...criteriuCerut })
      // debug(`${taxonomie}: criteriu`, criteriu)

      let {
        limit,
        index,
        sort,
        find
      } = criteriu;
      const paging = Number(limit || 0) * (index || 1);
      let unwatch;

      if (subscribedTaxes.indexOf(taxonomie) < 0) {
        initialSubscribe({
          taxonomie,
          plural,
          collections,
          store
        });
      } // Define the data object container


      if (!vueHelper.subsData[subscriberName][plural]) {
        const freshO = Object.assign({}, vueHelperObj);
        freshO.criteriu = Object.assign({}, criteriu);

        _vue.default.set(vueHelper.subsData[subscriberName], plural, freshO); // debug(`setat gol D[${subscriberName}][${plural}]`, freshO)
        // add watcher for criteriu and when it changes
        // fire this subscribe func again


        if (!(0, _functions.taxIsMultipleSelect)(taxonomie)) {
          const everyKeyInCriteriu = vm => _objectSpread({}, vm.subsData[subscriberName][plural].criteriu);

          unwatch = vueHelper.$watch(everyKeyInCriteriu, (newC, oldC) => {
            if (!newC || (0, _deepEqual.default)(newC, oldC)) return;
            this.subscribe(taxonomie, newC, subscriberName);
          }, {
            deep: true,
            immediate: false
          });
        }
      } else {
        // vueHelper[subscriberName][plural].criteriu = criteriu
        vueHelper.subsData[subscriberName][plural].fetching = true; // this.unsubscribe(plural, subscriberName) // todo: update ot new sub model
      }

      if (typeof unwatch === 'function') vueHelper.subsData[subscriberName][plural].unwatch = unwatch;
      subscriber[plural] = colectie.find(find).limit(paging).sort(sort).$.subscribe(
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(function* (changes) {
          // DO NOT RETURN IF NO CHANGES!!!!!!!
          // debug(`${plural} for subscriber[${subscriberName}]`, changes)
          const x = vueHelper.subsData[subscriberName][plural];
          const selectedId = getters[`${taxonomie}/selected`]; // update data objects inside

          x.docs = changes.map(change => Object.freeze(change)) || [];
          x.items = Object.assign({}, ...changes.map(item => ({
            [item._id]: item._data
          })));
          x.fetching = false; // set the active document from selected id

          if (x.items[selectedId]) {
            const doc = changes.filter(change => change._id === selectedId)[0];
            _this5._activeDocument = {
              doc,
              taxonomie
            };
            debug('got active doc', taxonomie, x.items[selectedId]._id);
          } else {
            // ID is not in changes, lookup DB, otherwise it's invalid
            const doc = yield collections[plural].findOne(selectedId);

            if (!doc) {
              throw new _Errors.LodgerError('invalid id supplied', plural, selectedId);
            } else {
              _this5._activeDocument = {
                doc,
                taxonomie
              };
            } // an invalid ID was provided,  maybe?

          } // vueHelper.$emit('updatedData', { subscriberName, plural })


          debug(`new ${plural}`, Object.keys(x.items).length);
        });

        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }());
    });
    return subscriber;
  }
  /**
   * Array of taxonomies that have no reference
   * root taxonomies
   *
   * @returns {Array}
   */


  get taxonomiesWithoutReference() {
    const {
      forms
    } = this;
    return this.taxonomii.filter(tax => {
      const refs = forms[tax].referenceTaxonomies;
      return !(refs && refs.length);
    });
  }
  /**
   * Sets a preference either in DB or store
   *
   */


  setPreference(preference, value) {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      const debug = (0, _debug.default)('lodger:set');
      const {
        store
      } = _this6;
      const allowedTaxonomies = ['client', 'user'];
      if (!preference) throw new _Errors.LodgerError(Errors.invalidPreferenceIndex);
      const taxonomy = preference.split('.')[0];

      if (!taxonomy || allowedTaxonomies.indexOf(taxonomy) < 0) {
        throw new _Errors.LodgerError(Errors.invalidPreferenceIndex);
      }

      debug('setting preference', preference, value);

      switch (taxonomy) {
        case 'client':
          store.commit('preferences/update', {
            path: preference.replace('client.', ''),
            value
          });
          break;

        case 'user':
          // db.collections.utilizator....
          break;
      }
    })();
  }
  /**
   * Active plugins list
   */


  get plugins() {
    return plugins;
  }
  /**
   * Lodger Getters
   * All UI connects with this
   * combines DB & Store getters
   *
   */


  get getters() {
    return this.store.getters;
  }
  /**
   * Combined preferences getter
   * gets values from DB and store
   */


  get preferences() {
    const {
      db,
      store
    } = this;
    const preferences = {
      client: store.getters.preferences,
      user: db.collections['preferences']
    };
    return preferences;
  }
  /**
   * Init / build function
   *
   * Build steps: (order matters)
   * 1. Hook up the taxonomies
   * 2. Lodger Forms based on taxonomies
   * 3. DB
   * 4. Store
   *
   * @param {object} options
   * @returns {Lodger}
   *
   */


  static build(options) {
    return _asyncToGenerator(function* () {
      let {
        dbCon
      } = options || _opts.buildOpts;
      const debug = (0, _debug.default)('lodger:build');
      debug(`building in ${NODE_ENV} mode ...`);
      const taxonomii = Object.keys(Taxonomii);
      let forms;

      try {
        forms = yield loadForms(taxonomii);
      } catch (e) {
        throw new _Errors.LodgerError('loading forms failed %%', e);
      }

      if (!forms) {
        throw new _Errors.LodgerError('build failed. forms could not be inited.');
      } else {
        debug(forms);
      }

      debug(`Loaded ${Object.keys(forms).length} forms ok.`);

      const _collections = taxonomii.map(tax => forms[tax].collection);

      const db = yield (0, _DB.default)(_collections, dbCon);
      const store = new _Store.default({
        taxonomii,
        forms
      }); // const { collections } = await db

      if (options) Object.assign(_opts.buildOpts, _objectSpread({}, options));
      /**
       * When a taxonomy item gets SELECTED,
       * try to call all DB methods for refrences of the taxonomy
       *
       */

      store.subscribe(
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(function* ({
          type,
          payload
        }, state) {
          const path = type.split('/');
          if (path[1] !== 'select') return;
          const debug = (0, _debug.default)('lodger:SELECTstoreSubscriber');
          const tax = path[0];
          debug('payload', payload);
          if (!payload) return;
          const id = typeof payload === 'string' ? payload : payload.id;
          if (id === store.getters[`tax/selected`]) return;
          const reference = {
            [`${tax}Id`]: id
          };
          const {
            referenceTaxonomies
          } = forms[tax]; // taxonomies that depend on the selected tax and subscriber
          // todo: move from here

          const dependentTaxonomies = [];
          Object.keys(forms).forEach(taxForm => {
            const {
              referenceTaxonomies
            } = forms[taxForm];
            if (!referenceTaxonomies || referenceTaxonomies.indexOf(tax) < 0) return;
            dependentTaxonomies.push(taxForm);
          });
          debug(`${tax} dep taxes:`, dependentTaxonomies); // call methods of references documents

          referenceTaxonomies.forEach(
          /*#__PURE__*/
          function () {
            var _ref3 = _asyncToGenerator(function* (refTax) {
              const refdoc = store.getters[`${refTax}/activeDoc`]; // debug(`refdoc ${tax} (${refTax})`, refdoc)

              if (!refdoc) return;
              const method = refdoc[`toggle_${tax}`];
              if (!method || typeof method !== 'function') return;
              yield method(id);
              debug(`called references methods for ${refTax}`);
            });

            return function (_x6) {
              return _ref3.apply(this, arguments);
            };
          }()); // update find criteria in DH with selected Item

          if (dependentTaxonomies.length) {
            dependentTaxonomies.forEach(dTax => {
              const subscriber = payload.subscriber || 'main';
              const {
                plural
              } = forms[dTax];
              const holder = vueHelper.subsData[subscriber][plural];
              if (!holder || !holder.criteriu) return;
              debug('asignez', dTax, subscriber, reference);
              holder.criteriu.find = _objectSpread({}, reference); // deselect

              store.dispatch(`${dTax}/select`, {
                id: null,
                subscriber
              });
            });
            debug('ass dun');
          }
        });

        return function (_x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }());
      return new Lodger(taxonomii, forms, db, store);
    })();
  }
  /**
   * Extend Lodger :)
   * Todo!
   *
   * @param {LodgerPlugin} plugin
   *
   */


  static use(plugin) {
    const debug = (0, _debug.default)('lodger:use');

    if (!plugin || typeof plugin !== 'object') {
      throw new _Errors.LodgerError(Errors.invalidPluginDefinition);
    }

    const {
      name
    } = plugin;
    debug('using plugin', name);
    plugins.push(plugin);
  }
  /**
   * Destroys the Lodger instance
   *
   */


  destroy() {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      yield _this7.unsubscribeAll();
      yield _this7.db.destroy();
    })();
  }
  /**
   * Exports the DB
   * as a YML file with ext .ldb
   * date is captured
   *
   */


  export(path, cryptedData, filename) {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      const debug = (0, _debug.default)('lodger:export');
      const json = yield _this8.db.dump();
      const extension = 'ldb';
      if (!path) path = `${__webpack_require__("PENG").homeDir}/downloads/`;

      if (!filename) {
        const date = new Date();
        filename = `LdgDB-${date}`;
      }

      _fs.default.writeFile(`${path}/${filename}.${extension}`, _json2yaml.default.stringify(json), e => {
        if (e) throw new _Errors.LodgerError(Errors.couldNotWriteFile);
        debug(`written ${filename}.${extension} in path`);
      });
    })();
  }
  /**
   * TODO!!
   */


  import() {
    return _asyncToGenerator(function* () {})();
  }
  /**
   * Unsubscribe a single taxonomy from a single sub.
   * DEPRECATED
   *
   */
  // async unsubscribe (taxPlural: Plural<Taxonomie>, subscriberName: string = 'main') {
  //   const sub: Subscriber = subscribers[subscriberName]
  //   const debug = Debug('lodger:unsub')
  //   // debug('sub', sub)
  //   if (!sub[taxPlural]) {
  //     throw new LodgerError('subscriber nedefinit', {taxPlural, subscriberName})
  //   }
  //   await sub[taxPlural].unsubscribe()
  //   // unwatch & delete the data obj
  //   await vueHelper.subsData[subscriberName][taxPlural].unwatch()
  //   Vue.set(vueHelper.subsData[subscriberName], taxPlural, null)
  // }

  /**
   * Kills all active listeners for a given subscriber name
   * @param subscriberName
   */


  unsubscribeAll(subscriberName = 'main') {
    return _asyncToGenerator(function* () {
      const sub = subscribers[subscriberName];
      const debug = (0, _debug.default)('lodger:unsubAll');
      return yield Promise.all(Object.keys(sub).map(
      /*#__PURE__*/
      function () {
        var _ref4 = _asyncToGenerator(function* (subscriber) {
          yield sub[subscriber].unsubscribe();
          debug('unsubscribed', subscriber);
        });

        return function (_x7) {
          return _ref4.apply(this, arguments);
        };
      }()));
    })();
  }

  get subscribedTaxes() {
    return subscribedTaxes;
  }
  /**
   * For taxonomies that have references
   * get the referred ids
   *
   * @returns {Object}
   */


  get activeReferencesIds() {
    const {
      getters
    } = this.store;
    return references => (0, _forms.assignRefIdsFromStore)({
      references,
      getters
    });
  }

  get subscriberData() {
    const {
      forms
    } = this;
    return (taxonomy, subscriberName) => {
      const {
        plural
      } = forms[taxonomy];

      try {
        return vueHelper.subsData[subscriberName][plural].items;
      } catch (e) {
        throw new _Errors.LodgerError('nu exista %%', {
          plural,
          subscriberName
        });
      }
    };
  }

}

exports.Lodger = Lodger;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "0fNj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multipleSelect = exports.predefinite = exports.actions = exports.plural = exports.fields = void 0;
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
exports.fields = fields;
const plural = 'servicii';
exports.plural = plural;
const actions = {
  confirm: 'adaugaServiciu'
};
exports.actions = actions;
const multipleSelect = true;
exports.multipleSelect = multipleSelect;
const predefinite = ['apa', 'electricitate', 'gaze', 'termoficare', 'internet', 'evacuare-gunoi-menajer'];
exports.predefinite = predefinite;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1BQs":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./apartament": [
		"WuGB",
		0
	],
	"./apartament.ts": [
		"WuGB",
		0
	],
	"./asociatie": [
		"3RaG",
		1
	],
	"./asociatie.ts": [
		"3RaG",
		1
	],
	"./bloc": [
		"bYfg",
		2
	],
	"./bloc.ts": [
		"bYfg",
		2
	],
	"./cheltuiala": [
		"0jyb",
		3
	],
	"./cheltuiala.ts": [
		"0jyb",
		3
	],
	"./contor": [
		"F4IF",
		4
	],
	"./contor.ts": [
		"F4IF",
		4
	],
	"./factura": [
		"oSra",
		5
	],
	"./factura.ts": [
		"oSra",
		5
	],
	"./feedback": [
		"aBzF",
		6
	],
	"./feedback.ts": [
		"aBzF",
		6
	],
	"./furnizor": [
		"UdaM",
		7
	],
	"./furnizor.ts": [
		"UdaM",
		7
	],
	"./incasare": [
		"mbEA",
		8
	],
	"./incasare.ts": [
		"mbEA",
		8
	],
	"./initFinanc": [
		"k0bU",
		9
	],
	"./initFinanc.ts": [
		"k0bU",
		9
	],
	"./preferinte": [
		"aSoU",
		10
	],
	"./preferinte.ts": [
		"aSoU",
		10
	],
	"./serviciu": [
		"0fNj"
	],
	"./serviciu.ts": [
		"0fNj"
	],
	"./utilizator": [
		"VjXs",
		11
	],
	"./utilizator.ts": [
		"VjXs",
		11
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__.t(id, 7);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "1BQs";
module.exports = webpackAsyncContext;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "512P":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Errors = exports.Form = void 0;

var _debug = _interopRequireDefault(__webpack_require__("NOtv"));

var _forms = __webpack_require__("REmU");

var _Errors = __webpack_require__("LORn");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Form Errors Definition
 *
 * TODO: account for translations
 */
var Errors;
exports.Errors = Errors;

(function (Errors) {
  Errors["invalidRequested"] = "Invalid form requested: %%";
  Errors["invalidName"] = "Invalid name supplied";
  Errors["noData"] = "Form %% is missing data";
  Errors["missingName"] = "Forms should have a name";
  Errors["missingPlural"] = "A plural definition is required for %%";
})(Errors || (exports.Errors = Errors = {}));

if (false) {}

const defaultSchema = {
  title: '',
  properties: {},
  required: [],
  type: 'object',
  version: 0
};

/**
 * A valid RxJsonSchema out of the form
 */
const toRxSchema = formData => {
  const {
    name,
    fields
  } = formData;
  const schema = JSON.parse(JSON.stringify(defaultSchema));
  schema.title = name;
  fields.filter(field => !field.notInDb).forEach(field => {
    (0, _forms.pushFieldToSchema)(field, schema);
  });
  if (name !== 'serviciu') (0, _forms.addCommonFieldsToSchema)(schema);
  return schema;
};
/**
 * All indexabble fields
 * @returns {Array} the ids of all fields with index: true
 */


const lookupIndexables = fields => fields.filter(field => field.index).map(field => field.id);
/**
 * Makes a RxCollection valid collection from the form
 */


function toRxCollection(context) {
  const {
    schema,
    data: {
      plural,
      methods,
      statics
    }
  } = context;
  const name = plural;
  return {
    name,
    schema,
    methods,
    statics
  };
}
/**
 * Form class
 */


class Form {
  constructor(data) {
    this.data = data;

    _defineProperty(this, "schema", void 0);

    _defineProperty(this, "indexables", void 0);

    _defineProperty(this, "collection", void 0);

    this.indexables = lookupIndexables(data.fields);
    this.schema = toRxSchema(data);
    this.collection = toRxCollection(this); // this.sortOptions = sortOptions({ indexables, name })
  }
  /**
   * gets the sorting options for tax
   * @returns an object with each key used as a sorting option
   */


  get sortOptions() {
    const {
      indexables,
      name
    } = this;

    if (!['serviciu', 'contor'].indexOf(name)) {
      indexables.push('la');
    } // TODO: !!! ia din common methods


    const sorts = {};
    indexables.forEach(indexable => {
      const label = `sort.${indexable === 'name' ? 'az' : indexable}`;
      Object.assign(sorts, {
        [indexable]: {
          label
        }
      });
    }); // debug(`${name} => sortable fields`, sorts)

    return sorts;
  }
  /**
   * Makes a Vue-ready $data {object} suitable to be completed
   * by the user in the end form
   * as it will turn reactive
   */


  componentData(isNewForm, getters) {
    const {
      data: {
        fields
      },
      name
    } = this;
    const debug = (0, _debug.default)('lodger:Form.ts:componentData');
    let $data = {};
    fields.forEach(camp => {
      const {
        label,
        required,
        click,
        notInForm,
        notInDb
      } = camp;
      let {
        id,
        value
      } = camp;
      debug('camp.value (f)', value);
      let _def = camp.default;
      if (click && !id) camp.id = click; // skip fields

      if (isNewForm) {
        if (!notInForm || notInDb) value = null;
      } // apply getters to funcs


      if (typeof value === 'function' && getters) {
        try {
          value = value(getters);
          debug('valoare dupa apel functie: ', value);
        } catch (e) {
          debug('failed to get val', label, getters);
          value = null;
        }
      }

      if (typeof _def === 'function') _def = _def(getters); // label

      camp.label = label || `${name ? `${name}.new.` : ''}${id}`; // validarea de required

      if (required || camp.v && camp.v.indexOf('required') < 0) camp.v = `required|${camp.v || ''}`; // valoarea finala

      $data[id] = null;
      $data[id] = value !== null && value !== undefined ? value : _def;
    });
    return $data;
  }
  /**
   * Loads a known form by name
   *
   * @param name
   */


  static loadByName(name) {
    const debug = (0, _debug.default)('lodger:Form');
    if (!name) throw new _Errors.FormError('no name supplied for form');
    let form;
    return __webpack_require__("1BQs")(`./${name}`).then(formData => {
      form = _objectSpread({}, formData);
      if (form.default) form = form.default;
      Object.assign(form, {
        name
      });
      debug('✓', name);
      return new Form(_objectSpread({}, form));
    }).catch(err => {
      throw new _Errors.FormError(err);
    });
  }

  get name() {
    return this.data.name;
  }

  get plural() {
    return this.data.plural;
  }
  /**
   * Reference taxonomies of a taxonomy
   *
   * @returns {Array} taxonomii
   */


  get referenceTaxonomies() {
    const {
      data: {
        fields
      }
    } = this;
    return fields.filter(field => field.id.indexOf('Id') === field.id.length - 2).map(field => field.id.replace('Id', ''));
  }
  /**
   * Items to be display to user,
   * @returns {Object} the keys of the fields: their position
   *
   */


  get __displayItemKeys() {
    const {
      fields
    } = this.data;
    return Object.assign({}, ...fields.filter(field => field.showInList).map(field => ({
      [field.id]: field.showInList
    })));
  }

}

exports.Form = Form;

/***/ }),

/***/ "5Fil":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.customOpts = void 0;

var _vue = _interopRequireDefault(__webpack_require__("Kw5r"));

var _vuex = _interopRequireDefault(__webpack_require__("L2JU"));

var _store = __webpack_require__("ChhQ");

var _Errors = __webpack_require__("LORn");

var RootModule = _interopRequireWildcard(__webpack_require__("tzzb"));

var _debug = _interopRequireDefault(__webpack_require__("NOtv"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_vue.default.use(_vuex.default);

const debug = (0, _debug.default)('lodger:Store');
const modules = {};
var Errors;

(function (Errors) {
  Errors["invalidModule"] = "Invalid Module";
})(Errors || (Errors = {}));

const customOpts = (context, options) => {
  if (!context.taxonomii && !context.forms) return;
  const {
    taxonomii,
    forms
  } = context;
  /**
   * Builds modules based on taxonomies
   * TODO: make this a method ?!
   */

  if (!(taxonomii && taxonomii.length)) throw new _Errors.LodgerError('No taxes supplied');
  taxonomii.forEach(tax => {
    const {
      plural
    } = forms[tax];
    modules[tax] = (0, _store.setupSharedMethods)(undefined, undefined, tax, plural);
  });

  if (RootModule && RootModule.modules) {
    // LodgerStore.use(RootModule, false)
    Object.assign(options, RootModule);
    Object.keys(RootModule.modules).forEach(module => {
      LodgerStore.use({
        [module]: RootModule.modules[module]
      }, module !== 'toast');
    });
  }

  options.modules = modules;
  return options;
}; // export default class LodgerStore implements StoreOptions<RootState> {


exports.customOpts = customOpts;

class LodgerStore extends _vuex.default.Store {
  constructor(context, options = {}) {
    super(customOpts(context, options));
    this.context = context;
    this.options = options;

    _defineProperty(this, "modules", {});
  }
  /**
   * Use a store module
   * to be used before calling the constructor
   *
   * @param module
   * @param {Boolean} namespaced - if it should be namespaced
   */


  static use(module, namespaced = true) {
    if (!module || typeof module !== 'object') {
      throw new _Errors.LodgerError(Errors.invalidModule);
    }

    const key = Object.keys(module)[0];
    if (!key || !module[key]) throw new _Errors.LodgerError(Errors.invalidModule);
    debug('using module', key);
    modules[key] = Object.assign({}, module[key], {
      namespaced
    });
  }

}

exports.default = LodgerStore;

/***/ }),

/***/ "5u1Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.string_similarity = exports.get_bigrams = void 0;

const get_bigrams = function (string) {
  var i, j, ref, s, v;
  s = string.toLowerCase();
  v = new Array(s.length - 1);

  for (i = j = 0, ref = v.length; j <= ref; i = j += 1) {
    v[i] = s.slice(i, i + 2);
  }

  return v;
};

exports.get_bigrams = get_bigrams;

const string_similarity = function (str1, str2) {
  var hit_count, j, k, len, len1, pairs1, pairs2, union, x, y;

  if (str1.length > 0 && str2.length > 0) {
    pairs1 = get_bigrams(str1);
    pairs2 = get_bigrams(str2);
    union = pairs1.length + pairs2.length;
    hit_count = 0;

    for (j = 0, len = pairs1.length; j < len; j++) {
      x = pairs1[j];

      for (k = 0, len1 = pairs2.length; k < len1; k++) {
        y = pairs2[k];

        if (x === y) {
          hit_count++;
        }
      }
    }

    if (hit_count > 0) {
      return 2.0 * hit_count / union;
    }
  }

  return 0.0;
};

exports.string_similarity = string_similarity;

/***/ }),

/***/ "ABXj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.traverse = traverse;
exports.taxIsMultipleSelect = exports.getTaxonomyConfig = exports.getCriteriu = exports.slugify = exports.spleet = exports.no$ = void 0;

var _lodger = _interopRequireDefault(__webpack_require__("Jh6w"));

var _debug = _interopRequireDefault(__webpack_require__("NOtv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Traverseaza un obiect cu o functie
 *
 * @param {object} obiectul de traversat
 * @param {function} fn - callback -> cheie, valoare
 */
function traverse(o, fn) {
  for (let i in o) {
    fn.apply(this, [i, o[i]]);
    if (o[i] !== null && typeof o[i] === "object") traverse(o[i], fn);
  }
}
/**
 * Returneaza config-ul pentru o taxonomie sau default
 *
 * @param {string} taxonomie
 */


const getTaxonomyConfig = tax => {
  const {
    taxonomii
  } = _lodger.default;
  const {
    defaults
  } = taxonomii;
  if (!tax) return defaults;
  const config = taxonomii[tax];
  return config ? config : defaults;
};
/**
 * Criteriu default pentru o taxonmoie ceruta
 *
 * @param {string} taxonomie
 * @param {object} criteriuCerut - poate fi diferit decat default
 */


exports.getTaxonomyConfig = getTaxonomyConfig;

const getCriteriu = (taxonomie, criteriuCerut) => {
  if (typeof taxonomie !== 'string') throw new Error('taxonomie incorecta');
  if (criteriuCerut && typeof criteriuCerut !== 'object') throw new Error('criteriu incorect');
  const {
    defaults
  } = _lodger.default.taxonomii;
  const debug = (0, _debug.default)('functions:getCriteriu');
  const criteriu = Object.assign({}, _objectSpread({}, defaults.criteriu), _objectSpread({}, getTaxonomyConfig(taxonomie).criteriu), _objectSpread({}, criteriuCerut)); // Object.assign(criteriu, getTaxonomyConfig(taxonomie).criteriu)
  // debug(taxonomie, 'criteriu inainte de criteriuCerut', criteriu)
  // debug(taxonomie, 'criteriu cerut', { ...criteriuCerut })
  // if (criteriuCerut) {
  //   debug('CRITERIU CERUT', criteriuCerut)
  //   let sort = {}
  //   if (criteriuCerut.sort) {
  //     // let { key, direction } = criteriuCerut.sort
  //     // if (key === 'la' && taxonomie === 'servicii') key = 'denumire'
  //     sort = key ? { [key]: direction || 1 } : {}
  //   }
  //   Object.assign(criteriu, {...criteriuCerut }, { sort })
  // }
  // switch (taxonomie) {
  //   case 'blocuri':
  //   case 'incasari':
  //   case 'cheltuieli':
  //     Object.assign(criteriu.find, { asociatieId: g => g['asociatie/activa']._id })
  //   case 'apartamente':
  //     Object.assign(criteriu.find, { bloc: { $in: g => g['bloc/ids'] } })
  // }
  // servicii,furnizori, asociatii sunt globale, n-au nevoie de criteriu de cautare

  debug(taxonomie, 'DUPA:', criteriu);
  return criteriu;
};
/**
 * Scoate '$' de la inceputul unui string
 * @param {string} str
 */


exports.getCriteriu = getCriteriu;

const no$ = str => {
  if (typeof str !== 'string') return str;
  if (str.indexOf('$') !== 0) return str;
  return no$(str.replace('$', '').trim());
};
/**
 * Imparte un string de mutatie ('asociatie/INCASEAZA')
 * @param {string} str
 */


exports.no$ = no$;

const spleet = str => {
  if (typeof str !== 'string' || str.indexOf('/') < 0) return str;
  const split = String(str).split('/');
  return {
    what: split[0],
    mutation: split[1]
  };
};
/**
 * slug-ifica... destul de descriptiv :)
 * @param {string} text
 */


exports.spleet = spleet;

const slugify = text => {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
};

exports.slugify = slugify;

const taxIsMultipleSelect = tax => ['serviciu', 'contor'].indexOf(tax) > -1;

exports.taxIsMultipleSelect = taxIsMultipleSelect;

/***/ }),

/***/ "ChhQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmptyStoreModule = createEmptyStoreModule;
exports.setupSharedMethods = setupSharedMethods;
exports.setupFromFile = setupFromFile;
Object.defineProperty(exports, "sharedStoreMethods", {
  enumerable: true,
  get: function () {
    return _sharedStoreMethods.sharedStoreMethods;
  }
});

var _Errors = __webpack_require__("LORn");

var _functions = __webpack_require__("ABXj");

var _sharedStoreMethods = __webpack_require__("uPxy");

/**
 * Creates an empty store module
 */
function createEmptyStoreModule() {
  /**
   * Empties
   */
  const state = {};
  const getters = {};
  const actions = {};
  const mutations = {};
  return {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
  };
} // const otherActions = (taxonomy, actionName) => {
//   switch (actionName) {
//     case 'select':
//       return [
//         `${taxonomy}/set_referencesIds`
//       ]
//     default:
//       return []
//   }
// }

/**
  * Shared methods across taxonomies, called individually
  *
  * @param taxonomy
  * @requires sharedMethods
  */


function setupSharedMethods(sharedMethods = _sharedStoreMethods.sharedStoreMethods, module = createEmptyStoreModule(), moduleName, plural) {
  if (typeof sharedMethods !== 'object') {
    throw new _Errors.LodgerError('invalid methods supplied');
  } // pt servicii si contoare


  const isMultiple = (0, _functions.taxIsMultipleSelect)(moduleName);
  Object.keys(sharedMethods).forEach(methodName => {
    const action = sharedMethods[methodName];
    const multipleSelect = isMultiple && action === 'select';
    module.state[methodName] = undefined;

    module.getters[methodName] = (S, G) => {
      if (multipleSelect) {
        const doc = G[`${moduleName}/activeDoc`];
        return doc ? doc[plural] : undefined;
      } else {
        return S[methodName] && S[methodName].id ? S[methodName].id : S[methodName];
      }
    };

    module.actions[action] = ({
      commit,
      dispatch
    }, data) => {
      commit(action, data); // const otherActionsToDispatch = otherActions(moduleName, methodName)
      // otherActionsToDispatch.forEach(action => {
      //   dispatch(action, )
      // })
    };

    module.mutations[action] = (s, data) => {
      s[methodName] = data;
    };
  }); // module.getters['activeDoc'] = (S: RootState) => S.doc || {}

  return module;
}
/**
 * Loads a taxonomy's store data from it's filename in store
 */


function setupFromFile(taxonomy) {
  return {};
}

/***/ }),

/***/ "FOda":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var RxDB = _interopRequireWildcard(__webpack_require__("p9ch"));

var _debug = _interopRequireDefault(__webpack_require__("NOtv"));

var _pouchdbAdapterMemory = _interopRequireDefault(__webpack_require__("b0B5"));

var _pouchdbAdapterIdb = _interopRequireDefault(__webpack_require__("Wh65"));

var _pouchdbAdapterHttp = _interopRequireDefault(__webpack_require__("ezGW"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const debug = (0, _debug.default)('lodger:db');
const {
  NODE_ENV
} = process.env; // RxDB.QueryChangeDetector.enable()
// RxDB.QueryChangeDetector.enableDebugging()
// type Adapter = 'http' | 'idb' | 'memory'
// const adapters = {
//   production: ['http', 'idb'],
//   development: ['memory']
// }
// Object.keys(adapters).forEach(env, () => {
//   adapters[env].forEach((adapterType: Adapter) => {
//     if (NODE_ENV !== env) return
//     const adapter = `pouchdb-adapter-${adapterType}`
//     RxDB.plugin(adapter)
//   })
// })

switch (NODE_ENV) {
  default:
    RxDB.plugin(_pouchdbAdapterMemory.default);
    break;

  case 'production':
    RxDB.plugin(_pouchdbAdapterHttp.default);
    RxDB.plugin(_pouchdbAdapterIdb.default);
    break;
}

function _default(_x, _x2) {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* (collections, config) {
    debug('Initing');
    const db = yield RxDB.create(Object.assign({}, config)); // show leadership in title

    db.waitForLeadership().then(() => {
      if (NODE_ENV !== 'dev') return;
      document.title = `♛ ${document.title}`;
    });
    yield Promise.all(collections.map(c => db.collection(c)));
    return db;
  });
  return _ref.apply(this, arguments);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "Jh6w":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import { version } from './package'
const version = __webpack_require__("kiQV").version;

const taxonomii = {
  defaults: {
    criteriu: {
      limit: 25,
      index: 0,
      sort: {},
      find: null
    }
  },
  asociatii: {
    criteriu: {
      limit: 100
    }
  }
};
const config = {
  version,
  taxonomii
};
var _default = config;
exports.default = _default;

/***/ }),

/***/ "LORn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormError = exports.LodgerError = void 0;

/**
 * Error logger
 */
class LodgerError extends Error {
  constructor(m, details) {
    if (details) {
      m = m.replace('%%', `"${JSON.stringify(details)}"`);
    }

    super(m); // Set the prototype explicitly.

    Object.setPrototypeOf(this, LodgerError.prototype);
  }

}
/**
 * Error logger for forms
 */


exports.LodgerError = LodgerError;

class FormError extends LodgerError {
  constructor(m, details) {
    super(m, details); // Set the prototype explicitly.

    Object.setPrototypeOf(this, FormError.prototype);
  }

}

exports.FormError = FormError;

/***/ }),

/***/ "Ljsz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const state = () => ({
  _happened: false,
  type: null,
  message: null
});

const mutations = {
  PROMPT: (state, {
    type,
    message
  }) => {
    state.type = type;
    state.message = message;
    state._happened = true;
  },
  PROMPT_OK: state => {
    state.type = null;
    state.message = null;
    state._happened = false;
  },
  PROMPT_CANCEL: state => {
    state.type = null;
    state.message = null;
  }
};
const actions = {
  confirm: ({
    commit,
    dispatch
  }) => {
    dispatch('modal/close', true, {
      root: true
    });
    commit('PROMPT_OK');
  },
  new: ({
    commit,
    dispatch
  }, prompt) => {
    dispatch('modal/open', 'prompt', {
      root: true
    });
    commit('PROMPT', prompt);
  },
  cancel: ({
    commit
  }) => {
    commit('PROMPT_CANCEL');
  }
};
const getters = {
  type: state => state.type,
  message: state => state.message,
  prompted: state => state._happened
};
var _default = {
  state,
  actions,
  mutations,
  getters
};
exports.default = _default;

/***/ }),

/***/ "P7Hp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const strings = ['text', 'textarea', 'select', 'search'];
const numbers = ['number', 'date-time', 'bani', 'date'];
const arrays = ['array', 'scari', 'servicii', 'furnizori', 'contactFields', 'contoare', 'distribuire', 'selApartamente'];
const objects = ['object'];
const formItemTypes = {
  strings,
  numbers,
  arrays,
  objects
};
var _default = formItemTypes;
exports.default = _default;

/***/ }),

/***/ "REmU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRxDBtype = toRxDBtype;
exports.handleOnSubmit = handleOnSubmit;
exports.assignRefIdsFromStore = assignRefIdsFromStore;
exports.addCommonFieldsToSchema = exports.pushFieldToSchema = exports.toSchemaField = void 0;

var _formItemTypes = _interopRequireDefault(__webpack_require__("P7Hp"));

var _debug = _interopRequireDefault(__webpack_require__("NOtv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Taxonomii } from '../../index';
const debug = (0, _debug.default)('lodger:forms');
/**
 * Converteste tipurile campurilor 'noastre' in primare
 *
 * Explicatie:
 * DB-ul nu stie decat de tipurile primare:
 * -> boolean, string, number, array, object
 * Schema noastra e mult mai detaliata
 *
 * @param {string} type
 * @returns {string} - tipul primar, eg. 'string'
 */

function toRxDBtype(type) {
  const _default = 'string';
  const {
    strings,
    numbers,
    arrays,
    objects
  } = _formItemTypes.default;
  if (!type || strings.indexOf(type) > -1) return _default;
  if (objects.indexOf(type) > -1) return 'object';
  if (numbers.indexOf(type) > -1) return 'number';
  if (arrays.indexOf(type) > -1) return 'array';
  return _default;
}
/**
 * Transforms a lodger form field to a valid RxSchema one
 *
 * @param formItem
 */


const toSchemaField = formItem => {
  if (!formItem.id) throw new Error('camp fara id');
  const {
    id,
    step,
    indexRef,
    index
  } = formItem;
  let {
    type,
    ref
  } = formItem;
  type = toRxDBtype(type);
  ref = ref ? {
    ref,
    items: {
      // Folosim doar id-uri pt. referinta intre obiecte, de aici 'string'
      type: 'string'
    }
  } : undefined;

  if (ref && indexRef) {
    Object.assign(ref, {
      index: indexRef
    });
  }

  const field = {
    type // cheiImutabile.forEach(((cheie: string) => {
    //   if (!formItem[cheie]) return
    //   Object.assign(descriereCamp, { [cheie]: formItem[cheie] })
    // })

  };
  if (index) Object.assign(field, {
    index
  });
  if (step) Object.assign(field, {
    multipleOf: step
  });
  if (ref) Object.assign(field, ref);
  return {
    [id]: field
  };
};
/**
 * Adauga un camp la schema Rx
 *
 * @param {Object} formItem - campu'
 * @param {Object} schema - schema colectiei
 * @returns {object} schema modificata
 */


exports.toSchemaField = toSchemaField;

const pushFieldToSchema = (formItem, schema) => {
  if (!formItem || !schema) throw new TypeError('parametri insuficienti');
  if (typeof formItem !== 'object' || typeof schema !== 'object') throw new TypeError('parametri incorecti');
  const {
    required,
    properties
  } = schema;
  schema.properties = properties || {};
  schema.required = required || [];
  const {
    id
  } = formItem;

  if (!id) {
    throw new TypeError(`No ID supplied for formItem ${formItem}`);
  }

  if (formItem.required && required && required.indexOf(id) < 0) schema.required.push(id);
  Object.assign(schema.properties, toSchemaField(formItem));
  return schema;
};
/**
 * Pt taxonomia ceruta
 * ia formul
 * si tot ce are nevoie de Id de altceva
 * se populeaza
 *
 * @param { references, getters }
 * @returns {Object} eg { asociatieId: 'XXXX' }
 */


exports.pushFieldToSchema = pushFieldToSchema;

function assignRefIdsFromStore(context) {
  const {
    references,
    getters
  } = context;
  if (!(references && references.length)) return;
  const refsObj = {};
  references.map(tax => {
    refsObj[`${tax}Id`] = getters[`${tax}/selected`];
  });
  return refsObj;
}
/**
 * Manipulates the final data before submitting the form to the DB
 *
 * @param data
 */


function handleOnSubmit(data, context) {
  const manipulatedData = {}; // not data.denumire pt servicii :/

  if (!data.la && !data.denumire) data.la = Date.now();
  Object.keys(data).forEach(what => {
    let value = data[what];

    if (value === null || value === 'undefined') {
      debug('fara val', what);
      return;
    }

    manipulatedData[what] = value;
  });
  if (!context) return manipulatedData;
  const {
    referencesIds
  } = context;
  Object.assign(manipulatedData, referencesIds); // debug('data after hOS', manipulatedData)

  return manipulatedData;
}
/**
 * Common fields for all taxonomies
 *
 * @param schema
 * @param commonFields
 */


const addCommonFieldsToSchema = (schema, commonFields = [{
  // Data adaugarii / when added
  id: 'la',
  type: 'date-time',
  required: true,
  // for filters / sorts
  index: true,
  notInForm: true,
  showInList: 'secondary'
}]) => {
  commonFields.forEach(item => {
    Object.assign(schema.properties, toSchemaField(item));
  });
};

exports.addCommonFieldsToSchema = addCommonFieldsToSchema;

/***/ }),

/***/ "huy0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildOpts = void 0;
const {
  NODE_ENV
} = process.env;
const buildOpts = {
  dbCon: {
    name: 'Lodger/',
    adapter: 'memory',
    password: 'l0dg3rp4$$',
    ignoreDuplicate: NODE_ENV === 'test'
  },
  usePersistedState: false
};
exports.buildOpts = buildOpts;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "kiQV":
/***/ (function(module) {

module.exports = {"name":"lodger","version":"0.0.1","description":"Offline-first API for HOAs","main":"dist/index.js","repository":"https://github.com/doriandrn/lodger-api.git","author":"Dorian Tudorache <dorian.snaz@gmail.com>","license":"MIT","scripts":{"test":"jest","type-check":"tsc --noEmit","type-check:watch":"npm run type-check -- --watch","build:types":"tsc --emitDeclarationOnly","build:js":"rollup -c","build":"yarn build:types && yarn build:js"},"devDependencies":{"@babel/core":"^7.2.0","@babel/plugin-proposal-class-properties":"^7.2.1","@babel/plugin-proposal-object-rest-spread":"^7.2.0","@babel/plugin-syntax-dynamic-import":"^7.2.0","@babel/plugin-transform-runtime":"^7.2.0","@babel/preset-env":"^7.2.0","@babel/preset-es2015":"^7.0.0-beta.53","@babel/preset-typescript":"^7.1.0","@types/debug":"^0.0.31","@types/faker":"^4.1.4","@types/jest":"^23.3.10","@types/node":"^10.12.10","babel-jest":"^23.6.0","babel-loader":"^8.0.4","debug":"^4.1.0","deep-equal":"^1.0.1","faker":"^4.1.0","fs":"^0.0.1-security","fx":"^9.0.1","jest":"^23.6.0","json2yaml":"^1.1.0","rollup":"^0.67.4","rollup-plugin-babel":"^4.0.3","rollup-plugin-commonjs":"^9.2.0","rollup-plugin-node-builtins":"^2.1.2","rollup-plugin-node-globals":"^1.4.0","rollup-plugin-node-resolve":"^3.4.0","rollup-plugin-typescript":"^1.0.0","ts-jest":"^23.10.5","ts-loader":"^5.3.1","typescript":"^3.1.6","webpack-cli":"^3.1.2"},"dependencies":{"@babel/runtime":"^7.2.0","awesome-typescript-loader":"^5.2.1","pouchdb-adapter-http":"^7.0.0","pouchdb-adapter-idb":"^7.0.0","pouchdb-adapter-memory":"^7.0.0","rxdb":"^8.0.4","rxjs":"^6.3.3","source-map-loader":"^0.2.4","vue":"^2.5.17","vuex":"^3.0.1","vuex-persistedstate":"^2.5.4","vuex-toast":"^0.1.3","webpack":"^4.26.1"}};

/***/ }),

/***/ "pOft":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const state = {
  open: false,
  content: null,
  data: null
};
const getters = {
  open: state => state.open,
  content: state => state.content,
  data: state => state.data
};
const mutations = {
  OPEN: (state, content) => {
    if (content) state.content = content;
    state.open = true;
  },
  DATA: (state, data) => {
    state.data = data;
  },
  CLOSE: state => {
    state.open = false;
    state.content = null;
    state.data = null;
  }
};
const actions = {
  open: ({
    commit
  }, content) => {
    // console.log('CC', content)
    switch (typeof content) {
      case 'object':
        commit('DATA', content.data);
        commit('OPEN', content.id);
        return;

      case 'string':
        commit('DATA', content);
        break;
    }

    commit('OPEN', content);
  },
  close: ({
    commit,
    dispatch,
    getters,
    rootGetters
  }) => {
    const prompt = rootGetters['modal/content'] === 'prompt';
    commit('CLOSE');
    if (prompt) dispatch('prompt/cancel', null, {
      root: true
    });
  }
};
var _default = {
  state,
  actions,
  mutations,
  getters
};
exports.default = _default;

/***/ }),

/***/ "tzzb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modules = exports.actions = exports.state = void 0;

var _lodger = _interopRequireDefault(__webpack_require__("Jh6w"));

var _modal = _interopRequireDefault(__webpack_require__("pOft"));

var _prompt = _interopRequireDefault(__webpack_require__("Ljsz"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * MODULES
 */
// TOAST
// import { createModule } from 'vuex-toast'
// MODAL
const {
  version
} = _lodger.default;
const state = {
  locale: 'ro',
  version
};
exports.state = state;
const actions = {
  notify: ({
    dispatch
  }, notificare) => {
    dispatch('@@toast/ADD_TOAST_MESSAGE', notificare);
  }
};
exports.actions = actions;
const modules = {
  // toast: createModule({ dismissInterval: 5000 }),
  modal: _modal.default,
  prompt: _prompt.default
};
exports.modules = modules;

/***/ }),

/***/ "uPxy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharedStoreMethods = void 0;

/**
 * @param { methoName: action }
 */
const sharedStoreMethods = {
  selected: 'select',
  last: 'set_last'
};
exports.sharedStoreMethods = sharedStoreMethods;

/***/ })

/******/ });
});