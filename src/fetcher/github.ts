import { Octokit, App } from "octokit";


const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });
const decimalPrecision = Number(process.env.DECIMAL_PRECISION || 1);

interface languageOutline {
    [key: string]: number;  // n no of keys with number type value
}
interface topicOutline {
    [key: string]: number;
}
type eachLang = { [key: string]: number }

const fetchDetails = async (): Promise<{ languages: languageOutline; topics: topicOutline; languagesSorted: eachLang[] }> => {

    const languages: languageOutline = {};
    const languagesSorted: eachLang[] = [];
    const topics: topicOutline = {};
    const names: string[] = [];
    let total: number = 0;


    // api call
    const res = await octokit.request("GET /user/repos", {
        visibility: "public",
        per_page: 100
    });


    res.data.forEach(repo => {
        if (repo.language && repo.size) {
            languages[repo.language] |= 0; // casting to 0 for undefined
            languages[repo.language] += repo.size;
            total += repo.size;
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
    for (const key in languages) {
        // console.log(`${key}: ${languages[key]}`);
        languages[key] = roundNumber(((languages[key] / total) * 100), decimalPrecision)
    }

    for (let langKey in languages) {
        const lang: eachLang = {};
        lang[langKey] = languages[langKey]
        languagesSorted.push(lang);
    }

    languagesSorted.sort(function (a, b) {

        return (Object.values(a)[0] > Object.values(b)[0]) ? -1 : 0;
    });

    // console.log(languages);
    // console.log(names);
    // console.log(names.length);
    return {
        languages,
        topics,
        languagesSorted
    }
}


const roundNumber = (value: number, decimalPlaces: number): number => {
    return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces)
}


export {
    fetchDetails
}