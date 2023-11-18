export interface ILetter {
  ka: string
  hi: string
  en: string
  ru: string
  id: number
}

const letters: ILetter[][] = [
  [
    { id: 1, ka: "ア", hi: "あ", en: "A", ru: "А " },
    { id: 2, ka: "イ", hi: "い", en: "I", ru: "И " },
    { id: 3, ka: "ウ", hi: "う", en: "U", ru: "У " },
    { id: 4, ka: "エ", hi: "え", en: "E", ru: "Э " },
    { id: 5, ka: "オ", hi: "お", en: "O", ru: "О " },
  ],
  [
    { id: 6, ka: "カ", hi: "か", en: "KA", ru: "КА" },
    { id: 7, ka: "キ", hi: "き", en: "KI", ru: "КИ" },
    { id: 8, ka: "ク", hi: "く", en: "KU", ru: "КУ" },
    { id: 9, ka: "ケ", hi: "け", en: "KE", ru: "КЭ" },
    { id: 10, ka: "コ", hi: "こ", en: "KO", ru: "КО" },
  ],
  [
    { id: 11, ka: "サ", hi: "さ", en: "SA ", ru: "CА" },
    { id: 12, ka: "シ", hi: "し", en: "SHI", ru: "ШИ" },
    { id: 13, ka: "ス", hi: "す", en: "SU ", ru: "СУ" },
    { id: 14, ka: "セ", hi: "せ", en: "SE ", ru: "СЕ" },
    { id: 15, ka: "ソ", hi: "そ", en: "SO ", ru: "СО" },
  ],
  [
    { id: 16, ka: "タ", hi: "た", en: "TA ", ru: "ТА" },
    { id: 17, ka: "チ", hi: "ち", en: "CHI", ru: "ЧИ" },
    { id: 18, ka: "ツ", hi: "つ", en: "TSU ", ru: "ТУ" },
    { id: 19, ka: "テ", hi: "て", en: "TE ", ru: "ТЭ" },
    { id: 20, ka: "ト", hi: "と", en: "TO ", ru: "ТО" },
  ],
  [
    { id: 21, ka: "ナ", hi: "な", en: "NA", ru: "НА" },
    { id: 22, ka: "ニ", hi: "に", en: "NI", ru: "НИ" },
    { id: 23, ka: "ヌ", hi: "ぬ", en: "NU", ru: "НУ" },
    { id: 24, ka: "ネ", hi: "ね", en: "NE", ru: "НЭ" },
    { id: 25, ka: "ノ", hi: "の", en: "NO", ru: "НО" },
  ],
  [
    { id: 26, ka: "ハ", hi: "は", en: "HA", ru: "ХА" },
    { id: 27, ka: "ヒ", hi: "ひ", en: "HI", ru: "ХИ" },
    { id: 28, ka: "フ", hi: "ふ", en: "FU", ru: "ФУ" },
    { id: 29, ka: "ヘ", hi: "へ", en: "HE", ru: "ХЭ" },
    { id: 30, ka: "ホ", hi: "ほ", en: "HO", ru: "ХО" },
  ],
  [
    { id: 31, ka: "マ", hi: "ま", en: "MA", ru: "МА" },
    { id: 32, ka: "ミ", hi: "み", en: "MI", ru: "МИ" },
    { id: 33, ka: "ム", hi: "む", en: "MU", ru: "МУ" },
    { id: 34, ka: "メ", hi: "め", en: "ME", ru: "МЭ" },
    { id: 35, ka: "モ", hi: "も", en: "MO", ru: "МО" },
  ],
  [
    { id: 36, ka: "ヤ", hi: "や", en: "YA", ru: "Я" },
    { id: 37, ka: "ユ", hi: "ゆ", en: "YU", ru: "Ю" },
    { id: 38, ka: "ヨ", hi: "よ", en: "YO", ru: "Ё" },
  ],
  [
    { id: 39, ka: "ラ", hi: "ら", en: "RA", ru: "РА" },
    { id: 40, ka: "リ", hi: "り", en: "RI", ru: "РИ" },
    { id: 41, ka: "ル", hi: "る", en: "RU", ru: "РУ" },
    { id: 42, ka: "レ", hi: "れ", en: "RE", ru: "РЭ" },
    { id: 43, ka: "ロ", hi: "ろ", en: "RO", ru: "РО" },
  ],
  [
    { id: 44, ka: "ワ", hi: "わ", en: "WA", ru: "ВА" },
    { id: 45, ka: "ヲ", hi: "を", en: "WO", ru: "ВО" },
  ],
  [
    { id: 46, ka: "ガ", hi: "が", en: "GA", ru: "ГА" },
    { id: 47, ka: "ギ", hi: "ぎ", en: "GI", ru: "ГИ" },
    { id: 48, ka: "グ", hi: "ぐ", en: "GU", ru: "ГУ" },
    { id: 49, ka: "ゲ", hi: "げ", en: "GE", ru: "ГЭ" },
    { id: 50, ka: "ゴ", hi: "ご", en: "GO", ru: "ГО" },
  ],
  [
    { id: 51, ka: "ザ", hi: "ざ", en: "ZA", ru: "ЗА" },
    { id: 52, ka: "ジ", hi: "じ", en: "JI", ru: "ДЗИ" },
    { id: 53, ka: "ズ", hi: "ず", en: "ZU", ru: "ДЗУ" },
    { id: 54, ka: "ゼ", hi: "ぜ", en: "ZE", ru: "ДЗЭ" },
    { id: 55, ka: "ゾ", hi: "ぞ", en: "ZO", ru: "ДЗО" },
  ],
  [
    { id: 56, ka: "ダ", hi: "だ", en: "DA", ru: "ДА" },
    { id: 57, ka: "ヂ", hi: "ぢ", en: "JI", ru: "ДЗИ" },
    { id: 58, ka: "ヅ", hi: "づ", en: "ZU", ru: "ДЗУ" },
    { id: 59, ka: "デ", hi: "で", en: "DE", ru: "ДЭ" },
    { id: 60, ka: "ド", hi: "ど", en: "DO", ru: "ДО" },
  ],
  [
    { id: 61, ka: "バ", hi: "ば", en: "BA", ru: "БА" },
    { id: 62, ka: "ビ", hi: "び", en: "BI", ru: "БИ" },
    { id: 63, ka: "ブ", hi: "ぶ", en: "BU", ru: "БУ" },
    { id: 64, ka: "ベ", hi: "べ", en: "BE", ru: "БЭ" },
    { id: 65, ka: "ボ", hi: "ぼ", en: "BO", ru: "БО" },
  ],
  [
    { id: 66, ka: "パ", hi: "ぱ", en: "PA", ru: "ПА" },
    { id: 67, ka: "ピ", hi: "ぴ", en: "PI", ru: "ПИ" },
    { id: 68, ka: "プ", hi: "ぷ", en: "PU", ru: "ПУ" },
    { id: 68, ka: "ペ", hi: "ぺ", en: "PE", ru: "ПЭ" },
    { id: 69, ka: "ポ", hi: "ぽ", en: "PO", ru: "ПО" },
  ],
];


export default letters;