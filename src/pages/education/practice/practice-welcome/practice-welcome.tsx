import React, { useEffect, useRef, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";
import EducationPractice from "@/widgets/education/education-welcome/education-welcome-practice/education-practice";
import EducationWordGame from "@/widgets/education/education-welcome/education-welcome-word-game/education-word-game";

const screenWidth = Dimensions.get("window").width - 40;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

enum Screen {
  Testing = "testing",
  WordBuilding = "wordBuilding" 
}

const PracticeWelcomePage: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  
  const [screen, setScreen] = useState(Screen.Testing);

  useEffect(() => {
    if (screen === Screen.Testing) {
      scrollViewRef?.current?.scrollTo({ x: 0, animated: false });  
    } else {
      scrollViewRef?.current?.scrollTo({ x: 1 * screenWidth, animated: false });  
    }
  }, [screen]);

  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <PageTitle>{t("tabs.practice")}</PageTitle>
      <View style={{ paddingBottom: 20 }} >
        <Switcher<Screen>
          activeTab={screen}
          options={[
            Screen.Testing,
            Screen.WordBuilding,
          ]}
          translate={[
            t("learning.testing"),
            t("learning.wordGame"),
          ]}
          setActiveTab={setScreen} />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef as never}
        style={{ flex: 1 }}
        scrollEnabled={false}
      >
        <EducationPractice navigation={navigation} />
        <EducationWordGame navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default PracticeWelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});