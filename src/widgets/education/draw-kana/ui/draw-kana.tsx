import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeContext } from "@/hooks/theme-context";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";



type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "DrawKana">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "DrawKana">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

const screenWidth = Dimensions.get("window").width;

const width = screenWidth - 40;
const height = screenWidth - 40;

const DrawKana: React.FC<LearnScreenProps> = ({ route, navigation }) => {
  
  const insets = useSafeAreaInsets();
  const { colors } = useThemeContext();

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
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          backgroundColor: colors.color1
        }
      ]} >
      <View style={styles.header}>
        <LinearProgressBar
          close={navigation.goBack}
          current={0}
          all={10}
          title="Kana"
        />
      </View>

      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={[styles.drawContainer, {
          borderColor: colors.color2,
          width, 
          height,
        }]} >
          <View style={[styles.drawContainerLeftBlock, {
            borderRightColor: colors.color2,
          }]} ></View>
          <View style={[styles.drawContainerTopBlock, {
            borderBottomColor: colors.color2,
          }]} ></View>

          <GestureDetector gesture={pan}>
            <Canvas
                style={{ width, height }} >
              <Path
                path={currentPath}
                style="stroke"
                strokeWidth={15}
                strokeCap="round"
                strokeJoin="round"
                color={colors.color5}
              />
            </Canvas>
          </GestureDetector>

        </View>
      </GestureHandlerRootView>

      <View>
        <Button title="Clean" type={"active"} onClick={clearCanvas} />
      </View>
    </View>
  );
};

export default DrawKana;


const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22
  },
  drawContainer: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 30,
    position: "relative",
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
});