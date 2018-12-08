(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Lodger"] = factory();
	else
		root["Lodger"] = factory();
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
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonpLodger"] = window["webpackJsonpLodger"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["/7QA",1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "/7QA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lodger", function() { return Lodger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Errors", function() { return Errors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Taxonomii", function() { return Taxonomii; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("NOtv");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxdb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("p9ch");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("Po9p");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var json2yaml__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("gkHL");
/* harmony import */ var json2yaml__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(json2yaml__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("f66B");
/* harmony import */ var deep_equal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(deep_equal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_Store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("5Fil");
/* harmony import */ var _lib_build_opts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("huy0");
/* harmony import */ var _lib_helpers_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("ABXj");
/* harmony import */ var _lib_helpers_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("REmU");
/* harmony import */ var _lib_DB__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("FOda");
/* harmony import */ var _lib_Form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("512P");
/* harmony import */ var _lib_Errors__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("LORn");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("Kw5r");
/* harmony import */ var _lib_helpers_search__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("5u1Y");
/* harmony import */ var forms_serviciu__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("0fNj");

/// <reference path="main.d.ts" />















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
})(Taxonomii || (Taxonomii = {}));

var Errors;

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
})(Errors || (Errors = {}));

const loadForms = taxonomies => Object.assign({}, ...taxonomies.map(tax => ({
  [tax]: _lib_Form__WEBPACK_IMPORTED_MODULE_11__[/* Form */ "a"].loadByName(tax)
})));

const plugins = [];
const vueHelperObj = {
  docs: [],
  items: {},
  criteriu: {},
  fetching: false
};
const subscribedTaxes = [];

const initialSubscribe = async ({
  taxonomie,
  plural,
  collections,
  store
}) => {
  // const debug = Debug('lodger:initialSubscribe')
  switch (taxonomie) {
    // insert predefined services
    case 'serviciu':
      forms_serviciu__WEBPACK_IMPORTED_MODULE_15__["predefinite"].forEach(async denumire => {
        await collections[plural].insert({
          denumire
        });
      });
      break;
    // insert admin user

    case 'utilizator':
      const {
        _id
      } = await collections[plural].insert({
        name: 'Administrator',
        rol: 'admin'
      });
      store.dispatch('utilizator/set_active', _id);
      break;
  }

  subscribedTaxes.push(taxonomie);
}; // Filters the documents array for the one with the id


const _theDoc = (docs, id) => {
  if (!docs.length) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('empty docs provided');
  const doc = docs.filter(doc => doc._id === id)[0];
  if (!(doc && Object(rxdb__WEBPACK_IMPORTED_MODULE_2__[/* isRxDocument */ "b"])(doc))) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('no doc found %%', {
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


const vueHelper = new vue__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"]({
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
    async getItem(taxonomie, id, subscriberName) {
      let item;
      const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:getItem');
      if (subscriberName === undefined) subscriberName = 'main';
      const {
        subsData
      } = this; // // return item
      // return new Promise(async (resolve, reject) => {
      //   // await rxdb to update data first.
      //   await this.$nextTick()

      try {
        const s = subsData[subscriberName][taxonomie]; // debug('S', subscriberName, taxonomie, s, s.docs.length)

        if (s.docs && s.docs.length) return _theDoc(s.docs, id);
      } catch (e) {
        Object.keys(this.subsData).forEach(sub => {
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
    }

  }
});
class Lodger {
  constructor(taxonomii, forms, db, store) {
    this.taxonomii = taxonomii;
    this.forms = forms;
    this.db = db;
    this.store = store;
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:constructor'); // const subscriberData = this.subscriberData.bind(this)

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
              throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('not yet defined. wait more! :) %%', {
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


  async put(taxonomy, data, subscriber) {
    // const debug = Debug('lodger:put')
    if (!data || Object.keys(data).length < 1) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"](Errors.missingData, data);
    const {
      db,
      store,
      forms
    } = this;
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
    const referencesIds = this.activeReferencesIds(references);
    /**
     * add references, default values, etc
     */

    const internallyHandledData = Object(_lib_helpers_forms__WEBPACK_IMPORTED_MODULE_9__[/* handleOnSubmit */ "c"])(data, {
      referencesIds,
      store
    });
    /**
     * do the insert / upsert and following actions
     */

    try {
      const doc = await colectie[method](internallyHandledData);
      const id = doc._id;
      store.dispatch(`${taxonomy}/set_last`, id);
      this.select(taxonomy, {
        doc,
        id,
        subscriber
      });
      this.notify({
        type: 'success',
        text: `pus ${taxonomy} ${id}`
      });
      return doc;
    } catch (e) {
      this.notify({
        type: 'error',
        text: String(e)
      });
    }
  }
  /**
   * Removes a Document from the DB
   *
   * @param taxonomie
   * @param id
   */


  async trash(taxonomie, id) {
    const {
      db,
      forms
    } = this;
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:trash');
    const {
      plural
    } = forms[taxonomie];
    if (!plural) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('wtf');
    const col = db.collections[plural];
    const doc = await col.findOne(id);
    await doc.remove();
    debug(`deleted ${taxonomie} ID ${id}`);
    return true;
  }
  /**
   * select an item
   * brings in the active Document from DB
   *
   * @param taxonomie
   * @param id
   */


  async select(taxonomie, data) {
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:select');
    const {
      dispatch
    } = this.store;
    const form = this.forms[taxonomie];
    if (!form) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('invalid taxonomy %%', taxonomie);
    const {
      plural
    } = form;
    const isObj = typeof data === 'object' && data !== null;
    const id = isObj && data.id ? data.id : data;
    const subscriber = isObj && data.subscriber ? data.subscriber : undefined;
    await dispatch(`${taxonomie}/select`, id); // // deselect
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
  }
  /**
   * Active document for taxonomy
  */


  set _activeDocument(docHolder) {
    let {
      taxonomie,
      doc
    } = docHolder;
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:_activeDocument');
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
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:search');
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
        const relevance = Object(_lib_helpers_search__WEBPACK_IMPORTED_MODULE_14__[/* string_similarity */ "a"])(String(input), value);
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
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:subscribe');
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
      vue__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"].set(vueHelper.subsData, subscriberName, {}); // debug('D initializat subscriber: ', subscriberName)
    }

    taxonomii.forEach(taxonomie => {
      const {
        plural
      } = forms[taxonomie];
      const colectie = collections[plural];
      if (!colectie) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('invalid collection %%', plural);
      const criteriu = Object.assign({}, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, Object(_lib_helpers_functions__WEBPACK_IMPORTED_MODULE_8__[/* getCriteriu */ "a"])(plural, JSON.parse(JSON.stringify(criteriuCerut || {}))))); // debug(`${taxonomie}: criteriu cerut`, { ...criteriuCerut })
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
        vue__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"].set(vueHelper.subsData[subscriberName], plural, freshO); // debug(`setat gol D[${subscriberName}][${plural}]`, freshO)
        // add watcher for criteriu and when it changes
        // fire this subscribe func again

        if (!Object(_lib_helpers_functions__WEBPACK_IMPORTED_MODULE_8__[/* taxIsMultipleSelect */ "b"])(taxonomie)) {
          const everyKeyInCriteriu = vm => _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, vm.subsData[subscriberName][plural].criteriu);

          unwatch = vueHelper.$watch(everyKeyInCriteriu, (newC, oldC) => {
            if (!newC || deep_equal__WEBPACK_IMPORTED_MODULE_5___default()(newC, oldC)) return;
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
      subscriber[plural] = colectie.find(find).limit(paging).sort(sort).$.subscribe(async changes => {
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
          this._activeDocument = {
            doc,
            taxonomie
          };
          debug('got active doc', taxonomie, x.items[selectedId]._id);
        } else {
          // ID is not in changes, lookup DB, otherwise it's invalid
          const doc = await collections[plural].findOne(selectedId);

          if (!doc) {
            throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('invalid id supplied', plural, selectedId);
          } else {
            this._activeDocument = {
              doc,
              taxonomie
            };
          } // an invalid ID was provided,  maybe?

        } // vueHelper.$emit('updatedData', { subscriberName, plural })


        debug(`new ${plural}`, Object.keys(x.items).length);
      });
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


  async setPreference(preference, value) {
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:set');
    const {
      store
    } = this;
    const allowedTaxonomies = ['client', 'user'];
    if (!preference) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"](Errors.invalidPreferenceIndex);
    const taxonomy = preference.split('.')[0];

    if (!taxonomy || allowedTaxonomies.indexOf(taxonomy) < 0) {
      throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"](Errors.invalidPreferenceIndex);
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


  static async build(options) {
    let {
      dbCon
    } = options || _lib_build_opts__WEBPACK_IMPORTED_MODULE_7__[/* buildOpts */ "a"];
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:build');
    debug(`building in ${NODE_ENV} mode ...`);
    const taxonomii = Object.keys(Taxonomii);
    const forms = loadForms(taxonomii);

    const _collections = taxonomii.map(tax => forms[tax].collection);

    const db = await Object(_lib_DB__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"])(_collections, dbCon);
    const store = new _lib_Store__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"]({
      taxonomii,
      forms
    }); // const { collections } = await db

    if (options) Object.assign(_lib_build_opts__WEBPACK_IMPORTED_MODULE_7__[/* buildOpts */ "a"], _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, options));
    /**
     * When a taxonomy item gets SELECTED,
     * try to call all DB methods for refrences of the taxonomy
     *
     */

    store.subscribe(async ({
      type,
      payload
    }, state) => {
      const path = type.split('/');
      if (path[1] !== 'select') return;
      const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:SELECTstoreSubscriber');
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

      referenceTaxonomies.forEach(async refTax => {
        const refdoc = store.getters[`${refTax}/activeDoc`]; // debug(`refdoc ${tax} (${refTax})`, refdoc)

        if (!refdoc) return;
        const method = refdoc[`toggle_${tax}`];
        if (!method || typeof method !== 'function') return;
        await method(id);
        debug(`called references methods for ${refTax}`);
      }); // update find criteria in DH with selected Item

      if (dependentTaxonomies.length) {
        dependentTaxonomies.forEach(dTax => {
          const subscriber = payload.subscriber || 'main';
          const {
            plural
          } = forms[dTax];
          const holder = vueHelper.subsData[subscriber][plural];
          if (!holder || !holder.criteriu) return;
          debug('asignez', dTax, subscriber, reference);
          holder.criteriu.find = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, reference); // deselect

          store.dispatch(`${dTax}/select`, {
            id: null,
            subscriber
          });
        });
        debug('ass dun');
      }
    });
    return new Lodger(taxonomii, forms, db, store);
  }
  /**
   * Extend Lodger :)
   * Todo!
   *
   * @param {LodgerPlugin} plugin
   *
   */


  static use(plugin) {
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:use');

    if (!plugin || typeof plugin !== 'object') {
      throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"](Errors.invalidPluginDefinition);
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


  async destroy() {
    await this.unsubscribeAll();
    await this.db.destroy();
  }
  /**
   * Exports the DB
   * as a YML file with ext .ldb
   * date is captured
   *
   */


  async export(path, cryptedData, filename) {
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:export');
    const json = await this.db.dump();
    const extension = 'ldb';
    if (!path) path = `${__webpack_require__("PENG").homeDir}/downloads/`;

    if (!filename) {
      const date = new Date();
      filename = `LdgDB-${date}`;
    }

    fs__WEBPACK_IMPORTED_MODULE_3___default.a.writeFile(`${path}/${filename}.${extension}`, json2yaml__WEBPACK_IMPORTED_MODULE_4___default.a.stringify(json), e => {
      if (e) throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"](Errors.couldNotWriteFile);
      debug(`written ${filename}.${extension} in path`);
    });
  }
  /**
   * TODO!!
   */


  async import() {}
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


  async unsubscribeAll(subscriberName = 'main') {
    const sub = subscribers[subscriberName];
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:unsubAll');
    return await Promise.all(Object.keys(sub).map(async subscriber => {
      await sub[subscriber].unsubscribe();
      debug('unsubscribed', subscriber);
    }));
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
    return references => Object(_lib_helpers_forms__WEBPACK_IMPORTED_MODULE_9__[/* assignRefIdsFromStore */ "b"])({
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
        throw new _lib_Errors__WEBPACK_IMPORTED_MODULE_12__[/* LodgerError */ "b"]('nu exista %%', {
          plural,
          subscriberName
        });
      }
    };
  }

}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "0fNj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "predefinite", function() { return predefinite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multipleSelect", function() { return multipleSelect; });
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
const plural = 'servicii';
const actions = {
  confirm: 'adaugaServiciu'
};
const multipleSelect = true;
const predefinite = ['apa', 'electricitate', 'gaze', 'termoficare', 'internet', 'evacuare-gunoi-menajer'];


/***/ }),

/***/ "0jyb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/**
 * o cheltuiala = parte dintr-o factura
 */
const fields = [{
  id: 'asociatieId',
  ref: 'asociatii',
  required: true,
  index: true
}, {
  id: 'facturi',
  type: 'search',
  taxonomy: 'facturi',
  ref: 'facturi' // required: true TODO: e necesar? ?????????

}, {
  id: 'suma',
  type: 'bani',
  required: true,
  index: true,
  showInList: 'secondary'
}, {
  id: 'moneda',
  notInForm: true,
  required: true,
  showInList: 'secondary',
  value: getters => getters['asociatie/activa'].moneda
}, {
  id: 'modDistribuire',
  type: 'distribuire'
}, {
  id: 'apartamenteEligibile',
  type: 'selApartamente',
  options: getters => getters['asociatie/apartamente']
}];
const plural = 'cheltuieli';


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3RaG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statics", function() { return statics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setari", function() { return setari; });
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
  async initBalanta(data) {
    this.balanta = data.balanta;
    await this.save();
  },

  async incaseaza(data) {
    if (!this.balanta) this.balanta = 0;
    let incasari = this.incasari || [];
    this.balanta += data.suma;
    incasari.push(data.id);
    this.incasari = incasari;
    await this.save();
  },

  async toggle_serviciu(serviciu) {
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
  },

  async UPDATEAZA(fields) {
    // TODO: nu permite updatarea anumitor chei
    Object.keys(fields).forEach(camp => {
      this[camp] = fields[camp];
    });
    await this.save();
  }

};
const statics = {
  selected: async function (id) {
    // console.log('STATIC!', this)
    return await this.findOne(id).exec();
  } // DRY: la buatoane, daca au 'click', n-au nevoie de id

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


/***/ }),

/***/ "512P":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Form; });
/* unused harmony export Errors */
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lSNA");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("NOtv");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("REmU");
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("LORn");


/**
 * Forms for Lodger
 * are quite diferrently structured
 * than a normal JsonSchema
 */




/**
 * Form Errors Definition
 *
 * TODO: account for translations
 */
var Errors;

(function (Errors) {
  Errors["invalidRequested"] = "Invalid form requested: %%";
  Errors["invalidName"] = "Invalid name supplied";
  Errors["noData"] = "Form %% is missing data";
  Errors["missingName"] = "Forms should have a name";
  Errors["missingPlural"] = "A plural definition is required for %%";
})(Errors || (Errors = {}));

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
    Object(_helpers_forms__WEBPACK_IMPORTED_MODULE_2__[/* pushFieldToSchema */ "d"])(field, schema);
  });
  if (name !== 'serviciu') Object(_helpers_forms__WEBPACK_IMPORTED_MODULE_2__[/* addCommonFieldsToSchema */ "a"])(schema);
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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "schema", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "indexables", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "collection", void 0);

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
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:Form.ts:componentData');
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
    const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:Form');
    let form;

    try {
      form = __webpack_require__("eiOh")("./" + name);
      if (form.default) form = form.default;
      Object.assign(form, {
        name
      });
      debug('✓', name);
    } catch (e) {
      debug('Error', e);
      throw new _Errors__WEBPACK_IMPORTED_MODULE_3__[/* FormError */ "a"](Errors.invalidRequested, name);
    }

    return new Form(form);
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



/***/ }),

/***/ "5Fil":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var lib_store_namespaceObject = {};
__webpack_require__.r(lib_store_namespaceObject);
__webpack_require__.d(lib_store_namespaceObject, "state", function() { return store_state; });
__webpack_require__.d(lib_store_namespaceObject, "actions", function() { return store_actions; });
__webpack_require__.d(lib_store_namespaceObject, "modules", function() { return modules; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__("lSNA");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("Kw5r");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("L2JU");

// EXTERNAL MODULE: ./src/lib/Errors.ts
var Errors = __webpack_require__("LORn");

// EXTERNAL MODULE: ./src/lib/helpers/functions.ts
var functions = __webpack_require__("ABXj");

// CONCATENATED MODULE: ./src/lib/defs/sharedStoreMethods.ts
/**
 * @param { methoName: action }
 */
const sharedStoreMethods = {
  selected: 'select',
  last: 'set_last'
};
// CONCATENATED MODULE: ./src/lib/helpers/store.ts


 // const namespaced: boolean = true

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


function setupSharedMethods(sharedMethods = sharedStoreMethods, module = createEmptyStoreModule(), moduleName, plural) {
  if (typeof sharedMethods !== 'object') {
    throw new Errors["b" /* LodgerError */]('invalid methods supplied');
  } // pt servicii si contoare


  const isMultiple = Object(functions["b" /* taxIsMultipleSelect */])(moduleName);
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


// EXTERNAL MODULE: ./src/lodger.config.ts
var lodger_config = __webpack_require__("Jh6w");

// CONCATENATED MODULE: ./src/lib/store/modules/modal.ts
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
/* harmony default export */ var modal = ({
  state,
  actions,
  mutations,
  getters
});
// CONCATENATED MODULE: ./src/lib/store/modules/prompt.ts
const prompt_state = () => ({
  _happened: false,
  type: null,
  message: null
});

const prompt_mutations = {
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
const prompt_actions = {
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
const prompt_getters = {
  type: state => state.type,
  message: state => state.message,
  prompted: state => state._happened
};
/* harmony default export */ var modules_prompt = ({
  state: prompt_state,
  actions: prompt_actions,
  mutations: prompt_mutations,
  getters: prompt_getters
});
// CONCATENATED MODULE: ./src/lib/store/index.ts

/**
 * MODULES
 */
// TOAST
// import { createModule } from 'vuex-toast'
// MODAL



const {
  version
} = lodger_config["a" /* default */];
const store_state = {
  locale: 'ro',
  version
};
const store_actions = {
  notify: ({
    dispatch
  }, notificare) => {
    dispatch('@@toast/ADD_TOAST_MESSAGE', notificare);
  }
};
const modules = {
  // toast: createModule({ dismissInterval: 5000 }),
  modal: modal,
  prompt: modules_prompt
};

// EXTERNAL MODULE: ./node_modules/debug/src/browser.js
var browser = __webpack_require__("NOtv");
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// CONCATENATED MODULE: ./src/lib/Store.ts
/* unused harmony export customOpts */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Store_LodgerStore; });







vue_runtime_esm["a" /* default */].use(vuex_esm["a" /* default */]);
const debug = browser_default()('lodger:Store');
const Store_modules = {};
var Store_Errors;

(function (Errors) {
  Errors["invalidModule"] = "Invalid Module";
})(Store_Errors || (Store_Errors = {}));

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

  if (!(taxonomii && taxonomii.length)) throw new Errors["b" /* LodgerError */]('No taxes supplied');
  taxonomii.forEach(tax => {
    const {
      plural
    } = forms[tax];
    Store_modules[tax] = setupSharedMethods(undefined, undefined, tax, plural);
  });

  if (lib_store_namespaceObject && modules) {
    // LodgerStore.use(RootModule, false)
    Object.assign(options, lib_store_namespaceObject);
    Object.keys(modules).forEach(module => {
      Store_LodgerStore.use({
        [module]: modules[module]
      }, module !== 'toast');
    });
  }

  options.modules = Store_modules;
  return options;
}; // export default class LodgerStore implements StoreOptions<RootState> {

class Store_LodgerStore extends vuex_esm["a" /* default */].Store {
  constructor(context, options = {}) {
    super(customOpts(context, options));
    this.context = context;
    this.options = options;

    defineProperty_default()(this, "modules", {});
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
      throw new Errors["b" /* LodgerError */](Store_Errors.invalidModule);
    }

    const key = Object.keys(module)[0];
    if (!key || !module[key]) throw new Errors["b" /* LodgerError */](Store_Errors.invalidModule);
    debug('using module', key);
    Store_modules[key] = Object.assign({}, module[key], {
      namespaced
    });
  }

}

/***/ }),

/***/ "5u1Y":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export get_bigrams */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return string_similarity; });
const get_bigrams = function (string) {
  var i, j, ref, s, v;
  s = string.toLowerCase();
  v = new Array(s.length - 1);

  for (i = j = 0, ref = v.length; j <= ref; i = j += 1) {
    v[i] = s.slice(i, i + 2);
  }

  return v;
};
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

/***/ }),

/***/ "ABXj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export traverse */
/* unused harmony export no$ */
/* unused harmony export spleet */
/* unused harmony export slugify */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getCriteriu; });
/* unused harmony export getTaxonomyConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return taxIsMultipleSelect; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("MVZn");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lodger_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Jh6w");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("NOtv");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_2__);

// import { Taxonomii } from 'lodger/index'



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
  } = _lodger_config__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"];
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


const getCriteriu = (taxonomie, criteriuCerut) => {
  if (typeof taxonomie !== 'string') throw new Error('taxonomie incorecta');
  if (criteriuCerut && typeof criteriuCerut !== 'object') throw new Error('criteriu incorect');
  const {
    defaults
  } = _lodger_config__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].taxonomii;
  const debug = debug__WEBPACK_IMPORTED_MODULE_2___default()('functions:getCriteriu');
  const criteriu = Object.assign({}, _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, defaults.criteriu), _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, getTaxonomyConfig(taxonomie).criteriu), _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, criteriuCerut)); // Object.assign(criteriu, getTaxonomyConfig(taxonomie).criteriu)
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


const no$ = str => {
  if (typeof str !== 'string') return str;
  if (str.indexOf('$') !== 0) return str;
  return no$(str.replace('$', '').trim());
};
/**
 * Imparte un string de mutatie ('asociatie/INCASEAZA')
 * @param {string} str
 */


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


const slugify = text => {
  return text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
  .replace(/[^\w\-]+/g, '') // Remove all non-word chars
  .replace(/\-\-+/g, '-') // Replace multiple - with single -
  .replace(/^-+/, '') // Trim - from start of text
  .replace(/-+$/, ''); // Trim - from end of text
};

const taxIsMultipleSelect = tax => ['serviciu', 'contor'].indexOf(tax) > -1;



/***/ }),

/***/ "F4IF":
/***/ (function(module, exports) {



/***/ }),

/***/ "FOda":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var rxdb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("p9ch");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("NOtv");
/* harmony import */ var debug__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(debug__WEBPACK_IMPORTED_MODULE_1__);


const debug = debug__WEBPACK_IMPORTED_MODULE_1___default()('lodger:db');
const {
  NODE_ENV
} = process.env; // RxDB.QueryChangeDetector.enable()
// RxDB.QueryChangeDetector.enableDebugging()

switch (NODE_ENV) {
  default:
    rxdb__WEBPACK_IMPORTED_MODULE_0__[/* plugin */ "c"](__webpack_require__("b0B5"));
    break;

  case 'production':
    rxdb__WEBPACK_IMPORTED_MODULE_0__[/* plugin */ "c"](__webpack_require__("ezGW"));
    rxdb__WEBPACK_IMPORTED_MODULE_0__[/* plugin */ "c"](__webpack_require__("Wh65"));
    break;
}

/* harmony default export */ __webpack_exports__["a"] = (async function (collections, config) {
  debug('Initing');
  const db = await rxdb__WEBPACK_IMPORTED_MODULE_0__[/* create */ "a"](Object.assign({}, config)); // show leadership in title

  db.waitForLeadership().then(() => {
    if (NODE_ENV !== 'dev') return;
    document.title = `♛ ${document.title}`;
  });
  await Promise.all(collections.map(c => db.collection(c)));
  return db;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "Jh6w":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),

/***/ "LORn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LodgerError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormError; });
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


class FormError extends LodgerError {
  constructor(m, details) {
    super(m, details); // Set the prototype explicitly.

    Object.setPrototypeOf(this, FormError.prototype);
  }

}



/***/ }),

/***/ "REmU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/lib/defs/formItemTypes.ts
const formItemTypes_strings = ['text', 'textarea', 'select', 'search'];
const formItemTypes_numbers = ['number', 'date-time', 'bani', 'date'];
const formItemTypes_arrays = ['array', 'scari', 'servicii', 'furnizori', 'contactFields', 'contoare', 'distribuire', 'selApartamente'];
const formItemTypes_objects = ['object'];
const formItemTypes = {
  strings: formItemTypes_strings,
  numbers: formItemTypes_numbers,
  arrays: formItemTypes_arrays,
  objects: formItemTypes_objects
};
/* harmony default export */ var defs_formItemTypes = (formItemTypes);
// EXTERNAL MODULE: ./node_modules/debug/src/browser.js
var browser = __webpack_require__("NOtv");
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// CONCATENATED MODULE: ./src/lib/helpers/forms.ts
/* unused harmony export toRxDBtype */
/* unused harmony export toSchemaField */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return pushFieldToSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return handleOnSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addCommonFieldsToSchema; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return assignRefIdsFromStore; });

 // import { Taxonomii } from '../../index';

const debug = browser_default()('lodger:forms');
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
  } = defs_formItemTypes;
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



/***/ }),

/***/ "UdaM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actiuni", function() { return actiuni; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
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

/***/ }),

/***/ "VjXs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
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
  async UPDATEAZA(campuri) {
    // TODO: nu permite updatarea anumitor chei
    Object.keys(campuri).forEach(camp => {
      this[camp] = campuri[camp];
    });
    await this.save();
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


/***/ }),

/***/ "WuGB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methods", function() { return methods; });
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
  async incaseaza(data) {
    if (!this.balanta) this.balanta = 0;
    let incasari = this.incasari || [];
    this.balanta += data.suma;
    incasari.push(data.id);
    this.incasari = incasari;
    await this.save();
  }

};


/***/ }),

/***/ "aBzF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "campuri", function() { return campuri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actiuni", function() { return actiuni; });
const campuri = [{
  id: 'subiect',
  required: true
}, {
  id: 'tip',
  type: 'select',
  options: ['bug', 'enhacement', 'feature', 'other'],
  default: 'bug',
  required: true
}, {
  id: 'mesaj',
  required: true,
  type: 'textarea',
  placeholder: 'Părerea / Sugestia / Critica ta'
}];
const actiuni = {
  confirm: 'trimiteFeedback'
};

/***/ }),

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

/***/ }),

/***/ "bYfg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
const bs = 'bloc/activeDoc';
const fields = [{
  id: '_id',
  notInDb: true,
  notInForm: true,
  value: g => g[bs]._id
}, {
  id: 'name',
  placeholder: 'ex. M11, COCOR-2, A3...',
  transform: 'uppercase:all',
  type: 'text',
  required: true,
  showInList: 'primary',
  index: true,
  v: 'min:1|max:20',
  focus: true,
  value: g => g[bs].name
}, {
  id: 'scari',
  type: 'scari',
  default: [{
    id: 1,
    etaje: 4,
    lift: false,
    mansarda: false
  }],
  value: g => g[bs].scari
}, {
  id: 'adresa',
  type: 'textarea',
  value: g => g[bs].adresa
}, {
  id: 'asociatieId',
  type: 'select',
  notInForm: true,
  required: true,
  value: g => g['asociatie/active'] || g['asociatie/selected']
}];
const plural = 'blocuri';
const actions = {
  confirm: 'adaugaBloc'
};


/***/ }),

/***/ "eiOh":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./apartament": "WuGB",
	"./apartament.ts": "WuGB",
	"./asociatie": "3RaG",
	"./asociatie.ts": "3RaG",
	"./bloc": "bYfg",
	"./bloc.ts": "bYfg",
	"./cheltuiala": "0jyb",
	"./cheltuiala.ts": "0jyb",
	"./contor": "F4IF",
	"./contor.ts": "F4IF",
	"./factura": "oSra",
	"./factura.ts": "oSra",
	"./feedback": "aBzF",
	"./feedback.ts": "aBzF",
	"./furnizor": "UdaM",
	"./furnizor.ts": "UdaM",
	"./incasare": "mbEA",
	"./incasare.ts": "mbEA",
	"./initFinanc": "k0bU",
	"./initFinanc.ts": "k0bU",
	"./preferinte": "aSoU",
	"./preferinte.ts": "aSoU",
	"./serviciu": "0fNj",
	"./serviciu.ts": "0fNj",
	"./utilizator": "VjXs",
	"./utilizator.ts": "VjXs"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "eiOh";

/***/ }),

/***/ "huy0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buildOpts; });
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "k0bU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "campuri", function() { return campuri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actiuni", function() { return actiuni; });
const campuri = [{
  id: 'balanta',
  label: 'asociatie.init.balanta',
  required: true,
  type: 'bani',
  '@change': 'asociatie/initBalanta',

  value(getters) {
    return getters['asociatie/balanta'];
  }

}, {
  id: 'dataDinLunaListe',
  label: 'asociatie.init.dataDinLuna',
  required: true,
  type: 'number',
  max: 28,
  min: 1
}];
const actiuni = {
  confirm: 'initDone'
};

/***/ }),

/***/ "kiQV":
/***/ (function(module) {

module.exports = {"name":"lodger","version":"0.0.1","description":"Offline-first API for HOAs","main":"dist/index.js","repository":"https://github.com/doriandrn/lodger-api.git","author":"Dorian Tudorache <dorian.snaz@gmail.com>","license":"MIT","scripts":{"check-types":"tsc","build":"webpack","test":"jest"},"devDependencies":{"@babel/core":"^7.2.0","@babel/plugin-proposal-class-properties":"^7.2.1","@babel/plugin-proposal-object-rest-spread":"^7.2.0","@babel/plugin-transform-runtime":"^7.2.0","@babel/preset-env":"^7.2.0","@babel/preset-es2015":"^7.0.0-beta.53","@babel/preset-typescript":"^7.1.0","@types/debug":"^0.0.31","@types/faker":"^4.1.4","@types/jest":"^23.3.10","@types/node":"^10.12.10","babel-jest":"^23.6.0","babel-loader":"^8.0.4","debug":"^4.1.0","deep-equal":"^1.0.1","faker":"^4.1.0","fs":"^0.0.1-security","jest":"^23.6.0","json2yaml":"^1.1.0","pouchdb-adapter-memory":"^7.0.0","ts-jest":"^23.10.5","ts-loader":"^5.3.1","typescript":"^3.1.6","webpack-cli":"^3.1.2"},"dependencies":{"@babel/runtime":"^7.2.0","awesome-typescript-loader":"^5.2.1","pouchdb-adapter-http":"^7.0.0","pouchdb-adapter-idb":"^7.0.0","rxdb":"^8.0.4","rxjs":"^6.3.3","source-map-loader":"^0.2.4","vue":"^2.5.17","vuex":"^3.0.1","vuex-persistedstate":"^2.5.4","vuex-toast":"^0.1.3","webpack":"^4.26.1"}};

/***/ }),

/***/ "mbEA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
const gi = `incasare/activeDoc`;
const fields = [{
  id: 'apartamentId',
  //aka DE LA
  required: true,
  type: 'search',
  ref: 'apartamente'
}, {
  id: 'suma',
  type: 'bani',
  showInList: 'primary',
  index: true,
  required: true,
  label: 'defaults.sum'
}, {
  id: 'nrChitanta',
  type: 'number',
  default: 1,
  index: true,
  value: getters => Number(getters['incasare/activeDoc'].nrUltimaChitanta || 0) + 1
}, {
  id: 'moneda',
  notInForm: true,
  required: true,
  value: getters => getters['incasare/activeDoc'].moneda
}, // ASTEA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
// TREBUIE SA FIGUREZE
/// !!!!!!!!!!!!!!!!
{
  id: 'blocId',
  notInForm: true,
  required: true,
  index: true,
  value: g => g['bloc/selected'].id
}, {
  id: 'asociatieId',
  notInForm: true,
  required: true,
  index: true,
  value: g => g['asociatie/selected'].id
}];
const actions = {
  confirm: 'incaseaza'
};
const plural = 'incasari';


/***/ }),

/***/ "oSra":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fields", function() { return fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plural", function() { return plural; });
const fields = [{
  id: 'furnizorId',
  //aka DE LA
  required: true,
  type: 'search',
  ref: 'furnizori'
}, {
  id: 'suma',
  type: 'bani',
  showInList: 'primary',
  index: true,
  required: true,
  label: 'defaults.sum'
}, {
  id: 'nrFactura',
  type: 'number',
  default: 1,
  index: true,
  value: getters => Number(getters['asociatie/nrUltimaChitanta'] || 0) + 1
}, {
  id: 'dataScadenta',
  type: 'date',
  showInList: 'secondary'
}, {
  id: 'moneda',
  notInForm: true,
  required: true,
  value: getters => getters['asociatie/moneda']
}, // ASTA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
// TREBUIE SA FIGUREZE
// asociatieId = idul asociatiei apului
/// !!!!!!!!!!!!!!!!
{
  id: 'asociatieId',
  notInForm: true,
  required: true,
  index: true,
  value: g => g['asociatie/active'] || g['asociatie/selected']
}];
const plural = 'facturi';


/***/ })

/******/ });
});