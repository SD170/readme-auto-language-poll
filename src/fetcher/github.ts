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


    // api call
    const res = await octokit.request("GET /user/repos", {
        visibility: "public"
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
    });

    // console.log(languages);
    // console.log(topics);
    return {
        languages,
        topics
    }
}



export {
    fetchDetails
}