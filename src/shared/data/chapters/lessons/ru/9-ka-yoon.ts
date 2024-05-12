import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const yoonKatakana: ManuallyLesson = {
  id: "515aea21-2b85-4a5a-8238-03b4a8044765",
  title: "Юон в катакане",
  subTitle: "や, ゆ, よ",
  infoTitle: "Информация",
  infoSubTitle: "Здесь мы расскажем вам о юон.",
  icon: "拗音",
  category: [KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Юон в катакане",
      blocks: [
        {
          text: "В этом уроке мы рассмотрим особенности юон в катакане, начиная с трёх ключевых символов:"
        },
        {
          rules: [
            "ヤ(ya)",
            "ユ(yu)",
            "ヨ(yo)",
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь катакану с романдзи.",
      blocks: [
        {
          pairs: [
            ["ヤモリ", "yamori(геккон)"],
            ["ユーロ", "yūro(евро)"],
            ["ヨーロッパ", "yōroppa(Европа)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Подсказка!",
      blocks: [
        {
          text: "Существуют уменьшенные формы ヤ (ya), ユ (yu) и ヨ (yo). В процессе произношения эти символы сливаются с предшествующими буквами катаканы, оканчивающимися на звук «i», образуя один сложный звук.",
        },
        {
          rules: [
            "キヤ(kiya) - не существует в японском языке",
            "キャ(kya) - стандартное произношение",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон ki, gi.",
      blocks: [
        {
          text: "Рассмотрим как символы юон Я (ya), Ю (yu) и Ё (yo) комбинируются с катаканой, заканчивающейся на 'i'. Начнём с ки (キ) и ги (ギ).",
        },
        {
          table: [
            ["Ки (キ)", "Кя (キャ)", "Кю (キュ)", "Кё (キョ)"],
            ["Ги (ギ)", "Гя (ギャ)", "Гю (ギュ)", "Гё (ギョ)"]
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь катакану с романдзи.",
      blocks: [
        {
          pairs: [
            ["キャラバン", "kyaraban(караван)"],
            ["キューバ", "kyūba(Куба)"],
            ["ギャング", "gyangu(банда)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон shi, ji.",
      blocks: [
        {
          text: "Следующий пример показывает комбинации ши (シ) и джи (ジ) с уменьшенными символами, формируя сложные звуки.",
        },
        {
          table: [
            ["シ (shi)", "シャ (sha)", "シュ (shu)", "ショ (sho)"],
            ["ジ (ji)", "ジャ (ja)", "ジュ (ju)", "ジョ (jo)"],
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для shatsu (рубашка).",
      blocks: [
        {
          answers: [
            { title: "シャツ", isTrue: true },
            { title: "ショーツ", isTrue: false },
            { title: "クジャク", isTrue: false },
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон chi, ji.",
      blocks: [
        {
          text: "Исследуем комбинации чи (チ) и дзи (ヂ). В современном японском дзи (ヂ) часто заменяется на джи (ジ).",
        },
        {
          table: [
            ["チ (chi)", "チャ (cha)", "チュ (chu)", "チョ (cho)"],
            ["ヂ (ji) (устар.)", "ヂャ (ja)", "ヂュ (ju)", "ヂョ (jo)"],
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для chansu (шанс).",
      blocks: [
        { sequence: ["チ", "ャ", "ン", "ス"] },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон ni, mi.",
      blocks: [
        {
          text: "Теперь давайте рассмотрим, как ни (ニ) и ми (ミ) комбинируются с уменьшенными символами, создавая звуки ня, ню, нё и мя, мю, мё.",
        },
        {
          table: [
            ["ニ (ni)", "ニャ (nya)", "ニュ (nyu)", "ニョ (nyo)"],
            ["ミ (mi)", "ミャ (mya)", "ミュ (myu)", "ミョ (myo)"],
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для myūjikaru (мюзикл).",
      blocks: [
        {
          answers: [
            { title: "ミュージカル", isTrue: true },
            { title: "ミュージカ", isTrue: false },
            { title: "ミュジカル", isTrue: false },
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон ri.",
      blocks: [
        {
          text: "Рассмотрим, как ри (リ) сочетается с уменьшенными гласными, формируя сложные звуки.",
        },
        {
          rules: [
            "リャ (rya)",
            "リュ (ryu)",
            "リョ (ryo)",
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Выбери катакану для ryukkusakku (рюкзак).",
      blocks: [
        { sequence: ["リ", "ュ", "ッ", "ク", "サ","ッ", "ク"] },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Юон hi, bi, pi.",
      blocks: [
        {
          text: "Завершая, изучим, как хи (ヒ), би (ビ) и пи (ピ) комбинируются с уменьшенными символами для создания сложных звуков.",
        },
        {
          table: [
            ["ヒ (hi)", "ヒャ (hya)", "ヒュ (hyu)", "ヒョ (hyo)"],
            ["ビ (bi)", "ビャ (bya)", "ビュ (byu)", "ビョ (byo)"],
            ["ピ (pi)", "ピャ (pya)", "ピュ (pyu)", "ピョ (pyo)"],
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Сопоставь катакану с романдзи.",
      blocks: [
        {
          pairs: [
            ["ヒューズ", "hyūzu(пробка)"],
            ["ビューティー", "byūtī(красота)"],
            ["ヒョウ", "hyō(леопард)"],
          ]
        },
      ],
    },
  ],
};
