import { UUID } from "crypto";

export interface ILetter {
  readonly ka: string
  readonly hi: string
  readonly en: string
  readonly ru: string
  readonly id: UUID
}

export const lettersTable: Record<string, ILetter> = {
  A: { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А"},
  I: { id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И"},
  U: { id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822", ka: "ウ", hi: "う", en: "U", ru: "У"},
  E: { id: "70680d73-c9f9-4b4e-aac4-c82caa49668c", ka: "エ", hi: "え", en: "E", ru: "Э"},
  O: { id: "e430643d-5624-432e-b53e-974447baad22", ka: "オ", hi: "お", en: "O", ru: "О"},
  KA: { id: "22350aba-d254-48ba-811a-9d1448761042", ka: "カ", hi: "か", en: "KA", ru: "КА"},
  KI: { id: "a1d45e3b-a1c9-4409-8d39-725a0a35899d", ka: "キ", hi: "き", en: "KI", ru: "КИ"},
  KU: { id: "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1", ka: "ク", hi: "く", en: "KU", ru: "КУ"},
  KE: { id: "9a84b07b-696a-4abd-83f2-70ff8ec66a66", ka: "ケ", hi: "け", en: "KE", ru: "КЭ"},
  KO: { id: "8a2655c3-4553-4f58-83db-069439b11154", ka: "コ", hi: "こ", en: "KO", ru: "КО"},
  SA: { id: "5bc17c31-0c79-45dd-be5c-41cf67a5baf0", ka: "サ", hi: "さ", en: "SA", ru: "CА"},
  SHI: { id: "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2", ka: "シ", hi: "し", en: "SHI", ru: "ШИ"},
  SU: { id: "c495772d-7048-4423-a993-60ce5ce325a2", ka: "ス", hi: "す", en: "SU", ru: "СУ"},
  SE: { id: "0106956a-9090-4599-93a2-0be363bcf7bf", ka: "セ", hi: "せ", en: "SE", ru: "СЕ"},
  SO: { id: "3108807a-1d5e-47b3-9f06-514bc8096102", ka: "ソ", hi: "そ", en: "SO", ru: "СО"},
  TA: { id: "36b4894e-19d1-4efe-961d-d9dbc6284757", ka: "タ", hi: "た", en: "TA", ru: "ТА"},
  CHI: { id: "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d", ka: "チ", hi: "ち", en: "CHI", ru: "ЧИ"},
  TSU: { id: "08123485-a3d0-461e-8af3-bf6708b74d90", ka: "ツ", hi: "つ", en: "TSU", ru: "ТУ"},
  TE: { id: "45870b67-8005-4ee1-a79c-a239289ef9b6", ka: "テ", hi: "て", en: "TE", ru: "ТЭ"},
  TO: { id: "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f", ka: "ト", hi: "と", en: "TO", ru: "ТО"},
  NA: { id: "426cc9fd-4eeb-4914-9484-e87f922365fe", ka: "ナ", hi: "な", en: "NA", ru: "НА"},
  NI: { id: "16c7e660-5f2f-44bb-82aa-72722e944126", ka: "ニ", hi: "に", en: "NI", ru: "НИ"},
  NU: { id: "6a1e5aa1-6978-4f46-bd78-1310607d9018", ka: "ヌ", hi: "ぬ", en: "NU", ru: "НУ"},
  NE: { id: "78f412ca-a2fc-4319-9444-288363407b45", ka: "ネ", hi: "ね", en: "NE", ru: "НЭ"},
  NO: { id: "8b140c48-5818-4a3b-b8fe-0ddc49852778", ka: "ノ", hi: "の", en: "NO", ru: "НО"},
  HA: { id: "98db662b-5ca1-47cd-9026-735c762c76f6", ka: "ハ", hi: "は", en: "HA", ru: "ХА"},
  HI: { id: "458fcd0d-1f08-4222-99c7-e17000999ccf", ka: "ヒ", hi: "ひ", en: "HI", ru: "ХИ"},
  FU: { id: "6ee7807e-278a-4652-8445-f3062e026891", ka: "フ", hi: "ふ", en: "FU", ru: "ФУ"},
  HE: { id: "1014abd7-deb5-4c6b-a1dc-27543817c9fe", ka: "ヘ", hi: "へ", en: "HE", ru: "ХЭ"},
  HO: { id: "d80bf13e-66cd-4cf9-93e7-09cb2f435ead", ka: "ホ", hi: "ほ", en: "HO", ru: "ХО"},
  MA: { id: "827078b5-74f9-499b-a523-0fea2020a5af", ka: "マ", hi: "ま", en: "MA", ru: "МА"},
  MI: { id: "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9", ka: "ミ", hi: "み", en: "MI", ru: "МИ"},
  MU: { id: "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69", ka: "ム", hi: "む", en: "MU", ru: "МУ"},
  ME: { id: "3037e1df-8072-4273-abf1-664b500613af", ka: "メ", hi: "め", en: "ME", ru: "МЭ"},
  MO: { id: "54a8b634-b713-4652-957e-fffa3b3319cc", ka: "モ", hi: "も", en: "MO", ru: "МО"},
  YA: { id: "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89", ka: "ヤ", hi: "や", en: "YA", ru: "Я"},
  YU: { id: "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5", ka: "ユ", hi: "ゆ", en: "YU", ru: "Ю"},
  YO: { id: "5b7da1eb-3e8c-418f-bcb5-ea8551c77706", ka: "ヨ", hi: "よ", en: "YO", ru: "Ё"},
  RA: { id: "859472d4-50b2-4574-adcf-65b301aa916e", ka: "ラ", hi: "ら", en: "RA", ru: "РА"},
  RI: { id: "6e0e6570-0e60-46e4-8735-40ad423daec2", ka: "リ", hi: "り", en: "RI", ru: "РИ"},
  RU: { id: "1a43007b-1cfb-49a0-baea-02fe8d7cd78a", ka: "ル", hi: "る", en: "RU", ru: "РУ"},
  RE: { id: "e53fdab4-2d04-452d-a635-d2ac728c6a32", ka: "レ", hi: "れ", en: "RE", ru: "РЭ"},
  RO: { id: "6ba2a0b0-d443-4323-a382-c8144cd996d3", ka: "ロ", hi: "ろ", en: "RO", ru: "РО"},
  WA: { id: "a53d8501-373d-4944-a76b-657f672162f9", ka: "ワ", hi: "わ", en: "WA", ru: "ВА"},
  WO: { id: "858b53e1-af17-45d5-8fc2-330121eab5c4", ka: "ヲ", hi: "を", en: "WO", ru: "ВО"},
  N: { id: "2a481d17-0d7c-492a-85fc-cab60e9fb6df", ka: "ン", hi: "ん", en: "N", ru: "Н"},
  // dakuon
  GA: { id: "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d", ka: "ガ", hi: "が", en: "GA", ru: "ГА"},
  GI: { id: "e6131a96-35f2-48ae-a2ee-53d7bde93a8b", ka: "ギ", hi: "ぎ", en: "GI", ru: "ГИ"},
  GU: { id: "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9", ka: "グ", hi: "ぐ", en: "GU", ru: "ГУ"},
  GE: { id: "9a32b896-4743-4b55-ac7c-196212dbd2b0", ka: "ゲ", hi: "げ", en: "GE", ru: "ГЭ"},
  GO: { id: "c2166cbb-af44-426f-aed2-0b56c51de6b3", ka: "ゴ", hi: "ご", en: "GO", ru: "ГО"},
  ZA: { id: "cb29ec69-5f4b-4e0a-b109-ae7c294517ac", ka: "ザ", hi: "ざ", en: "ZA", ru: "ЗА"},
  JI: { id: "dbdaff4f-4797-4241-8a76-7c300dadb795", ka: "ジ", hi: "じ", en: "JI", ru: "ДЗИ"},
  ZU: { id: "9e920fe4-fc1a-492b-9000-a75c34830e0f", ka: "ズ", hi: "ず", en: "ZU", ru: "ДЗУ"},
  ZE: { id: "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225", ka: "ゼ", hi: "ぜ", en: "ZE", ru: "ДЗЭ"},
  ZO: { id: "a6269b58-d808-48be-a8d9-edfcb03a8a7c", ka: "ゾ", hi: "ぞ", en: "ZO", ru: "ДЗО"},
  DA: { id: "9b41239e-9b08-41ae-b794-9bcd19d7f488", ka: "ダ", hi: "だ", en: "DA", ru: "ДА"},
  DJI: { id: "fcf5368d-40e1-4de6-b564-b3ab430541e4", ka: "ヂ", hi: "ぢ", en: "DJI", ru: "ДЗИ"},
  DZU: { id: "942585bb-b0ed-4712-9fd0-e4e9c91d63bd", ka: "ヅ", hi: "づ", en: "DZU", ru: "ДЗУ"},
  DE: { id: "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268", ka: "デ", hi: "で", en: "DE", ru: "ДЭ"},
  DO: { id: "a9d9d96f-485c-4352-a845-2c9ea0cccc08", ka: "ド", hi: "ど", en: "DO", ru: "ДО"},
  BA: { id: "364900be-ce05-410d-81f5-b5c6ca75b477", ka: "バ", hi: "ば", en: "BA", ru: "БА"},
  BI: { id: "15725fac-4910-4e36-bdbb-c4f6f890d7dd", ka: "ビ", hi: "び", en: "BI", ru: "БИ"},
  BU: { id: "ad5fe49a-65dd-4016-ad02-ca824b6ac476", ka: "ブ", hi: "ぶ", en: "BU", ru: "БУ"},
  BE: { id: "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f", ka: "ベ", hi: "べ", en: "BE", ru: "БЭ"},
  BO: { id: "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b", ka: "ボ", hi: "ぼ", en: "BO", ru: "БО"},
  // handakuon
  PA: { id: "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee", ka: "ぱ", hi: "ぱ", en: "PA", ru: "ПА"},
  PI: { id: "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b", ka: "ぴ", hi: "ぴ", en: "PI", ru: "ПИ"},
  PU: { id: "70bd9d94-d6d5-4572-9b4e-290c2effbec4", ka: "ぷ", hi: "ぷ", en: "PU", ru: "ПУ"},
  PE: { id: "cb95fb95-60c8-4324-a716-a9a1013f9214", ka: "ぺ", hi: "ぺ", en: "PE", ru: "ПЭ"},
  PO: { id: "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d", ka: "ぽ", hi: "ぽ", en: "PO", ru: "ПО"},
  // yoon
  KYA: { id: "d1a354dd-03db-4143-8883-bfd21f0c63bf", ka: "きゃ", hi: "きゃ", en: "KYA", ru: "KYA"},
  KYU: { id: "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f", ka: "きゅ", hi: "きゅ", en: "KYU", ru: "KYU"},
  KYO: { id: "578f764c-1bdc-4ad6-a89b-daecde53d680", ka: "きょ", hi: "きょ", en: "KYO", ru: "KYO"},
  SHA: { id: "01bc1499-155f-46b7-bbf4-a64d973de743", ka: "しゃ", hi: "しゃ", en: "SHA", ru: "SHA"},
  SHU: { id: "fa4fb436-a0fc-413d-abbf-27e5f8d0b941", ka: "しゅ", hi: "しゅ", en: "SHU", ru: "SHU"},
  SHO: { id: "e69b7da1-daaf-4dfc-81b7-0693f48ad97d", ka: "しょ", hi: "しょ", en: "SHO", ru: "SHO"},
  CHA: { id: "57dd1702-6b32-473b-aac6-bafd6344b59c", ka: "ちゃ", hi: "ちゃ", en: "CHA", ru: "CHA"},
  CHU: { id: "78245c5d-c44b-461d-8734-18a1ead49b93", ka: "ちゅ", hi: "ちゅ", en: "CHU", ru: "CHU"},
  CHO: { id: "3ea7d433-fd0a-42f1-a049-e51f8c890fab", ka: "ちょ", hi: "ちょ", en: "CHO", ru: "CHO"},
  NYA: { id: "f50bbf46-cbd3-4652-b32d-a7ea63d71073", ka: "にゃ", hi: "にゃ", en: "NYA", ru: "NYA"},
  NYU: { id: "a8684a65-29d7-468d-bf54-16a1a5c1dc57", ka: "にゅ", hi: "にゅ", en: "NYU", ru: "NYU"},
  NYO: { id: "108f5fcc-b005-451f-8004-7ca2e0c295c3", ka: "にょ", hi: "にょ", en: "NYO", ru: "NYO"},
  HYA: { id: "d765162e-6fb9-4213-bc8c-928a77f6db6e", ka: "ひゃ", hi: "ひゃ", en: "HYA", ru: "HYA"},
  HYU: { id: "16699951-c484-42e4-889a-8170e46c36cd", ka: "ひゅ", hi: "ひゅ", en: "HYU", ru: "HYU"},
  HYO: { id: "6334c6a8-3b58-411a-9698-476078765d85", ka: "ひょ", hi: "ひょ", en: "HYO", ru: "HYO"},
  MYA: { id: "1c2c7c7f-1058-4665-9c5c-db5371ecc80c", ka: "みゃ", hi: "みゃ", en: "MYA", ru: "MYA"},
  MYU: { id: "32c07e97-0d48-457b-b9ea-c235ea5f0805", ka: "みゅ", hi: "みゅ", en: "MYU", ru: "MYU"},
  MYO: { id: "3d4e3138-74d7-48c7-8275-fcd18ff4d470", ka: "みょ", hi: "みょ", en: "MYO", ru: "MYO"},
  RYA: { id: "3342a4aa-9f35-46f1-9e6b-490897f5f9c0", ka: "りゃ", hi: "りゃ", en: "RYA", ru: "RYA"},
  RYU: { id: "74fe5cce-74ab-4335-8c6c-49e5906711be", ka: "りゅ", hi: "りゅ", en: "RYU", ru: "RYU"},
  RYO: { id: "3aa9f1c6-21d3-419f-ad97-fda28085a281", ka: "りょ", hi: "りょ", en: "RYO", ru: "RYO"}
};

export const lettersTableById: Record<UUID, ILetter> = {
  "11017078-148a-4a44-b3f7-21d1df02d981":  {id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И"},
  "a151eeeb-2537-463c-ae23-d484d1bcb835":  {id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А"},
  "70680d73-c9f9-4b4e-aac4-c82caa49668c":  {id: "70680d73-c9f9-4b4e-aac4-c82caa49668c", ka: "エ", hi: "え", en: "E", ru: "Э"},
  "bcbd90e2-fabc-4dcc-8022-02e5b650c822":  {id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822", ka: "ウ", hi: "う", en: "U", ru: "У"},
  "e430643d-5624-432e-b53e-974447baad22":  {id: "e430643d-5624-432e-b53e-974447baad22", ka: "オ", hi: "お", en: "O", ru: "О"},
  "22350aba-d254-48ba-811a-9d1448761042":  {id: "22350aba-d254-48ba-811a-9d1448761042", ka: "カ", hi: "か", en: "KA", ru: "КА"},
  "a1d45e3b-a1c9-4409-8d39-725a0a35899d":  {id: "a1d45e3b-a1c9-4409-8d39-725a0a35899d", ka: "キ", hi: "き", en: "KI", ru: "КИ"},
  "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1":  {id: "51cd83e5-6167-4bcc-a3e6-6b246f2ca2d1", ka: "ク", hi: "く", en: "KU", ru: "КУ"},
  "9a84b07b-696a-4abd-83f2-70ff8ec66a66":  {id: "9a84b07b-696a-4abd-83f2-70ff8ec66a66", ka: "ケ", hi: "け", en: "KE", ru: "КЭ"},
  "8a2655c3-4553-4f58-83db-069439b11154":  {id: "8a2655c3-4553-4f58-83db-069439b11154", ka: "コ", hi: "こ", en: "KO", ru: "КО"},
  "5bc17c31-0c79-45dd-be5c-41cf67a5baf0":  {id: "5bc17c31-0c79-45dd-be5c-41cf67a5baf0", ka: "サ", hi: "さ", en: "SA", ru: "CА"},
  "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2":  {id: "0d44c671-edf2-4c9d-b62d-e3f5ae8ea7b2", ka: "シ", hi: "し", en: "SHI", ru: "ШИ"},
  "c495772d-7048-4423-a993-60ce5ce325a2":  {id: "c495772d-7048-4423-a993-60ce5ce325a2", ka: "ス", hi: "す", en: "SU", ru: "СУ"},
  "0106956a-9090-4599-93a2-0be363bcf7bf":  {id: "0106956a-9090-4599-93a2-0be363bcf7bf", ka: "セ", hi: "せ", en: "SE", ru: "СЕ"},
  "3108807a-1d5e-47b3-9f06-514bc8096102":  {id: "3108807a-1d5e-47b3-9f06-514bc8096102", ka: "ソ", hi: "そ", en: "SO", ru: "СО"},
  "36b4894e-19d1-4efe-961d-d9dbc6284757":  {id: "36b4894e-19d1-4efe-961d-d9dbc6284757", ka: "タ", hi: "た", en: "TA", ru: "ТА"},
  "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d":  {id: "f17698db-0da4-4c09-ba3b-9d10e3c7aa4d", ka: "チ", hi: "ち", en: "CHI", ru: "ЧИ"},
  "08123485-a3d0-461e-8af3-bf6708b74d90":  {id: "08123485-a3d0-461e-8af3-bf6708b74d90", ka: "ツ", hi: "つ", en: "TSU", ru: "ТУ"},
  "45870b67-8005-4ee1-a79c-a239289ef9b6":  {id: "45870b67-8005-4ee1-a79c-a239289ef9b6", ka: "テ", hi: "て", en: "TE", ru: "ТЭ"},
  "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f":  {id: "bfd720a3-aaaa-4ce1-a88b-ce4866b0351f", ka: "ト", hi: "と", en: "TO", ru: "ТО"},
  "426cc9fd-4eeb-4914-9484-e87f922365fe":  {id: "426cc9fd-4eeb-4914-9484-e87f922365fe", ka: "ナ", hi: "な", en: "NA", ru: "НА"},
  "16c7e660-5f2f-44bb-82aa-72722e944126":  {id: "16c7e660-5f2f-44bb-82aa-72722e944126", ka: "ニ", hi: "に", en: "NI", ru: "НИ"},
  "6a1e5aa1-6978-4f46-bd78-1310607d9018":  {id: "6a1e5aa1-6978-4f46-bd78-1310607d9018", ka: "ヌ", hi: "ぬ", en: "NU", ru: "НУ"},
  "78f412ca-a2fc-4319-9444-288363407b45":  {id: "78f412ca-a2fc-4319-9444-288363407b45", ka: "ネ", hi: "ね", en: "NE", ru: "НЭ"},
  "8b140c48-5818-4a3b-b8fe-0ddc49852778":  {id: "8b140c48-5818-4a3b-b8fe-0ddc49852778", ka: "ノ", hi: "の", en: "NO", ru: "НО"},
  "98db662b-5ca1-47cd-9026-735c762c76f6":  {id: "98db662b-5ca1-47cd-9026-735c762c76f6", ka: "ハ", hi: "は", en: "HA", ru: "ХА"},
  "458fcd0d-1f08-4222-99c7-e17000999ccf":  {id: "458fcd0d-1f08-4222-99c7-e17000999ccf", ka: "ヒ", hi: "ひ", en: "HI", ru: "ХИ"},
  "6ee7807e-278a-4652-8445-f3062e026891":  {id: "6ee7807e-278a-4652-8445-f3062e026891", ka: "フ", hi: "ふ", en: "FU", ru: "ФУ"},
  "1014abd7-deb5-4c6b-a1dc-27543817c9fe":  {id: "1014abd7-deb5-4c6b-a1dc-27543817c9fe", ka: "ヘ", hi: "へ", en: "HE", ru: "ХЭ"},
  "d80bf13e-66cd-4cf9-93e7-09cb2f435ead":  {id: "d80bf13e-66cd-4cf9-93e7-09cb2f435ead", ka: "ホ", hi: "ほ", en: "HO", ru: "ХО"},
  "827078b5-74f9-499b-a523-0fea2020a5af":  {id: "827078b5-74f9-499b-a523-0fea2020a5af", ka: "マ", hi: "ま", en: "MA", ru: "МА"},
  "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9":  {id: "b131b9f3-d6fd-48e6-b0cc-32831ea4b3f9", ka: "ミ", hi: "み", en: "MI", ru: "МИ"},
  "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69":  {id: "4d81e8f2-0e6b-475f-bd08-c6b03d20ae69", ka: "ム", hi: "む", en: "MU", ru: "МУ"},
  "3037e1df-8072-4273-abf1-664b500613af":  {id: "3037e1df-8072-4273-abf1-664b500613af", ka: "メ", hi: "め", en: "ME", ru: "МЭ"},
  "54a8b634-b713-4652-957e-fffa3b3319cc":  {id: "54a8b634-b713-4652-957e-fffa3b3319cc", ka: "モ", hi: "も", en: "MO", ru: "МО"},
  "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89":  {id: "9e4e7b1b-2b3c-467d-8c24-be83a4ae5a89", ka: "ヤ", hi: "や", en: "YA", ru: "Я"},
  "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5":  {id: "e3c281bb-31aa-4fab-8b83-1daca7c6bdd5", ka: "ユ", hi: "ゆ", en: "YU", ru: "Ю"},
  "5b7da1eb-3e8c-418f-bcb5-ea8551c77706":  {id: "5b7da1eb-3e8c-418f-bcb5-ea8551c77706", ka: "ヨ", hi: "よ", en: "YO", ru: "Ё"},
  "859472d4-50b2-4574-adcf-65b301aa916e":  {id: "859472d4-50b2-4574-adcf-65b301aa916e", ka: "ラ", hi: "ら", en: "RA", ru: "РА"},
  "6e0e6570-0e60-46e4-8735-40ad423daec2":  {id: "6e0e6570-0e60-46e4-8735-40ad423daec2", ka: "リ", hi: "り", en: "RI", ru: "РИ"},
  "1a43007b-1cfb-49a0-baea-02fe8d7cd78a":  {id: "1a43007b-1cfb-49a0-baea-02fe8d7cd78a", ka: "ル", hi: "る", en: "RU", ru: "РУ"},
  "e53fdab4-2d04-452d-a635-d2ac728c6a32":  {id: "e53fdab4-2d04-452d-a635-d2ac728c6a32", ka: "レ", hi: "れ", en: "RE", ru: "РЭ"},
  "6ba2a0b0-d443-4323-a382-c8144cd996d3":  {id: "6ba2a0b0-d443-4323-a382-c8144cd996d3", ka: "ロ", hi: "ろ", en: "RO", ru: "РО"},
  "a53d8501-373d-4944-a76b-657f672162f9":  {id: "a53d8501-373d-4944-a76b-657f672162f9", ka: "ワ", hi: "わ", en: "WA", ru: "ВА"},
  "858b53e1-af17-45d5-8fc2-330121eab5c4":  {id: "858b53e1-af17-45d5-8fc2-330121eab5c4", ka: "ヲ", hi: "を", en: "WO", ru: "ВО"},
  "2a481d17-0d7c-492a-85fc-cab60e9fb6df":  {id: "2a481d17-0d7c-492a-85fc-cab60e9fb6df", ka: "ン", hi: "ん", en: "N", ru: "Н"},
  "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d":  {id: "2dc3667e-c4cb-4d04-adc8-f3c5603d6b3d", ka: "ガ", hi: "が", en: "GA", ru: "ГА"},
  "e6131a96-35f2-48ae-a2ee-53d7bde93a8b":  {id: "e6131a96-35f2-48ae-a2ee-53d7bde93a8b", ka: "ギ", hi: "ぎ", en: "GI", ru: "ГИ"},
  "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9":  {id: "b7dde579-94e7-4b7f-bf21-0b4e7f825aa9", ka: "グ", hi: "ぐ", en: "GU", ru: "ГУ"},
  "9a32b896-4743-4b55-ac7c-196212dbd2b0":  {id: "9a32b896-4743-4b55-ac7c-196212dbd2b0", ka: "ゲ", hi: "げ", en: "GE", ru: "ГЭ"},
  "c2166cbb-af44-426f-aed2-0b56c51de6b3":  {id: "c2166cbb-af44-426f-aed2-0b56c51de6b3", ka: "ゴ", hi: "ご", en: "GO", ru: "ГО"},
  "cb29ec69-5f4b-4e0a-b109-ae7c294517ac":  {id: "cb29ec69-5f4b-4e0a-b109-ae7c294517ac", ka: "ザ", hi: "ざ", en: "ZA", ru: "ЗА"},
  "dbdaff4f-4797-4241-8a76-7c300dadb795":  {id: "dbdaff4f-4797-4241-8a76-7c300dadb795", ka: "ジ", hi: "じ", en: "JI", ru: "ДЗИ"},
  "9e920fe4-fc1a-492b-9000-a75c34830e0f":  {id: "9e920fe4-fc1a-492b-9000-a75c34830e0f", ka: "ズ", hi: "ず", en: "ZU", ru: "ДЗУ"},
  "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225":  {id: "b0bc3b9f-587c-4ab4-8a03-a6c7df2fe225", ka: "ゼ", hi: "ぜ", en: "ZE", ru: "ДЗЭ"},
  "a6269b58-d808-48be-a8d9-edfcb03a8a7c":  {id: "a6269b58-d808-48be-a8d9-edfcb03a8a7c", ka: "ゾ", hi: "ぞ", en: "ZO", ru: "ДЗО"},
  "9b41239e-9b08-41ae-b794-9bcd19d7f488":  {id: "9b41239e-9b08-41ae-b794-9bcd19d7f488", ka: "ダ", hi: "だ", en: "DA", ru: "ДА"},
  "fcf5368d-40e1-4de6-b564-b3ab430541e4":  {id: "fcf5368d-40e1-4de6-b564-b3ab430541e4", ka: "ヂ", hi: "ぢ", en: "DJI", ru: "ДЗИ"},
  "942585bb-b0ed-4712-9fd0-e4e9c91d63bd":  {id: "942585bb-b0ed-4712-9fd0-e4e9c91d63bd", ka: "ヅ", hi: "づ", en: "DZU", ru: "ДЗУ"},
  "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268":  {id: "7a0ba7ce-ee51-4d94-91ea-82e19d8d3268", ka: "デ", hi: "で", en: "DE", ru: "ДЭ"},
  "a9d9d96f-485c-4352-a845-2c9ea0cccc08":  {id: "a9d9d96f-485c-4352-a845-2c9ea0cccc08", ka: "ド", hi: "ど", en: "DO", ru: "ДО"},
  "364900be-ce05-410d-81f5-b5c6ca75b477":  {id: "364900be-ce05-410d-81f5-b5c6ca75b477", ka: "バ", hi: "ば", en: "BA", ru: "БА"},
  "15725fac-4910-4e36-bdbb-c4f6f890d7dd":  {id: "15725fac-4910-4e36-bdbb-c4f6f890d7dd", ka: "ビ", hi: "び", en: "BI", ru: "БИ"},
  "ad5fe49a-65dd-4016-ad02-ca824b6ac476":  {id: "ad5fe49a-65dd-4016-ad02-ca824b6ac476", ka: "ブ", hi: "ぶ", en: "BU", ru: "БУ"},
  "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f":  {id: "f8f32a3f-a6cf-443c-a7d5-9201f1d50b6f", ka: "ベ", hi: "べ", en: "BE", ru: "БЭ"},
  "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b":  {id: "b1ee6b66-8c09-4cf7-a7ee-12ed24d4fb9b", ka: "ボ", hi: "ぼ", en: "BO", ru: "БО"},
  "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee":  {id: "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee", ka: "ぱ", hi: "ぱ", en: "PA", ru: "ПА"},
  "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b":  {id: "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b", ka: "ぴ", hi: "ぴ", en: "PI", ru: "ПИ"},
  "70bd9d94-d6d5-4572-9b4e-290c2effbec4":  {id: "70bd9d94-d6d5-4572-9b4e-290c2effbec4", ka: "ぷ", hi: "ぷ", en: "PU", ru: "ПУ"},
  "cb95fb95-60c8-4324-a716-a9a1013f9214":  {id: "cb95fb95-60c8-4324-a716-a9a1013f9214", ka: "ぺ", hi: "ぺ", en: "PE", ru: "ПЭ"},
  "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d":  {id: "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d", ka: "ぽ", hi: "ぽ", en: "PO", ru: "ПО"},
  "d1a354dd-03db-4143-8883-bfd21f0c63bf":  {id: "d1a354dd-03db-4143-8883-bfd21f0c63bf", ka: "きゃ", hi: "きゃ", en: "KYA", ru: "KYA"},
  "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f":  {id: "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f", ka: "きゅ", hi: "きゅ", en: "KYU", ru: "KYU"},
  "578f764c-1bdc-4ad6-a89b-daecde53d680":  {id: "578f764c-1bdc-4ad6-a89b-daecde53d680", ka: "きょ", hi: "きょ", en: "KYO", ru: "KYO"},
  "01bc1499-155f-46b7-bbf4-a64d973de743":  {id: "01bc1499-155f-46b7-bbf4-a64d973de743", ka: "しゃ", hi: "しゃ", en: "SHA", ru: "SHA"},
  "fa4fb436-a0fc-413d-abbf-27e5f8d0b941":  {id: "fa4fb436-a0fc-413d-abbf-27e5f8d0b941", ka: "しゅ", hi: "しゅ", en: "SHU", ru: "SHU"},
  "e69b7da1-daaf-4dfc-81b7-0693f48ad97d":  {id: "e69b7da1-daaf-4dfc-81b7-0693f48ad97d", ka: "しょ", hi: "しょ", en: "SHO", ru: "SHO"},
  "57dd1702-6b32-473b-aac6-bafd6344b59c":  {id: "57dd1702-6b32-473b-aac6-bafd6344b59c", ka: "ちゃ", hi: "ちゃ", en: "CHA", ru: "CHA"},
  "78245c5d-c44b-461d-8734-18a1ead49b93":  {id: "78245c5d-c44b-461d-8734-18a1ead49b93", ka: "ちゅ", hi: "ちゅ", en: "CHU", ru: "CHU"},
  "3ea7d433-fd0a-42f1-a049-e51f8c890fab":  {id: "3ea7d433-fd0a-42f1-a049-e51f8c890fab", ka: "ちょ", hi: "ちょ", en: "CHO", ru: "CHO"},
  "f50bbf46-cbd3-4652-b32d-a7ea63d71073":  {id: "f50bbf46-cbd3-4652-b32d-a7ea63d71073", ka: "にゃ", hi: "にゃ", en: "NYA", ru: "NYA"},
  "a8684a65-29d7-468d-bf54-16a1a5c1dc57":  {id: "a8684a65-29d7-468d-bf54-16a1a5c1dc57", ka: "にゅ", hi: "にゅ", en: "NYU", ru: "NYU"},
  "108f5fcc-b005-451f-8004-7ca2e0c295c3":  {id: "108f5fcc-b005-451f-8004-7ca2e0c295c3", ka: "にょ", hi: "にょ", en: "NYO", ru: "NYO"},
  "d765162e-6fb9-4213-bc8c-928a77f6db6e":  {id: "d765162e-6fb9-4213-bc8c-928a77f6db6e", ka: "ひゃ", hi: "ひゃ", en: "HYA", ru: "HYA"},
  "16699951-c484-42e4-889a-8170e46c36cd":  {id: "16699951-c484-42e4-889a-8170e46c36cd", ka: "ひゅ", hi: "ひゅ", en: "HYU", ru: "HYU"},
  "6334c6a8-3b58-411a-9698-476078765d85":  {id: "6334c6a8-3b58-411a-9698-476078765d85", ka: "ひょ", hi: "ひょ", en: "HYO", ru: "HYO"},
  "1c2c7c7f-1058-4665-9c5c-db5371ecc80c":  {id: "1c2c7c7f-1058-4665-9c5c-db5371ecc80c", ka: "みゃ", hi: "みゃ", en: "MYA", ru: "MYA"},
  "32c07e97-0d48-457b-b9ea-c235ea5f0805":  {id: "32c07e97-0d48-457b-b9ea-c235ea5f0805", ka: "みゅ", hi: "みゅ", en: "MYU", ru: "MYU"},
  "3d4e3138-74d7-48c7-8275-fcd18ff4d470":  {id: "3d4e3138-74d7-48c7-8275-fcd18ff4d470", ka: "みょ", hi: "みょ", en: "MYO", ru: "MYO"},
  "3342a4aa-9f35-46f1-9e6b-490897f5f9c0":  {id: "3342a4aa-9f35-46f1-9e6b-490897f5f9c0", ka: "りゃ", hi: "りゃ", en: "RYA", ru: "RYA"},
  "74fe5cce-74ab-4335-8c6c-49e5906711be":  {id: "74fe5cce-74ab-4335-8c6c-49e5906711be", ka: "りゅ", hi: "りゅ", en: "RYU", ru: "RYU"},
  "3aa9f1c6-21d3-419f-ad97-fda28085a281":  {id: "3aa9f1c6-21d3-419f-ad97-fda28085a281", ka: "りょ", hi: "りょ", en: "RYO", ru: "RYO"}
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
    { id: "858b53e1-af17-45d5-8fc2-330121eab5c4", ka: "ヲ", hi: "を", en: "WO", ru: "ВО"},
  ],
  [
    { id: "2a481d17-0d7c-492a-85fc-cab60e9fb6df", ka: "ン", hi: "ん", en: "N", ru: "Н"},
  ]
];

export const baseWithSpaces = base.map((item) =>
  item[0].en !== "WA" && item[0].en !== "YA" && item[0].en !== "N"
    ? item
    : item[0].en === "WA"
      ? [item[0], 0, 0, 0, item[1]]
      : item[0].en === "N"
        ? [0, 0, item[0], 0, 0]
        : [item[0], 0, item[1], 0, item[2]]);

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
    { id: "29586e2f-2cdf-4f5a-ab03-43cdc7de5bee", ka: "ぱ", hi: "ぱ", en: "PA", ru: "ПА"},
    { id: "aa3a1a5c-3654-46e3-826f-aaf4f8d0538b", ka: "ぴ", hi: "ぴ", en: "PI", ru: "ПИ"},
    { id: "70bd9d94-d6d5-4572-9b4e-290c2effbec4", ka: "ぷ", hi: "ぷ", en: "PU", ru: "ПУ"},
    { id: "cb95fb95-60c8-4324-a716-a9a1013f9214", ka: "ぺ", hi: "ぺ", en: "PE", ru: "ПЭ"},
    { id: "dded7c42-3b0c-4e89-9b03-1ad95d40fa9d", ka: "ぽ", hi: "ぽ", en: "PO", ru: "ПО"}
  ]
];

export const yoon: ILetter[][] = [
  [
    { id: "d1a354dd-03db-4143-8883-bfd21f0c63bf", ka: "きゃ", hi: "きゃ", en: "KYA", ru: "KYA"},
    { id: "4f2017b1-ae1d-4630-ba8a-4ce5d55b556f", ka: "きゅ", hi: "きゅ", en: "KYU", ru: "KYU"},
    { id: "578f764c-1bdc-4ad6-a89b-daecde53d680", ka: "きょ", hi: "きょ", en: "KYO", ru: "KYO"}
  ],
  [
    { id: "01bc1499-155f-46b7-bbf4-a64d973de743", ka: "しゃ", hi: "しゃ", en: "SHA", ru: "SHA"},
    { id: "fa4fb436-a0fc-413d-abbf-27e5f8d0b941", ka: "しゅ", hi: "しゅ", en: "SHU", ru: "SHU"},
    { id: "e69b7da1-daaf-4dfc-81b7-0693f48ad97d", ka: "しょ", hi: "しょ", en: "SHO", ru: "SHO"}
  ],
  [
    { id: "57dd1702-6b32-473b-aac6-bafd6344b59c", ka: "ちゃ", hi: "ちゃ", en: "CHA", ru: "CHA"},
    { id: "78245c5d-c44b-461d-8734-18a1ead49b93", ka: "ちゅ", hi: "ちゅ", en: "CHU", ru: "CHU"},
    { id: "3ea7d433-fd0a-42f1-a049-e51f8c890fab", ka: "ちょ", hi: "ちょ", en: "CHO", ru: "CHO"}
  ],
  [
    { id: "f50bbf46-cbd3-4652-b32d-a7ea63d71073", ka: "にゃ", hi: "にゃ", en: "NYA", ru: "NYA"},
    { id: "a8684a65-29d7-468d-bf54-16a1a5c1dc57", ka: "にゅ", hi: "にゅ", en: "NYU", ru: "NYU"},
    { id: "108f5fcc-b005-451f-8004-7ca2e0c295c3", ka: "にょ", hi: "にょ", en: "NYO", ru: "NYO"}
  ],
  [
    { id: "d765162e-6fb9-4213-bc8c-928a77f6db6e", ka: "ひゃ", hi: "ひゃ", en: "HYA", ru: "HYA"},
    { id: "16699951-c484-42e4-889a-8170e46c36cd", ka: "ひゅ", hi: "ひゅ", en: "HYU", ru: "HYU"},
    { id: "6334c6a8-3b58-411a-9698-476078765d85", ka: "ひょ", hi: "ひょ", en: "HYO", ru: "HYO"}
  ],
  [
    { id: "1c2c7c7f-1058-4665-9c5c-db5371ecc80c", ka: "みゃ", hi: "みゃ", en: "MYA", ru: "MYA"},
    { id: "32c07e97-0d48-457b-b9ea-c235ea5f0805", ka: "みゅ", hi: "みゅ", en: "MYU", ru: "MYU"},
    { id: "3d4e3138-74d7-48c7-8275-fcd18ff4d470", ka: "みょ", hi: "みょ", en: "MYO", ru: "MYO"}
  ],
  [
    { id: "3342a4aa-9f35-46f1-9e6b-490897f5f9c0", ka: "りゃ", hi: "りゃ", en: "RYA", ru: "RYA"},
    { id: "74fe5cce-74ab-4335-8c6c-49e5906711be", ka: "りゅ", hi: "りゅ", en: "RYU", ru: "RYU"},
    { id: "3aa9f1c6-21d3-419f-ad97-fda28085a281", ka: "りょ", hi: "りょ", en: "RYO", ru: "RYO"}
  ]
];

// Flat

export const baseFlat: ILetter[] = [
  { id: "11cb85de-e134-449a-82f7-27112c6d5567", ka: "ア", hi: "あ", en: "A", ru: "А"},
  { id: "3b265988-4337-4b07-be7d-0f6bbb9e85e8", ka: "イ", hi: "い", en: "I", ru: "И"},
  { id: "593ed502-6b5a-4894-8af1-e2abc48011bc", ka: "ウ", hi: "う", en: "U", ru: "У"},
  { id: "f2cb6f1f-77f0-4775-bf8e-19bd2e348bf4", ka: "エ", hi: "え", en: "E", ru: "Э"},
  { id: "8a471d81-a1e8-48aa-827c-95c90ca4f7de", ka: "オ", hi: "お", en: "O", ru: "О"},
  { id: "b3dfbd53-80be-4e05-bd67-8693ca610fae", ka: "カ", hi: "か", en: "KA", ru: "КА"},
  { id: "87a714ef-6b9b-43fa-ba6d-bf6b287ebf41", ka: "キ", hi: "き", en: "KI", ru: "КИ"},
  { id: "033018f4-e624-4a89-ac8f-89e41b359f0c", ka: "ク", hi: "く", en: "KU", ru: "КУ"},
  { id: "23e0ec15-f74b-46b2-8366-c96f40bba96c", ka: "ケ", hi: "け", en: "KE", ru: "КЭ"},
  { id: "717b85c5-4985-49ca-bc6b-45ae8729bb4c", ka: "コ", hi: "こ", en: "KO", ru: "КО"},
  { id: "8acd8020-c93c-4a76-a4b8-2e7a8377b0ca", ka: "サ", hi: "さ", en: "SA", ru: "CА"},
  { id: "09a6c10e-93a9-429d-a67f-c8f8869f79ea", ka: "シ", hi: "し", en: "SHI", ru: "ШИ"},
  { id: "c25b5d17-a048-4738-86cc-0abc80341a05", ka: "ス", hi: "す", en: "SU", ru: "СУ"},
  { id: "5044e8dd-75d6-4509-8702-7eb1621f9910", ka: "セ", hi: "せ", en: "SE", ru: "СЕ"},
  { id: "77703e07-cbef-4cee-b9f1-7f5da5e9e3ec", ka: "ソ", hi: "そ", en: "SO", ru: "СО"},
  { id: "cb9cd014-4d23-4ed3-8dc7-5160ff4b85c4", ka: "タ", hi: "た", en: "TA", ru: "ТА"},
  { id: "8d6ffa7d-5b7d-4665-9b51-4d03ed750438", ka: "チ", hi: "ち", en: "CHI", ru: "ЧИ"},
  { id: "f486e6f5-d53a-49ed-9f02-1c47501de600", ka: "ツ", hi: "つ", en: "TSU", ru: "ТУ"},
  { id: "6f620b60-ad30-40f0-8450-d7df26e098bf", ka: "テ", hi: "て", en: "TE", ru: "ТЭ"},
  { id: "0bcae7f2-945f-49bc-8ae4-74c7f0fa0314", ka: "ト", hi: "と", en: "TO", ru: "ТО"},
  { id: "f47bb85d-4f3b-4fad-be34-35060f156d1a", ka: "ナ", hi: "な", en: "NA", ru: "НА"},
  { id: "9de44d9c-cc7b-454c-867c-662c8e6e36e4", ka: "ニ", hi: "に", en: "NI", ru: "НИ"},
  { id: "cc71a202-726d-413e-b0c9-6e56a37bc949", ka: "ヌ", hi: "ぬ", en: "NU", ru: "НУ"},
  { id: "897a0a58-053b-477d-af2d-9776174dd615", ka: "ネ", hi: "ね", en: "NE", ru: "НЭ"},
  { id: "f4495830-3642-47ff-8cae-63e1f982c6c5", ka: "ノ", hi: "の", en: "NO", ru: "НО"},
  { id: "84283e5a-4e8f-4e23-aad3-6a838ca42d3f", ka: "ハ", hi: "は", en: "HA", ru: "ХА"},
  { id: "6f40177d-0174-458d-9795-185c33c5bf63", ka: "ヒ", hi: "ひ", en: "HI", ru: "ХИ"},
  { id: "01660054-a89a-4bca-b4b3-70c4fa4532b1", ka: "フ", hi: "ふ", en: "FU", ru: "ФУ"},
  { id: "d698ce93-0c10-4a37-b68a-bbfad55fc0b2", ka: "ヘ", hi: "へ", en: "HE", ru: "ХЭ"},
  { id: "c331858e-5ecb-4ae1-8418-3747a55b224a", ka: "ホ", hi: "ほ", en: "HO", ru: "ХО"},
  { id: "3871bba5-7a5f-4c7b-874d-86f1a460225b", ka: "マ", hi: "ま", en: "MA", ru: "МА"},
  { id: "baec9ae9-b6cd-450d-a4a5-01d34575b4b1", ka: "ミ", hi: "み", en: "MI", ru: "МИ"},
  { id: "e5250c33-fbc6-4cd6-8e5b-91ea5a72eea1", ka: "ム", hi: "む", en: "MU", ru: "МУ"},
  { id: "7e458a33-a8b4-4adb-aac5-acf0fb9377c1", ka: "メ", hi: "め", en: "ME", ru: "МЭ"},
  { id: "d071984b-be1e-49e9-9ae4-aa5e28ae042f", ka: "モ", hi: "も", en: "MO", ru: "МО"},
  { id: "09029439-6bf0-4c5e-861d-d44d650b436f", ka: "ヤ", hi: "や", en: "YA", ru: "Я"},
  { id: "9451de04-4503-4b8f-a505-318a4e8a2f29", ka: "ユ", hi: "ゆ", en: "YU", ru: "Ю"},
  { id: "6a53e95d-4770-4372-bf67-2cbfb453ccc4", ka: "ヨ", hi: "よ", en: "YO", ru: "Ё"},
  { id: "2198d4d9-865b-4c67-a562-7051f4e2c9d3", ka: "ラ", hi: "ら", en: "RA", ru: "РА"},
  { id: "65725e2e-7d48-43f6-b7d6-65c02eff3da4", ka: "リ", hi: "り", en: "RI", ru: "РИ"},
  { id: "8f08d428-9551-4d0e-a074-509d3b9844d2", ka: "ル", hi: "る", en: "RU", ru: "РУ"},
  { id: "4a75a047-6c35-4f75-a430-ce15dbd09ac0", ka: "レ", hi: "れ", en: "RE", ru: "РЭ"},
  { id: "593ac3e9-44e3-4cdf-a78a-9d0205c8212f", ka: "ロ", hi: "ろ", en: "RO", ru: "РО"},
  { id: "27450657-a78b-446c-a049-771d66f95d95", ka: "ワ", hi: "わ", en: "WA", ru: "ВА"},
  { id: "07a1e610-3999-4b3c-8c75-8ec656e306dc", ka: "ヲ", hi: "を", en: "WO", ru: "ВО"},
  { id: "f08056c6-3d55-4d3a-ba98-1055745ff406", ka: "ン", hi: "ん", en: "N", ru: "Н"},
];

export const dakuonFlat: ILetter[] = [
  { id: "f4507478-11ad-4236-8c58-0b117b86b34d", ka: "ガ", hi: "が", en: "GA", ru: "ГА"},
  { id: "2e72e4fa-9e5a-4270-8efb-ccec541e913e", ka: "ギ", hi: "ぎ", en: "GI", ru: "ГИ"},
  { id: "2ef5e4d2-8476-461c-9fd9-0f580b0d599a", ka: "グ", hi: "ぐ", en: "GU", ru: "ГУ"},
  { id: "aff48cf9-ad79-48b6-9c7c-85b119498788", ka: "ゲ", hi: "げ", en: "GE", ru: "ГЭ"},
  { id: "2c315e15-dcc2-4a26-8367-3324754593e1", ka: "ゴ", hi: "ご", en: "GO", ru: "ГО"},
  { id: "a276e1b2-ec12-4e8e-b292-beca0797e79c", ka: "ザ", hi: "ざ", en: "ZA", ru: "ЗА"},
  { id: "05be9bc6-4e94-46bf-91c6-cbbfb472893d", ka: "ジ", hi: "じ", en: "JI", ru: "ДЗИ"},
  { id: "d8bad768-ecbb-4b94-b400-431ef2940cd1", ka: "ズ", hi: "ず", en: "ZU", ru: "ДЗУ"},
  { id: "5309b0c7-e41f-4f1f-8a00-737bc29d5990", ka: "ゼ", hi: "ぜ", en: "ZE", ru: "ДЗЭ"},
  { id: "b7666f4b-5128-4527-b39e-9a429c35e4bd", ka: "ゾ", hi: "ぞ", en: "ZO", ru: "ДЗО"},
  { id: "d96bca07-6d66-4062-b389-2ce7884bdb74", ka: "ダ", hi: "だ", en: "DA", ru: "ДА"},
  { id: "0ba1923a-fb5e-4f83-a191-6eaa6d02ccae", ka: "ヂ", hi: "ぢ", en: "DJI", ru: "ДЗИ"},
  { id: "fd606a4e-9aaa-48ae-b9d8-edeb94e8c1ff", ka: "ヅ", hi: "づ", en: "DZU", ru: "ДЗУ"},
  { id: "4ab13915-986c-4034-b88b-13732f37f128", ka: "デ", hi: "で", en: "DE", ru: "ДЭ"},
  { id: "92e7244f-56c5-4b4a-a8d2-db5521db7615", ka: "ド", hi: "ど", en: "DO", ru: "ДО"},
  { id: "f73b6158-ef98-4856-98a7-c6945c4e7ee7", ka: "バ", hi: "ば", en: "BA", ru: "БА"},
  { id: "80d9087a-f162-4c0d-9b3c-5e71f57b25c7", ka: "ビ", hi: "び", en: "BI", ru: "БИ"},
  { id: "3e578783-ffd3-4580-92ce-94ae7c92cdad", ka: "ブ", hi: "ぶ", en: "BU", ru: "БУ"},
  { id: "92be525c-a0a5-4471-bef1-4ed932168213", ka: "ベ", hi: "べ", en: "BE", ru: "БЭ"},
  { id: "06079719-c296-4b0b-a806-4bdc8f1cc1b7", ka: "ボ", hi: "ぼ", en: "BO", ru: "БО"}
];

export const handakuonFlat: ILetter[] = [
  { id: "7408e5fc-6052-4960-a4bc-2c2e4450c49d", ka: "ぱ", hi: "ぱ", en: "PA", ru: "ПА"},
  { id: "874526a5-60de-4b5e-b8ea-9edbe5a93ace", ka: "ぴ", hi: "ぴ", en: "PI", ru: "ПИ"},
  { id: "a926450c-61aa-4181-94bb-fa45da89420f", ka: "ぷ", hi: "ぷ", en: "PU", ru: "ПУ"},
  { id: "6fb197ff-b0e7-40e3-9a3c-efcf228c43bf", ka: "ぺ", hi: "ぺ", en: "PE", ru: "ПЭ"},
  { id: "5f785ede-3fd1-4ac0-a1af-2e40ba2e92e9", ka: "ぽ", hi: "ぽ", en: "PO", ru: "ПО"}
];

export const yoonFlat: ILetter[] = [
  { id: "18c7d021-0a4a-4e99-a884-f12f4bbc5af1", ka: "きゃ", hi: "きゃ", en: "KYA", ru: "KYA"},
  { id: "43dfec24-fc03-4836-812c-dd3827a59068", ka: "きゅ", hi: "きゅ", en: "KYU", ru: "KYU"},
  { id: "9e098257-26c1-44f0-a1e9-262467d654b2", ka: "きょ", hi: "きょ", en: "KYO", ru: "KYO"},
  { id: "7b4c57ec-41c3-43b5-805f-4c58b0cfeab3", ka: "しゃ", hi: "しゃ", en: "SHA", ru: "SHA"},
  { id: "7c8561d6-2c14-4e79-8492-7f98cea92068", ka: "しゅ", hi: "しゅ", en: "SHU", ru: "SHU"},
  { id: "708b8d94-f0b9-4010-8433-37a654ab8909", ka: "しょ", hi: "しょ", en: "SHO", ru: "SHO"},
  { id: "793fc17f-4508-402b-8746-d4f03b94fa1c", ka: "ちゃ", hi: "ちゃ", en: "CHA", ru: "CHA"},
  { id: "bbce0b94-8df8-4b10-bca4-59ab8825eb5c", ka: "ちゅ", hi: "ちゅ", en: "CHU", ru: "CHU"},
  { id: "5e358403-3b63-4b53-9fca-be979891d487", ka: "ちょ", hi: "ちょ", en: "CHO", ru: "CHO"},
  { id: "7dc4d879-449e-4104-81a1-cf671da65d03", ka: "にゃ", hi: "にゃ", en: "NYA", ru: "NYA"},
  { id: "f6beeda8-5364-4a48-8a56-ed86ab74523d", ka: "にゅ", hi: "にゅ", en: "NYU", ru: "NYU"},
  { id: "d76a4a54-adb4-4aee-a294-390879bb90cc", ka: "にょ", hi: "にょ", en: "NYO", ru: "NYO"},
  { id: "5b0ce611-a082-4afe-9607-65b68aff95d9", ka: "ひゃ", hi: "ひゃ", en: "HYA", ru: "HYA"},
  { id: "0061a730-4a21-45d9-9256-1456144c4fee", ka: "ひゅ", hi: "ひゅ", en: "HYU", ru: "HYU"},
  { id: "470fbd34-9116-4ba6-90e3-b51cc28bb884", ka: "ひょ", hi: "ひょ", en: "HYO", ru: "HYO"},
  { id: "74704b89-152b-42ee-a0ec-2be189448814", ka: "みゃ", hi: "みゃ", en: "MYA", ru: "MYA"},
  { id: "58099a17-09d3-40b1-b4f8-c8b915e60bbf", ka: "みゅ", hi: "みゅ", en: "MYU", ru: "MYU"},
  { id: "d2d45467-04b3-45f8-a76f-0e135e77dd9e", ka: "みょ", hi: "みょ", en: "MYO", ru: "MYO"},
  { id: "375d54a8-47c3-4207-978c-244b8cd3cc38", ka: "りゃ", hi: "りゃ", en: "RYA", ru: "RYA"},
  { id: "59239f67-08fc-4490-a4f6-d7c850565483", ka: "りゅ", hi: "りゅ", en: "RYU", ru: "RYU"},
  { id: "b264741d-241e-457d-89a1-f418fbd486e4", ka: "りょ", hi: "りょ", en: "RYO", ru: "RYO"}
];

// Flat letters only 
export const baseFlatLetters = [
  "A", "I", "U", "E", "O", 
  "KA", "KI", "KU", "KE", "KO", 
  "SA", "SHI", "SU", "SE", "SO",
  "TA", "CHI", "TSU", "TE", "TO",
  "NA", "NI", "NU", "NE", "NO", 
  "HA", "HI", "FU", "HE", "HO",
  "MA", "MI", "MU", "ME", "MO", 
  "YA", "YU", "YO", 
  "RA", "RI", "RU", "RE", "RO", 
  "WA", "WO", "N"
];

export const dakuonFlatLetters = [
  "GA", "GI", "GU", "GE",
  "GO", "ZA", "JI", "ZU",
  "ZE", "ZO", "DA", "DJI",
  "DZU", "DE", "DO", "BA",
  "BI", "BU", "BE", "BO"
];

export const handakuonFlatLetters = [
  "PA", "PI", "PU", "PE", "PO"
];

export const yoonFlatLetters = [
  "KYA", "KYU", "KYO", "SHA",
  "SHU", "SHO", "CHA", "CHU",
  "CHO", "NYA", "NYU", "NYO",
  "HYA", "HYU", "HYO", "MYA",
  "MYU", "MYO", "RYA", "RYU",
  "RYO"
];