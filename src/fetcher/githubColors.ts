import axios from "axios";
import jsYaml from "js-yaml";


const fetchColors = async () => {
    const { data } = await axios.get("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml") as any;
    const languages: any = jsYaml.load(data);

    const languageColors: { [key: string]: string } = {};


    for (let langKey in languages) {
        languageColors[langKey] = languages[langKey].color || "red";
    }

    return languageColors;

}

export {
    fetchColors
}