import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { RootStackParamList } from "@/app/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";
import EducationPractice from "@/widgets/education/education-welcome/education-welcome-practice/education-practice";
import EducationWordGame from "@/widgets/education/education-welcome/education-welcome-word-game/education-word-game";
import { ROUTES } from "@/app/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.PRACTICE_ROOT>;

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

  const insets = useSafeAreaInsets();

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

        {screen === Screen.Testing && <EducationPractice navigation={navigation} />}
        {screen === Screen.WordBuilding && <EducationWordGame navigation={navigation} />}
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