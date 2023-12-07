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
    key: string;
  }[][];
  onButtonClick?: Function
};

const CardModeView: React.FC<CardModeViewProp> = ({
  title,
  btns,
  onButtonClick,
}) => {
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