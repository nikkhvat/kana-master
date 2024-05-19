export const dakuonAndHandakuonLesson = {
  id: "52aa8316-4669-41e6-98d3-2b3e42a941ff",
  title: "Dakuon and Handakuon",
  subTitle: "Special Hiragana Marks",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about special hiragana marks.",
  icon: "濁音",
  category: ["hiragana"],
  screens: [
    {
      title: "Dakuon and Handakuon.",
      blocks: [
        {
          text: "After mastering the basic hiragana syllables, it's time to get acquainted with dakuon and handakuon—special marks that change the sound of the syllables.",
        },
        {
          text: "First, let's find out which hiragana syllables can use these marks:",
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
              "Hiragana",
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
      title: "Match Hiragana with Romaji.",
      blocks: [
        {
          pairs: [
            ["きく", "kiku (to listen)"],
            ["つち", "tsuchi (earth)"],
            ["ほし", "hoshi (star)"],
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
      title: "Choose the Hiragana for kagi (key).",
      blocks: [
        {
          answers: [
            { title: "がき", isTrue: false },
            { title: "がぎ", isTrue: false },
            { title: "かぎ", isTrue: true },
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
            ["Voiceless", "さ (sa)", "し (shi)", "す (su)", "せ (se)", "そ (so)"],
            ["Voiced", "ざ (za)", "じ (ji)", "ず (zu)", "ぜ (ze)", "ぞ (zo)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Hiragana for suzuran (lily of the valley).",
      blocks: [
        {
          sequence: ["す", "ず", "ら", "ん"]
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
            ["Voiceless", "た (ta)", "ち (chi)", "つ (tsu)", "て (te)", "と (to)"],
            ["Voiced", "だ (da)", "ぢ (ji)", "づ (zu)", "で (de)", "ど (do)"],
          ],
        },
      ],
    },
    {
      title: "Note!",
      blocks: [
        {
          text: "The syllables じ (ji) and ぢ (ji), as well as ず (zu) and づ (zu), are pronounced the same in modern Japanese. Previously, these sounds were different but have merged over time.",
        },
        {
          text: "Note that for words with 'ji', じ is most commonly used, and for words with 'zu', ず is used. Only very few words use ぢ and づ.",
        },
        {
          rules: [
            "じ(ji), ず(zu) - used in most cases",
            "ぢ(ji), づ(zu) - used only in a few words",
          ],
        },
      ],
    },
    {
      title: "Choose the Hiragana for dashi (Japanese soup stock).",
      blocks: [
        {
          answers: [
            { title: "たじ", isTrue: false },
            { title: "だし", isTrue: true },
            { title: "だじ", isTrue: false },
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
            ["Sound 'h'", "は (ha)", "ひ (hi)", "ふ (fu)", "へ (he)", "ほ (ho)"],
            ["Sound 'b'", "ば (ba)", "び (bi)", "ぶ (bu)", "べ (be)", "ぼ (bo)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Hiragana for kabuki (Japanese theater).",
      blocks: [
        {
          answers: [
            { title: "かふぎ", isTrue: false },
            { title: "がぶき", isTrue: false },
            { title: "かぶき", isTrue: true },
          ],
        },
      ],
    },
    {
      title: "Handakuon pa, pi, pu, pe, po.",
      blocks: [
        {
          text: "The hiragana line starting with は(ha) is special! We can add not only dakuten but also handakuten, a small circle that transforms the sounds to 'p'.",
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
      title: "Choose the Romaji for ぱくぱく (eating heartily).",
      blocks: [
        {
          answers: [
            { title: "hakuhaku", isTrue: false },
            { title: "pakupaku", isTrue: true },
            { title: "bakubaku", isTrue: false },
          ],
        },
      ],
    },
    {
      title: "Tip!",
      blocks: [
        {
          text: "The use of special marks significantly changes the meanings of words, highlighting their importance in the Japanese language.",
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
      title: "Match Hiragana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ここ", "koko (here)"],
            ["ごこ", "goko (5 pieces)"],
            ["ごご", "gogo (afternoon)"],
          ],
        },
      ],
    },
  ],
};
