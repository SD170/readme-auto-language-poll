import { Octokit, App } from "octokit";


const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

interface languageOutline {
    [key: string]: number;  // n no of keys with number type value
}interface topicOutline {
    [key: string]: number;
}
const fetchDetails = async (): Promise<{ languages: languageOutline; topics: topicOutline; }> => {

    const languages: languageOutline = {};
    const topics: topicOutline = {};
    const names:string[] = [];


    // api call
    const res = await octokit.request("GET /user/repos", {
        visibility: "public",
        per_page:100
    });


    res.data.forEach(repo => {
        if (repo.language && repo.size) {
            languages[repo.language] |= 0; // casting to 0 for undefined
            languages[repo.language] += repo.size;
        }
        if (repo.topics) {
            repo.topics.forEach(topic => {
                topics[topic] |= 0;
                topics[topic] += 1;
            })
        }
        if (repo.name) {
            names.push(repo.name);
        }
    });

    // console.log(languages);
    console.log(names);
    console.log(names.length);
    return {
        languages,
        topics
    }
}



export {
    fetchDetails
}