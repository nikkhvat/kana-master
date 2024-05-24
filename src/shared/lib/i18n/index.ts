import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import English from "./languages/english";
import Russian from "./languages/russian";
import German from "./languages/german";
import Spanish from "./languages/spanish";
import French from "./languages/french";
import Italian from "./languages/italian";
import Portuguese from "./languages/portuguese";

const resources = {
	en: { translation: English },
	ru: { translation: Russian },
	de: { translation: German },
	es: { translation: Spanish },
	fr: { translation: French },
	it: { translation: Italian },
	pt: { translation: Portuguese },
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