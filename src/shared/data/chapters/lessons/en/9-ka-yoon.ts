export const yoonKatakana = {
  id: "515aea21-2b85-4a5a-8238-03b4a8044765",
  title: "Yoon",
  subTitle: "ヤ, ユ, ヨ",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about yoon.",
  icon: "拗音",
  category: ["katakana"],
  screens: [
    {
      title: "Yoon",
      blocks: [
        {
          text: "Today we will dive into studying the last rule of hiragana, but first let's recall these three special characters:",
        },
        {
          rules: [
            "ヤ (ya)",
            "ユ (yu)",
            "ヨ (yo)",
          ],
        },
      ],
    },
    {
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ヤモリ", "yamori (gecko)"],
            ["ユーロ", "yūro (euro)"],
            ["ヨーロッパ", "yōroppa (Europe)"],
          ],
        },
      ],
    },
    {
      title: "Tip!",
      blocks: [
        {
          text: "There are smaller versions of **ヤ (ya)**, **ユ (yu)**, and **ヨ (yo)**, which combine with the preceding hiragana syllable to form one sound. Let's compare the standard **ヤ (ya)** and the small **ャ (ya)**.",
        },
        {
          rules: [
            "キヤ (kiya)",
            "キャ (kya)",
          ],
        },
      ],
    },
    {
      title: "Yoon ki, gi.",
      blocks: [
        {
          text: "Yoon elements (ヤ, ユ, ヨ) can combine with characters ending in 'i'. First, let's look at combinations with キ (ki) and ギ (gi).",
        },
        {
          table: [
            ["キ (ki)", "キャ (kya)", "キュ (kyu)", "キョ (kyo)"],
            ["ギ (gi)", "ギャ (gya)", "ギュ (gyu)", "ギョ (gyo)"],
          ],
        },
      ],
    },
    {
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["キャラバン", "kyaraban (caravan)"],
            ["キューバ", "kyūba (Cuba)"],
            ["ギャング", "gyangu (gang)"],
          ],
        },
      ],
    },
    {
      title: "Yoon shi, ji.",
      blocks: [
        {
          text: "The syllables shi (**シ**) and ji (**ジ**) can also form yoon with **ャ**, **ュ**, **ョ**, creating the sounds sha, shu, sho, and ja, ju, jo.",
        },
        {
          table: [
            ["シ (shi)", "シャ (sha)", "シュ (shu)", "ショ (sho)"],
            ["ジ (ji)", "ジャ (ja)", "ジュ (ju)", "ジョ (jo)"],
          ],
        },
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
          ],
        },
      ],
    },
    {
      title: "Yoon chi, ji.",
      blocks: [
        {
          text: "The syllables **チ** (chi) and **ヂ** (ji) can be used to create the sounds cha, chu, cho, and ja, ju, jo. In modern Japanese, **ヂ** is often replaced with **ジ**.",
        },
        {
          table: [
            ["チ (chi)", "チャ (cha)", "チュ (chu)", "チョ (cho)"],
            ["ヂ (ji) (old)", "ヂャ (ja)", "ヂュ (ju)", "ヂョ (jo)"],
          ],
        },
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
          text: "The combinations ni (**ニ**) and mi (**ミ**) with smaller characters allow for complex sounds like nya, nyu, nyo, and mya, myu, myo.",
        },
        {
          table: [
            ["ニ (ni)", "ニャ (nya)", "ニュ (nyu)", "ニョ (nyo)"],
            ["ミ (mi)", "ミャ (mya)", "ミュ (myu)", "ミョ (myo)"],
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for myūjikaru (musical).",
      blocks: [
        {
          answers: [
            { title: "トウミョウ", isTrue: false },
            { title: "ミュージカル", isTrue: true },
            { title: "ニューギニア", isTrue: false },
          ],
        },
      ],
    },
    {
      title: "Yoon ri.",
      blocks: [
        {
          text: "The syllable ri (**リ**) combines with smaller vowels to form the sounds rya, ryu, ryo.",
        },
        {
          rules: [
            "リャ (rya)",
            "リュ (ryu)",
            "リョ (ryo)",
          ],
        },
      ],
    },
    {
      title: "Choose the Katakana for ryukkusakku (rucksack).",
      blocks: [
        { sequence: ["リ", "ュ", "ッ", "ク", "サ", "ッ", "ク"] },
      ],
    },
    {
      title: "Yoon hi, bi, pi.",
      blocks: [
        {
          text: "To create yoon sounds, use the syllables hi (**ヒ**), bi (**ビ**), and pi (**ピ**) in combination with smaller vowels.",
        },
        {
          table: [
            ["ヒ (hi)", "ヒャ (hya)", "ヒュ (hyu)", "ヒョ (hyo)"],
            ["ビ (bi)", "ビャ (bya)", "ビュ (byu)", "ビョ (byo)"],
            ["ピ (pi)", "ピャ (pya)", "ピュ (pyu)", "ピョ (pyo)"],
          ],
        },
      ],
    },
    {
      title: "Match Katakana with Romaji.",
      blocks: [
        {
          pairs: [
            ["ヒューズ", "hyūzu (fuse)"],
            ["ビューティー", "byūtī (beauty)"],
            ["ヒョウ", "hyō (leopard)"],
          ],
        },
      ],
    },
  ],
};
