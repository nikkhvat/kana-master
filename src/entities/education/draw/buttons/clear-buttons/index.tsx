import React from "react";

import { StyleSheet, View } from "react-native"

import Button from "@/shared/ui/button/button";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface ClearButtonsProps {
  clearFull: () => void
  clearStep: () => void
}

const ClearButtons: React.FC<ClearButtonsProps> = ({
  clearFull,
  clearStep,
}) => {

  const { colors } = useThemeContext();

  return (
    <View style={styles.buttonsContainer}>
      <Button
        customStyles={{ flex: 0.5, height: 50 }}
        type={"inactive"}
        icon={<Icon name={"keyboard-backspace"} size={24} color={colors.color4} />}
        onClick={clearStep}
      />
      <Button
        customStyles={{ flex: 0.5, height: 50 }}
        type={"inactive"}
        icon={<Icon name={"replay"} size={24} color={colors.color4} />}
        onClick={clearFull}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 15,
    height: 70
  },
});


export default ClearButtons