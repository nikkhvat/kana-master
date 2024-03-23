import React, { useEffect } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";


import { RootState } from "@/app/store";
import SelectButton, { SelectButtonState } from "@/entities/education/kana-quick-selection/SelectButton/select-button";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { countAvailableWords, setKanaSelected } from "@/pages/education/kana-quick-selection/model/slice";
import { Kana, KanaMode, KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";

type ChooseAlphabetNavigationProp = StackNavigationProp<RootStackParamList, "ChooseAlphabet">;

interface EducationKanaQuickSelectionProps {
  screen: "Learning" | "Practice" | "WordBuilding";
  navigation: ChooseAlphabetNavigationProp
}

const EducationKanaQuickSelection: React.FC<EducationKanaQuickSelectionProps> = ({
  screen,
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const SHOW_ALLOWED_WORDS = screen === "WordBuilding";

  const hiraganaSelectedWords = useAppSelector((state: RootState) => state.kana.selectedWords.hiragana);
  const katakanaSelectedWords = useAppSelector((state: RootState) => state.kana.selectedWords.katakana);

  const selected = useAppSelector((state: RootState) => state.kana.selected);

  const selectedLettersHiragana = useAppSelector(
    (state: RootState) => state.kana.selectedLettersHiragana
  );
  const selectedLettersKatakana = useAppSelector(
    (state: RootState) => state.kana.selectedLettersKatakana
  );
  const selectedLetters = useAppSelector(
    (state: RootState) => state.kana.selectedLetters
  );

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [dispatch, selected]);


  const IS_KANA_SELECTED =
    selected.base.katakana.length ===
    LETTERS_COUNT[KanaSection.BasicKatakana] &&
    selected.dakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.DakuonKatakana] &&
    selected.handakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.HandakuonKatakana] &&
    selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

  const IS_HIRA_SELECTED =
    selected.base.hiragana.length ===
    LETTERS_COUNT[KanaSection.BasicHiragana] &&
    selected.dakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.DakuonHiragana] &&
    selected.handakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
    selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

  const IS_BASIC =
    selected.base.hiragana.length ===
    LETTERS_COUNT[KanaSection.BasicHiragana] &&
    selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana];

  const IS_DAKUON =
    selected.dakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.DakuonHiragana] &&
    selected.dakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.DakuonKatakana];

  const IS_HANDAKUON =
    selected.handakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.HandakuonHiragana] &&
    selected.handakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.HandakuonKatakana];

  const IS_YOON =
    selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana] &&
    selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

  const IS_BASIC_HIRA =
    selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana];
  const IS_DAKUON_HIRA =
    selected.dakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.DakuonHiragana];
  const IS_HANDAKUON_HIRA =
    selected.handakuon.hiragana.length ===
    LETTERS_COUNT[KanaSection.HandakuonHiragana];
  const IS_YOON_HIRA =
    selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana];

  const IS_BASIC_KATA =
    selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana];
  const IS_DAKUON_KATA =
    selected.dakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.DakuonKatakana];
  const IS_HANDAKUON_KATA =
    selected.handakuon.katakana.length ===
    LETTERS_COUNT[KanaSection.HandakuonKatakana];
  const IS_YOON_KATA =
    selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana];

  const set = (
    value:
      | KanaSection.BasicHiragana
      | KanaSection.BasicKatakana
      | KanaSection.DakuonKatakana
      | KanaSection.DakuonHiragana
      | KanaSection.HandakuonKatakana
      | KanaSection.HandakuonHiragana
      | KanaSection.YoonKatakana
      | KanaSection.YoonHiragana
      | Kana.Hiragana
      | Kana.Katakana
      | KanaMode.Basic
      | KanaMode.Dakuon
      | KanaMode.Handakuon
      | KanaMode.Yoon
  ) => {
    dispatch(setKanaSelected(value));
  };
  
  return (
    <View>
      <View style={[styles.infoContainer, { borderColor: colors.color2}]}>
        <View style={styles.infoBlock}>
          <Text style={[styles.infoTitle, { color: colors.color4 }]}>{selectedLetters}</Text>
          <Text style={[styles.infoSubTitle, { color: colors.color4 }]}>{t("quickSelectKana.entriesInScope")}</Text>
        </View>
        {SHOW_ALLOWED_WORDS && <View style={[styles.verticalBorder, { backgroundColor: colors.color2 }]} />}
        {SHOW_ALLOWED_WORDS && (
          <View style={styles.infoBlock}>
            <Text style={[styles.infoTitle, { color: colors.color4 }]}>
              {hiraganaSelectedWords.length + katakanaSelectedWords.length}
            </Text>
            <Text style={[styles.infoSubTitle, { color: colors.color4 }]}>{t("quickSelectKana.availableWords")}</Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.kanaStatContainer}>
          <View style={[styles.kanaCard, { borderColor: colors.color2 }]}>
            <Text style={[styles.kanaCardTitle, { color: colors.color4 }]}>{t("kana.hiragana")}</Text>
            <Text style={[styles.kanaCardSubTitle, { color: colors.second_color3 }]}>{selectedLettersHiragana}</Text>
          </View>
          <View style={[styles.kanaCard, { borderColor: colors.color2 }]}>
            <Text style={[styles.kanaCardTitle, { color: colors.color4 }]}>{t("kana.katakana")}</Text>
            <Text style={[styles.kanaCardSubTitle, { color: colors.second_color3 }]}>{selectedLettersKatakana}</Text>
          </View>
        </View>

        <Text style={[styles.selectionTitle, { color: colors.color4 }]}>{t("quickSelectKana.title")}</Text>

        <View style={styles.selectionContainer}>
          <View style={styles.selectionRow}>
            <SelectButton type={SelectButtonState.Empty} />
            <SelectButton selected={IS_HIRA_SELECTED} onPress={() => set(Kana.Hiragana)} type={SelectButtonState.Text}>
              {t("kana.hiragana")}
            </SelectButton>
            <SelectButton selected={IS_KANA_SELECTED} onPress={() => set(Kana.Katakana)} type={SelectButtonState.Text}>
              {t("kana.katakana")}
            </SelectButton>
          </View>

          <View style={styles.selectionRow}>
            <SelectButton selected={IS_BASIC} onPress={() => set(KanaMode.Basic)} type={SelectButtonState.Text}>
              {t("kana.basic")}
            </SelectButton>
            <SelectButton selected={IS_BASIC_HIRA} onPress={() => set(KanaSection.BasicHiragana)} type={SelectButtonState.Icon} />
            <SelectButton selected={IS_BASIC_KATA} onPress={() => set(KanaSection.BasicKatakana)} type={SelectButtonState.Icon} />
          </View>
          
          <View style={styles.selectionRow}>
            <SelectButton selected={IS_DAKUON} onPress={() => set(KanaMode.Dakuon)} type={SelectButtonState.Text}>
              {t("kana.dakuon")}
            </SelectButton>
            <SelectButton selected={IS_DAKUON_HIRA} onPress={() => set(KanaSection.DakuonHiragana)} type={SelectButtonState.Icon} />
            <SelectButton selected={IS_DAKUON_KATA} onPress={() => set(KanaSection.DakuonKatakana)} type={SelectButtonState.Icon} />
          </View>
          
          <View style={styles.selectionRow}>
            <SelectButton selected={IS_HANDAKUON} onPress={() => set(KanaMode.Handakuon)} type={SelectButtonState.Text}>
              {t("kana.handakuon")}
            </SelectButton>
            <SelectButton selected={IS_HANDAKUON_HIRA} onPress={() => set(KanaSection.HandakuonHiragana)} type={SelectButtonState.Icon} />
            <SelectButton selected={IS_HANDAKUON_KATA} onPress={() => set(KanaSection.HandakuonKatakana)} type={SelectButtonState.Icon} /> 
          </View>
          
          <View style={styles.selectionRow}>
            <SelectButton selected={IS_YOON} onPress={() => set(KanaMode.Yoon)} type={SelectButtonState.Text}>
              {t("kana.yoon")}
            </SelectButton>
            <SelectButton selected={IS_YOON_HIRA} onPress={() => set(KanaSection.YoonHiragana)} type={SelectButtonState.Icon} />
            <SelectButton selected={IS_YOON_KATA} onPress={() => set(KanaSection.YoonKatakana)} type={SelectButtonState.Icon} />
          </View>
        </View>

        <Button
          customStyles={{ marginTop: 60, marginBottom: 15 }}
          title={t("quickSelectKana.confirm")}
          type={"general"}
          fontSize={17}
          onClick={() => {
            navigation.goBack();
          }}
        />
      </ScrollView>
    </View>
  );
};

export default EducationKanaQuickSelection;


const styles = StyleSheet.create({
  infoContainer: {
    height: 120,
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  infoBlock: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "40%",
  },
  infoTitle: {
    fontSize: 34,
    fontWeight: "700",
  },
  infoSubTitle: {
    fontSize: 15,
    fontWeight: "400",
    marginTop: 10,
  },
  verticalBorder: {
    width: 1,
    height: 70,
  },
  scroll: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 165
  },
  kanaStatContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingTop: 30,
  },
  kanaCard: {
    width: 108,
    height: 85,
    borderRadius: 12,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  kanaCardTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  kanaCardSubTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  selectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 15,
  },
  selectionContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  selectionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  selectionText: {
    fontSize: 13,
    fontWeight: "700",
  }
});