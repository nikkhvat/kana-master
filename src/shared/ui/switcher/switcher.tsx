import React, { useEffect, useRef } from "react";

import { View, Text, StyleSheet, Animated, Pressable, Dimensions } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";

interface SwitcherProps {
  activeTab: string;
  options: string[];
  translate?: string[] | React.ReactNode[];
  setActiveTab: (val: string) => void;
  width?: number;
}

const Switcher: React.FC<SwitcherProps> = ({ activeTab, setActiveTab, options, translate }) => {
  const { colors } = useThemeContext();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const screenWidth = ((Dimensions.get("window").width - 44) / options.length);

  const handlePress = (index: number) => {
    setActiveTab(options[index]);
  };

  useEffect(() => {
    const index = options.indexOf(activeTab);

    Animated.spring(animatedValue, {
      toValue: index,
      useNativeDriver: true,
    }).start();
  }, [activeTab, options]);

  return (
    <View style={[styles.content]}>
      <View style={[styles.tabs, { backgroundColor: colors.second_color4 }]}>
        {options.map((tab, index) => (
          <Pressable
            key={tab}
            onPress={() => handlePress(index)}
            style={[
              styles.tab,
              { backgroundColor: "transparent" },
            ]}
          >
            <Text style={[styles.tabText, { color: colors.color4 }]}>
              {(translate && translate.length === options.length) ? translate[index] : tab}
            </Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: `${100 / options.length}%`,
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, options.length - 1],
                    outputRange: [0, screenWidth * (options.length - 1)],
                  }),
                },
              ],
              backgroundColor: colors.color1,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Switcher;

const styles = StyleSheet.create({
  content: {
    width: "100%"
  },
  tabs: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    marginTop: 8,
    position: "relative",
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
    textTransform: "capitalize",
  },
  indicator: {
    position: "absolute",
    height: "100%",
    borderRadius: 12,
    zIndex: -1,
    marginTop: 2,
    marginLeft: 2
  },
});
