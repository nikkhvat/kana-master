export enum ShortLanguage {
  EN = "en",
  ES = "es",
  FR = "fr",
  DE = "de",
  RU = "ru",
  IT = "it",
  PT = "pt",
};

export type LanguageKeys = "en" | "es" | "fr" | "de" | "ru" | "it" | "pt"

export const LanguageName = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
  it: "Italiano",
  pt: "Português",
};

export const languageRomanji: ("en" | "ru")[] = ["en", "ru"];
export const wordsLang: ("en" | "ru")[] = ["en", "ru"];
export const lessonsLang: ("en" | "ru" | "de" | "es" | "fr" | "it" | "pt")[] = [
  "en", "ru", "de", "es", "fr", "it", "pt"
];

export const enumerationLanguageList = [
  ShortLanguage.EN,
  ShortLanguage.ES,
  ShortLanguage.FR,
  ShortLanguage.DE,
  ShortLanguage.IT,
  ShortLanguage.RU,
  ShortLanguage.PT,
];

export const languageList = [
  { title: LanguageName.en, key: ShortLanguage.EN },
  { title: LanguageName.es, key: ShortLanguage.ES },
  { title: LanguageName.fr, key: ShortLanguage.FR },
  { title: LanguageName.ru, key: ShortLanguage.RU },
  { title: LanguageName.pt, key: ShortLanguage.PT },
  { title: LanguageName.de, key: ShortLanguage.DE },
  { title: LanguageName.it, key: ShortLanguage.IT },
];