export const lessonIntroduction = {
  id: "52aa8316-4669-41e6-98d3-2b3e42a943ff",
  title: "Introduction",
  subTitle: "Hiragana and Katakana",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about the alphabets in the Japanese language.",
  icon: "序章",
  category: ["hiragana", "katakana"],
  screens: [
    {
      title: "Did You Know?",
      blocks: [
        {
          text: "The Japanese language uses two main alphabets - hiragana and katakana, each consisting of 46 characters.",
        },
        {
          text: "Hiragana is primarily used for writing native Japanese words, while katakana is often used for the transcription of foreign words and names.",
        },
        {
          text: "In addition, the Japanese language actively uses kanji characters, which number about two thousand frequently used symbols.",
        },
      ],
    },
    {
      title: "Hiragana, Katakana, Kanji — What's the Difference?",
      blocks: [
        {
          text: "Hiragana and katakana are syllabic alphabets that represent sounds, whereas kanji convey meaning.",
        },
        {
          table: [
            ["Romaji", "A", "I", "U", "E", "O"],
            ["Hiragana", "あ", "い", "う", "え", "お"],
            ["Katakana", "ア", "イ", "ウ", "エ", "オ"],
          ],
        },
      ],
    },
    {
      title: "Tip!",
      blocks: [
        {
          text: "Learning the correct stroke order is important for writing neat characters. Here are the main rules:",
        },
        {
          rules: [
            "Strokes are written from left to right",
            "Strokes are written from top to bottom",
            "Curves and circles are drawn clockwise",
          ],
        },
      ],
    },
    {
      title: "Watch the Stroke Order.",
      blocks: [
        {
          text: "Following the correct stroke order helps in writing neat characters.",
        },
        {
          id: "a151eeeb-2537-463c-ae23-d484d1bcb835",
          kana: "hiragana",
        },
      ],
    },
    {
      title: "Choose the Correct Writing Direction.",
      blocks: [
        {
          answers: [
            { title: "right to left", isTrue: false },
            { title: "bottom to top", isTrue: false },
            { title: "left to right", isTrue: true },
          ],
        },
      ],
    },
    {
      title: "Stroke Completion.",
      blocks: [
        {
          text: "Mastering the technique of proper stroke completion helps achieve aesthetic and legible writing.",
        },
        {
          text: "To complete a stroke, we stop abruptly, make a hook, or gradually lift the brush.",
        },
        {
          text: "Let's consider different ways of completing strokes, where the first stroke ends with a hook, and the second stops abruptly.",
        },
        {
          id: "11017078-148a-4a44-b3f7-21d1df02d981",
          kana: "hiragana",
        },
      ],
    },
  ],
};
