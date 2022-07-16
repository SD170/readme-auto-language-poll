import * as fs from "fs";
import Mustache from "mustache";
import path from "path";
// const Mustache = require('mustache');
const LANGUAGE_BAR_DIR = '/../../assets/templates/language-bar.mustache';
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
*/
interface langBarOutline {
    // data: string
}
const DATA: Partial<langBarOutline> = {}
/**
  * A - We open 'template.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */

const generateLangBar = () => {
    return new Promise<void>((resolve, reject) => {

        fs.readFile(path.join(__dirname + LANGUAGE_BAR_DIR), (err, langBarTemplate) => {
            if (err) reject(err);
            // DATA.language_bar = langBarTemplate.toString();

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