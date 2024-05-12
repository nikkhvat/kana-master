import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const dakuonAndHandakuonKatakanaLesson: ManuallyLesson = {
  id: "5cb6d389-dfe6-4feb-94f0-51e6aa32329f",
  title: "Дакуон и хандакуон.",
  subTitle: "Дакуон и хандакуон.",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы раскажем вам о специальных знаках катаканы",
  icon: "濁音",
  category: [KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Дакуон и хандакуон.",
      blocks: [
        {
          text: "После того как мы ознакомились со всеми слогами катаканы, настала пора узнать о специальных знаках, используемых с этими символами. Давайте изучим, с какими слогами можно использовать дакуон и хандакуон.",
        },
        {
          table: [
            [
              "ka, ki, ku, ke, ko",
              "sa, shi, su, se, so",
              "ta, chi, tsu, te, to",
              "ha, hi, fu, he, ho",
            ],
            [
              "カ, キ, ク, ケ, コ",
              "サ, シ, ス, セ, ソ",
              "タ, チ, ツ, テ, ト",
              "ハ, ヒ, フ, ヘ, ホ",
            ],
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
            ["カキ", "tako(осьминог)"],
            ["ハト", "kaki(хурма)"],
            ["タコ", "hato(голубь)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Дакуон ka, ki, ku, ke, ko.",
      blocks: [
        {
          text: "Добавляя дакутен, специальные знаки в виде двух коротких линий, к слогам катаканы, мы формируем звонкие версии этих слогов. Посмотрите, как меняется произношение.",
        },
        {
          table: [
            ["Глухие", "カ(ka)", "キ(ki)", "ク(ku)", "ケ(ke)", "コ(ko)"],
            ["Звонкие", "ガ(ga)", "ギ(gi)", "グ(gu)", "ゲ(ge)", "ゴ(go)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для kagi (ключ).",
      blocks: [
        {
          answers: [
            { title: "カギ", isTrue: true },
            { title: "ガギ", isTrue: false },
            { title: "キギ", isTrue: false },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Дакуон za, ji, zu, ze, zo.",
      blocks: [
        {
          text: "Также мы можем применять дакутен к слогам, начинающимся на 's', чтобы преобразовать их в звонкие звуки.",
        },
        {
          table: [
            ["Глухие", "サ(sa)", "シ(shi)", "ス(su)", "セ(se)", "ソ(so)"],
            ["Звонкие", "ザ(za)", "ジ(ji)", "ズ(zu)", "ゼ(ze)", "ゾ(zo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для kujira (кит).",
      blocks: [
        {
          sequence: ["ク", "ジ", "ラ"]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Дакуон da, ji, zu, de, do.",
      blocks: [
        {
          text: "Дакутен также может быть добавлен к слогам, начинающимся на 't', создавая новый набор звонких звуков.",
        },
        {
          table: [
            ["Глухие", "タ(ta)", "チ(chi)", "ツ(tsu)", "テ(te)", "ト(to)"],
            ["Звонкие", "ダ(da)", "ヂ(ji)", "ヅ(zu)", "デ(de)", "ド(do)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Обрати внимание!",
      blocks: [
        {
          text: "Слоги ジ (ji) и ヂ (ji), а также ズ (zu) и ヅ (zu) произносятся одинаково в современном японском. Эти звуки когда-то звучали по-разному, но со временем их произношение слилось.",
        },
        {
          text: "Чаще всего используется ジ для 'ji' и ズ для 'zu', а ヂ и ヅ встречаются значительно реже.",
        },
        {
          rules: [
            "ジ (ji) и ズ (zu) используются чаще всего",
            "ヂ (ji) и ヅ (zu) редко используются",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для mukade (сороконожка).",
      blocks: [
        {
          answers: [
            { title: "ムカデ", isTrue: true },
            { title: "ムケダ", isTrue: false },
            { title: "メカダ", isTrue: false },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Дакуон ba, bi, bu, be, bo.",
      blocks: [
        {
          text: "Исследуем, как применение дакутен к слогам, начинающимся на 'h', меняет их на звонкие 'b'.",
        },
        {
          table: [
            ["Звук «h»", "ハ(ha)", "ヒ(hi)", "フ(fu)", "ヘ(he)", "ホ(ho)"],
            ["Звук «b»", "バ(ba)", "ビ(bi)", "ブ(bu)", "ベ(be)", "ボ(bo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для buraun (коричневый).",
      blocks: [
        {
          answers: [
            { title: "ブラウン", isTrue: true },
            { title: "ブロン", isTrue: false },
            { title: "バラン", isTrue: false },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Хандакуон pa, pi, pu, pe, po.",
      blocks: [
        {
          text: "Особая серия катаканы начинается с ハ (ha). Добавляя хандакутен, маленький кружок, мы изменяем звуки на 'p'.",
        },
        {
          table: [
            ["Звук «h»", "ハ(ha)", "ヒ(hi)", "フ(fu)", "ヘ(he)", "ホ(ho)"],
            ["Звук «b»", "バ(ba)", "ビ(bi)", "ブ(bu)", "ベ(be)", "ボ(bo)"],
            ["Звук «p»", "パ(pa)", "ピ(pi)", "プ(pu)", "ペ(pe)", "ポ(po)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери романдзи для アパレル (одежда).",
      blocks: [
        {
          answers: [
            { title: "apareru", isTrue: true },
            { title: "aparelu", isTrue: false },
            { title: "apalelu", isTrue: false },
          ],
        },
      ],
    }
  ],
};
