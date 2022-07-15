require('dotenv').config({ path: __dirname+'/../.env' });

import { fetchDetails } from "./fetcher/github";

//load env vars
// dotenv.config({ path: './.env' });


(async () => {
    const res = await fetchDetails();
    console.log(res);
})()
