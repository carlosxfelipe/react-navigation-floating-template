import { StyleSheet, View, Image } from "react-native";
import { ScreenScrollView } from "../components/atoms/ScreenScrollView";
import { ThemedText } from "../components/atoms/ThemedText";
import { PlatformPressable } from "../components/atoms/PlatformPressable";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../themes";
import mockProducts from "../../resources/mock_products.json";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unitPrice: number;
  imageUrl: string;
};

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { colors } = useTheme() as AppTheme;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.cardBorder },
      ]}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={[styles.cardImage, { backgroundColor: colors.inputBackground }]}
      />
      <View style={styles.cardContent}>
        <ThemedText style={styles.cardName} numberOfLines={2}>
          {product.name}
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          {product.description}
        </ThemedText>
        <View style={styles.cardFooter}>
          <View>
            <ThemedText style={styles.cardPrice}>
              R$ {product.price.toFixed(2).replace(".", ",")}
            </ThemedText>
            <ThemedText style={styles.cardUnitPrice}>
              R$ {product.unitPrice.toFixed(2).replace(".", ",")} cada
            </ThemedText>
          </View>
          <View style={styles.cardActions}>
            <PlatformPressable
              style={[styles.qtyButton, { borderColor: colors.border }]}
              android_ripple={{ color: colors.primary + "20" }}
            >
              <ThemedText style={styles.qtyButtonText}>−</ThemedText>
            </PlatformPressable>
            <ThemedText style={styles.qtyValue}>1</ThemedText>
            <PlatformPressable
              style={[styles.qtyButton, { borderColor: colors.border }]}
              android_ripple={{ color: colors.primary + "20" }}
            >
              <ThemedText style={styles.qtyButtonText}>+</ThemedText>
            </PlatformPressable>
            <PlatformPressable
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              android_ripple={{ color: "rgba(255,255,255,0.3)" }}
            >
              <ThemedText style={styles.addButtonText}>Adicionar</ThemedText>
            </PlatformPressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export function Orders() {
  return (
    <ScreenScrollView>
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    padding: 16,
  },
  cardContent: {
    padding: 16,
    gap: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardDescription: {
    fontSize: 13,
    opacity: 0.6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardUnitPrice: {
    fontSize: 12,
    opacity: 0.5,
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    fontSize: 18,
    lineHeight: 22,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 16,
    textAlign: "center",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
