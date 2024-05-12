import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longConsonants: ManuallyLesson = {
  id: "edcb6a6b-4d01-4b37-a53c-9b670f88478b",
  title: "Long Consonants",
  subTitle: "Long Consonants",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about long consonants",
  icon: "母音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Long Consonants",
      blocks: [
        {
          text: "In the previous lesson, we discussed long vowels. Now, let's turn our attention to long consonants in Japanese, which play an equally important role.",
        },
        {
          text: "Doubling of consonants is indicated by the small 'tsu' (っ) character placed before a consonant, creating a pause in the word and lengthening the consonant sound.",
        },
        {
          text: "Examine the examples of using the standard 'tsu' (つ) and the small 'tsu' (っ):",
        },
        {
          rules: [
            "かた (kata) - shoulder",
            "かつた (katsuta) - name",
            "かった (katta) - won",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Match Hiragana with Romaji",
      blocks: [
        {
          pairs: [
            ["かった", "kitte (stamp)"],
            ["にっき", "katta (won)"],
            ["きって", "nikki (diary)"],
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Exception!",
      blocks: [
        {
          text: "Note that the small 'tsu' (っ) is not used before vowels and certain consonants such as **な**, **に**, **ぬ**, **ね**, **の**. In these cases, the symbol **ん** (n) is used to lengthen the sounds.",
        },
        {
          rules: [
            "ごめんなさい (gomennasai) - sorry",
            "おんな (onna) - woman",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Choose the hiragana for kanna (pliers)",
      blocks: [
        {
          sequence: ["ん", "に", "か", "な", "ち", "っ"],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Remember!",
      blocks: [
        {
          text: "The word 'hello' is written as こんにちは (konnichiwa), where the last character is **は** (ha), not **わ** (wa). This is because the phrase was originally longer and used the particle **は** as part of the greeting.",
        },
        {
          text: "Remember, the Japanese topic marker, despite being written as **は** (ha), is always pronounced 'wa'.",
        },
        {
          rules: [
            "こんにちは (konnichiwa) - good afternoon",
            "こんばんは (konbanwa) - good evening",
          ],
        },
      ],
    },
  ],
};
