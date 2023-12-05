import React, { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import { styles } from "./styles";

import {
  allLetters as allLettersUtil,
  selectedLetters as selectedLettersUtil,
  shuffleArray,
} from "../../utils/array";
import letters from "../../utils/letters";
import Learning from "./Learning";
import Practice from "./Practice";
import WordBuilding from "./WordBuilding";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selected, setSelected] = useState({ rows: [], cols: [] } as {
    rows: number[];
    cols: number[];
  });
  const [kata, setKata] = useState<"ka" | "hi">("ka");

  const toggleSelection = useCallback(
    (type: "cols" | "rows", index: number) => {
      setSelected((prev) => ({
        ...prev,
        [type]: prev[type].includes(index)
          ? prev[type].filter((i) => i !== index)
          : [...prev[type], index],
      }));
    },
    []
  );

  const rows = useMemo(
    () =>
      letters.map((item) =>
        item[0].en !== "WA" && item[0].en !== "YA"
          ? item
          : item[0].en === "WA"
          ? [item[0], 0, 0, 0, item[1]]
          : [item[0], 0, item[1], 0, item[2]]
      ),
    []
  );

  const selectedLetters = useMemo(() => {
    return selectedLettersUtil(rows, selected).length > 0
      ? selectedLettersUtil(rows, selected)
      : allLettersUtil(rows);
  }, [rows, selected]);

  const navigateToLearn = useCallback(() => {
    navigation.navigate("SettingsLearn", {
      letters: shuffleArray(selectedLetters),
      kata: kata,
    });
  }, [navigation, selectedLetters, kata]);

  enum Screen {
    Learning,
    Practice,
    WordBuilding
  }

  const [screen, setScreen] = useState(Screen.Learning);

  const screens = [
    { title: "Learning", val: Screen.Learning },
    { title: "Practice", val: Screen.Practice },
    { title: "Word game", val: Screen.WordBuilding },
  ];

  const insets = useSafeAreaInsets();

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Text
        onPress={() => setKata(kata === "ka" ? "hi" : "ka")}
        style={styles.title}
      >
        Kana
      </Text>
      <View style={styles.header}>
        {screens.map((item) => (
          <View key={item.val}>
            <Text
              onPress={() => setScreen(item.val)}
              style={
                item.val === screen
                  ? { ...styles.header_title, ...styles.header_title__active }
                  : styles.header_title
              }
            >
              {item.title}
            </Text>
            {item.val === screen && <View style={styles.header__line} />}
          </View>
        ))}
      </View>
      <View style={styles.content}>
        {screen === Screen.Learning && <Learning />}
        {screen === Screen.Practice && <Practice />}
        {screen === Screen.WordBuilding && <WordBuilding />}
      </View>

      {/* <Text
          onPress={() => setKata(kata === "ka" ? "hi" : "ka")}
          style={styles.link}
        >
          {kata === "ka" ? "Hiragana" : "Katakana"}
        </Text> */}
      {/* <View style={styles.buttons_container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelected({ rows: [], cols: [] })}
          >
            <Text style={styles.buttonText}>Unselect</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToLearn} style={styles.button}>
            <Text style={styles.buttonText}>
              learn ({selectedLetters.length > 0 ? selectedLetters.length : "all"})
            </Text>
          </TouchableOpacity>
        </View> */}
      {/* <View style={styles.table}>
          <View style={styles.row_btns}>
            {[0, 1, 2, 3, 4, 5].map((cellIndex) => (
              <TouchableOpacity
                key={cellIndex}
                style={[
                  styles.selectButton,
                  cellIndex === 0 && styles.selectButtonSmall,
                ]}
                onPress={() => toggleSelection("cols", cellIndex - 1)}
              >
                <Text style={styles.selectButtonText}>
                  {selected.cols.includes(cellIndex - 1) ? "-" : "+"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => toggleSelection("rows", rowIndex)}
              >
                <Text style={styles.selectButtonText}>
                  {selected.rows.includes(rowIndex) ? "-" : "+"}
                </Text>
              </TouchableOpacity>
              {row.map((cell, cellIndex) => {
                const isSelected =
                  selected.rows.includes(rowIndex) ||
                  selected.cols.includes(cellIndex);
                return (
                  <TouchableOpacity
                    key={cellIndex}
                    style={[
                      styles.cell,
                      isSelected && styles.selected,
                      cell === 0 && styles.empty,
                    ]}
                    onPress={() => toggleSelection("cols", cellIndex)}
                  >
                    <Text
                      style={[styles.text, isSelected && styles.text_selected]}
                    >
                      {typeof cell !== "number" && cell?.[kata]}
                    </Text>
                    <Text
                      style={[
                        styles.subtext,
                        isSelected && styles.subtext_selected,
                      ]}
                    >
                      {typeof cell !== "number" && cell?.en}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View> */}
      {/* <ScrollView></ScrollView> */}
    </View>
  );
};

export default React.memo(HomeScreen);
