import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import TopicItem, { TopicItemState } from "@/entities/education/learning/topic-item/topic-item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { lessons } from "@/shared/constants/lessons";
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
  
  const secondChapterIds = [
    "019edc82-150d-4657-921b-9966b02ab243",
    "eed9d727-4ed9-4847-9814-a41704b10d9b",
    "b664f984-b17a-4543-9fc6-a3b8e34349cb",
    "cae560b8-36b1-4c3e-b775-ceab5cbd71df",
    "95790d95-7f7c-448d-8d13-e87fee13a715",
  ];
  
  const thirdChapterIds = [
    "bda8fae8-ad69-414b-bc0d-e7b6947bd196",
    "b78114ca-b87d-47d3-af03-f1a05aad2779",
    "8b3ff09f-5e72-457d-a3c3-3efb4ecb56ad",
    "039da505-a31a-4de8-a0a3-3dec5c4fe951",
    "99643e24-7ba5-4862-9aca-a5ec80062b2a",
    "710ecccf-5ef5-4538-8060-52b6e6338ec3",
  ];

  const firstChapterProgress = firstChapterIds.filter(item => completedLessons.includes(`${key}/${item}`));
  const secondChapterProgress = secondChapterIds.filter(item => completedLessons.includes(`${key}/${item}`));
  const thirdChapterProgress = thirdChapterIds.filter(item => completedLessons.includes(`${key}/${item}`));
  
  const startLesson = (item: {
    title: ILetter;
    letters: ILetter[];
    msg: string;
    kana: KanaAlphabet;
    id: string
  }) => {

    const clonedArray = JSON.parse(JSON.stringify(item.letters));

    setActiveLesson(null);
    navigation.navigate("LessonPage", { ...item, letters: clonedArray });
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
          {lessons.base.map((item, index) =>
            <TopicItem 
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
              last={index + 1 === lessons.base.length} />)}
          
          <Text style={[styles.title, { color: colors.color4 }]} >{(t("lessonsList.chapter"))} 2. {t("kana.dakuon")}</Text>
            <Text style={[styles.subtitle, { color: secondChapterProgress.length === secondChapterIds.length ? colors.second_color2 : colors.color4 }]} >{secondChapterProgress.length}/{secondChapterIds.length} {t("lessonsList.completed")}</Text>
          {lessons.dakuon.map((item, index) =>
            <TopicItem 
              onClick={() => activeLesson === getKana(item.title, activeTab)
                  ? setActiveLesson("")
                : setActiveLesson(getKana(item.title, activeTab))}
              onStartLesson={() => startLesson({ ...item, kana: activeTab })}
              key={getKana(item.title, activeTab)}
              icon={getKana(item.title, activeTab)}
              passed={completedLessons.includes(`${key}/${item.id}`)}
              title={(index + 9) + 1}
              letters={item.letters}
              msg={item.msg}
              kana={activeTab}
              state={activeLesson === getKana(item.title, activeTab)
                ? TopicItemState.Opened
                : TopicItemState.CLosed}
              last={index + 1 === lessons.dakuon.length} />)}
          
          <Text style={[styles.title, { color: colors.color4 }]} >{(t("lessonsList.chapter"))} 3. {t("kana.yoon")}</Text>
            <Text style={[styles.subtitle, { color: thirdChapterProgress.length === thirdChapterIds.length ? colors.second_color2 : colors.color4 }]} >{thirdChapterProgress.length}/{thirdChapterIds.length} {t("lessonsList.completed")}</Text>
          {lessons.yoon.map((item, index) =>
            <TopicItem 
              onClick={() => activeLesson === getKana(item.title, activeTab)
                  ? setActiveLesson("")
                : setActiveLesson(getKana(item.title, activeTab))}
              onStartLesson={() => startLesson({ ...item, kana: activeTab })}
              key={getKana(item.title, activeTab)}
              icon={getKana(item.title, activeTab)}
              passed={completedLessons.includes(`${key}/${item.id}`)}
              title={(index + 14) + 1}
              letters={item.letters}
              msg={item.msg}
              kana={activeTab}
              state={activeLesson === getKana(item.title, activeTab) 
                  ? TopicItemState.Opened
                  : TopicItemState.CLosed}
              last={index + 1 === lessons.yoon.length} />)}
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