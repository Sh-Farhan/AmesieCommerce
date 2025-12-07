import React, { useMemo, useState } from "react";
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

const SIZES = [
  { id: "250", label: "250 ml", ml: 250, price: 5.99 },
  { id: "350", label: "350 ml", ml: 350, price: 6.49 },
  { id: "450", label: "450 ml", ml: 450, price: 6.99 },
];

export default function CoffeeDetailScreen() {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedSizeId, setSelectedSizeId] = useState<string>("250");
  const [quantity, setQuantity] = useState<number>(1);

  const selectedSize = useMemo(
    () => SIZES.find((s) => s.id === selectedSizeId) ?? SIZES[0],
    [selectedSizeId]
  );

  const totalPrice = useMemo(
    () => selectedSize.price * quantity,
    [selectedSize, quantity]
  );

  const handleAddToCart = () => {
    addItem({
      id: "espresso-brown-coffee",
      name: "Espresso Brown Coffee",
      size: selectedSize.label,
      ml: selectedSize.ml,
      qty: quantity,
      price: selectedSize.price,
    });

    router.push("/coffee-cart");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top image placeholder */}
        <View style={styles.imageHeader}>
          <Text style={styles.imageText}>Coffee image</Text>
        </View>

        {/* Content card */}
        <View style={styles.contentCard}>
          {/* Back + title */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Espresso Brown Coffee</Text>
              <Text style={styles.subtitle}>
                Complex yet smooth flavor made to order.
              </Text>
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>4.5</Text>
            <Text style={styles.ratingSubText}>(10k+ reviews)</Text>
          </View>

          {/* Size selector */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Size</Text>
            <View style={styles.choicesRow}>
              {SIZES.map((size) => {
                const isActive = size.id === selectedSizeId;
                return (
                  <TouchableOpacity
                    key={size.id}
                    style={[
                      styles.chip,
                      isActive && styles.chipActive,
                    ]}
                    onPress={() => setSelectedSizeId(size.id)}
                  >
                    <Text
                      style={[
                        styles.chipLabel,
                        isActive && styles.chipLabelActive,
                      ]}
                    >
                      {size.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Quantity</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Smooth premium blend with rich crema. Perfect for a focused work
            session or a slow evening.
          </Text>

          {/* Total + CTA */}
          <View style={styles.footerRow}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.primaryButtonText}>Add to Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BROWN = "#3b2415";
const LIGHT_BROWN = "#5b3620";
const ACCENT = "#f2a94f";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BROWN,
  },
  container: {
    paddingBottom: 32,
  },
  imageHeader: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BROWN,
  },
  imageText: {
    color: "#f1e0ce",
    fontSize: 18,
  },
  contentCard: {
    backgroundColor: BROWN,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#f1e0ce33",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  backButtonText: {
    color: "#f1e0ce",
    fontSize: 18,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    color: "#f1e0ce",
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingStar: {
    color: "#f5c451",
    fontSize: 18,
    marginRight: 4,
  },
  ratingText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
  },
  ratingSubText: {
    color: "#f1e0ceaa",
  },
  section: {
    marginTop: 16,
  },
  sectionLabel: {
    color: "#ffffff",
    marginBottom: 8,
    fontWeight: "600",
  },
  choicesRow: {
    flexDirection: "row",
    gap: 12,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f1e0ce55",
  },
  chipActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  chipLabel: {
    color: "#f1e0ce",
  },
  chipLabelActive: {
    color: BROWN,
    fontWeight: "700",
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: LIGHT_BROWN,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  qtyValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  description: {
    marginTop: 20,
    color: "#f1e0ce",
    lineHeight: 20,
  },
  footerRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: "#f1e0ceaa",
    fontSize: 14,
  },
  totalValue: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: ACCENT,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  primaryButtonText: {
    color: BROWN,
    fontSize: 16,
    fontWeight: "700",
  },
});
