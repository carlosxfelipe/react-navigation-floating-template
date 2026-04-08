import { Linking, StyleSheet } from "react-native";
import { ScreenScrollView } from "../components/atoms/ScreenScrollView";
import { ThemedText } from "../components/atoms/ThemedText";
import { Button } from "../components/molecules/Button";
import { Icon } from "../components/atoms/Icon";

export function Home() {
  const handleOpenGithub = () => {
    Linking.openURL(
      "https://github.com/carlosxfelipe/react-navigation-floating-template",
    );
  };

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <ThemedText>Tela Inicial</ThemedText>
      <ThemedText>
        Abra o arquivo 'src/App.tsx' para começar a trabalhar no seu app!
      </ThemedText>

      <Button
        shape="pill"
        screen="Profile"
        params={{ user: "carlos" }}
        iconLeft={(color: string) => (
          <Icon type="Feather" name="user" color={color} />
        )}
      >
        Ir para o Perfil
      </Button>

      <Button
        shape="pill"
        screen="Settings"
        iconRight={(color: string) => (
          <Icon type="Ionicons" name="settings-outline" color={color} />
        )}
      >
        Ir para as Configurações
      </Button>

      <Button
        shape="pill"
        onPress={handleOpenGithub}
        iconLeft={(color) => (
          <Icon
            type="MaterialCommunityIcons"
            name="github"
            color={color}
            size={22}
          />
        )}
      >
        Ver no GitHub
      </Button>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 10,
  },
});
