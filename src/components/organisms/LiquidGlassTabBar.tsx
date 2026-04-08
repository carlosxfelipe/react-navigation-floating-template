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
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 },
      ]}
    >
      <LinearGradient
        colors={
          theme.dark
            ? [
                "rgba(28, 28, 30, 0.95)",
                "rgba(44, 44, 46, 0.9)",
                "rgba(28, 28, 30, 0.95)",
              ]
            : [
                "rgba(255, 255, 255, 0.95)",
                "rgba(255, 255, 255, 0.85)",
                "rgba(255, 255, 255, 0.95)",
              ]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.blurContainer}
      >
        <View
          style={[
            styles.tabContainer,
            {
              backgroundColor: "transparent",
              borderColor: theme.dark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)",
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
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.06)",
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
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)"
                    }
                    size={28}
                  />
                )}
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isFocused
                        ? colors.primary
                        : theme.dark
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(0, 0, 0, 0.8)",
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
    height: 80,
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
    paddingVertical: 10,
    borderRadius: 32,
    marginHorizontal: 2,
    gap: 2,
    minHeight: 64,
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
