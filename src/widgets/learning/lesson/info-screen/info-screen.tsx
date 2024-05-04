import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { InfoLessonScreen } from "@/shared/constants/lessons";
import Button from "@/shared/ui/button/button";
import BorderLetter from "@/shared/ui/letter/borderLetter/borderLetter";
import MatchPairs from "@/shared/ui/matchPairs/match-pairs";
import Rules from "@/shared/ui/rules/rules";
import SelectAnswer from "@/shared/ui/selectAnswer/select-answer";
import Sequence from "@/shared/ui/sequence";
import Table from "@/shared/ui/table/table";

type InfoScreenProps = InfoLessonScreen & {
  next: () => void;
  finish: () => void;
};

const BoldText: React.FC<{ children: string }> = ({ children }) => {
  return <Text style={{ fontWeight: "600" }}>{children}</Text>;
};

const parseString = (input: string) => {
  const regex = /\*\*(.*?)\*\*/g;
  const matches = input.matchAll(regex);
  let lastIndex = 0;
  const parsedContent = [];

  for (const match of matches) {
    const [fullMatch, word] = match;
    const startIndex = input.indexOf(fullMatch, lastIndex);
    const beforeText = input.substring(lastIndex, startIndex);

    if (beforeText) {
      parsedContent.push(beforeText);
    }

    parsedContent.push(<BoldText key={startIndex}>{word}</BoldText>);
    lastIndex = startIndex + fullMatch.length;
  }

  const remainingText = input.substring(lastIndex);
  if (remainingText) {
    parsedContent.push(remainingText);
  }

  return parsedContent;
};

const InfoScreen: React.FC<InfoScreenProps> = ({
  next,
  finish,
  title,
  blocks,
  isActiveFinish,
  isActiveNext,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  function checkUnknown(arg: never): never {
    throw new Error(`not all blocks are processed: ${arg}`);
  }

  const nextScreen = () => {
    next();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.color4,
            },
          ]}
        >
          {title}
        </Text>

        <View style={styles.blocks}>
          {blocks.map((block, idx) => {
            if (block.type === "text") {
              return (
                <View key={block.text}>
                  <Text style={[styles.blockText, { color: colors.color4 }]}>
                    {parseString(block.text)}
                  </Text>
                </View>
              );
            } else if (block.type === "table") {
              return <Table key={idx} data={block.table} />;
            } else if (block.type === "rules") {
              return <Rules key={idx} rules={block.rules} />;
            } else if (block.type === "letter") {
              return <BorderLetter kana={block.kana} key={idx} id={block.id} />;
            } else if (block.type === "select-answer") {
              return (
                <SelectAnswer
                  key={idx}
                  next={nextScreen}
                  answers={block.answers}
                />
              );
            } else if (block.type === "match-answer") {
              return (
                <MatchPairs
                  onComplete={nextScreen}
                  pairs={block.pairs}
                  key={idx}
                />
              );
            } else if (block.type === "sequence") {
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

      <View style={styles.btnsContainer}>
        {isActiveNext && (
          <Button
            customStyles={{ width: "100%" }}
            type={"general"}
            title={t("common.next")}
            onClick={nextScreen}
          />
        )}
        {isActiveFinish && (
          <Button
            customStyles={{ width: "100%" }}
            type={"general"}
            title={t("common.complete")}
            onClick={finish}
          />
        )}
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
  blockText: {
    fontSize: 15,
  },
});
