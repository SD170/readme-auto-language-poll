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
exports.generateReadMe = void 0;
const fs = __importStar(require("fs"));
const mustache_1 = __importDefault(require("mustache"));
const path_1 = __importDefault(require("path"));
const languagePoll_1 = require("./languagePoll");
// const Mustache = require('mustache');
const MUSTACHE_TEMPLATE_DIR = '/assets/templates/markdown.mustache';
const DATA = {
    language_bar: "./assets/generated/language-bar.svg"
};
/**
  * A - We open 'template.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
// const generateReadMe = () => {
//     // Take note that a relative path will be resolved against process.cwd()
//     fs.readFile(path.join(__dirname + MUSTACHE_TEMPLATE_DIR), (err, mustacheTemplate) => {
//         if (err) throw (err);
//         fs.readFile(path.join(__dirname + LANGUAGE_BAR_DIR), (err, langBar) => {
//             if (err) throw (err);
//             DATA.language_bar = langBar.toString();
//             console.log(DATA);
//             // generating md
//             const output = Mustache.render(mustacheTemplate.toString(), DATA);
//             fs.writeFileSync('README.md', output);
//         })
//     });
// }
const generateReadMe = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path_1.default.join(process.cwd() + MUSTACHE_TEMPLATE_DIR), (err, mustacheTemplate) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log(path.join(__dirname + MUSTACHE_TEMPLATE_DIR),"Sss");
            // console.log(MUSTACHE_TEMPLATE_DIR,"Sss");
            // console.log(path.join(process.cwd() + "/assets/templates/markdown.mustache"),"Sss");
            if (err)
                reject(err);
            // generating md
            const output = mustache_1.default.render(mustacheTemplate.toString(), DATA);
            yield (0, languagePoll_1.generateLangBar)();
            fs.writeFileSync('README.md', output);
            resolve();
        }));
    });
};
exports.generateReadMe = generateReadMe;
