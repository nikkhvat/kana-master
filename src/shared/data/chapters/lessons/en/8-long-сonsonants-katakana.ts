export const longConsonantsKatakana = {
  id: "7c56b8b0-832e-4e2e-badc-cf93f4e97a9e",
  title: "Long Consonants",
  subTitle: "ッ + k, ッ + s, ッ + t, ッ + p",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about long consonants.",
  icon: "子音",
  category: ["katakana"],
  screens: [
    {
      title: "Long Consonants in Katakana.",
      blocks: [
        {
          text: "In Japanese, long consonants play an important role, especially in katakana, where they are denoted by a special symbol.",
        },
        {
          text: "A small 'tsu' (ッ) symbol is used in katakana before a consonant to indicate its doubling. This symbol is not pronounced.",
        },
        {
          text: "Let's look at examples of using the regular 'tsu' (ツ) and the small 'tsu' (ッ):",
        },
        {
          rules: [
            "カット (katto) - haircut",
            "バッグ (baggu) - bag",
          ],
        },
      ],
    },
    {
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ネックレス", "nekkuresu (necklace)"],
            ["ブラック", "burakku (black)"],
            ["ライラック", "rairakku (lilac)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for painappuru (pineapple).",
      blocks: [
        {
          sequence: ["パ", "イ", "ナ", "ッ", "プ", "ル"],
        },
      ],
    },
  ],
};
