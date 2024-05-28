import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import { GestureHandlerRootView, PanGestureHandler, GestureHandlerGestureEvent } from "react-native-gesture-handler";
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
const screenHeight = Dimensions.get("window").height;

const Draw: React.FC<DrawProps> = ({ letter, kana }) => {
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
  const { colors } = useThemeContext();

  const canvasSize =
    width -
    40 -
    (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);

  const strokeWidth = useAppSelector((state) => state.profile?.draw?.lineWidth) || 14;
  const isShowLetter = useAppSelector((state) => state.profile?.draw?.isShowLetter);
  const isShowBorder = useAppSelector((state) => state.profile?.draw?.isShowBorder);

  const onGestureEvent = (event: GestureHandlerGestureEvent) => {
    const { x, y } = event.nativeEvent;
    if (currentPath.length === 0) {
      setCurrentPath([{ x, y }] as any);
    } else {
      const newPoint = { x, y };
      setCurrentPath([...currentPath, newPoint] as any);
    }
  };

  const onHandlerStateChange = (event: GestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) { // State.END
      setPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath([]);
    }
  };

  const handleClearStepButtonClick = () => {
    setCurrentPath((prev) => {
      const newPath = [...prev];
      newPath.pop();
      return newPath;
    });
    setPaths((prev) => {
      const newPath = [...prev];
      newPath.pop();
      return newPath;
    });
  };

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
    <GestureHandlerRootView>
      <View style={{ height: screenHeight - 200 }} >
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            style={[
              styles.drawContainer,
              {
                height: canvasSize,
                width: canvasSize,
                borderColor: colors.color2,
              },
            ]}
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
        </PanGestureHandler>
        <View style={styles.buttons} >
          <ClearButtons clearFull={handleClearButtonClick} clearStep={handleClearStepButtonClick} />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonsCell}>
              <ToggleShowBorders />
              <ToggleShowLetter />
            </View>
            <ToggleStrokeWidth />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
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
  buttons: {
    flex: 1,
    height: 300,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 15,
  },
  buttonsCell: {
    flexDirection: "row",
    gap: 15,
  },
});

export default Draw;
