import React, { useState } from "react";

import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { useTranslation } from "react-i18next";
import { Dimensions, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter, dakuonFlatLettersId, handakuonFlatLettersId, yoonFlatLettersId } from "@/shared/data/lettersTable";
import Button from "@/shared/ui/button/button";
interface DrawKanaProps {
  letter: ILetter,
  kana: KanaAlphabet,
  back: () => void
}

const screenWidth = Dimensions.get("window").width;

const width = screenWidth - 40;
const height = screenWidth - 40;

const DrawKana: React.FC<DrawKanaProps> = ({ letter, kana, back }) => {
  const { colors } = useThemeContext();
  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return "yoon";
    if (handakuonFlatLettersId.includes(id)) return "handakuon";
    if (dakuonFlatLettersId.includes(id)) return "dakuon";

    return "basic";
  };

  return (
    <View
      style={[
        styles.container,
        { 
          backgroundColor: colors.color1,
        }
      ]} >
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={back}>
          <Icon
            name={"keyboard-backspace"}
            size={24}
            color={colors.color4} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: colors.color4 }]}>{kana} ({getTypeById(letter?.id)})</Text>
        <Text style={[styles.subTitle, { color: colors.color4 }]}>{letter?.[lang].toUpperCase()}</Text>
      </View>


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
            <Symbol
              id={letter?.id}
              kana={kana === KanaAlphabet.Hiragana ? "hiragana" : "katakana"} />
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
    </View>
  );
};

export default DrawKana;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22,
  },
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
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  subTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 15,
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
  goBackButton: {}
});