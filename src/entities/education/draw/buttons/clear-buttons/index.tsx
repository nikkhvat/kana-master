import React from "react";

import { StyleSheet, View } from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";

interface ClearButtonsProps {
  clearFull: () => void;
  clearStep: () => void;
}

const ClearButtons: React.FC<ClearButtonsProps> = ({
  clearFull,
  clearStep,
}) => {
  const { colors } = useThemeContext();

  return (
    <View style={styles.buttonsContainer}>
      <View style={{ flex: 1 }}>
        <SecondaryButton
          isHapticFeedback
          icon={
            <Icon
              name={"keyboard-backspace"}
              size={24}
              color={colors.IconPrimary}
            />
          }
          onClick={clearStep}
          isOutline
        />
      </View>
      <View style={{ flex: 1 }}>
        <SecondaryButton
          isHapticFeedback
          icon={<Icon name={"replay"} size={24} color={colors.IconPrimary} />}
          onClick={clearFull}
          isOutline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 16,
    gap: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default ClearButtons;
