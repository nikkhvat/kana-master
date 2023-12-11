import React from "react";

import { StyleSheet } from "react-native";

import {
  Text,
  TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

import cx from "../../utils/cx";
import { useTheme } from "@react-navigation/native";
import { Colors } from "../../App";

type ButtonProps = {
  title: string;
  type: "active" | "inactive" | "weak" | "general";
  onClick?: Function;
  fontSize?: number;
  customStyles?: any;
  image?: string | null;
};


const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  type,
  fontSize,
  customStyles,
  image = null,
}) => {
  const extraStyles: Record<string, string | number> = {};

  const colors = useTheme().colors as Colors;

  if (fontSize) extraStyles["fontSize"] = fontSize;

  const styles = StyleSheet.create({
    button: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
      height: 50,
      borderRadius: 12,
    },
    button_active: {
      backgroundColor: colors.second_color3,
    },
    button_inactive: {
      backgroundColor: "transparent",
      borderColor: colors.color2,
      borderStyle: "solid",
      borderWidth: 1,
    },
    button_weak: {
      backgroundColor: colors.second_color4,
    },
    button_general: {
      backgroundColor: colors.color4,
    },
    text: {
      fontSize: 13,
    },
    text_active: {
      color: colors.color5,
      fontWeight: "700",
    },
    text_inactive: {
      color: colors.color4,
      fontWeight: "700",
    },
    text_weak: {
      color: colors.color4,
      fontWeight: "700",
    },
    text_general: {
      color: colors.color1,
      fontWeight: "700",
    },
  });

  return (
    <TouchableOpacity
      style={cx(
        styles.button,
        styles[`button_${type}`],
        extraStyles,
        customStyles
      )}
      onPress={() => onClick?.()}
    >
      {image === null && (
        <Text style={cx(styles.text, styles[`text_${type}`], extraStyles)}>
          {title}
        </Text>
      )}
      {image !== null && <Ionicons name={image} size={24} color={colors.color4} />}
    </TouchableOpacity>
  );
};

export default Button;