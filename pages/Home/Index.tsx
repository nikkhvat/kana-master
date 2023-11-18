import React, { useState } from "react";

import letters from "../../utils/letters";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { allLetters, selectedLetters, shuffleArray } from "../../utils/array";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

import { styles } from "./styles";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

function HomeScreen({ navigation }: HomeScreenProps) {
  const [selected, setSelected] = useState({ rows: [], cols: [] } as {
    rows: number[];
    cols: number[];
  });
  const [kata, setKata] = useState("ka" as "ka" | "hi");

  const toggleSelection = (type: "cols" | "rows", index: number) => {
    setSelected((prev) => ({
      ...prev,
      [type]: prev[type].includes(index)
        ? prev[type].filter((i) => i !== index)
        : [...prev[type], index],
    }));
  };

  const rows = letters.map((item) =>
    item[0].en !== "WA" && item[0].en !== "YA"
      ? item
      : item[0].en === "WA"
      ? [item[0], 0, 0, 0, item[1]]
      : [item[0], 0, item[1], 0, item[2]]
  );

   
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {kata === "ka" ? "Katakana" : "Hiragana"}
      </Text>
      <View style={styles.buttons_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setKata(kata === "ka" ? "hi" : "ka")}
        >
          <Text style={styles.buttonText}>
            {kata === "ka" ? "Hiragana" : "Katakana"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelected({ rows: [], cols: [] })}
        >
          <Text style={styles.buttonText}>Unselect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Learn", {
              letters: shuffleArray(
                selectedLetters(rows, selected).length > 0
                  ? selectedLetters(rows, selected)
                  : allLetters(rows)
              ),
              kata: kata,
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Start learn (
            {selectedLetters(rows, selected).length > 0
              ? selectedLetters(rows, selected).length
              : "all"}
            )
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.table}>
          <View style={styles.row_btns}>
            {[0, 1, 2, 3, 4, 5].map((cellIndex) => {
              return (
                <TouchableOpacity
                  key={cellIndex}
                  style={[
                    styles.selectButton,
                    styles.selectButtonLong,
                    cellIndex == 0 && styles.selectButtonSmall,
                  ]}
                  onPress={() => toggleSelection("cols", cellIndex - 1)}
                >
                  <Text style={styles.selectButtonText}>
                    {selected.cols.includes(cellIndex - 1) ? "-" : "+"}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;