import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longConsonantsKatakana: ManuallyLesson = {
  id: "7c56b8b0-832e-4e2e-badc-cf93f4e97a9e",
  title: "Long Consonants in Katakana",
  subTitle: "Long Consonants",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about long consonants in Katakana",
  icon: "子音",
  category: [KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Long Consonants in Katakana",
      blocks: [
        {
          text: "In Japanese, long consonants play an important role, especially in Katakana, where they are indicated by a specific symbol.",
        },
        {
          text: "The small symbol 'tsu' (ッ) is used in Katakana before a consonant to denote its doubling. This symbol is not pronounced.",
        },
        {
          text: "Consider examples of using the regular 'tsu' (ツ) and the small 'tsu' (ッ):",
        },
        {
          rules: [
            "カット (katto) - haircut",
            "バッグ (baggu) - bag",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ネックレス", "nekkuresu (necklace)"],
            ["ブラック", "burakku (black)"],
            ["ライラック", "rairakku (lilac)"],
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Katakana for painappuru (pineapple).",
      blocks: [
        { sequence: ["パ", "イ", "ナ", "ッ", "プ", "ル"] }
      ],
    },
  ],
};
