// app/(tabs)/coffee-success.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const BROWN = "#3b2415";
const CARD = "#5b3620";
const ACCENT = "#f2a94f";
const LIGHT_TEXT = "#f5e6dd";

export default function CoffeeSuccessScreen() {
  const router = useRouter();

  const handleBackToCoffee = () => {
    router.replace("/coffee");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Check circle */}
        <View style={styles.circle}>
          <Text style={styles.circleIcon}>✓</Text>
        </View>

        {/* Title + subtitle */}
        <Text style={styles.title}>Order confirmed</Text>
        <Text style={styles.subtitle}>
          Your coffee is being prepared. You’ll get it fresh and hot in a few
          minutes.
        </Text>

        {/* Summary card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Thank you</Text>
          <Text style={styles.cardText}>
            We’ve received your order successfully. You can continue browsing
            more drinks and snacks from the Coffee section.
          </Text>
        </View>

        {/* Primary button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleBackToCoffee}
        >
          <Text style={styles.primaryButtonText}>Back to Coffee</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BROWN,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: "center",
  },
  circle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  circleIcon: {
    fontSize: 44,
    color: BROWN,
    fontWeight: "700",
  },
  title: {
    fontSize: 26,
    color: LIGHT_TEXT,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#f1e0ceaa",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 28,
  },
  card: {
    width: "100%",
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 18,
    marginBottom: 32,
  },
  cardTitle: {
    color: LIGHT_TEXT,
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 6,
  },
  cardText: {
    color: "#f1e0cecc",
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: ACCENT,
    borderRadius: 26,
    paddingVertical: 13,
    alignItems: "center",
  },
  primaryButtonText: {
    color: BROWN,
    fontSize: 16,
    fontWeight: "700",
  },
});
