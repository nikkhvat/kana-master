export enum ShortLanguage {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
  RU = "ru",
  IT = "it",
}

export type LanguageKeys = "en" | "es" | "fr" | "de" | "ru" | "it"

export const LanguageName = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
  it: "Italiano",
};

export const languageRomanji: ("en" | "ru")[] = ["en", "ru"];
export const wordsLang: ("en" | "ru")[] = ["en", "ru"];

export const enumerationLanguageList = [
  ShortLanguage.EN,
  ShortLanguage.ES,
  ShortLanguage.FR,
  ShortLanguage.DE,
  ShortLanguage.IT,
  ShortLanguage.RU,
];

export const languageList = [
  { title: LanguageName.en, key: ShortLanguage.EN },
  // { title: LanguageName.es, key: ShortLanguage.ES },
  // { title: LanguageName.fr, key: ShortLanguage.FR },
  { title: LanguageName.ru, key: ShortLanguage.RU },
  // { title: LanguageName.de, key: ShortLanguage.DE },
  // { title: LanguageName.it, key: ShortLanguage.IT },
];