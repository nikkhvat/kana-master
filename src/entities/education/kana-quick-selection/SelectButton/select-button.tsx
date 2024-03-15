import React from "react";

import { Pressable, StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

export enum SelectButtonState {
  Text,
  Icon,
  Empty
}

interface SelectButtonProps {
  selected?: boolean
  type?: SelectButtonState
  children?: React.ReactElement | string
  onPress?: () => void
}

const SelectButton: React.FC<SelectButtonProps> = ({ selected, type, children, onPress }) => {
  const { colors } = useThemeContext();
  
  if (type === SelectButtonState.Empty) {
    return <View style={[styles.button, styles.empty]} ></View>;
  }

  return <Pressable style={[
    styles.button, 
    styles.empty, 
    { 
      backgroundColor: type === SelectButtonState.Text ? colors.second_color3 : colors.second_color4,
      borderColor: colors.color2,
    },
    !selected && styles.unselected,
    ]}
    onPress={() => onPress?.()}
    >
    {type === SelectButtonState.Text && 
      <Text style={[
        styles.text, 
        { color: selected ? colors.color5 : colors.color4}]} 
      >
        {children}
      </Text>}

    {type === SelectButtonState.Icon && 
      <Icon name={selected === true ? "check" : "close"} size={24} color={colors.color4} />}
  </Pressable>;
};

export default SelectButton;

const styles = StyleSheet.create({
  empty: {
    borderWidth: 0,
  },
  unselected: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  button: {
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
  },
});