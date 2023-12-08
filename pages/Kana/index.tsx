import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { styles } from "./styles";
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

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Text style={styles.title}>Kana</Text>
      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={cx(styles.tab, {
              backgroundColor:
                activeTab === "Hiragana" ? "#FFF" : "transparent",
            })}
            onPress={() => setActiveTab("Hiragana")}
          >
            <Text style={styles.tabText}>Hiragana</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={cx(styles.tab, {
              backgroundColor:
                activeTab === "Katakana" ? "#FFF" : "transparent",
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
              color={"#2A2A2A"}
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
                  closeModal()
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
                // Prev
                console.log(letters[item][itemIn]);

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