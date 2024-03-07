import React from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";

interface FindPairItemProps {
  isError: boolean
  isSelect: boolean
  isCorrect: boolean
  onPress: () => void
  children: string
}

const FindPairItem: React.FC<FindPairItemProps> = ({
  isError,
  isSelect,
  isCorrect,
  onPress,
  children
}) => {

  const { colors } = useThemeContext();

  const styles = StyleSheet.create({
    itemStyle: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isCorrect
          ? colors.second_color2 
          : isError ? colors.second_color1
          : isSelect ? colors.second_color2 : colors.color2,
      backgroundColor: isCorrect ? colors.second_color2
          : isError ? colors.second_color1
          : isSelect ? "transparent" : "transparent",
      height: 50,
    },
    text: {
      color: colors.color4,
      fontSize: 22,
    }
  });

  return (
    <Pressable 
      style={styles.itemStyle}
      onPress={onPress}
    >
      <Text style={styles.text} >{children}</Text>
    </Pressable>
  );
};

export default FindPairItem;