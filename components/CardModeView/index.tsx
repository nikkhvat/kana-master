import React from "react";
import { View, Text } from "react-native";
import Button from "../Button";
import { styles } from "./styles";

export type CardModeViewProp = {
  title: string;
  btns: {
    title: string;
    onCLick: Function;
    type: "active" | "inactive" | "weak" | "general";
  }[][];
};

const CardModeView: React.FC<CardModeViewProp> = ({ title, btns }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.column}>
          {btns[0].map((btn) => (
            <Button
              key={btn.title}
              customStyles={styles.btn}
              title={btn.title}
              type={btn.type}
            />
          ))}
        </View>
        <View style={styles.column}>
          {btns[1].map((btn) => (
            <Button
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