import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { ThemedView } from "../components/atoms/ThemedView";

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {
  const headerHeight = useHeaderHeight();
  return (
    <ThemedView style={[styles.container, { paddingTop: headerHeight + 16 }]}>
      <Text>Perfil de {route.params.user}</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
