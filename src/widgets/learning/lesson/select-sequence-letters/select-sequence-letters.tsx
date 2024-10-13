import React, { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";

import { KanaAlphabet, TEST_DELAY } from "@/shared/constants/kana";
import { LessonSelectSequenceLetters } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import { shuffleArray } from "@/shared/helpers/letters";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { LearningTitle } from "../ui/title";

type SelectSequenceLettersProps = LessonSelectSequenceLetters & {
  next: (hasError: boolean) => void;
  kana: KanaAlphabet;
};

const screenWidth = Dimensions.get("window").width;

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({
  sequence,
  kana,
  next,
}) => {
  const { getRomanji } = useGetRomanji();
  const { t } = useTranslation();

  const sequenceTrans = sequence
    .map((item) => item.transliterations[0])
    .join(", ");

  const shafledArray = useMemo(() => shuffleArray(sequence), [sequenceTrans]);
  const shafledArray2 = useMemo(() => shuffleArray(sequence), [sequenceTrans]);

  const shafledArrayString = shafledArray
    .map((item) => getRomanji(item))
    .join(", ");
  const shafledArray2String = shafledArray2
    .map((item) => getRomanji(item))
    .join(", ");

  const btns = useMemo(
    () => shuffleArray([shafledArrayString, shafledArray2String]),
    [sequenceTrans],
  );

  const [states, setStates] = useState<(null | false | true)[]>();

  const submit = (answer: string) => {
    setStates((prev) =>
      btns.map((item, index) =>
        item === answer
          ? shafledArrayString === answer
            ? true
            : false
          : prev?.[index] === false || prev?.[index] === true
            ? prev?.[index]
            : null,
      ),
    );

    setTimeout(() => {
      setStates([]);
      next(shafledArrayString !== answer);
    }, TEST_DELAY);
  };

  const rowLength = shafledArrayString.length;

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
        {t("lesson.chooseCorrectTransliterationSequence")}
      </LearningTitle>

      <LearningTitle>
        {shafledArray.map((item) => getKana(item, kana)).join(", ")}
      </LearningTitle>

      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          rowGap: 0,
          flexDirection: rowLength > 18 ? "column" : "row",
        }}
      >
        {btns.map((item) => (
          <PrimaryButton
            isOutline
            key={item}
            width={(rowLength > 18 ? "100%" : (screenWidth - 55) / 2) as number}
            text={item}
            onClick={() => submit(item)}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectSequenceLettersScreen;
