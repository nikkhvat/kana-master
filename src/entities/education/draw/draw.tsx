import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import { Svg, Path } from "react-native-svg";

import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { verticalScale } from "@/shared/helpers/metrics";
import { useAppSelector } from "@/shared/model/hooks";
import ToggleStrokeWidth from "./buttons/toggle-stroke-width";
import ToggleShowBorders from "./buttons/toggle-show-borders";
import ToggleShowLetter from "./buttons/toggle-show-letter";
import ClearButtons from "./buttons/clear-buttons";
import CanvasBorder from "./canvas-border";

const { width } = Dimensions.get("window");

interface DrawProps {
  letter: ILetter;
  kana: KanaAlphabet;
}

const screenWidth = Dimensions.get("window").width;

const Draw: React.FC<DrawProps> = ({ letter, kana }) => {
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>(
    [],
  );

  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);

  const { colors } = useThemeContext();

  const canvasSize =
    width -
    40 -
    (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);
  
  const strokeWidth = useAppSelector((state) => state.profile.draw?.lineWidth);
  const isShowLetter = useAppSelector((state) => state.profile.draw.isShowLetter);
  const isShowBorder = useAppSelector((state) => state.profile.draw.isShowBorder);

  const onTouchEnd = () => {
    setPaths((prevPaths) => [...prevPaths, currentPath]);
    setCurrentPath([]);
  };

  const onTouchMove = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    if (currentPath.length === 0) {
      setCurrentPath([{ x: locationX, y: locationY }]);
    } else {
      const newPoint = { x: locationX, y: locationY };
      setCurrentPath([...currentPath, newPoint]);
    }

    if (typeof event.stopPropagation === "function") {
      event.stopPropagation();
    }
    if (typeof event.preventDefault === "function") {
      event.preventDefault();
    }
  };

  const handleClearStepButtonClick = () => {
    setCurrentPath(prev => {
      const newPath = [...prev];
      newPath.pop();
      return newPath;
    });
    setPaths(prev => {
      const newPath = [...prev];
      newPath.pop();
      return newPath;
    });
  }

  const handleClearButtonClick = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  const generatePathDAttribute = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const midPoint =
        i > 1
          ? {
              x: (points[i - 1].x + points[i].x) / 2,
              y: (points[i - 1].y + points[i].y) / 2,
            }
          : points[i - 1];
      d += ` Q ${points[i - 1].x},${points[i - 1].y} ${midPoint.x},${midPoint.y}`;
    }
    d += ` T ${points[points.length - 1].x},${points[points.length - 1].y}`;
    return d;
  };

  return (
    <View>
      <View>
        <View
          style={[
            styles.drawContainer,
            {
              height: canvasSize,
              width: canvasSize,
              borderColor: colors.color2,
            },
          ]}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
        >
          <Svg height={canvasSize} width={canvasSize}>
            {isShowBorder && <CanvasBorder canvasSize={canvasSize} />}
            {isShowLetter && (
              <View
                style={[
                  styles.drawContainerImage,
                  { width: canvasSize - 2, height: canvasSize - 1 },
                ]}
              >
                <Symbol id={letter?.id} kana={kana} />
              </View>
            )}
            {paths.map((path, index) => (
              <Path
                key={`path-${index}`}
                d={generatePathDAttribute(path)}
                stroke={colors.color4}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            ))}
            <Path
              d={generatePathDAttribute(currentPath)}
              stroke={colors.color4}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </View>
      <ClearButtons clearFull={handleClearButtonClick} clearStep={handleClearStepButtonClick} />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsCell}>
          <ToggleShowBorders />
          <ToggleShowLetter />
        </View>
        <ToggleStrokeWidth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawContainer: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 30,
    position: "relative",
  },
  drawContainerImage: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 15
  },
  buttonsCell: {
    flexDirection: "row",
    gap: 15,
  },
});

export default Draw;
