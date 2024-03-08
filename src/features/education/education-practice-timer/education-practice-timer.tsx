import React, { useEffect, useRef, useState } from "react";

import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/hooks/theme-context";

interface EducationPracticeTimerProps {
  onTimerEnd?: () => void;
  initial: number;
  currentIndex: number;
}

const screenWidth = Dimensions.get("window").width;

const progressBarWidth = screenWidth - 40 - 95;


const EducationPracticeTimer: React.FC<EducationPracticeTimerProps> = ({
  initial = 5,
  onTimerEnd,
  currentIndex,
}) => {
  const { colors } = useThemeContext();

  const animatedValue = useRef(new Animated.Value(5)).current;
  const [timeLeft, setTimeLeft] = useState(initial);

  const progressBarWidthItem = (screenWidth - 40 - 95) / initial;

  const set = (val: number) => {
    Animated.timing(animatedValue, {
      toValue: val * progressBarWidthItem,
      duration: 500,
      useNativeDriver: false,
      delay: 0,
    }).start();

    setTimeLeft(val);
  };

  useEffect(() => {
    set(initial);
  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft === -1) {
      onTimerEnd?.();
      set(initial);
    }

    const intervalId = setInterval(() => {
      set(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, currentIndex]);

  const fullProgress = (timeLeft / initial) * 100;

  return (
    <View style={styles.container}>
      <View style={[
        styles.timerContainer, 
        { backgroundColor: colors.color2, width: progressBarWidth }
      ]}>
        <Animated.View
          style={
            {
              ...styles.timerStroke,
              width: animatedValue,
              backgroundColor:
                fullProgress <= 40 ? colors.second_color1 : colors.second_color2,
            }
          }
        />
      </View>
      <View style={styles.timerTextContainer}>
        <Icon name={"timer-outline"} size={24} color={colors.color4} />
        <Text style={[styles.timerTime, { color: colors.color4 }]}>
          00:0{timeLeft}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  timerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 10,
    borderRadius: 33,
  },
  timerStroke: {
    height: 10,
    borderRadius: 33,
  },
  timerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  timerTime: {
    fontSize: 17,
    fontWeight: "600",
  },
});

export default EducationPracticeTimer;
