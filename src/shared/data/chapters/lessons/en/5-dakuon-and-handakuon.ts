import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const dakuonAndHandakuonKatakanaLesson: ManuallyLesson = {
  id: "5cb6d389-dfe6-4feb-94f0-51e6aa32329f",
  title: "Dakuten and Handakuten in Katakana",
  subTitle: "Dakuten and Handakuten",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about the special signs in Katakana",
  icon: "濁音",
  category: [KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Dakuten and Handakuten",
      blocks: [
        {
          text: "After covering all the Katakana syllables, it's time to learn about the special signs used with these symbols. Let's explore which syllables can use Dakuten and Handakuten.",
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
      title: "Match Katakana with Romaji",
      blocks: [
        {
          pairs: [
            ["カキ", "tako (octopus)"],
            ["ハト", "kaki (persimmon)"],
            ["タコ", "hato (pigeon)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Dakuten ka, ki, ku, ke, ko",
      blocks: [
        {
          text: "By adding Dakuten, special marks in the form of two short lines, to the Katakana syllables, we form the voiced versions of these syllables. Observe how the pronunciation changes.",
        },
        {
          table: [
            ["Voiceless", "カ(ka)", "キ(ki)", "ク(ku)", "ケ(ke)", "コ(ko)"],
            ["Voiced", "ガ(ga)", "ギ(gi)", "グ(gu)", "ゲ(ge)", "ゴ(go)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Katakana for kagi (key)",
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
      title: "Dakuten za, ji, zu, ze, zo",
      blocks: [
        {
          text: "Similarly, we can apply Dakuten to syllables starting with 's' to transform them into voiced sounds.",
        },
        {
          table: [
            ["Voiceless", "サ(sa)", "シ(shi)", "ス(su)", "セ(se)", "ソ(so)"],
            ["Voiced", "ザ(za)", "ジ(ji)", "ズ(zu)", "ゼ(ze)", "ゾ(zo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Katakana for kujira (whale)",
      blocks: [
        {
          sequence: ["ク", "ジ", "ラ"]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Dakuten da, ji, zu, de, do",
      blocks: [
        {
          text: "Dakuten can also be added to syllables starting with 't', creating another set of voiced sounds.",
        },
        {
          table: [
            ["Voiceless", "タ(ta)", "チ(chi)", "ツ(tsu)", "テ(te)", "ト(to)"],
            ["Voiced", "ダ(da)", "ヂ(ji)", "ヅ(zu)", "デ(de)", "ド(do)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Take Note!",
      blocks: [
        {
          text: "The syllables ジ (ji) and ヂ (ji), as well as ズ (zu) and ヅ (zu), are pronounced the same in modern Japanese. These sounds were once pronounced differently but have merged over time.",
        },
        {
          text: "ジ is most commonly used for 'ji' and ズ for 'zu', while ヂ and ヅ are significantly less common.",
        },
        {
          rules: [
            "ジ (ji) and ズ (zu) are most commonly used",
            "ヂ (ji) and ヅ (zu) are rarely used",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Katakana for mukade (centipede)",
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
      title: "Dakuten ba, bi, bu, be, bo",
      blocks: [
        {
          text: "Let's explore how applying Dakuten to syllables starting with 'h' changes them to the voiced 'b' sounds.",
        },
        {
          table: [
            ["Sound 'h'", "ハ(ha)", "ヒ(hi)", "フ(fu)", "ヘ(he)", "ホ(ho)"],
            ["Sound 'b'", "バ(ba)", "ビ(bi)", "ブ(bu)", "ベ(be)", "ボ(bo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Katakana for buraun (brown)",
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
      title: "Handakuten pa, pi, pu, pe, po",
      blocks: [
        {
          text: "A special series in Katakana starts with ハ (ha). By adding the Handakuten, a small circle, we change the sounds to 'p'.",
        },
        {
          table: [
            ["Sound 'h'", "ハ(ha)", "ヒ(hi)", "フ(fu)", "ヘ(he)", "ホ(ho)"],
            ["Sound 'b'", "バ(ba)", "ビ(bi)", "ブ(bu)", "ベ(be)", "ボ(bo)"],
            ["Sound 'p'", "パ(pa)", "ピ(pi)", "プ(pu)", "ペ(pe)", "ポ(po)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the romaji for アパレル (clothing)",
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
