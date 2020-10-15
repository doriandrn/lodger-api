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
  numbers[numbers["rol"] = 3] = "rol";
})(numbers || (numbers = {}));
/**
 * Accepted 'array's for a LodgerSchema field
 *
 * @enum {number}
 */


var arrays;

(function (arrays) {
  arrays[arrays["array"] = 0] = "array";
  arrays[arrays["contoare"] = 1] = "contoare";
  arrays[arrays["distribuire"] = 2] = "distribuire";
  arrays[arrays["furnizori"] = 3] = "furnizori";
  arrays[arrays["selApartamente"] = 4] = "selApartamente";
  arrays[arrays["servicii"] = 5] = "servicii";
  arrays[arrays["scari"] = 6] = "scari";
})(arrays || (arrays = {}));
/**
 * Accepted 'object's for a LodgerSchema field
 *
 * @enum {number}
 */


var objects;

(function (objects) {
  objects[objects["contactFields"] = 0] = "contactFields";
  objects[objects["object"] = 1] = "object";
  objects[objects["organizatie"] = 2] = "organizatie";
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
        min: 0,
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
                  if (!taxes || !taxes.length) return [2
                  /*return*/
                  ];
                  if (!allTaxes.length) allTaxes = __spreadArrays(this.$lodger.taxonomies);
                  taxes.map(function (tax) {
                    var _a, _b;

                    var $tax = _this.$lodger[tax] || _this.$lodger[tax.plural];
                    if (!$tax) return true;

                    if (allTaxes && allTaxes.length && allTaxes.indexOf(tax.plural) > -1) {
                      allTaxes.splice(allTaxes.indexOf(tax.plural), 1);
                    } else {
                      // console.error(tax, 'has been handled.')
                      return true;
                    } // console.info('DOIN', tax)


                    var subscribers = $tax.subscribers,
                        parents = $tax.parents,
                        children = $tax.children;
                    var taxSub = subscribers[subscriberName];

                    if (!taxSub) {
                      console.error('invalid sub requested', tax);
                      return;
                    }

                    var sOrP, op, val; // deselect selected items of children

                    if (taxSub.selectedId) {
                      // console.log('deselcting from', tax, taxSub.selectedId)
                      taxSub.select(taxSub.selectedId);
                    }

                    if (taxSub.refsIds) {
                      if (parents && parents.length && (parents.indexOf(name) > -1 || parents.indexOf(name.plural) > -1)) {
                        var isSingular = parents.indexOf(name) > -1;
                        sOrP = isSingular ? name + "Id" : _this.form.plural;
                        op = isSingular ? '$eq' : '$in';
                        val = isSingular ? id : [id];
                        taxSub.refsIds[sOrP] = val; // console.log('changed refsIds')
                      }
                    }

                    if (sOrP && op && val) {
                      taxSub.criteria.filter = (_a = {}, _a[sOrP] = (_b = {}, _b[op] = val, _b), _a); // console.log('updated filter', Object.keys(taxSub.criteria.filter))
                    } else {
                      if (taxSub.criteria.filter) {
                        try {
                          delete taxSub.criteria.filter[sOrP]; // console.log('deleted filter', sOrP)
                        } catch (e) {
                          console.error('could not delete filter', sOrP, 'on', tax, e);
                        }

                        if (Object.keys(taxSub.criteria.filter).length === 0) {
                          // console.log('completely removed filters')
                          taxSub.criteria.filter = null;
                        }
                      }
                    }
                  });
                  return [2
                  /*return*/
                  ];
                });
              });
            };

            mobx.reaction(function () {
              return sub.selectedId;
            }, function (id) {
              allTaxes = []; // has to be reset every time !

              doForTaxes(_this.children, id, _this.collection.name);
            }); // Trigger the modal on activeId change

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

var ratesAtCompileTime = {"BTC":{"USD":"11322.4","BTC":"1","EUR":"9624.04","GBP":"8670.3","PLN":"43525.8","CZK":"261630.49","SEK":"95756.76","NOK":"106396.4","DKK":"73659.05","CHF":"10296.43","ZAR":"191513.52","AUD":"15959.46","JPY":"1182182.22","NZD":"17099.42","TRY":"87051.6","BRL":"63837.84","CAD":"14731.81","CNY":"73659.05","HKD":"87051.6","HUF":"3546546.67","INR":"825489.31","RUB":"878502.39","ILS":"38302.7","MYR":"45598.46","MXN":"241200.91","SGD":"15199.49","RON":"45598.46","IDR":"95756760.0","PHP":"547181.49","ARS":"870516.0","THB":"350757.36","NGN":"4352580.0","PKR":"1841476.15","AED":"41633.37","UAH":"317075.36","BGN":"18775.84","HRK":"73659.05","RSD":"1126550.12","LTC":"229.6459","ETH":"30.3877","BCH":"43.4594","XRP":"46082.95","CLP":"8705160.0","NANO":"14326.65","TRX":"425532.0","DAI":"11208.7","USDT":"11325.09","AVA":"20080.32"},"LTC":{"USD":"49.34","BTC":"0.00435453","EUR":"41.94","GBP":"37.78","PLN":"189.67","CZK":"1140.12","SEK":"417.29","NOK":"463.65","DKK":"320.99","CHF":"44.87","ZAR":"834.57","AUD":"69.55","JPY":"5151.67","NZD":"74.52","TRY":"379.35","BRL":"278.19","CAD":"64.2","CNY":"320.99","HKD":"379.35","HUF":"15455.0","INR":"3597.28","RUB":"3828.3","ILS":"166.91","MYR":"198.71","MXN":"1051.1","SGD":"66.24","RON":"198.71","IDR":"417285.0","PHP":"2384.49","ARS":"3793.5","THB":"1528.52","NGN":"18967.5","PKR":"8024.71","AED":"181.43","UAH":"1381.74","BGN":"81.82","HRK":"320.99","RSD":"4909.24","LTC":"1","ETH":"0.13231","BCH":"0.189245","XRP":"200.6696","CLP":"37935.0","NANO":"62.3858","TRX":"1852.99","DAI":"48.8086","USDT":"49.35","AVA":"87.4404"},"ETH":{"USD":"372.84","BTC":"0.032908","EUR":"316.92","GBP":"285.51","PLN":"1433.29","CZK":"8615.43","SEK":"3153.25","NOK":"3503.61","DKK":"2425.58","CHF":"339.06","ZAR":"6306.5","AUD":"525.54","JPY":"38929.0","NZD":"563.08","TRY":"2866.59","BRL":"2102.17","CAD":"485.12","CNY":"2425.58","HKD":"2866.59","HUF":"116787.0","INR":"27183.18","RUB":"28928.89","ILS":"1261.3","MYR":"1501.55","MXN":"7942.69","SGD":"500.52","RON":"1501.55","IDR":"3153249.0","PHP":"18018.57","ARS":"28665.9","THB":"11550.36","NGN":"143329.5","PKR":"60639.4","AED":"1370.98","UAH":"10441.22","BGN":"618.28","HRK":"2425.58","RSD":"37097.05","LTC":"7.558008","ETH":"1","BCH":"1.430161","XRP":"1516.5","CLP":"286659.0","NANO":"474.3833","TRX":"14003.4","DAI":"368.8559","USDT":"372.93","AVA":"660.8032"},"BCH":{"USD":"260.46","BTC":"0.02301","EUR":"221.39","GBP":"199.45","PLN":"1001.25","CZK":"6018.44","SEK":"2202.75","NOK":"2447.5","DKK":"1694.42","CHF":"236.85","ZAR":"4405.5","AUD":"367.13","JPY":"27194.44","NZD":"393.35","TRY":"2002.5","BRL":"1468.5","CAD":"338.88","CNY":"1694.42","HKD":"2002.5","HUF":"81583.33","INR":"18989.22","RUB":"20208.72","ILS":"881.1","MYR":"1048.93","MXN":"5548.49","SGD":"349.64","RON":"1048.93","IDR":"2202750.0","PHP":"12587.14","ARS":"20025.0","THB":"8068.68","NGN":"100125.0","PKR":"42360.58","AED":"957.72","UAH":"7293.87","BGN":"431.91","HRK":"1694.42","RSD":"25914.71","LTC":"5.284152","ETH":"0.699222","BCH":"1","XRP":"1060.37","CLP":"200250.0","NANO":"329.6562","TRX":"9791.49","DAI":"257.9122","USDT":"260.3368","AVA":"462.0482"},"XRP":{"USD":"0.2458","BTC":"0.0000217","EUR":"0.209","GBP":"0.1883","PLN":"0.945","CZK":"5.6806","SEK":"2.0791","NOK":"2.3101","DKK":"1.5993","CHF":"0.2236","ZAR":"4.1582","AUD":"0.3465","JPY":"25.6679","NZD":"0.3713","TRY":"1.8901","BRL":"1.3861","CAD":"0.3199","CNY":"1.5993","HKD":"1.8901","HUF":"77.0037","INR":"17.9233","RUB":"19.0743","ILS":"0.8316","MYR":"0.99","MXN":"5.237","SGD":"0.33","RON":"0.99","IDR":"2079.099","PHP":"11.8806","ARS":"18.9009","THB":"7.6157","NGN":"94.5045","PKR":"39.9827","AED":"0.904","UAH":"6.8844","BGN":"0.4077","HRK":"1.5993","RSD":"24.46","LTC":"0.00498332","ETH":"0.00065941","BCH":"0.00094307","XRP":"1","CLP":"189.009","NANO":"0.310888","TRX":"9.234043","DAI":"0.243229","USDT":"0.24581","AVA":"0.435743"},"TEL":{"USD":"0.000226","BTC":"0.00000002","EUR":"0.000193","GBP":"0.000175","PLN":"0.000881","CZK":"0.00529","SEK":"0.002013","NOK":"0.00212","DKK":"0.001439","CHF":"0.000207","ZAR":"0.003782","AUD":"0.00032","JPY":"0.0238","NZD":"0.000343","TRY":"0.001799","BRL":"0.001266","CAD":"0.000299","CNY":"0.001524","HKD":"0.001755","HUF":"0.0707","INR":"0.0166","RUB":"0.0177","ILS":"0.000769","MYR":"0.00094","MXN":"0.004868","SGD":"0.000308","RON":"0.000943","IDR":"3.34","PHP":"0.011","ARS":"0.0175","THB":"0.007071","NGN":"0.086","PKR":"0.0369","AED":"0.000832","UAH":"0.006408","BGN":"0.000378","HRK":"0.001466","RSD":"0.0227","LTC":"0.00000459","ETH":"0.00000061","BCH":"0.00000087","XRP":"0.00092166","CLP":"0.1808","NANO":"0.00028653","TRX":"0.00851064","DAI":"0.00022417","USDT":"0.00022628","AVA":"0.00040161"},"NANO":{"USD":"0.7896","BTC":"0.0000698","EUR":"0.6749","GBP":"0.6102","PLN":"3.07","CZK":"18.46","SEK":"7.03","NOK":"7.4","DKK":"5.02","CHF":"0.7232","ZAR":"13.2","AUD":"1.12","JPY":"83.2","NZD":"1.2","TRY":"6.28","BRL":"4.42","CAD":"1.04","CNY":"5.32","HKD":"6.12","HUF":"246.65","INR":"58.03","RUB":"61.71","ILS":"2.69","MYR":"3.28","MXN":"16.99","SGD":"1.08","RON":"3.29","IDR":"11656.47","PHP":"38.49","ARS":"61.16","THB":"24.68","NGN":"300.26","PKR":"128.84","AED":"2.9","UAH":"22.36","BGN":"1.32","HRK":"5.12","RSD":"79.37","LTC":"0.01602928","ETH":"0.00212106","BCH":"0.00303346","XRP":"3.21659","CLP":"631.13","NANO":"1","TRX":"29.7021","DAI":"0.782367","USDT":"0.7931","AVA":"1.401606"},"TRX":{"USD":"0.0265","BTC":"0.00000235","EUR":"0.0225","GBP":"0.0203","PLN":"0.102","CZK":"0.6129","SEK":"0.2243","NOK":"0.2492","DKK":"0.1726","CHF":"0.0241","ZAR":"0.4486","AUD":"0.0374","JPY":"2.7694","NZD":"0.0401","TRY":"0.2039","BRL":"0.1495","CAD":"0.0345","CNY":"0.1726","HKD":"0.2039","HUF":"8.3083","INR":"1.9338","RUB":"2.058","ILS":"0.0897","MYR":"0.1068","MXN":"0.565","SGD":"0.0356","RON":"0.1068","IDR":"224.3241","PHP":"1.2819","ARS":"2.0393","THB":"0.8217","NGN":"10.1965","PKR":"4.3139","AED":"0.0975","UAH":"0.7428","BGN":"0.044","HRK":"0.1726","RSD":"2.6391","LTC":"0.00053967","ETH":"0.00007141","BCH":"0.00010213","XRP":"0.108295","CLP":"20.3931","NANO":"0.03366762","TRX":"1","DAI":"0.02634044","USDT":"0.02658806","AVA":"0.04718876"},"DAI":{"USD":"1.0084","BTC":"0.00008922","EUR":"0.8571","GBP":"0.7722","PLN":"3.8763","CZK":"23.3004","SEK":"8.528","NOK":"9.4755","DKK":"6.56","CHF":"0.917","ZAR":"17.0559","AUD":"1.4213","JPY":"105.2834","NZD":"1.5228","TRY":"7.7527","BRL":"5.6853","CAD":"1.312","CNY":"6.56","HKD":"7.7527","HUF":"315.8503","INR":"73.5169","RUB":"78.2382","ILS":"3.4112","MYR":"4.0609","MXN":"21.481","SGD":"1.3536","RON":"4.0609","IDR":"8527.959","PHP":"48.7312","ARS":"77.5269","THB":"31.2379","NGN":"387.6345","PKR":"163.9992","AED":"3.7078","UAH":"28.2383","BGN":"1.6721","HRK":"6.56","RSD":"100.3289","LTC":"0.02048818","ETH":"0.00271109","BCH":"0.00387729","XRP":"4.111355","CLP":"775.269","NANO":"1.278172","TRX":"37.9644","DAI":"1","USDT":"1.00756","AVA":"1.791494"},"BTT":{"USD":"0.000318","BTC":"0.00000003","EUR":"0.000271","GBP":"0.000244","PLN":"0.001224","CZK":"0.007357","SEK":"0.002693","NOK":"0.002992","DKK":"0.002071","CHF":"0.00029","ZAR":"0.005386","AUD":"0.000449","JPY":"0.033244","NZD":"0.000481","TRY":"0.002448","BRL":"0.001795","CAD":"0.000414","CNY":"0.002071","HKD":"0.002448","HUF":"0.099733","INR":"0.023214","RUB":"0.024705","ILS":"0.001077","MYR":"0.001282","MXN":"0.006783","SGD":"0.000427","RON":"0.001282","IDR":"2.6928","PHP":"0.015387","ARS":"0.02448","THB":"0.009864","NGN":"0.1224","PKR":"0.051785","AED":"0.001171","UAH":"0.008917","BGN":"0.000528","HRK":"0.002071","RSD":"0.03168","LTC":"0.00000689","ETH":"0.00000091","BCH":"0.0000013","XRP":"0.00138249","CLP":"0.2448","NANO":"0.0004298","TRX":"0.01276596","DAI":"0.00033626","USDT":"0.00033975","AVA":"0.00060241"},"AVA":{"USD":"0.5634","BTC":"0.0000498","EUR":"0.4815","GBP":"0.4354","PLN":"2.19","CZK":"13.17","SEK":"5.01","NOK":"5.28","DKK":"3.58","CHF":"0.516","ZAR":"9.42","AUD":"0.7973","JPY":"59.36","NZD":"0.8546","TRY":"4.48","BRL":"3.15","CAD":"0.7437","CNY":"3.79","HKD":"4.37","HUF":"175.98","INR":"41.41","RUB":"44.03","ILS":"1.92","MYR":"2.34","MXN":"12.12","SGD":"0.767","RON":"2.35","IDR":"8316.51","PHP":"27.46","ARS":"43.64","THB":"17.61","NGN":"214.22","PKR":"91.92","AED":"2.07","UAH":"15.96","BGN":"0.9403","HRK":"3.65","RSD":"56.63","LTC":"0.01143637","ETH":"0.00151331","BCH":"0.00216428","XRP":"2.294931","CLP":"450.29","NANO":"0.713467","TRX":"21.1915","DAI":"0.558193","USDT":"0.563989","AVA":"1"},"CAD":{"USD":"0.76","EUR":"0.65","GBP":"0.58","PLN":"2.95","CZK":"17.69","SEK":"6.72","NOK":"7.09","DKK":"4.82","CHF":"0.69","ZAR":"12.63","AUD":"1.07","JPY":"79.81","NZD":"1.15","TRY":"6.02","BRL":"4.24","CAD":"1.0","CNY":"5.1","HKD":"5.87","HUF":"236.01","INR":"55.65","RUB":"59.14","ILS":"2.57","MYR":"3.15","MXN":"16.28","SGD":"1.03","RON":"3.16","IDR":"11171.01","PHP":"36.91","ARS":"58.66","THB":"23.66","NGN":"288.01","PKR":"123.58","AED":"2.78","UAH":"21.45","BGN":"1.26","HRK":"4.91","RSD":"76.11","CLP":"605.39"},"EUR":{"USD":"1.17","EUR":"1.0","GBP":"0.9","PLN":"4.55","CZK":"27.35","SEK":"10.41","NOK":"10.96","DKK":"7.44","CHF":"1.07","ZAR":"19.56","AUD":"1.66","JPY":"123.28","NZD":"1.77","TRY":"9.3","BRL":"6.55","CAD":"1.54","CNY":"7.88","HKD":"9.07","HUF":"365.47","INR":"85.99","RUB":"91.44","ILS":"3.98","MYR":"4.86","MXN":"25.17","SGD":"1.59","RON":"4.88","IDR":"17271.5","PHP":"57.03","ARS":"90.63","THB":"36.57","NGN":"444.89","PKR":"190.9","AED":"4.3","UAH":"33.14","BGN":"1.95","HRK":"7.58","RSD":"117.61","CLP":"935.16"},"GBP":{"USD":"1.3","EUR":"1.11","GBP":"1.0","PLN":"5.04","CZK":"30.28","SEK":"11.5","NOK":"12.13","DKK":"8.24","CHF":"1.19","ZAR":"21.62","AUD":"1.83","JPY":"136.6","NZD":"1.96","TRY":"10.3","BRL":"7.25","CAD":"1.71","CNY":"8.73","HKD":"10.05","HUF":"403.96","INR":"95.24","RUB":"101.22","ILS":"4.41","MYR":"5.39","MXN":"27.86","SGD":"1.76","RON":"5.4","IDR":"19120.16","PHP":"63.17","ARS":"100.4","THB":"40.49","NGN":"492.95","PKR":"211.52","AED":"4.76","UAH":"36.72","BGN":"2.16","HRK":"8.4","RSD":"130.26","CLP":"1036.18"},"USD":{"USD":"1.0","EUR":"0.85","GBP":"0.77","PLN":"3.89","CZK":"23.35","SEK":"8.87","NOK":"9.35","DKK":"6.35","CHF":"0.91","ZAR":"16.67","AUD":"1.41","JPY":"105.3","NZD":"1.51","TRY":"7.94","BRL":"5.59","CAD":"1.32","CNY":"6.73","HKD":"7.75","HUF":"311.42","INR":"73.42","RUB":"78.03","ILS":"3.4","MYR":"4.15","MXN":"21.48","SGD":"1.36","RON":"4.16","IDR":"14739.93","PHP":"48.7","ARS":"77.4","THB":"31.21","NGN":"380.02","PKR":"163.06","AED":"3.67","UAH":"28.3","BGN":"1.67","HRK":"6.47","RSD":"100.42","CLP":"798.8"}};

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
  denumire: {
    preview: 0
  },
  proiect: {
    preview: 3,
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
  },
  plata: {
    type: 'object',
    default: function () {
      return {
        metoda: 'fiat:banca',
        // metoda: 'crypto:nano',
        valoare: {
          suma: 101.23,
          moneda: 'RON'
        },
        achitata: {
          status: false,
          la: 0
        }
      };
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

var Roluri;

(function (Roluri) {
  Roluri[Roluri["admin"] = 0] = "admin";
  Roluri[Roluri["moderator"] = 1] = "moderator";
  Roluri[Roluri["vizitator"] = 2] = "vizitator";
  Roluri[Roluri["locatar"] = 3] = "locatar";
  Roluri[Roluri["proprietar"] = 4] = "proprietar";
})(Roluri || (Roluri = {}));

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
  // preferinte: {
  //   type: 'object',
  //   default: {
  //     locale: () => 'ro-RO'
  //   }
  // },
  rol: {
    type: 'number',
    min: 0,
    max: 6
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
const prefs = 'Preferințe';
var ro = {
  next: 'Continuă',
  back: 'Înapoi',
  backTo: 'Înapoi la',
  search: {
    do: 'Caută',
    noResults: 'Niciun rezultat',
    suggestions: 'Sugestii'
  },
  add: 'Adaugă',
  trash: 'Șterge',
  edit: 'Modifică',
  roluri: ['Administrator', 'Moderator', 'Vizitator', 'Locatar', 'Proprietar'],
  nav: {
    statistici: 'Statistici',
    liste: 'Liste de plată',
    istoric: 'Istoric',
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
        preferinte: prefs,
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
        rol: 'Rol',
        // preferinte: prefs,
        langSwitch: 'Schimbă limba'
      }
    }
  },
  welcome: {
    title: 'Bun venit!',
    intro: 'Îți mulțumim că ai ales să încerci Lodger!'
  },
  footer: {
    links: {
      help: 'Ajutor',
      feedback: 'Feedback',
      thanks: 'Mulțumiri',
      comunitate: 'Comunitate',
      update: 'Actualizează'
    }
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
