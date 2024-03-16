import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { CardMode, Kana } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";
import CircularProgressBar from "@/shared/ui/progressbar/circular/circular-progress-bar";


type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, "Results">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Results">;

interface EducationResultProps {
  route: LearnScreenRouteProp;
  navigation: LearnResultsNavigationProp;
}

const EducationResultPage: React.FC<EducationResultProps> = ({ route, navigation }) => {
  const { result } = route.params;

  const insets = useSafeAreaInsets();

  const { colors } = useThemeContext();

  const home = () => {
    navigation.navigate("Root");
  };

  const millisecondsToSeconds = (milliseconds: number) => (milliseconds / 10000).toFixed(1);

  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

  const getKeyByKana = (letter: ILetter, kana: CardMode) => {
    const isKana = (kana === CardMode.katakanaToHiragana || kana === CardMode.katakanaToRomaji);
    const isHira = (kana === CardMode.hiraganaToKatakana || kana === CardMode.hiraganaToRomaji);

    return isKana ? letter.ka : isHira ? letter.hi : letter[lang];
  };

  const getKeyAnswer = (letter: ILetter, mode: CardMode) => {
    if (mode === CardMode.hiraganaToKatakana) return `${letter.hi} (${letter.ka})`;
    if (mode === CardMode.hiraganaToRomaji) return `${letter.hi} (${letter[lang]})`;
    if (mode === CardMode.romajiToHiragana) return `${letter[lang]} (${letter.hi})`;
    if (mode === CardMode.katakanaToHiragana) return `${letter.ka} (${letter.hi})`;
    if (mode === CardMode.katakanaToRomaji) return `${letter.ka} (${letter[lang]})`;
    if (mode === CardMode.romajiToKatakana) return `${letter[lang]} (${letter.ka})`;

    // return letter[lang];
  };

  return (
    <View style={[
      containerStyles.container, 
      { 
        paddingTop: insets.top, 
        paddingBottom: insets.bottom, 
        backgroundColor: colors.color1
      }]}>
      <Text style={[containerStyles.title, { color: colors.color4 }]}>Practice complete!</Text>

      <View style={[containerStyles.statsCard, { borderColor: colors.color2 }]}>
        <View style={containerStyles.statsGraph}>
          <CircularProgressBar
            progress={(result.correctQuestions / result.totalQuestions) * 100}
          />
        </View>
        <View style={containerStyles.statsDescription}>
          <Text style={[containerStyles.statsTitle, { color: colors.color4 }]}>Score</Text>
          <View style={containerStyles.statsSubText}>
            <Text style={[containerStyles.statsSubTitleLarge, { color: colors.color4 }]}>
              {result.correctQuestions + 1}
            </Text>
            <Text style={[containerStyles.statsSubTitle, { color: colors.color4 }]}>
              / {result.totalQuestions + 1}
            </Text>
          </View>
          <Text style={[containerStyles.statsSubTime, { color: colors.color3 }]}>
            {millisecondsToSeconds(result.totalTime)} sec ({millisecondsToSeconds(result.avgTime)} sec / question)
          </Text>
        </View>
      </View>

      <ScrollView style={containerStyles.scroll}>
        <Text style={[containerStyles.metricsTitle, {
          color: colors.color4
        }]} >Details</Text>
        {result.type === "RESULT_PRACTICE" && <View style={[containerStyles.detailsCard, { borderColor: colors.color2}]} >
          <Text style={[containerStyles.detailsCardTitle, { color: colors.color3}]} >Alpabet:</Text>
          <Text style={[containerStyles.detailsCardValue, { color: colors.color4}]} >
            {result.alphabets.map(alphabet => alphabet === Kana.English ? "Romanji" : alphabet).join(", ")}
          </Text>
        </View>}
        {result.type === "RESULT_PRACTICE" && <View style={[containerStyles.detailsCard, { borderColor: colors.color2}]} >
          <Text style={[containerStyles.detailsCardTitle, { color: colors.color3}]} >The fastest answer:</Text>
          <Text style={[containerStyles.detailsCardValue, { color: colors.color4}]} >
            {getKeyByKana(result.fastesAnswer.answer, result.fastesAnswer.type)}: 
            {" "}{millisecondsToSeconds(result.fastesAnswer.time)} sec.
          </Text>
        </View>}
        {result.type === "RESULT_PRACTICE" && <View style={[containerStyles.detailsCard, { borderColor: colors.color2}]} >
          <Text style={[containerStyles.detailsCardTitle, { color: colors.color3 }]} >The slowest answer:</Text>
          <Text style={[containerStyles.detailsCardValue, { color: colors.color4}]} >
            {getKeyByKana(result.slowestAnswer.answer, result.slowestAnswer.type)}: 
            {" "}{millisecondsToSeconds(result.slowestAnswer.time)} sec.
          </Text>
        </View>}
        {result.type === "RESULT_PRACTICE" && result.incorrect.length &&
        <View style={[containerStyles.detailsCard, { borderColor: colors.color2}]} >
          <Text style={[containerStyles.detailsCardTitle, { color: colors.color3 }]} >Incorrect answers:</Text>
          <Text style={[containerStyles.detailsCardValue, { color: colors.color4}]} >
            {result.incorrect.map(item => `${getKeyAnswer(item.letter, item.mode)}`).join(", ")}
          </Text>
        </View>}
        {result.type === "RESULT_WORD_GAME" && result.incorrectWordBuilding.length > 0 &&
         <View style={[containerStyles.detailsCard, { borderColor: colors.color2}]} >
          <Text style={[containerStyles.detailsCardTitle, { color: colors.color3 }]} >Incorrect word building:</Text>
          <Text style={[containerStyles.detailsCardValue, { color: colors.color4}]} >
            {result.incorrectWordBuilding.map(item => `${item[0]} (${item[1]})`).join(", ")}
          </Text>
        </View>}
        {result.type === "RESULT_WORD_GAME" && result.incorrectFindThePair.length > 0 &&
        <View style={[containerStyles.detailsCard, { borderColor: colors.color2}]} >
          <Text style={[containerStyles.detailsCardTitle, { color: colors.color3 }]} >Incorrect find the pair:</Text>
          <Text style={[containerStyles.detailsCardValue, { color: colors.color4}]} >
            {result.incorrectFindThePair.map(item => `${item[0]} (${item[1]})`).join(", ")}
          </Text>
        </View>}
        {result.type === "RESULT_WORD_GAME" && result.incorrectChoice.length > 0 &&
        <View style={[containerStyles.detailsCard, { borderColor: colors.color2}]} >
          <Text style={[containerStyles.detailsCardTitle, { color: colors.color3 }]} >Incorrect Choice:</Text>
          <Text style={[containerStyles.detailsCardValue, { color: colors.color4}]} >
            {result.incorrectChoice.map(item => `${item[0]} (${item[1]})`).join(", ")}
          </Text>
        </View>}
      </ScrollView>
      <View style={containerStyles.buttons} >
        <Button
          type={"general"}
          title={"Done"}
          onClick={home}
        />
      </View>
    </View>
  );
};

const containerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  buttons: {
    paddingHorizontal: 20,
  },
  metricsTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 30,
    // marginBottom: 15
  },
  scroll: {
    padding: 20,
    paddingTop: 0,
  },
  statsCard: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 130,
    flexDirection: "row",
    padding: 15,
    gap: 15
  },
  statsGraph: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  statsDescription: {},
  statsTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
  statsSubTitleLarge: {
    fontSize: 22,
    fontWeight: "700",
    marginRight: 4,
  },
  statsSubTitle: {
    fontSize: 17,
    fontWeight: "400",
  },
  statsSubText: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsSubTime: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 30,
  },
  detailsCard: {
    width: "100%",
    minHeight: 84,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 15,
    gap: 10
  },
  detailsCardTitle: {
    fontSize: 17,
    fontWeight: "400",
  },
  detailsCardValue: {
    fontSize: 17,
    fontWeight: "700"
  },
});

export default EducationResultPage;
