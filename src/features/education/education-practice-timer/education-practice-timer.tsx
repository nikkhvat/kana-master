import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/hooks/theme-context";

interface EducationPracticeTimerProps {
  onTimerEnd?: () => void
  initial: number
  currentIndex: number
}

const EducationPracticeTimer: React.FC<EducationPracticeTimerProps> = ({
  initial = 5,
  onTimerEnd
}) => {
  const { colors } = useThemeContext();

  const [timeLeft, setTimeLeft] = useState(initial);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(0);
      onTimerEnd?.();
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTimerEnd, timeLeft]);

  const fullProgress = (timeLeft / initial) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer, {backgroundColor: colors.color2}]}>
        <View style={[styles.timerStroke, { width: `${fullProgress}%`, backgroundColor: colors.second_color2 }]} />
      </View>
      <View style={styles.timerTextContainer}>
        <Icon name={"timer-outline"} size={24} color={colors.color4} />
        <Text style={[styles.timerTime, { color: colors.color4 }]}>00:0{timeLeft}</Text>
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
    gap: 15
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
