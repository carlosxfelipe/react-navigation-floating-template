import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import type { Theme as AppTheme } from "../../themes";

export function ScreenScrollView({
  contentContainerStyle,
  ...props
}: ScrollViewProps) {
  const { colors } = useTheme() as AppTheme;
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      {...props}
      style={[{ backgroundColor: colors.background, flex: 1 }, props.style]}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: headerHeight + 16, paddingBottom: tabBarHeight + 32 },
        contentContainerStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    gap: 10,
  },
});
