import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longConsonantsKatakana: ManuallyLesson = {
  id: "7c56b8b0-832e-4e2e-badc-cf93f4e97a9e",
  title: "Долгие согласные в катакане",
  subTitle: "Долгие согласные",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы расскажем вам о долгих согласных в катакане",
  icon: "子音",
  category: [KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Долгие согласные в катакане",
      blocks: [
        {
          text: "В японском языке долгие согласные играют важную роль, особенно в катакане, где они обозначаются особым символом.",
        },
        {
          text: "Маленький символ «tsu» (ッ) используется в катакане перед согласной для обозначения её удвоения. Этот символ не произносится.",
        },
        {
          text: "Рассмотрим примеры использования обычной «tsu» (ツ) и маленькой «tsu» (ッ):",
        },
        {
          rules: [
            "カット (katto) - стрижка",
            "バッグ (baggu) - сумка",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь катакану с романдзи.",
      blocks: [
        {
          pairs: [
            ["ネックレス", "nekkuresu(ожерелье)"],
            ["ブラック", "burakku(черный)"],
            ["ライラック", "rairakku(сирень)"],
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для painappuru (ананас).",
      blocks: [
        { sequence: ["パ", "イ", "ナ", "ッ", "プ", "ル"] }
      ],
    },
  ],
};
