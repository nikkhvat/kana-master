import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";
import { BASIC_SECTIONS, DAKUON_SECTIONS, HANDAKUON_SECTIONS, HIRA_SECTIONS, KATA_SECTIONS, Kana, KanaMode, KanaSection, LETTERS_COUNT, YOON_SECTIONS } from "../../../constants/kana";
import { countLetters, isAllSelected, updateSections } from "../../../helpers/array";

const initialState: InitialState = {
  kanaSections: [
    KanaSection.BasicHiragana,
    KanaSection.BasicKatakana,
  ],
  selectedLettersHiragana: LETTERS_COUNT[KanaSection.BasicHiragana],
  selectedLettersKatakana: LETTERS_COUNT[KanaSection.BasicKatakana],
  selectedLetters: LETTERS_COUNT[KanaSection.BasicHiragana] + LETTERS_COUNT[KanaSection.BasicKatakana],
};

export const kanaSlice = createSlice({
  name: "kana",
  initialState,
  reducers: {
    setKanaSelected: (state, action) => {
      if (HIRA_SECTIONS.concat(KATA_SECTIONS).includes(action.payload)) {
        state.kanaSections = updateSections(
          state.kanaSections,
          [action.payload],
          state.kanaSections.includes(action.payload)
        );
      }

      const payloadMappings: any = {
        [Kana.Hiragana]: HIRA_SECTIONS,
        [Kana.Katakana]: KATA_SECTIONS,
        [KanaMode.Basic]: BASIC_SECTIONS,
        [KanaMode.Dakuon]: DAKUON_SECTIONS,
        [KanaMode.Handakuon]: HANDAKUON_SECTIONS,
        [KanaMode.Yoon]: YOON_SECTIONS,
      };

      const targets = payloadMappings[action.payload];

      if (targets) {
        state.kanaSections = updateSections(
          state.kanaSections,
          targets,
          isAllSelected(state.kanaSections, targets)
        );
      }

      const hiraganaCount = countLetters(state.kanaSections.filter(section => HIRA_SECTIONS.includes(section)));
      const katakanaCount = countLetters(state.kanaSections.filter(section => KATA_SECTIONS.includes(section)));

      state.selectedLettersHiragana = hiraganaCount;
      state.selectedLettersKatakana = katakanaCount;
      state.selectedLetters = hiraganaCount + katakanaCount;
    }
  },
});

export const { setKanaSelected } = kanaSlice.actions;

export default kanaSlice.reducer;