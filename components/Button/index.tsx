import React from "react";

import { styles } from "./styles";

import {
  Text,
  TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

import cx from "../../utils/cx";

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

  if (fontSize) extraStyles["fontSize"] = fontSize;

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
      {image !== null && <Ionicons name={image} size={24} color={"#2A2A2A"} />}
    </TouchableOpacity>
  );
};

export default Button;