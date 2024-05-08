import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const dakuonAndHandakuonLesson: ManuallyLesson = {
  id: "52aa8316-4669-41e6-98d3-2b3e42a941ff",
  title: "Dakuon and Handakuon",
  subTitle: "Dakuon and Handakuon",
  infoTitle: "Information",
  infoSubTitle: "Here, we'll tell you about special hiragana marks",
  icon: "濁音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Dakuon and Handakuon",
      blocks: [
        {
          text: "We've covered all the hiragana syllables. Now we're ready to learn about **special hiragana marks**! Let's first see which hiragana syllables can use these marks:",
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
      title: "Match Hiragana with Romaji.",
      blocks: [
        {
          pairs: [
            ["へた", "fuku (clothes)"],
            ["ふく", "sushi"],
            ["すし", "heta (unskilled)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Dakuon ka, ki, ku, ke, ko.",
      blocks: [
        {
          text: "We can create **new** sounds by adding a special mark (dakuten) in the form of **two short straight lines** to the upper-right corner of the hiragana syllables we've reviewed. Check below to see how this mark changes the pronunciation! The resulting hiragana syllables are called **voiced**.",
        },
        {
          table: [
            [
              "Voiceless",
              "か (ka)",
              "き (ki)",
              "く (ku)",
              "け (ke)",
              "こ (ko)",
            ],
            ["Voiced", "が (ga)", "ぎ (gi)", "ぐ (gu)", "げ (ge)", "ご (go)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Select the Hiragana for kagi (key).",
      blocks: [
        {
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
      title: "Dakuon za, ji, zu, ze, zo.",
      blocks: [
        {
          text: "Similarly, we can add special marks (dakuten) to hiragana characters starting with 's.'",
        },
        {
          table: [
            ["Voiceless", "さ (sa)", "し (shi)", "す (su)", "せ (se)", "そ (so)"],
            ["Voiced", "ざ (za)", "じ (ji)", "ず (zu)", "ぜ (ze)", "ぞ (zo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Dakuon da, ji, zu, de, do.",
      blocks: [
        {
          text: "We can also add special marks (dakuten) to hiragana characters starting with 't' to create new voiced sounds!",
        },
        {
          table: [
            ["Voiceless", "た (ta)", "ち (chi)", "つ (tsu)", "て (te)", "と (to)"],
            ["Voiced", "だ (da)", "ぢ (ji)", "づ (zu)", "で (de)", "ど (do)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Take note!",
      blocks: [
        {
          text: "**じ** (ji) and **ぢ** (ji) are pronounced the same way, as are **ず** (zu) and **づ** (zu). In the past, they had different pronunciations but eventually converged.",
        },
        {
          text: "It's important to note that **じ** is mostly used for 'ji,' and **ず** is used for 'zu.' Only a few words use **ぢ** and **づ**.",
        },
        {
          rules: [
            "じ (ji), ず (zu) - mostly used",
            "ぢ (ji), づ (zu) - used only for a few words",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Select the Hiragana for dashi (Japanese broth).",
      blocks: [
        {
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
      title: "Dakuon ba, bi, bu, be, bo.",
      blocks: [
        {
          text: "Now let's learn the special marks (dakuten) for the row starting with 'h.'",
        },
        {
          table: [
            ["Sound 'h'", "は (ha)", "ひ (hi)", "ふ (fu)", "へ (he)", "ほ (ho)"],
            ["Sound 'b'", "ば (ba)", "び (bi)", "ぶ (bu)", "べ (be)", "ぼ (bo)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Select the Hiragana for kabuki (Japanese theater).",
      blocks: [
        {
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
      title: "Handakuon pa, pi, pu, pe, po.",
      blocks: [
        {
          text: "The hiragana row starting with **は** (ha) is special! In addition to the dakuten mark, it can also be combined with another mark (handakuten), a small circle, which changes the sound to 'p.'",
        },
        {
          table: [
            ["Sound 'h'", "は (ha)", "ひ (hi)", "ふ (fu)", "へ (he)", "ほ (ho)"],
            ["Sound 'b'", "ば (ba)", "び (bi)", "ぶ (bu)", "べ (be)", "ぼ (bo)"],
            ["Sound 'p'", "ぱ (pa)", "ぴ (pi)", "ぷ (pu)", "ぺ (pe)", "ぽ (po)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Select the Romaji for ぱくぱく (to eat heartily).",
      blocks: [
        {
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
      title: "Hint!",
      blocks: [
        {
          text: "The special marks we learned are crucial because they can **completely change** the meaning of a word!",
        },
        {
          rules: [
            "はか (haka) - grave",
            "ばか (baka) - fool",
            "かき (kaki) - persimmon",
            "かぎ (kagi) - key",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Match Hiragana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ここ", "goko (5 pieces)"],
            ["ごこ", "gogo (afternoon)"],
            ["ごご", "koko (here)"],
          ],
        },
      ],
    },
  ],
};
