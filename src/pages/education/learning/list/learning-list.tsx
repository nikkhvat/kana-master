import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import TopicItem from "@/entities/education/learning/topic-item/topic-item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, ManuallyLesson, lessons } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "LearningPage">;
interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const LearningList: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const { getRomanji } = useGetRomanji();
  
  const completedLessons = useAppSelector(state => state.lessons.completedLesson);

  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const toggleActiveLesson = (key: string) => {
    if (activeLesson === key) {
      setActiveLesson("");
    } else {
      setActiveLesson(key);
    }
  };

  const key = activeTab === KanaAlphabet.Hiragana ? "hi" : "ka";
  const kanaTitle = activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana");

  const firstChapterIds = lessons.map(item => item.id);
  const firstChapterProgress = firstChapterIds.filter(item => completedLessons.includes(`${key}/${item}`));
  
  const startLesson = (item: AutoLesson | ManuallyLesson) => {
    if (item.type === "auto") {
      const clonedArray = JSON.parse(JSON.stringify(item.letters));
      setActiveLesson(null);
      navigation.navigate("LessonPage", { ...item, letters: clonedArray });
    } else {
      setActiveLesson(null);
      navigation.navigate("LessonPage", item);
    }
  };

  return (
    <SafeLayout style={{ flex: 1, paddingBottom: 0 }} disableLeft disableRight >
      <AdaptiveLayout style={{ flex: 1, paddingBottom: 0 }} >
        <>
        <PageTitle style={{ paddingHorizontal: 20 }} >{t("tabs.learning")}</PageTitle>
        <View style={{ paddingBottom: 20, paddingHorizontal: 20 }} >
          <Switcher<KanaAlphabet>
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={[
              KanaAlphabet.Hiragana,
              KanaAlphabet.Katakana
            ]}
            translate={[
              t("kana.hiragana"),
              t("kana.katakana"),
            ]}
          />
        </View>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} >
          <Text style={[styles.title, { color: colors.color4 }]} >{(t("lessonsList.chapter"))} 1. {t("kana.basic")}</Text>
          <Text style={[styles.subtitle, { color: firstChapterProgress.length === firstChapterIds.length ? colors.second_color2 : colors.color4 }]} >{firstChapterProgress.length}/{firstChapterIds.length} {t("lessonsList.completed")}</Text>
          {lessons.map((item, index) => {
            if (item?.type === "auto") {
              return <TopicItem
                key={getKana(item.title, activeTab)}
                isPassed={completedLessons.includes(`${key}/${item.id}`)}
                isOpened={activeLesson === getKana(item.title, activeTab)}
                isLast={index + 1 === lessons.length} 
                icon={getKana(item.title, activeTab)}
                title={`${t("lessonsList.lesson")} ${index}`}
                subtitle={item.letters.map(item => getKana(item, activeTab)).join(", ")}
                infoTitle={`${kanaTitle} ${item.letters.map(item => getRomanji(item)).join(", ").toLocaleLowerCase()}`} 
                infoSubTitle={t(item.msg, { count: item.letters.length})} 
                onClick={() => toggleActiveLesson(getKana(item.title, activeTab))}
                onStartLesson={() => startLesson({ ...item, kana: activeTab })}
              />;
            }

            return <TopicItem
              key={item.title}
              isPassed={item.category.length === 2 ? completedLessons.includes(item.id) : completedLessons.includes(`${key}/${item.id}`)}
              isOpened={activeLesson === `${item.title}/${activeTab}`}
              isLast={index + 1 === lessons.length} 
              icon={item.icon}
              title={item.title}
              subtitle={item.subTitle}
              infoTitle={item.infoTitle}
              infoSubTitle={item.infoSubTitle}
              onClick={() => toggleActiveLesson(`${item.title}/${activeTab}`)}
              onStartLesson={() => startLesson({ ...item })}
            />;
          })}
        </ScrollView>
        </>
      </AdaptiveLayout>
    </SafeLayout>
  );
};

export default LearningList;

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 22,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 22,
    paddingHorizontal: 20,
  },
  scroll: {
    flex: 1,
  },
  line: {
    height: 1,
    width: "100%",
    marginBottom: 20
  }
});