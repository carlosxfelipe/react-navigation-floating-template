import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { Theme as AppTheme } from "../themes";
import { tabItems } from "./tabItems";
import { getHeaderOptions } from "./headerOptions";
import { LiquidGlassTabBar } from "../components/organisms/LiquidGlassTabBar";

export const HomeTabs = createBottomTabNavigator({
  tabBar: (props) => <LiquidGlassTabBar {...props} />,
  screenOptions: ({ theme }) => {
    const appTheme = theme as AppTheme;

    return {
      headerStyle: {
        backgroundColor: appTheme.colors.header,
      },
      headerTintColor: appTheme.colors.text,
      tabBarStyle: {
        display: "none", // Hide the default tab bar
      }, // Add padding bottom for floating tab bar
      sceneContainerStyle: {
        paddingBottom: 80, // Space for floating tab bar
      },
    };
  },
  screens: Object.fromEntries(
    tabItems.map((tab) => [
      tab.name,
      {
        screen: tab.component,
        options: {
          title: tab.title,

          // Aplica opções de header por aba (ver headerOptions.tsx)
          ...getHeaderOptions(tab.name),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={tab.iconName}
              color={color}
              size={size}
            />
          ),
        },
      },
    ]),
  ),
});
