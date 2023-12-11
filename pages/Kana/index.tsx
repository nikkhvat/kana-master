import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";

import { StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import cx from "../../utils/cx";
import letters, { ILetter } from "../../utils/letters";

import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../components/Button";

import getImage from "../../utils/getSvgLatter";

import { Audio } from "expo-av";
import getScoundByLetter from "../../utils/sounds";
import { RootStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "../../App";
import { useTheme } from "@react-navigation/native";

const getImagePath = (key: string | undefined) => {
  const screenWidth = Dimensions.get("window").width;
  
  const iamgeStyle = {
    width: screenWidth - 24,
    height: screenWidth - 24,
  };

  return getImage(key, iamgeStyle);
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const Kana: React.FC<HomeScreenProps> = ({ navigation }) => {
  const colors = useTheme().colors as Colors;
  
  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const handlePress = async (letter: string) => {
    try {
      const sound = getScoundByLetter(letter);

      const { sound: playbackObject } = await Audio.Sound.createAsync(sound, {
        shouldPlay: true,
      });

      playbackObject.playAsync();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState("Hiragana");

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

  const [isModalVisible, setModalVisible] = useState(
    null as null | [ILetter, number, number]
  );

  const closeModal = () => {
    setModalVisible(null);
  
  };

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: colors.color4,
  },
  content: {
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: "column",
    backgroundColor: colors.color1,
  },
  tabContainer: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.second_color4,
    borderRadius: 12,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "400",
    color: colors.color4,
  },
  kanaNameContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colors.color2,
    borderBottomWidth: 1,
  },
  kanaName: {
    color: colors.color4,
    fontSize: 17,
    fontWeight: "700",
  },
  table: {
    paddingHorizontal: 20,
    paddingBottom: 180,
    paddingTop: 20,
    gap: 10,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.color2,
    width: 60,
    height: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    backgroundColor: "transparent",
    borderRadius: 0,
    borderWidth: 0,
    borderColor: "transparent",
  },
  text: {
    fontSize: 17,
    color: colors.color4,
    lineHeight: 22,
  },
  subtext: {
    fontSize: 13,
    color: colors.color4,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "blue",
  },
  modal: {
    flex: 1,
    paddingTop: 15,
    justifyContent: "flex-start",
    backgroundColor: colors.color1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalKanaNameContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  modalKanaTitle: {
    color: colors.color4,
    fontSize: 17,
    fontWeight: "700",
  },
  modalKanaLetter: {
    color: colors.color4,
    fontSize: 34,
    fontWeight: "700",
    marginTop: 15,
  },
  btnsColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 0,
  },
  kanaImage: {},
  btns: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 15,
  },
  btn: {
    flex: 1,
    marginTop: 0,
  },
  short_btn: {
    width: 50,
  },
});


  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Text style={styles.title}>Kana</Text>
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={cx(styles.tab, {
              backgroundColor:
                activeTab === "Hiragana" ? colors.color1 : "transparent",
            })}
            onPress={() => setActiveTab("Hiragana")}
          >
            <Text style={styles.tabText}>Hiragana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={cx(styles.tab, {
              backgroundColor:
                activeTab === "Katakana" ? colors.color1 : "transparent",
            })}
            onPress={() => {
              setActiveTab("Katakana");
            }}
          >
            <Text style={styles.tabText}>Katakana</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.kanaNameContainer}>
        <Text style={styles.kanaName}>Basic</Text>
      </View>
      <ScrollView>
        <View style={styles.table}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, cellIndex) => {
                return (
                  <TouchableOpacity
                    key={`${rowIndex}-${cellIndex}`}
                    style={cx(styles.cell, cell === 0 && styles.empty)}
                    onPress={() => {
                      if (typeof cell !== "number")
                        setModalVisible([cell, rowIndex, cellIndex]);
                    }}
                  >
                    <Text style={styles.text}>
                      {typeof cell !== "number" &&
                        cell?.[activeTab === "Hiragana" ? "hi" : "ka"]}
                    </Text>
                    <Text style={[styles.subtext]}>
                      {typeof cell !== "number" && cell?.en}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible === null ? false : true}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={closeModal}
        onDismiss={closeModal}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <Ionicons
              onPress={closeModal}
              name={"close"}
              size={29}
              color={colors.color4}
            />
          </View>
          <View style={styles.modalKanaNameContainer}>
            <Text style={styles.modalKanaTitle}>{activeTab}</Text>
            <Text style={styles.modalKanaLetter}>
              {isModalVisible?.[0]?.en}
            </Text>

            {getImagePath(`H-${isModalVisible?.[0]?.en}`)}
          </View>
          <View style={styles.btnsColumn}>
            <View style={styles.btns}>
              <Button
                customStyles={styles.btn}
                title={"Sound"}
                onClick={() => handlePress(isModalVisible?.[0]?.en as any)}
                type={"inactive"}
                image={"volume-high"}
              />
              <Button
                customStyles={styles.btn}
                title={"Draw"}
                onClick={() => {
                  // * go to screen Draw
                  navigation.navigate("DrawScreen", {
                    letter: isModalVisible?.[0] ?? ({} as ILetter),
                  });
                  closeModal();
                }}
                type={"inactive"}
                image={"gesture-tap-hold"}
              />
            </View>
            <View style={styles.btns}>
              <Button
                customStyles={styles.btn}
                title={`${
                  activeTab === "Hiragana" ? "Katakana" : "Hiragana"
                } →`}
                onClick={() => {
                  setActiveTab(
                    activeTab === "Hiragana" ? "Katakana" : "Hiragana"
                  );
                }}
                type={"inactive"}
              />
            </View>
          </View>
          <View style={styles.btns}>
            <Button
              customStyles={styles.short_btn}
              title={"Sound"}
              type={"inactive"}
              image={"chevron-left"}
              onClick={() => {
                const item = isModalVisible?.[1] ?? 0;
                const itemIn = isModalVisible?.[2] ?? 0;

                if (itemIn === 0 && item === 0) return;

                if (itemIn === 0) {
                  setModalVisible([
                    letters[item - 1][letters[item - 1].length - 1],
                    item - 1,
                    letters[item - 1].length - 1,
                  ]);
                } else {
                  setModalVisible([
                    letters[item][itemIn - 1],
                    item,
                    itemIn - 1,
                  ]);
                }
              }}
            />
            <Button
              customStyles={styles.short_btn}
              title={"Draw"}
              type={"inactive"}
              image={"chevron-right"}
              onClick={() => {
                const item = isModalVisible?.[1] ?? 0;
                const itemIn = isModalVisible?.[2] ?? 0;

                if (
                  itemIn === letters[item].length - 1 &&
                  item === letters.length
                )
                  return;

                if (itemIn === letters[item].length - 1) {
                  setModalVisible([letters[item + 1][0], item + 1, 0]);
                } else {
                  setModalVisible([
                    letters[item][itemIn + 1],
                    item,
                    itemIn + 1,
                  ]);
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Kana;