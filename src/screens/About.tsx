import { StyleSheet, View } from "react-native";
import { ScreenScrollView } from "../components/atoms/ScreenScrollView";
import { ThemedText } from "../components/atoms/ThemedText";
import { FloatingOrbs } from "../components/molecules/FloatingOrbs";

export function About() {
  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <FloatingOrbs />
      <View style={{ height: 10 }} />
      <ThemedText>
        Este projeto é baseado no template oficial do React Navigation:
      </ThemedText>
      <ThemedText>https://github.com/react-navigation/template</ThemedText>
      <ThemedText>
        Nota: este app usa Development Build e não roda no Expo Go por padrão.
      </ThemedText>
      <ThemedText>
        Para usar Expo Go, ajuste o `package.json`: remova `expo-dev-client` e a
        flag `--dev-client` do script `start`.
      </ThemedText>
      <ThemedText>
        Recomendamos manter Development Build no desenvolvimento. As pastas
        `ios/` e `android/` são geradas automaticamente (CNG), por isso o ideal
        é usar config plugins em vez de editar essas pastas diretamente.
      </ThemedText>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 10,
  },
});
