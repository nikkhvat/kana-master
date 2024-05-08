import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import Button from "@/shared/ui/button/button";

interface TopicItemProps {
  isPassed?: boolean;
  isOpened?: boolean;
  isLast: boolean;

  icon?: string;
  title: string;
  subtitle: string;
  infoTitle: string;
  infoSubTitle: string;

  onClick?: () => void;
  onStartLesson?: () => void;
}

const screenWidth = Dimensions.get("window").width;

const TopicItem: React.FC<TopicItemProps> = ({
  icon = "?",
  isPassed,
  title,
  subtitle,
  infoTitle,
  infoSubTitle,
  isLast,
  isOpened,
  onClick,
  onStartLesson,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const indicatorRoundColors = {
    borderColor: isPassed ? colors.second_color2 : colors.color2,
    backgroundColor: "transparent",
  };

  const indicatorCheckColors = {
    borderColor: colors.color1,
    backgroundColor: colors.second_color2,
  };

  const indicatorIconColors = {
    backgroundColor: colors.second_color4,
  };

  const lineStyle = {
    backgroundColor: isPassed ? colors.second_color2 : colors.color2,
    height: (isOpened ? "65%" : 24) as number,
  };

  return (
    <Pressable
      style={[
        styles.container,
        {
          paddingBottom: isOpened ? 5 : 35,
        },
      ]}
      onPress={() => onClick?.()}
    >
      <View style={[styles.content]}>
        <View style={styles.indicator}>
          <View style={[styles.indicatorRound, indicatorRoundColors]}></View>
          <View style={[styles.indicatorIcon, indicatorIconColors]}>
            <Text style={[styles.indicatorIconText, { color: colors.color4 }]}>
              {icon}
            </Text>
          </View>
          {isPassed && (
            <View style={[styles.indicatorCheck, indicatorCheckColors]}>
              <Icon name={"check-bold"} size={12} color={colors.color5} />
            </View>
          )}
        </View>
        <View style={[styles.info, { width: screenWidth - 130 }]}>
          <Text style={[styles.title, { color: colors.color4 }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.color4 }]}>
            {subtitle}
          </Text>

          {isOpened && (
            <View style={styles.openedInfo}>
              <View
                style={[styles.infoLine, { backgroundColor: colors.color2 }]}
              />
              <Text style={[styles.infoTitle, { color: colors.color4 }]}>
                {infoTitle}
              </Text>
              <Text style={[styles.infoSubTitle, { color: colors.color4 }]}>
                {infoSubTitle}
              </Text>
              <Button
                onClick={onStartLesson}
                customStyles={{
                  width: 108,
                }}
                type={"general"}
                title={isPassed ? t("common.retry") : t("common.start")}
              />
            </View>
          )}
        </View>
      </View>
      {(!isLast || isOpened) && <View style={[styles.line, lineStyle]} />}
    </Pressable>
  );
};

export default TopicItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 8,
    flex: 1,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    height: "100%",
    alignItems: "flex-start",
    gap: 15,
  },
  indicator: {
    position: "relative",
    width: 72,
    height: 72,
  },
  info: {
    height: "100%",
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 5,
  },
  infoLine: {
    width: "100%",
    marginTop: 15,
    height: 1,
  },
  infoTitle: {
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 17,
  },
  infoSubTitle: {
    marginTop: 5,
    fontWeight: "400",
    fontSize: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
  },
  indicatorRound: {
    borderRadius: 72,
    width: 72,
    height: 72,
    borderWidth: 4,
  },
  indicatorIcon: {
    width: 54,
    height: 54,
    position: "absolute",
    borderRadius: 54,
    left: 9,
    top: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorIconText: {
    fontWeight: "600",
    fontSize: 22,
  },
  indicatorCheck: {
    position: "absolute",
    bottom: -5,
    left: 26,
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  line: {
    width: 4,
    position: "absolute",
    left: 54,
    borderRadius: 4,
    top: 80,
  },
  openedInfo: {
    width: "100%",
  },
});
