import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import Chapter from "../chapter/chapter";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";
import { chapter1, chapter2, chaptres } from "@/shared/data/chapters";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LearningPage"
>;
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const LearningList: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const { lessonsKey } = useGetRomanji();

  const isAutoLesson = (item: AutoLesson | ManuallyLesson): item is AutoLesson => "letters" in item;
  const [activeTab, setActiveTab] = useState<KanaAlphabet>(
    KanaAlphabet.Hiragana,
  );

  const startLesson = (item: AutoLesson | ManuallyLesson) => {
    if (isAutoLesson(item)) {
      const clonedArray = JSON.parse(JSON.stringify(item.letters));
      navigation.navigate("LessonPage", {lesson: { ...item, letters: clonedArray }});
    } else {
      navigation.navigate("LessonPage", {lesson: item});
    }
  };

  const chapters = chaptres(lessonsKey);

  return (
    <SafeLayout style={{ flex: 1, paddingBottom: 0 }} disableLeft disableRight>
      <AdaptiveLayout style={{ flex: 1, paddingBottom: 0 }}>
        <>
          <PageTitle style={{ paddingHorizontal: 20 }}>
            {t("tabs.learning")}
          </PageTitle>
          <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
            <Switcher<KanaAlphabet>
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              options={[KanaAlphabet.Hiragana, KanaAlphabet.Katakana]}
              translate={[t("kana.hiragana"), t("kana.katakana")]}
            />
          </View>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {chapters.map((item, index) => (
              <Chapter
                title={`${t("lessonsList.chapter")} ${index + 1}. ${index === 0 ? t("kana.basic") : ""} ${index === 1 ? t("lessonsList.grammar") : ""}`}
                lessons={item}
                activeTab={activeTab}
                startLesson={startLesson}
              />
            ))}
          </ScrollView>
        </>
      </AdaptiveLayout>
    </SafeLayout>
  );
};

export default LearningList;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
