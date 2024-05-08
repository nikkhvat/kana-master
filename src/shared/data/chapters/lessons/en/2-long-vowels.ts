import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longVowels: ManuallyLesson = {
  id: "17cac414-90ce-462c-8cda-7afdcc8a5b5e",
  title: "Long Vowels",
  subTitle: "Long Vowels",
  infoTitle: "Information",
  infoSubTitle: "Here, we'll tell you about long vowels",
  icon: "子音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Long Vowels",
      blocks: [
        {
          text: "Earlier, we studied special hiragana marks. Today, they'll come in handy as we'll learn to form long vowels. First, let's review the five main vowels.",
        },
        {
          table: [
            ["Romaji", "A", "I", "U", "E", "O"],
            ["Hiragana", "あ", "い", "う", "え", "お"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Hint!",
      blocks: [
        {
          text: "To understand the importance of long and short vowels, let's compare the words listed below. It's important not to confuse them!",
        },
        {
          rules: [
            "おばさん (obasan) - middle-aged woman; aunt",
            "おばあさん (obaasan) - grandmother",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Remember the Rule!",
      blocks: [
        {
          text: "**あ** (a) makes any hiragana ending with 'a' long (e.g., かあ - kaa).",
        },
        {
          text: "**い** (i) makes any hiragana ending with 'i' long (e.g., にい - nii).",
        },
        {
          text: "**う** (u) makes any hiragana ending with 'u' long (e.g., くう - kuu).",
        },
        {
          rules: [
            "おかあさん (okaasan) - mother",
            "おにいさん (oniisan) - older brother",
            "くうき (kuuki) - air",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Match Hiragana with Romaji.",
      blocks: [
        {
          pairs: [
            ["おじいさん", "obaasan (grandmother)"],
            ["おばあさん", "ojiisan (grandfather)"],
            ["すうじ", "suuji (number)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Remember the Rule!",
      blocks: [
        {
          text: "**い** (i) makes any hiragana ending with 'e' long (e.g., せい - sei).",
        },
        {
          text: "**う** (u) makes any hiragana ending with 'o' long (e.g., こう - kou).",
        },
        {
          rules: [
            "がくせい (gakusei) - student",
            "こうこう (koukou) - high school",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Match Hiragana with Romaji.",
      blocks: [
        {
          pairs: [
            ["せんせい", "gakusei (student)"],
            ["がくせい", "houritsu (law)"],
            ["ほうりつ", "sensei (teacher)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Remember!",
      blocks: [
        {
          text: "The particle 'wa,' which functions as the subject marker, is written in hiragana as は (ha). It's the only instance where は (ha) is written but pronounced as 'wa.'",
        },
        {
          rules: [
            "わたし は がくせい です。 (Watashi wa gakusei desu.) - I am a student.",
          ],
        },
      ],
    },
  ],
};
