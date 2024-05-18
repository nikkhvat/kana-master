import { ManuallyLesson } from "@/shared/constants/lessons";

export const lessonIntroduction: ManuallyLesson = {
  id: "52aa8316-4669-41e6-98d3-2b3e42a943ff",
  title: "Introduction",
  subTitle: "Hiragana and Katakana",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about the alphabets in the Japanese language",
  icon: "序章",
  category: ["hiragana", "katakana"],
  screens: [
    {
      title: "Did you know?",
      blocks: [
        {
          text: "Japanese uses two main alphabets — Hiragana and Katakana, each consisting of 46 characters.",
        },
        {
          text: "Hiragana is primarily used for writing native Japanese words, while Katakana is often used for transcribing foreign words and names.",
        },
        {
          text: "Additionally, Japanese frequently uses Kanji characters, totaling about two thousand commonly used symbols.",
        },
      ],
    },
    {
      title: "Hiragana, Katakana, Kanji — What's the difference?",
      blocks: [
        {
          text: "Hiragana and Katakana are syllabic alphabets representing sounds, whereas Kanji carry meaning.",
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
      title: "Tip: How to Write Kanji",
      blocks: [
        {
          text: "Learning the correct stroke order is important for writing neat Kanji. Here are the basic rules:",
        },
        {
          rules: [
            "Write strokes from left to right",
            "Write strokes from top to bottom",
            "Most curves and circles are drawn clockwise",
          ],
        },
      ],
    },
    {
      title: "Practice: Stroke Order",
      blocks: [
        {
          text: "Understanding and adhering to the correct stroke order is critically important for writing Japanese characters.",
        },
        {
          id: "a151eeeb-2537-463c-ae23-d484d1bcb835",
          kana: "hiragana",
        },
      ],
    },
    {
      title: "Exercise: Choosing the Correct Writing Direction",
      blocks: [
        {
          text: "Determine the correct direction for writing characters:",
        },
        {
          answers: [
            { title: "from right to left", isTrue: false },
            { title: "from bottom to top", isTrue: false },
            { title: "from left to right", isTrue: true },
          ],
        },
      ],
    },
    {
      
      title: "How to Properly Finish Strokes?",
      blocks: [
        {
          text: "Mastering the technique of properly finishing strokes helps achieve aesthetics and readability in writing.",
        },
        {
          text: "A stroke can end with a hook, a sharp stop, or a gradual brush away.",
        },
      ],
    },
    {
      
      title: "Practice: Finishing a Stroke",
      blocks: [
        {
          text: "Let's consider different ways of finishing strokes with examples.",
        },
        {
          id: "11017078-148a-4a44-b3f7-21d1df02d981",
          kana: "hiragana",
        },
      ],
    },
  ],
};
