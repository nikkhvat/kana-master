import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { InfoLessonScreen } from "@/shared/constants/lessons";
import Button from "@/shared/ui/button/button";
import BorderLetter from "@/shared/ui/letter/borderLetter/borderLetter";
import Rules from "@/shared/ui/rules/rules";
import SelectAnswer from "@/shared/ui/selectAnswer/select-answer";
import Table from "@/shared/ui/table/table";

type InfoScreenProps = InfoLessonScreen & {
  next: () => void
  finish: () => void
}

const InfoScreen: React.FC<InfoScreenProps> = ({
  next,
  finish,
  title,
  blocks,
  isActiveFinish,
  isActiveNext
 }) => {

  const { t } = useTranslation();
  const { colors } = useThemeContext();
  
  return (
    <View style={styles.container} >
      <View style={styles.content} >
        <Text style={[styles.title, {
          color: colors.color4
        }]} >
          {title}
        </Text>

        <View style={styles.blocks} >
          {blocks.map(block => {
            if (block.type === "text") {
              return <View key={block.text} >
                <Text style={[styles.blockText, { color: colors.color4 }]} >
                  {block.text}
                </Text>
              </View>;
            } else if (block.type === "table") {
              return <Table key={block.type} data={block.table} /> ;
            } else if (block.type === "rules") {
              return <Rules key={block.type} rules={block.rules} />;
            } else if (block.type === "letter") {
              return <BorderLetter kana={block.kana} key={block.id} id={block.id} />;
            } else if (block.type === "select-answer") {
              return <SelectAnswer key={block.type} next={next} answers={block.answers} />;
            }
          })}
        </View>
      </View>

      <View style={styles.btnsContainer} >
        {isActiveNext && <Button
          customStyles={{ width: "100%" }}
          type={"general"}
          title={t("common.next")}
          onClick={next}
        />}
        {isActiveFinish && <Button
          customStyles={{ width: "100%" }}
          type={"general"}
          title={t("common.complete")}
          onClick={finish}
        />}
      </View>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  content: {
    width: "100%"
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
  },
  btnsContainer: {
    width: "100%",
    alignItems: "center",
  },

  // Blocks
  blocks: {
    gap: 15
  },
  blockText: {
    fontSize: 15
  }
});
