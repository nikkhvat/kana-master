import React from "react";

import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

import { useThemeContext } from "@/hooks/theme-context";
import Button from "@/shared/ui/button/button";


export type EducationModeChangeProps = {
  title: string;
  buttons: {
    title: string;
    type: "active" | "inactive" | "weak" | "general";
    key: string;
    condition?: boolean
  }[][];
  onButtonClick?: (column: number, index: number) => void;
};

const EducationModeChange: React.FC<EducationModeChangeProps> = ({ title, buttons, onButtonClick }) => {

  const { colors } = useThemeContext();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.color4 }]}>{title}</Text>
      <View style={styles.buttonsContainer}>
        {buttons.map((column, columnIndex) => (
          <View key={`column-${columnIndex}`} style={styles.column}>
            {column.map((btn, idx) => (
              <Button
                key={btn.key}
                title={btn.title}
                type={btn.condition ? btn.type : "disabled"}
                onClick={() => btn.condition && onButtonClick?.(columnIndex, idx)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};


export default EducationModeChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 22,
    letterSpacing: -0.43,
    color: "#000",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
});