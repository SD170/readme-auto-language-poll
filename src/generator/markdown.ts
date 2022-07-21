import * as fs from "fs";
import Mustache from "mustache";
import path from "path";
import { generateLangBar } from "./languagePoll";
// const Mustache = require('mustache');
const MUSTACHE_TEMPLATE_DIR = '/assets/templates/markdown.mustache';
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
*/
interface markdownOutline {
    language_bar: string
}
const DATA: Partial<markdownOutline> = {
    language_bar:"./assets/generated/language-bar.svg"
}
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
    return new Promise<void>((resolve, reject) => {
        fs.readFile(path.join(process.cwd() + MUSTACHE_TEMPLATE_DIR), async (err, mustacheTemplate) => {
            // console.log(path.join(__dirname + MUSTACHE_TEMPLATE_DIR),"Sss");
            // console.log(MUSTACHE_TEMPLATE_DIR,"Sss");
            // console.log(path.join(process.cwd() + "/assets/templates/markdown.mustache"),"Sss");
            if (err) reject(err);
            // generating md
            const output = Mustache.render(mustacheTemplate.toString(), DATA);
            await generateLangBar();
            fs.writeFileSync('README.md', output);
            resolve()
        });
    })
}


export {
    generateReadMe
}