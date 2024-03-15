import React, { useEffect, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootState } from "@/app/store";
import SoundLetter from "@/entities/kana/sound-letter/sound-letter";
import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter, LettersKeys, dakuonFlatLettersId, handakuonFlatLettersId, lettersTableById, yoonFlatLettersId } from "@/shared/data/lettersTable";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "LearningPage">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "LearningPage">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

interface ILetterWithType extends ILetter {
  type: "katakana" | "hiragana"
}

const EducationLearning: React.FC<LearnScreenProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useThemeContext();
  const { i18n: { language } } = useTranslation();

  const selectedLetters = useAppSelector((state: RootState) => state.kana.selected);

  const [kanaArray, setKanaArray] = useState<ILetterWithType[]>([]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const selectedLettersHiraganaArray = [selectedLetters.base.hiragana,
      selectedLetters.dakuon.hiragana,
      selectedLetters.handakuon.hiragana,
      selectedLetters.yoon.hiragana].flat();

    const selectedLettersKatakanaArray = [
      selectedLetters.base.katakana,
      selectedLetters.dakuon.katakana,
      selectedLetters.handakuon.katakana,
      selectedLetters.yoon.katakana].flat();

    const kanaArray: ILetterWithType[] = [];

    for (let i = 0; i < selectedLettersHiraganaArray.length; i++) {
      const selectedLetter = selectedLettersHiraganaArray[i];
      
      const letter = lettersTableById[selectedLetter as LettersKeys] as ILetterWithType;
      letter.type = "hiragana";

      if (letter) {
        kanaArray.push(letter);
      }
    }

    for (let i = 0; i < selectedLettersKatakanaArray.length; i++) {
      const selectedLetter = selectedLettersKatakanaArray[i];
      
      const letter = lettersTableById[selectedLetter as LettersKeys] as ILetterWithType;
      letter.type = "katakana";

      if (letter) {
        kanaArray.push(letter);
      }
    }

    setKanaArray(kanaArray);
    setIndex(0);
  }, [selectedLetters]);

  const lang = language === "ru" ? "ru" : "en";
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return "yoon";
    if (handakuonFlatLettersId.includes(id)) return "handakuon";
    if (dakuonFlatLettersId.includes(id)) return "dakuon";

    return "basic";
  };

  const currentLetter = kanaArray[index];

  const kana = currentLetter?.type;

  const next = () => {
    if (index + 1 < kanaArray.length) {
      setIndex(prev => prev + 1);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          backgroundColor: colors.color1
        }
      ]} >
      <View style={styles.header}>
        <LinearProgressBar
          close={navigation.goBack}
          current={index + 1}
          all={kanaArray.length || 0}
          title="Kana"
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.color4 }]}>{kana} ({getTypeById(currentLetter?.id)})</Text>
        <Text style={[styles.subTitle, { color: colors.color4 }]}>{currentLetter?.[lang].toUpperCase()}</Text>
        <Symbol
          id={currentLetter?.id}
          kana={kana === "hiragana" ? "hirigana" : "katakana"} />
      </View>

      <View style={styles.buttons}>
        <SoundLetter id={currentLetter?.en} />
        <Button
          customStyles={{ flex: 1, marginTop: 0 }}
          title={"Draw"}
          onClick={() => {
            navigation.navigate("DrawKana", {
              letter: currentLetter,
              kana: kana === "hiragana" ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana
            });
          }}
          type={"inactive"}
          image={"gesture-tap-hold"}
        />
      </View>

      <View style={styles.buttonsContainer}>
        {index + 1 < kanaArray.length ?
          <Button
            title={"Next"}
            type={"general"}
            fontSize={17}
            onClick={next}
          /> 
        :
          <Button
            title={"Complete"}
            type={"general"}
            fontSize={17}
            onClick={navigation.goBack}
          />}
      </View>
    </View>
  );
};

export default EducationLearning;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  subTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 15,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    gap: 15
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 15,
    width: "100%"
  },
});
 