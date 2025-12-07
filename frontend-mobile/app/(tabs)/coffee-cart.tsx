import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../store/cart";
const BROWN = "#3b2415";
const ACCENT = "#f2a94f";

export default function CoffeeCartScreen() {
  const router = useRouter();
  const { cart, updateQty } = useCart();

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleProceed = () => {
    if (cart.length === 0) return;
    router.push("/coffee-delivery");
  };

  const changeQty = (id: string, size: string, delta: number) => {
    const item = cart.find((c) => c.id === id && c.size === size);
    if (!item) return;
    const next = item.qty + delta;
    if (next <= 0) return;
    updateQty(id, size, next);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Your Cart</Text>

        {cart.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        ) : (
          <>
            {cart.map((item) => (
              <View key={`${item.id}-${item.size}`} style={styles.cartCard}>
                <View style={styles.cartRowTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMeta}>
                      {item.size} · ${item.price.toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.qtyInlineRow}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => changeQty(item.id, item.size, -1)}
                    >
                      <Text style={styles.qtyButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => changeQty(item.id, item.size, 1)}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemTotal}>
                    ${(item.qty * item.price).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                cart.length === 0 && styles.primaryButtonDisabled,
              ]}
              disabled={cart.length === 0}
              onPress={handleProceed}
            >
              <Text style={styles.primaryButtonText}>Proceed to Delivery</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BROWN,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
  },
  emptyText: {
    color: "#f1e0ce",
  },
  cartCard: {
    backgroundColor: "#5b3620",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },
  cartRowTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  itemMeta: {
    color: "#f1e0ceaa",
    marginTop: 4,
  },
  qtyInlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#3b2415",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  qtyValue: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 8,
  },
  itemTotal: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 24,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    color: "#f1e0ceaa",
    fontSize: 16,
  },
  totalValue: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  primaryButton: {
    backgroundColor: ACCENT,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: BROWN,
    fontSize: 16,
    fontWeight: "700",
  },
});
