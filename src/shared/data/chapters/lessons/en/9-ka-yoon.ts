import { ManuallyLesson } from "@/shared/constants/lessons";

export const yoonKatakana: ManuallyLesson = {
  id: "515aea21-2b85-4a5a-8238-03b4a8044765",
  title: "Yoon in Katakana",
  subTitle: "ヤ, ユ, ヨ",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about yoon in Katakana.",
  icon: "拗音",
  category: ["katakana"],
  screens: [
    {
      
      title: "Yoon in Katakana",
      blocks: [
        {
          text: "In this lesson, we will explore the features of yoon in Katakana, starting with three key characters:"
        },
        {
          rules: [
            "ヤ(ya)",
            "ユ(yu)",
            "ヨ(yo)",
          ]
        },
      ],
    },
    {
      
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ヤモリ", "yamori(gecko)"],
            ["ユーロ", "yūro(euro)"],
            ["ヨーロッパ", "yōroppa(Europe)"],
          ],
        },
      ],
    },
    {
      
      title: "Tip!",
      blocks: [
        {
          text: "There are smaller forms of ヤ (ya), ユ (yu), and ヨ (yo). In pronunciation, these characters combine with a preceding Katakana ending in the 'i' sound, forming a single, complex sound.",
        },
        {
          rules: [
            "キヤ(kiya) - does not exist in Japanese",
            "キャ(kya) - standard pronunciation",
          ],
        },
      ],
    },
    {
      
      title: "Yoon ki, gi.",
      blocks: [
        {
          text: "Let's see how the yoon characters ヤ (ya), ユ (yu), and ヨ (yo) combine with Katakana ending in 'i'. We'll start with キ (ki) and ギ (gi).",
        },
        {
          table: [
            ["キ(ki)", "キャ(kya)", "キュ(kyu)", "キョ(kyo)"],
            ["ギ(gi)", "ギャ(gya)", "ギュ(gyu)", "ギョ(gyo)"]
          ]
        },
      ],
    },
    {
      
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["キャラバン", "kyaraban(caravan)"],
            ["キューバ", "kyūba(Cuba)"],
            ["ギャング", "gyangu(gang)"],
          ],
        },
      ],
    },
    {
      
      title: "Yoon shi, ji.",
      blocks: [
        {
          text: "The next example shows combinations of shi (シ) and ji (ジ) with smaller characters, forming complex sounds.",
        },
        {
          table: [
            ["シ(shi)", "シャ(sha)", "シュ(shu)", "ショ(sho)"],
            ["ジ(ji)", "ジャ(ja)", "ジュ(ju)", "ジョ(jo)"],
          ]
        }
      ],
    },
    {
      
      title: "Choose the Katakana for shatsu (shirt).",
      blocks: [
        {
          answers: [
            { title: "シャツ", isTrue: true },
            { title: "ショーツ", isTrue: false },
            { title: "クジャク", isTrue: false },
          ]
        },
      ],
    },
    {
      
      title: "Yoon chi, ji.",
      blocks: [
        {
          text: "Let's explore combinations of chi (チ) and ji (ヂ). In modern Japanese, ji (ヂ) is often replaced by ji (ジ).",
        },
        {
          table: [
            ["チ(chi)", "チャ(cha)", "チュ(chu)", "チョ(cho)"],
            ["ヂ(ji) (obsolete)", "ヂャ(ja)", "ヂュ(ju)", "ヂョ(jo)"],
          ]
        }
      ],
    },
    {
      
      title: "Choose the Katakana for chansu (chance).",
      blocks: [
        { sequence: ["チ", "ャ", "ン", "ス"] },
      ],
    },
    {
      
      title: "Yoon ni, mi.",
      blocks: [
        {
          text: "Now let's look at how ni (ニ) and mi (ミ) combine with smaller characters to create sounds like nya, nyu, nyo and mya, myu, myo.",
        },
        {
          table: [
            ["ニ(ni)", "ニャ(nya)", "ニュ(nyu)", "ニョ(nyo)"],
            ["ミ(mi)", "ミャ(mya)", "ミュ(myu)", "ミョ(myo)"],
          ]
        },
      ],
    },
    {
      
      title: "Choose the Katakana for myūjikaru (musical).",
      blocks: [
        {
          answers: [
            { title: "ミュージカル", isTrue: true },
            { title: "ミュージカ", isTrue: false },
            { title: "ミュジカル", isTrue: false },
          ]
        },
      ],
    },
    {
      
      title: "Yoon ri.",
      blocks: [
        {
          text: "Let's see how ri (リ) combines with smaller vowels to form complex sounds.",
        },
        {
          rules: [
            "リャ(rya)",
            "リュ(ryu)",
            "リョ(ryo)",
          ]
        },
      ],
    },
    {
      
      title: "Choose the Katakana for ryukkusakku (backpack).",
      blocks: [
        { sequence: ["リ", "ュ", "ッ", "ク", "サ", "ッ", "ク"] },
      ],
    },
    {
      
      title: "Yoon hi, bi, pi.",
      blocks: [
        {
          text: "Finally, let's examine how hi (ヒ), bi (ビ) and pi (ピ) combine with smaller characters to create complex sounds.",
        },
        {
          table: [
            ["ヒ(hi)", "ヒャ(hya)", "ヒュ(hyu)", "ヒョ(hyo)"],
            ["ビ(bi)", "ビャ(bya)", "ビュ(byu)", "ビョ(byo)"],
            ["ピ(pi)", "ピャ(pya)", "ピュ(pyu)", "ピョ(pyo)"],
          ]
        },
      ],
    },
    {
      
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ヒューズ", "hyūzu(fuse)"],
            ["ビューティー", "byūtī(beauty)"],
            ["ヒョウ", "hyō(leopard)"],
          ]
        },
      ],
    },
  ],
};
