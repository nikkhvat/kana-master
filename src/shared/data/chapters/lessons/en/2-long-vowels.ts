import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longVowels: ManuallyLesson = {
  id: "17cac414-90ce-462c-8cda-7afdcc8a5b5e",
  title: "Long Vowels",
  subTitle: "Long Vowels",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about long vowels",
  icon: "子音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Long Vowels",
      blocks: [
        {
          text: "We have previously touched on special signs in Hiragana. Today, we will delve deeper into the study of long vowels. Let's start with the basics — revising the five fundamental vowels.",
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
      title: "Tip!",
      blocks: [
        {
          text: "Let's examine how long vowels can change the meaning of words. This is crucial for proper understanding and avoiding confusion.",
        },
        {
          rules: [
            "おばさん (obasan) - aunt; middle-aged woman",
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
          text: "**あ** (a) extends the vowel 'a' in hiragana, creating a long sound, for example, in the word かあ (kaa).",
        },
        {
          text: "**い** (i) extends the vowel 'i', as in にい (nii).",
        },
        {
          text: "**う** (u) extends the vowel 'u', as in くう (kuu).",
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
      title: "Match Hiragana with Romaji",
      blocks: [
        {
          pairs: [
            ["おじいさん", "obaasan (grandmother)"],
            ["おばあさん", "ojiisan (grandfather)"],
            ["すうじ", "suuji (numbers)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Remember the Rule!",
      blocks: [
        {
          text: "**い** (i) extends the vowel 'e' to 'ei', as in the word せい (sei), and **う** (u) extends the vowel 'o' to 'ou', as in こう (kou).",
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
      title: "Match Hiragana with Romaji",
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
          text: "The topic marker 'wa', used to indicate the subject, is written as は (ha) but pronounced as 'wa'. This is a unique rule in the Japanese language.",
        },
        {
          rules: [
            "わたし は がくせい です (Watashi wa gakusei desu) - I am a student.",
          ],
        },
      ],
    },
  ],
};
