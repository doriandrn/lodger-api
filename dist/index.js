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
  furnizor: 'furnizori',
  incasare: 'incasari',
  serviciu: 'servicii',
  tranzactie: 'tranzactii',
  utilizator: 'utilizatori'
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
      return plurals[this] || String(this);
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
      var _a, hooks, subscribers, sub, allTaxes, doForTaxes;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this, hooks = _a.hooks, subscribers = _a.subscribers;
            if (subscribers[subscriberName]) return [2
            /*return*/
            ];
            sub = this.subscribers[subscriberName] = new Subscriber__default['default'](this.collection, options);

            if (this.parents && this.parents.length && !sub.refsIds) {
              sub.refsIds = mobx.observable({});
            }

            allTaxes = [];

            doForTaxes = function (taxes, id, name) {
              return __awaiter(_this, void 0, void 0, function () {
                var _this = this;

                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (!taxes || !taxes.length) return [2
                      /*return*/
                      ];
                      if (!allTaxes.length) allTaxes = __spreadArrays(this.$lodger.taxonomies);
                      return [4
                      /*yield*/
                      , Promise.all(taxes.map(function (tax) {
                        return __awaiter(_this, void 0, void 0, function () {
                          var $tax, subscribers, parents, children, taxSub, sOrP, op, val, isSingular;

                          var _a, _b;

                          return __generator(this, function (_c) {
                            switch (_c.label) {
                              case 0:
                                $tax = this.$lodger[tax] || this.$lodger[tax.plural];
                                if (!$tax) return [2
                                /*return*/
                                ];

                                if (allTaxes && allTaxes.length && allTaxes.indexOf(tax.plural) > -1) {
                                  allTaxes.splice(allTaxes.indexOf(tax.plural), 1);
                                } else {
                                  return [2
                                  /*return*/
                                  ];
                                }

                                subscribers = $tax.subscribers, parents = $tax.parents, children = $tax.children;
                                taxSub = subscribers[subscriberName];

                                if (!taxSub) {
                                  console.error('invalid sub requested', tax);
                                  return [2
                                  /*return*/
                                  ];
                                }

                                if (taxSub.refsIds) {
                                  if (parents && parents.length && (parents.indexOf(name) > -1 || parents.indexOf(name.plural) > -1)) {
                                    isSingular = parents.indexOf(name) > -1;
                                    sOrP = isSingular ? name + "Id" : this.form.plural;
                                    op = isSingular ? '$eq' : '$in';
                                    val = isSingular ? id : [id];
                                    taxSub.refsIds[sOrP] = val;
                                  }
                                }

                                if (sOrP && op && val) {
                                  taxSub.criteria.filter = (_a = {}, _a[sOrP] = (_b = {}, _b[op] = val, _b), _a);
                                } else {
                                  if (taxSub.criteria.filter) {
                                    try {
                                      delete taxSub.criteria.filter[sOrP];
                                    } catch (e) {
                                      console.error('could not delete filter', sOrP, 'on', tax, e);
                                    }

                                    if (Object.keys(taxSub.criteria.filter).length === 0) {
                                      taxSub.criteria.filter = null;
                                    }
                                  }
                                }

                                if (!(children && children.length)) return [3
                                /*break*/
                                , 2];
                                return [4
                                /*yield*/
                                , doForTaxes(children, taxSub.selectedId, tax)];

                              case 1:
                                _c.sent();

                                _c.label = 2;

                              case 2:
                                return [4
                                /*yield*/
                                , taxSub.updates // deselect selected items of children
                                ];

                              case 3:
                                _c.sent(); // deselect selected items of children


                                if (taxSub.selectedId) taxSub.select(taxSub.selectedId);
                                return [4
                                /*yield*/
                                , taxSub.updates];

                              case 4:
                                _c.sent();

                                return [2
                                /*return*/
                                , true];
                            }
                          });
                        });
                      }))];

                    case 1:
                      _a.sent();

                      return [2
                      /*return*/
                      ];
                  }
                });
              });
            };

            mobx.reaction(function () {
              return sub.selectedId;
            }, function (id) {
              return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      allTaxes = [];
                      return [4
                      /*yield*/
                      , doForTaxes(this.children, id, this.collection.name)];

                    case 1:
                      _a.sent();

                      return [2
                      /*return*/
                      ];
                  }
                });
              });
            });
            mobx.reaction(function () {
              return sub.activeId;
            }, function (id) {
              return __awaiter(_this, void 0, void 0, function () {
                var activeDoc;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (!id) return [2
                      /*return*/
                      ];
                      return [4
                      /*yield*/
                      , this.collection.findOne(id).exec()];

                    case 1:
                      activeDoc = _a.sent();
                      this.$lodger.modal.activeDoc = activeDoc;
                      Object.assign(this.$lodger.modal, {
                        sub: sub
                      });
                      return [2
                      /*return*/
                      ];
                  }
                });
              });
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

var ratesAtCompileTime = {"BTC":{"USD":"11239.73","BTC":"1","EUR":"9553.77","GBP":"8685.25","PLN":"43208.01","CZK":"256912.49","SEK":"95057.62","NOK":"105619.58","DKK":"73121.25","CHF":"10221.25","ZAR":"190115.24","AUD":"15583.22","JPY":"1188220.28","NZD":"16974.58","TRY":"86416.02","BRL":"63371.75","CAD":"14852.75","CNY":"73121.25","HKD":"86416.02","HUF":"3394915.07","INR":"819462.26","RUB":"864160.2","ILS":"38023.05","MYR":"47528.81","MXN":"237644.06","SGD":"15331.87","RON":"45265.53","IDR":"95057622.0","PHP":"543186.41","ARS":"864160.2","THB":"348196.42","NGN":"4320801.0","PKR":"1828031.19","AED":"41329.4","UAH":"317918.47","BGN":"18638.75","HRK":"73121.25","RSD":"1118324.96","LTC":"229.2169","ETH":"30.36","BCH":"46.7071","XRP":"44385.26","CLP":"8641602.0","NANO":"13774.1","TRX":"421941.0","DAI":"11266.0","USDT":"11374.0","AVA":"19600.16"},"LTC":{"USD":"49.04","BTC":"0.00436268","EUR":"41.68","GBP":"37.89","PLN":"188.5","CZK":"1120.84","SEK":"414.71","NOK":"460.79","DKK":"319.01","CHF":"44.59","ZAR":"829.42","AUD":"67.99","JPY":"5183.89","NZD":"74.06","TRY":"377.01","BRL":"276.47","CAD":"64.8","CNY":"319.01","HKD":"377.01","HUF":"14811.11","INR":"3575.09","RUB":"3770.1","ILS":"165.88","MYR":"207.36","MXN":"1036.78","SGD":"66.89","RON":"197.48","IDR":"414711.0","PHP":"2369.78","ARS":"3770.1","THB":"1519.09","NGN":"18850.5","PKR":"7975.21","AED":"180.31","UAH":"1386.99","BGN":"81.32","HRK":"319.01","RSD":"4878.95","LTC":"1","ETH":"0.13241","BCH":"0.203768","XRP":"193.6387","CLP":"37701.0","NANO":"60.092","TRX":"1840.79","DAI":"49.15","USDT":"49.6211","AVA":"85.5092"},"ETH":{"USD":"370.57","BTC":"0.03293806","EUR":"314.99","GBP":"286.35","PLN":"1424.56","CZK":"8470.39","SEK":"3134.04","NOK":"3482.27","DKK":"2410.8","CHF":"336.99","ZAR":"6268.09","AUD":"513.78","JPY":"39175.54","NZD":"559.65","TRY":"2849.13","BRL":"2089.36","CAD":"489.69","CNY":"2410.8","HKD":"2849.13","HUF":"111930.11","INR":"27017.61","RUB":"28491.3","ILS":"1253.62","MYR":"1567.02","MXN":"7835.11","SGD":"505.49","RON":"1492.4","IDR":"3134043.0","PHP":"17908.82","ARS":"28491.3","THB":"11480.01","NGN":"142456.5","PKR":"60270.06","AED":"1362.63","UAH":"10481.75","BGN":"614.52","HRK":"2410.8","RSD":"36871.09","LTC":"7.5523","ETH":"1","BCH":"1.538443","XRP":"1461.96","CLP":"284913.0","NANO":"451.6712","TRX":"13897.92","DAI":"371.0802","USDT":"374.6375","AVA":"645.5911"},"BCH":{"USD":"241.38","BTC":"0.02141","EUR":"205.17","GBP":"186.52","PLN":"927.9","CZK":"5517.24","SEK":"2041.38","NOK":"2268.2","DKK":"1570.29","CHF":"219.5","ZAR":"4082.76","AUD":"334.65","JPY":"25517.25","NZD":"364.53","TRY":"1855.8","BRL":"1360.92","CAD":"318.97","CNY":"1570.29","HKD":"1855.8","HUF":"72906.43","INR":"17598.1","RUB":"18558.0","ILS":"816.55","MYR":"1020.69","MXN":"5103.45","SGD":"329.25","RON":"972.09","IDR":"2041380.0","PHP":"11665.03","ARS":"18558.0","THB":"7477.58","NGN":"92790.0","PKR":"39257.31","AED":"887.56","UAH":"6827.36","BGN":"400.27","HRK":"1570.29","RSD":"24016.24","LTC":"4.907534","ETH":"0.650008","BCH":"1","XRP":"950.2885","CLP":"185580.0","NANO":"294.9036","TRX":"9033.76","DAI":"241.2051","USDT":"243.5173","AVA":"419.6394"},"XRP":{"USD":"0.2532","BTC":"0.00002253","EUR":"0.2153","GBP":"0.1957","PLN":"0.9735","CZK":"5.7886","SEK":"2.1418","NOK":"2.3797","DKK":"1.6475","CHF":"0.2303","ZAR":"4.2835","AUD":"0.3511","JPY":"26.7721","NZD":"0.3825","TRY":"1.9471","BRL":"1.4278","CAD":"0.3347","CNY":"1.6475","HKD":"1.9471","HUF":"76.4916","INR":"18.4635","RUB":"19.4706","ILS":"0.8567","MYR":"1.0709","MXN":"5.3544","SGD":"0.3454","RON":"1.0199","IDR":"2141.766","PHP":"12.2387","ARS":"19.4706","THB":"7.8453","NGN":"97.353","PKR":"41.1878","AED":"0.9312","UAH":"7.1631","BGN":"0.42","HRK":"1.6475","RSD":"25.1972","LTC":"0.00516426","ETH":"0.00068401","BCH":"0.00105231","XRP":"1","CLP":"194.706","NANO":"0.310331","TRX":"9.506329","DAI":"0.253823","USDT":"0.256256","AVA":"0.441592"},"TEL":{"USD":"0.000228","BTC":"0.00000002","EUR":"0.000192","GBP":"0.000174","PLN":"0.000859","CZK":"0.005189","SEK":"0.001996","NOK":"0.002077","DKK":"0.001429","CHF":"0.000207","ZAR":"0.003739","AUD":"0.000314","JPY":"0.024","NZD":"0.000341","TRY":"0.001786","BRL":"0.001256","CAD":"0.000298","CNY":"0.001521","HKD":"0.001761","HUF":"0.0684","INR":"0.0166","RUB":"0.0174","ILS":"0.000767","MYR":"0.000941","MXN":"0.004801","SGD":"0.000307","RON":"0.000936","IDR":"3.34","PHP":"0.011","ARS":"0.0175","THB":"0.007037","NGN":"0.0871","PKR":"0.0372","AED":"0.000834","UAH":"0.006421","BGN":"0.000376","HRK":"0.001454","RSD":"0.0226","LTC":"0.00000458","ETH":"0.00000061","BCH":"0.00000093","XRP":"0.00088771","CLP":"0.1806","NANO":"0.00027548","TRX":"0.00843882","DAI":"0.00022532","USDT":"0.00022748","AVA":"0.000392"},"NANO":{"USD":"0.8261","BTC":"0.0000726","EUR":"0.6972","GBP":"0.6321","PLN":"3.12","CZK":"18.84","SEK":"7.25","NOK":"7.54","DKK":"5.19","CHF":"0.7503","ZAR":"13.57","AUD":"1.14","JPY":"87.1","NZD":"1.24","TRY":"6.48","BRL":"4.56","CAD":"1.08","CNY":"5.52","HKD":"6.39","HUF":"248.33","INR":"60.17","RUB":"63.31","ILS":"2.79","MYR":"3.42","MXN":"17.43","SGD":"1.12","RON":"3.4","IDR":"12111.07","PHP":"39.89","ARS":"63.6","THB":"25.54","NGN":"316.28","PKR":"135.09","AED":"3.03","UAH":"23.31","BGN":"1.36","HRK":"5.28","RSD":"82.02","LTC":"0.01664061","ETH":"0.002214","BCH":"0.00339094","XRP":"3.22237","CLP":"655.4","NANO":"1","TRX":"30.6329","DAI":"0.817912","USDT":"0.8245","AVA":"1.422971"},"TRX":{"USD":"0.0266","BTC":"0.00000237","EUR":"0.0226","GBP":"0.0206","PLN":"0.1024","CZK":"0.609","SEK":"0.2253","NOK":"0.2504","DKK":"0.1733","CHF":"0.0242","ZAR":"0.4507","AUD":"0.0369","JPY":"2.8167","NZD":"0.0402","TRY":"0.2048","BRL":"0.1502","CAD":"0.0352","CNY":"0.1733","HKD":"0.2048","HUF":"8.0476","INR":"1.9425","RUB":"2.0485","ILS":"0.0901","MYR":"0.1127","MXN":"0.5633","SGD":"0.0363","RON":"0.1073","IDR":"225.3339","PHP":"1.2876","ARS":"2.0485","THB":"0.8254","NGN":"10.2424","PKR":"4.3333","AED":"0.098","UAH":"0.7536","BGN":"0.0442","HRK":"0.1733","RSD":"2.651","LTC":"0.00054323","ETH":"0.00007195","BCH":"0.0001107","XRP":"0.105193","CLP":"20.4849","NANO":"0.03264463","TRX":"1","DAI":"0.02670042","USDT":"0.02695638","AVA":"0.04645237"},"DAI":{"USD":"0.9977","BTC":"0.00008876","EUR":"0.848","GBP":"0.7709","PLN":"3.8353","CZK":"22.8048","SEK":"8.4378","NOK":"9.3753","DKK":"6.4906","CHF":"0.9073","ZAR":"16.8755","AUD":"1.3832","JPY":"105.4721","NZD":"1.5067","TRY":"7.6707","BRL":"5.6252","CAD":"1.3184","CNY":"6.4906","HKD":"7.6707","HUF":"301.3489","INR":"72.7394","RUB":"76.707","ILS":"3.3751","MYR":"4.2189","MXN":"21.0944","SGD":"1.3609","RON":"4.018","IDR":"8437.77","PHP":"48.2158","ARS":"76.707","THB":"30.9076","NGN":"383.535","PKR":"162.2648","AED":"3.6686","UAH":"28.22","BGN":"1.6545","HRK":"6.4906","RSD":"99.2679","LTC":"0.02034525","ETH":"0.00269484","BCH":"0.00414585","XRP":"3.939754","CLP":"767.07","NANO":"1.222626","TRX":"37.4526","DAI":"1","USDT":"1.00945","AVA":"1.739762"},"BTT":{"USD":"0.000343","BTC":"0.00000003","EUR":"0.000292","GBP":"0.000265","PLN":"0.00132","CZK":"0.00785","SEK":"0.002905","NOK":"0.003227","DKK":"0.002234","CHF":"0.000312","ZAR":"0.005809","AUD":"0.000476","JPY":"0.036308","NZD":"0.000519","TRY":"0.002641","BRL":"0.001936","CAD":"0.000454","CNY":"0.002234","HKD":"0.002641","HUF":"0.103738","INR":"0.02504","RUB":"0.026406","ILS":"0.001162","MYR":"0.001452","MXN":"0.007262","SGD":"0.000468","RON":"0.001383","IDR":"2.90466","PHP":"0.016598","ARS":"0.026406","THB":"0.01064","NGN":"0.13203","PKR":"0.055859","AED":"0.001263","UAH":"0.009715","BGN":"0.00057","HRK":"0.002234","RSD":"0.034172","LTC":"0.00000688","ETH":"0.00000091","BCH":"0.0000014","XRP":"0.00133156","CLP":"0.26406","NANO":"0.00041322","TRX":"0.01265823","DAI":"0.00033798","USDT":"0.00034122","AVA":"0.000588"},"AVA":{"USD":"0.5806","BTC":"0.00005102","EUR":"0.4899","GBP":"0.4442","PLN":"2.19","CZK":"13.24","SEK":"5.09","NOK":"5.3","DKK":"3.65","CHF":"0.5273","ZAR":"9.54","AUD":"0.8004","JPY":"61.21","NZD":"0.8698","TRY":"4.56","BRL":"3.21","CAD":"0.7603","CNY":"3.88","HKD":"4.49","HUF":"174.51","INR":"42.29","RUB":"44.49","ILS":"1.96","MYR":"2.4","MXN":"12.25","SGD":"0.7841","RON":"2.39","IDR":"8511.11","PHP":"28.03","ARS":"44.69","THB":"17.95","NGN":"222.27","PKR":"94.93","AED":"2.13","UAH":"16.38","BGN":"0.9585","HRK":"3.71","RSD":"57.64","LTC":"0.01169427","ETH":"0.00154897","BCH":"0.002383","XRP":"2.264536","CLP":"460.59","NANO":"0.702755","TRX":"21.5274","DAI":"0.574791","USDT":"0.580301","AVA":"1"},"CAD":{"USD":"0.76","EUR":"0.64","GBP":"0.58","PLN":"2.88","CZK":"17.41","SEK":"6.7","NOK":"6.97","DKK":"4.8","CHF":"0.69","ZAR":"12.55","AUD":"1.05","JPY":"80.51","NZD":"1.14","TRY":"5.99","BRL":"4.22","CAD":"1.0","CNY":"5.1","HKD":"5.91","HUF":"229.53","INR":"55.62","RUB":"58.52","ILS":"2.57","MYR":"3.16","MXN":"16.11","SGD":"1.03","RON":"3.14","IDR":"11194.57","PHP":"36.87","ARS":"58.78","THB":"23.61","NGN":"292.34","PKR":"124.87","AED":"2.8","UAH":"21.55","BGN":"1.26","HRK":"4.88","RSD":"75.81","CLP":"605.8"},"EUR":{"USD":"1.18","EUR":"1.0","GBP":"0.91","PLN":"4.47","CZK":"27.02","SEK":"10.39","NOK":"10.81","DKK":"7.44","CHF":"1.08","ZAR":"19.47","AUD":"1.63","JPY":"124.95","NZD":"1.78","TRY":"9.3","BRL":"6.54","CAD":"1.55","CNY":"7.92","HKD":"9.17","HUF":"356.24","INR":"86.32","RUB":"90.82","ILS":"4.0","MYR":"4.9","MXN":"25.0","SGD":"1.6","RON":"4.87","IDR":"17373.84","PHP":"57.22","ARS":"91.23","THB":"36.64","NGN":"453.71","PKR":"193.79","AED":"4.35","UAH":"33.44","BGN":"1.96","HRK":"7.57","RSD":"117.66","CLP":"940.2"},"GBP":{"USD":"1.3","EUR":"1.1","GBP":"1.0","PLN":"4.93","CZK":"29.8","SEK":"11.46","NOK":"11.93","DKK":"8.21","CHF":"1.19","ZAR":"21.48","AUD":"1.8","JPY":"137.81","NZD":"1.96","TRY":"10.26","BRL":"7.22","CAD":"1.71","CNY":"8.74","HKD":"10.11","HUF":"392.9","INR":"95.2","RUB":"100.17","ILS":"4.41","MYR":"5.4","MXN":"27.58","SGD":"1.77","RON":"5.37","IDR":"19161.98","PHP":"63.11","ARS":"100.62","THB":"40.41","NGN":"500.41","PKR":"213.73","AED":"4.79","UAH":"36.88","BGN":"2.16","HRK":"8.35","RSD":"129.77","CLP":"1036.97"},"USD":{"USD":"1.0","EUR":"0.85","GBP":"0.77","PLN":"3.78","CZK":"22.84","SEK":"8.78","NOK":"9.14","DKK":"6.29","CHF":"0.91","ZAR":"16.46","AUD":"1.38","JPY":"105.61","NZD":"1.5","TRY":"7.86","BRL":"5.53","CAD":"1.31","CNY":"6.69","HKD":"7.75","HUF":"301.11","INR":"72.96","RUB":"76.77","ILS":"3.38","MYR":"4.14","MXN":"21.13","SGD":"1.35","RON":"4.12","IDR":"14685.2","PHP":"48.37","ARS":"77.11","THB":"30.97","NGN":"383.5","PKR":"163.8","AED":"3.67","UAH":"28.26","BGN":"1.65","HRK":"6.4","RSD":"99.45","CLP":"794.7"}};

// import yaml from 'json2yaml'
rxdb.addRxPlugin(require('rxdb-search'));

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
      var required = tax.form.schema.required;
      taxonomies.forEach(function (t) {
        var _a = t.form,
            name = _a.name,
            plural = _a.plural;
        var parentsKeys = [name + "Id", plural].filter(function (key) {
          return tax.form.fieldsIds.indexOf(key) > -1 && required.indexOf(key) > -1;
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
  tip: {
    preview: 0
  }
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
