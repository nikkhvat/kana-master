import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const lessonIntroduction: ManuallyLesson = {
  id: "52aa8316-4669-41e6-98d3-2b3e42a943ff",
  title: "Введение",
  subTitle: "Хирагана и Катакана",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы раскажем вам о алфавитах в японском языке",
  icon: "序章",
  category: [KanaAlphabet.Hiragana, KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Знаешь ли ты ?",
      blocks: [
        {
          text: "В японском языке есть два алфавита: **хирагана** и **катакана**, каждый из которых состоит из 46 букв.",
        },
        {
          text: "**Хирагана** употребляется для написания слов японского происхождения, а **катакана** - для написания заимствованных слов и иностранных имен.",
        },
        {
          text: "Есть также около 2000 часто используемых иероглифов (**кандзи**).",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Хирагана? Катакана? Кандзи?",
      blocks: [
        {
          text: "И **хирагана**, и **катакана** обозначают звуки, а **кандзи** - значения.",
        },
        {
          table: [
            ["Романджи", "A", "I", "U", "E", "O"],
            ["Хиригана", "あ", "い", "う", "え", "お"],
            ["Катакана", "ア", "イ", "ウ", "エ", "オ"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Подсказка!",
      blocks: [
        {
          text: "Давай изучим правила написания японских иероглифов!",
        },
        {
          rules: [
            "Пиши штрихи слева направо",
            "Пиши штрихи сверху вниз",
            "Пиши по часовой стрелке большинство кривых и окружностей",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Посмотри порядок штрихов.",
      blocks: [
        {
          text: "Соблюдение правильного порядка штрихов помогает писать аккуратные символы.",
        },
        {
          id: "a151eeeb-2537-463c-ae23-d484d1bcb835",
          kana: KanaAlphabet.Hiragana,
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Посмотри порядок штрихов.",
      blocks: [
        {
          text: "Выбери правильное правило письма на японском языке.",
        },
        {
          answers: [
            { title: "справа налево", isTrue: false },
            { title: "снизу вверх", isTrue: false },
            { title: "слева направо", isTrue: true },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Как писать строки?",
      blocks: [
        {
          text: "Теперь давай обратим внимание на то, как надо заканчивать штрихи.",
        },
        {
          text: "Для завершения штриха мы резко останавливаемся, делаем крючок или постепенно отводим кисть.",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Завершение штриха.",
      blocks: [
        {
          text: "Первый штрих заканчивается крючком, а второй - резко останавливается.",
        },
        {
          id: "11017078-148a-4a44-b3f7-21d1df02d981",
          kana: KanaAlphabet.Hiragana,
        },
      ],
    },
  ],
};
