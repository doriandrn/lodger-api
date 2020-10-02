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
        name = _a.name;

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
      var name, fields, fieldsets, methods, statics, timestamps, form, schema, collectionCreator, collection, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!db) throw new LodgerError(Errors$2.noDB);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3,, 4]);

            name = data.name, fields = data.fields, fieldsets = data.fieldsets, methods = data.methods, statics = data.statics;
            timestamps = options.timestamps;
            form = new Form({
              name: name,
              fields: fields,
              fieldsets: fieldsets
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

    if (this.subscribers[subscriberName]) return;
    this.subscribers[subscriberName] = new Subscriber__default['default'](this.collection, options);
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

var ratesAtCompileTime = {"BTC":{"USD":"10441.43","EUR":"8915.06","BTC":"1.0","GBP":"8125.92","PLN":"39963.95","CZK":"239661.22","SEK":"93445.26","NOK":"97749.96","DKK":"66363.38","CHF":"9613.08","ZAR":"174216.31","AUD":"14614.5","JPY":"1101600.83","NZD":"15755.87","TRY":"80739.09","BRL":"58905.04","CAD":"13892.83","CNY":"70871.62","HKD":"80887.07","HUF":"3200156.29","INR":"765395.63","RUB":"809367.32","ILS":"35755.28","MYR":"43405.28","MXN":"229274.2","SGD":"14261.38","RON":"43460.57","IDR":"155614256.51","PHP":"505832.02","ARS":"794693.71","THB":"330150.84","NGN":"3977991.15","COP":"40052205.0","PKR":"1724385.52","AED":"38321.42","UAH":"295923.57","BGN":"17394.58","HRK":"67395.71","RSD":"1048121.9","ETH":"30.4062","LTC":"230.2556","DASH":"155.4002","BCH":"47.29","XRP":"44722.72","CLP":"8211590.5","TEL":"50000000.0","NANO":"13661.2","DAI":"10316.5","USDT":"10457.77","AVA":"18580.45"},"USD":{"BTC":"0.00009577","EUR":"0.85","USD":"1.0","GBP":"0.78","PLN":"3.83","CZK":"22.96","SEK":"8.95","NOK":"9.37","DKK":"6.36","CHF":"0.92","ZAR":"16.69","AUD":"1.4","JPY":"105.55","NZD":"1.51","TRY":"7.74","BRL":"5.64","CAD":"1.33","CNY":"6.79","HKD":"7.75","HUF":"306.74","INR":"73.37","RUB":"77.58","ILS":"3.43","MYR":"4.16","MXN":"21.98","SGD":"1.37","RON":"4.17","PHP":"48.49","ARS":"76.17","THB":"31.65","NGN":"381.3","IDR":"14916.0","COP":"3839.1","PKR":"165.29","AED":"3.67","UAH":"28.36","BGN":"1.67","HRK":"6.46","RSD":"100.47","LTC":"0.022022","ETH":"0.002908","DASH":"0.014925","BCH":"0.004527","XRP":"4.2854","CLP":"787.1","TEL":"4789.0","NANO":"1.3084","DAI":"0.9913","USDT":"1.0016","AVA":"1.7795"},"GBP":{"BTC":"0.00012306","USD":"1.28","EUR":"1.1","LTC":"0.02835","ETH":"0.003738","DASH":"0.019151","BCH":"0.005824","XRP":"5.5086","TEL":"6153.0","NANO":"1.6812","DAI":"1.2731","USDT":"1.287","AVA":"2.2866"},"EUR":{"BTC":"0.00011217","USD":"1.17","EUR":"1.0","GBP":"0.91","PLN":"4.48","CZK":"26.88","SEK":"10.48","NOK":"10.96","DKK":"7.44","CHF":"1.08","ZAR":"19.54","AUD":"1.64","JPY":"123.56","NZD":"1.77","TRY":"9.06","BRL":"6.61","CAD":"1.56","CNY":"7.95","HKD":"9.07","HUF":"359.08","INR":"85.88","RUB":"90.82","ILS":"4.01","MYR":"4.87","MXN":"25.73","SGD":"1.6","RON":"4.88","PHP":"56.76","ARS":"89.17","THB":"37.05","NGN":"446.36","IDR":"17461.01","COP":"4494.14","PKR":"193.49","AED":"4.3","UAH":"33.2","BGN":"1.95","HRK":"7.56","RSD":"117.61","LTC":"0.02584","ETH":"0.003407","DASH":"0.017455","BCH":"0.005308","XRP":"5.0208","CLP":"921.4","TEL":"5608.0","NANO":"1.5324","DAI":"1.1604","USDT":"1.173","AVA":"2.0842"},"PLN":{"USD":"0.26","BTC":"0.00002502","EUR":"0.22","LTC":"0.005764","ETH":"0.00076001","DASH":"0.003894","BCH":"0.001184","XRP":"1.1201","TEL":"1251.0","NANO":"0.3418","DAI":"0.2589","USDT":"0.2617","AVA":"0.4649"},"CZK":{"USD":"0.0435","BTC":"0.00000417","EUR":"0.0372","LTC":"0.00096124","ETH":"0.00012673","DASH":"0.00064933","BCH":"0.00019745","XRP":"0.1868","TEL":"208.63","NANO":"0.057002","DAI":"0.043167","USDT":"0.043636","AVA":"0.077528"},"SEK":{"USD":"0.11","BTC":"0.0000107","EUR":"0.1","LTC":"0.002465","ETH":"0.00032504","DASH":"0.001665","BCH":"0.00050641","XRP":"0.479","TEL":"535.07","NANO":"0.1462","DAI":"0.1107","USDT":"0.1119","AVA":"0.1988"},"NOK":{"USD":"0.11","BTC":"0.00001023","EUR":"0.09","LTC":"0.002357","ETH":"0.00031072","DASH":"0.001592","BCH":"0.00048411","XRP":"0.4579","TEL":"511.51","NANO":"0.1398","DAI":"0.1058","USDT":"0.107","AVA":"0.1901"},"DKK":{"USD":"0.16","BTC":"0.00001507","EUR":"0.13","LTC":"0.003471","ETH":"0.00045768","DASH":"0.002345","BCH":"0.00071307","XRP":"0.6745","TEL":"753.43","NANO":"0.2059","DAI":"0.1559","USDT":"0.1576","AVA":"0.28"},"CHF":{"USD":"1.09","BTC":"0.00010402","EUR":"0.93","LTC":"0.023964","ETH":"0.00316","DASH":"0.016188","BCH":"0.004923","XRP":"4.6564","TEL":"5201.0","NANO":"1.4211","DAI":"1.0762","USDT":"1.0879","AVA":"1.9328"},"ZAR":{"EUR":"0.05","USD":"0.06","BTC":"0.00000574","LTC":"0.001322","ETH":"0.00017434","DASH":"0.00089325","BCH":"0.00027163","XRP":"0.2569","TEL":"287.0","NANO":"0.078415","DAI":"0.059383","USDT":"0.060028","AVA":"0.1067"},"AUD":{"EUR":"0.61","USD":"0.71","BTC":"0.00006843","LTC":"0.015763","ETH":"0.002078","DASH":"0.010648","BCH":"0.003238","XRP":"3.0629","TEL":"3421.0","NANO":"0.9348","DAI":"0.7079","USDT":"0.7156","AVA":"1.2714"},"JPY":{"EUR":"0.0081","USD":"0.0095","BTC":"0.00000091","LTC":"0.00020912","ETH":"0.00002757","DASH":"0.00014127","BCH":"0.00004296","XRP":"0.040634","TEL":"45.39","NANO":"0.012401","DAI":"0.009391","USDT":"0.009493","AVA":"0.016867"},"NZD":{"EUR":"0.57","USD":"0.66","BTC":"0.00006347","LTC":"0.014621","ETH":"0.001928","DASH":"0.009877","BCH":"0.003003","XRP":"2.841","TEL":"3173.0","NANO":"0.8671","DAI":"0.6566","USDT":"0.6637","AVA":"1.1793"},"TRY":{"EUR":"0.11","USD":"0.13","BTC":"0.00001239","LTC":"0.002853","ETH":"0.00037619","DASH":"0.001927","BCH":"0.00058611","XRP":"0.5544","TEL":"619.28","NANO":"0.1692","DAI":"0.1281","USDT":"0.1295","AVA":"0.2301"},"BRL":{"EUR":"0.15","USD":"0.18","BTC":"0.00001698","LTC":"0.003911","ETH":"0.00051563","DASH":"0.002642","BCH":"0.00080335","XRP":"0.7599","TEL":"848.82","NANO":"0.2319","DAI":"0.1756","USDT":"0.1775","AVA":"0.3154"},"CAD":{"EUR":"0.64","USD":"0.75","BTC":"0.00007198","LTC":"0.016582","ETH":"0.002186","DASH":"0.011201","BCH":"0.003406","XRP":"3.222","TEL":"3599.0","NANO":"0.9833","DAI":"0.7447","USDT":"0.7527","AVA":"1.3374"},"CNY":{"EUR":"0.13","USD":"0.15","BTC":"0.00001411","LTC":"0.003251","ETH":"0.00042856","DASH":"0.002196","BCH":"0.00066771","XRP":"0.6316","TEL":"705.5","NANO":"0.1928","DAI":"0.146","USDT":"0.1476","AVA":"0.2622"},"HKD":{"EUR":"0.11","USD":"0.13","BTC":"0.00001236","LTC":"0.002848","ETH":"0.0003755","DASH":"0.001924","BCH":"0.00058503","XRP":"0.5534","TEL":"618.15","NANO":"0.1689","DAI":"0.1279","USDT":"0.1293","AVA":"0.2297"},"HUF":{"EUR":"0.0028","USD":"0.0033","BTC":"0.00000031","LTC":"0.00007196","ETH":"0.00000949","DASH":"0.00004861","BCH":"0.00001478","XRP":"0.013983","TEL":"15.62","NANO":"0.004269","DAI":"0.003232","USDT":"0.003268","AVA":"0.005806"},"INR":{"EUR":"0.0116","USD":"0.0136","BTC":"0.00000131","LTC":"0.00030087","ETH":"0.00003967","DASH":"0.00020324","BCH":"0.0000618","XRP":"0.058462","TEL":"65.33","NANO":"0.017849","DAI":"0.013511","USDT":"0.013663","AVA":"0.024276"},"RUB":{"EUR":"0.011","USD":"0.0129","BTC":"0.00000124","LTC":"0.00028453","ETH":"0.00003751","DASH":"0.0001922","BCH":"0.00005845","XRP":"0.055285","TEL":"61.78","NANO":"0.016879","DAI":"0.012777","USDT":"0.012921","AVA":"0.022957"},"ILS":{"EUR":"0.25","USD":"0.29","BTC":"0.00002797","LTC":"0.006441","ETH":"0.00084916","DASH":"0.004351","BCH":"0.001323","XRP":"1.2515","TEL":"1398.0","NANO":"0.3821","DAI":"0.2892","USDT":"0.2925","AVA":"0.5197"},"MYR":{"EUR":"0.21","USD":"0.24","BTC":"0.00002304","LTC":"0.005306","ETH":"0.0006995","DASH":"0.003584","BCH":"0.00109","XRP":"1.0309","TEL":"1152.0","NANO":"0.3147","DAI":"0.2383","USDT":"0.2409","AVA":"0.4281"},"MXN":{"EUR":"0.0389","USD":"0.0455","BTC":"0.00000436","LTC":"0.001004","ETH":"0.00013243","DASH":"0.00067849","BCH":"0.00020632","XRP":"0.1952","TEL":"218.08","NANO":"0.059585","DAI":"0.045106","USDT":"0.045613","AVA":"0.08104"},"SGD":{"EUR":"0.62","USD":"0.73","BTC":"0.00007012","LTC":"0.016148","ETH":"0.002129","DASH":"0.010908","BCH":"0.003317","XRP":"3.1376","TEL":"3506.0","NANO":"0.9579","DAI":"0.7251","USDT":"0.7333","AVA":"1.3029"},"RON":{"EUR":"0.21","USD":"0.24","BTC":"0.00002301","LTC":"0.005299","ETH":"0.00069861","DASH":"0.003579","BCH":"0.001088","XRP":"1.0296","TEL":"1150.0","NANO":"0.3143","DAI":"0.238","USDT":"0.2406","AVA":"0.4275"},"IDR":{"EUR":"0.0001","USD":"0.0001","BTC":"0.00000001","LTC":"0.00000148","ETH":"0.0000002","DASH":"0.000001","BCH":"0.0000003","XRP":"0.00028755","TEL":"0.3213","NANO":"0.00008779","DAI":"0.00006646","USDT":"0.0000672","AVA":"0.0001194"},"PHP":{"EUR":"0.0176","USD":"0.0206","BTC":"0.00000198","LTC":"0.00045526","ETH":"0.00006002","DASH":"0.00030754","BCH":"0.00009352","XRP":"0.088461","TEL":"98.85","NANO":"0.027007","DAI":"0.020445","USDT":"0.020674","AVA":"0.036732"},"ARS":{"EUR":"0.0112","USD":"0.0131","BTC":"0.00000126","LTC":"0.00028978","ETH":"0.00003821","DASH":"0.00019575","BCH":"0.00005952","XRP":"0.056306","TEL":"62.92","NANO":"0.017191","DAI":"0.013013","USDT":"0.013159","AVA":"0.023381"},"THB":{"EUR":"0.027","USD":"0.0316","BTC":"0.00000303","LTC":"0.00069752","ETH":"0.00009196","DASH":"0.00047118","BCH":"0.00014328","XRP":"0.1355","TEL":"151.45","NANO":"0.041379","DAI":"0.031324","USDT":"0.031676","AVA":"0.056279"},"NGN":{"EUR":"0.0022","USD":"0.0026","BTC":"0.00000025","LTC":"0.00005789","ETH":"0.00000763","DASH":"0.00003911","BCH":"0.00001189","XRP":"0.011248","TEL":"12.57","NANO":"0.003434","DAI":"0.0026","USDT":"0.002629","AVA":"0.004671"},"COP":{"USD":"0.0003","EUR":"0.0002","BTC":"0.00000002","LTC":"0.00000575","ETH":"0.00000076","DASH":"0.00000388","BCH":"0.00000118","XRP":"0.001117","TEL":"1.2484","NANO":"0.00034108","DAI":"0.0002582","USDT":"0.0002611","AVA":"0.00046391"},"PKR":{"USD":"0.0061","EUR":"0.0052","BTC":"0.00000058","LTC":"0.00013355","ETH":"0.00001761","DASH":"0.00009021","BCH":"0.00002743","XRP":"0.025949","TEL":"29.0","NANO":"0.007922","DAI":"0.005997","USDT":"0.006065","AVA":"0.010775"},"AED":{"USD":"0.27","EUR":"0.23","BTC":"0.0000261","LTC":"0.006009","ETH":"0.00079229","DASH":"0.004059","BCH":"0.001234","XRP":"1.1677","TEL":"1305.0","NANO":"0.3565","DAI":"0.2699","USDT":"0.2729","AVA":"0.4849"},"UAH":{"USD":"0.0353","EUR":"0.0301","BTC":"0.00000338","LTC":"0.0007782","ETH":"0.0001026","DASH":"0.00052568","BCH":"0.00015985","XRP":"0.1512","TEL":"168.96","NANO":"0.046165","DAI":"0.034947","USDT":"0.035339","AVA":"0.062788"},"BGN":{"USD":"0.6","EUR":"0.51","BTC":"0.00005749","LTC":"0.013239","ETH":"0.001745","DASH":"0.008943","BCH":"0.002719","XRP":"2.5724","TEL":"2874.0","NANO":"0.7854","DAI":"0.5945","USDT":"0.6012","AVA":"1.0682"},"HRK":{"USD":"0.15","EUR":"0.13","BTC":"0.00001484","LTC":"0.003417","ETH":"0.0004505","DASH":"0.002308","BCH":"0.00070189","XRP":"0.6639","TEL":"741.89","NANO":"0.2027","DAI":"0.1534","USDT":"0.1552","AVA":"0.2757"},"RSD":{"USD":"0.01","EUR":"0.0085","BTC":"0.00000095","LTC":"0.00021971","ETH":"0.00002897","DASH":"0.00014842","BCH":"0.00004513","XRP":"0.042692","TEL":"47.7","NANO":"0.013034","DAI":"0.009867","USDT":"0.009978","AVA":"0.017727"},"LTC":{"USD":"45.41","EUR":"38.7","GBP":"35.27","PLN":"173.48","CZK":"1040.32","SEK":"405.63","NOK":"424.31","DKK":"288.07","CHF":"41.73","ZAR":"756.24","AUD":"63.44","JPY":"4781.83","NZD":"68.39","TRY":"350.47","BRL":"255.7","CAD":"60.31","CNY":"307.64","HKD":"351.11","HUF":"13896.39","INR":"3323.66","RUB":"3514.61","ILS":"155.26","MYR":"188.48","MXN":"995.6","SGD":"61.93","RON":"188.72","IDR":"675741.04","PHP":"2196.53","ARS":"3450.89","THB":"1433.65","NGN":"17274.07","COP":"173923.13","PKR":"7487.99","AED":"166.41","UAH":"1285.02","BGN":"75.53","HRK":"292.66","RSD":"4551.38","BTC":"0.004343","ETH":"0.1321","DASH":"0.674903","BCH":"0.20538","LTC":"1.0","XRP":"194.2308","CLP":"35658.1","TEL":"217150.0","NANO":"59.3306","DAI":"44.8046","USDT":"45.42","AVA":"80.6949"},"ETH":{"USD":"343.86","EUR":"293.53","GBP":"267.54","PLN":"1315.77","CZK":"7890.59","SEK":"3076.59","NOK":"3218.31","DKK":"2184.94","CHF":"316.5","ZAR":"5735.89","AUD":"481.17","JPY":"36269.03","NZD":"518.75","TRY":"2658.25","BRL":"1939.39","CAD":"457.41","CNY":"2333.37","HKD":"2663.12","HUF":"105400.73","INR":"25209.16","RUB":"26657.42","ILS":"1177.64","MYR":"1429.6","MXN":"7551.4","SGD":"469.71","RON":"1431.42","IDR":"5125329.91","PHP":"16660.14","ARS":"26174.13","THB":"10873.89","NGN":"131019.6","COP":"1319164.25","PKR":"56794.57","AED":"1262.16","UAH":"9746.57","BGN":"572.91","HRK":"2219.75","RSD":"34521.07","BTC":"0.032888","LTC":"7.570023","DASH":"5.1108","BCH":"1.555273","ETH":"1.0","XRP":"1470.84","CLP":"270457.93","TEL":"1644400.0","NANO":"449.8426","DAI":"339.2891","USDT":"343.95","AVA":"611.074"},"DASH":{"BTC":"0.006435","USD":"67.0","EUR":"57.29","GBP":"52.22","PLN":"256.81","CZK":"1540.05","SEK":"600.48","NOK":"628.14","DKK":"426.45","CHF":"61.77","ZAR":"1119.51","AUD":"93.91","JPY":"7078.84","NZD":"101.25","TRY":"518.83","BRL":"378.52","CAD":"89.27","CNY":"455.42","HKD":"519.78","HUF":"20571.69","INR":"4920.22","RUB":"5202.89","ILS":"229.85","MYR":"279.02","MXN":"1473.85","SGD":"91.68","RON":"279.38","IDR":"1000341.19","PHP":"3251.66","ARS":"5108.56","THB":"2122.32","NGN":"25571.88","COP":"257469.15","PKR":"11084.93","AED":"246.34","UAH":"1902.3","BGN":"111.82","HRK":"433.24","RSD":"6737.68","LTC":"1.481695","ETH":"0.195664","BCH":"0.304311","DASH":"1.0","XRP":"287.7907","CLP":"52786.89","TEL":"321750.0","NANO":"87.9098","DAI":"66.3867","USDT":"67.1835","AVA":"119.5652"},"BCH":{"BTC":"0.02114612","USD":"220.91","EUR":"188.4","GBP":"171.72","PLN":"844.52","CZK":"5064.51","SEK":"1974.68","NOK":"2065.65","DKK":"1402.39","CHF":"203.14","ZAR":"3681.53","AUD":"308.83","JPY":"23279.0","NZD":"332.95","TRY":"1706.18","BRL":"1244.78","CAD":"293.58","CNY":"1497.66","HKD":"1709.3","HUF":"67650.66","INR":"16180.31","RUB":"17109.86","ILS":"755.86","MYR":"917.58","MXN":"4846.81","SGD":"301.48","RON":"918.75","IDR":"3289654.06","PHP":"10693.19","ARS":"16799.67","THB":"6979.32","NGN":"84093.93","COP":"846695.55","PKR":"36453.16","AED":"810.11","UAH":"6255.76","BGN":"367.72","HRK":"1424.73","RSD":"22157.09","LTC":"4.869012","ETH":"0.642974","DASH":"3.28611","BCH":"1.0","XRP":"945.712","CLP":"173591.37","TEL":"1057306.0","NANO":"288.8814","DAI":"218.1539","USDT":"220.7723","AVA":"392.9045"},"XRP":{"BTC":"0.00002236","USD":"0.2334","EUR":"0.1992","GBP":"0.1815","PLN":"0.8928","CZK":"5.35","SEK":"2.09","NOK":"2.18","DKK":"1.48","CHF":"0.2148","ZAR":"3.89","AUD":"0.3265","JPY":"24.61","NZD":"0.352","TRY":"1.8","BRL":"1.32","CAD":"0.3104","CNY":"1.58","HKD":"1.81","HUF":"71.52","INR":"17.11","RUB":"18.09","ILS":"0.7991","MYR":"0.97","MXN":"5.12","SGD":"0.3187","RON":"0.9713","IDR":"3477.71","PHP":"11.3","ARS":"17.76","THB":"7.38","NGN":"88.9","COP":"895.1","PKR":"38.54","AED":"0.8564","UAH":"6.61","BGN":"0.3887","HRK":"1.51","RSD":"23.42","LTC":"0.00514851","ETH":"0.00067988","DASH":"0.00347475","BCH":"0.0010574","XRP":"1.0","CLP":"183.51","TEL":"1118.0","NANO":"0.305464","DAI":"0.230677","USDT":"0.2334","AVA":"0.415459"},"CLP":{"EUR":"0.0011","USD":"0.0013","BTC":"0.00000012","LTC":"0.00002804","ETH":"0.0000037","DASH":"0.00001894","BCH":"0.00000576","XRP":"0.005449","TEL":"6.089","NANO":"0.001664","DAI":"0.001259","USDT":"0.001274","AVA":"0.002263"},"TEL":{"BTC":"0.00000002","LTC":"0.00000461","ETH":"0.00000061","DASH":"0.00000311","BCH":"0.00000095","XRP":"0.00089445","TEL":"1.0","USD":"0.000209","EUR":"0.000178","GBP":"0.000163","PLN":"0.000799","CZK":"0.004793","SEK":"0.001869","NOK":"0.001955","DKK":"0.001327","CHF":"0.000192","ZAR":"0.003484","AUD":"0.000292","JPY":"0.022","NZD":"0.000315","TRY":"0.001615","BRL":"0.001178","CAD":"0.000278","CNY":"0.001417","HKD":"0.001618","HUF":"0.064","INR":"0.0153","RUB":"0.0162","ILS":"0.000715","MYR":"0.000868","MXN":"0.004585","SGD":"0.000285","RON":"0.000869","IDR":"3.11","PHP":"0.0101","ARS":"0.0159","THB":"0.006603","NGN":"0.0796","COP":"0.801","PKR":"0.0345","AED":"0.000766","UAH":"0.005918","BGN":"0.000348","HRK":"0.001348","RSD":"0.021","CLP":"0.1642","NANO":"0.00027322","DAI":"0.00020633","USDT":"0.00020881","AVA":"0.00037161"},"NANO":{"BTC":"0.0000732","ETH":"0.00222574","LTC":"0.01685471","DASH":"0.01137529","BCH":"0.00346163","XRP":"3.273703","TEL":"3660.0","NANO":"1.0","USD":"0.7643","EUR":"0.6526","GBP":"0.5948","PLN":"2.93","CZK":"17.54","SEK":"6.84","NOK":"7.16","DKK":"4.86","CHF":"0.7037","ZAR":"12.75","AUD":"1.07","JPY":"80.64","NZD":"1.15","TRY":"5.91","BRL":"4.31","CAD":"1.02","CNY":"5.19","HKD":"5.92","HUF":"234.25","INR":"56.03","RUB":"59.25","ILS":"2.62","MYR":"3.18","MXN":"16.78","SGD":"1.04","RON":"3.18","IDR":"11390.96","PHP":"37.03","ARS":"58.17","THB":"24.17","NGN":"291.19","COP":"2931.82","PKR":"126.23","AED":"2.81","UAH":"21.66","BGN":"1.27","HRK":"4.93","RSD":"76.72","CLP":"601.09","DAI":"0.755168","USDT":"0.7642","AVA":"1.360089"},"DAI":{"BTC":"0.00009693","LTC":"0.02231916","ETH":"0.00294734","DASH":"0.01506326","BCH":"0.00458392","XRP":"4.335067","TEL":"4846.6","NANO":"1.324209","DAI":"1.0","USD":"1.01","EUR":"0.8618","GBP":"0.7855","PLN":"3.86","CZK":"23.17","SEK":"9.03","NOK":"9.45","DKK":"6.41","CHF":"0.9292","ZAR":"16.84","AUD":"1.41","JPY":"106.48","NZD":"1.52","TRY":"7.8","BRL":"5.69","CAD":"1.34","CNY":"6.85","HKD":"7.82","HUF":"309.44","INR":"74.01","RUB":"78.26","ILS":"3.46","MYR":"4.2","MXN":"22.17","SGD":"1.38","RON":"4.2","IDR":"15047.37","PHP":"48.91","ARS":"76.84","THB":"31.92","NGN":"384.66","COP":"3872.91","PKR":"166.74","AED":"3.71","UAH":"28.61","BGN":"1.68","HRK":"6.52","RSD":"101.35","CLP":"794.03","USDT":"1.01121","AVA":"1.801042"},"USDT":{"LTC":"0.02201673","ETH":"0.0029074","BCH":"0.004522","XRP":"4.28449","TEL":"4781.13","NANO":"1.308558","DAI":"0.988914","USDT":"1.0","USD":"0.9984","EUR":"0.8525","GBP":"0.777","PLN":"3.82","CZK":"22.92","SEK":"8.94","NOK":"9.35","DKK":"6.35","CHF":"0.9192","ZAR":"16.66","AUD":"1.4","JPY":"105.34","NZD":"1.51","TRY":"7.72","BRL":"5.63","CAD":"1.33","CNY":"6.78","HKD":"7.73","HUF":"306.01","INR":"73.19","RUB":"77.39","ILS":"3.42","MYR":"4.15","MXN":"21.92","SGD":"1.36","RON":"4.16","IDR":"14880.25","PHP":"48.37","ARS":"75.99","THB":"31.57","NGN":"380.39","COP":"3829.9","PKR":"164.89","AED":"3.66","UAH":"28.3","BGN":"1.66","HRK":"6.44","RSD":"100.22","CLP":"785.21","BTC":"0.00009562","DASH":"0.01485978","AVA":"1.776713"},"AVA":{"AVA":"1.0","BTC":"0.00005382","LTC":"0.01239236","ETH":"0.00163646","DASH":"0.00836364","BCH":"0.00254515","XRP":"2.406977","TEL":"2691.0","NANO":"0.735246","DAI":"0.555234","USDT":"0.562837","USD":"0.562","EUR":"0.4798","GBP":"0.4373","PLN":"2.15","CZK":"12.9","SEK":"5.03","NOK":"5.26","DKK":"3.57","CHF":"0.5174","ZAR":"9.38","AUD":"0.7866","JPY":"59.29","NZD":"0.848","TRY":"4.35","BRL":"3.17","CAD":"0.7477","CNY":"3.81","HKD":"4.35","HUF":"172.23","INR":"41.19","RUB":"43.56","ILS":"1.92","MYR":"2.34","MXN":"12.34","SGD":"0.7675","RON":"2.34","IDR":"8375.16","PHP":"27.22","ARS":"42.77","THB":"17.77","NGN":"214.1","COP":"2155.61","PKR":"92.81","AED":"2.06","UAH":"15.93","BGN":"0.9362","HRK":"3.63","RSD":"56.41","CLP":"441.95"}};

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
var displayCurrency = mobx.observable.box('RON');
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
  // servicii: {
  //   type: 'array',
  //   ref: 'serviciu',
  //   value: ({ activeDoc }) => activeDoc.servicii
  // },
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
var predefinite = ['apa', 'el', 'gaze', 'termo', 'net', 'gunoi'];
var hooks = {
  onFirstTimeSubscribe: function (_a) {
    var put = _a.put;
    predefinite.map(function (service) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , put(service)];

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
        "preferinte": "Preferences"
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
        "furnizorId": "provider",
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
    "servicii": {
      "name": "Service",
      "plural": "Services",
      "predefinite": {
        "apa": "Water",
        "el": "Electricity",
        "gaze": "Gas",
        "termo": "Heating",
        "net": "Internet",
        "gunoi": "Exhaust garbage"
      },
      "fields": {
        "denumire": "Name"
      }
    },
    "utilizatori": {
      "name": "Username",
      "plural": "Users",
      "new": {
        "title": "Let's get acquainted !"
      },
      "fields": {
        "name": "full Name",
        "avatar": "Avatar",
        "contact": "contact details",
        "tel": "phone number",
        "email": "e-mail",
        "social": "social l Media",
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
      "missingDB": "Database unspecified invalid",
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
        "registru": "Registro"
      },
      "fields": {
        "nr": "N",
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
        "blocId": "gastos de Bloque de construcción",
        "asociatieId": "Asociación / Asociación"
      }
    },
    "asociatii": {
      "name": "",
      "plural": "Asociaciones",
      "fields": {
        "name": "Nombre",
        "organizatie": "Organización",
        "balanta": "",
        "utilizatori": "Usuarios de equilibrio",
        "preferinte": "Preferencias"
      }
    },
    "blocuri": {
      "name": "Construcción",
      "plural": "Edificios",
      "fields": {
        "name": "Identificación",
        "scari": "escaleras",
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
        "nrFactura": "",
        "dataScadenta": "Nº de vencimiento",
        "furnizorId": "proveedor de la empresa",
        "asociatieId": ""
      }
    },
    "furnizori": {
      "name": "",
      "plural": "Proveedores proveedor",
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
    "servicii": {
      "name": "Nº Servicio",
      "plural": "Servicios",
      "predefinite": {
        "apa": "agua",
        "el": "Electricidad",
        "gaze": "Gas",
        "termo": "Calefacción",
        "net": "Internet",
        "gunoi": "basura de escape"
      },
      "fields": {
        "denumire": "Nombre"
      }
    },
    "utilizatori": {
      "name": "Nombre de usuario",
      "plural": "",
      "new": {
        "title": "Los usuarios de Let pasos para familiarizarse"
      },
      "fields": {
        "name": "Nombre completo",
        "avatar": "Avatar",
        "contact": "datos de contacto",
        "tel": "teléfono",
        "email": "e-mail",
        "social": "sociales l Medios",
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
      "missingDB": "Base de datos no válido no especificado",
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
        "registru": "Inscrivez-vous"
      },
      "fields": {
        "nr": "",
        "suprafata": "Non Taille",
        "locatari": "locataires",
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
        "preferinte": "Préférences"
      }
    },
    "blocuri": {
      "name": "",
      "plural": "SCHÉMA Bâtiments",
      "fields": {
        "name": "ID",
        "scari": "escalier",
        "adresa": "Adresse",
        "asociatieId": ""
      }
    },
    "cheltuieli": {
      "name": "",
      "plural": "frais Société",
      "fields": {
        "catre": "frais de montant",
        "suma": "",
        "facturi": "",
        "dataScadenta": "Les factures échéance",
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
        "dataScadenta": "échéance",
        "furnizorId": "fournisseur",
        "asociatieId": "Société"
      }
    },
    "furnizori": {
      "name": "fournisseur",
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
    "servicii": {
      "name": "",
      "plural": "services",
      "predefinite": {
        "apa": "eau",
        "el": "Electricité",
        "gaze": "gaz",
        "termo": "chauffage",
        "net": "Internet",
        "gunoi": "ordures"
      },
      "fields": {
        "denumire": "Nom"
      }
    },
    "utilizatori": {
      "name": "Exhaust Nom d'utilisateur",
      "plural": "Les utilisateurs",
      "new": {
        "title": "Faisons connaissance !"
      },
      "fields": {
        "name": "Nom complet",
        "avatar": "Avatar",
        "contact": "coordonnées",
        "tel": "numéro de téléphone",
        "email": "e-mail",
        "social": "sociale l",
        "preferinte": "Médias Préférences",
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
      "missingDB": "Base de données non valide non spécifiée",
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
        preferinte: 'Preferințe'
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
    servicii: {
      name: 'Serviciu',
      plural: 'Servicii',
      predefinite: {
        apa: 'Apă',
        el: 'Electricitate',
        gaze: 'Gaze naturale',
        termo: 'Termoficare',
        net: 'Internet',
        gunoi: 'Evacuare gunoi menajer'
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
