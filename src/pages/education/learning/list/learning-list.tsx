import React, { useEffect, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import Chapter from "../chapter/chapter";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { init, updateLessons } from "../model/slice";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LearningPage"
>;
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const LearningList: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

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

  const chapters = useAppSelector((state) => state.lessons.chapters)
  const lastUpdate = useAppSelector((state) => state.lessons.lastUpdate)
  const chaptersLang = useAppSelector((state) => state.lessons.lang)

  useEffect(() => {
    if (!chapters || chapters.length === 0) {
      dispatch(init(lessonsKey))
    }
  }, [chapters])

  useEffect(() => {
    const now = +new Date();

    const timeDifference = now - lastUpdate;

    if (timeDifference >= 3600000 || lastUpdate === undefined) {
      dispatch(updateLessons({
        lang: lessonsKey
      }))
    }

    if (chaptersLang !== lessonsKey) {
      dispatch(updateLessons({
        lang: lessonsKey
      }))
    }
  }, [])

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
            {chapters && chapters.map((item, index) => (
              <Chapter
                title={`${t("lessonsList.chapter")} ${index + 1}. ${index === 0 ? t("kana.basic") : ""} ${index === 1 ? t("lessonsList.grammar") : ""}`}
                lessons={item}
                key={index}
                activeTab={activeTab}
                startLesson={startLesson}
                isLast={index + 1 === chapters.length}
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
