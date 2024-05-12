import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const additionalKatakanaSounds: ManuallyLesson = {
  id: "b8e91c9c-d468-43b3-a6cc-67f05f46eb7d",
  title: "Additional Katakana Sounds",
  subTitle: "Additional Sounds",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about additional sounds in Katakana",
  icon: "子音",
  category: [KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Adding Vowels to ‘フ’",
      blocks: [
        {
          text: "In Japanese, the 'r' and 'l' sounds are considered identical, as are 'h' and 'f' sounds. Therefore, instead of the 'l' sound, the row for 'r' is used, and for the 'f' sound, the row for 'h' is used. To address the use of the 'f' sound, a new form of notation combining vowels with reduced fonts was adopted.",
        },
        {
          text: "The sound 'フ' (fu) can be combined with reduced vowel characters to create the sounds 'fa', 'fi', 'fe', and 'fo'.",
        },
        {
          table: [
            ["Romaji", "fa", "fi", "fu", "fe", "fo"],
            ["Katakana", "ファ", "フィ", "フ", "フェ", "フォ"],
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
            ["ファイル", "fairu (file)"],
            ["フィリピン", "fōku (fork)"],
            ["フォーク", "firipin (Philippines)"],
          ]
        }
      ]
    },
    {
      name: LessonScreen.Info,
      title: "Supplementing Sounds for ‘ワ’ wa (wa)",
      blocks: [
        {
          text: "You might wonder: if there is only the katakana 'ワ' for 'wa', how are other syllables with the letter 'v' formed, such as 'vo' or 've'? Or do they not exist at all? In Japanese, they indeed do not exist (and are not distinct from the 'b' sound), but they are still present for writing foreign words.",
        },
        {
          text: "In Katakana, there is only the syllable 'ワ' for 'wa' (wa), but to create sounds with 'v', we use vowels based on 'ウ' (u):",
        },
        {
          table: [
            ["Romaji", "wa (wa)", "wi (wi)", "wu (wu)", "we (we)", "wo (wo)"],
            ["Katakana", "ワ", "ウィ", "ウ", "ウェ", "ウォ"],
          ],
        },
        {
          text: "Thus, words like:",
        },
        {
          rules: [
            "‘windows’ (ウィンドウズ)",
            "‘vodka’ (ウォッカ).",
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Take Note!",
      blocks: [
        {
          text: "Sometimes you may encounter obsolete katakana characters 'ヰ', 'ヱ' and 'ヲ', which are not used in modern speech.",
        },
        {
          rules: [
            "‘ヰ’ wi (wi)",
            "‘ヱ’ we (we)",
            "‘ヲ’ wo (wo or o)",
          ]
        }
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Hiragana for haro wīn (Halloween).",
      blocks: [
        {
          rules: [
            "ウェールズ ",
            "ハロウィーン",
            "ウォッカ",
          ]
        }
      ]
    },
    {
      name: LessonScreen.Info,
      title: "‘V’ Sounds Group",
      blocks: [
        {
          text: "To create sounds of the 'v' group in Katakana, characters based on 'ウ' with the addition of a dakuten are used, making the sound harsher:",
        },
        {
          table: [
            ["Romaji", "va (va)", "vi (vi)", "vu (vu)", "ve (ve)", "vo (vo)"],
            ["Katakana", "ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ"],
          ],
        },
        {
          text: "Japanese rarely use the hard 'v' sounds due to pronunciation difficulties.",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Hiragana for vikutoru (Victor).",
      blocks: [
        {
          sequence: ["ク", "ィ", "ヴ", "ェ", "ト", "ル"]
        }
      ]
    },
    {
      name: LessonScreen.Info,
      title: "‘チェ’ Sounds",
      blocks: [
        {
          text: "To express the sound 'che' in Katakana, use the character 'チェ'. This allows for the correct recording of foreign words.",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Hiragana for cherī (cherry).",
      blocks: [
        {
          answers: [
            { title: "アーチェリー", isTrue: true },
            { title: "チェコ", isTrue: true },
            { title: "チェリー", isTrue: true },
          ]
        }
      ]
    },
    {
      name: LessonScreen.Info,
      title: "Sounds 'ディ', 'ドゥ'",
      blocks: [
        {
          text: "For the sounds 'di' and 'du' in Katakana, use the characters 'ディ' and 'ドゥ' respectively.",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Match Katakana with Romaji",
      blocks: [
        {
          pairs: [
            ["エーティーエム", "tūsu (tooth)"],
            ["トゥース", "ētīemu (ATM)"],
            ["ティーポット", "tīpotto (teapot)"],
          ]
        }
      ]
    },
    {
      name: LessonScreen.Info,
      title: "Sounds 'ジェ', 'シェ'",
      blocks: [
        {
          text: "To write the sound 'je' and 'she', use the characters 'ジェ'. and 'シェ'.",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Hiragana for dizunīrando (Disneyland).",
      blocks: [
        {
          answers: [
            { title: "ディズニーランド", isTrue: true },
            { title: "カーディガン", isTrue: true },
            { title: "モルディブ", isTrue: true },
          ]
        }
      ]
    },
    {
      name: LessonScreen.Info,
      title: "Sounds 'ティ', 'トゥ'",
      blocks: [
        {
          text: "To express the sounds 'ti' and 'tu', use the characters 'ティ' and 'トゥ'.",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the Hiragana for shefu (chef).",
      blocks: [
        {
          sequence: ["ク", "ィ", "ヴ", "ェ", "シ", "フ"]
        }
      ]
    },
  ],
};
