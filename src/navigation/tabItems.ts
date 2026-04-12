import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps, ComponentType } from "react";

import { About } from "../screens/About";
import { Home } from "../screens/Home";
import { Profile } from "../screens/Profile";
import { Explore } from "../screens/Explore";

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type TabItem = {
  name: string;
  component: ComponentType<any>;
  title: string;
  iconName: MaterialIconName;
};

export const tabItems: TabItem[] = [
  {
    name: "Home",
    component: Home,
    title: "Início",
    iconName: "home",
  },
  {
    name: "Explore",
    component: Explore,
    title: "Explorar",
    iconName: "compass-outline",
  },
  {
    name: "About",
    component: About,
    title: "Sobre",
    iconName: "information",
  },
];
