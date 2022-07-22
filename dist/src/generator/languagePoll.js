"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLangBar = void 0;
var fs = __importStar(require("fs"));
var mustache_1 = __importDefault(require("mustache"));
var path_1 = __importDefault(require("path"));
var github_1 = require("../fetcher/github");
var githubColors_1 = require("../fetcher/githubColors");
// const Mustache = require('mustache');
var LANGUAGE_BAR_DIR = '/assets/templates/language-bar.mustache';
var totalBars = Number(process.env.LANGUAGE_COUNT || 5);
var DATA = {
// bars:[]
};
var intialBar = {
    lineX: 11.5,
    lineY1: 11,
    lineY2: 150,
    rectX: 12,
    rectY: 50,
    rectW: 20,
    rectH: 100,
    cirX: 22,
    cirY: 50,
    cirR: 10,
    textX: 9,
    percentage: 0,
    langName: "",
    color: "black",
    idx: 0
};
/**
  * A - We open 'template.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
var populateData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, languages, languagesSorted, languageColors, langBar, i, bar;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, github_1.fetchDetails)()];
            case 1:
                _a = _b.sent(), languages = _a.languages, languagesSorted = _a.languagesSorted;
                totalBars = (totalBars < languagesSorted.length) ? totalBars : languagesSorted.length;
                return [4 /*yield*/, (0, githubColors_1.fetchColors)()];
            case 2:
                languageColors = _b.sent();
                langBar = {
                    bars: []
                };
                // console.log(languageColors,"languageColors");
                for (i = 0; i < totalBars; i++) {
                    bar = {
                        lineX: intialBar.lineX + (i * 30),
                        lineY1: intialBar.lineY1,
                        lineY2: intialBar.lineY2,
                        rectX: intialBar.rectX + (i * 30),
                        rectY: intialBar.rectY + (100 - Object.values(languagesSorted[i])[0]),
                        rectW: intialBar.rectW,
                        rectH: Object.values(languagesSorted[i])[0],
                        cirX: intialBar.cirX + (i * 30),
                        cirY: intialBar.cirY + (100 - Object.values(languagesSorted[i])[0]),
                        cirR: intialBar.cirR,
                        textX: intialBar.textX + (i * 30),
                        percentage: Object.values(languagesSorted[i])[0],
                        langName: Object.keys(languagesSorted[i])[0],
                        color: languageColors[Object.keys(languagesSorted[i])[0]],
                        idx: i
                    };
                    // console.log(Object.keys(languagesSorted[i])[0]);
                    langBar.bars.push(bar);
                }
                return [2 /*return*/, langBar];
        }
    });
}); };
var generateLangBar = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile(path_1.default.join(process.cwd() + LANGUAGE_BAR_DIR), function (err, langBarTemplate) { return __awaiter(void 0, void 0, void 0, function () {
            var output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err)
                            reject(err);
                        return [4 /*yield*/, populateData()];
                    case 1:
                        DATA = _a.sent();
                        DATA.xaxisW = totalBars * 31;
                        output = mustache_1.default.render(langBarTemplate.toString(), DATA);
                        // Take note that here a relative path will be resolved against process.cwd() [which is the root]
                        fs.writeFileSync('./assets/generated/language-bar.svg', output);
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
exports.generateLangBar = generateLangBar;
