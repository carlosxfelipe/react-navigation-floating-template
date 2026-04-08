import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../../themes";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Icon } from "../atoms/Icon";
import { tabItems } from "../../navigation/tabItems";

const GRADIENT_DARK = [
  "rgba(28, 28, 30, 0.96)",
  "rgba(32, 32, 34, 0.94)",
  "rgba(28, 28, 30, 0.96)",
] as const;

const GRADIENT_LIGHT = [
  "rgba(255, 255, 255, 0.95)",
  "rgba(255, 255, 255, 0.85)",
  "rgba(255, 255, 255, 0.95)",
] as const;

const COLOR_ICON_DARK = "rgba(255, 255, 255, 0.8)";
const COLOR_ICON_LIGHT = "rgba(0, 0, 0, 0.8)";
const COLOR_BORDER_DARK = "rgba(255, 255, 255, 0.08)";
const COLOR_BORDER_LIGHT = "rgba(0, 0, 0, 0.08)";
const COLOR_ACTIVE_BG_DARK = "rgba(255, 255, 255, 0.08)";
const COLOR_ACTIVE_BG_LIGHT = "rgba(0, 0, 0, 0.06)";

export function LiquidGlassTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const theme = useTheme() as AppTheme;
  const { colors } = theme;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
          bottom: Platform.OS === "android" ? 16 : 0,
        },
      ]}
    >
      <LinearGradient
        colors={theme.dark ? GRADIENT_DARK : GRADIENT_LIGHT}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.blurContainer}
      >
        <View
          style={[
            styles.tabContainer,
            {
              backgroundColor: "transparent",
              borderColor: theme.dark ? COLOR_BORDER_DARK : COLOR_BORDER_LIGHT,
            },
          ]}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            // Get icon name from tabItems
            const tabItem = tabItems.find((item) => item.name === route.name);

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={`tab-button-${route.name}`}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.tabItem,
                  isFocused && styles.activeTabItem,
                  isFocused && {
                    backgroundColor: theme.dark
                      ? COLOR_ACTIVE_BG_DARK
                      : COLOR_ACTIVE_BG_LIGHT,
                  },
                ]}
                activeOpacity={0.7}
              >
                {tabItem && (
                  <Icon
                    type="MaterialCommunityIcons"
                    name={tabItem.iconName}
                    color={
                      isFocused
                        ? colors.primary
                        : theme.dark
                          ? COLOR_ICON_DARK
                          : COLOR_ICON_LIGHT
                    }
                    size={22}
                  />
                )}
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isFocused
                        ? colors.primary
                        : theme.dark
                          ? COLOR_ICON_DARK
                          : COLOR_ICON_LIGHT,
                    },
                  ]}
                >
                  {typeof label === "string" ? label : ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  blurContainer: {
    borderRadius: 40,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  tabContainer: {
    flexDirection: "row",
    height: 60,
    borderRadius: 40,
    borderWidth: 0.5,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 32,
    marginHorizontal: 2,
    gap: 2,
    minHeight: 48,
  },
  activeTabItem: {
    transform: [{ scale: 1.0 }],
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "600",
    textAlign: "center",
  },
});
