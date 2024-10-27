import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import React from "react";
import { Pressable, StyleSheet, Linking, Text } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

interface LinkButtonProps {
  children: string

  link: string
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, link }) => {

  const { colors } = useThemeContext();

  return (
    <Pressable 
      onPress={() => Linking.openURL(link)} 
      style={[styles.button, { borderColor: colors.BorderDefault }]}
    >
      <FontAwesome5 name="telegram" size={24} color={colors.IconPrimary} />
      <Text style={[styles.text, { color: colors.TextPrimary }]} >
        {children} 
      </Text>
    </Pressable>
  )
};

export default LinkButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    paddingLeft: 10,
    gap: 10,
  },
  text: {
    width: "50%",
    fontSize: 17,
    fontWeight: "600"
  }
});