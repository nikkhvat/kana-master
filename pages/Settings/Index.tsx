import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";

import { StyleSheet } from "react-native";
import { Colors } from "../../App";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const Settings: React.FC = () => {
  const colors = useTheme().colors as Colors;

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.color1,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      color: colors.color4,
    },
  });


  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <Text style={styles.title}>Profile</Text>
    </View>
  );
};

export default Settings;
