import React, { ReactNode } from "react";

import { Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface ButtonProps extends TouchableOpacityProps {
  title?: string | ReactNode
  type: "active" | "inactive" | "weak" | "general" | "disabled";
  onClick?: () => void;
  fontSize?: number;
  image?: string | null;
  customStyles?: Record<string, string | number>;
  icon?: React.ReactElement
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  type,
  fontSize = 16,
  customStyles = {},
  image = null,
  icon,
  ...props
}) => {
  const { colors } = useThemeContext();

  const buttonStyle: ViewStyle = {
    ...styles.button,
    marginTop: 15,
    backgroundColor: type === "disabled" ? colors.color2 :
      type === "active" ? colors.second_color3 :
        type === "inactive" ? "transparent" :
          type === "weak" ? colors.second_color4 :
            colors.color4,
    borderColor: type === "inactive" ? colors.color2 : "transparent",
    borderWidth: type === "inactive" ? 1 : 0,
    ...customStyles,
  };

  const textStyle: TextStyle = {
    ...styles.text,
    fontSize: fontSize,
    color: type === "disabled" ? colors.color3 :
      type === "active" ? colors.color5 :
        type === "inactive" ? colors.color4 :
          type === "weak" ? colors.color4 :
            colors.color1,
  };

  return (
    <Pressable 
      {...props}
      onPress={() => type !== "disabled" && onClick?.()} 
      style={buttonStyle}
    >
      {icon && icon}
      {image === null ? (
        <>
          {title && 
            typeof title === "string" 
              ? <Text style={textStyle}>{title}</Text>
              : title}
        </>
      ) : (
        <Ionicons name={image as "symbol"} size={24} color={colors.color4} />
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 12,
  },
  text: {
    fontWeight: "700",
  },
});
