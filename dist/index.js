'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rxdb = require('rxdb');
var mobx = require('mobx');
var faker = require('faker');
var consola = require('consola');
var Subscriber = require('rxcollection-subscriber');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var faker__default = /*#__PURE__*/_interopDefaultLegacy(faker);
var consola__default = /*#__PURE__*/_interopDefaultLegacy(consola);
var Subscriber__default = /*#__PURE__*/_interopDefaultLegacy(Subscriber);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var env = String(process.env.NODE_ENV);

var version = require('../package.json').version;
var build = {
  db: {
    name: 'Lodger/$',
    adapter: 'memory',
    password: 'l0dg3rp4$$',
    ignoreDuplicate: Boolean(env === 'test')
  }
};
var taxonomii = {
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
var config = {
  version: version,
  taxonomii: taxonomii,
  build: build
};

const allLangs = [{
  "code": "ab",
  "name": "Abkhaz",
  "nativeName": "аҧсуа"
}, {
  "code": "aa",
  "name": "Afar",
  "nativeName": "Afaraf"
}, {
  "code": "af",
  "name": "Afrikaans",
  "nativeName": "Afrikaans"
}, {
  "code": "ak",
  "name": "Akan",
  "nativeName": "Akan"
}, {
  "code": "sq",
  "name": "Albanian",
  "nativeName": "Shqip"
}, {
  "code": "am",
  "name": "Amharic",
  "nativeName": "አማርኛ"
}, {
  "code": "ar",
  "name": "Arabic",
  "nativeName": "العربية"
}, {
  "code": "an",
  "name": "Aragonese",
  "nativeName": "Aragonés"
}, {
  "code": "hy",
  "name": "Armenian",
  "nativeName": "Հայերեն"
}, {
  "code": "as",
  "name": "Assamese",
  "nativeName": "অসমীয়া"
}, {
  "code": "av",
  "name": "Avaric",
  "nativeName": "авар мацӀ, магӀарул мацӀ"
}, {
  "code": "ae",
  "name": "Avestan",
  "nativeName": "avesta"
}, {
  "code": "ay",
  "name": "Aymara",
  "nativeName": "aymar aru"
}, {
  "code": "az",
  "name": "Azerbaijani",
  "nativeName": "azərbaycan dili"
}, {
  "code": "bm",
  "name": "Bambara",
  "nativeName": "bamanankan"
}, {
  "code": "ba",
  "name": "Bashkir",
  "nativeName": "башҡорт теле"
}, {
  "code": "eu",
  "name": "Basque",
  "nativeName": "euskara, euskera"
}, {
  "code": "be",
  "name": "Belarusian",
  "nativeName": "Беларуская"
}, {
  "code": "bn",
  "name": "Bengali",
  "nativeName": "বাংলা"
}, {
  "code": "bh",
  "name": "Bihari",
  "nativeName": "भोजपुरी"
}, {
  "code": "bi",
  "name": "Bislama",
  "nativeName": "Bislama"
}, {
  "code": "bs",
  "name": "Bosnian",
  "nativeName": "bosanski jezik"
}, {
  "code": "br",
  "name": "Breton",
  "nativeName": "brezhoneg"
}, {
  "code": "bg",
  "name": "Bulgarian",
  "nativeName": "български език"
}, {
  "code": "my",
  "name": "Burmese",
  "nativeName": "ဗမာစာ"
}, {
  "code": "ca",
  "name": "Catalan; Valencian",
  "nativeName": "Català"
}, {
  "code": "ch",
  "name": "Chamorro",
  "nativeName": "Chamoru"
}, {
  "code": "ce",
  "name": "Chechen",
  "nativeName": "нохчийн мотт"
}, {
  "code": "ny",
  "name": "Chichewa; Chewa; Nyanja",
  "nativeName": "chiCheŵa, chinyanja"
}, {
  "code": "zh",
  "name": "Chinese",
  "nativeName": "中文 (Zhōngwén), 汉语, 漢語"
}, {
  "code": "cv",
  "name": "Chuvash",
  "nativeName": "чӑваш чӗлхи"
}, {
  "code": "kw",
  "name": "Cornish",
  "nativeName": "Kernewek"
}, {
  "code": "co",
  "name": "Corsican",
  "nativeName": "corsu, lingua corsa"
}, {
  "code": "cr",
  "name": "Cree",
  "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ"
}, {
  "code": "hr",
  "name": "Croatian",
  "nativeName": "hrvatski"
}, {
  "code": "cs",
  "name": "Czech",
  "nativeName": "česky, čeština"
}, {
  "code": "da",
  "name": "Danish",
  "nativeName": "dansk"
}, {
  "code": "dv",
  "name": "Divehi; Dhivehi; Maldivian;",
  "nativeName": "ދިވެހި"
}, {
  "code": "nl",
  "name": "Dutch",
  "nativeName": "Nederlands, Vlaams"
}, {
  "code": "en",
  "name": "English",
  "nativeName": "English",
  "supported": true
}, {
  "code": "eo",
  "name": "Esperanto",
  "nativeName": "Esperanto"
}, {
  "code": "et",
  "name": "Estonian",
  "nativeName": "eesti, eesti keel"
}, {
  "code": "ee",
  "name": "Ewe",
  "nativeName": "Eʋegbe"
}, {
  "code": "fo",
  "name": "Faroese",
  "nativeName": "føroyskt"
}, {
  "code": "fj",
  "name": "Fijian",
  "nativeName": "vosa Vakaviti"
}, {
  "code": "fi",
  "name": "Finnish",
  "nativeName": "suomi, suomen kieli"
}, {
  "code": "fr",
  "name": "French",
  "nativeName": "français, langue française",
  "supported": true
}, {
  "code": "ff",
  "name": "Fula; Fulah; Pulaar; Pular",
  "nativeName": "Fulfulde, Pulaar, Pular"
}, {
  "code": "gl",
  "name": "Galician",
  "nativeName": "Galego"
}, {
  "code": "ka",
  "name": "Georgian",
  "nativeName": "ქართული"
}, {
  "code": "de",
  "name": "German",
  "nativeName": "Deutsch"
}, {
  "code": "el",
  "name": "Greek, Modern",
  "nativeName": "Ελληνικά"
}, {
  "code": "gn",
  "name": "Guaraní",
  "nativeName": "Avañeẽ"
}, {
  "code": "gu",
  "name": "Gujarati",
  "nativeName": "ગુજરાતી"
}, {
  "code": "ht",
  "name": "Haitian; Haitian Creole",
  "nativeName": "Kreyòl ayisyen"
}, {
  "code": "ha",
  "name": "Hausa",
  "nativeName": "Hausa, هَوُسَ"
}, {
  "code": "he",
  "name": "Hebrew (modern)",
  "nativeName": "עברית"
}, {
  "code": "hz",
  "name": "Herero",
  "nativeName": "Otjiherero"
}, {
  "code": "hi",
  "name": "Hindi",
  "nativeName": "हिन्दी, हिंदी"
}, {
  "code": "ho",
  "name": "Hiri Motu",
  "nativeName": "Hiri Motu"
}, {
  "code": "hu",
  "name": "Hungarian",
  "nativeName": "Magyar"
}, {
  "code": "ia",
  "name": "Interlingua",
  "nativeName": "Interlingua"
}, {
  "code": "id",
  "name": "Indonesian",
  "nativeName": "Bahasa Indonesia"
}, {
  "code": "ie",
  "name": "Interlingue",
  "nativeName": "Originally called Occidental; then Interlingue after WWII"
}, {
  "code": "ga",
  "name": "Irish",
  "nativeName": "Gaeilge"
}, {
  "code": "ig",
  "name": "Igbo",
  "nativeName": "Asụsụ Igbo"
}, {
  "code": "ik",
  "name": "Inupiaq",
  "nativeName": "Iñupiaq, Iñupiatun"
}, {
  "code": "io",
  "name": "Ido",
  "nativeName": "Ido"
}, {
  "code": "is",
  "name": "Icelandic",
  "nativeName": "Íslenska"
}, {
  "code": "it",
  "name": "Italian",
  "nativeName": "Italiano"
}, {
  "code": "iu",
  "name": "Inuktitut",
  "nativeName": "ᐃᓄᒃᑎᑐᑦ"
}, {
  "code": "ja",
  "name": "Japanese",
  "nativeName": "日本語 (にほんご／にっぽんご)"
}, {
  "code": "jv",
  "name": "Javanese",
  "nativeName": "basa Jawa"
}, {
  "code": "kl",
  "name": "Kalaallisut, Greenlandic",
  "nativeName": "kalaallisut, kalaallit oqaasii"
}, {
  "code": "kn",
  "name": "Kannada",
  "nativeName": "ಕನ್ನಡ"
}, {
  "code": "kr",
  "name": "Kanuri",
  "nativeName": "Kanuri"
}, {
  "code": "ks",
  "name": "Kashmiri",
  "nativeName": "कश्मीरी, كشميري‎"
}, {
  "code": "kk",
  "name": "Kazakh",
  "nativeName": "Қазақ тілі"
}, {
  "code": "km",
  "name": "Khmer",
  "nativeName": "ភាសាខ្មែរ"
}, {
  "code": "ki",
  "name": "Kikuyu, Gikuyu",
  "nativeName": "Gĩkũyũ"
}, {
  "code": "rw",
  "name": "Kinyarwanda",
  "nativeName": "Ikinyarwanda"
}, {
  "code": "ky",
  "name": "Kirghiz, Kyrgyz",
  "nativeName": "кыргыз тили"
}, {
  "code": "kv",
  "name": "Komi",
  "nativeName": "коми кыв"
}, {
  "code": "kg",
  "name": "Kongo",
  "nativeName": "KiKongo"
}, {
  "code": "ko",
  "name": "Korean",
  "nativeName": "한국어 (韓國語), 조선말 (朝鮮語)"
}, {
  "code": "ku",
  "name": "Kurdish",
  "nativeName": "Kurdî, كوردی‎"
}, {
  "code": "kj",
  "name": "Kwanyama, Kuanyama",
  "nativeName": "Kuanyama"
}, {
  "code": "la",
  "name": "Latin",
  "nativeName": "latine, lingua latina"
}, {
  "code": "lb",
  "name": "Luxembourgish, Letzeburgesch",
  "nativeName": "Lëtzebuergesch"
}, {
  "code": "lg",
  "name": "Luganda",
  "nativeName": "Luganda"
}, {
  "code": "li",
  "name": "Limburgish, Limburgan, Limburger",
  "nativeName": "Limburgs"
}, {
  "code": "ln",
  "name": "Lingala",
  "nativeName": "Lingála"
}, {
  "code": "lo",
  "name": "Lao",
  "nativeName": "ພາສາລາວ"
}, {
  "code": "lt",
  "name": "Lithuanian",
  "nativeName": "lietuvių kalba"
}, {
  "code": "lu",
  "name": "Luba-Katanga",
  "nativeName": ""
}, {
  "code": "lv",
  "name": "Latvian",
  "nativeName": "latviešu valoda"
}, {
  "code": "gv",
  "name": "Manx",
  "nativeName": "Gaelg, Gailck"
}, {
  "code": "mk",
  "name": "Macedonian",
  "nativeName": "македонски јазик"
}, {
  "code": "mg",
  "name": "Malagasy",
  "nativeName": "Malagasy fiteny"
}, {
  "code": "ms",
  "name": "Malay",
  "nativeName": "bahasa Melayu, بهاس ملايو‎"
}, {
  "code": "ml",
  "name": "Malayalam",
  "nativeName": "മലയാളം"
}, {
  "code": "mt",
  "name": "Maltese",
  "nativeName": "Malti"
}, {
  "code": "mi",
  "name": "Māori",
  "nativeName": "te reo Māori"
}, {
  "code": "mr",
  "name": "Marathi (Marāṭhī)",
  "nativeName": "मराठी"
}, {
  "code": "mh",
  "name": "Marshallese",
  "nativeName": "Kajin M̧ajeļ"
}, {
  "code": "mn",
  "name": "Mongolian",
  "nativeName": "монгол"
}, {
  "code": "na",
  "name": "Nauru",
  "nativeName": "Ekakairũ Naoero"
}, {
  "code": "nv",
  "name": "Navajo, Navaho",
  "nativeName": "Diné bizaad, Dinékʼehǰí"
}, {
  "code": "nb",
  "name": "Norwegian Bokmål",
  "nativeName": "Norsk bokmål"
}, {
  "code": "nd",
  "name": "North Ndebele",
  "nativeName": "isiNdebele"
}, {
  "code": "ne",
  "name": "Nepali",
  "nativeName": "नेपाली"
}, {
  "code": "ng",
  "name": "Ndonga",
  "nativeName": "Owambo"
}, {
  "code": "nn",
  "name": "Norwegian Nynorsk",
  "nativeName": "Norsk nynorsk"
}, {
  "code": "no",
  "name": "Norwegian",
  "nativeName": "Norsk"
}, {
  "code": "ii",
  "name": "Nuosu",
  "nativeName": "ꆈꌠ꒿ Nuosuhxop"
}, {
  "code": "nr",
  "name": "South Ndebele",
  "nativeName": "isiNdebele"
}, {
  "code": "oc",
  "name": "Occitan",
  "nativeName": "Occitan"
}, {
  "code": "oj",
  "name": "Ojibwe, Ojibwa",
  "nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ"
}, {
  "code": "cu",
  "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
  "nativeName": "ѩзыкъ словѣньскъ"
}, {
  "code": "om",
  "name": "Oromo",
  "nativeName": "Afaan Oromoo"
}, {
  "code": "or",
  "name": "Oriya",
  "nativeName": "ଓଡ଼ିଆ"
}, {
  "code": "os",
  "name": "Ossetian, Ossetic",
  "nativeName": "ирон æвзаг"
}, {
  "code": "pa",
  "name": "Panjabi, Punjabi",
  "nativeName": "ਪੰਜਾਬੀ, پنجابی‎"
}, {
  "code": "pi",
  "name": "Pāli",
  "nativeName": "पाऴि"
}, {
  "code": "fa",
  "name": "Persian",
  "nativeName": "فارسی"
}, {
  "code": "pl",
  "name": "Polish",
  "nativeName": "polski"
}, {
  "code": "ps",
  "name": "Pashto, Pushto",
  "nativeName": "پښتو"
}, {
  "code": "pt",
  "name": "Portuguese",
  "nativeName": "Português"
}, {
  "code": "qu",
  "name": "Quechua",
  "nativeName": "Runa Simi, Kichwa"
}, {
  "code": "rm",
  "name": "Romansh",
  "nativeName": "rumantsch grischun"
}, {
  "code": "rn",
  "name": "Kirundi",
  "nativeName": "kiRundi"
}, {
  "code": "ro",
  "name": "Romanian, Moldavian, Moldovan",
  "nativeName": "română",
  "supported": true
}, {
  "code": "ru",
  "name": "Russian",
  "nativeName": "русский язык"
}, {
  "code": "sa",
  "name": "Sanskrit (Saṁskṛta)",
  "nativeName": "संस्कृतम्"
}, {
  "code": "sc",
  "name": "Sardinian",
  "nativeName": "sardu"
}, {
  "code": "sd",
  "name": "Sindhi",
  "nativeName": "सिन्धी, سنڌي، سندھی‎"
}, {
  "code": "se",
  "name": "Northern Sami",
  "nativeName": "Davvisámegiella"
}, {
  "code": "sm",
  "name": "Samoan",
  "nativeName": "gagana faa Samoa"
}, {
  "code": "sg",
  "name": "Sango",
  "nativeName": "yângâ tî sängö"
}, {
  "code": "sr",
  "name": "Serbian",
  "nativeName": "српски језик"
}, {
  "code": "gd",
  "name": "Scottish Gaelic; Gaelic",
  "nativeName": "Gàidhlig"
}, {
  "code": "sn",
  "name": "Shona",
  "nativeName": "chiShona"
}, {
  "code": "si",
  "name": "Sinhala, Sinhalese",
  "nativeName": "සිංහල"
}, {
  "code": "sk",
  "name": "Slovak",
  "nativeName": "slovenčina"
}, {
  "code": "sl",
  "name": "Slovene",
  "nativeName": "slovenščina"
}, {
  "code": "so",
  "name": "Somali",
  "nativeName": "Soomaaliga, af Soomaali"
}, {
  "code": "st",
  "name": "Southern Sotho",
  "nativeName": "Sesotho"
}, {
  "code": "es",
  "name": "Spanish; Castilian",
  "nativeName": "español, castellano",
  "supported": true
}, {
  "code": "su",
  "name": "Sundanese",
  "nativeName": "Basa Sunda"
}, {
  "code": "sw",
  "name": "Swahili",
  "nativeName": "Kiswahili"
}, {
  "code": "ss",
  "name": "Swati",
  "nativeName": "SiSwati"
}, {
  "code": "sv",
  "name": "Swedish",
  "nativeName": "svenska"
}, {
  "code": "ta",
  "name": "Tamil",
  "nativeName": "தமிழ்"
}, {
  "code": "te",
  "name": "Telugu",
  "nativeName": "తెలుగు"
}, {
  "code": "tg",
  "name": "Tajik",
  "nativeName": "тоҷикӣ, toğikī, تاجیکی‎"
}, {
  "code": "th",
  "name": "Thai",
  "nativeName": "ไทย"
}, {
  "code": "ti",
  "name": "Tigrinya",
  "nativeName": "ትግርኛ"
}, {
  "code": "bo",
  "name": "Tibetan Standard, Tibetan, Central",
  "nativeName": "བོད་ཡིག"
}, {
  "code": "tk",
  "name": "Turkmen",
  "nativeName": "Türkmen, Түркмен"
}, {
  "code": "tl",
  "name": "Tagalog",
  "nativeName": "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
}, {
  "code": "tn",
  "name": "Tswana",
  "nativeName": "Setswana"
}, {
  "code": "to",
  "name": "Tonga (Tonga Islands)",
  "nativeName": "faka Tonga"
}, {
  "code": "tr",
  "name": "Turkish",
  "nativeName": "Türkçe"
}, {
  "code": "ts",
  "name": "Tsonga",
  "nativeName": "Xitsonga"
}, {
  "code": "tt",
  "name": "Tatar",
  "nativeName": "татарча, tatarça, تاتارچا‎"
}, {
  "code": "tw",
  "name": "Twi",
  "nativeName": "Twi"
}, {
  "code": "ty",
  "name": "Tahitian",
  "nativeName": "Reo Tahiti"
}, {
  "code": "ug",
  "name": "Uighur, Uyghur",
  "nativeName": "Uyƣurqə, ئۇيغۇرچە‎"
}, {
  "code": "uk",
  "name": "Ukrainian",
  "nativeName": "українська"
}, {
  "code": "ur",
  "name": "Urdu",
  "nativeName": "اردو"
}, {
  "code": "uz",
  "name": "Uzbek",
  "nativeName": "zbek, Ўзбек, أۇزبېك‎"
}, {
  "code": "ve",
  "name": "Venda",
  "nativeName": "Tshivenḓa"
}, {
  "code": "vi",
  "name": "Vietnamese",
  "nativeName": "Tiếng Việt"
}, {
  "code": "vo",
  "name": "Volapük",
  "nativeName": "Volapük"
}, {
  "code": "wa",
  "name": "Walloon",
  "nativeName": "Walon"
}, {
  "code": "cy",
  "name": "Welsh",
  "nativeName": "Cymraeg"
}, {
  "code": "wo",
  "name": "Wolof",
  "nativeName": "Wollof"
}, {
  "code": "fy",
  "name": "Western Frisian",
  "nativeName": "Frysk"
}, {
  "code": "xh",
  "name": "Xhosa",
  "nativeName": "isiXhosa"
}, {
  "code": "yi",
  "name": "Yiddish",
  "nativeName": "ייִדיש"
}, {
  "code": "yo",
  "name": "Yoruba",
  "nativeName": "Yorùbá"
}, {
  "code": "za",
  "name": "Zhuang, Chuang",
  "nativeName": "Saɯ cueŋƅ, Saw cuengh"
}]; // const localesDir = path.resolve(__dirname, '../locales')

const supported = allLangs.filter(lang => lang.supported).map(lang => lang.code);
const supportedLangs = allLangs.filter(lang => supported.indexOf(lang.code) > -1); // module.exports = { supportedLangs }

// import fx from 'fx'
/**
 * Error logger
 */

var LodgerError =
/** @class */
function (_super) {
  __extends(LodgerError, _super);

  function LodgerError(m, details) {
    var _this = this;

    if (details) {
      m = String(m).replace('%%', "\"" + JSON.stringify(details) + "\"");
    }

    _this = _super.call(this, m) || this; // Set the prototype explicitly.

    Object.setPrototypeOf(_this, LodgerError.prototype);
    return _this;
  }

  return LodgerError;
}(Error);

/**
 * Accepted -strings- for a LodgerSchema field's type
 *
 * @enum {number}
 */
var strings;

(function (strings) {
  strings[strings["$"] = 0] = "$";
  strings[strings["buildingName"] = 1] = "buildingName";
  strings[strings["fullName"] = 2] = "fullName";
  strings[strings["search"] = 3] = "search";
  strings[strings["select"] = 4] = "select";
  strings[strings["serviceName"] = 5] = "serviceName";
  strings[strings["string"] = 6] = "string";
  strings[strings["textarea"] = 7] = "textarea";
  strings[strings["userAvatar"] = 8] = "userAvatar";
})(strings || (strings = {}));
/**
 * Accepted 'number's for a LodgerSchema field
 *
 * @enum {number}
 */


var numbers;

(function (numbers) {
  numbers[numbers["date"] = 0] = "date";
  numbers[numbers["dateTime"] = 1] = "dateTime";
  numbers[numbers["number"] = 2] = "number";
})(numbers || (numbers = {}));
/**
 * Accepted 'array's for a LodgerSchema field
 *
 * @enum {number}
 */


var arrays;

(function (arrays) {
  arrays[arrays["array"] = 0] = "array";
  arrays[arrays["contactFields"] = 1] = "contactFields";
  arrays[arrays["contoare"] = 2] = "contoare";
  arrays[arrays["distribuire"] = 3] = "distribuire";
  arrays[arrays["furnizori"] = 4] = "furnizori";
  arrays[arrays["selApartamente"] = 5] = "selApartamente";
  arrays[arrays["servicii"] = 6] = "servicii";
  arrays[arrays["scari"] = 7] = "scari";
})(arrays || (arrays = {}));
/**
 * Accepted 'object's for a LodgerSchema field
 *
 * @enum {number}
 */


var objects;

(function (objects) {
  objects[objects["object"] = 0] = "object";
  objects[objects["organizatie"] = 1] = "organizatie";
})(objects || (objects = {}));

var plurals = {
  apartament: 'apartamente',
  asociatie: 'asociatii',
  bloc: 'blocuri',
  contor: 'contoare',
  cheltuiala: 'cheltuieli',
  factura: 'facturi',
  incasare: 'incasari',
  serviciu: 'servicii',
  tranzactie: 'tranzactii'
};
/**
 * Removes the '$' at the begining of a string
 *
 * @returns {String} the parsed string
 * @memberof String
 */

String.prototype.stripLeading = function (symbol) {
  if (this.indexOf(symbol) !== 0) return String(this);
  return String(this.replace(symbol, '').trim().stripLeading(symbol));
};

Object.defineProperties(String.prototype, {
  /**
   * Plurals. @todo use Intl
   */
  plural: {
    get: function () {
      return plurals[this] || String(this + "i");
    }
  },

  /**
   * Converts a LodgerField type to RxDB compatible one
   *
   * Explicatie:
   * DB-ul nu stie decat de tipurile primare:
   * -> boolean, string, number, array, object
   * Schema noastra e mult mai detaliata
   *
   * @returns {string} - tipul primar, eg. 'string'
   */
  asRxDBType: {
    get: function () {
      var _default = 'string';

      var _this = this.toString();

      if (Object.keys(strings).indexOf(_this) > -1) return _default;
      if (Object.keys(objects).indexOf(_this) > -1) return 'object';
      if (Object.keys(numbers).indexOf(_this) > -1) return 'number';
      if (Object.keys(arrays).indexOf(_this) > -1) return 'array';
      return _default;
    }
  },

  /**
   * Splits a $ string into Money object
   *
   * @memberof String
   * @returns {Money}
   */
  asMoney: {
    get: function () {
      var split = this.split(' ');
      return {
        currency: split[0],
        amount: split[1]
      };
    }
  },

  /**
   * Slugifies a string
   *
   * @memberof String
   * @returns {String} the slug
   */
  slug: {
    get: function () {
      return this.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
    }
  }
});
var S = {
  String: String
};

var currencies = [
	"RON",
	"GBP",
	"EUR",
	"USD",
	"BTC",
	"LTC",
	"ETH",
	"DASH",
	"BCH",
	"XRP",
	"TEL",
	"NANO",
	"DAI",
	"USDT",
	"AVA"
];

var holder = {};
Object.defineProperties(holder, {
  $: {
    get: function () {
      return faker__default['default'].random.arrayElement(currencies) + " " + faker__default['default'].finance.amount(100, 10000, 4);
    }
  },
  id: {
    get: function () {
      return '...';
    }
  },
  string: {
    get: function () {
      return faker__default['default'].lorem.words(3);
    }
  },
  number: {
    get: function () {
      return Number(faker__default['default'].random.number({
        min: 20,
        max: 300
      }));
    }
  },
  fullName: {
    get: function () {
      return faker__default['default'].name.firstName() + " " + faker__default['default'].name.lastName();
    }
  },
  dateTime: {
    get: function () {
      return Date.now() + faker__default['default'].random.number({
        min: 9000000,
        max: 100000000
      });
    }
  },
  buildingName: {
    get: function () {
      return faker__default['default'].random.alphaNumeric(2);
    }
  },
  serviceName: {
    get: function () {
      return faker__default['default'].hacker.adjective();
    }
  }
});

var String$1 = S.String;
/**
 *
 * @class Form Field Item
 * @implements {SchemaField}
 * @requires [String]
 * @extends RxJsonSchemaTopLevel
 */

var Field =
/** @class */
function () {
  /**
   * Creates an instance of Field.
   *
   * @param {FieldCreator<T>} data
   * @memberof Field
   */
  function Field(data) {
    var _this = this;

    this.type = 'string';
    this.storage = 'db'; // where to store data, in db or store

    this.value = function () {
      return _this.default || undefined;
    };

    this.key = 'index';

    if (!data) {
      // throw new FieldError('Field could not be created. No data supplied.')
      return;
    }

    var ref = data.ref,
        index = data.index,
        indexRef = data.indexRef,
        type = data.type,
        step = data.step,
        required = data.required,
        v = data.v,
        value = data.value,
        preview = data.preview,
        oninput = data.oninput,
        key = data.key,
        fieldset = data.fieldset;
    this.preview = preview;
    this._type = type; // hold this for reference

    this.type = String$1(type || '').asRxDBType;
    this.oninput = oninput;
    if (key) this.key = key;
    if (index !== undefined) this._index = true;
    if (fieldset !== undefined) this.fieldset = fieldset; // transform the ref

    if (ref) {
      this.ref = ref;
      this.items = {
        type: 'string'
      };
      if (indexRef) this.index = indexRef;
    } // steps for numbers


    if (step !== undefined) {
      if (this.type !== 'number') throw new LodgerError('Type must be "number" for .step');
      this.multipleOf = step;
    } // hook in required to validation string


    if (required) {
      this.v = required && v && v.indexOf('required') < 0 ? v : "required|" + v;
    } // assign default value, can be undefined


    this.default = typeof data.default === 'function' ? data.default() : data.default; // bind the value function

    var storage = this.storage;
    if (value && typeof value === 'function') this.value = value.bind({
      storage: storage
    });
    Object.defineProperty(this, 'fakeValue', {
      get: function () {
        return holder[type || 'string'];
      }
    });
  }

  Object.defineProperty(Field.prototype, "label", {
    get: function () {
      var _this = this;

      return function (o) {
        var _a;

        if (o === void 0) {
          o = (_a = {}, _a[_this.key] = 'unnamed', _a);
        }

        try {
          return o[_this.key];
        } catch (e) {
          return 'undefined label';
        }
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Field.prototype, "rxSchema", {
    /**
     * Used for Schema constructors,
     * returns only the properties needed for it
     */
    get: function () {
      var _this = this;

      var schema = {};
      var excludes = ['storage', 'value', 'default', 'v'];
      Object.keys(this).forEach(function (prop) {
        if (_this[prop] === undefined) return;
        if (excludes.indexOf(prop) > -1) return;
        schema[prop] = _this[prop];
      });
      return schema;
    },
    enumerable: false,
    configurable: true
  });

  __decorate([mobx.computed], Field.prototype, "label", null);

  return Field;
}();

var Errors;

(function (Errors) {
  Errors["missingProps"] = "Missing properties on schema %%";
  Errors["propExists"] = "Property \"%%\" already exists";
  Errors["idUndef"] = "ID for field %% cannot be undefined";
  Errors["invalidField"] = "Invalid field %% supplied";
})(Errors || (Errors = {}));
/**s
 *
 *
 * @class Schema
 * @extends {RxJsonSchema}
 * @implements {LodgerSchema}
 */


var Schema =
/** @class */
function () {
  /**
   * Constructs a valid RxJsonSchema out of a Lodger Form Data item
   *
   * @param {LodgerFormCreator} form
   * @param {boolean} [addCommonMethods]
   *
   * @memberof Schema
   * @returns {RxJsonSchema} schema
   */
  function Schema(name, fields, options) {
    var _this = this;

    this.name = name;
    this.type = 'object';
    this.version = 0;
    this.properties = {};
    this.required = [];
    this.indexes = [];
    if (!fields || !Object.keys(fields).length) throw new LodgerError(Errors.missingFields, {
      name: name
    });
    Object.keys(fields).map(function (f) {
      return _this.add(fields[f].id || f, fields[f]);
    });
  }
  /**
   * Adds properties programatically as
   * we also need to fill in the required array
   *
   * @param {FieldCreator} field
   * @memberof Schema
   */


  Schema.prototype.add = function (id, field) {
    if (!id) throw new LodgerError(Errors.idUndef, field);
    if (this.properties[id]) throw new LodgerError(Errors.propExists, id);
    if (field && !field.rxSchema) throw new LodgerError(Errors.invalidField, field);
    var rxSchema = field.rxSchema,
        v = field.v,
        storage = field.storage,
        _index = field._index;
    if (storage !== 'db') return;
    var required = v && v.indexOf('required') > -1;
    this.properties[id] = rxSchema || {};
    if (required && this.required.indexOf(id) < 0) this.required.push(id);

    if (_index) {
      this.indexes.push(id);
    }
  };

  Object.defineProperty(Schema.prototype, "ids", {
    get: function () {
      return Object.keys(this.properties);
    },
    enumerable: false,
    configurable: true
  });
  return Schema;
}();

/**
 * Errors Definition
 * @readonly
 * @enum {string}
 *
 * @todo account for translations
 */

var Errors$1;

(function (Errors) {
  Errors["invalidRequested"] = "Invalid file requested: %%";
  Errors["invalidName"] = "Invalid name supplied: %%";
  Errors["missingFields"] = "Missing fields on form %%";
})(Errors$1 || (Errors$1 = {}));
/**
 * Lodder Form class
 *
 * @class Form
 * @implements {LodgerForm}
 */


var Form =
/** @class */
function () {
  /**
   * Creates an instance of Form.
   *
   * @param {LodgerFormCreator} data - Form input data
   * @param {boolean} [generateRxCollection=true] - some forms don't require this
   *
   * @memberof Form
   */
  function Form(data, opts) {
    var _this = this;

    this.opts = opts;
    this._onsubmit = []; // hooks

    this.fields = {};
    this.$active = false;

    var _a = data || {
      name: 'untitled',
      fields: {}
    },
        fields = _a.fields,
        fieldsets = _a.fieldsets,
        name = _a.name,
        hooks = _a.hooks;

    this.name = name;
    this.fields = {};
    this.plural = this.name.plural;

    if (fields) {
      Object.keys(fields).map(function (key) {
        Object.assign(fields[key], {
          key: key
        });
        _this.fields[key] = new Field(fields[key]);
      });
    }

    if (fieldsets) {
      this.fieldsets = fieldsets;
    }

    if (hooks) {
      this.taxHooks = hooks;
    }

    if (opts) {
      var captureTimestamp = opts.captureTimestamp;

      if (captureTimestamp) {
        var timestampKeys = ['createdAt', 'updatedAt'];
        var captureTimestampField_1 = {
          type: 'dateTime',
          // required: true, // for filters / sorts
          index: true
        };
        timestampKeys.map(function (key) {
          _this.fields[key] = new Field(__assign({}, captureTimestampField_1));
        });
      }
    }

    this.schema = new Schema(name, this.fields); // default onsubmit func

    this.onsubmit = function () {};
  }

  Object.defineProperty(Form.prototype, "fakeData", {
    /**
     * Fakes data for testing
     *
     * @readonly
     * @memberof Form
     */
    get: function () {
      var _this = this;

      return Object.fromEntries(this.fieldsIds.filter(function (fieldId) {
        return fieldId.indexOf('Id') < 0;
      }).map(function (fieldId) {
        return [fieldId, _this.fields[fieldId].fakeValue];
      }));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form.prototype, "data", {
    /**
     * Makes a Vue-ready $data {object} suitable to be completed
     * by the user in the frontend -> new form
     * (as it will turn reactive)
     *
     * @readonly
     * @memberof Form
     * @returns {Object}
     */
    get: function () {
      return Object.assign.apply(Object, __spreadArrays([{}], Object.keys(this.fields)));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form.prototype, "fieldsIds", {
    /**
     * Quick access to all fields' ids
     *
     * @readonly
     * @memberof Form
     * @returns {string[]}
     */
    get: function () {
      return Object.keys(this.fields);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form.prototype, "previewFields", {
    get: function () {
      var _this = this;

      return this.fieldsIds.filter(function (field) {
        return _this.fields[field].preview > -1;
      }).sort(function (a, b) {
        return _this.fields[a].preview - _this.fields[b].preview;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Form.prototype, "onsubmit", {
    /**
     * register a new onsubmit function
     *
     * @memberof Form
     */
    set: function (f) {
      this._onsubmit.push(f.bind(this));
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Gets the value of current active form
   *
   * @summary for new forms, values are all undefined
   * @returns {Object} data item (Vue $data - ready)
   */

  Form.prototype.value = function (context) {
    var _this = this;

    var $data = {};
    this.fieldsIds.forEach(function (fieldId) {
      var field = _this.fields[fieldId];
      if (field.storage !== 'db') return; // todo: pune din store

      $data[fieldId] = field.value(context);
    });
    return $data;
  };

  return Form;
}();

/**
 * Notifies the user and also us, the devs, of anything!
 *
 * @kind Store action wrapper
 * fallsback to console
 *
 * @param {Notification} notification
 */

function notify(notification) {
  /**
   * if/when bound to Store
   * to be used on frontend mostly
   *
   */
  if (this && typeof this.dispatch === 'function' && this.actions.notify) {
    this.dispatch('notify', notification);
    return;
  } // Fallback -> Consola


  var type = notification.type,
      text = notification.text;
  consola__default['default'][type](text); // Always throw the err for stack reporting

  if (type === 'error') throw new Error(text);
}

var Errors$2;

(function (Errors) {
  Errors["noDB"] = "Please setup a DB first!";
})(Errors$2 || (Errors$2 = {}));

var db;
/**
 * @class Taxonomy
 * @implements {LodgerTaxonomy}
 *
 * @requires Form
 *
 * @param {Taxonomie} name - name of the form
 * @param {Form} form - the constructed form item
 */

var Taxonomy =
/** @class */
function () {
  /**
   * Creates an instance of Taxonomy.
   *
   * @param {Form<T, Interface>} form
   * @param {RxCollection<T>} collection
   * @memberof Taxonomy
   */
  function Taxonomy(form, collection, options) {
    var _this = this;

    this.form = form;
    this.options = options;
    this.lastItems = [];
    this.totals = 0;
    collection.postInsert(function (data, doc) {
      _this.totals += 1;
      _this.last = doc._id;
    }, false);
    collection.postRemove(function () {
      _this.totals -= 1;
    }, false); // kinda hide the property for snapshots

    Object.defineProperty(this, 'collection', {
      enumerable: false,
      writable: false,
      value: collection
    });
  }

  Object.defineProperty(Taxonomy.prototype, "last", {
    /**
     * Last added item's id
     *
     * @readonly
     * @memberof Taxonomy
     */
    get: function () {
      return this.lastItems[0];
    },
    set: function (id) {
      if (id) this.lastItems.unshift(id);else this.lastItems.shift();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Taxonomy, "db", {
    /**
     * DB handler
     *
     * @static
     * @memberof Taxonomy
     */
    set: function (xdb) {
      db = xdb;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * @alias db.destroy
   *
   * @static
   * @memberof Taxonomy
   */

  Taxonomy.destroy = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!db) return [2
            /*return*/
            ];
            return [4
            /*yield*/
            , db.destroy()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Object.defineProperty(Taxonomy.prototype, "plural", {
    get: function () {
      return this.form.plural;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Init function that builds up the form and collection
   *
   * @static
   * @param {TaxonomyCreator<Taxonomie>} data
   * @param {LodgerTaxonomyCreatorOptions} [options={}]
   * @returns {Taxonomy}
   * @memberof Taxonomy
   */

  Taxonomy.init = function (data, options) {
    if (options === void 0) {
      options = {};
    }

    return __awaiter(this, void 0, void 0, function () {
      var name, fields, fieldsets, methods, statics, hooks, timestamps, form, schema, collectionCreator, collection, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!db) throw new LodgerError(Errors$2.noDB);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            name = data.name, fields = data.fields, fieldsets = data.fieldsets, methods = data.methods, statics = data.statics, hooks = data.hooks;
            timestamps = options.timestamps;
            form = new Form({
              name: name,
              fields: fields,
              fieldsets: fieldsets,
              hooks: hooks
            }, {
              captureTimestamp: timestamps
            });
            schema = form.schema;
            collectionCreator = {
              name: name,
              schema: schema,
              methods: methods,
              statics: statics
            };
            return [4
            /*yield*/
            , db.collection(collectionCreator)];

          case 2:
            collection = _a.sent();
            return [2
            /*return*/
            , new this(form, collection, options)];

          case 3:
            e_1 = _a.sent();
            throw new LodgerError(e_1);

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Object.defineProperty(Taxonomy.prototype, "name", {
    /**
     *
     *
     * @readonly
     * @memberof Taxonomy
     */
    get: function () {
      return this.collection.name;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Removes a Document by ID from the collection
   *
   * @param {string} id
   * @returns {RxDocument<T>} removed document
   * @memberof Taxonomy
   */

  Taxonomy.prototype.trash = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4
            /*yield*/
            , this.collection.findOne(id).remove()];

          case 1:
            _a.sent();

            if (this.last === id) this.last = undefined;
            return [3
            /*break*/
            , 3];

          case 2:
            e_2 = _a.sent();
            notify({
              type: 'error',
              text: e_2
            });
            return [3
            /*break*/
            , 3];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Inserts/upserts a new item in DB
   *
   * @param {Object} doc
   * @returns {RxDocument<Taxonomie>} the fresh document
   *
   * @memberof Taxonomy
   */


  Taxonomy.prototype.put = function (doc) {
    return __awaiter(this, void 0, void 0, function () {
      var method, _a, name, options, _doc, id, e_3;

      var _b;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!doc || Object.keys(doc).length < 1) throw new LodgerError('Invalid doc supplied %%', {
              doc: doc
            });
            method = doc._id ? 'upsert' : 'insert';
            _a = this, name = _a.name, options = _a.options;

            if (options && options.timestamps) {
              Object.assign(doc, (_b = {}, _b[method === 'insert' ? 'createdAt' : 'updatedAt'] = new Date().getTime(), _b));
            }

            _c.label = 1;

          case 1:
            _c.trys.push([1, 3,, 4]);

            return [4
            /*yield*/
            , this.collection[method](doc)];

          case 2:
            _doc = _c.sent();
            id = _doc._id; // this.last = id

            notify({
              type: 'success',
              text: "[" + method + "] " + name + "!" + (['dev', 'test'].indexOf(env) > -1 ? "(" + id + ")" : '')
            });
            return [2
            /*return*/
            , _doc];

          case 3:
            e_3 = _c.sent();
            notify({
              type: 'error',
              text: String(e_3)
            });
            return [3
            /*break*/
            , 4];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Object.defineProperty(Taxonomy.prototype, "config", {
    /**
     * @readonly
     * @memberof Taxonomy
     * Taxonomy default config
     */
    get: function () {
      var taxonomii = config.taxonomii;
      var defaults = taxonomii.defaults;
      return taxonomii[this.name] || defaults;
    },
    enumerable: false,
    configurable: true
  });

  __decorate([mobx.observable], Taxonomy.prototype, "lastItems", void 0);

  __decorate([mobx.observable], Taxonomy.prototype, "totals", void 0);

  __decorate([mobx.computed], Taxonomy.prototype, "last", null);

  return Taxonomy;
}();

var STaxonomy =
/** @class */
function (_super) {
  __extends(STaxonomy, _super);

  function STaxonomy() {
    var _this = _super.apply(this, arguments) || this;

    _this.subscribers = {};
    _this._refsIds = {};
    return _this;
  }

  STaxonomy.init = function () {
    return _super.init.apply(this, arguments);
  };

  Object.defineProperty(STaxonomy.prototype, "data", {
    /**
     * Returns all data from subscribers
     *
     * @readonly
     * @memberof Taxonomy
     */
    get: function () {
      return this.subscribers;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(STaxonomy.prototype, "refsIds", {
    get: function () {
      return this._refsIds;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(STaxonomy.prototype, "subscribed", {
    /**
     * @readonly
     * @memberof Taxonomy
     * @returns {Boolean} if subscribed anywhere
     */
    get: function () {
      return Object.keys(this.subscribers).length > 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(STaxonomy.prototype, "defaultCriteria", {
    get: function () {
      return _super.prototype.config.criteriu;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Subscribes.
   *
   * @param {string} [subscriberName='main']
   * @param {Criteriu} [criteriuCerut]
   * @returns {Promise<Subscriber<T>>} the unwatcher for subscriber
   * @memberof Taxonomy
   */

  STaxonomy.prototype.subscribe = function (subscriberName, options) {
    if (subscriberName === void 0) {
      subscriberName = 'main';
    }

    return __awaiter(this, void 0, void 0, function () {
      var _a, hooks, subscribers, sub;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this, hooks = _a.hooks, subscribers = _a.subscribers;
            if (subscribers[subscriberName]) return [2
            /*return*/
            ];
            sub = this.subscribers[subscriberName] = new Subscriber__default['default'](this.collection, options);
            mobx.reaction(function () {
              return sub.selectedId;
            }, function (id) {
              var _a = _this,
                  parents = _a.parents,
                  children = _a.children,
                  name = _a.collection.name;

              if (children && children.length) {
                children.map(function (tax) {
                  var $tax = _this.$lodger[tax] || _this.$lodger[tax.plural];
                  if (!$tax) return;
                  var plural = $tax.form.plural,
                      subscribers = $tax.subscribers;
                  var taxSub = subscribers[subscriberName];

                  if (taxSub) {
                    // const { selectedId } = taxSub
                    // console.log('')
                    if (!taxSub._refsIds) {
                      taxSub._refsIds = mobx.observable.box({}, {
                        deep: true
                      });
                      taxSub.refsIds = mobx.computed(function () {
                        return taxSub._refsIds;
                      });
                    }

                    taxSub._refsIds[name + "Id"] = id;
                    console.log(name, id, taxSub.refsIds); // if (selectedId) {
                    //   taxSub._refsIds[plural === tax ? plural : `${tax}Id`] = plural === tax ? [ selectedId ] : selectedId
                    // }
                  }
                });
              }
            });
            if (!hooks) return [3
            /*break*/
            , 2];
            if (!hooks.empty) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , sub.updates];

          case 1:
            _b.sent();

            if (!sub.ids.length) hooks.empty.call(this);
            _b.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   *
   *
   * @param {string} [subscriberName='main']
   * @memberof STaxonomy
   */


  STaxonomy.prototype.unsubscribe = function (subscriberName) {
    if (subscriberName === void 0) {
      subscriberName = 'main';
    }

    var subscriber = this.subscribers[subscriberName];

    try {
      if (subscriber.kill) subscriber.kill();
    } catch (e) {}

    delete this.subscribers[subscriberName];
  };
  /**
   * Kills all active listeners for a given subscriber name
   *
   * @returns {Promise}
   * @memberof Taxonomy
   */


  STaxonomy.prototype.unsubscribeAll = function () {
    var _this = this;

    var subscribers = this.subscribers;
    if (!subscribers || !Object.keys(subscribers).length) throw new LodgerError('no subs');
    Object.keys(subscribers).forEach(function (s) {
      _this.unsubscribe(s);
    });
  };

  Object.defineProperty(STaxonomy.prototype, "hooks", {
    // referencesIds (subName: string) {
    //   const sub = this.subscribers[subName]
    //   if (!sub)
    //     throw new LodgerError('Invalid subscriber requested for refsIds')
    //   const { parents } = this
    //   if (!parents) return
    //   // const x = {}
    //   parents.map(tax => {
    //     const $tax = this.$lodger[tax] || this.$lodger[tax.plural]
    //     if (!$tax) return
    //     const { form: { plural }, subscribers } = $tax
    //     const taxSub = subscribers[subName]
    //     if (taxSub) {
    //       const { selectedId } = taxSub
    //       if (selectedId)
    //         this.refsIds[subName][plural === tax ? plural : `${tax}Id`] = plural === tax ? [ selectedId ] : selectedId
    //     }
    //   })
    //   // return x
    // }
    get: function () {
      return this.form.taxHooks;
    },
    enumerable: false,
    configurable: true
  });

  __decorate([mobx.observable], STaxonomy.prototype, "_refsIds", void 0);

  __decorate([mobx.computed], STaxonomy.prototype, "refsIds", null);

  return STaxonomy;
}(Taxonomy);

var dynamicTargets = {
  'Apartament.ts': () => Promise.resolve().then(function () { return Apartament; }),
  'Asociatie.ts': () => Promise.resolve().then(function () { return Asociatie; }),
  'Bloc.ts': () => Promise.resolve().then(function () { return Bloc; }),
  'Cheltuiala.ts': () => Promise.resolve().then(function () { return Cheltuiala; }),
  'Contor.ts': () => Promise.resolve().then(function () { return Contor; }),
  'Factura.ts': () => Promise.resolve().then(function () { return Factura; }),
  'Feedback.ts': () => Promise.resolve().then(function () { return Feedback; }),
  'Furnizor.ts': () => Promise.resolve().then(function () { return Furnizor; }),
  'Incasare.ts': () => Promise.resolve().then(function () { return Incasare; }),
  'Serviciu.ts': () => Promise.resolve().then(function () { return Serviciu; }),
  'Tranzactie.ts': () => Promise.resolve().then(function () { return Tranzactie; }),
  'Utilizator.ts': () => Promise.resolve().then(function () { return Utilizator; })
};

/**
 * Rollup helper file
 * to dynamically load schemas based on filename
 */

var capitalize = function (s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function load(schemas) {
  return __awaiter(this, void 0, void 0, function () {
    var _this = this;

    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , Promise.all(schemas.map(function (schemaFileName) {
            return __awaiter(_this, void 0, void 0, function () {
              var fileName, schema, _a;

              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    fileName = capitalize(schemaFileName) + ".ts";
                    _a = [{}];
                    return [4
                    /*yield*/
                    , dynamicTargets[fileName]()];

                  case 1:
                    schema = __assign.apply(void 0, _a.concat([_b.sent()]));
                    Object.defineProperty(schema, 'name', {
                      writable: false,
                      value: String(fileName.split('.')[0]).toLowerCase()
                    });
                    return [2
                    /*return*/
                    , schema];
                }
              });
            });
          }))];

        case 1:
          return [2
          /*return*/
          , _a.sent()];
      }
    });
  });
}

var locales = {
  'en': () => Promise.resolve().then(function () { return en$1; }),
  'es': () => Promise.resolve().then(function () { return es$1; }),
  'fr': () => Promise.resolve().then(function () { return fr$1; }),
  'ro': () => Promise.resolve().then(function () { return ro$1; })
};

/**
 * Rollup helper file
 * to dynamically load schemas based on filename
 */

function load$1(langs) {
  return __awaiter(this, void 0, void 0, function () {
    var _locales;

    var _this = this;

    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _locales = {};
          return [4
          /*yield*/
          , Promise.all(langs.map(function (langCode) {
            return __awaiter(_this, void 0, void 0, function () {
              var t;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4
                    /*yield*/
                    , locales[langCode]()];

                  case 1:
                    t = _a.sent();
                    _locales[langCode] = t.default;
                    return [2
                    /*return*/
                    ];
                }
              });
            });
          }))];

        case 1:
          _a.sent();

          return [2
          /*return*/
          , _locales];
      }
    });
  });
}

var ratesAtCompileTime = {"BTC":{"USD":"10718.48","EUR":"9100.1","BTC":"1.0","GBP":"8260.36","PLN":"40871.55","CZK":"246570.66","SEK":"95413.56","NOK":"98943.31","DKK":"67703.74","CHF":"9815.27","ZAR":"177671.1","AUD":"14935.95","JPY":"1132929.27","NZD":"16154.92","TRY":"83189.78","BRL":"59880.76","CAD":"14230.55","CNY":"72776.43","HKD":"83056.62","HUF":"3278615.01","INR":"783578.41","RUB":"838092.74","ILS":"36502.67","MYR":"44535.66","MXN":"229914.74","SGD":"14586.52","RON":"44364.18","IDR":"157601351.14","PHP":"518912.29","ARS":"825379.52","THB":"335424.07","NGN":"4110076.82","PKR":"1764600.12","AED":"39364.03","UAH":"304362.87","BGN":"17789.29","HRK":"68871.38","RSD":"1069852.46","ETH":"30.4794","LTC":"233.8087","DASH":"160.3335","BCH":"48.6622","XRP":"42955.33","CLP":"8550245.86","TEL":"50000000.0","NANO":"14104.37","DAI":"10590.1","USDT":"10712.54","AVA":"19157.09"},"USD":{"BTC":"0.0000933","EUR":"0.85","USD":"1.0","GBP":"0.77","PLN":"3.81","CZK":"23.02","SEK":"8.9","NOK":"9.23","DKK":"6.32","CHF":"0.92","ZAR":"16.59","AUD":"1.39","JPY":"105.72","NZD":"1.51","TRY":"7.76","BRL":"5.56","CAD":"1.33","CNY":"6.79","HKD":"7.75","HUF":"305.91","INR":"73.12","RUB":"78.16","ILS":"3.41","MYR":"4.16","MXN":"21.42","SGD":"1.36","RON":"4.14","PHP":"48.43","ARS":"76.94","THB":"31.3","NGN":"383.5","IDR":"14805.68","PKR":"164.65","AED":"3.67","UAH":"28.4","BGN":"1.66","HRK":"6.43","RSD":"99.85","LTC":"0.021844","ETH":"0.002843","DASH":"0.014885","BCH":"0.004548","XRP":"4.0177","CLP":"797.7","TEL":"4665.0","NANO":"1.3159","DAI":"0.9892","USDT":"0.9994","AVA":"1.7873"},"GBP":{"BTC":"0.00012106","USD":"1.3","EUR":"1.1","LTC":"0.028328","ETH":"0.003692","DASH":"0.019124","BCH":"0.005889","XRP":"5.2088","TEL":"6053.0","NANO":"1.7075","DAI":"1.2833","USDT":"1.2969","AVA":"2.3192"},"EUR":{"BTC":"0.00010989","USD":"1.18","EUR":"1.0","GBP":"0.91","PLN":"4.49","CZK":"27.1","SEK":"10.48","NOK":"10.87","DKK":"7.44","CHF":"1.08","ZAR":"19.52","AUD":"1.64","JPY":"124.5","NZD":"1.78","TRY":"9.14","BRL":"6.58","CAD":"1.56","CNY":"8.0","HKD":"9.13","HUF":"360.28","INR":"86.11","RUB":"92.1","ILS":"4.01","MYR":"4.89","MXN":"25.26","SGD":"1.6","RON":"4.87","PHP":"57.02","ARS":"90.7","THB":"36.86","NGN":"451.64","IDR":"17318.05","PKR":"193.9","AED":"4.33","UAH":"33.44","BGN":"1.95","HRK":"7.57","RSD":"117.56","LTC":"0.025714","ETH":"0.003351","DASH":"0.017359","BCH":"0.005346","XRP":"4.7281","CLP":"939.55","TEL":"5494.0","NANO":"1.5499","DAI":"1.1649","USDT":"1.1772","AVA":"2.1052"},"PLN":{"USD":"0.26","BTC":"0.00002447","EUR":"0.22","LTC":"0.005725","ETH":"0.00074613","DASH":"0.003865","BCH":"0.00119","XRP":"1.0527","TEL":"1223.0","NANO":"0.3451","DAI":"0.2594","USDT":"0.2621","AVA":"0.4687"},"CZK":{"USD":"0.0434","BTC":"0.00000406","EUR":"0.0369","LTC":"0.000949","ETH":"0.00012368","DASH":"0.00064066","BCH":"0.0001973","XRP":"0.1745","TEL":"202.78","NANO":"0.057202","DAI":"0.042993","USDT":"0.043446","AVA":"0.077694"},"SEK":{"USD":"0.11","BTC":"0.00001048","EUR":"0.1","LTC":"0.002452","ETH":"0.00031961","DASH":"0.001656","BCH":"0.00050986","XRP":"0.4509","TEL":"524.03","NANO":"0.1478","DAI":"0.1111","USDT":"0.1123","AVA":"0.2008"},"NOK":{"USD":"0.11","BTC":"0.00001011","EUR":"0.09","LTC":"0.002365","ETH":"0.00030821","DASH":"0.001597","BCH":"0.00049168","XRP":"0.4349","TEL":"505.34","NANO":"0.1426","DAI":"0.1071","USDT":"0.1083","AVA":"0.1936"},"DKK":{"USD":"0.16","BTC":"0.00001477","EUR":"0.13","LTC":"0.003456","ETH":"0.00045042","DASH":"0.002333","BCH":"0.00071854","XRP":"0.6355","TEL":"738.51","NANO":"0.2083","DAI":"0.1566","USDT":"0.1582","AVA":"0.283"},"CHF":{"USD":"1.09","BTC":"0.00010188","EUR":"0.93","LTC":"0.02384","ETH":"0.003107","DASH":"0.016094","BCH":"0.004956","XRP":"4.3836","TEL":"5094.0","NANO":"1.437","DAI":"1.08","USDT":"1.0914","AVA":"1.9518"},"ZAR":{"EUR":"0.05","USD":"0.06","BTC":"0.00000563","LTC":"0.001317","ETH":"0.00017164","DASH":"0.00088911","BCH":"0.00027381","XRP":"0.2422","TEL":"281.42","NANO":"0.079385","DAI":"0.059666","USDT":"0.060294","AVA":"0.1078"},"AUD":{"EUR":"0.61","USD":"0.72","BTC":"0.00006695","LTC":"0.015667","ETH":"0.002042","DASH":"0.010576","BCH":"0.003257","XRP":"2.8807","TEL":"3348.0","NANO":"0.9443","DAI":"0.7098","USDT":"0.7172","AVA":"1.2826"},"JPY":{"EUR":"0.008","USD":"0.0095","BTC":"0.00000088","LTC":"0.00020654","ETH":"0.00002692","DASH":"0.00013943","BCH":"0.00004294","XRP":"0.037978","TEL":"44.13","NANO":"0.012449","DAI":"0.009357","USDT":"0.009456","AVA":"0.016909"},"NZD":{"EUR":"0.56","USD":"0.66","BTC":"0.0000619","LTC":"0.014485","ETH":"0.001888","DASH":"0.009778","BCH":"0.003011","XRP":"2.6634","TEL":"3095.0","NANO":"0.8731","DAI":"0.6562","USDT":"0.6631","AVA":"1.1858"},"TRY":{"EUR":"0.11","USD":"0.13","BTC":"0.00001202","LTC":"0.002813","ETH":"0.00036657","DASH":"0.001899","BCH":"0.00058478","XRP":"0.5172","TEL":"601.04","NANO":"0.1695","DAI":"0.1274","USDT":"0.1288","AVA":"0.2303"},"BRL":{"EUR":"0.15","USD":"0.18","BTC":"0.0000167","LTC":"0.003908","ETH":"0.00050927","DASH":"0.002638","BCH":"0.00081241","XRP":"0.7185","TEL":"834.99","NANO":"0.2355","DAI":"0.177","USDT":"0.1789","AVA":"0.3199"},"CAD":{"EUR":"0.64","USD":"0.75","BTC":"0.00007027","LTC":"0.016443","ETH":"0.002143","DASH":"0.011101","BCH":"0.003419","XRP":"3.0235","TEL":"3514.0","NANO":"0.9911","DAI":"0.7449","USDT":"0.7528","AVA":"1.3462"},"CNY":{"EUR":"0.13","USD":"0.15","BTC":"0.00001374","LTC":"0.003215","ETH":"0.00041903","DASH":"0.002171","BCH":"0.00066846","XRP":"0.5912","TEL":"687.04","NANO":"0.1938","DAI":"0.1457","USDT":"0.1472","AVA":"0.2632"},"HKD":{"EUR":"0.11","USD":"0.13","BTC":"0.00001204","LTC":"0.002817","ETH":"0.00036716","DASH":"0.001902","BCH":"0.00058572","XRP":"0.518","TEL":"602.0","NANO":"0.1698","DAI":"0.1276","USDT":"0.129","AVA":"0.2307"},"HUF":{"EUR":"0.0028","USD":"0.0033","BTC":"0.00000031","LTC":"0.00007137","ETH":"0.0000093","DASH":"0.00004818","BCH":"0.00001484","XRP":"0.013123","TEL":"15.25","NANO":"0.004302","DAI":"0.003233","USDT":"0.003267","AVA":"0.005843"},"INR":{"EUR":"0.0116","USD":"0.0137","BTC":"0.00000128","LTC":"0.00029862","ETH":"0.00003892","DASH":"0.0002016","BCH":"0.00006208","XRP":"0.05491","TEL":"63.81","NANO":"0.018","DAI":"0.013529","USDT":"0.013671","AVA":"0.024448"},"RUB":{"EUR":"0.0109","USD":"0.0128","BTC":"0.00000119","LTC":"0.0002792","ETH":"0.00003639","DASH":"0.00018849","BCH":"0.00005805","XRP":"0.051339","TEL":"59.66","NANO":"0.016829","DAI":"0.012649","USDT":"0.012782","AVA":"0.022858"},"ILS":{"EUR":"0.25","USD":"0.29","BTC":"0.0000274","LTC":"0.00641","ETH":"0.00083543","DASH":"0.004328","BCH":"0.001333","XRP":"1.1787","TEL":"1370.0","NANO":"0.3864","DAI":"0.2904","USDT":"0.2935","AVA":"0.5248"},"MYR":{"EUR":"0.2","USD":"0.24","BTC":"0.00002245","LTC":"0.005254","ETH":"0.00068476","DASH":"0.003547","BCH":"0.001092","XRP":"0.9661","TEL":"1123.0","NANO":"0.3167","DAI":"0.238","USDT":"0.2405","AVA":"0.4302"},"MXN":{"EUR":"0.0396","USD":"0.0467","BTC":"0.00000435","LTC":"0.001018","ETH":"0.00013264","DASH":"0.0006871","BCH":"0.0002116","XRP":"0.1871","TEL":"217.47","NANO":"0.061346","DAI":"0.046109","USDT":"0.046594","AVA":"0.083323"},"SGD":{"EUR":"0.62","USD":"0.73","BTC":"0.00006856","LTC":"0.016042","ETH":"0.002091","DASH":"0.01083","BCH":"0.003335","XRP":"2.9498","TEL":"3428.0","NANO":"0.9669","DAI":"0.7268","USDT":"0.7344","AVA":"1.3133"},"RON":{"EUR":"0.21","USD":"0.24","BTC":"0.00002254","LTC":"0.005275","ETH":"0.00068741","DASH":"0.003561","BCH":"0.001097","XRP":"0.9699","TEL":"1127.0","NANO":"0.3179","DAI":"0.239","USDT":"0.2415","AVA":"0.4318"},"IDR":{"EUR":"0.0001","USD":"0.0001","BTC":"0.00000001","LTC":"0.00000148","ETH":"0.00000019","DASH":"0.000001","BCH":"0.00000031","XRP":"0.00027302","TEL":"0.3173","NANO":"0.00008949","DAI":"0.00006727","USDT":"0.00006797","AVA":"0.00012155"},"PHP":{"EUR":"0.0175","USD":"0.0207","BTC":"0.00000193","LTC":"0.00045095","ETH":"0.00005877","DASH":"0.00030443","BCH":"0.00009375","XRP":"0.082919","TEL":"96.36","NANO":"0.027181","DAI":"0.02043","USDT":"0.020644","AVA":"0.036918"},"ARS":{"EUR":"0.011","USD":"0.013","BTC":"0.00000121","LTC":"0.00028351","ETH":"0.00003695","DASH":"0.0001914","BCH":"0.00005894","XRP":"0.052131","TEL":"60.58","NANO":"0.017088","DAI":"0.012844","USDT":"0.012979","AVA":"0.02321"},"THB":{"EUR":"0.0271","USD":"0.032","BTC":"0.00000298","LTC":"0.00069764","ETH":"0.00009092","DASH":"0.00047097","BCH":"0.00014504","XRP":"0.1283","TEL":"149.07","NANO":"0.042049","DAI":"0.031605","USDT":"0.031937","AVA":"0.057113"},"NGN":{"EUR":"0.0022","USD":"0.0026","BTC":"0.00000024","LTC":"0.00005693","ETH":"0.00000742","DASH":"0.00003844","BCH":"0.00001184","XRP":"0.010469","TEL":"12.17","NANO":"0.003432","DAI":"0.002579","USDT":"0.002606","AVA":"0.004661"},"PKR":{"USD":"0.0061","EUR":"0.0052","BTC":"0.00000057","LTC":"0.00013261","ETH":"0.00001728","DASH":"0.00008952","BCH":"0.00002757","XRP":"0.024384","TEL":"28.34","NANO":"0.007993","DAI":"0.006008","USDT":"0.006071","AVA":"0.010856"},"AED":{"USD":"0.27","EUR":"0.23","BTC":"0.0000254","LTC":"0.005945","ETH":"0.00077473","DASH":"0.004013","BCH":"0.001236","XRP":"1.0931","TEL":"1270.0","NANO":"0.3583","DAI":"0.2693","USDT":"0.2721","AVA":"0.4867"},"UAH":{"USD":"0.0352","EUR":"0.0299","BTC":"0.00000329","LTC":"0.00076883","ETH":"0.0001002","DASH":"0.00051903","BCH":"0.00015984","XRP":"0.1414","TEL":"164.28","NANO":"0.046341","DAI":"0.034831","USDT":"0.035197","AVA":"0.062942"},"BGN":{"USD":"0.6","EUR":"0.51","BTC":"0.00005621","LTC":"0.013154","ETH":"0.001714","DASH":"0.00888","BCH":"0.002735","XRP":"2.4188","TEL":"2811.0","NANO":"0.7929","DAI":"0.5959","USDT":"0.6022","AVA":"1.0769"},"HRK":{"USD":"0.16","EUR":"0.13","BTC":"0.00001452","LTC":"0.003398","ETH":"0.0004428","DASH":"0.002294","BCH":"0.00070638","XRP":"0.6248","TEL":"725.99","NANO":"0.2048","DAI":"0.1539","USDT":"0.1555","AVA":"0.2782"},"RSD":{"USD":"0.01","EUR":"0.0085","BTC":"0.00000093","LTC":"0.00021873","ETH":"0.00002851","DASH":"0.00014766","BCH":"0.00004547","XRP":"0.040219","TEL":"46.74","NANO":"0.013183","DAI":"0.009909","USDT":"0.010013","AVA":"0.017906"},"LTC":{"USD":"45.78","EUR":"38.89","GBP":"35.3","PLN":"174.67","CZK":"1053.74","SEK":"407.76","NOK":"422.84","DKK":"289.34","CHF":"41.95","ZAR":"759.29","AUD":"63.83","JPY":"4841.66","NZD":"69.04","TRY":"355.52","BRL":"255.91","CAD":"60.82","CNY":"311.02","HKD":"354.95","HUF":"14011.42","INR":"3348.68","RUB":"3581.66","ILS":"156.0","MYR":"190.32","MXN":"982.53","SGD":"62.33","RON":"189.59","IDR":"673498.95","PHP":"2217.54","ARS":"3527.2","THB":"1433.41","NGN":"17564.14","PKR":"7540.9","AED":"168.22","UAH":"1300.67","BGN":"76.02","HRK":"294.32","RSD":"4571.94","BTC":"0.004277","ETH":"0.13038","DASH":"0.685746","BCH":"0.208128","LTC":"1.0","XRP":"183.7199","CLP":"36538.91","TEL":"213850.0","NANO":"60.3244","DAI":"45.2939","USDT":"45.81","AVA":"81.9349"},"ETH":{"USD":"351.75","EUR":"298.41","GBP":"270.87","PLN":"1340.26","CZK":"8085.53","SEK":"3128.8","NOK":"3244.54","DKK":"2220.14","CHF":"321.86","ZAR":"5826.18","AUD":"489.78","JPY":"37150.96","NZD":"529.75","TRY":"2727.96","BRL":"1963.61","CAD":"466.65","CNY":"2386.48","HKD":"2723.59","HUF":"107512.17","INR":"25695.06","RUB":"27482.69","ILS":"1196.99","MYR":"1460.36","MXN":"7539.1","SGD":"478.3","RON":"1454.74","IDR":"5167879.16","PHP":"17015.56","ARS":"27064.88","THB":"10998.83","NGN":"134772.83","PKR":"57862.7","AED":"1290.78","UAH":"9980.31","BGN":"583.33","HRK":"2258.35","RSD":"35081.35","BTC":"0.032809","LTC":"7.669888","DASH":"5.260382","BCH":"1.596557","ETH":"1.0","XRP":"1409.32","CLP":"280369.66","TEL":"1640450.0","NANO":"462.963","DAI":"347.4506","USDT":"351.39","AVA":"628.5249"},"DASH":{"BTC":"0.006237","USD":"67.18","EUR":"57.61","GBP":"52.29","PLN":"258.73","CZK":"1560.88","SEK":"604.0","NOK":"626.35","DKK":"428.59","CHF":"62.13","ZAR":"1124.72","AUD":"94.55","JPY":"7171.86","NZD":"102.27","TRY":"526.62","BRL":"379.07","CAD":"90.08","CNY":"460.7","HKD":"525.78","HUF":"20754.85","INR":"4960.34","RUB":"5305.44","ILS":"231.08","MYR":"281.92","MXN":"1455.4","SGD":"92.33","RON":"280.83","IDR":"997640.88","PHP":"3284.79","ARS":"5224.78","THB":"2123.29","NGN":"26017.42","PKR":"11170.19","AED":"249.18","UAH":"1926.66","BGN":"112.61","HRK":"435.97","RSD":"6772.33","LTC":"1.458265","ETH":"0.1901","BCH":"0.303506","DASH":"1.0","XRP":"267.9124","CLP":"54124.38","TEL":"311850.0","NANO":"87.969","DAI":"66.0505","USDT":"66.8379","AVA":"119.4828"},"BCH":{"BTC":"0.02054985","USD":"219.86","EUR":"187.06","GBP":"169.8","PLN":"840.15","CZK":"5068.46","SEK":"1961.3","NOK":"2033.86","DKK":"1391.71","CHF":"201.76","ZAR":"3652.17","AUD":"307.02","JPY":"23288.29","NZD":"332.08","TRY":"1710.03","BRL":"1230.9","CAD":"292.52","CNY":"1495.98","HKD":"1707.3","HUF":"67394.61","INR":"16107.1","RUB":"17227.68","ILS":"750.34","MYR":"915.44","MXN":"4725.92","SGD":"299.83","RON":"911.91","IDR":"3239514.35","PHP":"10666.3","ARS":"16965.77","THB":"6894.68","NGN":"84483.11","PKR":"36271.56","AED":"809.13","UAH":"6256.21","BGN":"365.66","HRK":"1415.66","RSD":"21990.94","LTC":"4.804735","ETH":"0.626348","DASH":"3.294829","BCH":"1.0","XRP":"882.7255","CLP":"175751.31","TEL":"1027493.0","NANO":"289.8427","DAI":"217.625","USDT":"220.2194","AVA":"393.6753"},"XRP":{"BTC":"0.00002328","USD":"0.2489","EUR":"0.2115","GBP":"0.192","PLN":"0.9499","CZK":"5.73","SEK":"2.22","NOK":"2.3","DKK":"1.57","CHF":"0.2281","ZAR":"4.13","AUD":"0.3471","JPY":"26.33","NZD":"0.3755","TRY":"1.93","BRL":"1.39","CAD":"0.3307","CNY":"1.69","HKD":"1.93","HUF":"76.2","INR":"18.21","RUB":"19.48","ILS":"0.8484","MYR":"1.04","MXN":"5.34","SGD":"0.339","RON":"1.03","IDR":"3662.77","PHP":"12.06","ARS":"19.18","THB":"7.8","NGN":"95.52","PKR":"41.01","AED":"0.9148","UAH":"7.07","BGN":"0.4134","HRK":"1.6","RSD":"24.86","LTC":"0.00544307","ETH":"0.00070956","DASH":"0.00373256","BCH":"0.00113285","XRP":"1.0","CLP":"198.71","TEL":"1164.0","NANO":"0.32835","DAI":"0.246538","USDT":"0.24899","AVA":"0.445977"},"CLP":{"EUR":"0.0011","USD":"0.0013","BTC":"0.00000012","LTC":"0.00002737","ETH":"0.00000357","DASH":"0.00001848","BCH":"0.00000569","XRP":"0.005032","TEL":"5.8478","NANO":"0.00165","DAI":"0.00124","USDT":"0.001253","AVA":"0.002241"},"TEL":{"BTC":"0.00000002","LTC":"0.00000468","ETH":"0.00000061","DASH":"0.00000321","BCH":"0.00000097","XRP":"0.00085911","TEL":"1.0","USD":"0.000214","EUR":"0.000182","GBP":"0.000165","PLN":"0.000817","CZK":"0.004931","SEK":"0.001908","NOK":"0.001979","DKK":"0.001354","CHF":"0.000196","ZAR":"0.003553","AUD":"0.000299","JPY":"0.0227","NZD":"0.000323","TRY":"0.001664","BRL":"0.001198","CAD":"0.000285","CNY":"0.001456","HKD":"0.001661","HUF":"0.0656","INR":"0.0157","RUB":"0.0168","ILS":"0.00073","MYR":"0.000891","MXN":"0.004598","SGD":"0.000292","RON":"0.000887","IDR":"3.15","PHP":"0.0104","ARS":"0.0165","THB":"0.006708","NGN":"0.0822","PKR":"0.0353","AED":"0.000787","UAH":"0.006087","BGN":"0.000356","HRK":"0.001377","RSD":"0.0214","CLP":"0.171","NANO":"0.00028209","DAI":"0.0002118","USDT":"0.00021433","AVA":"0.00038314"},"NANO":{"BTC":"0.0000709","ETH":"0.00216099","LTC":"0.01657704","DASH":"0.01136764","BCH":"0.00345015","XRP":"3.045533","TEL":"3545.0","NANO":"1.0","USD":"0.7599","EUR":"0.6452","GBP":"0.5857","PLN":"2.9","CZK":"17.48","SEK":"6.76","NOK":"7.02","DKK":"4.8","CHF":"0.6959","ZAR":"12.6","AUD":"1.06","JPY":"80.32","NZD":"1.15","TRY":"5.9","BRL":"4.25","CAD":"1.01","CNY":"5.16","HKD":"5.89","HUF":"232.45","INR":"55.56","RUB":"59.42","ILS":"2.59","MYR":"3.16","MXN":"16.3","SGD":"1.03","RON":"3.15","IDR":"11173.94","PHP":"36.79","ARS":"58.52","THB":"23.78","NGN":"291.4","PKR":"125.11","AED":"2.79","UAH":"21.58","BGN":"1.26","HRK":"4.88","RSD":"75.85","CLP":"606.21","DAI":"0.750838","USDT":"0.7567","AVA":"1.358238"},"DAI":{"BTC":"0.00009443","LTC":"0.02207805","ETH":"0.00287811","DASH":"0.01513994","BCH":"0.00459506","XRP":"4.056178","TEL":"4721.39","NANO":"1.331845","DAI":"1.0","USD":"1.01","EUR":"0.8584","GBP":"0.7792","PLN":"3.86","CZK":"23.26","SEK":"9.0","NOK":"9.33","DKK":"6.39","CHF":"0.9259","ZAR":"16.76","AUD":"1.41","JPY":"106.87","NZD":"1.52","TRY":"7.85","BRL":"5.65","CAD":"1.34","CNY":"6.87","HKD":"7.83","HUF":"309.28","INR":"73.92","RUB":"79.06","ILS":"3.44","MYR":"4.2","MXN":"21.69","SGD":"1.38","RON":"4.18","IDR":"14866.33","PHP":"48.95","ARS":"77.86","THB":"31.64","NGN":"387.7","PKR":"166.45","AED":"3.71","UAH":"28.71","BGN":"1.68","HRK":"6.5","RSD":"100.92","CLP":"806.53","USDT":"1.00985","AVA":"1.808962"},"USDT":{"LTC":"0.02182929","ETH":"0.00284584","BCH":"0.00454254","XRP":"4.016226","TEL":"4667.43","NANO":"1.321528","DAI":"0.990246","USDT":"1.0","USD":"1.0","EUR":"0.8495","GBP":"0.7711","PLN":"3.82","CZK":"23.02","SEK":"8.91","NOK":"9.24","DKK":"6.32","CHF":"0.9162","ZAR":"16.59","AUD":"1.39","JPY":"105.76","NZD":"1.51","TRY":"7.77","BRL":"5.59","CAD":"1.33","CNY":"6.79","HKD":"7.75","HUF":"306.05","INR":"73.15","RUB":"78.23","ILS":"3.41","MYR":"4.16","MXN":"21.46","SGD":"1.36","RON":"4.14","IDR":"14711.86","PHP":"48.44","ARS":"77.05","THB":"31.31","NGN":"383.67","PKR":"164.72","AED":"3.67","UAH":"28.41","BGN":"1.66","HRK":"6.43","RSD":"99.87","CLP":"798.15","BTC":"0.00009335","DASH":"0.0149669","AVA":"1.788286"},"AVA":{"AVA":"1.0","BTC":"0.0000522","LTC":"0.01220482","ETH":"0.00159103","DASH":"0.00836941","BCH":"0.00254016","XRP":"2.242268","TEL":"2610.0","NANO":"0.736248","DAI":"0.552803","USDT":"0.559195","USD":"0.5595","EUR":"0.475","GBP":"0.4312","PLN":"2.13","CZK":"12.87","SEK":"4.98","NOK":"5.16","DKK":"3.53","CHF":"0.5124","ZAR":"9.27","AUD":"0.7797","JPY":"59.14","NZD":"0.8433","TRY":"4.34","BRL":"3.13","CAD":"0.7428","CNY":"3.8","HKD":"4.34","HUF":"171.14","INR":"40.9","RUB":"43.75","ILS":"1.91","MYR":"2.32","MXN":"12.0","SGD":"0.7614","RON":"2.32","IDR":"8226.79","PHP":"27.09","ARS":"43.08","THB":"17.51","NGN":"214.55","PKR":"92.11","AED":"2.05","UAH":"15.89","BGN":"0.9286","HRK":"3.6","RSD":"55.85","CLP":"446.32"}};

// import yaml from 'json2yaml'

switch (process.env) {
  default:
    rxdb.addRxPlugin(require('pouchdb-adapter-memory'));
    break;

  case 'production':
    rxdb.addRxPlugin(require('pouchdb-adapter-leveldb'));
    break;
}
/**
 * Taxonomies
 *
 * @enum {number}
 */




(function (Taxonomii) {
  Taxonomii[Taxonomii["Apartament"] = 0] = "Apartament";
  Taxonomii[Taxonomii["Asociatie"] = 1] = "Asociatie";
  Taxonomii[Taxonomii["Bloc"] = 2] = "Bloc";
  Taxonomii[Taxonomii["Cheltuiala"] = 3] = "Cheltuiala";
  Taxonomii[Taxonomii["Contor"] = 4] = "Contor";
  Taxonomii[Taxonomii["Factura"] = 5] = "Factura";
  Taxonomii[Taxonomii["Furnizor"] = 6] = "Furnizor";
  Taxonomii[Taxonomii["Incasare"] = 7] = "Incasare";
  Taxonomii[Taxonomii["Serviciu"] = 8] = "Serviciu";
  Taxonomii[Taxonomii["Utilizator"] = 9] = "Utilizator";
})(exports.Taxonomii || (exports.Taxonomii = {}));

var taxonomies = Object.keys(exports.Taxonomii).filter(function (tax) {
  return typeof exports.Taxonomii[tax] === 'number';
});
/**
 * Forms, includes each for Taxonomies
 *
 * @enum {number}
 */

var Forms;

(function (Forms) {
  Forms[Forms["Feedback"] = 0] = "Feedback";
  Forms[Forms["Financiar"] = 1] = "Financiar";
  Forms[Forms["Preferinte"] = 2] = "Preferinte";
})(Forms || (Forms = {}));
/**
 * Errors definitions

 * @enum {string}
 */




(function (Errors) {
  Errors[Errors["missingDB"] = 0] = "missingDB";
  Errors[Errors["invalidPluginDefinition"] = 1] = "invalidPluginDefinition";
  Errors[Errors["couldNotWriteFile"] = 2] = "couldNotWriteFile";
})(exports.Errors || (exports.Errors = {}));

var plugins = []; // let navigator = (typeof(window) !== undefined && window.navigator ? window.navigator : { language: 'ro-RO' })

var locales$1;
var locale = mobx.observable.box('ro');
var currencies$1 = Object.keys(ratesAtCompileTime);
var displayCurrency = mobx.observable.box(currencies$1[0]);
var currencyRates = mobx.observable.box({
  rates: undefined,
  timestamp: 0
}, {
  deep: false
});
/**
 *
 * @class The main API
 * @implements {LodgerAPI}
 * @requires <rxdb> RxDatabase
 */

var Lodger =
/** @class */
function () {
  /**
   * Creates an instance of Lodger.
   * @memberof Lodger
   */
  function Lodger(taxonomies, plugins) {
    var _this = this;

    if (taxonomies === void 0) {
      taxonomies = taxonomies;
    }

    if (plugins === void 0) {
      plugins = [];
    }

    this.plugins = plugins; // Assign taxonomies to this

    this.taxonomies = taxonomies.map(function (tax) {
      Object.defineProperty(Lodger.prototype, tax.form.plural, {
        value: tax,
        writable: false
      });
      /**
       * Assign taxonomy relations
       * children / parents
       * parents are required for a taxonomy to be added
       * children are just relations
       *
       */

      var parents = [];
      var children = [];
      taxonomies.forEach(function (t) {
        var _a = t.form,
            name = _a.name,
            plural = _a.plural;
        var parentsKeys = [name + "Id", plural].filter(function (key) {
          return tax.form.fieldsIds.indexOf(key) > -1;
        })[0];
        var childrenKeys = t.form.fieldsIds.filter(function (key) {
          return [tax.form.name + "Id", tax.form.plural].indexOf(key) > -1;
        });

        if (parentsKeys) {
          parents.push(parentsKeys.replace('Id', ''));
        }

        if (childrenKeys.length) {
          children.push(t.form.plural);
        }
      });
      if (parents && parents.length > 0) tax.parents = parents;
      if (children && children.length > 0) tax.children = children;
      return tax.form.plural;
    });
    this.taxonomies.map(function (t) {
      if (_this[t]) {
        Object.defineProperty(_this[t], '$lodger', {
          value: _this,
          writable: false
        });
      }
    });
    Lodger.rates = ratesAtCompileTime;
    this.supportedLangs = supportedLangs;
  }

  Object.defineProperty(Lodger.prototype, "i18n", {
    get: function () {
      return locales$1 ? locales$1[locale.get()] : {};
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Lodger, "locale", {
    /** Locales */
    get: function () {
      return locale.get();
    },
    set: function (language) {
      var langCode = language.indexOf('-') > -1 ? language.split('-')[0] : language;
      if (supportedLangs.map(function (lang) {
        return lang.code;
      }).indexOf(langCode) < 0) throw new LodgerError('Language not supported');
      locale.set(langCode);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Lodger, "currencies", {
    /** Currencies */
    get: function () {
      return Object.keys(ratesAtCompileTime[Lodger.displayCurrency]);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Lodger, "displayCurrency", {
    get: function () {
      return displayCurrency.get();
    },
    set: function (index) {
      displayCurrency.set(Lodger.currencies[index]);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Lodger, "rates", {
    get: function () {
      return currencyRates.get();
    },
    set: function (rates) {
      currencyRates.set({
        rates: rates,
        timestamp: parseInt(Date.now() / 1000)
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Lodger.prototype, "rates", {
    get: function () {
      var displayCurrency = Lodger.displayCurrency,
          rates = Lodger.rates.rates;
      return rates[displayCurrency];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Lodger.prototype, "translate", {
    /**
     * Gets the translation for a specific item.
     *
     * @static
     * @param {string} key
     * @returns
     * @memberof Lodger
     */
    get: function () {
      var i18n = this.i18n;
      return function (key) {
        return key.split('.').reduce(function (o, i) {
          return o[i];
        }, i18n);
      };
    },
    enumerable: false,
    configurable: true
  });
  /**
   * @alias Taxonomy.put
   *
   * Inserts/updates a new document in DB
   * updates if data has ._id key
   *
   * @param {Taxonomie} taxonomie
   * @param {Taxonomy<Taxonomie>} data
   * @returns {Promise<RxDocument<Taxonomie>>}
   * @memberof Lodger
   */

  Lodger.prototype.put = function (taxonomie, data) {
    this[taxonomie].put(data);
    var userId;

    try {
      userId = this.utilizatori.subscribers.main.activeId;
      console.log('iu', userId);
    } catch (e) {
      console.warn('no user selected');
    } // this.istoric.push({
    //   userId,
    //   action: data._id ? 'added' : 'updated',
    //   taxonomie
    // })

  };
  /**
   * Subscribes to multiple taxonomies with
   * same criteria
   *
   * @memberof Lodger
   * @returns {void}
   *
   */


  Lodger.prototype.subscribe = function (taxonomii, criteriuCerut, subscriberName) {
    var _this = this;

    if (subscriberName === void 0) {
      subscriberName = 'main';
    }

    Object.keys(taxonomii).forEach(function (taxonomie) {
      _this.taxonomies[taxonomie].subscribe(subscriberName, criteriuCerut);
    });
  };
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


  Lodger.build = function (options) {
    if (options === void 0) {
      options = __assign({}, config.build);
    }

    return __awaiter(this, void 0, void 0, function () {
      var _a, taxesSchemas, Taxonomies;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = STaxonomy;
            return [4
            /*yield*/
            , rxdb.createRxDatabase(options.db)];

          case 1:
            _a.db = _b.sent();
            return [4
            /*yield*/
            , load$1(supportedLangs.map(function (l) {
              return l.code;
            }))];

          case 2:
            locales$1 = _b.sent();
            return [4
            /*yield*/
            , load(taxonomies)];

          case 3:
            taxesSchemas = _b.sent();
            return [4
            /*yield*/
            , Promise.all(taxesSchemas.map(function (schema) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      return [4
                      /*yield*/
                      , STaxonomy.init(schema)];

                    case 1:
                      return [2
                      /*return*/
                      , _a.sent()];
                  }
                });
              });
            }))];

          case 4:
            Taxonomies = _b.sent();
            return [2
            /*return*/
            , new Lodger(Taxonomies, plugins)];
        }
      });
    });
  };
  /**
   * Extend Lodger :)
   * Todo!
   *
   * @param {LodgerPlugin} plugin
   *
   */


  Lodger.use = function (plugin) {
    if (!plugin || typeof plugin !== 'object') {
      throw new LodgerError(exports.Errors.invalidPluginDefinition);
    }

    var name = plugin.name;
    plugins.push(plugin);
  };

  Lodger.prototype.search = function (input, taxonomy) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {

        return [2
        /*return*/
        , results];
      });
    });
  };
  /**
   * Destroys the Lodger instance
   *
   */


  Lodger.prototype.destroy = function () {
    return __awaiter(this, void 0, void 0, function () {
      var e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]); // await this.unsubscribeAll()


            return [4
            /*yield*/
            , STaxonomy.destroy()];

          case 1:
            // await this.unsubscribeAll()
            _a.sent();

            return [3
            /*break*/
            , 3];

          case 2:
            e_1 = _a.sent();
            console.error('Lodger could not be destroyed. Reason: ', e_1);
            return [3
            /*break*/
            , 3];

          case 3:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Exports the DB
   * as a YML file with ext .ldb
   * date is captured
   *
   */


  Lodger.prototype.export = function (path, cryptedData, filename) {
    return __awaiter(this, void 0, void 0, function () {
      var json;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.db.dump()];

          case 1:
            json = _a.sent();
            if (!path) path = require('os').homeDir + "/downloads/";

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * TODO!!
   */


  Lodger.prototype.import = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2
        /*return*/
        ];
      });
    });
  };

  __decorate([mobx.computed], Lodger.prototype, "i18n", null);

  __decorate([mobx.computed], Lodger.prototype, "rates", null);

  __decorate([mobx.computed], Lodger.prototype, "translate", null);

  return Lodger;
}();

var fieldsets = ['descriere', 'localizare', 'registru'];
var selectedApGetter = 'apartament/activeDoc';
var fields = {
  nr: {
    type: 'number',
    default: function (g) {//TODO: numerotare pentru hoteluri, 101 et 1, 201 et 2
      // const { apartamente } = g['bloc/activeDoc']
      // if (!apartamente || !apartamente.length) return 1
      // // TODO: asta e pt hoteluri, daca toate ap de pe etaj la scara
      // const sortate = apartamente
      //   .map(ap => g.apartamente[ap].nr)
      //   .sort((a, b) => Number(a) - Number(b))
      //   .reverse()
      // return sortate[0] + 1
    },
    value: function (g) {
      return g[selectedApGetter].nr;
    },
    required: true,
    index: true,
    preview: 0
  },
  proprietar: {
    type: 'fullName',
    placeholder: 'Ion Barbu',
    oninput: {
      transform: 'capitalize'
    },
    preview: 1,
    v: 'alpha_spaces|max:32',
    value: function (g) {
      return g[selectedApGetter].proprietar;
    }
  },
  suprafata: {
    fieldset: 0,
    type: 'number',
    default: null,
    step: 0.01,
    value: function (g) {
      return g[selectedApGetter].suprafata;
    }
  },
  locatari: {
    fieldset: 0,
    index: true,
    type: 'number',
    default: 2,
    min: 0,
    max: 10,
    value: function (g) {
      return g[selectedApGetter].locatari;
    }
  },
  camere: {
    fieldset: 0,
    type: 'number',
    index: true,
    default: 2,
    max: 12,
    min: 1,
    value: function (g) {
      return g[selectedApGetter].camere;
    }
  },
  etaj: {
    fieldset: 1,
    type: 'number',
    required: true,
    // default: g => g['etaj/selectat'].etaj,
    value: function (g) {
      return g[selectedApGetter].etaj;
    }
  },
  blocId: {
    required: true,
    fieldset: 1,
    // default: g => g['etaj/selectat'].bloc,
    value: function (g) {
      return g[selectedApGetter].bloc;
    }
  },
  asociatieId: {
    required: true,
    fieldset: 1,
    // default: g => g['asociatie/activeDoc']._id,
    value: function (g) {
      return g['asociatie/activeDoc']._id;
    }
  },
  scara: {
    fieldset: 1,
    type: 'number',
    required: true,
    // default: g => g['etaj/selectat'].scara,
    value: function (g) {
      return g[selectedApGetter].scara;
    }
  },
  balanta: {
    type: '$',
    default: null,
    required: true,
    preview: 2,
    index: true,
    value: function (g) {
      return g[selectedApGetter].balanta;
    }
  },
  contoare: {
    type: 'contoare',
    value: function (g) {
      return g[selectedApGetter].contoare;
    }
  },
  incasari: {
    type: 'array',
    ref: 'incasari',
    fieldset: 2
  },
  cheltuieli: {
    type: 'array',
    ref: 'cheltuieli',
    fieldset: 2
  }
};
var methods = {
  incaseaza: function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var incasari;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.balanta) this.balanta = 0;
            incasari = this.incasari || [];
            this.balanta += data.suma;
            incasari.push(data._id);
            this.incasari = incasari;
            return [4
            /*yield*/
            , this.save()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  }
};

var Apartament = /*#__PURE__*/Object.freeze({
    __proto__: null,
    methods: methods,
    fields: fields,
    fieldsets: fieldsets
});

var fields$1 = {
  name: {
    required: true,
    focus: true,
    index: true,
    preview: 0,
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.name;
    },
    v: 'max:32|min:3',
    oninput: {
      transform: 'capitalize'
    }
  },
  organizatie: {
    type: 'object',
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.organizatie;
    } // v: 'ro=cif|en=ssn', //TODO: stringu e doar de demo -> implement cif validation

  },
  balanta: {
    type: 'number',
    preview: 1,
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.balanta;
    }
  },
  // incasari: {
  //   type: 'array',
  //   ref: 'incasare',
  //   value: ({ activeDoc }) => activeDoc.incasari
  // },
  utilizatori: {
    type: 'array',
    ref: 'utilizator',
    required: true,
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.utilizatori;
    }
  },
  servicii: {
    type: 'array',
    ref: 'serviciu',
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.servicii;
    }
  },
  // furnizori: {
  //   type: 'array',
  //   ref: 'furnizor',
  //   value: ({ activeDoc }) => activeDoc.furnizori
  // },
  preferinte: {
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.preferinte;
    },
    type: 'object'
  }
};
var methods$1 = {
  initBalanta: function (data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.balanta !== undefined) return [2
            /*return*/
            ];
            this.balanta = data.balanta;
            return [4
            /*yield*/
            , this.save()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  },
  incaseaza: function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var incasari;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.balanta) this.balanta = 0;
            incasari = this.incasari || [];
            this.balanta += data.suma;
            incasari.push(data._id);
            this.incasari = incasari;
            return [4
            /*yield*/
            , this.save()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  },
  toggle_serviciu: function (serviciu) {
    return __awaiter(this, void 0, void 0, function () {
      var servicii, index;
      return __generator(this, function (_a) {
        if (!serviciu) return [2
        /*return*/
        ];
        servicii = this.servicii;
        if (!servicii) servicii = [];
        index = servicii.indexOf(serviciu);

        if (index > -1) {
          servicii.splice(index, 1);
        } else {
          servicii.push(serviciu);
        } // this.update('servicii', servicii)


        this.update({
          $set: {
            servicii: servicii
          }
        });
        return [2
        /*return*/
        ];
      });
    });
  },
  UPDATEAZA: function (fields) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            // TODO: nu permite updatarea anumitor chei
            Object.keys(fields).forEach(function (camp) {
              _this[camp] = fields[camp];
            });
            return [4
            /*yield*/
            , this.save()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  }
};
var statics = {
  selected: function (id) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.findOne(id).exec()];

          case 1:
            // console.log('STATIC!', this)
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  }
}; // DRY: la buatoane, daca au 'click', n-au nevoie de id

var setari = {
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

var Asociatie = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$1,
    methods: methods$1,
    statics: statics,
    setari: setari
});

var fields$2 = {
  name: {
    placeholder: 'ex. M11, COCOR-2, A3...',
    oninput: {
      transform: 'uppercase:all'
    },
    type: 'buildingName',
    required: true,
    preview: 0,
    index: true,
    v: 'min:1|max:20',
    focus: true,
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.name;
    }
  },
  scari: {
    type: 'scari',
    preview: 1,
    default: [{
      id: 1,
      etaje: 4,
      lift: false,
      mansarda: false
    }],
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.scari;
    }
  },
  adresa: {
    type: 'textarea',
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.adresa;
    }
  },
  asociatieId: {
    required: true,
    ref: 'asociatie',
    value: function (_a) {
      var g = _a.g;
      return g.asociatieId;
    }
  }
};
/**
 * It's assumed the item has an _id
 */
// Building
//   @parents Taxonomies.Organization (generated for UX purposes)
//   _id
//     value // this means it has a value, it's stored in the store and so it will get it from there
//   !name : string // ! = indexable
//     placeholder 'ex. M11, COCOR-2, A3...'
//     validate 'min:1|max:20'
//     focus true // boolean or function
//     value ({ activeDoc }) => activeDoc.name
//     oninput
//       transform 'uppercase:all'
//   address ?: Textarea
//     validate 'min:20'
//   scari ?: Scara[] // this won't be indexed,  cant search for it

var Bloc = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$2
});

var fields$3 = {
  asociatieId: {
    ref: 'asociatii',
    required: true,
    index: true
  },
  dataScadenta: {
    type: 'dateTime',
    preview: 0
  },
  catre: {
    type: 'string',
    ref: 'furnizori'
  },
  facturi: {
    type: 'search',
    ref: 'facturi'
  },
  suma: {
    type: '$',
    required: true,
    index: true,
    preview: 1
  },
  distribuire: {
    type: 'distribuire'
  },
  apartamenteEligibile: {
    type: 'selApartamente',
    options: function (_a) {
      var getters = _a.getters;
      return getters['asociatie/apartamente'];
    }
  }
};

var Cheltuiala = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$3
});

var fields$4 = {
  tip: {}
};

var Contor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$4
});

var fields$5 = {
  suma: {
    type: '$',
    preview: 0,
    index: true,
    required: true
  },
  nrFactura: {
    type: 'number',
    default: 1,
    index: true,
    value: function (g) {
      return Number(g.nrUltimaChitanta || 0) + 1;
    }
  },
  dataScadenta: {
    type: 'date',
    preview: 1
  },
  furnizorId: {
    required: true,
    type: 'search',
    ref: 'furnizori'
  },
  asociatieId: {
    required: true,
    index: true,
    value: function (g) {
      return g['asociatie/active'] || g['asociatie/selected'];
    }
  }
};

var Factura = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$5
});

var fields$6 = {
  subiect: {
    required: true
  },
  tip: {
    type: 'select',
    options: ['bug', 'enhacement', 'feature', 'other'],
    default: 'bug',
    required: true
  },
  mesaj: {
    required: true,
    type: 'textarea',
    placeholder: 'Părerea / Sugestia / Critica ta'
  }
};

var Feedback = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$6
});

var fields$7 = {
  name: {
    required: true,
    preview: 0,
    index: true
  },
  servicii: {
    type: 'servicii',
    required: true,
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.servicii;
    },
    ref: 'serviciu'
  },
  organizatie: {
    type: 'organizatie'
  }
};

var Furnizor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$7
});

var fields$8 = {
  suma: {
    type: '$',
    preview: 1,
    index: true,
    required: true
  },
  nrChitanta: {
    type: 'number',
    default: 1,
    preview: 0,
    index: true,
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return (activeDoc.nrUltimaChitanta || 0) + 1;
    }
  },
  //aka DE LA
  apartamentId: {
    required: true,
    type: 'search',
    ref: 'apartamente',
    preview: 2
  },
  // ASTEA TREBUIE SA RAMANA IN CAZ CA UN APARTAMENT SE STERGE
  // TREBUIE SA FIGUREZE
  /// !!!!!!!!!!!!!!!!
  blocId: {
    required: true,
    index: true,
    value: function (g) {
      return g['bloc/selected'].id;
    }
  },
  asociatieId: {
    required: true,
    index: true,
    value: function (g) {
      return g['asociatie/selected'].id;
    }
  }
};

var Incasare = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$8
});

var fields$9 = {
  /**
   * desi globale, serviciile sunt pt asociatii.
   * excludem asta din db, pastram pt referinta
   */
  // asociatieId: {
  //   ref: 'asociatie'
  // },
  denumire: {
    required: true,
    preview: 0,
    primary: true,
    index: true
  }
};
var predefinite = ['apa', 'electricitate', 'gaze', 'termoficare', 'internet', 'evacuare-gunoi-menajer'];
var hooks = {
  // serviciile predifinite pe empty
  empty: function () {
    var _this = this;

    predefinite.map(function (service) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , this.put({
                denumire: service
              })];

            case 1:
              _a.sent();

              return [2
              /*return*/
              ];
          }
        });
      });
    });
  }
};

var Serviciu = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$9,
    predefinite: predefinite,
    hooks: hooks
});

var Tranzactie = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var fields$a = {
  avatar: {
    type: 'userAvatar',
    preview: 0
  },
  name: {
    type: 'fullName',
    required: true,
    primary: true,
    preview: 1,
    oninput: {
      transform: 'capitalize:all'
    },
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.name;
    }
  },
  contact: {
    type: 'contactFields',
    value: function (_a) {
      var activeDoc = _a.activeDoc;
      return activeDoc.contact;
    }
  },
  preferinte: {
    type: 'object',
    default: {
      locale: function () {
        return 'ro-RO';
      }
    }
  }
};
var methods$2 = {
  UPDATEAZA: function (campuri) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            // TODO: nu permite updatarea anumitor chei
            Object.keys(campuri).forEach(function (camp) {
              _this[camp] = campuri[camp];
            });
            return [4
            /*yield*/
            , this.save()];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  }
};
var hooks$1 = {
  onFirstTimeSubscribe: function (_a) {
    var put = _a.put,
        dispatch = _a.dispatch;
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4
            /*yield*/
            , put({
              name: 'Administrator',
              rol: 'admin'
            })];

          case 1:
            _b.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  }
};
var settings = {
  locale: {
    type: 'langSelect'
  },
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

var Utilizator = /*#__PURE__*/Object.freeze({
    __proto__: null,
    fields: fields$a,
    hooks: hooks$1,
    methods: methods$2,
    settings: settings
});

var en = {
  "next": "Continue",
  "back": "Back",
  "backTo": "Back to",
  "search": "Search",
  "add": "Add",
  "trash": "Delete",
  "edit": "Edit",
  "nav": {
    "statistici": "Statistics",
    "liste": "Lists Payment",
    "istoric": "history",
    "comunitate": "Community",
    "docs": "Documentation",
    "support": "Technical assistance"
  },
  "disclaimers": {
    "money": "The exchange rate is only for informational purposes",
    "beta": "The application is in beta and may have side effects"
  },
  "taxonomies": {
    "apartamente": {
      "name": "Apartment",
      "plural": "Apartments",
      "fieldsets": {
        "descriere": "Description",
        "localizare": "Location",
        "registru": "register"
      },
      "fields": {
        "nr": "No.",
        "suprafata": "Size",
        "locatari": "Tenants",
        "balanta": "balance",
        "proprietar": "Owner",
        "camere": "Rooms",
        "etaj": "Floor",
        "scara": "scale",
        "contoare": "Counters",
        "incasari": "Proceeds",
        "cheltuieli": "expenses",
        "blocId": "Building / Block",
        "asociatieId": "Association"
      }
    },
    "asociatii": {
      "name": "Association",
      "plural": "Associations",
      "fields": {
        "name": "Name",
        "organizatie": "Organization",
        "balanta": "balance",
        "utilizatori": "Users",
        "preferinte": "Preferences",
        "servicii": "Services"
      }
    },
    "blocuri": {
      "name": "Building",
      "plural": "Buildings",
      "fields": {
        "name": "ID",
        "scari": "stairs",
        "adresa": "Address",
        "asociatieId": "Company"
      }
    },
    "cheltuieli": {
      "name": "expense",
      "plural": "expenses",
      "fields": {
        "catre": "to",
        "suma": "amount",
        "facturi": "Invoices",
        "dataScadenta": "maturity",
        "distribuire": "distribution",
        "apartamenteEligibile": "Apartments Eligible",
        "asociatieId": "Association"
      }
    },
    "contoare": {
      "name": "counter",
      "plural": "Counters",
      "fields": {
        "tip": "Type / Name",
        "serviciuId": "Service"
      }
    },
    "facturi": {
      "name": "Billing",
      "plural": "Invoices",
      "fields": {
        "suma": "amount",
        "nrFactura": "No.",
        "dataScadenta": "maturity",
        "furnizorId": "Provider",
        "asociatieId": "Company"
      }
    },
    "furnizori": {
      "name": "Supplier",
      "plural": "Suppliers",
      "fields": {
        "name": "Name",
        "organizatie": "Organization"
      }
    },
    "incasari": {
      "name": "Cash",
      "plural": "Proceeds",
      "fields": {
        "suma": "amount",
        "nrChitanta": "No."
      }
    },
    "scari": {
      "name": "scale",
      "plural": "stairs",
      "fields": {
        "lift": "elevator",
        "mansarda": "Attic",
        "name": "No. / Name",
        "etaje": "Floors"
      }
    },
    "servicii": {
      "name": "Service",
      "plural": "Services",
      "predefinite": {
        "apa": "Water",
        "electricitate": "Electricity",
        "gaze": "Gas",
        "termoficare": "Heating",
        "internet": "Internet",
        "evacuare-gunoi-menajer": "Exhaust garbage"
      },
      "fields": {
        "denumire": "Name"
      }
    },
    "utilizatori": {
      "name": "Username",
      "plural": "Users",
      "new": {
        "title": "Let's get acquainted!"
      },
      "fields": {
        "name": "Full Name",
        "avatar": "Avatar",
        "contact": "Contact details",
        "tel": "Phone number",
        "email": "Address e-mail",
        "social": "Social Media",
        "preferinte": "Preferences",
        "langSwitch": "Change language"
      }
    }
  },
  "welcome": {
    "title": "Welcome!",
    "intro": "Thank you for choosing to Lodger try!"
  },
  "errors": {
    "index": {
      "missingDB": "database unspecified invalid",
      "invalidPluginDefinition": "",
      "couldNotWriteFile": "Plugin file %% is not writable"
    }
  }
};

var en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': en
});

var es = {
  "next": "Continuar",
  "back": "Volver",
  "backTo": "Volver a",
  "search": "Buscar",
  "add": "Agregar",
  "trash": "Eliminar",
  "edit": "Editar",
  "nav": {
    "statistici": "Estadísticas",
    "liste": "Listas de Pago",
    "istoric": "historia",
    "comunitate": "Comunidad",
    "docs": "Documentación",
    "support": "Asistencia técnica"
  },
  "disclaimers": {
    "money": "El tipo de cambio es sólo para fines informativos",
    "beta": "La aplicación está en fase beta y puede tener efectos secundarios"
  },
  "taxonomies": {
    "apartamente": {
      "name": "Apartamento",
      "plural": "Apartamentos",
      "fieldsets": {
        "descriere": "Descripción",
        "localizare": "Ubicación",
        "registru": "Registro"
      },
      "fields": {
        "nr": "N",
        "suprafata": "Tamaño",
        "locatari": "",
        "balanta": "saldo inquilinos",
        "proprietar": "propietario",
        "camere": "Salas",
        "etaj": "Planta",
        "scara": "",
        "contoare": "Contadores escala",
        "incasari": "",
        "cheltuieli": "Las ganancias los gastos",
        "blocId": "Bloque de construcción",
        "asociatieId": ""
      }
    },
    "asociatii": {
      "name": "Asociación",
      "plural": "Asociaciones",
      "fields": {
        "name": "Nombre",
        "organizatie": "Organización /",
        "balanta": "Nivel",
        "utilizatori": "",
        "preferinte": "Usuarios preferencias",
        "servicii": ""
      }
    },
    "blocuri": {
      "name": "Servicios de construcción de edificios",
      "plural": "",
      "fields": {
        "name": "ID",
        "scari": "escaleras",
        "adresa": "Dirección",
        "asociatieId": "Empresa"
      }
    },
    "cheltuieli": {
      "name": "",
      "plural": "gastos de gastos",
      "fields": {
        "catre": "",
        "suma": "a",
        "facturi": "Facturas",
        "dataScadenta": "cantidad madurez",
        "distribuire": "",
        "apartamenteEligibile": "Apartamentos distribución elegible",
        "asociatieId": "Asociación"
      }
    },
    "contoare": {
      "name": "",
      "plural": "contador contadores",
      "fields": {
        "tip": "Tipo / Nombre",
        "serviciuId": "Servicio de facturación"
      }
    },
    "facturi": {
      "name": "",
      "plural": "Facturas",
      "fields": {
        "suma": "cantidad",
        "nrFactura": "",
        "dataScadenta": "Nº de madurez",
        "furnizorId": "Proveedor",
        "asociatieId": "Empresa"
      }
    },
    "furnizori": {
      "name": "Proveedor",
      "plural": "Proveedores",
      "fields": {
        "name": "Nombre",
        "organizatie": "Organización"
      }
    },
    "incasari": {
      "name": "efectivo",
      "plural": "ingresos",
      "fields": {
        "suma": "cantidad",
        "nrChitanta": ""
      }
    },
    "scari": {
      "name": "Nº escala escaleras",
      "plural": "",
      "fields": {
        "lift": "ascensor",
        "mansarda": "",
        "name": "Nº ático / Nombre",
        "etaje": "Pisos"
      }
    },
    "servicii": {
      "name": "Servicio",
      "plural": "Servicios",
      "predefinite": {
        "apa": "Agua",
        "electricitate": "Electricidad",
        "gaze": "Gas",
        "termoficare": "Calefacción",
        "internet": "Internet",
        "evacuare-gunoi-menajer": "basura de escape"
      },
      "fields": {
        "denumire": "Nombre"
      }
    },
    "utilizatori": {
      "name": "Nombre de usuario",
      "plural": "Los usuarios",
      "new": {
        "title": "Obtener Vamos conoce!"
      },
      "fields": {
        "name": "Detalles Nombre Completo",
        "avatar": "Avatar",
        "contact": "Contacto",
        "tel": "Teléfono",
        "email": "Dirección e-mail",
        "social": "Social Media",
        "preferinte": "Preferencias",
        "langSwitch": ""
      }
    }
  },
  "welcome": {
    "title": "Cambiar el idioma Bienvenido!",
    "intro": "Gracias por elegir a Lodger intento!"
  },
  "errors": {
    "index": {
      "missingDB": "base de datos no válido no especificado",
      "invalidPluginDefinition": "",
      "couldNotWriteFile": "%% archivo plugin no se puede escribir"
    }
  }
};

var es$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': es
});

var fr = {
  "next": "Continuer",
  "back": "Retour",
  "backTo": "Retour",
  "search": "Rechercher",
  "add": "",
  "trash": "Supprimer",
  "edit": "Modifier",
  "nav": {
    "statistici": "Statistiques",
    "liste": "Listes Paiement",
    "istoric": "Historique",
    "comunitate": "Communauté",
    "docs": "Documentation",
    "support": "Assistance technique"
  },
  "disclaimers": {
    "money": "Le taux de change est uniquement à des fins d'information",
    "beta": "L'application est en version bêta et peut avoir des effets secondaires"
  },
  "taxonomies": {
    "apartamente": {
      "name": "Appartement",
      "plural": "Apartments",
      "fieldsets": {
        "descriere": "description",
        "localizare": "Emplacement",
        "registru": "Inscrivez-vous"
      },
      "fields": {
        "nr": "Non",
        "suprafata": "Taille",
        "locatari": "Les locataires",
        "balanta": "solde",
        "proprietar": "Propriétaire",
        "camere": "",
        "etaj": "Chambres",
        "scara": "étage",
        "contoare": "Compteurs échelle",
        "incasari": "produits",
        "cheltuieli": "frais",
        "blocId": "construction / Bloc",
        "asociatieId": "Association"
      }
    },
    "asociatii": {
      "name": "Association",
      "plural": "associations",
      "fields": {
        "name": "Nom",
        "organizatie": "Organisation",
        "balanta": "",
        "utilizatori": "solde utilisateurs",
        "preferinte": "préférences",
        "servicii": "services"
      }
    },
    "blocuri": {
      "name": "",
      "plural": "bâtiments bâtiment",
      "fields": {
        "name": "ID",
        "scari": "escaliers",
        "adresa": "Adresse",
        "asociatieId": "Société"
      }
    },
    "cheltuieli": {
      "name": "frais",
      "plural": "frais",
      "fields": {
        "catre": "",
        "suma": "",
        "facturi": "à montant des factures",
        "dataScadenta": "échéance",
        "distribuire": "distribution",
        "apartamenteEligibile": "Appartements Association admissible",
        "asociatieId": ""
      }
    },
    "contoare": {
      "name": "",
      "plural": "compteur",
      "fields": {
        "tip": "Compteurs type / Nom",
        "serviciuId": "service"
      }
    },
    "facturi": {
      "name": "facturation",
      "plural": "Les factures",
      "fields": {
        "suma": "montant",
        "nrFactura": "Non",
        "dataScadenta": "",
        "furnizorId": "maturité fournisseur",
        "asociatieId": "Société"
      }
    },
    "furnizori": {
      "name": "Fournisseur",
      "plural": "Fournisseurs",
      "fields": {
        "name": "Nom",
        "organizatie": "Organisation"
      }
    },
    "incasari": {
      "name": "espèces",
      "plural": "Produit",
      "fields": {
        "suma": "montant",
        "nrChitanta": "Non"
      }
    },
    "scari": {
      "name": "",
      "plural": "échelle des escaliers",
      "fields": {
        "lift": "ascenseur",
        "mansarda": "Grenier",
        "name": "Non / Nom",
        "etaje": ""
      }
    },
    "servicii": {
      "name": "étages",
      "plural": "Services",
      "predefinite": {
        "apa": "Eau",
        "electricitate": "Electricité",
        "gaze": "Gaz",
        "termoficare": "Chauffage",
        "internet": "Internet",
        "evacuare-gunoi-menajer": "ordures"
      },
      "fields": {
        "denumire": "Nom"
      }
    },
    "utilizatori": {
      "name": "Exhaust Nom d'utilisateur",
      "plural": "Les utilisateurs",
      "new": {
        "title": "Let de connaissance!"
      },
      "fields": {
        "name": "Nom complet",
        "avatar": "Avatar",
        "contact": "Coordonnées",
        "tel": "Numéro de téléphone",
        "email": "Adresse e-mail",
        "social": "médias sociaux",
        "preferinte": "Préférences",
        "langSwitch": "Changer de langue"
      }
    }
  },
  "welcome": {
    "title": "Bienvenue!",
    "intro": "Merci d'avoir choisi d'essayer Lodger!"
  },
  "errors": {
    "index": {
      "missingDB": "base de données non valide non spécifiée",
      "invalidPluginDefinition": "",
      "couldNotWriteFile": "fichier Plugin %% n'est pas accessible en écriture"
    }
  }
};

var fr$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': fr
});

const asociatieId = 'Asociație';
const dataScadenta = 'Scadentă la';
const organizatie = 'Organizație';
const furnizorId = 'Furnizor';
var ro = {
  next: 'Continuă',
  back: 'Înapoi',
  backTo: 'Înapoi la',
  search: 'Caută',
  add: 'Adaugă',
  trash: 'Șterge',
  edit: 'Modifică',
  nav: {
    statistici: 'Statistici',
    liste: 'Liste de plată',
    istoric: 'Istoric',
    comunitate: 'Comunitate',
    docs: 'Documentație',
    support: 'Asistență tehnică'
  },
  disclaimers: {
    money: 'Cursul valutar este doar pentru scop informațional',
    beta: 'Aplicația este în versiunea beta și poate prezenta reacții adverse'
  },
  // forms: {
  //   langSwitch: {
  //     fields: {
  //       selector: 'Schimbă limba'
  //     }
  //   }
  // },
  taxonomies: {
    apartamente: {
      name: 'Apartament',
      plural: 'Apartamente',
      fieldsets: {
        descriere: 'Descriere',
        localizare: 'Localizare',
        registru: 'Registru'
      },
      fields: {
        nr: 'Nr.',
        suprafata: 'Suprafață',
        locatari: 'Locatari',
        balanta: 'Balanță',
        proprietar: 'Proprietar',
        camere: 'Camere',
        etaj: 'Etaj',
        scara: 'Scara',
        contoare: 'Contoare',
        incasari: 'Încasări',
        cheltuieli: 'Cheltuieli',
        blocId: 'Clădire / Bloc',
        asociatieId
      }
    },
    asociatii: {
      name: 'Asociație',
      plural: 'Asociații',
      fields: {
        name: 'Denumire',
        organizatie,
        balanta: 'Balanță',
        utilizatori: 'Utilizatori',
        preferinte: 'Preferințe',
        servicii: 'Servicii oferite'
      }
    },
    blocuri: {
      name: 'Clădire',
      plural: 'Clădiri',
      fields: {
        name: 'Identificator',
        scari: 'Scări',
        adresa: 'Adresă',
        asociatieId
      }
    },
    cheltuieli: {
      name: 'Cheltuială',
      plural: 'Cheltuieli',
      fields: {
        catre: 'Către',
        suma: 'Suma',
        facturi: 'Facturi',
        dataScadenta,
        distribuire: 'Distribuire',
        apartamenteEligibile: 'Apartamente Eligibile',
        asociatieId
      }
    },
    contoare: {
      name: 'Contor',
      plural: 'Contoare',
      fields: {
        tip: 'Tip / Denumire',
        serviciuId: 'Serviciu'
      }
    },
    facturi: {
      name: 'Factură',
      plural: 'Facturi',
      fields: {
        suma: 'Suma',
        nrFactura: 'Nr.',
        dataScadenta,
        furnizorId,
        asociatieId
      }
    },
    furnizori: {
      name: 'Furnizor',
      plural: 'Furnizori',
      fields: {
        name: 'Nume',
        organizatie
      }
    },
    incasari: {
      name: 'Încasare',
      plural: 'Încasări',
      fields: {
        suma: 'Suma',
        nrChitanta: 'Nr.'
      }
    },
    scari: {
      name: 'Scară',
      plural: 'Scări',
      fields: {
        lift: 'Ascensor',
        mansarda: 'Mansardă',
        name: 'Nr. / Denumire',
        etaje: 'Etaje'
      }
    },
    servicii: {
      name: 'Serviciu',
      plural: 'Servicii',
      predefinite: {
        apa: 'Apă',
        electricitate: 'Electricitate',
        gaze: 'Gaze naturale',
        termoficare: 'Termoficare',
        internet: 'Internet',
        'evacuare-gunoi-menajer': 'Evacuare gunoi menajer'
      },
      fields: {
        denumire: 'Denumire'
      }
    },
    utilizatori: {
      name: 'Utilizator',
      plural: 'Utilizatori',
      new: {
        title: 'Hai să facem cunoștință!'
      },
      fields: {
        name: 'Nume complet',
        avatar: 'Avatar',
        contact: 'Detalii de contact',
        tel: 'Număr de telefon',
        email: 'Adresă e-mail',
        social: 'Social Media',
        preferinte: 'Preferințe',
        langSwitch: 'Schimbă limba'
      }
    }
  },
  welcome: {
    title: 'Bun venit!',
    intro: 'Îți mulțumim că ai ales să încerci Lodger!'
  },
  errors: {
    index: {
      missingDB: 'Bază de date nespecificată',
      invalidPluginDefinition: 'Plugin invalid',
      couldNotWriteFile: 'Fișierul %% nu poate fi scris'
    }
  }
};

var ro$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ro
});

exports.Lodger = Lodger;
exports.notify = notify;
exports.taxonomies = taxonomies;
