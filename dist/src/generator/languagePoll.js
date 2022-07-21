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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLangBar = void 0;
const fs = __importStar(require("fs"));
const mustache_1 = __importDefault(require("mustache"));
const path_1 = __importDefault(require("path"));
const github_1 = require("../fetcher/github");
const githubColors_1 = require("../fetcher/githubColors");
// const Mustache = require('mustache');
const LANGUAGE_BAR_DIR = '/assets/templates/language-bar.mustache';
let totalBars = Number(process.env.LANGUAGE_COUNT || 5);
let DATA = {
// bars:[]
};
const intialBar = {
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
const populateData = () => __awaiter(void 0, void 0, void 0, function* () {
    const { languages, languagesSorted } = yield (0, github_1.fetchDetails)();
    totalBars = (totalBars < languagesSorted.length) ? totalBars : languagesSorted.length;
    const languageColors = yield (0, githubColors_1.fetchColors)();
    const langBar = {
        bars: []
    };
    // console.log(languageColors,"languageColors");
    for (let i = 0; i < totalBars; i++) {
        const bar = {
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
    return langBar;
});
const generateLangBar = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path_1.default.join(process.cwd() + LANGUAGE_BAR_DIR), (err, langBarTemplate) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                reject(err);
            DATA = yield populateData();
            DATA.xaxisW = totalBars * 31;
            // generating md
            const output = mustache_1.default.render(langBarTemplate.toString(), DATA);
            // Take note that here a relative path will be resolved against process.cwd() [which is the root]
            fs.writeFileSync('./assets/generated/language-bar.svg', output);
            resolve();
        }));
    });
};
exports.generateLangBar = generateLangBar;
