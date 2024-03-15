import React, { useRef, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import EducationLearning from "@/widgets/education/education-welcome/education-welcome-learning/education-learning";
import EducationPractice from "@/widgets/education/education-welcome/education-welcome-practice/education-practice";
import EducationWordGame from "@/widgets/education/education-welcome/education-welcome-word-game/education-word-game";

const screenWidth = Dimensions.get("window").width - 40;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const EducationWelcomePage: React.FC<HomeScreenProps> = ({ navigation }) => {
  enum Screen {
    Learning,
    Practice,
    WordBuilding
  }

  const { t } = useTranslation();

  const [screen, setScreen] = useState(Screen.Learning);

  const screens = [
    { title: t("learning.practice"), val: Screen.Learning },
    { title: t("learning.testing"), val: Screen.Practice },
    { title: t("learning.wordGame"), val: Screen.WordBuilding },
  ];

  const insets = useSafeAreaInsets();

  const scrollViewRef = useRef<ScrollView>();

  const handleTabPress = (index: number) => {
    scrollViewRef?.current?.scrollTo({ x: (index * screenWidth), animated: false });

    switch (index) {
      case 0:
        setScreen(Screen.Learning);
        break;
      case 1:
        setScreen(Screen.Practice);
        break;
      case 2:
        setScreen(Screen.WordBuilding);
        break;
    }
  };

  const { colors } = useThemeContext();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("tabs.learning")}</Text>
      <View style={styles.header}>
        {screens.map((item, index) => (
          <TouchableOpacity key={index} style={styles.tab} onPress={() => handleTabPress(item.val)}>
            <Text style={[styles.tabText, { color: item.val === screen ? colors.color4 : colors.color3 }]}>
              {item.title}
            </Text>
            {item.val === screen && <View style={[styles.tabLine, { backgroundColor: colors.color4 }]} />}
          </TouchableOpacity>
        ))}
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
        <EducationLearning navigation={navigation} />
        <EducationPractice navigation={navigation} />
        <EducationWordGame navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default EducationWelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 54,
  },
  tab: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    position: "relative",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "700",
  },
  tabLine: {
    position: "absolute",
    height: 2,
    width: 32,
    top: 4,
  },
  content: {
    gap: 0
  },
});