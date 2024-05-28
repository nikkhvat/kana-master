import React from "react";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Line } from "react-native-svg";

interface CanvasBorderProps {
  canvasSize: number
}

const CanvasBorder: React.FC<CanvasBorderProps> = ({ canvasSize }) => {

  const { colors } = useThemeContext();

  return (
    <>
      <Line
        stroke={colors.color2}
        strokeWidth={1}
        strokeDasharray="16, 16"
        x1={canvasSize / 2}
        x2={canvasSize / 2}
        y1="0"
        y2={canvasSize}
      />
      <Line
        stroke={colors.color2}
        strokeWidth={1}
        strokeDasharray="16, 16"
        y1={canvasSize / 2}
        y2={canvasSize / 2}
        x1="0"
        x2={canvasSize}
      />
    </>    
  )
}

export default CanvasBorder;