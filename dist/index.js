/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/// <reference path="main.d.ts" />
(void 0)(["debug", "rxdb", "fs", "json2yaml", "deep-equal", "~/lib/Store", "~/lib/build/opts", "~/lib/helpers/functions", "~/lib/helpers/forms", "~/lib/DB", "~/lib/Form", "~/lib/Errors", "vue", "~/lib/helpers/search", "forms/serviciu"], function (exports_1, context_1) {
    "use strict";
    var debug_1, rxdb_1, fs_1, json2yaml_1, deep_equal_1, Store_1, opts_1, functions_1, forms_1, DB_1, Form_1, Errors_1, vue_1, search_1, serviciu_1, NODE_ENV, subscribers, Taxonomii, Errors, loadForms, plugins, vueHelperObj, subscribedTaxes, initialSubscribe, _theDoc, vueHelper, Lodger;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (debug_1_1) {
                debug_1 = debug_1_1;
            },
            function (rxdb_1_1) {
                rxdb_1 = rxdb_1_1;
            },
            function (fs_1_1) {
                fs_1 = fs_1_1;
            },
            function (json2yaml_1_1) {
                json2yaml_1 = json2yaml_1_1;
            },
            function (deep_equal_1_1) {
                deep_equal_1 = deep_equal_1_1;
            },
            function (Store_1_1) {
                Store_1 = Store_1_1;
            },
            function (opts_1_1) {
                opts_1 = opts_1_1;
            },
            function (functions_1_1) {
                functions_1 = functions_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (DB_1_1) {
                DB_1 = DB_1_1;
            },
            function (Form_1_1) {
                Form_1 = Form_1_1;
            },
            function (Errors_1_1) {
                Errors_1 = Errors_1_1;
            },
            function (vue_1_1) {
                vue_1 = vue_1_1;
            },
            function (search_1_1) {
                search_1 = search_1_1;
            },
            function (serviciu_1_1) {
                serviciu_1 = serviciu_1_1;
            }
        ],
        execute: function () {
            NODE_ENV = "production";
            subscribers = {
                main: {},
                registru: {},
                listeDePlata: {},
                statistici: {},
                playground: {}
                // altSubscriber: { ... }
            };
            (function (Taxonomii) {
                Taxonomii["asociatie"] = "asociatie";
                Taxonomii["bloc"] = "bloc";
                Taxonomii["apartament"] = "apartament";
                Taxonomii["factura"] = "factura";
                Taxonomii["incasare"] = "incasare";
                Taxonomii["cheltuiala"] = "cheltuiala";
                Taxonomii["serviciu"] = "serviciu";
                Taxonomii["furnizor"] = "furnizor";
                // contor = 'contor',
                Taxonomii["utilizator"] = "utilizator";
            })(Taxonomii || (Taxonomii = {}));
            exports_1("Taxonomii", Taxonomii);
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
            exports_1("Errors", Errors);
            loadForms = (taxonomies) => Object.assign({}, ...taxonomies.map((tax) => ({ [tax]: Form_1.Form.loadByName(tax) })));
            plugins = [];
            vueHelperObj = {
                docs: [],
                items: {},
                criteriu: {},
                fetching: false
            };
            subscribedTaxes = [];
            initialSubscribe = async ({ taxonomie, plural, collections, store }) => {
                // const debug = Debug('lodger:initialSubscribe')
                switch (taxonomie) {
                    // insert predefined services
                    case 'serviciu':
                        serviciu_1.predefinite.forEach(async (denumire) => { await collections[plural].insert({ denumire }); });
                        break;
                    // insert admin user
                    case 'utilizator':
                        const { _id } = await collections[plural].insert({
                            name: 'Administrator',
                            rol: 'admin'
                        });
                        store.dispatch('utilizator/set_active', _id);
                        break;
                }
                subscribedTaxes.push(taxonomie);
            };
            // Filters the documents array for the one with the id
            _theDoc = (docs, id) => {
                if (!docs.length)
                    throw new Errors_1.LodgerError('empty docs provided');
                const doc = docs.filter(doc => doc._id === id)[0];
                if (!(doc && rxdb_1.isRxDocument(doc)))
                    throw new Errors_1.LodgerError('no doc found %%', { id });
                return doc;
            };
            /**
             * Main holder for temporary items subscribed to
             *
             * -> a vue helper for reactivity
             * holds RX documents
             * and methods to accezss / manipulate them
             */
            vueHelper = new vue_1.default({
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
                        const debug = debug_1.default('lodger:getItem');
                        if (subscriberName === undefined)
                            subscriberName = 'main';
                        const { subsData } = this;
                        // // return item
                        // return new Promise(async (resolve, reject) => {
                        //   // await rxdb to update data first.
                        //   await this.$nextTick()
                        try {
                            const s = subsData[subscriberName][taxonomie];
                            // debug('S', subscriberName, taxonomie, s, s.docs.length)
                            if (s.docs && s.docs.length)
                                return _theDoc(s.docs, id);
                        }
                        catch (e) {
                            Object.keys(this.subsData).forEach(sub => {
                                if (item)
                                    return;
                                // debug('trying sub', sub)
                                const s = subsData[sub][taxonomie];
                                // debug(`D[${sub}][${taxonomie}]:`, s)
                                if (!(s && s.docs && s.docs.length))
                                    return;
                                item = _theDoc(s.docs, id);
                                if (item)
                                    debug('item gasit din a 2a', { taxonomie, subscriberName, s, item });
                            });
                        }
                        finally {
                            // item = await collections[plural].findOne(id).exec()
                        }
                        return item;
                        // // })
                        // })
                    }
                }
            });
            Lodger = class Lodger {
                constructor(taxonomii, forms, db, store) {
                    this.taxonomii = taxonomii;
                    this.forms = forms;
                    this.db = db;
                    this.store = store;
                    const debug = debug_1.default('lodger:constructor');
                    // const subscriberData = this.subscriberData.bind(this)
                    taxonomii.forEach(tax => {
                        const { plural } = forms[tax];
                        Object.defineProperty(this, plural, {
                            get() {
                                // debug('getter tax apelat')
                                return (subscriberName = 'main') => {
                                    try {
                                        return vueHelper.subsData[subscriberName][plural].items;
                                    }
                                    catch (e) {
                                        throw new Errors_1.LodgerError('not yet defined. wait more! :) %%', { subscriberName, plural });
                                    }
                                };
                            }
                        });
                    });
                    // console.error(Object.getOwnPropertyNames(this))
                    // todo, remove on prod
                    // try { window.dh = vueHelper } catch (e) {}
                }
                /**
                 * Notifies the user about an update/change
                 * - Store action wrapper -
                 */
                notify(notification) {
                    // console.info(notification)
                    // this.store.dispatch('notify', notification)
                }
                /**
                 * Adds / updates an entry in the DB
                 *
                 * @param taxonomie
                 * @param data
                 */
                async put(taxonomy, data, subscriber) {
                    // const debug = Debug('lodger:put')
                    if (!data || Object.keys(data).length < 1)
                        throw new Errors_1.LodgerError(Errors.missingData, data);
                    const { db, store, forms } = this;
                    const { plural } = forms[taxonomy];
                    // if (!plural) throw new LodgerError(Errors.noPlural, taxonomy)
                    const colectie = db.collections[plural];
                    /**
                     * If form submitted with an _id, must be an upsert
                     */
                    const method = data._id ?
                        'upsert' :
                        'insert';
                    const form = forms[taxonomy];
                    const references = form.referenceTaxonomies;
                    const referencesIds = this.activeReferencesIds(references);
                    /**
                     * add references, default values, etc
                     */
                    const internallyHandledData = forms_1.handleOnSubmit(data, { referencesIds, store });
                    /**
                     * do the insert / upsert and following actions
                     */
                    try {
                        const doc = await colectie[method](internallyHandledData);
                        const id = doc._id;
                        store.dispatch(`${taxonomy}/set_last`, id);
                        this.select(taxonomy, { doc, id, subscriber });
                        this.notify({
                            type: 'success',
                            text: `pus ${taxonomy} ${id}`
                        });
                        return doc;
                    }
                    catch (e) {
                        this.notify({
                            type: 'error', text: String(e)
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
                    const { db, forms } = this;
                    const debug = debug_1.default('lodger:trash');
                    const { plural } = forms[taxonomie];
                    if (!plural)
                        throw new Errors_1.LodgerError('wtf');
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
                    const debug = debug_1.default('lodger:select');
                    const { dispatch } = this.store;
                    const form = this.forms[taxonomie];
                    if (!form)
                        throw new Errors_1.LodgerError('invalid taxonomy %%', taxonomie);
                    const { plural } = form;
                    const isObj = typeof data === 'object' && data !== null;
                    const id = isObj && data.id ? data.id : data;
                    const subscriber = isObj && data.subscriber ? data.subscriber : undefined;
                    await dispatch(`${taxonomie}/select`, id);
                    // // deselect
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
                    let { taxonomie, doc } = docHolder;
                    const debug = debug_1.default('lodger:_activeDocument');
                    const gName = `${taxonomie}/activeDoc`;
                    const { store } = this;
                    if (!store.getters.hasOwnProperty(gName)) {
                        Object.defineProperty(store.getters, gName, {
                            configurable: false,
                            get() { return doc; },
                            set(newDoc) { doc = newDoc; }
                        });
                    }
                    else {
                        store.getters[gName] = doc;
                    }
                }
                /**
                 * Cauta in searchMap
                 * @param input - string de cautat
                 */
                search(input, searchTaxonomy) {
                    if (!input)
                        return;
                    const debug = debug_1.default('lodger:search');
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
                        if (searchTaxonomy && searchTaxonomy !== tax)
                            return;
                        const iterator = searchMap[tax].entries();
                        results[tax] = [];
                        for (let [key, value] of iterator) {
                            if (typeof value === 'function')
                                continue;
                            const relevance = search_1.string_similarity(String(input), value);
                            results[tax]
                                .push({ id: key, relevance, value });
                        }
                        results[tax] = results[tax]
                            .sort((a, b) => Number(a.relevance) - Number(b.relevance))
                            .reverse()
                            .slice(0, 6);
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
                    const debug = debug_1.default('lodger:subscribe');
                    const { db: { collections }, store, forms } = this;
                    const { getters } = store;
                    // always have it as an array
                    taxonomii = typeof taxonomii === 'string' ?
                        Array(taxonomii) :
                        taxonomii;
                    debug('--- SUBSCRIBING ---\n', taxonomii, '\ncriteriu cerut: ', criteriuCerut);
                    if (!subscribers[subscriberName])
                        Object.assign(subscribers, { [subscriberName]: {} });
                    const subscriber = subscribers[subscriberName];
                    if (!vueHelper.subsData[subscriberName]) {
                        vue_1.default.set(vueHelper.subsData, subscriberName, {});
                        // debug('D initializat subscriber: ', subscriberName)
                    }
                    taxonomii.forEach(taxonomie => {
                        const { plural } = forms[taxonomie];
                        const colectie = collections[plural];
                        if (!colectie)
                            throw new Errors_1.LodgerError('invalid collection %%', plural);
                        const criteriu = Object.assign({}, {
                            ...functions_1.getCriteriu(plural, JSON.parse(JSON.stringify(criteriuCerut || {})))
                        });
                        // debug(`${taxonomie}: criteriu cerut`, { ...criteriuCerut })
                        // debug(`${taxonomie}: criteriu`, criteriu)
                        let { limit, index, sort, find } = criteriu;
                        const paging = Number(limit || 0) * (index || 1);
                        let unwatch;
                        if (subscribedTaxes.indexOf(taxonomie) < 0) {
                            initialSubscribe({ taxonomie, plural, collections, store });
                        }
                        // Define the data object container
                        if (!vueHelper.subsData[subscriberName][plural]) {
                            const freshO = Object.assign({}, vueHelperObj);
                            freshO.criteriu = Object.assign({}, criteriu);
                            vue_1.default.set(vueHelper.subsData[subscriberName], plural, freshO);
                            // debug(`setat gol D[${subscriberName}][${plural}]`, freshO)
                            // add watcher for criteriu and when it changes
                            // fire this subscribe func again
                            if (!functions_1.taxIsMultipleSelect(taxonomie)) {
                                const everyKeyInCriteriu = (vm) => ({ ...vm.subsData[subscriberName][plural].criteriu });
                                unwatch = vueHelper.$watch(everyKeyInCriteriu, (newC, oldC) => {
                                    if (!newC || deep_equal_1.default(newC, oldC))
                                        return;
                                    this.subscribe(taxonomie, newC, subscriberName);
                                }, { deep: true, immediate: false });
                            }
                        }
                        else {
                            // vueHelper[subscriberName][plural].criteriu = criteriu
                            vueHelper.subsData[subscriberName][plural].fetching = true;
                            // this.unsubscribe(plural, subscriberName) // todo: update ot new sub model
                        }
                        if (typeof unwatch === 'function')
                            vueHelper.subsData[subscriberName][plural].unwatch = unwatch;
                        subscriber[plural] = colectie
                            .find(find)
                            .limit(paging)
                            .sort(sort)
                            .$
                            .subscribe(async (changes) => {
                            // DO NOT RETURN IF NO CHANGES!!!!!!!
                            // debug(`${plural} for subscriber[${subscriberName}]`, changes)
                            const x = vueHelper.subsData[subscriberName][plural];
                            const selectedId = getters[`${taxonomie}/selected`];
                            // update data objects inside
                            x.docs = changes.map(change => Object.freeze(change)) || [];
                            x.items = Object.assign({}, ...changes.map((item) => ({ [item._id]: item._data })));
                            x.fetching = false;
                            // set the active document from selected id
                            if (x.items[selectedId]) {
                                const doc = changes.filter(change => change._id === selectedId)[0];
                                this._activeDocument = { doc, taxonomie };
                                debug('got active doc', taxonomie, x.items[selectedId]._id);
                            }
                            else {
                                // ID is not in changes, lookup DB, otherwise it's invalid
                                const doc = await collections[plural].findOne(selectedId);
                                if (!doc) {
                                    throw new Errors_1.LodgerError('invalid id supplied', plural, selectedId);
                                }
                                else {
                                    this._activeDocument = { doc, taxonomie };
                                }
                                // an invalid ID was provided,  maybe?
                            }
                            // vueHelper.$emit('updatedData', { subscriberName, plural })
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
                    const { forms } = this;
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
                    const debug = debug_1.default('lodger:set');
                    const { store } = this;
                    const allowedTaxonomies = ['client', 'user'];
                    if (!preference)
                        throw new Errors_1.LodgerError(Errors.invalidPreferenceIndex);
                    const taxonomy = preference.split('.')[0];
                    if (!taxonomy || allowedTaxonomies.indexOf(taxonomy) < 0) {
                        throw new Errors_1.LodgerError(Errors.invalidPreferenceIndex);
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
                    const { db, store } = this;
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
                    let { dbCon } = options || opts_1.buildOpts;
                    const debug = debug_1.default('lodger:build');
                    debug(`building in ${NODE_ENV} mode ...`);
                    const taxonomii = Object.keys(Taxonomii);
                    const forms = loadForms(taxonomii);
                    const _collections = taxonomii.map(tax => forms[tax].collection);
                    const db = await DB_1.default(_collections, dbCon);
                    const store = new Store_1.default({ taxonomii, forms });
                    // const { collections } = await db
                    if (options)
                        Object.assign(opts_1.buildOpts, { ...options });
                    /**
                     * When a taxonomy item gets SELECTED,
                     * try to call all DB methods for refrences of the taxonomy
                     *
                     */
                    store.subscribe(async ({ type, payload }, state) => {
                        const path = type.split('/');
                        if (path[1] !== 'select')
                            return;
                        const debug = debug_1.default('lodger:SELECTstoreSubscriber');
                        const tax = path[0];
                        debug('payload', payload);
                        if (!payload)
                            return;
                        const id = typeof payload === 'string' ? payload : payload.id;
                        if (id === store.getters[`tax/selected`])
                            return;
                        const reference = { [`${tax}Id`]: id };
                        const { referenceTaxonomies } = forms[tax];
                        // taxonomies that depend on the selected tax and subscriber
                        // todo: move from here
                        const dependentTaxonomies = [];
                        Object.keys(forms).forEach((taxForm) => {
                            const { referenceTaxonomies } = forms[taxForm];
                            if (!referenceTaxonomies || referenceTaxonomies.indexOf(tax) < 0)
                                return;
                            dependentTaxonomies.push(taxForm);
                        });
                        debug(`${tax} dep taxes:`, dependentTaxonomies);
                        // call methods of references documents
                        referenceTaxonomies.forEach(async (refTax) => {
                            const refdoc = store.getters[`${refTax}/activeDoc`];
                            // debug(`refdoc ${tax} (${refTax})`, refdoc)
                            if (!refdoc)
                                return;
                            const method = refdoc[`toggle_${tax}`];
                            if (!method || typeof method !== 'function')
                                return;
                            await method(id);
                            debug(`called references methods for ${refTax}`);
                        });
                        // update find criteria in DH with selected Item
                        if (dependentTaxonomies.length) {
                            dependentTaxonomies.forEach(dTax => {
                                const subscriber = payload.subscriber || 'main';
                                const { plural } = forms[dTax];
                                const holder = vueHelper.subsData[subscriber][plural];
                                if (!holder || !holder.criteriu)
                                    return;
                                debug('asignez', dTax, subscriber, reference);
                                holder.criteriu.find = { ...reference };
                                // deselect
                                store.dispatch(`${dTax}/select`, { id: null, subscriber });
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
                    const debug = debug_1.default('lodger:use');
                    if (!plugin || typeof plugin !== 'object') {
                        throw new Errors_1.LodgerError(Errors.invalidPluginDefinition);
                    }
                    const { name } = plugin;
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
                    const debug = debug_1.default('lodger:export');
                    const json = await this.db.dump();
                    const extension = 'ldb';
                    if (!path)
                        path = `${__webpack_require__(1).homeDir}/downloads/`;
                    if (!filename) {
                        const date = new Date();
                        filename = `LdgDB-${date}`;
                    }
                    fs_1.default.writeFile(`${path}/${filename}.${extension}`, json2yaml_1.default.stringify(json), (e) => {
                        if (e)
                            throw new Errors_1.LodgerError(Errors.couldNotWriteFile);
                        debug(`written ${filename}.${extension} in path`);
                    });
                }
                /**
                 * TODO!!
                 */
                async import() {
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
                async unsubscribeAll(subscriberName = 'main') {
                    const sub = subscribers[subscriberName];
                    const debug = debug_1.default('lodger:unsubAll');
                    return await Promise.all(Object.keys(sub).map(async (subscriber) => {
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
                    const { getters } = this.store;
                    return (references) => forms_1.assignRefIdsFromStore({
                        references,
                        getters
                    });
                }
                get subscriberData() {
                    const { forms } = this;
                    return (taxonomy, subscriberName) => {
                        const { plural } = forms[taxonomy];
                        try {
                            return vueHelper.subsData[subscriberName][plural].items;
                        }
                        catch (e) {
                            throw new Errors_1.LodgerError('nu exista %%', { plural, subscriberName });
                        }
                    };
                }
            };
            exports_1("Lodger", Lodger);
        }
    };
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};


/***/ })
/******/ ]);