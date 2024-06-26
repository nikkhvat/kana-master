import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Pressable, StyleSheet, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { countAvailableWords, setKanaSelected } from "./model/slice";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { RootState } from "@/app/store";
import SelectButton, { SelectButtonState } from "@/entities/kana/kana-quick-selection/SelectButton/select-button";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Kana, KanaAlphabet, KanaMode, KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";

interface EducationKanaQuickSelectionProps {
  route: RouteProp<RootStackParamList, "ChooseAlphabet">;
  navigation: StackNavigationProp<RootStackParamList, "ChooseAlphabet">;
}

const EducationKanaQuickSelectionPage: React.FC<EducationKanaQuickSelectionProps> = ({ route, navigation }) => {
  const { screen } = route.params;
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const SHOW_ALLOWED_WORDS = screen === "WordBuilding";

  const selected = useAppSelector((state: RootState) => state.kana.selected);

  const hiraganaSelectedWords = useAppSelector((state: RootState) => state.kana.selectedWords.hiragana);
  const katakanaSelectedWords = useAppSelector((state: RootState) => state.kana.selectedWords.katakana);

  const selectedLettersHiragana = useAppSelector((state: RootState) => state.kana.selectedLettersHiragana);
  const selectedLettersKatakana = useAppSelector((state: RootState) => state.kana.selectedLettersKatakana);
  const selectedLetters = useAppSelector((state: RootState) => state.kana.selectedLetters);

  const IS_BASIC_HIRA = selected.base.hiragana.length === LETTERS_COUNT.basic;
  const IS_DAKUON_HIRA = selected.dakuon.hiragana.length === LETTERS_COUNT.dakuon;
  const IS_HANDAKUON_HIRA = selected.handakuon.hiragana.length === LETTERS_COUNT.handakuon;
  const IS_YOON_HIRA = selected.yoon.hiragana.length === LETTERS_COUNT.yoon;

  const IS_BASIC_KATA = selected.base.katakana.length === LETTERS_COUNT.basic;
  const IS_DAKUON_KATA = selected.dakuon.katakana.length === LETTERS_COUNT.dakuon;
  const IS_HANDAKUON_KATA = selected.handakuon.katakana.length === LETTERS_COUNT.handakuon;
  const IS_YOON_KATA = selected.yoon.katakana.length === LETTERS_COUNT.yoon;

  const IS_BASIC = IS_BASIC_HIRA && IS_BASIC_KATA;
  const IS_DAKUON = IS_DAKUON_HIRA && IS_DAKUON_KATA;
  const IS_HANDAKUON = IS_HANDAKUON_HIRA && IS_HANDAKUON_KATA;
  const IS_YOON = IS_YOON_HIRA && IS_YOON_KATA;

  const IS_KANA_SELECTED = selectedLettersKatakana === LETTERS_COUNT[KanaAlphabet.Katakana];
  const IS_HIRA_SELECTED = selectedLettersHiragana === LETTERS_COUNT[KanaAlphabet.Hiragana];

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

  type EmptyItem = { empty: boolean }
  type TextItem = { selected: boolean, action: () => void, label: string }
  type BoolItem = { selected: boolean, action: () => void }
  type AnyItem = EmptyItem | TextItem | BoolItem

  const isEmptyItem = (item: AnyItem): item is EmptyItem => "empty" in item;
  const isTextItem = (item: AnyItem): item is TextItem => "label" in item;
  const isBoolItem = (item: AnyItem): item is BoolItem => !("empty" in item) && !("label" in item) && "selected" in item && "action" in item;

  const selection: AnyItem[][] = [
    [
      { empty: true },
      { selected: IS_HIRA_SELECTED, action: () => set(Kana.Hiragana), label: t("kana.hiragana") },
      { selected: IS_KANA_SELECTED, action: () => set(Kana.Katakana), label: t("kana.katakana") },
    ],
    [
      { selected: IS_BASIC, action: () => set(KanaMode.Basic), label: t("kana.basic") },
      { selected: IS_BASIC_HIRA, action: () => set(KanaSection.BasicHiragana) },
      { selected: IS_BASIC_KATA, action: () => set(KanaSection.BasicKatakana) },
    ],
    [
      { selected: IS_DAKUON, action: () => set(KanaMode.Dakuon), label: t("kana.dakuon") },
      { selected: IS_DAKUON_HIRA, action: () => set(KanaSection.DakuonHiragana) },
      { selected: IS_DAKUON_KATA, action: () => set(KanaSection.DakuonKatakana) },
    ],
    [
      { selected: IS_HANDAKUON, action: () => set(KanaMode.Handakuon), label: t("kana.handakuon") },
      { selected: IS_HANDAKUON_HIRA, action: () => set(KanaSection.HandakuonHiragana) },
      { selected: IS_HANDAKUON_KATA, action: () => set(KanaSection.HandakuonKatakana) },
    ],
    [
      { selected: IS_YOON, action: () => set(KanaMode.Yoon), label: t("kana.yoon") },
      { selected: IS_YOON_HIRA, action: () => set(KanaSection.YoonHiragana) },
      { selected: IS_YOON_KATA, action: () => set(KanaSection.YoonKatakana) },
    ]
  ];

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [dispatch, selected]);

  return (
    <AdaptiveLayout style={{ flex: 1 }} >
      <View style={{ flex: 1, backgroundColor: colors.color1, paddingTop: insets.top }}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={{ justifyContent: "center", alignItems: "center", padding: 18, margin: -18 }}>
            <Icon name="keyboard-backspace" size={24} color={colors.color4} />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("KanaSelect", { title: "" })}
            style={{ justifyContent: "center", alignItems: "center", padding: 18, margin: -18 }}
          >
            <Icon name="square-edit-outline" size={24} color={colors.color4} />
          </Pressable>
        </View>

        <View>
          <View style={[styles.infoContainer, { borderColor: colors.color2 }]}>
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

              {selection.map((section, idx) => (
                <View key={idx} style={styles.selectionRow}>
                  {section.map((item, index) => {
                    if (isEmptyItem(item)) {
                      return <SelectButton key={index} type={SelectButtonState.Empty} />;
                    }

                    if (isTextItem(item)) {
                      return (
                        <SelectButton
                          key={index}
                          selected={item.selected}
                          onPress={item.action}
                          type={SelectButtonState.Text}>
                          {item.label}
                        </SelectButton>
                      );
                    }

                    if (isBoolItem(item)) {
                      return (
                        <SelectButton
                          key={index}
                          selected={item.selected}
                          onPress={item.action}
                          type={SelectButtonState.Icon}
                        />
                      );
                    }
                  })}
                </View>
              ))}
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
      </View>
    </AdaptiveLayout>
  );
};

export default EducationKanaQuickSelectionPage;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
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