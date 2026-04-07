import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../../themes";

const OPACITIES = [1, 0.97, 0.92, 0.85, 0.75, 0.62, 0.48, 0.33, 0.18, 0.07, 0];

export function StatusBarGradient() {
  const { colors } = useTheme() as AppTheme;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { height: insets.top + 48 }]}>
      {OPACITIES.map((opacity, i) => (
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
