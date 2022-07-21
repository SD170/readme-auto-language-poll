import path from 'path';
require('dotenv').config({ path: path.join(process.cwd()+'/.env') });

import { fetchDetails } from "./fetcher/github";
import { fetchColors } from "./fetcher/githubColors";
import { generateReadMe } from "./generator/markdown";

//load env vars
// dotenv.config({ path: './.env' });

(async () => {
    // const res = await fetchDetails();
    // const res2 = await fetchColors();
    await generateReadMe();
    // console.log(res);
    // console.log(res2);
})()
