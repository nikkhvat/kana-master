
import React, { useState, useRef } from "react";

import {
  StyleSheet,
} from "react-native";
import {
  View,
  PanResponder,
  LayoutChangeEvent,
  Text,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export const DrawScreen: React.FC = () => {
  const [paths, setPaths] = useState<string[]>([]);
  const currentPath = useRef("");
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const manualOffsetX = 0;
  const manualOffsetY = 300;

  const onLayout = (event: LayoutChangeEvent) => {
    const { x, y } = event.nativeEvent.layout;
    setOffset({ x: x + manualOffsetX, y: y + manualOffsetY });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      const { x0, y0 } = gestureState;
      currentPath.current = `M ${x0 - offset.x},${y0 - offset.y}`;
    },
    onPanResponderMove: (e, gestureState) => {
      const { moveX, moveY } = gestureState;
      currentPath.current += ` L ${moveX - offset.x},${moveY - offset.y}`;
      setPaths([...paths, currentPath.current]);
    },
    onPanResponderRelease: () => {
      setPaths((prevPaths) => [...prevPaths, currentPath.current]);
      currentPath.current = "";
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.title}>A</Text>
      <View style={styles.canvasContainer}>
        <Svg style={styles.canvas} onLayout={onLayout}>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke="black"
              strokeWidth={16}
              fill="none"
            />
          ))}
        </Svg>
      </View>
      <View style={styles.btns}>
        {/* <Button title={"1"} type={"active"}></Button> */}
      </View>
    </View>
  );
};


export const styles = StyleSheet.create({
  btns: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    color: "#2A2A2A",
    fontSize: 34,
    marginBottom: 30,
    textAlign: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  canvasContainer: {
    width: 345,
    height: 345,
    borderColor: "#ECECEC",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "red",
  },
  canvas: {
    width: 345,
    height: 345,
    backgroundColor: "white",
    borderColor: "#ECECEC",
    borderWidth: 1,
    borderRadius: 12,
  },
});

export default DrawScreen;
