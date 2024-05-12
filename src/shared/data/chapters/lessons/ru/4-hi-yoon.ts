import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const yoonHiragana: ManuallyLesson = {
  id: "a16a1684-bdc7-4f2c-9c0a-ebbd89d61b0b",
  title: "Юон.",
  subTitle: "や, ゆ, よ",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы раскажем вам о юон.",
  icon: "拗音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Долгие согласные.",
      blocks: [
        {
          text: "Сегодня мы погрузимся в изучение последнего правила хираганы, но прежде давайте вспомним эти три особенные буквы:",
        },
        {
          rules: [
            "や (ya)",
            "ゆ (yu)",
            "よ (yo)",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь хирагану с романдзи.",
      blocks: [
        {
          pairs: [
            ["はやし", "yuki(снег)"],
            ["ゆき", "hayashi(роща)"],
            ["よきん", "yoki n(депозит)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Подсказка!",
      blocks: [
        {
          text: "Существуют уменьшенные версии **や (ya)**, **ゆ (yu)** и **よ (yo)**, которые при произношении соединяются с предыдущей буквой, формируя единый звук. Сравним стандартную **や (ya)** и уменьшенную **ゃ (ya)**.",
        },
        {
          rules: [
            "きや(kiya)",
            "きゃ(kya)",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон ki, gi.",
      blocks: [
        {
          text: "Элементы юон (や, ゆ, よ) могут объединяться с символами, заканчивающимися на 'i'. Например, рассмотрим комбинации с き (ki) и ぎ (gi).",
        },
        {
          table: [
            ["き(ki)", "きゃ(kya)", "きゅ(kyu)", "きょ(kyo)"],
            ["ぎ(gi)", "ぎゃ(gya)", "ぎゅ(gyu)", "ぎょ(gyo)"]
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь хирагану с романдзи.",
      blocks: [
        {
          pairs: [
            ["きゅうり", "gyo uji(мероприятие)"],
            ["ぎゅうにく", "kyuuri(огурец)"],
            ["ぎょうじ", "gyuuniku(говядина)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон shi, ji.",
      blocks: [
        {
          text: "Буквы ши (**し**) и дзи (**じ**) также могут образовывать юон с буквами **ゃ**, **ゅ**, **ょ**, создавая звуки ша, шу, шо и дзя, дзю, дзё.",
        },
        {
          table: [
            ["し(shi)", "しゃ(sha)", "しゅ(shu)", "しょ(sho)"],
            ["じ(ji)", "じゃ(ja)", "じゅ(ju)", "じょ(jo)"],
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери хирагану для jū gyo ui n (сотрудник).",
      blocks: [
        {
          answers: [
            { title: "じゅけん", isTrue: false },
            { title: "じゅうぎょういん", isTrue: true },
            { title: "しゅうでん", isTrue: false },
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон chi, ji.",
      blocks: [
        {
          text: "Буквы **ち** (chi) и **ぢ** (ji) могут использоваться для создания звуков ча, чу, чо и дза, дзу, дзо. В современном японском языке буква **ぢ** часто заменяется на **じ**.",
        },
        {
          table: [
            ["ち(chi)", "ちゃ(cha)", "ちゅ(chu)", "ちょ(cho)"],
            ["ぢ(ji)", "ぢゃ(ja)", "ぢゅ(ju)", "ぢょ(jo)"],
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери хирагану для te chou (блокнот).",
      blocks: [
        { sequence: ["ょ", "ゅ", "て", "う", "ち", "ん"] },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон ni, mi.",
      blocks: [
        { text: "Сочетания ни (**に**) и ми (**み**) с уменьшенными символами позволяют создать сложные звуки ня, ню, нё и мя, мю, мё." },
        {
          table: [
            ["に(ni)", "にゃ(nya)", "にゅ(nyu)", "にょ(nyo)"],
            ["み(mi)", "みゃ(mya)", "みゅ(myu)", "みょ(myo)"],
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери хирагану для gyuunyuu (молоко).",
      blocks: [
        {
          answers: [
            { title: "ぎゅうにゅう", isTrue: true },
            { title: "みょうが", isTrue: false },
            { title: "にゅうがく", isTrue: false },
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон ri.",
      blocks: [
        { text: "Буква ри (**り**) сочетается с уменьшенными гласными для формирования звуков ря, рю, рё." },
        {
          rules: [
            "りゃ(rya)",
            "りゅ(ryu)",
            "りょ(ryo)",
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери хирагану для ryōri ni n (шеф повар).",
      blocks: [
        { sequence: ["り", "う", "り", "に", "ょ", "ん"] },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон hi, bi, pi.",
      blocks: [
        { text: "Для создания юонных звуков используйте буквы хи (**ひ**), би (**び**) и пи (**ぴ**) в сочетании с уменьшенными гласными." },
        {
          table: [
            ["ひ(hi)", "ひゃ(hya)", "ひゅ(hyu)", "ひょ(hyo)"],
            ["び(bi)", "びゃ(bya)", "びゅ(byu)", "びょ(byo)"],
            ["ぴ(pi)", "ぴゃ(pya)", "ぴゅ(pyu)", "ぴょ(pyo)"]
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон hi, bi, pi.",
      blocks: [
        { text: "Посмотрите, как эти звуки изменяют значение слова в зависимости от контекста." },
        {
          pairs: [
            ["ひょう", "ji koku hyou(Расписание поездов)"],
            ["びょういん", "byō i n(больница)"],
            ["じこくひょう", "hyou(град)"],
          ]
        },
      ],
    },
  ],
};
