import path from 'path';
require('dotenv').config({ path: path.join(process.cwd()+'/.env') });

import { generateReadMe } from "./generator/markdown";

(async () => {
    await generateReadMe();
})()
