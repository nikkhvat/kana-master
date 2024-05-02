import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const dakuonAndHandakuonLesson: ManuallyLesson = {
  type: "manually",
  id: "52aa8316-4669-41e6-98d3-2b3e42a941ff",
  title: "Дакуон и хандакуон.",
  subTitle: "Дакуон и хандакуон.",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы раскажем вам о специальных знаках хираганы",
  icon: "D|H",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Дакуон и хандакуон.",
      blocks: [
        {
          type: "text",
          text: "Мы рассмотрели все слоги хираганы. Теперь мы готовы к изучению специальных знаков хираганы! Для начала давай узнаем, с какими слогами хираганы можно употреблять эти знаки:",
        },
        {
          type: "table",
          table: [
            [
              "ka, ki, ku, ke, ko",
              "sa, shi, su, se, so",
              "ta, chi, tsu, te, to",
              "ha, hi, fu, he, ho",
            ],
            [
              "か, き, く, け, こ",
              "さ, し, す, せ, そ",
              "た, ち, つ, て, と",
              "は, ひ, ふ, へ, ほ",
            ],
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
          type: "select-answer",
          answers: [
            { title: "へた = fuku (одежда)", isTrue: true },
            { title: "ふく = sushi", isTrue: true },
            { title: "すし = heta (неумелый)", isTrue: true },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Дакуон ka, ki, ku, ke, ko.",
      blocks: [
        {
          type: "text",
          text: "Мы можем создать новые звуки, добавив специальный знак (dakuten) в виде двух коротких прямых линий в правый верхний угол только что рассмотренных нами слогов хираганы. Посмотри ниже, чтобы увидеть, как этот знак изменяет произношение! Полученные слоги хираганы называются звонкими.",
        },
        {
          type: "table",
          table: [
            ["Глухие", "か (ka)", "き (ki)", "く (ku)", "け (ke)", "こ (ko)"],
            ["Звонкие", "が (ga)", "ぎ (gi)", "ぐ (gu)", "げ (ge)", "ご (go)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Выбери хирагану для kagi (ключ).",
      blocks: [
        {
          type: "select-answer",
          answers: [
            { title: "がき", isTrue: true },
            { title: "がぎ", isTrue: true },
            { title: "かぎ", isTrue: true },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Дакуон za, ji, zu, ze, zo.",
      blocks: [
        {
          type: "text",
          text: "Точно так же мы можем добавить специальные знаки (dakuten) к буквам хираганы, начинающихся с «s».",
        },
        {
          type: "table",
          table: [
            ["Глухие", "さ (sa)", "し (shi)", "す (su)", "せ (se)", "そ (so)"],
            ["Звонкие", "ざ (za)", "じ (ji)", "ず (zu)", "ぜ (ze)", "ぞ (zo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Дакуон da, ji, zu, de, do.",
      blocks: [
        {
          type: "text",
          text: "Кроме того, специальный знак (dakuten) может быть добавлен к буквам хираганы, начинающихся с «t», для образования новых звонких звуков!",
        },
        {
          type: "table",
          table: [
            ["Глухие", "た (ta)", "ち (chi)", "つ (tsu)", "て (te)", "と (to)"],
            ["Звонкие", "だ (da)", "ぢ (ji)", "づ (zu)", "で (de)", "ど (do)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Обрати внимание!",
      blocks: [
        {
          type: "text",
          text: "じ (ji) и ぢ (ji) произносятся одинаково, как и ず (zu) и づ (zu). В прошлом они произносились по-разному, но постепенно приобрели одинаковое произношение.",
        },
        {
          type: "text",
          text: "Важно отметить, что для слов с «ji» чаще всего используется じ, а для слов с «zu» - ず. Лишь с очень немногими словами употребляется ぢ и づ.",
        },
        {
          type: "rules",
          rules: [
            "じ (ji), ず (zu) - используются в большинстве случаем",
            "ぢ (ji), づ (zu) - используются лишь в нескольких словах",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Выбери хирагану для dashi (японский бульон).",
      blocks: [
        {
          type: "select-answer",
          answers: [
            { title: "たじ", isTrue: true },
            { title: "だし", isTrue: true },
            { title: "だじ", isTrue: true },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Дакуон ba, bi, bu, be, bo.",
      blocks: [
        {
          type: "text",
          text: "Теперь давай изучим специальные знаки (dakuten) для строки, начинающейся с «h».",
        },
        {
          type: "table",
          table: [
            ["Звук «h»", "は (ha)", "ひ (hi)", "ふ (fu)", "へ (he)", "ほ (ho)"],
            ["Звук «b»", "ば (ba)", "び (bi)", "ぶ (bu)", "べ (be)", "ぼ (bo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Выбери хирагану для kabuki (японский театр).",
      blocks: [
        {
          type: "select-answer",
          answers: [
            { title: "かふぎ", isTrue: true },
            { title: "かふぎ", isTrue: true },
            { title: "かふぎ", isTrue: true },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Хандакуон pa, pi, pu, pe, po.",
      blocks: [
        {
          type: "text",
          text: "Строка хираганы, начинающаяся с は (ha) - особенная! В дополнение к изученному нами специальному знаку, ее также можно комбинировать с другим знаком (handakuten), маленьким кружком. Он меняет звук «p».",
        },
        {
          type: "table",
          table: [
            ["Звук «h»", "は (ha)", "ひ (hi)", "ふ (fu)", "へ (he)", "ほ (ho)"],
            ["Звук «b»", "ば (ba)", "び (bi)", "ぶ (bu)", "べ (be)", "ぼ (bo)"],
            ["Звук «p»", "ぱ (pa)", "ぴ (pi)", "ぷ (pu)", "ぺ (pe)", "ぽ (po)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Выбери романдзи для ぱくぱく (есть с аппетитом).",
      blocks: [
        {
          type: "select-answer",
          answers: [
            { title: "hakuhaku", isTrue: true },
            { title: "pakupaku", isTrue: true },
            { title: "bakubaku", isTrue: true },
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
          text: "Специальные знаки, с которыми мы познакомились, очень важны, потому что при их добавлении значение слова может полностью измениться!",
        },
        {
          type: "rules",
          rules: [
            "はか (haka) - могила",
            "ばか (baka) - дурак",
            "かき (kaki) - хурма",
            "かぎ (kagi) - ключ",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: false,
      isActiveFinish: true,
      title: "Сопоставь хирагану с романдзи.",
      blocks: [
        {
          type: "select-answer",
          answers: [
            { title: "ここ = goko (5 кусочков)", isTrue: true },
            { title: "ごこ = gogo (днем)", isTrue: true },
            { title: "ごご = koko (здесь)", isTrue: true },
          ],
        },
      ],
    },
  ],
};
