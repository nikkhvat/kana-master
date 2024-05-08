import { base } from "../lettersTable";

import { lessonIntroduction as lessonIntroductionEn } from "./lessons/en/0-introduction";
import { dakuonAndHandakuonLesson as dakuonAndHandakuonLessonEn } from "./lessons/en/1-dakuon-and-handakuon";
import { longVowels as longVowelsEn } from "./lessons/en/2-long-vowels";
import { longConsonants as longConsonantsEn } from "./lessons/en/3-long-consonants";
import { lessonIntroduction as lessonIntroductionRu } from "./lessons/ru/0-introduction";
import { dakuonAndHandakuonLesson as dakuonAndHandakuonLessonRu } from "./lessons/ru/1-dakuon-and-handakuon";
import { longVowels as longVowelsRu } from "./lessons/ru/2-long-vowels";
import { longConsonants as longConsonantsRu } from "./lessons/ru/3-long-consonants";

import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";

export const chapter1 = (lang: "ru" | "en"): (AutoLesson | ManuallyLesson)[] => [
  lang === "en" ? lessonIntroductionEn : lessonIntroductionRu,
  {
    id: "3a060caa-ac2f-42cb-a901-c19848e9d5c5",
    title: base[0][0],
    letters: base[0],
    msg: "lessonsList.firstLessonInSectionTitle",
  },
  {
    id: "2fa83f16-0848-49ea-a910-3e09dbd95de8",
    title: base[1][0],
    letters: base[1],
    msg: "lessonsList.continuingLessonsTitle",
  },
  {
    id: "17da3959-de2c-40e6-a1aa-8cbe5237f818",
    title: base[2][0],
    letters: base[2],
    msg: "lessonsList.continuingLessonsTitle",
  },
  {
    id: "f2b99593-28bb-43dd-9983-ea2668af30ab",
    title: base[3][0],
    letters: base[3],
    msg: "lessonsList.continuingLessonsTitle",
  },
  {
    id: "404f7e6c-864e-4ec0-8039-f3b59c6e611d",
    title: base[4][0],
    letters: base[4],
    msg: "lessonsList.continuingLessonsTitle",
  },
  {
    id: "dea61dc7-dfe3-41c0-890f-028cbf27bf3d",
    title: base[5][0],
    letters: base[5],
    msg: "lessonsList.continuingLessonsTitle",
  },
  {
    id: "75a8dbb6-7cfd-4e69-9ad7-20940884aabc",
    title: base[6][0],
    letters: [base[6], base[7]].flat(),
    msg: "lessonsList.continuingLessonsTitle",
  },
  {
    id: "83f0bc1e-f901-4b40-a6c6-501fb4726fb4",
    title: base[8][0],
    letters: base[8],
    msg: "lessonsList.continuingLessonsTitle",
  },
  {
    id: "608ce336-8437-47b7-942d-5f4e335ef9ba",
    title: base[9][0],
    letters: [base[9], base[10]].flat(),
    msg: "lessonsList.finalLessonInSectionTitle",
  },
];

export const chapter2 = (lang: "ru" | "en"): (AutoLesson | ManuallyLesson)[] => [
  lang === "en" ? dakuonAndHandakuonLessonEn : dakuonAndHandakuonLessonRu,
  lang === "en" ? longVowelsEn : longVowelsRu,
  lang === "en" ? longConsonantsEn : longConsonantsRu,
];