import React, { useState } from "react";

import letters, { ILetter } from "../../utils/letters";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { shuffleArray } from "../../utils/array";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

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

  const getColumn = (columnId: number): ILetter[] => {
    const array: ILetter[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const item = row[columnId];

      if (typeof item != "number") {
        array.push(item);
      }
    }

    return array;
  };

  const getRow = (rowId: number): ILetter[] => {
    const array: ILetter[] = [];

    for (let i = 0; i < rows[rowId].length; i++) {
      const item = rows[rowId][i];

      if (typeof item !== "number") {
        array.push(item);
      }
    }

    return array;
  };

  const selectedLetters = (): ILetter[] => {
    const array: ILetter[] = [];

    for (let i = 0; i < selected.cols.length; i++) {
      const element = selected.cols[i];
      array.push(...getColumn(element));
    }

    for (let i = 0; i < selected.rows.length; i++) {
      const element = selected.rows[i];
      array.push(...getRow(element));
    }

    const uniqueItems = new Map();
    array.forEach((item) => {
      if (!uniqueItems.has(item.id)) {
        uniqueItems.set(item.id, item);
      }
    });

    return Array.from(uniqueItems.values());
  };

  const allLetters = (): ILetter[] => {
    const array: ILetter[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      for (let j = 0; j < row.length; j++) {
        const item = row[j];

        if (typeof item != "number") {
          array.push(item);
        }
      }
    }

    return array;
  };

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
                selectedLetters().length > 0 ? selectedLetters() : allLetters()
              ),
              kata: kata,
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Start learn (
            {selectedLetters().length > 0 ? selectedLetters().length : "all"})
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 140,
  },
  buttons_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    paddingBottom: 50,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    height: 40,
    borderRadius: 6,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  table: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row_btns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cell: {
    padding: 8,
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 50,
    height: 50,
  },
  selectButtonLong: {
    padding: 8,
    margin: 5,
    width: 50,
    height: 50,
  },
  selected: {
    backgroundColor: "#e0dcdc",
    borderColor: "#e0dcdc",
    borderRadius: 6,
    borderWidth: 2,
  },
  text_selected: {
    color: "black",
  },
  subtext_selected: {
    color: "black",
  },
  empty: {
    backgroundColor: "#f2f2f2",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "#f2f2f2",
  },
  text: {
    fontSize: 18,
  },
  subtext: {
    fontSize: 12,
  },
  selectButton: {
    backgroundColor: "#007bff",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
    margin: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#007bff",
  },
  selectButtonText: {
    color: "white",
    textAlign: "center",
  },
  selectButtonSmall: {
    backgroundColor: "#f2f2f2",
    borderColor: "#f2f2f2",
    width: 50,
  },
});

export default HomeScreen;
