import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";

export const longConsonants: ManuallyLesson = {
  id: "edcb6a6b-4d01-4b37-a53c-9b670f88478b",
  title: "Long Consonants",
  subTitle: "Long Consonants",
  infoTitle: "Information",
  infoSubTitle: "Here, we'll tell you about long consonants",
  icon: "母音",
  category: [KanaAlphabet.Hiragana],
  screens: [
    {
      name: LessonScreen.Info,
      title: "Long Consonants",
      blocks: [
        {
          text: "In the previous lesson, we discussed long vowels. In Japanese, consonants can also be long!",
        },
        {
          text: "A small 'tsu' (っ) before a hiragana character denotes long (or doubled) consonants. The 'tsu' (っ) itself isn't pronounced.",
        },
        {
          text: "Compare the words below with the regular 'tsu' (つ) and the small 'tsu' (っ).",
        },
        {
          rules: [
            "かた (kata) - shoulder",
            "かつた (katsuta) - a name",
            "かった (katta) - won",
          ],
        },
      ],
    },
    {
      name: LessonScreen.Info,
      title: "Match Hiragana with Romaji.",
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
          text: "The small 'tsu' (っ) can't be used before the hiragana characters **な** (na), **に** (ni), **ぬ** (nu), **ね** (ne), or **の** (no). To indicate the length of these consonants, **ん** (n) is used.",
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
      title: "Choose the Hiragana for kanna (pliers).",
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
          text: "'Hello' is written as こんにちは (konnichiwa). The last character is **は** (ha), not **わ** (wa), because this expression was once longer and contained the subject marker **は** (ha). Although the longer greeting was shortened, the use of 'wa' as the subject marker **は** (ha) remains.",
        },
        {
          text: "As you might remember, the subject marker is always written as **は** (ha), but pronounced 'wa'.",
        },
        {
          rules: [
            "こんにちは (konnichiwa) - hello",
            "こんばんは (konbanwa) - good evening",
          ],
        },
      ],
    },
  ],
};
