export const dakuonAndHandakuonKatakanaLesson = {
  id: "5cb6d389-dfe6-4feb-94f0-51e6aa32329f",
  title: "Dakuon and Handakuon",
  subTitle: "Special Katakana Marks",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about special katakana marks.",
  icon: "濁音",
  category: ["katakana"],
  screens: [
    {
      title: "Dakuon and Handakuon.",
      blocks: [
        {
          text: "After mastering the basic katakana syllables, it's time to get acquainted with dakuon and handakuon—special marks that change the sound of the syllables.",
        },
        {
          text: "First, let's find out which katakana syllables can use these marks:",
        },
        {
          table: [
            [
              "Romaji",
              "ka, ki, ku, ke, ko",
              "sa, shi, su, se, so",
              "ta, chi, tsu, te, to",
              "ha, hi, fu, he, ho",
            ],
            [
              "Katakana",
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
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["タコ", "tako (octopus)"],
            ["ハト", "hato (pigeon)"],
            ["カキ", "kaki (persimmon)"],
          ],
        },
      ],
    },
    {
      title: "Dakuon ka, ki, ku, ke, ko.",
      blocks: [
        {
          text: "By adding dakuten marks, which are two short strokes in the upper right corner, to the syllables, we form new sounds. See how this changes the pronunciation.",
        },
        {
          table: [
            ["Voiceless", "カ (ka)", "キ (ki)", "ク (ku)", "ケ (ke)", "コ (ko)"],
            ["Voiced", "ガ (ga)", "ギ (gi)", "グ (gu)", "ゲ (ge)", "ゴ (go)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for gorufu (golf).",
      blocks: [
        {
          answers: [
            { title: "ゴキブリ", isTrue: false },
            { title: "ゴルフ", isTrue: true },
            { title: "ココア", isTrue: false },
          ],
        },
      ],
    },
    {
      title: "Dakuon za, ji, zu, ze, zo.",
      blocks: [
        {
          text: "Similarly, we add dakuten to syllables starting with 's', transforming them into voiced sounds.",
        },
        {
          table: [
            ["Voiceless", "サ (sa)", "シ (shi)", "ス (su)", "セ (se)", "ソ (so)"],
            ["Voiced", "ザ (za)", "ジ (ji)", "ズ (zu)", "ゼ (ze)", "ゾ (zo)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for kujira (whale).",
      blocks: [
        {
          sequence: ["ク", "ジ", "ラ"],
        },
      ],
    },
    {
      title: "Dakuon da, ji, zu, de, do.",
      blocks: [
        {
          text: "By adding dakuten to syllables starting with 't', we create another set of voiced sounds.",
        },
        {
          table: [
            ["Voiceless", "タ (ta)", "チ (chi)", "ツ (tsu)", "テ (te)", "ト (to)"],
            ["Voiced", "ダ (da)", "ヂ (ji)", "ヅ (zu)", "デ (de)", "ド (do)"],
          ],
        },
      ],
    },
    {
      title: "Note!",
      blocks: [
        {
          text: "The syllables ジ (ji) and ヂ (ji), as well as ズ (zu) and ヅ (zu), are pronounced the same in modern Japanese. Previously, these sounds were different but have merged over time.",
        },
        {
          text: "It is important to note that for words with 'ji', ジ is most commonly used, and for words with 'zu', ズ is used. Only very few words use ヂ and ヅ.",
        },
        {
          rules: [
            "ジ (ji) and ズ (zu) are used most frequently",
            "ヂ (ji) and ヅ (zu) are used only in a few words",
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for mukade (centipede).",
      blocks: [
        {
          answers: [
            { title: "ムカデ", isTrue: true },
            { title: "ホテル", isTrue: false },
            { title: "インド", isTrue: false },
          ],
        },
      ],
    },
    {
      title: "Dakuon ba, bi, bu, be, bo.",
      blocks: [
        {
          text: "Now let's study the special dakuten marks for the line starting with 'h'.",
        },
        {
          table: [
            ["Sound 'h'", "ハ (ha)", "ヒ (hi)", "フ (fu)", "ヘ (he)", "ホ (ho)"],
            ["Sound 'b'", "バ (ba)", "ビ (bi)", "ブ (bu)", "ベ (be)", "ボ (bo)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for buraun (brown).",
      blocks: [
        {
          answers: [
            { title: "ブラウン", isTrue: true },
            { title: "バイク", isTrue: false },
            { title: "ボリビア", isTrue: false },
          ],
        },
      ],
    },
    {
      title: "Handakuon pa, pi, pu, pe, po.",
      blocks: [
        {
          text: "The hiragana line starting with ハ (ha) is special! We can add not only dakuten but also handakuten, a small circle that transforms the sounds to 'p'.",
        },
        {
          table: [
            ["Sound 'h'", "ハ (ha)", "ヒ (hi)", "フ (fu)", "ヘ (he)", "ホ (ho)"],
            ["Sound 'b'", "バ (ba)", "ビ (bi)", "ブ (bu)", "ベ (be)", "ボ (bo)"],
            ["Sound 'p'", "パ (pa)", "ピ (pi)", "プ (pu)", "ペ (pe)", "ポ (po)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Romaji for アパレル (apparel).",
      blocks: [
        {
          answers: [
            { title: "apareru", isTrue: true },
            { title: "abareru", isTrue: false },
            { title: "ahareru", isTrue: false },
          ],
        },
      ],
    },
  ],
};
