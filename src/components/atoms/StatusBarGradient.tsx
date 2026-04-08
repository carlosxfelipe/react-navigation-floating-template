import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../../themes";

const STEPS = 32;
const opacities = Array.from({ length: STEPS }, (_, i) => {
  const t = i / (STEPS - 1);
  return Math.pow(1 - t, 1.8);
});

export function StatusBarGradient() {
  const { colors } = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { height: insets.top + 48 }]}>
      {opacities.map((opacity, i) => (
        <View
          key={i}
          style={[
            styles.slice,
            { backgroundColor: colors.background, opacity },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  slice: {
    flex: 1,
  },
});
