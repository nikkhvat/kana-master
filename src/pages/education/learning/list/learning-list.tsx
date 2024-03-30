import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import TopicItem, { TopicItemState } from "@/entities/education/learning/topic-item/topic-item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { lessons } from "@/shared/constants/lessons";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";


const LearningList: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const key = activeTab === KanaAlphabet.Hiragana ? "hi" : "ka";
  
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
          <Text style={[styles.title, { color: colors.color4 }]} >Chapter 1</Text>
          <Text style={[styles.subtitle, { color: colors.color4 }]} >2/9 completed</Text>
          {lessons.base.map((item, index) =>
            <TopicItem 
              onClick={() => activeLesson === item.title[key]
                  ? setActiveLesson("")
                : setActiveLesson(item.title[key])}
              key={item.title[key]}
              icon={item.title[key]}
              passed={false}
              title={index + 1}
              letters={item.letters}
              msg={item.msg}
              kana={activeTab}
              state={activeLesson === item.title[key] ? TopicItemState.Opened : TopicItemState.CLosed}
              last={index + 1 === lessons.base.length} />)}
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