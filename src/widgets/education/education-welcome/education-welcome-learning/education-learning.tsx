import React from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Dimensions } from "react-native";

import KanaSelectedCard from "@/entities/education/education-selected-card/education-kana-selected-card";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";

type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const EducationLearning: React.FC<PracticeProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const toChooseAlphabet = () => navigation.navigate("ChooseAlphabet", {
    screen: "Learning",
  });

  return (
    <View style={[styles.container, { width: screenWidth - 40 }]}>
      <KanaSelectedCard
        imageSource={"learning"}
        onEdit={toChooseAlphabet}
      />

      <View style={styles.content}>
        <Button 
          title={t("practice.start")} 
          type={"general"} 
          fontSize={17}
          onClick={() => {
            navigation.navigate("LearningPage");
          }} 
        />
      </View>
    </View>
  );
};

export default EducationLearning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 15,
  },
});
