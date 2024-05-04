import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longVowels: ManuallyLesson = {
  type: "manually",
  id: "17cac414-90ce-462c-8cda-7afdcc8a5b5e",
  title: "Долгие гласные.",
  subTitle: "Долгие гласные.",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы раскажем вам о долгих гласных",
  icon: "子音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Долгие гласные.",
      blocks: [
        {
          type: "text",
          text: "Ранее мы изучили специальные знаки хираганы. Сегодня они нам пригодятся, потому что мы научимся образовывать долгие гласные. Для начала повторим пять основных гласных.",
        },
        {
          type: "table",
          table: [
            ["Романдзи", "A", "I", "U", "E", "O"],
            ["Хирагана", "あ", "い", "う", "え", "お"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Подсказка!",
      blocks: [
        {
          type: "text",
          text: "Чтобы понять важность долгих и кратких гласных, давай сравним слова, приведенные ниже. Важно не перепутать!",
        },
        {
          type: "rules",
          rules: [
            "おばさん (obasan) - женщина срежнего возраста; тетя",
            "おばあさん (obaasan) - бабушка",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Запомни правило!",
      blocks: [
        {
          type: "text",
          text: "**あ** (a) делает любую букву хираганы, оканчивающуюся на «**a**», долгой (например, かあ - kaa).",
        },
        {
          type: "text",
          text: "**い** (i) делает любую букву хираганы, оканчивающуюся на «**i**», долгой (например, にい - nii).",
        },
        {
          type: "text",
          text: "**う** (u) делает любую букву хираганы, оканчивающуюся на «**u**», долгой (например, くう - kuu).",
        },
        {
          type: "rules",
          rules: [
            "おかあさん (okaasan) - мама",
            "おにいさん (oniisan) - старший брат",
            "くうき (kuuki) - воздух",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь хирагану с романдзи.",
      blocks: [
        {
          type: "match-answer",
          pairs: [
            ["おじいさん", "obaasan (бабушка)1"],
            ["おばあさん", "ojiisan (дедушка)"],
            ["すうじ", "suuji (цифра)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Запомни правило!",
      blocks: [
        {
          type: "text",
          text: "**い** (i) делает любую букву хираганы, оканчивающуюся на «**e**», долгой (например, せい - sei).",
        },
        {
          type: "text",
          text: "**う** (u) делает любую букву хираганы, оканчивающуюся на «**o**», долгой (например, こう - kou).",
        },
        {
          type: "rules",
          rules: [
            "がくせい (gakusei) - ученик; ученица",
            "こうこう (koukou) - средняя школа",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Сопоставь хирагану с романдзи.",
      blocks: [
        {
          type: "match-answer",
          pairs: [
            ["せんせい", "gakusei (ученик)"],
            ["がくせい", "houritsu (закон) "],
            ["ほうりつ", "sensei (учитель)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveFinish: true,
      title: "Запомни!",
      blocks: [
        {
          type: "text",
          text: "Частица «wa», выполняющая функцию подлежащего, пишется как хирагана は (ha). Это единственный случай, когда мы пишем は (ha), а произносим - «wa».",
        },
        {
          type: "rules",
          rules: [
            "わたし は がくせい です。 (Watashi wa gakusei desu.) - Я — ученица.",
          ],
        },
      ],
    },
  ],
};
