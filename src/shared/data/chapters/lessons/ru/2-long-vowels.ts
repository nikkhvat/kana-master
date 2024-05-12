import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longVowels: ManuallyLesson = {
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
      title: "Долгие гласные.",
      blocks: [
        {
          text: "Мы уже затрагивали тему специальных знаков в хирагане. Сегодня мы углубимся в изучение долгих гласных. Начнем с основ — повторим пять базовых гласных.",
        },
        {
          table: [
            ["Романдзи", "A", "I", "U", "E", "O"],
            ["Хирагана", "あ", "い", "う", "え", "お"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Подсказка!",
      blocks: [
        {
          text: "Давайте рассмотрим, как долгие гласные могут менять значение слов. Это критически важно для правильного понимания и избежания путаницы.",
        },
        {
          rules: [
            "おばさん (obasan) - тетя; женщина средних лет",
            "おばあさん (obaasan) - бабушка",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Запомни правило!",
      blocks: [
        {
          text: "**あ** (a) удлиняет гласную «a» в хирагане, создавая долгий звук, например, в слове かあ (kaa).",
        },
        {
          text: "**い** (i) удлиняет гласную «i», например, в слове にい (nii).",
        },
        {
          text: "**う** (u) удлиняет гласную «u», как в くう (kuu).",
        },
        {
          rules: [
            "おかあさん (okaasan) - мать",
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
          pairs: [
            ["おじいさん", "obaasan (бабушка)"],
            ["おばあさん", "ojiisan (дедушка)"],
            ["すうじ", "suuji (цифры)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Запомни правило!",
      blocks: [
        {
          text: "**い** (i) удлиняет гласную «e» до «ei», как в слове せい (sei), а **う** (u) — гласную «o» до «ou», как в こう (kou).",
        },
        {
          rules: [
            "がくせい (gakusei) - студент",
            "こうこう (koukou) - старшая школа",
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
            ["せんせい", "gakusei (студент)"],
            ["がくせい", "houritsu (закон)"],
            ["ほうりつ", "sensei (учитель)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Запомни!",
      blocks: [
        {
          text: "Частица темы «wa», используемая для обозначения подлежащего, пишется как は (ha), но произносится как «wa». Это уникальное правило японского языка.",
        },
        {
          rules: [
            "わたし は がくせい です (Watashi wa gakusei desu) - Я студентка.",
          ],
        },
      ],
    },
  ],
};
