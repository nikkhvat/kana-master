import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RegistrationErrorProps } from "@/pages/education/practice/education-quiz-word-game/ui/education-practice";
import { KanaAlphabet } from "@/shared/constants/kana";
import { QuestionFindPair } from "@/shared/types/questions";
import MatchPairs from "../match-pairs/match-pairs";

interface EducationPracticeFindPairProps {
  onCompleted?: (hasError: boolean) => void;
  onError?: (data: RegistrationErrorProps) => void;
  question: QuestionFindPair;
  hideTitle?: boolean;
}
const EducationPracticeFindPair: React.FC<EducationPracticeFindPairProps> = ({
  question,
  hideTitle,
  onCompleted,
  onError,
}) => {
  const { pairs, kana } = question;
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const pairsList = useMemo(
    () => pairs.map((item) => item.map((e) => e.title)),
    [pairs],
  );

  return (
    <View style={styles.container}>
      {!hideTitle && (
        <Text style={[styles.question, { color: colors.TextPrimary }]}>
          {kana === KanaAlphabet.Hiragana
            ? t("lesson.matchHiraganaWithTransliteration")
            : t("lesson.matchKatakanaWithTransliteration")}
        </Text>
      )}

      <MatchPairs
        key={pairsList.join()}
        pairs={pairsList}
        onComplete={onCompleted}
        onError={(pair) => {
          onError?.({
            type: "find-pair-word",
            pair: [pair[0], pair[1]],
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  question: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 35,
    marginBottom: 30,
    width: "100%",
    textAlign: "center",
  },
});

export default EducationPracticeFindPair;
