export const yoonHiragana = {
  id: "a16a1684-bdc7-4f2c-9c0a-ebbd89d61b0b",
  title: "Yoon",
  subTitle: "や, ゆ, よ",
  infoTitle: "Information",
  infoSubTitle: "Here we will tell you about Yoon.",
  icon: "拗音",
  category: ["hiragana"],
  screens: [
    {
      
      title: "Long Consonants",
      blocks: [
        {
          text: "Today we will delve into the last rule of Hiragana, but first let's revisit these three special letters:",
        },
        {
          rules: [
            "や (ya)",
            "ゆ (yu)",
            "よ (yo)",
          ],
        },
      ],
    },
    {
      
      title: "Match Hiragana with Romaji",
      blocks: [
        {
          pairs: [
            ["はやし", "yuki(snow)"],
            ["ゆき", "hayashi(grove)"],
            ["よきん", "yokin(deposit)"],
          ],
        },
      ],
    },
    {
      
      title: "Hint!",
      blocks: [
        {
          text: "There are miniature versions of や (ya), ゆ (yu), and よ (yo) that, when pronounced, blend with the preceding letter to form a single sound. Let's compare the standard や (ya) and the miniature ゃ (ya).",
        },
        {
          rules: [
            "きや(kiya)",
            "きゃ(kya)",
          ],
        },
      ],
    },
    {
      
      title: "Yoon ki, gi",
      blocks: [
        {
          text: "The Yoon elements (や, ゆ, よ) can combine with characters that end with the 'i' sound. Let's start with combinations of き (ki) and ぎ (gi).",
        },
        {
          table: [
            ["き(ki)", "きゃ(kya)", "きゅ(kyu)", "きょ(kyo)"],
            ["ぎ(gi)", "ぎゃ(gya)", "ぎゅ(gyu)", "ぎょ(gyo)"]
          ]
        },
      ],
    },
    {
      
      title: "Match Hiragana with Romaji",
      blocks: [
        {
          pairs: [
            ["きゅうり", "gyo uji(event)"],
            ["ぎゅうにく", "kyuuri(cucumber)"],
            ["ぎょうじ", "gyuuniku(beef)"],
          ],
        },
      ],
    },
    {
      
      title: "Yoon shi, ji",
      blocks: [
        {
          text: "The letters shi (し) and ji (じ) can also form Yoon with the letters ゃ, ゅ, ょ, creating sounds like sha, shu, sho and ja, ju, jo.",
        },
        {
          table: [
            ["し(shi)", "しゃ(sha)", "しゅ(shu)", "しょ(sho)"],
            ["じ(ji)", "じゃ(ja)", "じゅ(ju)", "じょ(jo)"],
          ]
        }
      ],
    },
    {
      
      title: "Choose the hiragana for jū gyo ui n (employee).",
      blocks: [
        {
          answers: [
            { title: "じゅけん", isTrue: false },
            { title: "じゅうぎょういん", isTrue: true },
            { title: "しゅうでん", isTrue: false },
          ]
        },
      ],
    },
    {
      
      title: "Yoon chi, ji",
      blocks: [
        {
          text: "Letters チ (chi) and ヂ (ji) can be used to create sounds like cha, chu, cho and dza, dzu, dzo. In modern Japanese, the letter ヂ is often replaced with ジ.",
        },
        {
          table: [
            ["ち(chi)", "ちゃ(cha)", "ちゅ(chu)", "ちょ(cho)"],
            ["ぢ(ji)", "ぢゃ(ja)", "ぢゅ(ju)", "ぢょ(jo)"],
          ]
        }
      ],
    },
    {
      
      title: "Choose the hiragana for te chou (notebook).",
      blocks: [
        { sequence: ["ょ", "ゅ", "て", "う", "ち", "ん"] },
      ],
    },
    {
      
      title: "Yoon ni, mi",
      blocks: [
        { text: "Combinations of ni (に) and mi (み) with miniature symbols allow the creation of complex sounds nya, nyu, nyo and mya, myu, myo." },
        {
          table: [
            ["に(ni)", "にゃ(nya)", "にゅ(nyu)", "にょ(nyo)"],
            ["み(mi)", "みゃ(mya)", "みゅ(myu)", "みょ(myo)"],
          ]
        },
      ],
    },
    {
      
      title: "Choose the hiragana for gyuunyuu (milk).",
      blocks: [
        {
          answers: [
            { title: "ぎゅうにゅう", isTrue: true },
            { title: "みょうが", isTrue: false },
            { title: "にゅうがく", isTrue: false },
          ]
        },
      ],
    },
    {
      
      title: "Yoon ri",
      blocks: [
        { text: "Letter ri (り) combines with miniature vowels to form sounds rya, ryu, ryo." },
        {
          rules: [
            "りゃ(rya)",
            "りゅ(ryu)",
            "りょ(ryo)",
          ]
        },
      ],
    },
    {
      
      title: "Choose the hiragana for ryōri ni n (chef).",
      blocks: [
        { sequence: ["り", "う", "り", "に", "ょ", "ん"] },
      ],
    },
    {
      
      title: "Yoon hi, bi, pi",
      blocks: [
        { text: "Use the letters hi (ひ), bi (び), and pi (ぴ) in combination with miniature vowels to create Yoon sounds." },
        {
          table: [
            ["ひ(hi)", "ひゃ(hya)", "ひゅ(hyu)", "ひょ(hyo)"],
            ["び(bi)", "びゃ(bya)", "びゅ(byu)", "びょ(byo)"],
            ["ぴ(pi)", "ぴゃ(pya)", "ぴゅ(pyu)", "ぴょ(pyo)"]
          ]
        },
      ],
    },
    {
      
      title: "Yoon hi, bi, pi",
      blocks: [
        { text: "Examine how these sounds change the meaning of a word depending on the context." },
        {
          pairs: [
            ["ひょう", "ji koku hyou (train schedule)"],
            ["びょういん", "byō i n (hospital)"],
            ["じこくひょう", "hyou (hail)"],
          ]
        },
      ],
    },
  ],
};
