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
      state.selectedLettersHiragana = 0;
      state.selectedLettersKatakana = 0;
      state.selectedLetters = 0;
    },
    toggleSome: (state, action: toggleLettersAction) => {
      let isSelected = true;

      for (let i = 0; i < action.payload.letter.length; i++) {
        const letter = action.payload.letter[i];

        if (!state.selected[action.payload.alphabet][action.payload.kana].includes(letter.en)) {
          isSelected = false;
        }
      }

      let local = state.selected[action.payload.alphabet][action.payload.kana];

      for (let i = 0; i < action.payload.letter.length; i++) {
        const elem = action.payload.letter[i];

        if (local.indexOf(elem.en) !== -1) {
          if (isSelected) {
            local = local.filter(item => item !== elem.en);
          }
        } else {
          if (!isSelected) {
            local.push(elem.en);
          }
        }
      }
      
      state.selected[action.payload.alphabet][action.payload.kana] = local;
    },
    toggleLetter: (state, action: toggleLetterAction) => {
      let local = state.selected[action.payload.alphabet][action.payload.kana];

      if (local.indexOf(action.payload.letter.en) !== -1) {
        local = local.filter(item => item !== action.payload.letter.en);
      } else {
        local.push(action.payload.letter.en);
      }
      
      state.selected[action.payload.alphabet][action.payload.kana] = local;

      state.selectedLettersHiragana = state.selected.base.hiragana.length +
        state.selected.dakuon.hiragana.length +
        state.selected.handakuon.hiragana.length +
        state.selected.yoon.hiragana.length;

      state.selectedLettersKatakana = state.selected.base.katakana.length +
        state.selected.dakuon.katakana.length +
        state.selected.handakuon.katakana.length +
        state.selected.yoon.katakana.length;

      state.selectedLetters = state.selectedLettersKatakana + state.selectedLettersHiragana;
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