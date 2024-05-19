export const longVowelsKatakana = {
  id: "3e8bfb8e-6470-40d7-8b89-7635f23f4f92",
  title: "Long Vowels",
  subTitle: "アー, イー, ウー, エー, オー",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about long vowels.",
  icon: "母音",
  category: ["katakana"],
  screens: [
    {
      title: "Long Vowels in Katakana.",
      blocks: [
        {
          text: "Katakana uses a unique approach to denote long vowel sounds. In this lesson, we will learn how to write them correctly.",
        },
        {
          text: "In katakana, long vowels are indicated using a horizontal bar (ー), which is different from hiragana, where the characters 'あ', 'い', and 'う' are used to extend vowels.",
        },
        {
          text: "Familiarize yourself with examples of using long vowels in katakana:",
        },
        {
          table: [
            ["Romaji", "A", "I", "U", "E", "O"],
            ["Katakana", "アー", "イー", "ウー", "エー", "オー"],
          ],
        },
      ],
    },
    {
      title: "Tip!",
      blocks: [
        {
          text: "The difference between short and long vowels in katakana is critical as it can change the meaning of words. Here is an example showing how the meaning of a word changes:",
        },
        {
          rules: [
            "ビル (biru) - building",
            "ビール (biiru) - beer",
          ],
        },
      ],
    },
    {
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["チーター", "chītā (cheetah)"],
            ["ローン", "rōn (loan)"],
            ["ユーロ", "yūro (euro)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for apāto (apartment).",
      blocks: [
        { sequence: ["ア", "パ", "ー", "ト"] },
      ],
    },
  ],
};
