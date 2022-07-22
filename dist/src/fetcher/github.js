"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDetails = void 0;
var octokit_1 = require("octokit");
var octokit = new octokit_1.Octokit({ auth: process.env.GHUB_PERSONAL_ACCESS_TOKEN });
var decimalPrecision = Number(process.env.DECIMAL_PRECISION || 1);
var fetchDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
    var languages, languagesSorted, topics, names, total, res, key, langKey, lang;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                languages = {};
                languagesSorted = [];
                topics = {};
                names = [];
                total = 0;
                return [4 /*yield*/, octokit.request("GET /user/repos", {
                        visibility: "public",
                        per_page: 100
                    })];
            case 1:
                res = _a.sent();
                res.data.forEach(function (repo) {
                    if (repo.language && repo.size) {
                        languages[repo.language] |= 0; // casting to 0 for undefined
                        languages[repo.language] += repo.size;
                        total += repo.size;
                    }
                    if (repo.topics) {
                        repo.topics.forEach(function (topic) {
                            topics[topic] |= 0;
                            topics[topic] += 1;
                        });
                    }
                    if (repo.name) {
                        names.push(repo.name);
                    }
                });
                for (key in languages) {
                    // console.log(`${key}: ${languages[key]}`);
                    languages[key] = roundNumber(((languages[key] / total) * 100), decimalPrecision);
                }
                for (langKey in languages) {
                    lang = {};
                    lang[langKey] = languages[langKey];
                    languagesSorted.push(lang);
                }
                languagesSorted.sort(function (a, b) {
                    return (Object.values(a)[0] > Object.values(b)[0]) ? -1 : 0;
                });
                // console.log(languages);
                // console.log(names);
                // console.log(names.length);
                return [2 /*return*/, {
                        languages: languages,
                        topics: topics,
                        languagesSorted: languagesSorted
                    }];
        }
    });
}); };
exports.fetchDetails = fetchDetails;
var roundNumber = function (value, decimalPlaces) {
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
};
