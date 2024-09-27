import React from "react";

import { useTranslation } from "react-i18next";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TABLET_WIDTH } from "@/shared/constants/app";
import { useAppSelector } from "@/shared/model/hooks";
import practiceImage from "@/shared/resources/preview/practice.jpg";
import wordGame from "@/shared/resources/preview/wordgame.jpg";
import { Typography } from "@/shared/typography";

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

  const preview = imageSource === CardType.Practice ? practiceImage : wordGame;

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
            {selectedLettersHiragana !== 0 && selectedLettersKatakana !== 0
              ? " & "
              : ""}
            {selectedLettersKatakana ? t("kana.katakana") : " "}
          </Text>
        )}
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Icon name="filter-outline" size={29} color={colors.IconPrimary} />
        </TouchableOpacity>
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
    paddingBottom: 15,
    position: "relative",
    paddingLeft: 15,
    paddingRight: 15,
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
  },
});
