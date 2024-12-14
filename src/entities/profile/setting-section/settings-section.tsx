import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface SettingSectionProps {
  children: ReactNode;
}

const SettingsSection: React.FC<SettingSectionProps> = ({ children }) => {
  const { colors } = useThemeContext();

  return (
    <View
      style={{
        marginHorizontal: 20,
        borderRadius: 10,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: colors.BorderDefault,
      }}
    >
      {children}
    </View>
  );
};

export default SettingsSection;
