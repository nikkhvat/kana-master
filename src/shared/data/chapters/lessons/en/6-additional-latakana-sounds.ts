export const additionalKatakanaSounds = {
  id: "b8e91c9c-d468-43b3-a6cc-67f05f46eb7d",
  title: "Additional Sounds",
  subTitle: "ァ, ィ, ゥ, ェ, ォ",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about additional sounds in katakana.",
  icon: "子音",
  category: ["katakana"],
  screens: [
    {
      title: "Adding Vowels to 'フ'.",
      blocks: [
        {
          text: "In Japanese, the sounds 'r' and 'l' are considered identical, as are the sounds 'h' and 'f'. Therefore, the 'r' syllable row is used instead of the 'l' sound, and the 'h' syllable row for the 'f' sound. To address the issue of using the 'f' sound, a new form of writing was adopted, combining vowels with a smaller font.",
        },
        {
          text: "The sound 'フ' (fu) can be combined with smaller vowel characters to create the sounds 'fa', 'fi', 'fe', and 'fo'.",
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
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ファイル", "fairu (folder)"],
            ["フィリピン", "firipin (Philippines)"],
            ["フォーク", "fōku (fork)"],
          ],
        },
      ],
    },
    {
      title: "Adding Sounds to 'ワ' wa (wa).",
      blocks: [
        {
          text: "You may be wondering: if there is only the katakana 'wa', how are other syllables with the letter 'v', like 'vo' or 've', formed? Do they even exist? In Japanese, they do not exist (and are indistinguishable from the 'b' sound), but they are still present for writing foreign words.",
        },
        {
          text: "In katakana, there is only the syllable 'ワ' wa (wa), but to create sounds with 'v', we use vowels with the base 'ウ' (u):",
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
            "‘window’ (ウィンドウズ)",
            "‘vodka’ (ウォッカ).",
          ],
        },
      ],
    },
    {
      title: "Attention!",
      blocks: [
        {
          text: "You may occasionally encounter the obsolete katakana characters 'ヰ', 'ヱ', and 'ヲ', which are not used in modern speech.",
        },
        {
          rules: [
            "‘ヰ’ wi (wi)",
            "‘ヱ’ we (we)",
            "‘ヲ’ wo (wo or o)",
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for haro wīn (Halloween).",
      blocks: [
        {
          answers: [
            { title: "ウェールズ", isTrue: false },
            { title: "ハロウィーン", isTrue: true },
            { title: "ウォッカ", isTrue: false },
          ],
        },
      ],
    },
    {
      title: "Group 'V' Sounds.",
      blocks: [
        {
          text: "To create 'V' group sounds in katakana, characters based on 'ウ' with the addition of dakuten are used, making the sound harder:",
        },
        {
          table: [
            ["Romaji", "va (va)", "vi (vi)", "vu (vu)", "ve (ve)", "vo (vo)"],
            ["Katakana", "ヴァ", "ヴィ", "ヴ", "ヴェ", "ヴォ"],
          ],
        },
        {
          text: "Japanese people rarely use the hard 'ヴ' sounds due to the difficulty of pronunciation.",
        },
      ],
    },
    {
      title: "Choose the Katakana for vikutoru (Victor).",
      blocks: [
        {
          sequence: ["ヴ", "ィ", "ク", "ト", "ル"],
        },
      ],
    },
    {
      title: "Sound 'チェ'.",
      blocks: [
        {
          text: "To express the 'che' sound in katakana, use the symbol 'チェ'. This allows for the correct recording of foreign words.",
        },
      ],
    },
    {
      title: "Choose the Katakana for cherī (cherry).",
      blocks: [
        {
          answers: [
            { title: "アーチェリー", isTrue: false },
            { title: "チェコ", isTrue: false },
            { title: "チェリー", isTrue: true },
          ],
        },
      ],
    },
    {
      title: "Sounds 'ティ', 'トゥ'.",
      blocks: [
        {
          text: "To express the sounds 'ti' and 'tu', use the symbols 'ティ' and 'トゥ'.",
        },
      ],
    },
    {
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["エーティーエム", "ētīemu (ATM)"],
            ["トゥース", "tūsu (tooth)"],
            ["ティーポット", "tīpotto (teapot)"],
          ],
        },
      ],
    },
    {
      title: "Sounds 'ディ', 'ドゥ'.",
      blocks: [
        {
          text: "For the sounds 'di' and 'du' in katakana, use the symbols 'ディ' and 'ドゥ' respectively.",
        },
      ],
    },
    {
      title: "Choose the Katakana for dizunīrando (Disneyland).",
      blocks: [
        {
          answers: [
            { title: "ディズニーランド", isTrue: true },
            { title: "カーディガン", isTrue: false },
            { title: "モルディブ", isTrue: false },
          ],
        },
      ],
    },
    {
      title: "Sounds 'シェ', 'ジェ'.",
      blocks: [
        {
          text: "To write the sounds 'she' and 'je', use the symbols 'シェ' and 'ジェ'.",
        },
      ],
    },
    {
      title: "Choose the Katakana for shefu (chef).",
      blocks: [
        {
          sequence: ["シ", "ェ", "フ"],
        },
      ],
    },
  ],
};
