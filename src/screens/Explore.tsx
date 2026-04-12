import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../themes";
import { ScreenScrollView } from "../components/atoms/ScreenScrollView";
import { ThemedText } from "../components/atoms/ThemedText";
import { Icon } from "../components/atoms/Icon";

const features = [
  {
    id: "1",
    icon: "palette-outline" as const,
    title: "Temas Claro e Escuro",
    description: "Suporte completo a temas com cores customizáveis.",
  },
  {
    id: "2",
    icon: "navigation-variant-outline" as const,
    title: "Navegação Flutuante",
    description: "Tab bar e app bar com design moderno e flutuante.",
  },
  {
    id: "3",
    icon: "cellphone" as const,
    title: "Multiplataforma",
    description: "Funciona em iOS, Android e Web com adaptações nativas.",
  },
  {
    id: "4",
    icon: "puzzle-outline" as const,
    title: "Componentes Reutilizáveis",
    description: "Biblioteca de átomos, moléculas e organismos prontos.",
  },
  {
    id: "5",
    icon: "rocket-launch-outline" as const,
    title: "Pronto para Produção",
    description: "Estrutura escalável baseada no template do React Navigation.",
  },
];

export function Explore() {
  const { colors } = useTheme() as AppTheme;

  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      <ThemedText style={styles.subtitle}>
        Conheça os recursos disponíveis neste template.
      </ThemedText>

      {features.map((feature) => (
        <View
          key={feature.id}
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: "rgba(128, 128, 128, 0.1)",
            },
          ]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: colors.primary + "20" },
            ]}
          >
            <Icon
              type="MaterialCommunityIcons"
              name={feature.icon}
              size={24}
              color={colors.primary}
            />
          </View>
          <View style={styles.cardText}>
            <ThemedText style={styles.cardTitle}>{feature.title}</ThemedText>
            <ThemedText style={styles.cardDescription}>
              {feature.description}
            </ThemedText>
          </View>
        </View>
      ))}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 12,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.7,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 13,
    opacity: 0.6,
  },
});
