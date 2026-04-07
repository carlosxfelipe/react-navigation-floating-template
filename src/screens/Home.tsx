import { Linking, StyleSheet } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { ThemedScrollView } from "../components/atoms/ThemedScrollView";
import { ThemedText } from "../components/atoms/ThemedText";
import { Button } from "../components/molecules/Button";
import { Icon } from "../components/atoms/Icon";
import { ComponentsShowcase } from "../components/pages/ComponentsShowcase";

export function Home() {
  const headerHeight = useHeaderHeight();
  const handleOpenGithub = () => {
    Linking.openURL(
      "https://github.com/carlosxfelipe/react-navigation-template",
    );
  };

  return (
    <ThemedScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: headerHeight + 16 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText>Tela Inicial</ThemedText>
      <ThemedText>
        Abra o arquivo 'src/App.tsx' para começar a trabalhar no seu app!
      </ThemedText>

      <Button
        screen="Profile"
        params={{ user: "carlos" }}
        iconLeft={(color: string) => (
          <Icon type="Feather" name="user" color={color} />
        )}
      >
        Ir para o Perfil
      </Button>

      <Button
        screen="Settings"
        iconRight={(color: string) => (
          <Icon type="Ionicons" name="settings-outline" color={color} />
        )}
      >
        Ir para as Configurações
      </Button>

      <Button
        variant="filled"
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

      <ComponentsShowcase />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    gap: 10,
  },
});
