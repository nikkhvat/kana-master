import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { styles } from "./styles";

import { StackNavigationProp } from "@react-navigation/stack";

type SettingsLearnScreenRouteProp = RouteProp<RootStackParamList, "SettingsLearn">;
type SettingsLearnScreenNavigationProp = StackNavigationProp<RootStackParamList, "SettingsLearn">;

interface LearnScreenProps {
  route: SettingsLearnScreenRouteProp;
  navigation: SettingsLearnScreenNavigationProp;
}

function SettingsLearnScreen({ route, navigation }: LearnScreenProps) {
  const { letters, kata } = route.params;

  const [mode, setMode] = useState(0 as 0 | 1);
  const chooseMode = () => {
    Alert.alert(
      "Выберите режим",
      "",
      [
        { text: "Выбирать значения", onPress: () => setMode(0) },
        { text: "Выбирать иероглиф", onPress: () => setMode(1) },
        { text: "Отмена", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const [isTime, setIsTime] = useState(0 as 0 | 1);
  const chooseTime = () => {
    Alert.alert(
      "Выберите режим",
      "",
      [
        { text: "Да", onPress: () => setIsTime(0) },
        { text: "Нет", onPress: () => setIsTime(1) },
        { text: "Отмена", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const startTest = () => {
    navigation.navigate("Learn", {
      letters: letters,
      kata: kata,
      mode: mode,
      isTime,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Начать тест</Text>
        <TouchableOpacity style={styles.option} onPress={chooseMode}>
          <Text style={styles.optionText}>
            Режим: {mode ? "выбирать значение" : "выбирать иероглиф"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={chooseTime}>
          <Text style={styles.optionText}>
            Показывать время: {mode ? "да" : "нет"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.startTestBtn]} onPress={startTest}>
        <Text style={styles.buttonText}>Start learn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsLearnScreen;