import React from "react";

import { StyleSheet, View } from "react-native";

import Draw from "@/entities/education/draw/draw";
import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { useAppSelector } from "@/shared/model/hooks";
import { StatisticLevel } from "@/pages/kana/kana-list/model/types";

interface DrawKanaProps {
  letter: ILetter;
  kana: KanaAlphabet;
}

const DrawKana: React.FC<DrawKanaProps> = ({ letter, kana }) => {
  const { colors } = useThemeContext();

  const level = useAppSelector(
    (state) => state.statistics.statistics[kana][letter.id],
  );

  const isEnabledStats = useAppSelector((state) => state.statistics.isEnabled);
  const indicatorColor =
    level === undefined
      ? null
      : level?.level === StatisticLevel.Green
        ? colors.second_color2
        : level?.level === StatisticLevel.Yellow
          ? colors.second_color5
          : colors.second_color1;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.color1,
        },
      ]}
    >
      <SymbolHeader
        indicatorColor={isEnabledStats ? indicatorColor : null}
        hideTitle
        kana={kana}
        letter={letter}
      />
      <Draw kana={kana} letter={letter} />
    </View>
  );
};

export default DrawKana;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22,
  },
});
