import { StyleSheet } from "react-native";
import { ScreenScrollView } from "../components/atoms/ScreenScrollView";
import { ProductCard } from "../components/molecules/ProductCard";

const mockProducts = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Coca-Cola 2 Litros",
    description: "Caixa com 6 unidades",
    price: 71.34,
    unitPrice: 11.89,
    imageUrl:
      "https://coopsp.vtexassets.com/arquivos/ids/249028-800-800?v=638937339758800000&width=800&height=800&aspect=true",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Kit Coca-Cola + Fanta Laranja 2 Litros",
    description: "Contém 2 unidades (1 de cada)",
    price: 16.99,
    unitPrice: 8.49,
    imageUrl:
      "https://coopsp.vtexassets.com/arquivos/ids/249040-800-800?v=638937346764500000&width=800&height=800&aspect=true",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Sprite Lata Sem Açúcar 350ml",
    description: "Pack com 12 unidades",
    price: 34.68,
    unitPrice: 2.89,
    imageUrl:
      "https://coopsp.vtexassets.com/arquivos/ids/249401-800-800?v=638960679639700000&width=800&height=800&aspect=true",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Monster Energy 473ml",
    description: "Caixa com 6 unidades",
    price: 47.94,
    unitPrice: 7.99,
    imageUrl:
      "https://coopsp.vtexassets.com/arquivos/ids/248951-800-800?v=638931136491370000&width=800&height=800&aspect=true",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Suco de Uva Kapo Del Valle 200ml",
    description: "Caixa com 6 unidades",
    price: 15.54,
    unitPrice: 2.59,
    imageUrl:
      "https://coopsp.vtexassets.com/arquivos/ids/249080-800-800?v=638941443128230000&width=800&height=800&aspect=true",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Água Mineral com Gás Crystal 500ml",
    description: "Pack com 12 unidades",
    price: 28.68,
    unitPrice: 2.39,
    imageUrl:
      "https://coopsp.vtexassets.com/arquivos/ids/249370-800-800?v=638960628217870000&width=800&height=800&aspect=true",
  },
];

export function Orders() {
  return (
    <ScreenScrollView contentContainerStyle={styles.content}>
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 10,
  },
});
