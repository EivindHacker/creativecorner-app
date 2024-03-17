import {avialableLanguages, updateLanguage} from "./responseMessages.mjs";

export default function reInitLanguage(language) {
	if (language == avialableLanguages[language]) {
		updateLanguage(language);
		return language;
	} else {
		updateLanguage(avialableLanguages.en);
		return avialableLanguages.en;
	}
}
