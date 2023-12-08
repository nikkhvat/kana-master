import React, { useState, useRef } from "react";
import { View, PanResponder, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const DrawScreen = () => {
  const [paths, setPaths] = useState([] as any);
  const currentPath = useRef("" as any);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      const { x0, y0 } = gestureState;
      currentPath.current = `M ${x0},${y0}`;
    },
    onPanResponderMove: (e, gestureState) => {
      const { moveX, moveY } = gestureState;
      currentPath.current += ` L ${moveX},${moveY}`;
      setPaths([...paths, currentPath.current]);
    },
    onPanResponderEnd: () => {
      setPaths((prevPaths: any) => [...prevPaths, currentPath.current]);
      currentPath.current = "";
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg style={styles.canvas}>
        {paths.map((path: any, index: any) => (
          <Path
            key={index}
            d={path}
            stroke="black"
            strokeWidth={3}
            fill="none"
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: 300,
    height: 300,
    backgroundColor: "white",
  },
});

export default DrawScreen;
