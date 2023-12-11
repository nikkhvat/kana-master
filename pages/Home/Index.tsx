import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

import Learning from "./Learning";
import Practice from "./Practice";
import WordBuilding from "./WordBuilding";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import cx from "../../utils/cx";

import { useTheme } from "@react-navigation/native";
import { styles } from "../Draw";
import { Colors } from "../../App";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const colors = useTheme().colors as Colors;

  enum Screen {
    Learning,
    Practice,
    WordBuilding
  }

  const [screen, setScreen] = useState(Screen.Learning);

  const screens = [
    { title: "Practice", val: Screen.Learning },
    { title: "Testing", val: Screen.Practice },
    { title: "Word game", val: Screen.WordBuilding },
  ];

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: "700",
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
      color: colors.color4,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      height: 54,
    },
    header_title: {
      color: colors.color3,
      fontSize: 15,
      fontWeight: "700",
    },
    header_title__active: {
      color: colors.color4,
    },
    header__line: {
      backgroundColor: colors.color4,
      height: 2,
      width: 32,
      position: "absolute",
      top: -6,
      left: 0,
    },
    content: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    }
  });

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Text style={styles.title}>Learning</Text>
      <View style={styles.header}>
        {screens.map((item) => (
          <TouchableOpacity
            key={item.val}
            onPress={() => setScreen(item.val)}
          >
            <Text
              style={
                item.val === screen
                  ? cx(styles.header_title, styles.header_title__active)
                  : styles.header_title
              }
            >
              {item.title}
            </Text>
            {item.val === screen && <View style={styles.header__line} />}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        {screen === Screen.Learning && <Learning />}
        {screen === Screen.Practice && <Practice />}
        {screen === Screen.WordBuilding && <WordBuilding />}
      </View>
    </View>
  );
};

export default React.memo(HomeScreen);
