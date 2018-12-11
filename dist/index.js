'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-db601d79.js');
var serviciu = require('./serviciu.js');
var Vue = _interopDefault(require('vue'));
var Vuex = _interopDefault(require('vuex'));
var RxDB = require('rxdb');
var memoryAdapter = _interopDefault(require('pouchdb-adapter-memory'));
var idbAdapter = _interopDefault(require('pouchdb-adapter-idb'));
var httpAdapter = _interopDefault(require('pouchdb-adapter-http'));
var Debug$1 = _interopDefault(require('debug'));

var fs = {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var remedial = createCommonjsModule(function (module) {
/*jslint onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true */
(function () {

    var global = Function('return this')()
      , classes = "Boolean Number String Function Array Date RegExp Object".split(" ")
      , i
      , name
      , class2type = {}
      ;

    for (i in classes) {
      if (classes.hasOwnProperty(i)) {
        name = classes[i];
        class2type["[object " + name + "]"] = name.toLowerCase();
      }
    }

    function typeOf(obj) {
      return (null === obj || undefined === obj) ? String(obj) : class2type[Object.prototype.toString.call(obj)] || "object";
    }

    function isEmpty(o) {
        var i, v;
        if (typeOf(o) === 'object') {
            for (i in o) { // fails jslint
                v = o[i];
                if (v !== undefined && typeOf(v) !== 'function') {
                    return false;
                }
            }
        }
        return true;
    }

    if (!String.prototype.entityify) {
        String.prototype.entityify = function () {
            return this.replace(/&/g, "&amp;").replace(/</g,
                "&lt;").replace(/>/g, "&gt;");
        };
    }

    if (!String.prototype.quote) {
        String.prototype.quote = function () {
            var c, i, l = this.length, o = '"';
            for (i = 0; i < l; i += 1) {
                c = this.charAt(i);
                if (c >= ' ') {
                    if (c === '\\' || c === '"') {
                        o += '\\';
                    }
                    o += c;
                } else {
                    switch (c) {
                    case '\b':
                        o += '\\b';
                        break;
                    case '\f':
                        o += '\\f';
                        break;
                    case '\n':
                        o += '\\n';
                        break;
                    case '\r':
                        o += '\\r';
                        break;
                    case '\t':
                        o += '\\t';
                        break;
                    default:
                        c = c.charCodeAt();
                        o += '\\u00' + Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    }
                }
            }
            return o + '"';
        };
    } 

    if (!String.prototype.supplant) {
        String.prototype.supplant = function (o) {
            return this.replace(/{([^{}]*)}/g,
                function (a, b) {
                    var r = o[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1");
        };
    }

    // CommonJS / npm / Ender.JS
    module.exports = {
        typeOf: typeOf,
        isEmpty: isEmpty
    };
    global.typeOf = global.typeOf || typeOf;
    global.isEmpty = global.isEmpty || isEmpty;
}());
});
var remedial_1 = remedial.typeOf;
var remedial_2 = remedial.isEmpty;

var json2yaml = createCommonjsModule(function (module) {
(function () {

  var typeOf = remedial.typeOf
    ;

  function stringify(data) {
    var handlers
      , indentLevel = ''
      ;

    handlers = {
        "undefined": function () {
          // objects will not have `undefined` converted to `null`
          // as this may have unintended consequences
          // For arrays, however, this behavior seems appropriate
          return 'null';
        }
      , "null": function () {
          return 'null';
        }
      , "number": function (x) {
          return x;
        }
      , "boolean": function (x) {
          return x ? 'true' : 'false';
        }
      , "string": function (x) {
          // to avoid the string "true" being confused with the
          // the literal `true`, we always wrap strings in quotes
          return JSON.stringify(x);
        }
      , "array": function (x) {
          var output = ''
            ;

          if (0 === x.length) {
            output += '[]';
            return output;
          }

          indentLevel = indentLevel.replace(/$/, '  ');
          x.forEach(function (y) {
            // TODO how should `undefined` be handled?
            var handler = handlers[typeOf(y)]
              ;

            if (!handler) {
              throw new Error('what the crap: ' + typeOf(y));
            }

            output += '\n' + indentLevel + '- ' + handler(y);
             
          });
          indentLevel = indentLevel.replace(/  /, '');
          
          return output;
        }
      , "object": function (x) {
          var output = ''
            ;

          if (0 === Object.keys(x).length) {
            output += '{}';
            return output;
          }

          indentLevel = indentLevel.replace(/$/, '  ');
          Object.keys(x).forEach(function (k) {
            var val = x[k]
              , handler = handlers[typeOf(val)]
              ;

            if ('undefined' === typeof val) {
              // the user should do
              // delete obj.key
              // and not
              // obj.key = undefined
              // but we'll error on the side of caution
              return;
            }

            if (!handler) {
              throw new Error('what the crap: ' + typeOf(val));
            }

            output += '\n' + indentLevel + k + ': ' + handler(val);
          });
          indentLevel = indentLevel.replace(/  /, '');

          return output;
        }
      , "function": function () {
          // TODO this should throw or otherwise be ignored
          return '[object Function]';
        }
    };

    return '---' + handlers[typeOf(data)](data) + '\n';
  }

  module.exports.stringify = stringify;
}());
});
var json2yaml_1 = json2yaml.stringify;

var keys = createCommonjsModule(function (module, exports) {
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}
});
var keys_1 = keys.shim;

var is_arguments = createCommonjsModule(function (module, exports) {
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}
exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
}});
var is_arguments_1 = is_arguments.supported;
var is_arguments_2 = is_arguments.unsupported;

var deepEqual_1 = createCommonjsModule(function (module) {
var pSlice = Array.prototype.slice;



var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (is_arguments(a)) {
    if (!is_arguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = keys(a),
        kb = keys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}
});

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

// import { version } from './package'
const version = require('../package.json').version;

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

// import { Taxonomii } from 'lodger/index'
/**
 * Returneaza config-ul pentru o taxonomie sau default
 *
 * @param {string} taxonomie
 */


const getTaxonomyConfig = tax => {
  const {
    taxonomii
  } = config;
  const {
    defaults
  } = taxonomii;
  if (!tax) return defaults;
  const config$$1 = taxonomii[tax];
  return config$$1 ? config$$1 : defaults;
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
  } = config.taxonomii;
  const debug = Debug$1('functions:getCriteriu');
  const criteriu = Object.assign({}, Object.assign({}, defaults.criteriu), Object.assign({}, getTaxonomyConfig(taxonomie).criteriu), Object.assign({}, criteriuCerut)); // Object.assign(criteriu, getTaxonomyConfig(taxonomie).criteriu)
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

const taxIsMultipleSelect = tax => ['serviciu', 'contor'].indexOf(tax) > -1;

const getRxDocumentById = (docs, id) => {
  if (!docs.length) throw new LodgerError('Empty docs provided: %%');
  const doc = docs.filter(doc => doc._id === id)[0];
  if (!(doc && RxDB.isRxDocument(doc))) throw new LodgerError('No document found %%', {
    id
  });
  return doc;
};

var vueHelper = new Vue({
  data() {
    return {
      subsData: {}
    };
  },

  computed: {
    ids() {
      return (tax, subName) => {
        return Object.keys(this.subsData[subName][tax]);
      };
    }

  },
  methods: {
    getItem(taxonomie, id, subscriberName) {
      return __chunk_1.__awaiter(this, void 0, void 0, function* () {
        let item;
        const debug = Debug('lodger:getItem');
        if (subscriberName === undefined) subscriberName = 'main';
        const {
          subsData
        } = this;

        try {
          const s = subsData[subscriberName][taxonomie];
          if (s.docs && s.docs.length) return getRxDocumentById(s.docs, id);
        } catch (e) {
          Object.keys(this.subsData).forEach(sub => {
            if (item) return;
            const s = subsData[sub][taxonomie];
            if (!(s && s.docs && s.docs.length)) return;
            item = getRxDocumentById(s.docs, id);
            if (item) debug('item gasit din a 2a', {
              taxonomie,
              subscriberName,
              s,
              item
            });
          });
        } finally {// should never get here maybe because data displayed should be available.
          // item = await collections[plural].findOne(id).exec()
        }

        return item;
      });
    }

  }
});

const sharedStoreMethods = {
  selected: 'select',
  last: 'set_last'
};

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
    throw new LodgerError('invalid methods supplied');
  } // pt servicii si contoare


  const isMultiple = taxIsMultipleSelect(moduleName);
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
var modal = {
  state,
  actions,
  mutations,
  getters
};

const state$1 = () => ({
  _happened: false,
  type: null,
  message: null
});

const mutations$1 = {
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
const actions$1 = {
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
const getters$1 = {
  type: state => state.type,
  message: state => state.message,
  prompted: state => state._happened
};
var prompt = {
  state: state$1,
  actions: actions$1,
  mutations: mutations$1,
  getters: getters$1
};

const {
  version: version$1
} = config;
const state$2 = {
  locale: 'ro',
  version: version$1
};
const actions$2 = {
  notify: ({
    dispatch
  }, notificare) => {
    dispatch('@@toast/ADD_TOAST_MESSAGE', notificare);
  }
};
const modules = {
  // toast: createModule({ dismissInterval: 5000 }),
  modal,
  prompt
};

var RootModule = /*#__PURE__*/Object.freeze({
	state: state$2,
	actions: actions$2,
	modules: modules
});

Vue.use(Vuex);
const debug = Debug$1('lodger:Store');
const modules$1 = {};
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

  if (!(taxonomii && taxonomii.length)) throw new LodgerError('No taxes supplied');
  taxonomii.forEach(tax => {
    const {
      plural
    } = forms[tax];
    modules$1[tax] = setupSharedMethods(undefined, undefined, tax, plural);
  });

  if (RootModule && modules) {
    // LodgerStore.use(RootModule, false)
    Object.assign(options, RootModule);
    Object.keys(modules).forEach(module => {
      LodgerStore.use({
        [module]: modules[module]
      }, module !== 'toast');
    });
  }

  options.modules = modules$1;
  return options;
}; // export default class LodgerStore implements StoreOptions<RootState> {

class LodgerStore extends Vuex.Store {
  constructor(context, options = {}) {
    super(customOpts(context, options));
    this.context = context;
    this.options = options;
    this.modules = {};
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
      throw new LodgerError(Errors.invalidModule);
    }

    const key = Object.keys(module)[0];
    if (!key || !module[key]) throw new LodgerError(Errors.invalidModule);
    debug('using module', key);
    modules$1[key] = Object.assign({}, module[key], {
      namespaced
    });
  }

}

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

const debug$1 = Debug$1('lodger:forms');

function toRxDBtype(type) {
  const _default = 'string';
  const {
    strings,
    numbers,
    arrays,
    objects
  } = formItemTypes;
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
    type
  }; // cheiImutabile.forEach(((cheie: string) => {
  //   if (!formItem[cheie]) return
  //   Object.assign(descriereCamp, { [cheie]: formItem[cheie] })
  // })

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
      debug$1('fara val', what);
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
  index: true,
  notInForm: true,
  showInList: 'secondary'
}]) => {
  commonFields.forEach(item => {
    Object.assign(schema.properties, toSchemaField(item));
  });
};

const debug$2 = Debug$1('lodger:db');
const {
  NODE_ENV: NODE_ENV$1
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

switch (NODE_ENV$1) {
  default:
    RxDB.plugin(memoryAdapter);
    break;

  case 'production':
    RxDB.plugin(httpAdapter);
    RxDB.plugin(idbAdapter);
    break;
}

function DB (collections, config) {
  return __chunk_1.__awaiter(this, void 0, void 0, function* () {
    debug$2('Initing');
    const db = yield RxDB.create(Object.assign({}, config)); // show leadership in title

    db.waitForLeadership().then(() => {
      if (NODE_ENV$1 !== 'dev') return;
      document.title = `♛ ${document.title}`;
    });
    yield Promise.all(collections.map(c => db.collection(c)));
    return db;
  });
}

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

var Errors$1;

(function (Errors) {
  Errors["invalidRequested"] = "Invalid form requested: %%";
  Errors["invalidName"] = "Invalid name supplied";
  Errors["noData"] = "Form %% is missing data";
  Errors["missingName"] = "Forms should have a name";
  Errors["missingPlural"] = "A plural definition is required for %%";
})(Errors$1 || (Errors$1 = {}));

if (process.env.NODE_ENV === 'test') {
  Debug$1.enable('Form:*');
}

const defaultSchema = {
  title: '',
  properties: {},
  required: [],
  type: 'object',
  version: 0
};
const formsPath = ['dev', 'test'].indexOf(process.env.NODE_ENV) > -1 ? 'forms' : '.';
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
    pushFieldToSchema(field, schema);
  });
  if (name !== 'serviciu') addCommonFieldsToSchema(schema);
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
    const debug = Debug$1('lodger:Form.ts:componentData');
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
    const debug = Debug$1('lodger:Form');
    if (!name) throw new FormError('no name supplied for form');
    let form;

    try {
      form = require("forms/" + name);
      if (form.default) form = form.default;
      Object.assign(form, {
        name
      });
      debug('✓', name);
      return new Form(form);
    } catch (e) {
      debug('Error', e);
      throw new FormError(Errors$1.invalidRequested, name);
    } // return import(`${formsPath}/${name}`).then(formData => {
    //   form = { ...formData }
    //   if (form.default) form = form.default
    //   Object.assign(form, { name })
    //   debug('✓', name)
    //   return new Form({ ...form })
    // }).catch(err => { throw new FormError(err) })

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

/// <reference path="main.d.ts" />
const {
  NODE_ENV: NODE_ENV$2
} = process.env;
const subscribers = {
  main: {},
  registru: {},
  listeDePlata: {},
  statistici: {},
  playground: {} // altSubscriber: { ... }

};


(function (Taxonomii) {
  Taxonomii["asociatie"] = "asociatie";
  Taxonomii["bloc"] = "bloc";
  Taxonomii["apartament"] = "apartament";
  Taxonomii["factura"] = "factura";
  Taxonomii["incasare"] = "incasare";
  Taxonomii["cheltuiala"] = "cheltuiala";
  Taxonomii["serviciu"] = "serviciu";
  Taxonomii["furnizor"] = "furnizor"; // contor = 'contor',

  Taxonomii["utilizator"] = "utilizator";
})(exports.Taxonomii || (exports.Taxonomii = {}));



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
})(exports.Errors || (exports.Errors = {}));
/**
 * Loads all forms for taxonomies
 * @param taxonomies
 */


function loadForms(taxonomies) {
  return __chunk_1.__awaiter(this, void 0, void 0, function* () {
    return Object.assign({}, ...(yield Promise.all(taxonomies.map(tax => __chunk_1.__awaiter(this, void 0, void 0, function* () {
      return {
        [tax]: yield Form.loadByName(tax)
      };
    })))));
  });
}

const plugins = [];

class Lodger {
  constructor(taxonomii, forms, db, store) {
    // const debug = Debug('lodger:constructor')
    this.taxonomii = taxonomii;
    this.forms = forms;
    this.db = db;
    this.store = store;
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
              throw new LodgerError('not yet defined. wait more! :) %%', {
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
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      // const debug = Debug('lodger:put')
      if (!data || Object.keys(data).length < 1) throw new LodgerError(exports.Errors.missingData, data);
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

      const internallyHandledData = handleOnSubmit(data, {
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
    });
  }
  /**
   * Removes a Document from the DB
   *
   * @param taxonomie
   * @param id
   */


  trash(taxonomie, id) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      const {
        db,
        forms
      } = this;
      const debug = Debug$1('lodger:trash');
      const {
        plural
      } = forms[taxonomie];
      if (!plural) throw new LodgerError('wtf');
      const col = db.collections[plural];
      const doc = yield col.findOne(id);
      yield doc.remove();
      debug(`deleted ${taxonomie} ID ${id}`);
      return true;
    });
  }
  /**
   * select an item
   * brings in the active Document from DB
   *
   * @param taxonomie
   * @param id
   */


  select(taxonomie, data) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      const debug = Debug$1('lodger:select');
      const {
        dispatch
      } = this.store;
      const form = this.forms[taxonomie];
      if (!form) throw new LodgerError('invalid taxonomy %%', taxonomie);
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
    });
  }
  /**
   * Active document for taxonomy
  */


  set _activeDocument(docHolder) {
    let {
      taxonomie,
      doc
    } = docHolder;
    const debug = Debug$1('lodger:_activeDocument');
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
    const debug = Debug$1('lodger:search');
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
        const relevance = string_similarity(String(input), value);
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
    const debug = Debug$1('lodger:subscribe');
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
      Vue.set(vueHelper.subsData, subscriberName, {});
    }

    taxonomii.forEach(taxonomie => {
      const {
        plural
      } = forms[taxonomie];
      const colectie = collections[plural];
      if (!colectie) throw new LodgerError('invalid collection %%', plural);
      const criteriu = Object.assign({}, Object.assign({}, getCriteriu(plural, JSON.parse(JSON.stringify(criteriuCerut || {})))));
      let {
        limit,
        index,
        sort,
        find
      } = criteriu;
      const paging = Number(limit || 0) * (index || 1);

      if (subscribedTaxes.indexOf(taxonomie) < 0) {
        initialSubscribe({
          taxonomie,
          plural,
          collections,
          store
        });
      }

      if (typeof unwatch === 'function') vueHelper.subsData[subscriberName][plural].unwatch = unwatch;
      subscriber[plural] = colectie.find(find).limit(paging).sort(sort).$.subscribe(changes => __chunk_1.__awaiter(this, void 0, void 0, function* () {
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
          const doc = yield collections[plural].findOne(selectedId);

          if (!doc) {
            throw new LodgerError('invalid id supplied', plural, selectedId);
          } else {
            this._activeDocument = {
              doc,
              taxonomie
            };
          } // an invalid ID was provided,  maybe?

        } // vueHelper.$emit('updatedData', { subscriberName, plural })


        debug(`new ${plural}`, Object.keys(x.items).length);
      }));
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
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      const debug = Debug$1('lodger:set');
      const {
        store
      } = this;
      const allowedTaxonomies = ['client', 'user'];
      if (!preference) throw new LodgerError(exports.Errors.invalidPreferenceIndex);
      const taxonomy = preference.split('.')[0];

      if (!taxonomy || allowedTaxonomies.indexOf(taxonomy) < 0) {
        throw new LodgerError(exports.Errors.invalidPreferenceIndex);
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
    });
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
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      let {
        dbCon
      } = options || buildOpts;
      const debug = Debug$1('lodger:build');
      debug(`building in ${NODE_ENV$2} mode ...`);
      const taxonomii = Object.keys(exports.Taxonomii);
      let forms;

      try {
        forms = yield loadForms(taxonomii);
      } catch (e) {
        throw new LodgerError('loading forms failed %%', e);
      }

      if (!forms) {
        throw new LodgerError('build failed. forms could not be inited.');
      }

      debug(`Loaded ${Object.keys(forms).length} forms ok.`);

      const _collections = taxonomii.map(tax => forms[tax].collection);

      const db = yield DB(_collections, dbCon);
      const store = new LodgerStore({
        taxonomii,
        forms
      }); // const { collections } = await db

      if (options) Object.assign(buildOpts, Object.assign({}, options));
      /**
       * When a taxonomy item gets SELECTED,
       * try to call all DB methods for refrences of the taxonomy
       *
       */

      store.subscribe(({
        type,
        payload
      }, state) => __chunk_1.__awaiter(this, void 0, void 0, function* () {
        const path = type.split('/');
        if (path[1] !== 'select') return;
        const debug = Debug$1('lodger:SELECTstoreSubscriber');
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

        referenceTaxonomies.forEach(refTax => __chunk_1.__awaiter(this, void 0, void 0, function* () {
          const refdoc = store.getters[`${refTax}/activeDoc`]; // debug(`refdoc ${tax} (${refTax})`, refdoc)

          if (!refdoc) return;
          const method = refdoc[`toggle_${tax}`];
          if (!method || typeof method !== 'function') return;
          yield method(id);
          debug(`called references methods for ${refTax}`);
        })); // update find criteria in DH with selected Item

        if (dependentTaxonomies.length) {
          dependentTaxonomies.forEach(dTax => {
            const subscriber = payload.subscriber || 'main';
            const {
              plural
            } = forms[dTax];
            const holder = vueHelper.subsData[subscriber][plural];
            if (!holder || !holder.criteriu) return;
            debug('asignez', dTax, subscriber, reference);
            holder.criteriu.find = Object.assign({}, reference); // deselect

            store.dispatch(`${dTax}/select`, {
              id: null,
              subscriber
            });
          });
          debug('ass dun');
        }
      }));
      return new Lodger(taxonomii, forms, db, store);
    });
  }
  /**
   * Extend Lodger :)
   * Todo!
   *
   * @param {LodgerPlugin} plugin
   *
   */


  static use(plugin) {
    const debug = Debug$1('lodger:use');

    if (!plugin || typeof plugin !== 'object') {
      throw new LodgerError(exports.Errors.invalidPluginDefinition);
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
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      yield this.unsubscribeAll();
      yield this.db.destroy();
    });
  }
  /**
   * Exports the DB
   * as a YML file with ext .ldb
   * date is captured
   *
   */


  export(path, cryptedData, filename) {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      const debug = Debug$1('lodger:export');
      const json = yield this.db.dump();
      const extension = 'ldb';
      if (!path) path = `${require('os').homeDir}/downloads/`;

      if (!filename) {
        const date = new Date();
        filename = `LdgDB-${date}`;
      }

      fs.writeFile(`${path}/${filename}.${extension}`, json2yaml.stringify(json), e => {
        if (e) throw new LodgerError(exports.Errors.couldNotWriteFile);
        debug(`written ${filename}.${extension} in path`);
      });
    });
  }
  /**
   * TODO!!
   */


  import() {
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {});
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
    return __chunk_1.__awaiter(this, void 0, void 0, function* () {
      const sub = subscribers[subscriberName];
      const debug = Debug$1('lodger:unsubAll');
      return yield Promise.all(Object.keys(sub).map(subscriber => __chunk_1.__awaiter(this, void 0, void 0, function* () {
        yield sub[subscriber].unsubscribe();
        debug('unsubscribed', subscriber);
      })));
    });
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
    return references => assignRefIdsFromStore({
      references,
      getters
    });
  }

  get subscriberData() {
    const {
      forms
    } = this;
    const debug = Debug$1('lodger:subscriberData');
    return (taxonomy, subscriberName) => {
      const {
        plural
      } = forms[taxonomy];

      try {
        return vueHelper.subsData[subscriberName][plural].items;
      } catch (e) {
        if (!vueHelper.subsData) Vue.set(vueHelper.subsData, subscriberName, {});
        debug('nu exista %%', {
          plural,
          subscriberName
        });
      }
    };
  }

}

exports.Lodger = Lodger;
