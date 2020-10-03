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
    this.form = form;
    this.options = options;
    this.lastItems = [];
    this.refsIds = [];
    this.totals = 0; // kinda hide the property for snapshots

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
            this.totals -= 1;
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
            id = _doc._id;
            this.last = id;
            this.totals += 1;
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

  __decorate([mobx.observable], Taxonomy.prototype, "refsIds", void 0);

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

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this, hooks = _a.hooks, subscribers = _a.subscribers;
            if (subscribers[subscriberName]) return [2
            /*return*/
            ];
            sub = this.subscribers[subscriberName] = new Subscriber__default['default'](this.collection, options);
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

  Object.defineProperty(STaxonomy.prototype, "subscriberParentIds", {
    get: function () {},
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(STaxonomy.prototype, "hooks", {
    get: function () {
      return this.form.taxHooks;
    },
    enumerable: false,
    configurable: true
  });
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

var ratesAtCompileTime = {"BTC":{"USD":"10519.37","EUR":"8986.69","BTC":"1.0","GBP":"8141.46","PLN":"40471.62","CZK":"243946.92","SEK":"94050.74","NOK":"98269.25","DKK":"66887.17","CHF":"9695.37","ZAR":"173641.51","AUD":"14697.7","JPY":"1109117.84","NZD":"15858.78","TRY":"81840.02","BRL":"59839.82","CAD":"14015.2","CNY":"71504.32","HKD":"81603.9","HUF":"3222848.9","INR":"772045.41","RUB":"823323.75","ILS":"36116.8","MYR":"43849.82","MXN":"227383.09","SGD":"14361.36","RON":"43763.48","IDR":"156381707.63","PHP":"510482.57","ARS":"809345.65","THB":"332414.2","NGN":"4027508.18","PKR":"1736830.0","AED":"38676.72","UAH":"298577.01","BGN":"17581.0","HRK":"67975.2","RSD":"1056681.26","ETH":"30.3595","LTC":"231.4815","DASH":"159.1343","BCH":"47.9846","XRP":"45126.35","CLP":"8314036.25","TEL":"50000000.0","NANO":"13513.51","DAI":"10437.3","USDT":"10514.76","AVA":"18181.82"},"USD":{"BTC":"0.00009506","EUR":"0.85","USD":"1.0","GBP":"0.77","PLN":"3.84","CZK":"23.17","SEK":"8.93","NOK":"9.33","DKK":"6.35","CHF":"0.92","ZAR":"16.49","AUD":"1.4","JPY":"105.34","NZD":"1.51","TRY":"7.77","BRL":"5.68","CAD":"1.33","CNY":"6.79","HKD":"7.75","HUF":"306.08","INR":"73.32","RUB":"78.19","ILS":"3.43","MYR":"4.16","MXN":"21.59","SGD":"1.36","RON":"4.16","PHP":"48.48","ARS":"76.87","THB":"31.57","NGN":"382.5","IDR":"14851.86","PKR":"164.95","AED":"3.67","UAH":"28.36","BGN":"1.67","HRK":"6.46","RSD":"100.36","LTC":"0.021988","ETH":"0.002887","DASH":"0.015038","BCH":"0.004539","XRP":"4.2913","CLP":"789.6","TEL":"4753.0","NANO":"1.2846","DAI":"0.9877","USDT":"0.9996","AVA":"1.7284"},"GBP":{"BTC":"0.00012283","USD":"1.29","EUR":"1.1","LTC":"0.028412","ETH":"0.003732","DASH":"0.019795","BCH":"0.005894","XRP":"5.5426","TEL":"6141.0","NANO":"1.6598","DAI":"1.2774","USDT":"1.2915","AVA":"2.2332"},"EUR":{"BTC":"0.00011128","USD":"1.17","EUR":"1.0","GBP":"0.91","PLN":"4.5","CZK":"27.15","SEK":"10.47","NOK":"10.94","DKK":"7.44","CHF":"1.08","ZAR":"19.32","AUD":"1.64","JPY":"123.42","NZD":"1.76","TRY":"9.11","BRL":"6.66","CAD":"1.56","CNY":"7.96","HKD":"9.08","HUF":"358.64","INR":"85.91","RUB":"91.62","ILS":"4.02","MYR":"4.88","MXN":"25.3","SGD":"1.6","RON":"4.87","PHP":"56.81","ARS":"90.06","THB":"36.99","NGN":"448.18","IDR":"17402.0","PKR":"193.27","AED":"4.3","UAH":"33.23","BGN":"1.96","HRK":"7.56","RSD":"117.59","LTC":"0.02574","ETH":"0.003381","DASH":"0.017933","BCH":"0.00534","XRP":"5.0213","CLP":"925.18","TEL":"5564.0","NANO":"1.5037","DAI":"1.1573","USDT":"1.17","AVA":"2.0232"},"PLN":{"USD":"0.26","BTC":"0.00002471","EUR":"0.22","LTC":"0.005716","ETH":"0.00075075","DASH":"0.003982","BCH":"0.001186","XRP":"1.115","TEL":"1235.0","NANO":"0.3339","DAI":"0.257","USDT":"0.2598","AVA":"0.4492"},"CZK":{"USD":"0.0432","BTC":"0.0000041","EUR":"0.0368","LTC":"0.00094823","ETH":"0.00012455","DASH":"0.00066063","BCH":"0.0001967","XRP":"0.185","TEL":"204.96","NANO":"0.055395","DAI":"0.042632","USDT":"0.043103","AVA":"0.074532"},"SEK":{"USD":"0.11","BTC":"0.00001063","EUR":"0.1","LTC":"0.002459","ETH":"0.00032305","DASH":"0.001713","BCH":"0.00051019","XRP":"0.4798","TEL":"531.63","NANO":"0.1437","DAI":"0.1106","USDT":"0.1118","AVA":"0.1933"},"NOK":{"USD":"0.11","BTC":"0.00001018","EUR":"0.09","LTC":"0.002354","ETH":"0.00030918","DASH":"0.00164","BCH":"0.00048829","XRP":"0.4592","TEL":"508.81","NANO":"0.1375","DAI":"0.1058","USDT":"0.107","AVA":"0.185"},"DKK":{"USD":"0.16","BTC":"0.00001495","EUR":"0.13","LTC":"0.003458","ETH":"0.00045424","DASH":"0.002409","BCH":"0.00071739","XRP":"0.6746","TEL":"747.53","NANO":"0.202","DAI":"0.1555","USDT":"0.1572","AVA":"0.2718"},"CHF":{"USD":"1.09","BTC":"0.00010314","EUR":"0.93","LTC":"0.023858","ETH":"0.003134","DASH":"0.016622","BCH":"0.004949","XRP":"4.6542","TEL":"5157.0","NANO":"1.3938","DAI":"1.0726","USDT":"1.0845","AVA":"1.8753"},"ZAR":{"EUR":"0.05","USD":"0.06","BTC":"0.00000576","LTC":"0.001332","ETH":"0.00017498","DASH":"0.00092808","BCH":"0.00027634","XRP":"0.2599","TEL":"287.95","NANO":"0.077824","DAI":"0.059891","USDT":"0.060554","AVA":"0.1047"},"AUD":{"EUR":"0.61","USD":"0.72","BTC":"0.00006804","LTC":"0.015738","ETH":"0.002067","DASH":"0.010965","BCH":"0.003265","XRP":"3.0701","TEL":"3402.0","NANO":"0.9194","DAI":"0.7076","USDT":"0.7154","AVA":"1.2371"},"JPY":{"EUR":"0.0081","USD":"0.0095","BTC":"0.0000009","LTC":"0.00020855","ETH":"0.00002739","DASH":"0.0001453","BCH":"0.00004326","XRP":"0.040684","TEL":"45.08","NANO":"0.012184","DAI":"0.009376","USDT":"0.00948","AVA":"0.016393"},"NZD":{"EUR":"0.57","USD":"0.66","BTC":"0.00006306","LTC":"0.014586","ETH":"0.001916","DASH":"0.010162","BCH":"0.003026","XRP":"2.8454","TEL":"3153.0","NANO":"0.8521","DAI":"0.6558","USDT":"0.663","AVA":"1.1465"},"TRY":{"EUR":"0.11","USD":"0.13","BTC":"0.00001222","LTC":"0.002826","ETH":"0.00037125","DASH":"0.001969","BCH":"0.00058631","XRP":"0.5514","TEL":"610.95","NANO":"0.1651","DAI":"0.1271","USDT":"0.1285","AVA":"0.2222"},"BRL":{"EUR":"0.15","USD":"0.18","BTC":"0.00001671","LTC":"0.003865","ETH":"0.00050774","DASH":"0.002693","BCH":"0.00080187","XRP":"0.7541","TEL":"835.56","NANO":"0.2258","DAI":"0.1738","USDT":"0.1757","AVA":"0.3038"},"CAD":{"EUR":"0.64","USD":"0.75","BTC":"0.00007135","LTC":"0.016504","ETH":"0.002168","DASH":"0.011499","BCH":"0.003424","XRP":"3.2196","TEL":"3568.0","NANO":"0.9642","DAI":"0.742","USDT":"0.7502","AVA":"1.2973"},"CNY":{"EUR":"0.13","USD":"0.15","BTC":"0.00001399","LTC":"0.003235","ETH":"0.00042491","DASH":"0.002254","BCH":"0.00067106","XRP":"0.6311","TEL":"699.26","NANO":"0.189","DAI":"0.1454","USDT":"0.1471","AVA":"0.2543"},"HKD":{"EUR":"0.11","USD":"0.13","BTC":"0.00001225","LTC":"0.002835","ETH":"0.00037232","DASH":"0.001975","BCH":"0.00058801","XRP":"0.553","TEL":"612.72","NANO":"0.1656","DAI":"0.1274","USDT":"0.1289","AVA":"0.2228"},"HUF":{"EUR":"0.0028","USD":"0.0033","BTC":"0.00000031","LTC":"0.00007177","ETH":"0.00000943","DASH":"0.00005","BCH":"0.00001489","XRP":"0.014001","TEL":"15.51","NANO":"0.004193","DAI":"0.003227","USDT":"0.003263","AVA":"0.005642"},"INR":{"EUR":"0.0116","USD":"0.0136","BTC":"0.0000013","LTC":"0.00029961","ETH":"0.00003935","DASH":"0.00020874","BCH":"0.00006215","XRP":"0.058447","TEL":"64.76","NANO":"0.017504","DAI":"0.01347","USDT":"0.013619","AVA":"0.02355"},"RUB":{"EUR":"0.0109","USD":"0.0128","BTC":"0.00000121","LTC":"0.00028095","ETH":"0.0000369","DASH":"0.00019574","BCH":"0.00005828","XRP":"0.054807","TEL":"60.73","NANO":"0.016413","DAI":"0.012631","USDT":"0.012771","AVA":"0.022083"},"ILS":{"EUR":"0.25","USD":"0.29","BTC":"0.00002769","LTC":"0.006405","ETH":"0.00084125","DASH":"0.004462","BCH":"0.001329","XRP":"1.2494","TEL":"1384.0","NANO":"0.3742","DAI":"0.2879","USDT":"0.2911","AVA":"0.5034"},"MYR":{"EUR":"0.2","USD":"0.24","BTC":"0.00002281","LTC":"0.005275","ETH":"0.00069289","DASH":"0.003675","BCH":"0.001094","XRP":"1.0291","TEL":"1140.0","NANO":"0.3082","DAI":"0.2372","USDT":"0.2398","AVA":"0.4146"},"MXN":{"EUR":"0.0395","USD":"0.0463","BTC":"0.0000044","LTC":"0.001017","ETH":"0.00013362","DASH":"0.00070873","BCH":"0.00021103","XRP":"0.1984","TEL":"219.89","NANO":"0.059431","DAI":"0.045736","USDT":"0.046242","AVA":"0.079961"},"SGD":{"EUR":"0.63","USD":"0.73","BTC":"0.00006963","LTC":"0.016106","ETH":"0.002116","DASH":"0.011221","BCH":"0.003341","XRP":"3.142","TEL":"3482.0","NANO":"0.941","DAI":"0.7241","USDT":"0.7322","AVA":"1.266"},"RON":{"EUR":"0.21","USD":"0.24","BTC":"0.00002285","LTC":"0.005285","ETH":"0.00069426","DASH":"0.003682","BCH":"0.001096","XRP":"1.0311","TEL":"1143.0","NANO":"0.3088","DAI":"0.2376","USDT":"0.2403","AVA":"0.4155"},"IDR":{"EUR":"0.0001","USD":"0.0001","BTC":"0.00000001","LTC":"0.00000148","ETH":"0.00000019","DASH":"0.00000103","BCH":"0.00000031","XRP":"0.00028855","TEL":"0.3197","NANO":"0.00008641","DAI":"0.0000665","USDT":"0.00006724","AVA":"0.00011627"},"PHP":{"EUR":"0.0176","USD":"0.0206","BTC":"0.00000196","LTC":"0.00045312","ETH":"0.00005952","DASH":"0.00031569","BCH":"0.000094","XRP":"0.088395","TEL":"97.95","NANO":"0.026472","DAI":"0.020372","USDT":"0.020598","AVA":"0.035617"},"ARS":{"EUR":"0.0111","USD":"0.013","BTC":"0.00000124","LTC":"0.0002858","ETH":"0.00003754","DASH":"0.00019912","BCH":"0.00005929","XRP":"0.055754","TEL":"61.78","NANO":"0.016697","DAI":"0.012849","USDT":"0.012992","AVA":"0.022465"},"THB":{"EUR":"0.027","USD":"0.0317","BTC":"0.00000301","LTC":"0.00069585","ETH":"0.0000914","DASH":"0.0004848","BCH":"0.00014435","XRP":"0.1357","TEL":"150.41","NANO":"0.040653","DAI":"0.031285","USDT":"0.031632","AVA":"0.054696"},"NGN":{"EUR":"0.0022","USD":"0.0026","BTC":"0.00000025","LTC":"0.00005743","ETH":"0.00000754","DASH":"0.00004001","BCH":"0.00001191","XRP":"0.011204","TEL":"12.41","NANO":"0.003355","DAI":"0.002582","USDT":"0.002611","AVA":"0.004514"},"PKR":{"USD":"0.0061","EUR":"0.0052","BTC":"0.00000058","LTC":"0.00013318","ETH":"0.00001749","DASH":"0.00009279","BCH":"0.00002763","XRP":"0.025981","TEL":"28.79","NANO":"0.007781","DAI":"0.005988","USDT":"0.006054","AVA":"0.010468"},"AED":{"USD":"0.27","EUR":"0.23","BTC":"0.00002586","LTC":"0.005981","ETH":"0.00078557","DASH":"0.004167","BCH":"0.001241","XRP":"1.1667","TEL":"1293.0","NANO":"0.3494","DAI":"0.2689","USDT":"0.2719","AVA":"0.4701"},"UAH":{"USD":"0.0353","EUR":"0.0301","BTC":"0.00000335","LTC":"0.00077471","ETH":"0.00010176","DASH":"0.00053974","BCH":"0.00016071","XRP":"0.1511","TEL":"167.46","NANO":"0.04526","DAI":"0.034831","USDT":"0.035216","AVA":"0.060895"},"BGN":{"USD":"0.6","EUR":"0.51","BTC":"0.00005688","LTC":"0.013157","ETH":"0.001728","DASH":"0.009166","BCH":"0.002729","XRP":"2.5666","TEL":"2844.0","NANO":"0.7686","DAI":"0.5915","USDT":"0.5981","AVA":"1.0342"},"HRK":{"USD":"0.15","EUR":"0.13","BTC":"0.00001471","LTC":"0.003403","ETH":"0.00044697","DASH":"0.002371","BCH":"0.0007059","XRP":"0.6638","TEL":"735.56","NANO":"0.1988","DAI":"0.153","USDT":"0.1547","AVA":"0.2675"},"RSD":{"USD":"0.01","EUR":"0.0085","BTC":"0.00000095","LTC":"0.0002189","ETH":"0.00002875","DASH":"0.00015251","BCH":"0.00004541","XRP":"0.042703","TEL":"47.32","NANO":"0.012789","DAI":"0.009842","USDT":"0.009951","AVA":"0.017207"},"LTC":{"USD":"45.48","EUR":"38.85","GBP":"35.2","PLN":"174.96","CZK":"1054.6","SEK":"406.6","NOK":"424.84","DKK":"289.17","CHF":"41.91","ZAR":"750.69","AUD":"63.54","JPY":"4794.93","NZD":"68.56","TRY":"353.81","BRL":"258.7","CAD":"60.59","CNY":"309.13","HKD":"352.79","HUF":"13932.99","INR":"3337.7","RUB":"3559.38","ILS":"156.14","MYR":"189.57","MXN":"983.02","SGD":"62.09","RON":"189.2","IDR":"676067.82","PHP":"2206.91","ARS":"3498.95","THB":"1437.09","NGN":"17411.68","PKR":"7508.65","AED":"167.21","UAH":"1290.81","BGN":"76.01","HRK":"293.87","RSD":"4568.23","BTC":"0.00432","ETH":"0.13121","DASH":"0.68746","BCH":"0.207294","LTC":"1.0","XRP":"194.9458","CLP":"35943.16","TEL":"216000.0","NANO":"58.3784","DAI":"45.0891","USDT":"45.42","AVA":"78.5455"},"ETH":{"USD":"346.44","EUR":"295.77","GBP":"267.95","PLN":"1332.0","CZK":"8028.78","SEK":"3095.49","NOK":"3234.34","DKK":"2201.46","CHF":"319.1","ZAR":"5715.06","AUD":"483.75","JPY":"36504.39","NZD":"521.96","TRY":"2693.6","BRL":"1969.51","CAD":"461.28","CNY":"2353.42","HKD":"2685.83","HUF":"106073.61","INR":"25410.33","RUB":"27098.05","ILS":"1188.71","MYR":"1443.23","MXN":"7483.86","SGD":"472.68","RON":"1440.39","IDR":"5146990.42","PHP":"16801.51","ARS":"26637.99","THB":"10940.75","NGN":"132557.36","PKR":"57164.28","AED":"1272.97","UAH":"9827.06","BGN":"578.64","HRK":"2237.27","RSD":"34778.55","BTC":"0.03293863","LTC":"7.62137","DASH":"5.241666","BCH":"1.580548","ETH":"1.0","XRP":"1486.4","CLP":"273639.84","TEL":"1646932.0","NANO":"443.6557","DAI":"343.7904","USDT":"346.37","AVA":"598.8842"},"DASH":{"BTC":"0.006284","USD":"66.5","EUR":"55.76","GBP":"50.52","PLN":"251.13","CZK":"1513.71","SEK":"583.61","NOK":"609.79","DKK":"415.05","CHF":"60.16","ZAR":"1077.49","AUD":"91.2","JPY":"6882.36","NZD":"98.41","TRY":"507.84","BRL":"371.32","CAD":"86.97","CNY":"443.7","HKD":"506.37","HUF":"19998.59","INR":"4790.74","RUB":"5108.93","ILS":"224.11","MYR":"272.1","MXN":"1410.97","SGD":"89.12","RON":"271.56","IDR":"970387.89","PHP":"3167.67","ARS":"5022.19","THB":"2062.71","NGN":"24991.7","PKR":"10777.47","AED":"240.0","UAH":"1852.75","BGN":"109.09","HRK":"421.8","RSD":"6556.97","LTC":"1.45463","ETH":"0.190779","BCH":"0.301536","DASH":"1.0","XRP":"283.574","CLP":"51590.69","TEL":"314200.0","NANO":"84.9189","DAI":"65.588","USDT":"66.0749","AVA":"114.2545"},"BCH":{"BTC":"0.02084","USD":"220.29","EUR":"187.28","GBP":"169.67","PLN":"843.42","CZK":"5083.78","SEK":"1960.05","NOK":"2047.96","DKK":"1393.95","CHF":"202.05","ZAR":"3618.75","AUD":"306.31","JPY":"23114.39","NZD":"330.5","TRY":"1705.57","BRL":"1247.08","CAD":"292.08","CNY":"1490.17","HKD":"1700.65","HUF":"67165.25","INR":"16089.68","RUB":"17158.34","ILS":"752.69","MYR":"913.84","MXN":"4738.74","SGD":"299.3","RON":"912.05","IDR":"3259047.12","PHP":"10638.63","ARS":"16867.03","THB":"6927.62","NGN":"83934.62","PKR":"36196.12","AED":"806.04","UAH":"6222.44","BGN":"366.39","HRK":"1416.63","RSD":"22021.59","LTC":"4.824074","ETH":"0.632692","DASH":"3.316359","BCH":"1.0","XRP":"940.4332","CLP":"173267.3","TEL":"1042000.0","NANO":"281.6216","DAI":"217.5133","USDT":"219.128","AVA":"378.9091"},"XRP":{"BTC":"0.00002216","USD":"0.233","EUR":"0.1992","GBP":"0.1804","PLN":"0.8969","CZK":"5.41","SEK":"2.08","NOK":"2.18","DKK":"1.48","CHF":"0.2149","ZAR":"3.85","AUD":"0.3257","JPY":"24.58","NZD":"0.3514","TRY":"1.81","BRL":"1.33","CAD":"0.3106","CNY":"1.58","HKD":"1.81","HUF":"71.42","INR":"17.11","RUB":"18.25","ILS":"0.8004","MYR":"0.9718","MXN":"5.04","SGD":"0.3183","RON":"0.9699","IDR":"3465.61","PHP":"11.31","ARS":"17.94","THB":"7.37","NGN":"89.25","PKR":"38.49","AED":"0.8571","UAH":"6.62","BGN":"0.3896","HRK":"1.51","RSD":"23.42","LTC":"0.00512963","ETH":"0.00067277","DASH":"0.00352642","BCH":"0.00106334","XRP":"1.0","CLP":"184.25","TEL":"1108.0","NANO":"0.299459","DAI":"0.231291","USDT":"0.23306","AVA":"0.402909"},"CLP":{"EUR":"0.0011","USD":"0.0013","BTC":"0.00000012","LTC":"0.00002782","ETH":"0.00000365","DASH":"0.00001938","BCH":"0.00000577","XRP":"0.005427","TEL":"6.0139","NANO":"0.001625","DAI":"0.001251","USDT":"0.001265","AVA":"0.002187"},"TEL":{"BTC":"0.00000002","LTC":"0.00000463","ETH":"0.00000061","DASH":"0.00000318","BCH":"0.00000096","XRP":"0.00090253","TEL":"1.0","USD":"0.00021","EUR":"0.00018","GBP":"0.000163","PLN":"0.000809","CZK":"0.004879","SEK":"0.001881","NOK":"0.001965","DKK":"0.001338","CHF":"0.000194","ZAR":"0.003473","AUD":"0.000294","JPY":"0.0222","NZD":"0.000317","TRY":"0.001637","BRL":"0.001197","CAD":"0.00028","CNY":"0.00143","HKD":"0.001632","HUF":"0.0645","INR":"0.0154","RUB":"0.0165","ILS":"0.000722","MYR":"0.000877","MXN":"0.004548","SGD":"0.000287","RON":"0.000875","IDR":"3.13","PHP":"0.0102","ARS":"0.0162","THB":"0.006648","NGN":"0.0806","PKR":"0.0347","AED":"0.000774","UAH":"0.005972","BGN":"0.000352","HRK":"0.00136","RSD":"0.0211","CLP":"0.1663","NANO":"0.00027027","DAI":"0.00020875","USDT":"0.0002103","AVA":"0.00036364"},"NANO":{"BTC":"0.000074","ETH":"0.0022466","LTC":"0.01712963","DASH":"0.01177594","BCH":"0.00355086","XRP":"3.33935","TEL":"3700.0","NANO":"1.0","USD":"0.7784","EUR":"0.665","GBP":"0.6025","PLN":"2.99","CZK":"18.05","SEK":"6.96","NOK":"7.27","DKK":"4.95","CHF":"0.7175","ZAR":"12.85","AUD":"1.09","JPY":"82.07","NZD":"1.17","TRY":"6.06","BRL":"4.43","CAD":"1.04","CNY":"5.29","HKD":"6.04","HUF":"238.49","INR":"57.13","RUB":"60.93","ILS":"2.67","MYR":"3.24","MXN":"16.83","SGD":"1.06","RON":"3.24","IDR":"11572.25","PHP":"37.78","ARS":"59.89","THB":"24.6","NGN":"298.04","PKR":"128.53","AED":"2.86","UAH":"22.09","BGN":"1.3","HRK":"5.03","RSD":"78.19","CLP":"615.24","DAI":"0.77236","USDT":"0.779","AVA":"1.345455"},"DAI":{"BTC":"0.00009581","LTC":"0.02217829","ETH":"0.00290875","DASH":"0.01524669","BCH":"0.00459742","XRP":"4.323566","TEL":"4790.51","NANO":"1.294733","DAI":"1.0","USD":"1.01","EUR":"0.8641","GBP":"0.7828","PLN":"3.89","CZK":"23.46","SEK":"9.04","NOK":"9.45","DKK":"6.43","CHF":"0.9323","ZAR":"16.7","AUD":"1.41","JPY":"106.65","NZD":"1.52","TRY":"7.87","BRL":"5.75","CAD":"1.35","CNY":"6.88","HKD":"7.85","HUF":"309.9","INR":"74.24","RUB":"79.17","ILS":"3.47","MYR":"4.22","MXN":"21.86","SGD":"1.38","RON":"4.21","IDR":"15037.24","PHP":"49.09","ARS":"77.82","THB":"31.96","NGN":"387.27","PKR":"167.01","AED":"3.72","UAH":"28.71","BGN":"1.69","HRK":"6.54","RSD":"101.61","CLP":"799.46","USDT":"1.01001","AVA":"1.742004"},"USDT":{"LTC":"0.02201673","ETH":"0.00288709","BCH":"0.00456355","XRP":"4.290741","TEL":"4755.22","NANO":"1.283697","DAI":"0.990089","USDT":"1.0","USD":"1.0","EUR":"0.8547","GBP":"0.7743","PLN":"3.85","CZK":"23.2","SEK":"8.94","NOK":"9.35","DKK":"6.36","CHF":"0.9221","ZAR":"16.51","AUD":"1.4","JPY":"105.48","NZD":"1.51","TRY":"7.78","BRL":"5.69","CAD":"1.33","CNY":"6.8","HKD":"7.76","HUF":"306.51","INR":"73.42","RUB":"78.3","ILS":"3.43","MYR":"4.17","MXN":"21.63","SGD":"1.37","RON":"4.16","IDR":"14872.59","PHP":"48.55","ARS":"76.97","THB":"31.61","NGN":"383.03","PKR":"165.18","AED":"3.68","UAH":"28.4","BGN":"1.67","HRK":"6.46","RSD":"100.5","CLP":"790.7","BTC":"0.0000951","DASH":"0.01513437","AVA":"1.729171"},"AVA":{"AVA":"1.0","BTC":"0.000055","LTC":"0.01273148","ETH":"0.00166977","DASH":"0.00875239","BCH":"0.00263916","XRP":"2.481949","TEL":"2750.0","NANO":"0.743243","DAI":"0.574051","USDT":"0.578312","USD":"0.5786","EUR":"0.4943","GBP":"0.4478","PLN":"2.23","CZK":"13.42","SEK":"5.17","NOK":"5.4","DKK":"3.68","CHF":"0.5332","ZAR":"9.55","AUD":"0.8084","JPY":"61.0","NZD":"0.8722","TRY":"4.5","BRL":"3.29","CAD":"0.7708","CNY":"3.93","HKD":"4.49","HUF":"177.26","INR":"42.46","RUB":"45.28","ILS":"1.99","MYR":"2.41","MXN":"12.51","SGD":"0.7899","RON":"2.41","IDR":"8600.99","PHP":"28.08","ARS":"44.51","THB":"18.28","NGN":"221.51","PKR":"95.53","AED":"2.13","UAH":"16.42","BGN":"0.967","HRK":"3.74","RSD":"58.12","CLP":"457.27"}};

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
    Lodger.rates = ratesAtCompileTime; // this.taxonomies = taxonomies.map(tax => tax.form.plural)

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
        "dataScadenta": "due to",
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
      "name": "Piso",
      "plural": "Apartamentos",
      "fieldsets": {
        "descriere": "Descripción",
        "localizare": "Localización",
        "registru": ""
      },
      "fields": {
        "nr": "Nº registro",
        "suprafata": "Tamaño",
        "locatari": "",
        "balanta": "",
        "proprietar": "saldo inquilinos propietario",
        "camere": "Habitaciones",
        "etaj": "Piso",
        "scara": "escala",
        "contoare": "",
        "incasari": "Contadores Réditos",
        "cheltuieli": "",
        "blocId": "gastos de bloque",
        "asociatieId": ""
      }
    },
    "asociatii": {
      "name": "Asociación",
      "plural": "Asociaciones",
      "fields": {
        "name": "Nombre",
        "organizatie": "Organización /",
        "balanta": "",
        "utilizatori": "Los usuarios de equilibrio",
        "preferinte": "Preferencias",
        "servicii": ""
      }
    },
    "blocuri": {
      "name": "Servicios de construcción",
      "plural": "Edificios",
      "fields": {
        "name": "",
        "scari": "Identificación escaleras",
        "adresa": "Dirección",
        "asociatieId": "empresa"
      }
    },
    "cheltuieli": {
      "name": "",
      "plural": "gasto de los gastos",
      "fields": {
        "catre": "a",
        "suma": "cantidad",
        "facturi": "Facturas",
        "dataScadenta": "madurez",
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
        "nrFactura": "Nº",
        "dataScadenta": "debido al Proveedor",
        "furnizorId": "",
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
  "search": "Recherche",
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
        "descriere": "Description",
        "localizare": "Emplacement",
        "registru": ""
      },
      "fields": {
        "nr": "inscrire No.",
        "suprafata": "Taille",
        "locatari": "Locataires",
        "balanta": "solde",
        "proprietar": "propriétaire",
        "camere": "Chambres",
        "etaj": "",
        "scara": "étage échelle",
        "contoare": "Compteurs",
        "incasari": "Produit",
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
        "preferinte": "Préférences",
        "servicii": "services"
      }
    },
    "blocuri": {
      "name": "construction",
      "plural": "Bâtiments",
      "fields": {
        "name": "ID",
        "scari": "",
        "adresa": "Adresse",
        "asociatieId": "escaliers Société"
      }
    },
    "cheltuieli": {
      "name": "frais",
      "plural": "frais",
      "fields": {
        "catre": "",
        "suma": "",
        "facturi": "au montant des factures",
        "dataScadenta": "échéance",
        "distribuire": "distribution",
        "apartamenteEligibile": "Appartements admissibles",
        "asociatieId": "Association"
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
        "dataScadenta": "en raison de fournisseur",
        "furnizorId": "",
        "asociatieId": ""
      }
    },
    "furnizori": {
      "name": "Société fournisseur",
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
