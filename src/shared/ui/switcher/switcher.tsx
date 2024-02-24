import React from "react";

import { View, Text, StyleSheet, DimensionValue, Pressable } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";

interface SwitcherProps {
  activeTab: string;
  options: string[];
  setActiveTab: (val: string) => void;
  width?: DimensionValue
}

const Switcher: React.FC<SwitcherProps> = ({ width = "100%", activeTab, setActiveTab, options }) => {
  const { colors } = useThemeContext();

  return (
    <View style={[styles.content, { width: width }]}>
      <View style={[styles.tabs, { backgroundColor: colors.second_color4 }]}>
        {options.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              { backgroundColor: activeTab === tab ? colors.color1 : "transparent" }
            ]}
          >
            <Text style={[styles.tabText, { color: colors.color4 }]}>{tab}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Switcher;

const styles = StyleSheet.create({
  content: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabs: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
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
  },
});
