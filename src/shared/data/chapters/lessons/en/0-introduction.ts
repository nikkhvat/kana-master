import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const lessonIntroduction: ManuallyLesson = {
  id: "52aa8316-4669-41e6-98d3-2b3e42a943ff",
  title: "Introduction",
  subTitle: "Hiragana and Katakana",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about the alphabets in the Japanese language",
  icon: "序章",
  category: [KanaAlphabet.Hiragana, KanaAlphabet.Katakana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Did you know?",
      blocks: [
        {
          text: "The Japanese language has two alphabets: **hiragana** and **katakana**, each containing 46 letters.",
        },
        {
          text: "**Hiragana** is used to write words of Japanese origin, while **katakana** is used for loanwords and foreign names.",
        },
        {
          text: "There are also about 2000 frequently used characters (**kanji**).",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Hiragana? Katakana? Kanji?",
      blocks: [
        {
          text: "Both **hiragana** and **katakana** represent sounds, while **kanji** convey meanings.",
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
      name: LessonScreen.Info,
      title: "Hint!",
      blocks: [
        {
          text: "Let's learn the rules for writing Japanese characters!",
        },
        {
          rules: [
            "Write strokes from left to right",
            "Write strokes from top to bottom",
            "Write most curves and circles clockwise",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Check the stroke order.",
      blocks: [
        {
          text: "Following the correct stroke order helps write neat characters.",
        },
        {
          id: "a151eeeb-2537-463c-ae23-d484d1bcb835",
          kana: KanaAlphabet.Hiragana,
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Check the stroke order.",
      blocks: [
        {
          text: "Select the correct writing rule in Japanese.",
        },
        {
          answers: [
            { title: "Right to left", isTrue: false },
            { title: "Bottom to top", isTrue: false },
            { title: "Left to right", isTrue: true },
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "How to write lines?",
      blocks: [
        {
          text: "Now let's pay attention to how to finish strokes.",
        },
        {
          text: "To finish a stroke, we stop abruptly, make a hook, or gradually move the brush away.",
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Finishing the stroke.",
      blocks: [
        {
          text: "The first stroke ends with a hook, and the second stops abruptly.",
        },
        {
          id: "11017078-148a-4a44-b3f7-21d1df02d981",
          kana: KanaAlphabet.Hiragana,
        },
      ],
    },
  ],
};
