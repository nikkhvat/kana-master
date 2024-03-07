import React from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";

interface LanguageButtonProps {
  children: string
  langKey: string
  active: boolean
  onPress?: () => void
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  children,
  langKey,
  onPress,
  active,
}) => {

  const { colors } = useThemeContext();
  
  return (
    <Pressable style={[styles.button, active 
      ? { borderColor: colors.color4, backgroundColor: colors.color4 } 
      : { borderColor: colors.color2 }]} onPress={() => onPress?.()} >
      <Text 
        style={[styles.key, { color: active ? colors.color1 : colors.color4 }]} >
        {langKey}
      </Text>
      <View style={[styles.line, {backgroundColor: colors.color3}]} ></View>
      <Text 
        style={[styles.title, { color: active ? colors.color1 : colors.color4 }]} >
        {children}
      </Text>
    </Pressable>
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  key: {
    fontSize: 15,
    fontWeight: "500",
    textTransform: "uppercase"
  },
  title: {
    fontSize: 15,
    fontWeight: "500"
  },
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingLeft: 10,
    gap: 10
  },
  line: {
    width: 1,
    height: 20,
  }
});