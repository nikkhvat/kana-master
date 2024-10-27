import React, { useEffect, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import Chapter from "../chapter/chapter";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { RootStackParamList } from "@/app/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { updateLessons } from "../model/slice";
import { Typography } from "@/shared/typography";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { ROUTES } from "@/app/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof ROUTES.LEARNING_ROOT
>;
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const LearningList: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

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
      navigation.navigate(ROUTES.LESSON_PAGE, {lesson: { ...item, letters: clonedArray }});
    } else {
      navigation.navigate(ROUTES.LESSON_PAGE, {lesson: item});
    }
  };

  const chapters = useAppSelector((state) => state.lessons.chapters)
  const chaptersLang = useAppSelector((state) => state.lessons.lang)

  useEffect(() => {    
    if (chaptersLang !== lessonsKey) {
      dispatch(updateLessons({
        lang: lessonsKey
      }))
    }

    if (!chapters || chapters.length === 0) {
      dispatch(updateLessons({ lang: lessonsKey }))
    }
  }, [chapters, chaptersLang, lessonsKey])

  return (
    <SafeLayout style={{ flex: 1, paddingBottom: 0 }} disableLeft disableRight>
      <AdaptiveLayout style={{ flex: 1, paddingBottom: 0 }}>
        <>
          <PageTitle style={{ paddingHorizontal: 20 }}>
            {t("tabs.learning")}
          </PageTitle>
          {chapters && <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
            <Switcher<KanaAlphabet>
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              options={[KanaAlphabet.Hiragana, KanaAlphabet.Katakana]}
              translate={[t("kana.hiragana"), t("kana.katakana")]}
            />
          </View>}

          {!chapters && <Text style={[styles.connectionError, Typography.boldH2, {
            color: colors.TextPrimary
          }]} >Server connection error</Text>}

          {chapters && <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          > 
            {chapters.map((item, index) => (
              <Chapter
                title={`${t("lessonsList.chapter")} ${index + 1}. ${index === 0 ? t("kana.basic") : ""} ${index === 1 ? t("lessonsList.grammar") : ""}`}
                lessons={item}
                key={index}
                activeTab={activeTab}
                startLesson={startLesson}
                isLast={index + 1 === chapters.length}
              />
            ))}
          </ScrollView>}
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
  connectionError: {
    marginTop: 100,
    textAlign: 'center',
  }
});
