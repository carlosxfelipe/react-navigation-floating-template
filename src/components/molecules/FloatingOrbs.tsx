import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const COLORS = [
  "#FF4E8B",
  "#FF9B3E",
  "#FFE040",
  "#4EFFB4",
  "#40C4FF",
  "#B24EFF",
];

function AnimatedOrb({
  color,
  size,
  delay,
  duration,
  xRange,
  yRange,
}: {
  color: string;
  size: number;
  delay: number;
  duration: number;
  xRange: [number, number];
  yRange: [number, number];
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [anim, delay, duration]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: xRange,
  });
  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: yRange,
  });
  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  });

  return (
    <Animated.View
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    />
  );
}

export function FloatingOrbs() {
  return (
    <View style={styles.orbContainer}>
      <AnimatedOrb
        color={COLORS[0]}
        size={70}
        delay={0}
        duration={2200}
        xRange={[-30, 30]}
        yRange={[-20, 20]}
      />
      <AnimatedOrb
        color={COLORS[1]}
        size={50}
        delay={300}
        duration={1800}
        xRange={[20, -25]}
        yRange={[15, -30]}
      />
      <AnimatedOrb
        color={COLORS[2]}
        size={60}
        delay={600}
        duration={2600}
        xRange={[-20, 25]}
        yRange={[25, -15]}
      />
      <AnimatedOrb
        color={COLORS[3]}
        size={45}
        delay={100}
        duration={2000}
        xRange={[30, -15]}
        yRange={[-25, 20]}
      />
      <AnimatedOrb
        color={COLORS[4]}
        size={55}
        delay={500}
        duration={2400}
        xRange={[-25, 20]}
        yRange={[10, -25]}
      />
      <AnimatedOrb
        color={COLORS[5]}
        size={40}
        delay={200}
        duration={1600}
        xRange={[15, -30]}
        yRange={[-15, 25]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orbContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingVertical: 16,
  },
  orb: {
    opacity: 0.85,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
