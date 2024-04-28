import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import TopicItem, { TopicItemState } from "@/entities/education/learning/topic-item/topic-item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, ManuallyLesson, lessons } from "@/shared/constants/lessons";
import { ILetter } from "@/shared/data/lettersTable";
import getKana from "@/shared/helpers/getKanaKey";
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
  
  const completedLessons = useAppSelector(state => state.lessons.completedLesson);

  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const key = activeTab === KanaAlphabet.Hiragana ? "hi" : "ka";

  const firstChapterIds = [
    "52aa8316-4669-41e6-98d3-2b3e42a943ff",
    "3a060caa-ac2f-42cb-a901-c19848e9d5c5",
    "2fa83f16-0848-49ea-a910-3e09dbd95de8",
    "17da3959-de2c-40e6-a1aa-8cbe5237f818",
    "f2b99593-28bb-43dd-9983-ea2668af30ab",
    "404f7e6c-864e-4ec0-8039-f3b59c6e611d",
    "dea61dc7-dfe3-41c0-890f-028cbf27bf3d",
    "75a8dbb6-7cfd-4e69-9ad7-20940884aabc",
    "83f0bc1e-f901-4b40-a6c6-501fb4726fb4",
    "608ce336-8437-47b7-942d-5f4e335ef9ba",
  ];
  
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
          {lessons.base.map((item, index) => {
            if (item?.type === "auto") {
              return <TopicItem
                onClick={() => activeLesson === getKana(item.title, activeTab)
                  ? setActiveLesson("")
                  : setActiveLesson(getKana(item.title, activeTab))}
                onStartLesson={() => startLesson({ ...item, kana: activeTab })}
                key={getKana(item.title, activeTab)}
                icon={getKana(item.title, activeTab)}
                passed={completedLessons.includes(`${key}/${item.id}`)}
                title={index + 1}
                letters={item.letters}
                msg={item.msg}
                kana={activeTab}
                state={activeLesson === getKana(item.title, activeTab)
                  ? TopicItemState.Opened
                  : TopicItemState.CLosed}
                last={index + 1 === lessons.base.length} />;
            }

            return <TopicItem
              onClick={() => activeLesson === item.title
                ? setActiveLesson("")
                : setActiveLesson(item.title)}
              onStartLesson={() => startLesson({ ...item })}
              key={item.title}
              icon={item.title}
              passed={completedLessons.includes(`${key}/${item.id}`)}
              title={index + 1}
              msg={item.msg}
              kana={activeTab}
              state={activeLesson === item.title
                ? TopicItemState.Opened
                : TopicItemState.CLosed}
              last={index + 1 === lessons.base.length} />;
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