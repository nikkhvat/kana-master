import React from "react";

import { StyleSheet, Text } from "react-native";

type LetterTextProps = {
  children: string,
  color: string,
  fontSize?: number,
}

const LetterText: React.FC<LetterTextProps> = ({ 
  children,
  color,
  fontSize = 17
}) => {
  return (
    <Text style={[styles.text, { color: color, fontSize: fontSize }]} >
      {children}
    </Text>
  );
};

export default LetterText;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    fontWeight: "400",
    textTransform: "uppercase"
  },
});
