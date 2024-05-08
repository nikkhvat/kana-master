import { useTranslation } from "react-i18next";

import { useTransliterationsContext } from "@/features/settings/settings-transliterations/context/transliteration";
import { languageRomanji, lessonsLang, wordsLang } from "@/shared/constants/language";
import { ILetter } from "@/shared/data/lettersTable";

const useGetRomanji = () => {
  const { i18n: { language } } = useTranslation();

  const { transliterations } = useTransliterationsContext();

  const key = languageRomanji.includes(language as "en") ? language : "en";
  const wordKey = wordsLang.includes(language as "en") ? language : "en";
  const lessonsKey = lessonsLang.includes(language as "en") ? language : "en";

  return {
    getRomanji: (letter: ILetter) => {      
      return letter.transliterations?.[transliterations];
    },
    key: key as "en",
    wordKey: wordKey as "en",
    lessonsKey: lessonsKey as "en",
    transliterations
  };
};

export default useGetRomanji;