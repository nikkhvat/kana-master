import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonBuildWord } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import Sequence from "@/entities/education/sequence";
import { shuffleArray } from "@/shared/helpers/letters";
import { LearningTitle } from "../ui/title";

type SelectSequenceLettersProps = LessonBuildWord & {
  next: () => void;
  kana: KanaAlphabet;
};

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({
  sequence,
  kana,
  next,
}) => {
  const { t } = useTranslation();

  const { getRomanji } = useGetRomanji();

  const shaffledSequence = useMemo(
    () => shuffleArray(sequence),
    [JSON.stringify(sequence)],
  );

  const sequenceArray = shaffledSequence.map((item) => getKana(item, kana));

  const sequenceString = shaffledSequence
    .map((item) => getRomanji(item))
    .join(", ");

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <LearningTitle>
        {t("lesson.arrangeSyllablesInCorrectOrder")}
      </LearningTitle>
      <LearningTitle style={{}}>{sequenceString}</LearningTitle>

      <Sequence onFinish={next} sequence={sequenceArray} />
    </View>
  );
};

export default SelectSequenceLettersScreen;
