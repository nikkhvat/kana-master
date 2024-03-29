import React, { useState } from "react";

import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import Button from "@/shared/ui/button/button";

interface DrawProps {
  width: number
  height: number
  letter: ILetter,
  kana: KanaAlphabet,
}

const Draw: React.FC<DrawProps> = ({
  width,
  height,
  letter,
  kana,
}) => {
  const { colors } = useThemeContext();

  const [isShowBorder, setIsShowBorder] = useState(true);
  const [isShowKana, setIsShowKana] = useState(true);

  const currentPathObject = useSharedValue(Skia.Path.Make());
  const currentPathX = useSharedValue(0);
  const currentPathY = useSharedValue(0);
  const isStartDrawing = useSharedValue(false);

  const currentPath = useDerivedValue(() => {
    const newPath = currentPathObject.value.copy();
    if (isStartDrawing.value) {
      newPath.moveTo(currentPathX.value, currentPathY.value);
      newPath.lineTo(currentPathX.value, currentPathY.value);
    } else if (currentPathX.value !== 0 && currentPathY.value !== 0) {
      newPath.lineTo(currentPathX.value, currentPathY.value);
    }
    currentPathObject.value = newPath;
    return newPath;
  });

  const pan = Gesture.Pan()
    .averageTouches(true)
    .maxPointers(1)
    .onBegin(e => {
      currentPathX.value = e.x;
      currentPathY.value = e.y;
      isStartDrawing.value = true;
    })
    .onChange(e => {
      currentPathX.value = e.x;
      currentPathY.value = e.y;
      isStartDrawing.value = false;
    });

  const clearCanvas = () => {
    currentPathObject.value = Skia.Path.Make();
    isStartDrawing.value = false;
    currentPathX.value = 0;
    currentPathY.value = 0;
  };


  return (
    <>
      <GestureHandlerRootView>
        <View style={[styles.drawContainer, {
          borderColor: colors.color2,
          width,
          height,
        }]} >
          {isShowBorder && <>
            <View style={[styles.drawContainerLeftBlock, {
              borderRightColor: colors.color2,
            }]} ></View>
            <View style={[styles.drawContainerTopBlock, {
              borderBottomColor: colors.color2,
            }]} ></View>
          </>}
          {isShowKana && <View style={[styles.drawContainerImage, {
            width,
            height,
          }]} >
            <Symbol id={letter?.id} kana={kana} />
          </View>}
          <GestureDetector gesture={pan}>
            <Canvas
              style={{ width, height }} >
              <Path
                path={currentPath}
                style="stroke"
                strokeWidth={15}
                strokeCap="round"
                strokeJoin="round"
                color={colors.color4}
              />
            </Canvas>
          </GestureDetector>

        </View>
      </GestureHandlerRootView>

      <View style={styles.buttonsContainer} >
        <View style={styles.buttonsCell} >
          <Button
            customStyles={{
              width: 50,
              height: 50
            }}
            type={isShowBorder ? "active" : "inactive"}
            icon={<Icon name={"border-outside"} size={24} color={isShowBorder ? colors.color5 : colors.color4} />}
            onClick={() => setIsShowBorder(prev => !prev)}
          />
          <Button
            customStyles={{
              width: 50,
              height: 50
            }}
            type={isShowKana ? "active" : "inactive"}
            icon={<Icon name={"eye-outline"} size={24} color={isShowKana ? colors.color5 : colors.color4} />}
            onClick={() => setIsShowKana(prev => !prev)}
          />
        </View>
        <Button
          customStyles={{
            width: 50,
            height: 50
          }}
          type={"inactive"}
          icon={<Icon name={"replay"} size={24} color={colors.color4} />}
          onClick={clearCanvas}
        />
      </View>
    </>
  );
};

export default Draw;

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
    opacity: 0.3
  },
  drawContainerLeftBlock: {
    borderRightWidth: 1,
    borderStyle: "solid",
    position: "absolute",
    left: 0,
    top: 0,
    width: "50%",
    height: "100%"
  },
  drawContainerTopBlock: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "50%"
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonsCell: {
    flexDirection: "row",
    gap: 15
  },
});