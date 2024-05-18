import { ManuallyLesson } from "@/shared/constants/lessons";

export const dakuonAndHandakuonLesson: ManuallyLesson = {
  id: "52aa8316-4669-41e6-98d3-2b3e42a941ff",
  title: "Dakuon and Handakuon",
  subTitle: "Dakuon and Handakuon",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about special marks in Hiragana",
  icon: "濁音",
  category: ["hiragana"],
  screens: [
    {
      
      title: "Dakuon and Handakuon",
      blocks: [
        {
          text: "Having mastered the basic syllables of Hiragana, it’s time to learn about dakuon and handakuon—special marks that alter the sounds of the syllables.",
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
      
      title: "Match Hiragana with Romaji",
      blocks: [
        {
          pairs: [
            ["へた", "fuku (clothes)"],
            ["ふく", "sushi"],
            ["すし", "heta (clumsy)"],
          ],
        },
      ],
    },
    {
      
      title: "Dakuon ka, ki, ku, ke, ko",
      blocks: [
        {
          text: "By adding special marks called dakuten, which are two short lines, to the syllables, we create new sounds. See how this changes the pronunciation.",
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
      
      title: "Choose the hiragana for kagi (key)",
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
      
      title: "Dakuon za, ji, zu, ze, zo",
      blocks: [
        {
          text: "Similarly, we add dakuten to syllables starting with 's', turning them into voiced sounds.",
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
      
      title: "Choose the hiragana for suzuran (lily of the valley)",
      blocks: [
        {
          sequence: ["す", "ず", "ら", "ん"]
        },
      ],
    },
    {
      
      title: "Dakuon da, ji, zu, de, do",
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
          text: "The syllables じ (ji) and ぢ (ji), as well as ず (zu) and づ (zu), are pronounced the same in modern Japanese. They used to sound different but have merged over time.",
        },
        {
          text: "Note that じ is most commonly used for 'ji', and ず for 'zu'. The syllables ぢ and づ are rarely used.",
        },
        {
          rules: [
            "じ (ji), ず (zu) - most commonly used",
            "ぢ (ji), づ (zu) - rarely used",
          ],
        },
      ],
    },
    {
      
      title: "Choose the hiragana for dashi (Japanese broth)",
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
      
      title: "Dakuon ba, bi, bu, be, bo",
      blocks: [
        {
          text: "Let's see how to apply dakuten to syllables starting with 'h', turning them into the voiced 'b' sounds.",
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
      
      title: "Choose the hiragana for kabuki (Japanese theatre)",
      blocks: [
        {
          answers: [
            { title: "かぶき", isTrue: true },
            { title: "かびき", isTrue: false },
            { title: "かふき", isTrue: false },
          ],
        },
      ],
    },
    {
      
      title: "Handakuon pa, pi, pu, pe, po",
      blocks: [
        {
          text: "A special line of Hiragana starting with 'は' (ha) can also be combined with another mark, the handakuten, a small circle, which transforms the sounds into 'p'.",
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
      
      title: "Choose the romaji for ぱくぱく (eating heartily)",
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
          text: "Using special marks significantly changes the meanings of words, underscoring their importance in the Japanese language.",
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
      
      title: "Match hiragana with romaji",
      blocks: [
        {
          pairs: [
            ["ここ", "goko (5 pieces)"],
            ["ごこ", "gogo (in the afternoon)"],
            ["ごご", "koko (here)"],
          ],
        },
      ],
    },
  ],
};
