import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { verticalScale } from "@/shared/helpers/metrics";
import Button from "@/shared/ui/button/button";

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

  const [isShowBorder, setIsShowBorder] = useState<boolean>(true);
  const [isShowKana, setIsShowKana] = useState<boolean>(true);

  const { colors } = useThemeContext();

  const canvasSize =
    width -
    40 -
    (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);
  const strokeWidth = 14;

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
          {isShowBorder && (
            <>
              <View
                style={[
                  styles.drawContainerLeftBlock,
                  { borderRightColor: colors.color2 },
                ]}
              />
              <View
                style={[
                  styles.drawContainerTopBlock,
                  { borderBottomColor: colors.color2 },
                ]}
              />
            </>
          )}
          {isShowKana && (
            <View
              style={[
                styles.drawContainerImage,
                { width: canvasSize - 2, height: canvasSize - 1 },
              ]}
            >
              <Symbol id={letter?.id} kana={kana} />
            </View>
          )}
          <Svg height={canvasSize} width={canvasSize}>
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
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsCell}>
          <Button
            customStyles={{ width: 50, height: 50 }}
            type={isShowBorder ? "active" : "inactive"}
            icon={
              <Icon
                name={"border-outside"}
                size={24}
                color={isShowBorder ? colors.color5 : colors.color4}
              />
            }
            onClick={() => setIsShowBorder((prev) => !prev)}
          />
          <Button
            customStyles={{ width: 50, height: 50 }}
            type={isShowKana ? "active" : "inactive"}
            icon={
              <Icon
                name={"eye-outline"}
                size={24}
                color={isShowKana ? colors.color5 : colors.color4}
              />
            }
            onClick={() => setIsShowKana((prev) => !prev)}
          />
        </View>
        <Button
          customStyles={{ width: 50, height: 50 }}
          type={"inactive"}
          icon={<Icon name={"replay"} size={24} color={colors.color4} />}
          onClick={handleClearButtonClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawContainer: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 39,
    position: "relative",
  },
  drawContainerImage: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3,
  },
  drawContainerLeftBlock: {
    borderRightWidth: 1,
    borderStyle: "solid",
    position: "absolute",
    left: 0,
    top: 0,
    width: "50%",
    height: "100%",
  },
  drawContainerTopBlock: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "50%",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonsCell: {
    flexDirection: "row",
    gap: 15,
  },
});

export default Draw;
