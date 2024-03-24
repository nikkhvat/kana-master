import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { useAppSelector } from "@/shared/model/hooks";
import learningImage from "@/shared/resources/preview/learning.jpg";
import practiceImage from "@/shared/resources/preview/practice.jpg";
import wordgameImage from "@/shared/resources/preview/wordgame.jpg";

type EducationKanaSelectedCardProps = {
  imageSource: "learning" | "practice" | "wordgame";
  onEdit?: () => void;
};

const screenWidth = Dimensions.get("window").width;

const EducationKanaSelectedCard: React.FC<EducationKanaSelectedCardProps> = ({
  imageSource,
  onEdit,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const selectedLettersHiragana = useAppSelector(state => state.kana.selectedLettersHiragana);
  const selectedLettersKatakana = useAppSelector(state => state.kana.selectedLettersKatakana);

  const selectedWords = useAppSelector(state => state.kana.selectedWords);

  const preview =
    imageSource === "learning"
      ? learningImage
      : imageSource === "practice"
        ? practiceImage
        : wordgameImage;
  
  const value = 
    imageSource === "wordgame" 
      ? selectedWords.hiragana.length + selectedWords.katakana.length 
      : selectedLettersHiragana + selectedLettersKatakana;
  
  const label = 
    imageSource === "wordgame"
      ? t("selectKana.words") : t("selectKana.letters");

  return (
    <ImageBackground source={preview} resizeMode="cover" style={styles.container}>
      <View style={[styles.content, {backgroundColor: colors.color1}]}>
        <View style={styles.header} >
          <Text style={[styles.title, { color: colors.color4 }]}>
            {value}
          </Text>
        </View>
        {value === 0 && <Text style={[styles.subTitle, { color: colors.color3 }]}>
          {t("selectKana.nothingSelected")}
        </Text>}
        {value !== 0 && <Text style={[styles.subTitle, { color: colors.color3 }]}>
          {label}{" / "}
          {selectedLettersHiragana ? t("kana.hiragana") : " "}
          {selectedLettersHiragana !== 0 && selectedLettersKatakana !== 0 ? " & " : ""}
          {selectedLettersKatakana ? t("kana.katakana") : " "}
        </Text>}
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.color4 }]} onPress={onEdit}>
          <Icon name="square-edit-outline" size={24} color={colors.color1} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default EducationKanaSelectedCard;

const styles = StyleSheet.create({
  container: {
    height: screenWidth > 500 ? 360 : 240,
    borderRadius: 20,
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
    gap: 8
  },
  content: {
    width: "100%",
    borderRadius: 12,
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 13,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    right: 15,
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
});
