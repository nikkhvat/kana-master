import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import English from "./languages/english";
import Russian from "./languages/russian";

const resources = {
	en: { translation: English },
	ru: { translation: Russian }
};

i18n
	.use(initReactI18next)
	.init({
		compatibilityJSON: "v3",
		resources,
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		}
	});


export default i18n;