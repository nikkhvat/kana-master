import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Text } from "react-native";

import TopicItem from "@/entities/education/learning/topic-item/topic-item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { useAppSelector } from "@/shared/model/hooks";

type ChapterProps = {
  title: string
  lessons: (AutoLesson | ManuallyLesson)[]
  activeTab: KanaAlphabet
  startLesson: (item: AutoLesson | ManuallyLesson) => void
}

const Chapter: React.FC<ChapterProps> = ({
  lessons,
  activeTab,
  title,
  startLesson,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const { getRomanji } = useGetRomanji();

  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const key = activeTab === KanaAlphabet.Hiragana ? "hi" : "ka";

  const isAutoLesson = (item: AutoLesson | ManuallyLesson): item is AutoLesson => "letters" in item;

  const completedLessons = useAppSelector(
    (state) => state.lessons.completedLesson,
  );

  const firstChapterIds = lessons.map((item) => item.id);
  const firstChapterProgress = firstChapterIds.filter((item) =>
    completedLessons.includes(`${key}/${item}`),
  );

  const lessonsList = lessons.filter((item) =>
    isAutoLesson(item) ? true : item.category.includes(activeTab)
  );

  const kanaTitle =
    activeTab === KanaAlphabet.Hiragana
      ? t("kana.hiragana")
      : t("kana.katakana");


  const toggleActiveLesson = (key: string) => {
    if (activeLesson === key) {
      setActiveLesson("");
    } else {
      setActiveLesson(key);
    }
  };

  if (lessonsList.length === 0) return <></>;
  
  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>
        {title}
      </Text>
      <Text
        style={[
          styles.subtitle,
          {
            color:
              firstChapterProgress.length === firstChapterIds.length
                ? colors.second_color2
                : colors.color4,
          },
        ]}
      >
        {firstChapterProgress.length}/{firstChapterIds.length}{" "}
        {t("lessonsList.completed")}
      </Text>
      {lessonsList.map((item, index) => {
        if (isAutoLesson(item)) {
          return (
            <TopicItem
              key={getKana(item.title, activeTab)}
              isPassed={completedLessons.includes(`${key}/${item.id}`)}
              isOpened={activeLesson === getKana(item.title, activeTab)}
              isLast={index + 1 === lessonsList.length}
              icon={getKana(item.title, activeTab)}
              title={`${t("lessonsList.lesson")} ${index}`}
              subtitle={item.letters
                .map((item) => getKana(item, activeTab))
                .join(", ")}
              infoTitle={`${kanaTitle} ${item.letters
                .map((item) => getRomanji(item))
                .join(", ")
                .toLocaleLowerCase()}`}
              infoSubTitle={t(item.msg, { count: item.letters.length })}
              onClick={() =>
                toggleActiveLesson(getKana(item.title, activeTab))
              }
              onStartLesson={() =>
                startLesson({ ...item, kana: activeTab })
              }
            />
          );
        }

        return (
          <TopicItem
            key={item.title}
            isPassed={
              item.category.length === 2
                ? completedLessons.includes(item.id)
                : completedLessons.includes(`${key}/${item.id}`)
            }
            isOpened={activeLesson === `${item.title}/${activeTab}`}
            isLast={index + 1 === lessonsList.length}
            icon={item.icon}
            title={item.title}
            subtitle={item.subTitle}
            infoTitle={item.infoTitle}
            infoSubTitle={item.infoSubTitle}
            onClick={() =>
              toggleActiveLesson(`${item.title}/${activeTab}`)
            }
            onStartLesson={() => startLesson({ ...item })}
          />
        );
      })}
    </>
  );
};

export default Chapter;

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
  scrollContent: {
    paddingBottom: 20,
  },
  line: {
    height: 1,
    width: "100%",
    marginBottom: 20,
  },
});
