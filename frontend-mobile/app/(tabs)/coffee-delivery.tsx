// app/(tabs)/coffee-delivery.tsx
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../store/cart";
import { submitCoffeeOrder } from "../lib/api";

const BROWN = "#3b2415";
const ACCENT = "#f2a94f";

export default function CoffeeDeliveryScreen() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty * item.price, 0),
    [cart]
  );

  const handleConfirmOrder = async () => {
    if (!cart.length || !address.trim() || submitting) return;

    const order = {
      items: cart,
      address,
      note,
      total,
      createdAt: new Date().toISOString(),
    };

    console.log("ORDER TO SEND TO BACKEND ->", order);

    try {
      setSubmitting(true);

      // yahi se REAL backend hit hoga: POST /api/mobile-coffee-orders
      await submitCoffeeOrder(order);

      clearCart();
      router.replace("/coffee");
    } catch (err: any) {
      console.error("ORDER SUBMIT FAILED", err);
      Alert.alert(
        "Order failed",
        err?.message || "Something went wrong while placing the order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Delivery details</Text>
        <Text style={styles.headerSubtitle}>
          Enter where you want your coffee delivered.
        </Text>

        {/* Address */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Delivery address</Text>
          <TextInput
            style={styles.input}
            placeholder="Type address"
            placeholderTextColor="#c8a98a"
            multiline
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Note */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Delivery note</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Add any notes for the rider (optional)"
            placeholderTextColor="#c8a98a"
            multiline
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Summary */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Order summary</Text>

          {cart.map((item) => (
            <View key={`${item.id}-${item.size}`} style={styles.summaryRow}>
              <Text style={styles.summaryItemText}>
                {item.name} x{item.qty}
              </Text>
              <Text style={styles.summaryPrice}>
                ${(item.qty * item.price).toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryMuted}>Delivery</Text>
            <Text style={styles.summaryPrice}>$0.00</Text>
          </View>

          <View style={[styles.summaryRow, { marginTop: 8 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Confirm */}
        <TouchableOpacity
          style={[
            styles.primaryButton,
            (!cart.length || !address.trim() || submitting) &&
              styles.primaryDisabled,
          ]}
          disabled={!cart.length || !address.trim() || submitting}
          onPress={handleConfirmOrder}
        >
          <Text style={styles.primaryButtonText}>
            {submitting ? "Placing order..." : "Confirm order"}
          </Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#f1e0ceaa",
    marginTop: 4,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#5b3620",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  cardLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f1e0ce33",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#ffffff",
    backgroundColor: "#3b2415",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  summaryItemText: {
    color: "#f1e0ce",
  },
  summaryMuted: {
    color: "#f1e0ceaa",
  },
  summaryPrice: {
    color: "#ffffff",
  },
  totalLabel: {
    color: "#f1e0ce",
    fontSize: 16,
    fontWeight: "600",
  },
  totalValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: ACCENT,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: "center",
  },
  primaryDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: BROWN,
    fontSize: 16,
    fontWeight: "700",
  },
});
