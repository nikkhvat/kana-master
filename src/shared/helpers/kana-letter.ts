import { dakuonFlatLettersId, handakuonFlatLettersId, LettersKeys,
  LettersKeysDakuon, LettersKeysHandakuon, LettersKeysYoon,
  yoonFlatLettersId } from "../data/lettersTable";


export const getTypeById = (id: LettersKeys) => {
  if (handakuonFlatLettersId.includes(id as LettersKeysHandakuon)) return "kana.handakuon";
  if (yoonFlatLettersId.includes(id as LettersKeysYoon)) return "kana.yoon";
  if (dakuonFlatLettersId.includes(id as LettersKeysDakuon)) return "kana.dakuon";

  return "kana.basic";
};