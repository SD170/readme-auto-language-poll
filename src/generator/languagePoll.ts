import * as fs from "fs";
import Mustache from "mustache";
import path from "path";
import { fetchDetails } from "../fetcher/github";
import { fetchColors } from "../fetcher/githubColors";
// const Mustache = require('mustache');
const LANGUAGE_BAR_DIR = '/../../assets/templates/language-bar.mustache';
let totalBars = Number(process.env.LANGUAGE_COUNT || 3);
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
*/
interface barOutline {
    lineX: number
    lineY1: number
    lineY2: number
    rectX: number
    rectY: number
    rectW: number
    rectH: number
    cirX: number
    cirY: number
    cirR: number
    textX: number
    percentage: number
    langName: string
    color: string
    idx: number

}
interface langBarOutline {
    bars: Partial<barOutline>[]
    xaxisW?: number
}
let DATA: Partial<langBarOutline> = {
    // bars:[]
}

const intialBar: barOutline = {
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
    idx:0

}
/**
  * A - We open 'template.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */

const populateData = async () => {
    const { languages, languagesSorted } = await fetchDetails();
    totalBars = (totalBars<languagesSorted.length)?totalBars:languagesSorted.length;
    const languageColors = await fetchColors();
    const langBar: langBarOutline = {
        bars: []
    };
    // console.log(languageColors,"languageColors");
    for (let i = 0; i < totalBars; i++) {
        const bar: barOutline = {
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
            idx:i

        }
        // console.log(Object.keys(languagesSorted[i])[0]);
        langBar.bars.push(bar);

    }

    return langBar;

}


const generateLangBar = () => {
    return new Promise<void>((resolve, reject) => {

        fs.readFile(path.join(__dirname + LANGUAGE_BAR_DIR), async (err, langBarTemplate) => {
            if (err) reject(err);
            DATA = await populateData();
            DATA.xaxisW = totalBars * 31;
            // generating md
            const output = Mustache.render(langBarTemplate.toString(), DATA);
            // Take note that here a relative path will be resolved against process.cwd() [which is the root]
            fs.writeFileSync('./assets/generated/language-bar.svg', output);
            resolve()
        })
    });

}


export {
    generateLangBar
}