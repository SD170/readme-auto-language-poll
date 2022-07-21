import path from 'path';
// require('dotenv').config({ path: path.join(process.cwd()+'/.env') });

import { generateReadMe } from "./generator/markdown";

//load env vars
// dotenv.config({ path: './.env' });

(async () => {
    await generateReadMe();
})()
