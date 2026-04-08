import { StyleSheet, View, Image, Alert, Platform } from "react-native";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import type { Theme as AppTheme } from "../../themes";
import { ThemedText } from "../atoms/ThemedText";
import { PlatformPressable } from "../atoms/PlatformPressable";
import { Icon } from "../atoms/Icon";

export type Product = {
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

export function ProductCard({ product }: ProductCardProps) {
  const { colors } = useTheme() as AppTheme;
  const [qty, setQty] = useState(0);

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => Math.max(0, q - 1));

  const confirmReset = () => {
    Alert.alert("Zerar quantidade", "Deseja remover este item do pedido?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Zerar", style: "destructive", onPress: () => setQty(0) },
    ]);
  };

  const openQtyDialog = () => {
    if (Platform.OS === "ios") {
      Alert.prompt(
        "Quantidade",
        "Digite a quantidade desejada",
        (val) => {
          const n = parseInt(val, 10);
          setQty(isNaN(n) || n < 0 ? 0 : n);
        },
        "plain-text",
        String(qty),
        "number-pad",
      );
    } else {
      // Android não possui Alert.prompt nativo
      Alert.alert("Quantidade", `Atual: ${qty}\nUse − e + para ajustar.`);
    }
  };

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
        resizeMode="contain"
      />
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>
            <ThemedText style={styles.cardName} numberOfLines={2}>
              {product.name}
            </ThemedText>
            <ThemedText style={styles.cardDescription} numberOfLines={1}>
              {product.description}
            </ThemedText>
          </View>
          <View style={styles.cardPricing}>
            <ThemedText style={styles.cardPrice}>
              R$ {product.price.toFixed(2).replace(".", ",")}
            </ThemedText>
            <ThemedText style={styles.cardUnitPrice}>
              R$ {product.unitPrice.toFixed(2).replace(".", ",")} cada
            </ThemedText>
          </View>
        </View>
        <View style={styles.cardActions}>
          {qty > 0 && (
            <View style={[styles.stepper, { borderColor: colors.cardBorder }]}>
              <PlatformPressable
                style={styles.stepperBtn}
                onPress={decrement}
                onLongPress={confirmReset}
                delayLongPress={300}
                android_ripple={{ color: colors.primary + "20" }}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="minus"
                  color={colors.text}
                  size={16}
                />
              </PlatformPressable>
              <View
                style={[
                  styles.stepperDivider,
                  { backgroundColor: colors.cardBorder },
                ]}
              />
              <PlatformPressable
                style={styles.stepperQtyBtn}
                onPress={openQtyDialog}
                onLongPress={confirmReset}
                delayLongPress={300}
              >
                <ThemedText style={styles.stepperQty}>{qty}</ThemedText>
              </PlatformPressable>
              <View
                style={[
                  styles.stepperDivider,
                  { backgroundColor: colors.cardBorder },
                ]}
              />
              <PlatformPressable
                style={styles.stepperBtn}
                onPress={increment}
                android_ripple={{ color: colors.primary + "20" }}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="plus"
                  color={colors.text}
                  size={16}
                />
              </PlatformPressable>
            </View>
          )}
          {qty === 0 && (
            <PlatformPressable
              style={[styles.addBtn, { backgroundColor: colors.primary }]}
              onPress={increment}
              android_ripple={{ color: "rgba(255,255,255,0.3)" }}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="plus"
                color="white"
                size={20}
              />
            </PlatformPressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardImage: {
    width: 120,
    alignSelf: "stretch",
  },
  cardContent: {
    flex: 1,
    padding: 14,
    gap: 12,
    justifyContent: "space-between",
  },
  cardInfo: {
    gap: 8,
  },
  cardHeader: {
    gap: 3,
  },
  cardPricing: {
    gap: 2,
  },
  cardName: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "700",
  },
  cardUnitPrice: {
    fontSize: 11,
    opacity: 0.5,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 24,
    overflow: "hidden",
    height: 36,
  },
  stepperDivider: {
    width: 1,
    height: "60%",
  },
  stepperBtn: {
    width: 40,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperQtyBtn: {
    height: 36,
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  stepperQty: {
    fontSize: 15,
    fontWeight: "700",
    minWidth: 32,
    textAlign: "center",
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
