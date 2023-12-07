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

const getImagePath = (key: string | undefined) => {
  const screenWidth = Dimensions.get("window").width;
  
  const iamgeStyle = {
    width: screenWidth - 24,
    height: screenWidth - 24,
  };

  return getImage(key, iamgeStyle);
};

export const Kana = () => {
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

  const [isModalVisible, setModalVisible] = useState(null as null | ILetter);

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
            onPress={() => setActiveTab("Katakana")}
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
                      if (typeof cell !== "number") setModalVisible(cell);
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
            <Text style={styles.modalKanaLetter}>{isModalVisible?.en}</Text>

            {getImagePath(`H-${isModalVisible?.en}`)}
          </View>
          <View style={styles.btnsColumn}>
            <View style={styles.btns}>
              <Button customStyles={styles.btn} title={"Sound"} type={"inactive"} image={"volume-high"} />
              <Button customStyles={styles.btn} title={"Draw"} type={"inactive"} image={"gesture-tap-hold"} />
            </View>
            <View style={styles.btns}>
              <Button customStyles={styles.btn} title={"Katakana →"} type={"inactive"} />
            </View>
          </View>
          <View style={styles.btns}>
            <Button customStyles={styles.short_btn} title={"Sound"} type={"inactive"} image={"chevron-left"} />
            <Button customStyles={styles.short_btn} title={"Draw"} type={"inactive"} image={"chevron-right"} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Kana;