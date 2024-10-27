import React, { useRef, useReducer } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  GestureHandlerGestureEvent,
} from "react-native-gesture-handler";
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
  const { colors } = useThemeContext();

  const currentPathRef = useRef<{ x: number; y: number }[]>([]);
  const pathsRef = useRef<{ x: number; y: number }[][]>([]);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const canvasSize = width - 40 - (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);

  const strokeWidth =
    useAppSelector((state) => state.profile?.draw?.lineWidth) || 14;

  const isShowLetter = useAppSelector((state) => state.profile?.draw?.isShowLetter);
  const isShowBorder = useAppSelector((state) => state.profile?.draw?.isShowBorder);

  const onGestureEvent = (event: GestureHandlerGestureEvent) => {
    const { x, y } = event.nativeEvent as any;

    if (currentPathRef.current.length === 0) {
      currentPathRef.current = [{ x, y }];
    } else {
      const newPoint = { x, y };
      currentPathRef.current = [...currentPathRef.current, newPoint];
    }

    requestAnimationFrame(() => {
      forceUpdate();
    });
  };

  const onHandlerStateChange = (event: GestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) {
      pathsRef.current = [...pathsRef.current, currentPathRef.current];
      currentPathRef.current = [];
      forceUpdate();
    }
  };

  const handleClearStepButtonClick = () => {
    if (currentPathRef.current.length > 0) {
      currentPathRef.current.pop();
    } else if (pathsRef.current.length > 0) {
      pathsRef.current.pop();
    }
    forceUpdate();
  };

  const handleClearButtonClick = () => {
    pathsRef.current = [];
    currentPathRef.current = [];
    forceUpdate();
  };

  const generatePathDAttribute = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";

    const moveToStart = (x: number, y: number) => `M ${x},${y}`;
    
    const quadraticCurveTo = (x1: number, y1: number, x2: number, y2: number) => ` Q ${x1},${y1} ${x2},${y2}`;

    const smoothCurveTo = (x: number, y: number) => ` T ${x},${y}`;
    const getMidPoint = (point1: { x: number; y: number }, point2: { x: number; y: number }) => ({
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2,
    });

    let d = moveToStart(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currPoint = points[i];
      const midPoint = i > 1 ? getMidPoint(prevPoint, currPoint) : prevPoint;

      d += quadraticCurveTo(prevPoint.x, prevPoint.y, midPoint.x, midPoint.y);
    }

    const lastPoint = points[points.length - 1];
    d += smoothCurveTo(lastPoint.x, lastPoint.y);

    return d;
  };

  return (
    <GestureHandlerRootView style={{ height: canvasSize + 165 }}>
      <View>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            style={{
              borderWidth: 1,
              borderRadius: 24,
              position: "relative",
              height: canvasSize,
              width: canvasSize,
              borderColor: colors.BgLightGray,
            }}
          >
            {isShowLetter && (
              <View
                style={[
                  styles.drawContainerImage,
                  { width: canvasSize - 2, height: canvasSize - 1 },
                ]}
              >
                <Symbol isGray id={letter?.id} kana={kana} />
              </View>
            )}
            <Svg height={canvasSize} width={canvasSize}>
              {isShowBorder && <CanvasBorder canvasSize={canvasSize} />}
              {pathsRef.current.map((path, index) => (
                <Path
                  key={`path-${index}`}
                  d={generatePathDAttribute(path)}
                  stroke={colors.BgContrast}
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
              <Path
                d={generatePathDAttribute(currentPathRef.current)}
                stroke={colors.BgContrast}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </PanGestureHandler>

        <View>
          <ClearButtons
            clearFull={handleClearButtonClick}
            clearStep={handleClearStepButtonClick}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.actionButtons}>
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
  drawContainerImage: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
});

export default Draw;