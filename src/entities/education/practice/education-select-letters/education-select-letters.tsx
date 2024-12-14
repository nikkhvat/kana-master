import React from "react";

import { useTranslation } from "react-i18next";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TABLET_WIDTH } from "@/shared/constants/app";
import { useAppSelector } from "@/shared/model/hooks";
import wordGame from "@/shared/resources/preview/cover.jpg";
import { Typography } from "@/shared/typography";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";

export enum CardType {
  Practice = "practice",
  WordGame = "word_game",
}

type EducationKanaSelectedCardProps = {
  imageSource: CardType.Practice | CardType.WordGame;
  onEdit?: () => void;
};

const screenWidth = Dimensions.get("window").width;

const EducationKanaSelectedCard: React.FC<EducationKanaSelectedCardProps> = ({
  imageSource,
  onEdit,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const selectedLettersHiragana = useAppSelector(
    (state) => state.kana.selectedLettersHiragana,
  );

  const selectedLettersKatakana = useAppSelector(
    (state) => state.kana.selectedLettersKatakana,
  );

  const selectedWords = useAppSelector((state) => state.kana.selectedWords);

  const preview = wordGame;

  const value =
    imageSource === CardType.WordGame
      ? selectedWords.hiragana.length + selectedWords.katakana.length
      : selectedLettersHiragana + selectedLettersKatakana;

  const label =
    imageSource === CardType.WordGame
      ? t("selectKana.words")
      : t("selectKana.letters");

  return (
    <ImageBackground
      source={preview}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={[styles.content, { backgroundColor: colors.BgPrimary }]}>
        <View style={styles.header}>
          <Text style={[Typography.boldH1, { color: colors.TextPrimary }]}>
            {value}
          </Text>
        </View>
        {value === 0 && (
          <Text
            style={[Typography.regularLabel, { color: colors.TextSecondary }]}
          >
            {t("selectKana.nothingSelected")}
          </Text>
        )}
        {value !== 0 && (
          <Text
            style={[Typography.regularLabel, { color: colors.TextSecondary }]}
          >
            {label}
            {" / "}
            {selectedLettersHiragana ? t("kana.hiragana") : " "}
            {selectedLettersHiragana !== 0 && selectedLettersKatakana !== 0 ? " & " : ""}
            {selectedLettersKatakana ? t("kana.katakana") : " "}
          </Text>
        )}
        <PrimaryButton
          isHapticFeedback
          isOutline
          containerStyles={styles.button}
          onClick={onEdit}
          icon={<Icon name="filter-outline" size={29} color={colors.IconPrimary} />}
        />
      </View>
    </ImageBackground>
  );
};

export default EducationKanaSelectedCard;

const styles = StyleSheet.create({
  container: {
    height: screenWidth > TABLET_WIDTH ? 360 : 240,
    borderRadius: 24,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 16,
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  content: {
    width: "100%",
    borderRadius: 12,
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 16,
  },
  button: {
    position: "absolute",
    right: 16,
    top: 16,
    borderWidth: 0,
    width: 50
  },
});
