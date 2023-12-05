import React from "react";
import { styles } from "./styles";
import {
  Text,
  View,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

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
          <Ionicons name={"square-edit-outline"} size={24} color={"#FFFFFF"} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PreviewCard;