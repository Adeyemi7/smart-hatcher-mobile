import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function SmartHatchLogo() {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotate, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          transform: [{ scale }, { rotate: rotation }],
        },
      ]}
    >
      <AnimatedSvg width={96} height={96} viewBox="0 0 24 24" fill="#4CAF50">
        <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <Path d="M12 10.5c-1.68 0-3.05 1.14-3.42 2.65-.17.7.13 1.41.76 1.76.63.35 1.39.06 1.76-.57.2-.34.52-.54.89-.54.55 0 1 .45 1 1s-.45 1-1 1c-1.4 0-2.6-1.01-2.92-2.35C9.07 10.3 10.42 9 12 9c1.66 0 3 1.34 3 3s-1.34 3-3 3c-.55 0-1-.45-1-1s.45-1 1-1c.38 0 .7-.2.89-.54.37-.63.13-1.41-.5-1.76-.63-.35-1.39-.06-1.76.57C11.23 12.36 10.88 13 10 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2z" />
      </AnimatedSvg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
});
