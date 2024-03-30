import React, { useEffect, useRef, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { verticalScale } from "@/shared/helpers/metrics";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";
import EducationPractice from "@/widgets/education/education-welcome/education-welcome-practice/education-practice";
import EducationWordGame from "@/widgets/education/education-welcome/education-welcome-word-game/education-word-game";

const screenWidth = Dimensions.get("window").width;
const pageWidth = screenWidth - 40 - (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

enum Screen {
  Testing = "testing",
  WordBuilding = "wordBuilding" 
}

const PracticeWelcomePage: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  
  const [screen, setScreen] = useState(Screen.Testing);

  useEffect(() => {
    if (screen === Screen.Testing) {
      scrollViewRef?.current?.scrollTo({ x: 0, animated: false });  
    } else {
      scrollViewRef?.current?.scrollTo({ x: 1 * pageWidth, animated: false });  
    }
  }, [screen]);

  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AdaptiveLayout style={{flex: 1}} >
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
      </AdaptiveLayout>
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