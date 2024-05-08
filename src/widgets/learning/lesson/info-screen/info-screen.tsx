import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import {
  AnyBlock,
  InfoLessonScreen,
  LetterBlock,
  MathAnswerBlock,
  RulesBlock,
  SelectAnswerBlock,
  SequenceBlock,
  TableBlock,
  TextBlock,
} from "@/shared/constants/lessons";
import Button from "@/shared/ui/button/button";
import BorderLetter from "@/shared/ui/letter/borderLetter/borderLetter";
import MatchPairs from "@/shared/ui/match-pairs/match-pairs";
import Rules from "@/shared/ui/rules/rules";
import SelectAnswer from "@/shared/ui/select-answer/select-answer";
import Sequence from "@/shared/ui/sequence";
import Table from "@/shared/ui/table/table";
import BlockText from "@/shared/ui/text/text";

type InfoScreenProps = InfoLessonScreen & {
  next: () => void;
  finish: () => void;

  isLast?: boolean;
};

const blockType = {
  isText: (item: AnyBlock): item is TextBlock => "text" in item,
  isTable: (item: AnyBlock): item is TableBlock => "table" in item,
  isRules: (item: AnyBlock): item is RulesBlock => "rules" in item,
  isLetter: (item: AnyBlock): item is LetterBlock => "kana" in item,
  isSelectAnswer: (item: AnyBlock): item is SelectAnswerBlock =>
    "answers" in item,
  isMatchAnswerBlock: (item: AnyBlock): item is MathAnswerBlock =>
    "pairs" in item,
  isSequence: (item: AnyBlock): item is SequenceBlock => "sequence" in item,
};

const InfoScreen: React.FC<InfoScreenProps> = ({
  next,
  finish,
  title,
  blocks,
  isLast,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const interactiveBlocks = blocks.filter(
    (item) =>
      blockType.isSelectAnswer(item) ||
      blockType.isMatchAnswerBlock(item) ||
      blockType.isSequence(item),
  );

  function checkUnknown(arg: never): never {
    throw new Error(`not all blocks are processed: ${arg}`);
  }

  const nextScreen = () => {
    if (isLast && interactiveBlocks.length) {
      finish();
    } else {
      next();
    }
  };

  const textColor = {
    color: colors.color4,
  };

  const getButtons = () => {
    if (interactiveBlocks.length) return <View></View>;

    return (
      <View style={styles.btnsContainer}>
        {!isLast && (
          <Button
            customStyles={{ width: "100%" }}
            type={"general"}
            title={t("common.next")}
            onClick={nextScreen}
          />
        )}
        {isLast && (
          <Button
            customStyles={{ width: "100%" }}
            type={"general"}
            title={t("common.complete")}
            onClick={finish}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title, textColor]}>{title}</Text>

        <View style={styles.blocks}>
          {blocks.map((block, idx) => {
            if (blockType.isText(block)) {
              return <BlockText text={block.text} key={idx} />;
            } else if (blockType.isTable(block)) {
              return <Table key={idx} data={block.table} />;
            } else if (blockType.isRules(block)) {
              return <Rules key={idx} rules={block.rules} />;
            } else if (blockType.isLetter(block)) {
              return <BorderLetter kana={block.kana} key={idx} id={block.id} />;
            } else if (blockType.isSelectAnswer(block)) {
              return (
                <SelectAnswer
                  key={idx}
                  onFinish={nextScreen}
                  answers={block.answers}
                />
              );
            } else if (blockType.isMatchAnswerBlock(block)) {
              return (
                <MatchPairs
                  onComplete={nextScreen}
                  pairs={block.pairs}
                  key={idx}
                />
              );
            } else if (blockType.isSequence(block)) {
              return (
                <Sequence
                  onFinish={nextScreen}
                  sequence={block.sequence}
                  key={idx}
                />
              );
            } else {
              checkUnknown(block);
            }
          })}
        </View>
      </View>

      {getButtons()}
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
    width: "100%",
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
    gap: 15,
  },
});
