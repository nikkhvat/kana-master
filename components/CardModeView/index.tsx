import React from "react";
import { View, Text } from "react-native";
import Button from "../Button";

import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Colors } from "../../App";


export type CardModeViewProp = {
  title: string;
  btns: {
    title: string;
    onCLick: Function;
    type: "active" | "inactive" | "weak" | "general";
    key: string;
  }[][];
  onButtonClick?: Function
};

const CardModeView: React.FC<CardModeViewProp> = ({
  title,
  btns,
  onButtonClick,
}) => {
  const colors = useTheme().colors as Colors;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
    },
    title: {
      color: colors.color4,
      fontSize: 17,
      fontWeight: "700",
      lineHeight: 22,
      letterSpacing: -0.43,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 15,
    },
    column: {
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1,
    },
    btn: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.column}>
          {btns[0].map((btn, idx) => (
            <Button
              onClick={() => onButtonClick?.(0, idx)}
              key={btn.title}
              customStyles={styles.btn}
              title={btn.title}
              type={btn.type}
            />
          ))}
        </View>
        <View style={styles.column}>
          {btns[1].map((btn, idx) => (
            <Button
              onClick={() => onButtonClick?.(1, idx)}
              key={btn.title}
              customStyles={styles.btn}
              title={btn.title}
              type={btn.type}
            />
          ))}
        </View>
      </View>
    </View>
  );
};


export default CardModeView;