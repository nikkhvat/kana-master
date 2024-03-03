export type LettersKeysBase = keyof typeof lettersTableBase
export type LettersKeysDakuon = keyof typeof lettersTableDakuon
export type LettersKeysHandakuon = keyof typeof lettersTableHandakuon
export type LettersKeysYoon = keyof typeof lettersTableYoon

export type LettersKeys = LettersKeysBase | LettersKeysDakuon | LettersKeysHandakuon | LettersKeysYoon

export interface ILetter {
  readonly ka: string
  readonly hi: string
  readonly en: string
  readonly ru: string
  readonly id: LettersKeys
}

const lettersTableBase = {
  "11017078-148a-4a44-b3f7-21d1df02d981": { id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И" },
  "a151eeeb-2537-463c-ae23-d484d1bcb835": { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А" },
  "70680d73-c9f9-4b4e-aac4-c82caa49668c": { id: "70680d73-c9f9-4b4e-aac4-c82caa49668c", ka: "エ", hi: "え", en: "E", ru: "Э" },
  "bcbd90e2-fabc-4dcc-8022-02e5b650c822": { id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822", ka: "ウ", hi: "う", en: "U", ru: "У" },
  "e430643d-5624-432e-b53e-974447baad22": { id: "e430643d-5624-432e-b53e-974447baad22", ka: "オ", hi: "お", en: "O", ru: "О" },
  "22350aba-d254-48ba-811a-9d1448761042": { id: "22350aba-d254-48ba-811a-9d1448761042", ka: "カ", hi: "か", en: "KA", ru: "КА" },
  "a1d45e3b-a1c9-4409-8d39-725a0a35899d": { id: "a1d45e3b-a1c9-4409-8d39-725a0a35899d", ka: "キ", hi: "き", en: "KI", ru: "КИ" },
  "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1": { id: "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1", ka: "ク", hi: "く", en: "KU", ru: "КУ" },
  "9a84b07b-696a-4abd-83f2-70ff8ec66a66": { id: "9a84b07b-696a-4abd-83f2-70ff8ec66a66", ka: "ケ", hi: "け", en: "KE", ru: "КЭ" },
  "8a2655c3-4553-4f58-83db-069439b11154": { id: "8a2655c3-4553-4f58-83db-069439b11154", ka: "コ", hi: "こ", en: "KO", ru: "КО" },
  "5bc17c31-0c79-45dd-be5c-41cf67a5baf0": { id: "5bc17c31-0c79-45dd-be5c-41cf67a5baf0", ka: "サ", hi: "さ", en: "SA", ru: "CА" },
  "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2": { id: "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2", ka: "シ", hi: "し", en: "SHI", ru: "ШИ" },
  "c495772d-7048-4423-a993-60ce5ce325a2": { id: "c495772d-7048-4423-a993-60ce5ce325a2", ka: "ス", hi: "す", en: "SU", ru: "СУ" },
  "0106956a-9090-4599-93a2-0be363bcf7bf": { id: "0106956a-9090-4599-93a2-0be363bcf7bf", ka: "セ", hi: "せ", en: "SE", ru: "СЕ" },
  "3108807a-1d5e-47b3-9f06-514bc8096102": { id: "3108807a-1d5e-47b3-9f06-514bc8096102", ka: "ソ", hi: "そ", en: "SO", ru: "СО" },
  "36b4894e-19d1-4efe-961d-d9dbc6284757": { id: "36b4894e-19d1-4efe-961d-d9dbc6284757", ka: "タ", hi: "た", en: "TA", ru: "ТА" },
  "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d": { id: "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d", ka: "チ", hi: "ち", en: "CHI", ru: "ЧИ" },
  "08123485-a3d0-461e-8af3-bf6708b74d90": { id: "08123485-a3d0-461e-8af3-bf6708b74d90", ka: "ツ", hi: "つ", en: "TSU", ru: "ТУ" },
  "45870b67-8005-4ee1-a79c-a239289ef9b6": { id: "45870b67-8005-4ee1-a79c-a239289ef9b6", ka: "テ", hi: "て", en: "TE", ru: "ТЭ" },
  "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f": { id: "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f", ka: "ト", hi: "と", en: "TO", ru: "ТО" },
  "426cc9fd-4eeb-4914-9484-e87f922365fe": { id: "426cc9fd-4eeb-4914-9484-e87f922365fe", ka: "ナ", hi: "な", en: "NA", ru: "НА" },
  "16c7e660-5f2f-44bb-82aa-72722e944126": { id: "16c7e660-5f2f-44bb-82aa-72722e944126", ka: "ニ", hi: "に", en: "NI", ru: "НИ" },
  "6a1e5aa1-6978-4f46-bd78-1310607d9018": { id: "6a1e5aa1-6978-4f46-bd78-1310607d9018", ka: "ヌ", hi: "ぬ", en: "NU", ru: "НУ" },
  "78f412ca-a2fc-4319-9444-288363407b45": { id: "78f412ca-a2fc-4319-9444-288363407b45", ka: "ネ", hi: "ね", en: "NE", ru: "НЭ" },
  "8b140c48-5818-4a3b-b8fe-0ddc49852778": { id: "8b140c48-5818-4a3b-b8fe-0ddc49852778", ka: "ノ", hi: "の", en: "NO", ru: "НО" },
  "98db662b-5ca1-47cd-9026-735c762c76f6": { id: "98db662b-5ca1-47cd-9026-735c762c76f6", ka: "ハ", hi: "は", en: "HA", ru: "ХА" },
  "458fcd0d-1f08-4222-99c7-e17000999ccf": { id: "458fcd0d-1f08-4222-99c7-e17000999ccf", ka: "ヒ", hi: "ひ", en: "HI", ru: "ХИ" },
  "6ee7807e-278a-4652-8445-f3062e026891": { id: "6ee7807e-278a-4652-8445-f3062e026891", ka: "フ", hi: "ふ", en: "FU", ru: "ФУ" },
  "1014abd7-deb5-4c6b-a1dc-27543817c9fe": { id: "1014abd7-deb5-4c6b-a1dc-27543817c9fe", ka: "ヘ", hi: "へ", en: "HE", ru: "ХЭ" },
  "d80bf13e-66cd-4cf9-93e7-09cb2f435ead": { id: "d80bf13e-66cd-4cf9-93e7-09cb2f435ead", ka: "ホ", hi: "ほ", en: "HO", ru: "ХО" },
  "827078b5-74f9-499b-a523-0fea2020a5af": { id: "827078b5-74f9-499b-a523-0fea2020a5af", ka: "マ", hi: "ま", en: "MA", ru: "МА" },
  "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9": { id: "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9", ka: "ミ", hi: "み", en: "MI", ru: "МИ" },
  "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69": { id: "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69", ka: "ム", hi: "む", en: "MU", ru: "МУ" },
  "3037e1df-8072-4273-abf1-664b500613af": { id: "3037e1df-8072-4273-abf1-664b500613af", ka: "メ", hi: "め", en: "ME", ru: "МЭ" },
  "54a8b634-b713-4652-957e-fffa3b3319cc": { id: "54a8b634-b713-4652-957e-fffa3b3319cc", ka: "モ", hi: "も", en: "MO", ru: "МО" },
  "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89": { id: "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89", ka: "ヤ", hi: "や", en: "YA", ru: "Я" },
  "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5": { id: "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5", ka: "ユ", hi: "ゆ", en: "YU", ru: "Ю" },
  "5b7da1eb-3e8c-418f-bcb5-ea8551c77706": { id: "5b7da1eb-3e8c-418f-bcb5-ea8551c77706", ka: "ヨ", hi: "よ", en: "YO", ru: "Ё" },
  "859472d4-50b2-4574-adcf-65b301aa916e": { id: "859472d4-50b2-4574-adcf-65b301aa916e", ka: "ラ", hi: "ら", en: "RA", ru: "РА" },
  "6e0e6570-0e60-46e4-8735-40ad423daec2": { id: "6e0e6570-0e60-46e4-8735-40ad423daec2", ka: "リ", hi: "り", en: "RI", ru: "РИ" },
  "1a43007b-1cfb-49a0-baea-02fe8d7cd78a": { id: "1a43007b-1cfb-49a0-baea-02fe8d7cd78a", ka: "ル", hi: "る", en: "RU", ru: "РУ" },
  "e53fdab4-2d04-452d-a635-d2ac728c6a32": { id: "e53fdab4-2d04-452d-a635-d2ac728c6a32", ka: "レ", hi: "れ", en: "RE", ru: "РЭ" },
  "6ba2a0b0-d443-4323-a382-c8144cd996d3": { id: "6ba2a0b0-d443-4323-a382-c8144cd996d3", ka: "ロ", hi: "ろ", en: "RO", ru: "РО" },
  "a53d8501-373d-4944-a76b-657f672162f9": { id: "a53d8501-373d-4944-a76b-657f672162f9", ka: "ワ", hi: "わ", en: "WA", ru: "ВА" },
  "8b8c04b7-b8f9-44f8-b188-b9c1e406fd12": { id: "8b8c04b7-b8f9-44f8-b188-b9c1e406fd12", ka: "ヰ", hi: "ゐ", en: "WI", ru: "ВИ" },
  "92f412f6-6c79-47ca-8be5-bf3f75500f25": { id: "92f412f6-6c79-47ca-8be5-bf3f75500f25", ka: "ヱ", hi: "ゑ", en: "WE", ru: "ВЕ" },
  "858b53e1-af17-45d5-8fc2-330121eab5c4": { id: "858b53e1-af17-45d5-8fc2-330121eab5c4", ka: "ヲ", hi: "を", en: "WO", ru: "ВО" },
  "2a481d17-0d7c-492a-85fc-cab60e9fb6df": { id: "2a481d17-0d7c-492a-85fc-cab60e9fb6df", ka: "ン", hi: "ん", en: "N", ru: "Н" },
};

const lettersTableDakuon = {
  "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d": { id: "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d", ka: "ガ", hi: "が", en: "GA", ru: "ГА" },
  "e6131a96-35f2-48ae-a2ee-53d7bde93a8b": { id: "e6131a96-35f2-48ae-a2ee-53d7bde93a8b", ka: "ギ", hi: "ぎ", en: "GI", ru: "ГИ" },
  "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9": { id: "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9", ka: "グ", hi: "ぐ", en: "GU", ru: "ГУ" },
  "9a32b896-4743-4b55-ac7c-196212dbd2b0": { id: "9a32b896-4743-4b55-ac7c-196212dbd2b0", ka: "ゲ", hi: "げ", en: "GE", ru: "ГЭ" },
  "c2166cbb-af44-426f-aed2-0b56c51de6b3": { id: "c2166cbb-af44-426f-aed2-0b56c51de6b3", ka: "ゴ", hi: "ご", en: "GO", ru: "ГО" },
  "cb29ec69-5f4b-4e0a-b109-ae7c294517ac": { id: "cb29ec69-5f4b-4e0a-b109-ae7c294517ac", ka: "ザ", hi: "ざ", en: "ZA", ru: "ЗА" },
  "dbdaff4f-4797-4241-8a76-7c300dadb795": { id: "dbdaff4f-4797-4241-8a76-7c300dadb795", ka: "ジ", hi: "じ", en: "JI", ru: "ДЗИ" },
  "9e920fe4-fc1a-492b-9000-a75c34830e0f": { id: "9e920fe4-fc1a-492b-9000-a75c34830e0f", ka: "ズ", hi: "ず", en: "ZU", ru: "ДЗУ" },
  "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225": { id: "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225", ka: "ゼ", hi: "ぜ", en: "ZE", ru: "ДЗЭ" },
  "a6269b58-d808-48be-a8d9-edfcb03a8a7c": { id: "a6269b58-d808-48be-a8d9-edfcb03a8a7c", ka: "ゾ", hi: "ぞ", en: "ZO", ru: "ДЗО" },
  "9b41239e-9b08-41ae-b794-9bcd19d7f488": { id: "9b41239e-9b08-41ae-b794-9bcd19d7f488", ka: "ダ", hi: "だ", en: "DA", ru: "ДА" },
  "fcf5368d-40e1-4de6-b564-b3ab430541e4": { id: "fcf5368d-40e1-4de6-b564-b3ab430541e4", ka: "ヂ", hi: "ぢ", en: "DJI", ru: "ДЗИ" },
  "942585bb-b0ed-4712-9fd0-e4e9c91d63bd": { id: "942585bb-b0ed-4712-9fd0-e4e9c91d63bd", ka: "ヅ", hi: "づ", en: "DZU", ru: "ДЗУ" },
  "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268": { id: "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268", ka: "デ", hi: "で", en: "DE", ru: "ДЭ" },
  "a9d9d96f-485c-4352-a845-2c9ea0cccc08": { id: "a9d9d96f-485c-4352-a845-2c9ea0cccc08", ka: "ド", hi: "ど", en: "DO", ru: "ДО" },
  "364900be-ce05-410d-81f5-b5c6ca75b477": { id: "364900be-ce05-410d-81f5-b5c6ca75b477", ka: "バ", hi: "ば", en: "BA", ru: "БА" },
  "15725fac-4910-4e36-bdbb-c4f6f890d7dd": { id: "15725fac-4910-4e36-bdbb-c4f6f890d7dd", ka: "ビ", hi: "び", en: "BI", ru: "БИ" },
  "ad5fe49a-65dd-4016-ad02-ca824b6ac476": { id: "ad5fe49a-65dd-4016-ad02-ca824b6ac476", ka: "ブ", hi: "ぶ", en: "BU", ru: "БУ" },
  "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f": { id: "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f", ka: "ベ", hi: "べ", en: "BE", ru: "БЭ" },
  "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b": { id: "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b", ka: "ボ", hi: "ぼ", en: "BO", ru: "БО" },
};

const lettersTableHandakuon = {
  "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee": { id: "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee", ka: "ぱ", hi: "ぱ", en: "PA", ru: "ПА" },
  "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b": { id: "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b", ka: "ぴ", hi: "ぴ", en: "PI", ru: "ПИ" },
  "70bd9d94-d6d5-4572-9b4e-290c2effbec4": { id: "70bd9d94-d6d5-4572-9b4e-290c2effbec4", ka: "ぷ", hi: "ぷ", en: "PU", ru: "ПУ" },
  "cb95fb95-60c8-4324-a716-a9a1013f9214": { id: "cb95fb95-60c8-4324-a716-a9a1013f9214", ka: "ぺ", hi: "ぺ", en: "PE", ru: "ПЭ" },
  "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d": { id: "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d", ka: "ぽ", hi: "ぽ", en: "PO", ru: "ПО" },
};

const lettersTableYoon = {
  "d1a354dd-03db-4143-8883-bfd21f0c63bf": { id: "d1a354dd-03db-4143-8883-bfd21f0c63bf", ka: "キャ", hi: "きゃ", en: "KYA", ru: "KYA"},
  "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f": { id: "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f", ka: "キュ", hi: "きゅ", en: "KYU", ru: "KYU"},
  "578f764c-1bdc-4ad6-a89b-daecde53d680": { id: "578f764c-1bdc-4ad6-a89b-daecde53d680", ka: "キョ", hi: "きょ", en: "KYO", ru: "KYO"},
  "01bc1499-155f-46b7-bbf4-a64d973de743": { id: "01bc1499-155f-46b7-bbf4-a64d973de743", ka: "シャ", hi: "しゃ", en: "SHA", ru: "SHA" },
  "fa4fb436-a0fc-413d-abbf-27e5f8d0b941": { id: "fa4fb436-a0fc-413d-abbf-27e5f8d0b941", ka: "シュ", hi: "しゅ", en: "SHU", ru: "SHU" },
  "e69b7da1-daaf-4dfc-81b7-0693f48ad97d": { id: "e69b7da1-daaf-4dfc-81b7-0693f48ad97d", ka: "ショ", hi: "しょ", en: "SHO", ru: "SHO" },
  "57dd1702-6b32-473b-aac6-bafd6344b59c": { id: "57dd1702-6b32-473b-aac6-bafd6344b59c", ka: "チャ", hi: "ちゃ", en: "CHA", ru: "CHA" },
  "78245c5d-c44b-461d-8734-18a1ead49b93": { id: "78245c5d-c44b-461d-8734-18a1ead49b93", ka: "チュ", hi: "ちゅ", en: "CHU", ru: "CHU" },
  "3ea7d433-fd0a-42f1-a049-e51f8c890fab": { id: "3ea7d433-fd0a-42f1-a049-e51f8c890fab", ka: "チョ", hi: "ちょ", en: "CHO", ru: "CHO" },
  "f50bbf46-cbd3-4652-b32d-a7ea63d71073": { id: "f50bbf46-cbd3-4652-b32d-a7ea63d71073", ka: "ニャ", hi: "にゃ", en: "NYA", ru: "NYA" },
  "a8684a65-29d7-468d-bf54-16a1a5c1dc57": { id: "a8684a65-29d7-468d-bf54-16a1a5c1dc57", ka: "ニュ", hi: "にゅ", en: "NYU", ru: "NYU" },
  "108f5fcc-b005-451f-8004-7ca2e0c295c3": { id: "108f5fcc-b005-451f-8004-7ca2e0c295c3", ka: "ニョ", hi: "にょ", en: "NYO", ru: "NYO" },
  "d765162e-6fb9-4213-bc8c-928a77f6db6e": { id: "d765162e-6fb9-4213-bc8c-928a77f6db6e", ka: "ヒャ", hi: "ひゃ", en: "HYA", ru: "HYA" },
  "16699951-c484-42e4-889a-8170e46c36cd": { id: "16699951-c484-42e4-889a-8170e46c36cd", ka: "ヒュ", hi: "ひゅ", en: "HYU", ru: "HYU" },
  "6334c6a8-3b58-411a-9698-476078765d85": { id: "6334c6a8-3b58-411a-9698-476078765d85", ka: "ヒョ", hi: "ひょ", en: "HYO", ru: "HYO" },
  "1c2c7c7f-1058-4665-9c5c-db5371ecc80c": { id: "1c2c7c7f-1058-4665-9c5c-db5371ecc80c", ka: "ミャ", hi: "みゃ", en: "MYA", ru: "MYA" },
  "32c07e97-0d48-457b-b9ea-c235ea5f0805": { id: "32c07e97-0d48-457b-b9ea-c235ea5f0805", ka: "ミュ", hi: "みゅ", en: "MYU", ru: "MYU" },
  "3d4e3138-74d7-48c7-8275-fcd18ff4d470": { id: "3d4e3138-74d7-48c7-8275-fcd18ff4d470", ka: "ミョ", hi: "みょ", en: "MYO", ru: "MYO" },
  "3342a4aa-9f35-46f1-9e6b-490897f5f9c0": { id: "3342a4aa-9f35-46f1-9e6b-490897f5f9c0", ka: "リャ", hi: "りゃ", en: "RYA", ru: "RYA" },
  "74fe5cce-74ab-4335-8c6c-49e5906711be": { id: "74fe5cce-74ab-4335-8c6c-49e5906711be", ka: "リュ", hi: "りゅ", en: "RYU", ru: "RYU" },
  "3aa9f1c6-21d3-419f-ad97-fda28085a281": { id: "3aa9f1c6-21d3-419f-ad97-fda28085a281", ka: "リョ", hi: "りょ", en: "RYO", ru: "RYO" },
  // dakuten
  "94cb6083-8132-426b-8388-36199c7fd9a3": { id: "94cb6083-8132-426b-8388-36199c7fd9a3", ka: "ギャ", hi: "ぎゃ", en: "GYA", ru: "GYA" },
  "0b0ff0f8-509d-45ed-8847-ea3ea4f415a5": { id: "0b0ff0f8-509d-45ed-8847-ea3ea4f415a5", ka: "ギュ", hi: "ぎゅ", en: "GYU", ru: "GYU" },
  "3d03b236-004b-4077-8a47-518840cfc8aa": { id: "3d03b236-004b-4077-8a47-518840cfc8aa", ka: "ギョ", hi: "ぎょ", en: "GYO", ru: "GYO" },
  "d0cc30d4-a773-4520-bc91-0d0b15433230": { id: "d0cc30d4-a773-4520-bc91-0d0b15433230", ka: "ジャ", hi: "じゃ", en: "JA", ru: "JA" },
  "f357d6b0-aa4f-4693-8b29-fb0aeec31870": { id: "f357d6b0-aa4f-4693-8b29-fb0aeec31870", ka: "ジュ", hi: "じゅ", en: "JU", ru: "JU" },
  "2da51f90-28ec-4eb3-be27-aceb72d1a851": { id: "2da51f90-28ec-4eb3-be27-aceb72d1a851", ka: "ジョ", hi: "じょ", en: "JO", ru: "JO" },
  "65bc1325-2759-478b-b091-52875971d270": { id: "65bc1325-2759-478b-b091-52875971d270", ka: "ヂャ", hi: "ぢゃ", en: "JA", ru: "JA" },
  "3500260f-59ec-4483-b58c-7e78004d7303": { id: "3500260f-59ec-4483-b58c-7e78004d7303", ka: "ヂュ", hi: "ぢゅ", en: "JU", ru: "JU" },
  "22b50fcf-c8cc-4ed2-90d6-04ce2af2e7ac": { id: "22b50fcf-c8cc-4ed2-90d6-04ce2af2e7ac", ka: "ヂョ", hi: "ぢょ", en: "JO", ru: "JO" },
  "f4e5e435-69a8-48ca-8366-e46481581dc4": { id: "f4e5e435-69a8-48ca-8366-e46481581dc4", ka: "ビャ", hi: "びゃ", en: "BYA", ru: "BYA" },
  "5b38a9ea-62cd-4341-8ecc-bb02c7affd67": { id: "5b38a9ea-62cd-4341-8ecc-bb02c7affd67", ka: "ビュ", hi: "びゅ", en: "BYU", ru: "BYU" },
  "74876afc-d65c-42cf-9589-0db573fb752e": { id: "74876afc-d65c-42cf-9589-0db573fb752e", ka: "ビョ", hi: "びょ", en: "BYO", ru: "BYO" },
  // handakuten
  "8be1debc-5346-4979-bfde-913a90ab0122": { id: "8be1debc-5346-4979-bfde-913a90ab0122", ka: "ピャ", hi: "ぴゃ", en: "PYA", ru: "PYA" },
  "ce908138-f0b0-4fee-9cfa-78a6f2a6cb3a": { id: "ce908138-f0b0-4fee-9cfa-78a6f2a6cb3a", ka: "ピュ", hi: "ぴゅ", en: "PYU", ru: "PYU" },
  "45435756-de47-4f76-89b7-17d27aee49c7": { id: "45435756-de47-4f76-89b7-17d27aee49c7", ka: "ピョ", hi: "ぴょ", en: "PYO", ru: "PYO" }, 
};

export const lettersTableById = {
  ...lettersTableBase,
  ...lettersTableDakuon,
  ...lettersTableHandakuon,
  ...lettersTableYoon,
};

export const base: ILetter[][] = [
  [
    { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А"},
    { id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И"},
    { id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822", ka: "ウ", hi: "う", en: "U", ru: "У"},
    { id: "70680d73-c9f9-4b4e-aac4-c82caa49668c", ka: "エ", hi: "え", en: "E", ru: "Э"},
    { id: "e430643d-5624-432e-b53e-974447baad22", ka: "オ", hi: "お", en: "O", ru: "О"},
  ],
  [
    { id: "22350aba-d254-48ba-811a-9d1448761042", ka: "カ", hi: "か", en: "KA", ru: "КА"},
    { id: "a1d45e3b-a1c9-4409-8d39-725a0a35899d", ka: "キ", hi: "き", en: "KI", ru: "КИ"},
    { id: "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1", ka: "ク", hi: "く", en: "KU", ru: "КУ"},
    { id: "9a84b07b-696a-4abd-83f2-70ff8ec66a66", ka: "ケ", hi: "け", en: "KE", ru: "КЭ"},
    { id: "8a2655c3-4553-4f58-83db-069439b11154", ka: "コ", hi: "こ", en: "KO", ru: "КО"},
  ],
  [
    { id: "5bc17c31-0c79-45dd-be5c-41cf67a5baf0", ka: "サ", hi: "さ", en: "SA", ru: "CА"},
    { id: "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2", ka: "シ", hi: "し", en: "SHI", ru: "ШИ"},
    { id: "c495772d-7048-4423-a993-60ce5ce325a2", ka: "ス", hi: "す", en: "SU", ru: "СУ"},
    { id: "0106956a-9090-4599-93a2-0be363bcf7bf", ka: "セ", hi: "せ", en: "SE", ru: "СЕ"},
    { id: "3108807a-1d5e-47b3-9f06-514bc8096102", ka: "ソ", hi: "そ", en: "SO", ru: "СО"},
  ],
  [
    { id: "36b4894e-19d1-4efe-961d-d9dbc6284757", ka: "タ", hi: "た", en: "TA", ru: "ТА"},
    { id: "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d", ka: "チ", hi: "ち", en: "CHI", ru: "ЧИ"},
    { id: "08123485-a3d0-461e-8af3-bf6708b74d90", ka: "ツ", hi: "つ", en: "TSU", ru: "ТУ"},
    { id: "45870b67-8005-4ee1-a79c-a239289ef9b6", ka: "テ", hi: "て", en: "TE", ru: "ТЭ"},
    { id: "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f", ka: "ト", hi: "と", en: "TO", ru: "ТО"},
  ],
  [
    { id: "426cc9fd-4eeb-4914-9484-e87f922365fe", ka: "ナ", hi: "な", en: "NA", ru: "НА"},
    { id: "16c7e660-5f2f-44bb-82aa-72722e944126", ka: "ニ", hi: "に", en: "NI", ru: "НИ"},
    { id: "6a1e5aa1-6978-4f46-bd78-1310607d9018", ka: "ヌ", hi: "ぬ", en: "NU", ru: "НУ"},
    { id: "78f412ca-a2fc-4319-9444-288363407b45", ka: "ネ", hi: "ね", en: "NE", ru: "НЭ"},
    { id: "8b140c48-5818-4a3b-b8fe-0ddc49852778", ka: "ノ", hi: "の", en: "NO", ru: "НО"},
  ],
  [
    { id: "98db662b-5ca1-47cd-9026-735c762c76f6", ka: "ハ", hi: "は", en: "HA", ru: "ХА"},
    { id: "458fcd0d-1f08-4222-99c7-e17000999ccf", ka: "ヒ", hi: "ひ", en: "HI", ru: "ХИ"},
    { id: "6ee7807e-278a-4652-8445-f3062e026891", ka: "フ", hi: "ふ", en: "FU", ru: "ФУ"},
    { id: "1014abd7-deb5-4c6b-a1dc-27543817c9fe", ka: "ヘ", hi: "へ", en: "HE", ru: "ХЭ"},
    { id: "d80bf13e-66cd-4cf9-93e7-09cb2f435ead", ka: "ホ", hi: "ほ", en: "HO", ru: "ХО"},
  ],
  [
    { id: "827078b5-74f9-499b-a523-0fea2020a5af", ka: "マ", hi: "ま", en: "MA", ru: "МА"},
    { id: "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9", ka: "ミ", hi: "み", en: "MI", ru: "МИ"},
    { id: "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69", ka: "ム", hi: "む", en: "MU", ru: "МУ"},
    { id: "3037e1df-8072-4273-abf1-664b500613af", ka: "メ", hi: "め", en: "ME", ru: "МЭ"},
    { id: "54a8b634-b713-4652-957e-fffa3b3319cc", ka: "モ", hi: "も", en: "MO", ru: "МО"},
  ],
  [
    { id: "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89", ka: "ヤ", hi: "や", en: "YA", ru: "Я"},
    { id: "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5", ka: "ユ", hi: "ゆ", en: "YU", ru: "Ю"},
    { id: "5b7da1eb-3e8c-418f-bcb5-ea8551c77706", ka: "ヨ", hi: "よ", en: "YO", ru: "Ё"},
  ],
  [
    { id: "859472d4-50b2-4574-adcf-65b301aa916e", ka: "ラ", hi: "ら", en: "RA", ru: "РА"},
    { id: "6e0e6570-0e60-46e4-8735-40ad423daec2", ka: "リ", hi: "り", en: "RI", ru: "РИ"},
    { id: "1a43007b-1cfb-49a0-baea-02fe8d7cd78a", ka: "ル", hi: "る", en: "RU", ru: "РУ"},
    { id: "e53fdab4-2d04-452d-a635-d2ac728c6a32", ka: "レ", hi: "れ", en: "RE", ru: "РЭ"},
    { id: "6ba2a0b0-d443-4323-a382-c8144cd996d3", ka: "ロ", hi: "ろ", en: "RO", ru: "РО"},
  ],
  [
    { id: "a53d8501-373d-4944-a76b-657f672162f9", ka: "ワ", hi: "わ", en: "WA", ru: "ВА"},
    { id: "8b8c04b7-b8f9-44f8-b188-b9c1e406fd12", ka: "ヰ", hi: "ゐ", en: "WI", ru: "ВИ"},
    { id: "92f412f6-6c79-47ca-8be5-bf3f75500f25", ka: "ヱ", hi: "ゑ", en: "WE", ru: "ВЕ"},
    { id: "858b53e1-af17-45d5-8fc2-330121eab5c4", ka: "ヲ", hi: "を", en: "WO", ru: "ВО"},
  ],
  [
    { id: "2a481d17-0d7c-492a-85fc-cab60e9fb6df", ka: "ン", hi: "ん", en: "N", ru: "Н"},
  ]
];

export const dakuon: ILetter[][] = [
  [
    { id: "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d", ka: "ガ", hi: "が", en: "GA", ru: "ГА"},
    { id: "e6131a96-35f2-48ae-a2ee-53d7bde93a8b", ka: "ギ", hi: "ぎ", en: "GI", ru: "ГИ"},
    { id: "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9", ka: "グ", hi: "ぐ", en: "GU", ru: "ГУ"},
    { id: "9a32b896-4743-4b55-ac7c-196212dbd2b0", ka: "ゲ", hi: "げ", en: "GE", ru: "ГЭ"},
    { id: "c2166cbb-af44-426f-aed2-0b56c51de6b3", ka: "ゴ", hi: "ご", en: "GO", ru: "ГО"}
  ],
  [
    { id: "cb29ec69-5f4b-4e0a-b109-ae7c294517ac", ka: "ザ", hi: "ざ", en: "ZA", ru: "ЗА"},
    { id: "dbdaff4f-4797-4241-8a76-7c300dadb795", ka: "ジ", hi: "じ", en: "JI", ru: "ДЗИ"},
    { id: "9e920fe4-fc1a-492b-9000-a75c34830e0f", ka: "ズ", hi: "ず", en: "ZU", ru: "ДЗУ"},
    { id: "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225", ka: "ゼ", hi: "ぜ", en: "ZE", ru: "ДЗЭ"},
    { id: "a6269b58-d808-48be-a8d9-edfcb03a8a7c", ka: "ゾ", hi: "ぞ", en: "ZO", ru: "ДЗО"}
  ],
  [
    { id: "9b41239e-9b08-41ae-b794-9bcd19d7f488", ka: "ダ", hi: "だ", en: "DA", ru: "ДА"},
    { id: "fcf5368d-40e1-4de6-b564-b3ab430541e4", ka: "ヂ", hi: "ぢ", en: "DJI", ru: "ДЗИ"},
    { id: "942585bb-b0ed-4712-9fd0-e4e9c91d63bd", ka: "ヅ", hi: "づ", en: "DZU", ru: "ДЗУ"},
    { id: "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268", ka: "デ", hi: "で", en: "DE", ru: "ДЭ"},
    { id: "a9d9d96f-485c-4352-a845-2c9ea0cccc08", ka: "ド", hi: "ど", en: "DO", ru: "ДО"}
  ],
  [
    { id: "364900be-ce05-410d-81f5-b5c6ca75b477", ka: "バ", hi: "ば", en: "BA", ru: "БА"},
    { id: "15725fac-4910-4e36-bdbb-c4f6f890d7dd", ka: "ビ", hi: "び", en: "BI", ru: "БИ"},
    { id: "ad5fe49a-65dd-4016-ad02-ca824b6ac476", ka: "ブ", hi: "ぶ", en: "BU", ru: "БУ"},
    { id: "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f", ka: "ベ", hi: "べ", en: "BE", ru: "БЭ"},
    { id: "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b", ka: "ボ", hi: "ぼ", en: "BO", ru: "БО"}
  ]
];

export const handakuon: ILetter[][] = [
  [
    { id: "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee", ka: "パ", hi: "ぱ", en: "PA", ru: "ПА"},
    { id: "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b", ka: "ピ", hi: "ぴ", en: "PI", ru: "ПИ"},
    { id: "70bd9d94-d6d5-4572-9b4e-290c2effbec4", ka: "プ", hi: "ぷ", en: "PU", ru: "ПУ"},
    { id: "cb95fb95-60c8-4324-a716-a9a1013f9214", ka: "ペ", hi: "ぺ", en: "PE", ru: "ПЭ"},
    { id: "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d", ka: "ポ", hi: "ぽ", en: "PO", ru: "ПО"}
  ]
];

export const yoon: ILetter[][] = [
  [
    { id: "d1a354dd-03db-4143-8883-bfd21f0c63bf", ka: "キャ", hi: "きゃ", en: "KYA", ru: "KYA"},
    { id: "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f", ka: "キュ", hi: "きゅ", en: "KYU", ru: "KYU"},
    { id: "578f764c-1bdc-4ad6-a89b-daecde53d680", ka: "キョ", hi: "きょ", en: "KYO", ru: "KYO"}
  ],
  [
    { id: "01bc1499-155f-46b7-bbf4-a64d973de743", ka: "シャ", hi: "しゃ", en: "SHA", ru: "SHA"},
    { id: "fa4fb436-a0fc-413d-abbf-27e5f8d0b941", ka: "シュ", hi: "しゅ", en: "SHU", ru: "SHU"},
    { id: "e69b7da1-daaf-4dfc-81b7-0693f48ad97d", ka: "ショ", hi: "しょ", en: "SHO", ru: "SHO"}
  ],
  [
    { id: "57dd1702-6b32-473b-aac6-bafd6344b59c", ka: "チャ", hi: "ちゃ", en: "CHA", ru: "CHA"},
    { id: "78245c5d-c44b-461d-8734-18a1ead49b93", ka: "チュ", hi: "ちゅ", en: "CHU", ru: "CHU"},
    { id: "3ea7d433-fd0a-42f1-a049-e51f8c890fab", ka: "チョ", hi: "ちょ", en: "CHO", ru: "CHO"}
  ],
  [
    { id: "f50bbf46-cbd3-4652-b32d-a7ea63d71073", ka: "ニャ", hi: "にゃ", en: "NYA", ru: "NYA"},
    { id: "a8684a65-29d7-468d-bf54-16a1a5c1dc57", ka: "ニュ", hi: "にゅ", en: "NYU", ru: "NYU"},
    { id: "108f5fcc-b005-451f-8004-7ca2e0c295c3", ka: "ニョ", hi: "にょ", en: "NYO", ru: "NYO"}
  ],
  [
    { id: "d765162e-6fb9-4213-bc8c-928a77f6db6e", ka: "ヒャ", hi: "ひゃ", en: "HYA", ru: "HYA"},
    { id: "16699951-c484-42e4-889a-8170e46c36cd", ka: "ヒュ", hi: "ひゅ", en: "HYU", ru: "HYU"},
    { id: "6334c6a8-3b58-411a-9698-476078765d85", ka: "ヒョ", hi: "ひょ", en: "HYO", ru: "HYO"}
  ],
  [
    { id: "1c2c7c7f-1058-4665-9c5c-db5371ecc80c", ka: "ミャ", hi: "みゃ", en: "MYA", ru: "MYA"},
    { id: "32c07e97-0d48-457b-b9ea-c235ea5f0805", ka: "ミュ", hi: "みゅ", en: "MYU", ru: "MYU"},
    { id: "3d4e3138-74d7-48c7-8275-fcd18ff4d470", ka: "ミョ", hi: "みょ", en: "MYO", ru: "MYO"}
  ],
  [
    { id: "3342a4aa-9f35-46f1-9e6b-490897f5f9c0", ka: "リャ", hi: "りゃ", en: "RYA", ru: "RYA"},
    { id: "74fe5cce-74ab-4335-8c6c-49e5906711be", ka: "リュ", hi: "りゅ", en: "RYU", ru: "RYU"},
    { id: "3aa9f1c6-21d3-419f-ad97-fda28085a281", ka: "リョ", hi: "りょ", en: "RYO", ru: "RYO"}
  ],
  [
    { id: "94cb6083-8132-426b-8388-36199c7fd9a3", ka: "ギャ", hi: "ぎゃ", en: "GYA", ru: "GYA" },
    { id: "0b0ff0f8-509d-45ed-8847-ea3ea4f415a5", ka: "ギュ", hi: "ぎゅ", en: "GYU", ru: "GYU" },
    { id: "3d03b236-004b-4077-8a47-518840cfc8aa", ka: "ギョ", hi: "ぎょ", en: "GYO", ru: "GYO" },
  ],
  [
    { id: "d0cc30d4-a773-4520-bc91-0d0b15433230", ka: "ジャ", hi: "じゃ", en: "JA", ru: "JA" },
    { id: "f357d6b0-aa4f-4693-8b29-fb0aeec31870", ka: "ジュ", hi: "じゅ", en: "JU", ru: "JU" },
    { id: "2da51f90-28ec-4eb3-be27-aceb72d1a851", ka: "ジョ", hi: "じょ", en: "JO", ru: "JO" },
  ],
  [
    { id: "65bc1325-2759-478b-b091-52875971d270", ka: "ヂャ", hi: "ぢゃ", en: "JA", ru: "JA" },
    { id: "3500260f-59ec-4483-b58c-7e78004d7303", ka: "ヂュ", hi: "ぢゅ", en: "JU", ru: "JU" },
    { id: "22b50fcf-c8cc-4ed2-90d6-04ce2af2e7ac", ka: "ヂョ", hi: "ぢょ", en: "JO", ru: "JO" },
  ],
  [
    { id: "f4e5e435-69a8-48ca-8366-e46481581dc4", ka: "ビャ", hi: "びゃ", en: "BYA", ru: "BYA" },
    { id: "5b38a9ea-62cd-4341-8ecc-bb02c7affd67", ka: "ビュ", hi: "びゅ", en: "BYU", ru: "BYU" },
    { id: "74876afc-d65c-42cf-9589-0db573fb752e", ka: "ビョ", hi: "びょ", en: "BYO", ru: "BYO" }, 
  ],
  [
    { id: "8be1debc-5346-4979-bfde-913a90ab0122", ka: "ピャ", hi: "ぴゃ", en: "PYA", ru: "PYA" },
    { id: "ce908138-f0b0-4fee-9cfa-78a6f2a6cb3a", ka: "ピュ", hi: "ぴゅ", en: "PYU", ru: "PYU" },
    { id: "45435756-de47-4f76-89b7-17d27aee49c7", ka: "ピョ", hi: "ぴょ", en: "PYO", ru: "PYO" }, 
  ]
];

export const baseFlatLettersId: LettersKeysBase[] = [
  "a151eeeb-2537-463c-ae23-d484d1bcb835",
  "11017078-148a-4a44-b3f7-21d1df02d981",
  "bcbd90e2-fabc-4dcc-8022-02e5b650c822",
  "70680d73-c9f9-4b4e-aac4-c82caa49668c",
  "e430643d-5624-432e-b53e-974447baad22",
  "22350aba-d254-48ba-811a-9d1448761042",
  "a1d45e3b-a1c9-4409-8d39-725a0a35899d",
  "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1",
  "9a84b07b-696a-4abd-83f2-70ff8ec66a66",
  "8a2655c3-4553-4f58-83db-069439b11154",
  "5bc17c31-0c79-45dd-be5c-41cf67a5baf0",
  "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2",
  "c495772d-7048-4423-a993-60ce5ce325a2",
  "0106956a-9090-4599-93a2-0be363bcf7bf",
  "3108807a-1d5e-47b3-9f06-514bc8096102",
  "36b4894e-19d1-4efe-961d-d9dbc6284757",
  "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d",
  "08123485-a3d0-461e-8af3-bf6708b74d90",
  "45870b67-8005-4ee1-a79c-a239289ef9b6",
  "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f",
  "426cc9fd-4eeb-4914-9484-e87f922365fe",
  "16c7e660-5f2f-44bb-82aa-72722e944126",
  "6a1e5aa1-6978-4f46-bd78-1310607d9018",
  "78f412ca-a2fc-4319-9444-288363407b45",
  "8b140c48-5818-4a3b-b8fe-0ddc49852778",
  "98db662b-5ca1-47cd-9026-735c762c76f6",
  "458fcd0d-1f08-4222-99c7-e17000999ccf",
  "6ee7807e-278a-4652-8445-f3062e026891",
  "1014abd7-deb5-4c6b-a1dc-27543817c9fe",
  "d80bf13e-66cd-4cf9-93e7-09cb2f435ead",
  "827078b5-74f9-499b-a523-0fea2020a5af",
  "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9",
  "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69",
  "3037e1df-8072-4273-abf1-664b500613af",
  "54a8b634-b713-4652-957e-fffa3b3319cc",
  "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89",
  "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5",
  "5b7da1eb-3e8c-418f-bcb5-ea8551c77706",
  "859472d4-50b2-4574-adcf-65b301aa916e",
  "6e0e6570-0e60-46e4-8735-40ad423daec2",
  "1a43007b-1cfb-49a0-baea-02fe8d7cd78a",
  "e53fdab4-2d04-452d-a635-d2ac728c6a32",
  "6ba2a0b0-d443-4323-a382-c8144cd996d3",
  "a53d8501-373d-4944-a76b-657f672162f9",
  "8b8c04b7-b8f9-44f8-b188-b9c1e406fd12",
  "92f412f6-6c79-47ca-8be5-bf3f75500f25",
  "858b53e1-af17-45d5-8fc2-330121eab5c4",
  "2a481d17-0d7c-492a-85fc-cab60e9fb6df",
];
export const dakuonFlatLettersId: LettersKeysDakuon[] = [
  "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d",
  "e6131a96-35f2-48ae-a2ee-53d7bde93a8b",
  "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9",
  "9a32b896-4743-4b55-ac7c-196212dbd2b0",
  "c2166cbb-af44-426f-aed2-0b56c51de6b3",
  "cb29ec69-5f4b-4e0a-b109-ae7c294517ac",
  "dbdaff4f-4797-4241-8a76-7c300dadb795",
  "9e920fe4-fc1a-492b-9000-a75c34830e0f",
  "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225",
  "a6269b58-d808-48be-a8d9-edfcb03a8a7c",
  "9b41239e-9b08-41ae-b794-9bcd19d7f488",
  "fcf5368d-40e1-4de6-b564-b3ab430541e4",
  "942585bb-b0ed-4712-9fd0-e4e9c91d63bd",
  "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268",
  "a9d9d96f-485c-4352-a845-2c9ea0cccc08",
  "364900be-ce05-410d-81f5-b5c6ca75b477",
  "15725fac-4910-4e36-bdbb-c4f6f890d7dd",
  "ad5fe49a-65dd-4016-ad02-ca824b6ac476",
  "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f",
  "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b",
];
export const handakuonFlatLettersId: LettersKeysHandakuon[] = [
  "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee",
  "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b",
  "70bd9d94-d6d5-4572-9b4e-290c2effbec4",
  "cb95fb95-60c8-4324-a716-a9a1013f9214",
  "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d",
];

export const yoonFlatLettersId: LettersKeysYoon[] = [
  "d1a354dd-03db-4143-8883-bfd21f0c63bf",
  "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f",
  "578f764c-1bdc-4ad6-a89b-daecde53d680",
  "01bc1499-155f-46b7-bbf4-a64d973de743",
  "fa4fb436-a0fc-413d-abbf-27e5f8d0b941",
  "e69b7da1-daaf-4dfc-81b7-0693f48ad97d",
  "57dd1702-6b32-473b-aac6-bafd6344b59c",
  "78245c5d-c44b-461d-8734-18a1ead49b93",
  "3ea7d433-fd0a-42f1-a049-e51f8c890fab",
  "f50bbf46-cbd3-4652-b32d-a7ea63d71073",
  "a8684a65-29d7-468d-bf54-16a1a5c1dc57",
  "108f5fcc-b005-451f-8004-7ca2e0c295c3",
  "d765162e-6fb9-4213-bc8c-928a77f6db6e",
  "16699951-c484-42e4-889a-8170e46c36cd",
  "6334c6a8-3b58-411a-9698-476078765d85",
  "1c2c7c7f-1058-4665-9c5c-db5371ecc80c",
  "32c07e97-0d48-457b-b9ea-c235ea5f0805",
  "3d4e3138-74d7-48c7-8275-fcd18ff4d470",
  "3342a4aa-9f35-46f1-9e6b-490897f5f9c0",
  "74fe5cce-74ab-4335-8c6c-49e5906711be",
  "3aa9f1c6-21d3-419f-ad97-fda28085a281",
  "94cb6083-8132-426b-8388-36199c7fd9a3",
  "0b0ff0f8-509d-45ed-8847-ea3ea4f415a5",
  "3d03b236-004b-4077-8a47-518840cfc8aa",
  "d0cc30d4-a773-4520-bc91-0d0b15433230",
  "f357d6b0-aa4f-4693-8b29-fb0aeec31870",
  "2da51f90-28ec-4eb3-be27-aceb72d1a851",
  "65bc1325-2759-478b-b091-52875971d270",
  "3500260f-59ec-4483-b58c-7e78004d7303",
  "22b50fcf-c8cc-4ed2-90d6-04ce2af2e7ac",
  "f4e5e435-69a8-48ca-8366-e46481581dc4",
  "5b38a9ea-62cd-4341-8ecc-bb02c7affd67",
  "74876afc-d65c-42cf-9589-0db573fb752e",
  "8be1debc-5346-4979-bfde-913a90ab0122",
  "ce908138-f0b0-4fee-9cfa-78a6f2a6cb3a",
  "45435756-de47-4f76-89b7-17d27aee49c7",
];