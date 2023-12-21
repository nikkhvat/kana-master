import { createSlice } from "@reduxjs/toolkit";

import { InitialState, toggleLetterAction, toggleLettersAction } from "./types";

import { Kana, KanaMode, KanaSection, LETTERS_COUNT } from "@/constants/kana";
import { baseArray, dakuonArray, handakuonArray, yoonArray } from "@/data/letters";

const initialState: InitialState = {
  selectedLettersHiragana: LETTERS_COUNT[KanaSection.BasicHiragana],
  selectedLettersKatakana: LETTERS_COUNT[KanaSection.BasicKatakana],
  selectedLetters: LETTERS_COUNT[KanaSection.BasicHiragana] + LETTERS_COUNT[KanaSection.BasicKatakana],
  selected: {
    base: { katakana: baseArray, hiragana: baseArray },
    dakuon: { katakana: dakuonArray, hiragana: dakuonArray },
    handakuon: { katakana: handakuonArray, hiragana: handakuonArray },
    yoon: { katakana: yoonArray, hiragana: yoonArray },
  }
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

      const selectedLettersSet = new Set(state.selected[alphabet][kana]);
      
      let isActive = true;

      for (let index = 0; index < letter.length; index++) {
        const letterItem = letter[index];
        if (!selectedLettersSet.has(letterItem.en)) {
          isActive = false;
        }
      }

      letter.forEach(elem => {
        if (isActive === false && !selectedLettersSet.has(elem.en)) {
          local = toggleLetterInArray(local, elem.en);
        }
        if (isActive === true) {
          local = toggleLetterInArray(local, elem.en);
        }
      });

      state.selected[alphabet][kana] = local;
      updateSelectedLetters(state);
    },
    toggleLetter: (state, action: toggleLetterAction) => {
      const { alphabet, kana, letter } = action.payload;
      state.selected[alphabet][kana] = toggleLetterInArray(state.selected[alphabet][kana], letter.en);
      updateSelectedLetters(state);
    },
    setKanaSelected: (state, action) => {
      if (action.payload === KanaSection.BasicHiragana) {
        const condition = state.selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana];
        state.selected.base.hiragana = condition ? [] : baseArray;
      }

      if (action.payload === KanaSection.BasicKatakana) {
        const condition = state.selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana];
        state.selected.base.katakana = condition ? [] : baseArray;
      }

      if (action.payload === KanaSection.DakuonKatakana) {
        const condition = state.selected.dakuon.katakana.length === LETTERS_COUNT[KanaSection.DakuonKatakana];
        state.selected.dakuon.katakana = condition ? [] : dakuonArray;
      }

      if (action.payload === KanaSection.DakuonHiragana) {
        const condition = state.selected.dakuon.hiragana.length === LETTERS_COUNT[KanaSection.DakuonHiragana];
        state.selected.dakuon.hiragana = condition ? [] : dakuonArray;
      }

      if (action.payload === KanaSection.HandakuonKatakana) {
        const condition = state.selected.handakuon.katakana.length === LETTERS_COUNT[KanaSection.HandakuonKatakana];
        state.selected.handakuon.katakana = condition ? [] : handakuonArray;
      }

      if (action.payload === KanaSection.HandakuonHiragana) {
        const condition = state.selected.handakuon.hiragana.length === LETTERS_COUNT[KanaSection.HandakuonHiragana];
        state.selected.handakuon.hiragana = condition ? [] : handakuonArray;
      }

      if (action.payload === KanaSection.YoonKatakana) {
        const condition = state.selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];
        state.selected.yoon.katakana = condition ? [] : yoonArray;
      }

      if (action.payload === KanaSection.YoonHiragana) {
        const condition = state.selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];
        state.selected.yoon.hiragana = condition ? [] : yoonArray;
      }

      if (action.payload === Kana.Hiragana) {
        const condition = state.selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana] &&
          state.selected.dakuon.hiragana.length === LETTERS_COUNT[KanaSection.DakuonHiragana] &&
          state.selected.handakuon.hiragana.length === LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
          state.selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

        state.selected.base.hiragana = condition ? [] : baseArray;
        state.selected.dakuon.hiragana = condition ? [] : dakuonArray;
        state.selected.handakuon.hiragana = condition ? [] : handakuonArray;
        state.selected.yoon.hiragana = condition ? [] : yoonArray;
      }

      if (action.payload === Kana.Katakana) {
        const condition = state.selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana] &&
          state.selected.dakuon.katakana.length === LETTERS_COUNT[KanaSection.DakuonKatakana] &&
          state.selected.handakuon.katakana.length === LETTERS_COUNT[KanaSection.HandakuonKatakana] &&
          state.selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

        state.selected.base.katakana = condition ? [] : baseArray;
        state.selected.dakuon.katakana = condition ? [] : dakuonArray;
        state.selected.handakuon.katakana = condition ? [] : handakuonArray;
        state.selected.yoon.katakana = condition ? [] : yoonArray;
      }

      if (action.payload === KanaMode.Basic) {
        const condition = state.selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana] &&
          state.selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana];

        state.selected.base.hiragana = condition ? [] : baseArray;
        state.selected.base.katakana = condition ? [] : baseArray;
      }

      if (action.payload === KanaMode.Dakuon) {
        const condition = state.selected.dakuon.hiragana.length === LETTERS_COUNT[KanaSection.DakuonHiragana] &&
          state.selected.dakuon.katakana.length === LETTERS_COUNT[KanaSection.DakuonKatakana];

        state.selected.dakuon.hiragana = condition ? [] : dakuonArray;
        state.selected.dakuon.katakana = condition ? [] : dakuonArray;
      }

      if (action.payload === KanaMode.Handakuon) {
        const condition = state.selected.handakuon.hiragana.length === LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
          state.selected.handakuon.katakana.length === LETTERS_COUNT[KanaSection.HandakuonKatakana];

        state.selected.handakuon.hiragana = condition ? [] : handakuonArray;
        state.selected.handakuon.katakana = condition ? [] : handakuonArray;
      }

      if (action.payload === KanaMode.Yoon) {
        const condition = state.selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana] &&
          state.selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

        state.selected.yoon.katakana = condition ? [] : yoonArray;
        state.selected.yoon.hiragana = condition ? [] : yoonArray;
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

export const { setKanaSelected, resetKanaSelected, toggleLetter, toggleSome } = kanaSlice.actions;

export default kanaSlice.reducer;