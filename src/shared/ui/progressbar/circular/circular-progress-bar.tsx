import React from "react";

import { View, Text } from "react-native";
import { Svg, Circle } from "react-native-svg";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface CircularProgressBarProps {
  progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ progress }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const { colors } = useThemeContext();

  return (
    <View>
      <Svg style={{ backgroundColor: colors.BgPrimary }}>
        <Circle
          cx={50}
          cy={50}
          r={radius}
          stroke={colors.BgLightGray}
          fill={colors.BgPrimary}
          strokeWidth={8}
          origin="50, 50"
        />
        <Circle
          cx={50}
          cy={50}
          r={radius}
          stroke={progress < 51 ? colors.BgDanger : colors.BgSuccess}
          strokeWidth={6}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin="50, 50"
        />
        <View style={{ position: "absolute", top: 38, width: 100 }}>
          <Text style={{ width: "100%", textAlign: "center", fontSize: 17, color: colors.TextPrimary, fontWeight: "700" }}>
            {`${Math.round(progress)}%`}
          </Text>
        </View>
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
