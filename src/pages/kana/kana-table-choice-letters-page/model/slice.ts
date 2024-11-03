import { createSlice } from "@reduxjs/toolkit";

import { InitialState, toggleLetterAction, toggleLettersAction } from "./types";

import { Kana, KanaAlphabet, KanaMode, KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";
import { LettersKeys, baseFlatLettersId, dakuonFlatLettersId, handakuonFlatLettersId, lettersTableById, yoonFlatLettersId } from "@/shared/data/lettersTable";
import { words } from "@/shared/data/words";
import { findWordsFromArray } from "@/shared/helpers/word";

const initialState: InitialState = {
  selectedLettersHiragana: LETTERS_COUNT[KanaSection.BasicHiragana],
  selectedLettersKatakana: LETTERS_COUNT[KanaSection.BasicKatakana],
  selectedLetters: LETTERS_COUNT[KanaSection.BasicHiragana] + LETTERS_COUNT[KanaSection.BasicKatakana],
  selected: {
    base: { katakana: baseFlatLettersId, hiragana: baseFlatLettersId },
    dakuon: { katakana: dakuonFlatLettersId, hiragana: dakuonFlatLettersId },
    handakuon: { katakana: handakuonFlatLettersId, hiragana: handakuonFlatLettersId },
    yoon: { katakana: yoonFlatLettersId, hiragana: yoonFlatLettersId },
  },
  selectedWords: { katakana: [], hiragana: [] }
};

function toggleLetterInArray(array: string[], letter: string) {
  const index = array.indexOf(letter);
  return index !== -1 ? array.filter(item => item !== letter) : [...array, letter];
}

function updateSelectedLetters(state: InitialState) {
  state.selectedLettersHiragana = Object.values(state.selected).reduce(
    (sum, current) => sum + current.hiragana.length, 0
  );
  state.selectedLettersKatakana = Object.values(state.selected).reduce(
    (sum, current) => sum + current.katakana.length, 0
  );
  state.selectedLetters = state.selectedLettersHiragana + state.selectedLettersKatakana;
}

export const kanaSlice = createSlice({
  name: "kana",
  initialState,
  reducers: {
    clearStateKana: () => initialState,
    countAvailableWords: (state) => {
      const katakanaLetters = [
        ...state.selected.base.katakana,
        ...state.selected.dakuon.katakana,
        ...state.selected.handakuon.katakana,
        ...state.selected.yoon.katakana,
      ].map(item => lettersTableById[item as LettersKeys]?.ka);

      const hiraganaLetters = [
        ...state.selected.base.hiragana,
        ...state.selected.dakuon.hiragana,
        ...state.selected.handakuon.hiragana,
        ...state.selected.yoon.hiragana,
      ].map(item => lettersTableById[item as LettersKeys]?.hi);

      const katakanaMatchingWords = findWordsFromArray(words, katakanaLetters);
      const hiraganaMatchingWords = findWordsFromArray(words, hiraganaLetters);

      state.selectedWords.hiragana = hiraganaMatchingWords;
      state.selectedWords.katakana = katakanaMatchingWords;
    },
    resetKanaSelected: (state) => {
      state.selected = {
        base: { katakana: [], hiragana: [] },
        dakuon: { katakana: [], hiragana: [] },
        handakuon: { katakana: [], hiragana: [] },
        yoon: { katakana: [], hiragana: [] },
      };
      updateSelectedLetters(state);
    },
    toggleSome: (state, action: toggleLettersAction) => {
      const { alphabet, kana, letter } = action.payload;
      let local = state.selected[alphabet][kana];

      const kanaKey = kana === KanaAlphabet.Hiragana ? "hiragana" : "katakana";

      const selectedLettersSet = new Set(state.selected[alphabet][kanaKey]);

      let isActive = true;

      for (let index = 0; index < letter.length; index++) {
        const letterItem = letter[index];
        if (!selectedLettersSet.has(letterItem.id)) {
          isActive = false;
        }
      }

      letter.forEach(elem => {
        if (isActive === false && !selectedLettersSet.has(elem.id)) {
          local = toggleLetterInArray(local, elem.id);
        }
        if (isActive === true) {
          local = toggleLetterInArray(local, elem.id);
        }
      });

      state.selected[alphabet][kanaKey] = local;
      updateSelectedLetters(state);
    },
    toggleLetter: (state, action: toggleLetterAction) => {
      const { alphabet, kana, letter } = action.payload;
      state.selected[alphabet][kana] = toggleLetterInArray(state.selected[alphabet][kana], letter.id);
      updateSelectedLetters(state);
    },
    setKanaSelected: (state, action) => {
      // Kana Sections by Type
      const conditionsKanaSections = [
        { event: KanaSection.BasicHiragana, key: state.selected.base.hiragana, value: baseFlatLettersId },
        { event: KanaSection.BasicKatakana, key: state.selected.base.katakana, value: baseFlatLettersId },
        { event: KanaSection.DakuonKatakana, key: state.selected.dakuon.katakana, value: dakuonFlatLettersId },
        { event: KanaSection.DakuonHiragana, key: state.selected.dakuon.hiragana, value: dakuonFlatLettersId },
        { event: KanaSection.HandakuonKatakana, key: state.selected.handakuon.katakana, value: handakuonFlatLettersId },
        { event: KanaSection.HandakuonHiragana, key: state.selected.handakuon.hiragana, value: handakuonFlatLettersId },
        { event: KanaSection.YoonKatakana, key: state.selected.yoon.katakana, value: yoonFlatLettersId },
        { event: KanaSection.YoonHiragana, key: state.selected.yoon.hiragana, value: yoonFlatLettersId },
      ];

      for (let i = 0; i < conditionsKanaSections.length; i++) {
        const condition = conditionsKanaSections[i];

        if (action.payload === condition.event) {
          condition.key = condition.key.length === LETTERS_COUNT[condition.event]
            ? []
            : condition.value;
        }
      }

      state.selected.base.hiragana = conditionsKanaSections[0].key;
      state.selected.base.katakana = conditionsKanaSections[1].key;
      state.selected.dakuon.katakana = conditionsKanaSections[2].key;
      state.selected.dakuon.hiragana = conditionsKanaSections[3].key;
      state.selected.handakuon.katakana = conditionsKanaSections[4].key;
      state.selected.handakuon.hiragana = conditionsKanaSections[5].key;
      state.selected.yoon.katakana = conditionsKanaSections[6].key;
      state.selected.yoon.hiragana = conditionsKanaSections[7].key;

      if (action.payload === Kana.Hiragana) {
        const condition = state.selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana] &&
          state.selected.dakuon.hiragana.length === LETTERS_COUNT[KanaSection.DakuonHiragana] &&
          state.selected.handakuon.hiragana.length === LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
          state.selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

        state.selected.base.hiragana = condition ? [] : baseFlatLettersId;
        state.selected.dakuon.hiragana = condition ? [] : dakuonFlatLettersId;
        state.selected.handakuon.hiragana = condition ? [] : handakuonFlatLettersId;
        state.selected.yoon.hiragana = condition ? [] : yoonFlatLettersId;
      }

      if (action.payload === Kana.Katakana) {
        const condition = state.selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana] &&
          state.selected.dakuon.katakana.length === LETTERS_COUNT[KanaSection.DakuonKatakana] &&
          state.selected.handakuon.katakana.length === LETTERS_COUNT[KanaSection.HandakuonKatakana] &&
          state.selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

        state.selected.base.katakana = condition ? [] : baseFlatLettersId;
        state.selected.dakuon.katakana = condition ? [] : dakuonFlatLettersId;
        state.selected.handakuon.katakana = condition ? [] : handakuonFlatLettersId;
        state.selected.yoon.katakana = condition ? [] : yoonFlatLettersId;
      }

      if (action.payload === KanaMode.Basic) {
        const condition = state.selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana] &&
          state.selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana];

        state.selected.base.hiragana = condition ? [] : baseFlatLettersId;
        state.selected.base.katakana = condition ? [] : baseFlatLettersId;
      }

      if (action.payload === KanaMode.Dakuon) {
        const condition = state.selected.dakuon.hiragana.length === LETTERS_COUNT[KanaSection.DakuonHiragana] &&
          state.selected.dakuon.katakana.length === LETTERS_COUNT[KanaSection.DakuonKatakana];

        state.selected.dakuon.hiragana = condition ? [] : dakuonFlatLettersId;
        state.selected.dakuon.katakana = condition ? [] : dakuonFlatLettersId;
      }

      if (action.payload === KanaMode.Handakuon) {
        const condition = state.selected.handakuon.hiragana.length === LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
          state.selected.handakuon.katakana.length === LETTERS_COUNT[KanaSection.HandakuonKatakana];

        state.selected.handakuon.hiragana = condition ? [] : handakuonFlatLettersId;
        state.selected.handakuon.katakana = condition ? [] : handakuonFlatLettersId;
      }

      if (action.payload === KanaMode.Yoon) {
        const condition = state.selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana] &&
          state.selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

        state.selected.yoon.katakana = condition ? [] : yoonFlatLettersId;
        state.selected.yoon.hiragana = condition ? [] : yoonFlatLettersId;
      }

      state.selectedLettersHiragana = state.selected.base.hiragana.length +
        state.selected.dakuon.hiragana.length +
        state.selected.handakuon.hiragana.length +
        state.selected.yoon.hiragana.length;

      state.selectedLettersKatakana = state.selected.base.katakana.length +
        state.selected.dakuon.katakana.length +
        state.selected.handakuon.katakana.length +
        state.selected.yoon.katakana.length;

      state.selectedLetters = state.selectedLettersKatakana + state.selectedLettersHiragana;
    }
  },
});

export const { setKanaSelected, resetKanaSelected, toggleLetter, toggleSome, countAvailableWords, clearStateKana } = kanaSlice.actions;

export default kanaSlice.reducer;