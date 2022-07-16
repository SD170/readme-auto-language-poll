require('dotenv').config({ path: __dirname+'/.env' });

import { fetchDetails } from "./fetcher/github";
import { generateReadMe } from "./generator/markdown";

//load env vars
// dotenv.config({ path: './.env' });


(async () => {
    // const res = await fetchDetails();
    await generateReadMe();
    // console.log(res);
})()
