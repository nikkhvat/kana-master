import React from "react";

import { StyleSheet } from "react-native";
import {
  Text,
  View,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { Colors } from "../../App";

type PreviewCard = {
  imageSource: ImageSourcePropType;
  title: string,
  subtitle: string,
  onEdit?: Function
};


const PreviewCard: React.FC<PreviewCard> = ({
  imageSource,
  title,
  subtitle,
  onEdit,
}) => {
  const colors = useTheme().colors as Colors;

  const styles = StyleSheet.create({
    container: {
      height: 240,
      borderColor: "transparent",
      borderRadius: 20,
      overflow: "hidden",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom: 15,
      position: "relative",
      marginTop: 20,
    },
    textView: {
      width: 315,
      backgroundColor: colors.color1,
      borderRadius: 12,
      height: 79,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 15,
    },
    textTitle: {
      color: colors.color4,
      fontSize: 28,
      fontWeight: "700",
    },
    textSubtitle: {
      color: colors.color3,
      fontSize: 13,
    },
    button: {
      width: 40,
      height: 40,
      backgroundColor: colors.color4,
      borderRadius: 40,
      position: "absolute",
      right: 15,
      top: -20,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <ImageBackground
      source={imageSource}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.textView}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textSubtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.button} onPress={() => onEdit?.()}>
          <Ionicons
            name={"square-edit-outline"}
            size={24}
            color={colors.color1}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PreviewCard;