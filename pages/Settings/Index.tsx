import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";

const Settings: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("русский");
  const [selectedTheme, setSelectedTheme] = useState("системное");

  const chooseLanguage = () => {
    Alert.alert(
      "Выберите язык",
      "",
      [
        { text: "Русский", onPress: () => setSelectedLanguage("русский") },
        { text: "Английский", onPress: () => setSelectedLanguage("английский") },
        { text: "Отмена", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const chooseTheme = () => {
    Alert.alert(
      "Выберите тему",
      "",
      [
        { text: "Системное", onPress: () => setSelectedTheme("системное") },
        { text: "Тёмная", onPress: () => setSelectedTheme("тёмная") },
        { text: "Светлая", onPress: () => setSelectedTheme("светлая") },
        { text: "Отмена", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Настройки</Text>

      <TouchableOpacity style={styles.option} onPress={chooseLanguage}>
        <Text style={styles.optionText}>Язык: {selectedLanguage}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={chooseTheme}>
        <Text style={styles.optionText}>Тема приложения: {selectedTheme}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
