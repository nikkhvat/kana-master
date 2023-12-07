import React from "react";

import { styles } from "./styles";

import {
  Text,
  TouchableOpacity,
} from "react-native";

import cx from "../../utils/cx";

type ButtonProps = {
  title: string;
  type: "active" | "inactive" | "weak" | "general";
  onClick?: Function;
  fontSize?: number;
  customStyles?: any
};


const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  type,
  fontSize,
  customStyles,
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
      <Text
        style={cx(styles.text, styles[`text_${type}`], extraStyles)}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;