import { StaticScreenProps } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { ThemedText } from "../components/atoms/ThemedText";
import { ThemedView } from "../components/atoms/ThemedView";

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {
  const headerHeight = useHeaderHeight();
  return (
    <ThemedView style={[styles.container, { paddingTop: headerHeight + 16 }]}>
      <ThemedText>Perfil de {route.params.user}</ThemedText>
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
