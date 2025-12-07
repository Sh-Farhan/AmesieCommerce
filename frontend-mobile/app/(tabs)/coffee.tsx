// app/(tabs)/coffee.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";

const BROWN = "#3B2416";
const BROWN_LIGHT = "#5a3824";
const PANEL = "#261710";
const ACCENT = "#D59A61";
const TEXT_LIGHT = "#F9F4ED";

const CATEGORIES = ["Coffee", "Tea", "Snacks", "Dessert"] as const;

const FEATURED_ITEMS = [
  {
    id: "espresso-brown",
    name: "Espresso Brown Coffee",
    tag: "Complex flavour",
    price: 5.99,
  },
  {
    id: "iced-brown",
    name: "Iced Brown Coffee",
    tag: "Smooth & creamy",
    price: 5.49,
  },
];

const POPULAR_ITEMS = [
  { id: "americano", name: "Americano", tag: "Simplicity itself", price: 3.99 },
  { id: "macchiato", name: "Macchiato", tag: "2 shots of espresso", price: 4.99 },
  { id: "latte", name: "Latte", tag: "Complex flavour", price: 5.99 },
];

export default function CoffeeHomeScreen() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("Coffee");

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hello, Guest</Text>
          <Text style={styles.headerSubtitle}>Discover premium drinks</Text>
        </View>

        {/* Category pills */}
        <View style={styles.categoryRow}>
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[styles.categoryChip, active && styles.categoryChipActive]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hero panel */}
        <View style={styles.heroPanel}>
          <Text style={styles.heroLabel}>Featured</Text>
          <Text style={styles.heroTitle}>AMAZING TASTE OF COFFEE</Text>
          <Text style={styles.heroBody}>
            Prepare to tantalize your taste buds with a smooth premium blend.
          </Text>

          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Featured section */}
        <Text style={styles.sectionTitle}>Featured</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredRow}
        >
          {FEATURED_ITEMS.map((item, index) => {
            const card = (
              <View key={item.id} style={styles.featuredCard}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardTag}>{item.tag}</Text>
                <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
              </View>
            );

            // First featured card → navigate to detail screen
            if (index === 0) {
              return (
                <Link
                  key={item.id}
                  href="/(tabs)/coffee-detail"
                  asChild
                >
                  <TouchableOpacity activeOpacity={0.85}>
                    {card}
                  </TouchableOpacity>
                </Link>
              );
            }

            // Other cards static for now
            return card;
          })}
        </ScrollView>

        {/* Popular list */}
        <View style={styles.popularHeaderRow}>
          <Text style={styles.sectionTitle}>Popular</Text>
          <Text style={styles.viewAll}>View all</Text>
        </View>

        <View style={styles.popularList}>
          {POPULAR_ITEMS.map((item) => (
            <View key={item.id} style={styles.popularRow}>
              <View style={styles.popularTextBlock}>
                <Text style={styles.popularName}>{item.name}</Text>
                <Text style={styles.popularTag}>{item.tag}</Text>
              </View>
              <Text style={styles.popularPrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BROWN,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    color: TEXT_LIGHT,
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#e2d2c4",
    fontSize: 13,
    marginTop: 4,
  },
  categoryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#70503A",
  },
  categoryChipActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  categoryText: {
    color: "#e2d2c4",
    fontSize: 13,
  },
  categoryTextActive: {
    color: BROWN,
    fontWeight: "700",
  },
  heroPanel: {
    backgroundColor: PANEL,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  heroLabel: {
    color: "#e2d2c4",
    fontSize: 12,
    marginBottom: 4,
  },
  heroTitle: {
    color: TEXT_LIGHT,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  heroBody: {
    color: "#e2d2c4",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  heroButton: {
    alignSelf: "flex-start",
    backgroundColor: ACCENT,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
  },
  heroButtonText: {
    color: BROWN,
    fontSize: 14,
    fontWeight: "700",
  },
  sectionTitle: {
    color: TEXT_LIGHT,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  featuredRow: {
    gap: 12,
    paddingBottom: 8,
    marginBottom: 20,
  },
  featuredCard: {
    width: 180,
    backgroundColor: PANEL,
    borderRadius: 16,
    padding: 14,
  },
  cardTitle: {
    color: TEXT_LIGHT,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardTag: {
    color: "#c7b2a1",
    fontSize: 12,
    marginBottom: 8,
  },
  cardPrice: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: "700",
  },
  popularHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  viewAll: {
    color: "#e2d2c4",
    fontSize: 12,
  },
  popularList: {
    backgroundColor: PANEL,
    borderRadius: 16,
    paddingVertical: 6,
  },
  popularRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3a2618",
  },
  popularTextBlock: {
    flex: 1,
    marginRight: 8,
  },
  popularName: {
    color: TEXT_LIGHT,
    fontSize: 14,
    fontWeight: "600",
  },
  popularTag: {
    color: "#c7b2a1",
    fontSize: 12,
    marginTop: 2,
  },
  popularPrice: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: "700",
  },
});
