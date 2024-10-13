import React, { useEffect, useRef } from "react";

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Dimensions,
} from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { verticalScale } from "@/shared/helpers/metrics";

import * as Haptics from "expo-haptics";
import { Typography } from "@/shared/typography";
import { useAppSelector } from "@/shared/model/hooks";
interface SwitcherProps<T extends string> {
  activeTab: T;
  options: T[];
  translate?: (React.ReactNode | string)[];
  setActiveTab: (val: T) => void;
  width?: number;
}

const screenWidth = Dimensions.get("window").width;

function Switcher<T extends string>(props: SwitcherProps<T>) {
  const { activeTab, setActiveTab, options, translate } = props;

  const { colors } = useThemeContext();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  const adaptivePadding =
    screenWidth > TABLET_WIDTH ? 40 + verticalScale(TABLET_PADDING * 2) : 40;

  const itemWidth =
    (Dimensions.get("window").width - adaptivePadding - 4) / options.length;

  const handlePress = (index: number) => {
    setActiveTab(options[index]);

    if (isEnabledHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  useEffect(() => {
    const index = options.indexOf(activeTab);

    Animated.spring(animatedValue, {
      toValue: index,
      useNativeDriver: true,
    }).start();
  }, [activeTab, animatedValue, options]);

  return (
    <View style={[styles.content]}>
      <View
        style={[styles.tabs, { backgroundColor: colors.BgAccentSecondary }]}
      >
        {options.map((tab, index) => (
          <Pressable
            key={tab as string}
            onPress={() => handlePress(index)}
            style={[styles.tab, { backgroundColor: "transparent" }]}
          >
            <Text style={[Typography.boldH4, { color: colors.TextPrimary }]}>
              {translate && translate.length === options.length
                ? translate[index]
                : tab}
            </Text>
          </Pressable>
        ))}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: itemWidth,
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, options.length],
                    outputRange: [0, itemWidth * options.length],
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
}

export default Switcher;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: 50,
  },
  tabs: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    position: "relative",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 10,
  },
  indicator: {
    position: "absolute",
    height: "100%",
    borderRadius: 12,
    zIndex: -1,
    marginTop: 2,
    marginLeft: 2,
  },
});
