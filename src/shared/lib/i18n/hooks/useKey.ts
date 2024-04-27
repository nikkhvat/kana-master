import React from "react";

import { useTranslation } from "react-i18next";

import { useTransliterationsContext } from "@/features/settings/settings-transliterations/context/transliteration";
import { languageRomanji } from "@/shared/constants/language";
import { ILetter } from "@/shared/data/lettersTable";

const useGetRomanji = () => {
  const { i18n: { language } } = useTranslation();

  const { transliterations } = useTransliterationsContext();

  const key = languageRomanji.includes(language as "en") ? language : "en";

  return {
    getRomanji: (letter: ILetter) => {      
      return letter.transliterations?.[transliterations];
    },
    key: key as "en",
    transliterations
  };
};

export default useGetRomanji;