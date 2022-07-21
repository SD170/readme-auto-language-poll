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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDetails = void 0;
const octokit_1 = require("octokit");
const octokit = new octokit_1.Octokit({ auth: process.env.GHUB_PERSONAL_ACCESS_TOKEN });
const decimalPrecision = Number(process.env.DECIMAL_PRECISON || 1);
const fetchDetails = () => __awaiter(void 0, void 0, void 0, function* () {
    const languages = {};
    const languagesSorted = [];
    const topics = {};
    const names = [];
    let total = 0;
    // api call
    const res = yield octokit.request("GET /user/repos", {
        visibility: "public",
        per_page: 100
    });
    res.data.forEach(repo => {
        if (repo.language && repo.size) {
            languages[repo.language] |= 0; // casting to 0 for undefined
            languages[repo.language] += repo.size;
            total += repo.size;
        }
        if (repo.topics) {
            repo.topics.forEach(topic => {
                topics[topic] |= 0;
                topics[topic] += 1;
            });
        }
        if (repo.name) {
            names.push(repo.name);
        }
    });
    for (const key in languages) {
        // console.log(`${key}: ${languages[key]}`);
        languages[key] = roundNumber(((languages[key] / total) * 100), decimalPrecision);
    }
    for (let langKey in languages) {
        const lang = {};
        lang[langKey] = languages[langKey];
        languagesSorted.push(lang);
    }
    languagesSorted.sort(function (a, b) {
        return (Object.values(a)[0] > Object.values(b)[0]) ? -1 : 0;
    });
    // console.log(languages);
    // console.log(names);
    // console.log(names.length);
    return {
        languages,
        topics,
        languagesSorted
    };
});
exports.fetchDetails = fetchDetails;
const roundNumber = (value, decimalPlaces) => {
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
};
