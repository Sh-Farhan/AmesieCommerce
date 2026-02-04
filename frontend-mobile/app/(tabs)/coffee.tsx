// app/(tabs)/coffee.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

const BROWN = "#3b2415";
const DARK = "#2a180f";
const CARD = "#5b3620";
const ACCENT = "#f2a94f";
const LIGHT_TEXT = "#f1e0ce";

type Category = "Coffee" | "Tea" | "Snacks" | "Dessert";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
};

const PRODUCTS: Record<
  Category,
  {
    featured: Product[];
    popular: Product[];
  }
> = {
  Coffee: {
    featured: [
      {
        id: "espresso",
        name: "Espresso Brown Coffee",
        subtitle: "Complex flavour",
        price: 5.99,
      },
      {
        id: "iced-brown",
        name: "Iced Brown Coffee",
        subtitle: "Smooth & creamy",
        price: 5.49,
      },
    ],
    popular: [
      {
        id: "americano",
        name: "Americano",
        subtitle: "Smoothly bold",
        price: 4.99,
      },
      {
        id: "macchiato",
        name: "Macchiato",
        subtitle: "Shot of espresso",
        price: 5.29,
      },
      {
        id: "latte",
        name: "Latte",
        subtitle: "Creamy, classic flavour",
        price: 5.39,
      },
    ],
  },
  Tea: {
    featured: [
      {
        id: "masala-tea",
        name: "Masala Chai",
        subtitle: "Spiced Indian tea",
        price: 3.99,
      },
      {
        id: "green-tea",
        name: "Jasmine Green Tea",
        subtitle: "Light & refreshing",
        price: 3.49,
      },
    ],
    popular: [
      {
        id: "english",
        name: "English Breakfast",
        subtitle: "Strong classic blend",
        price: 3.29,
      },
      {
        id: "earl-grey",
        name: "Earl Grey",
        subtitle: "Citrusy & aromatic",
        price: 3.59,
      },
    ],
  },
  Snacks: {
    featured: [
      {
        id: "croissant",
        name: "Butter Croissant",
        subtitle: "Flaky & warm",
        price: 2.99,
      },
      {
        id: "brownie",
        name: "Chocolate Brownie",
        subtitle: "Rich & fudgy",
        price: 3.49,
      },
    ],
    popular: [
      {
        id: "cookies",
        name: "Choco Chip Cookies",
        subtitle: "Box of 3",
        price: 2.79,
      },
      {
        id: "sandwich",
        name: "Grilled Sandwich",
        subtitle: "Cheese & veggies",
        price: 4.49,
      },
    ],
  },
  Dessert: {
    featured: [
      {
        id: "tiramisu",
        name: "Tiramisu Cup",
        subtitle: "Coffee layered dessert",
        price: 4.99,
      },
      {
        id: "cheesecake",
        name: "Baked Cheesecake",
        subtitle: "Creamy & smooth",
        price: 4.79,
      },
    ],
    popular: [
      {
        id: "pudding",
        name: "Caramel Pudding",
        subtitle: "Soft & silky",
        price: 3.99,
      },
      {
        id: "icecream",
        name: "Vanilla Ice Cream",
        subtitle: "Scoop of 2",
        price: 3.49,
      },
    ],
  },
};

export default function CoffeeHomeScreen() {
  const router = useRouter();
  const [category, setCategory] = useState<Category>("Coffee");

  const data = PRODUCTS[category];

  const handleGetStarted = () => {
    router.push("/coffee-detail");
  };

  const handleProductPress = (item: Product) => {
    // Abhi sab same Coffee detail pe jaayenge
    router.push("/coffee-detail");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hello, Guest</Text>
            <Text style={styles.subGreeting}>Discover premium drinks</Text>
          </View>
        </View>

        {/* Category tabs */}
        <View style={styles.tabRow}>
          {(["Coffee", "Tea", "Snacks", "Dessert"] as Category[]).map((cat) => {
            const isActive = category === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.tabChip, isActive && styles.tabChipActive]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.tabChipText,
                    isActive && styles.tabChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hero section */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEyebrow}>
            AMAZING TASTE OF {category.toUpperCase()}
          </Text>
          <Text style={styles.heroTitle}>
            Prepare to tantalize your taste buds
          </Text>
          <Text style={styles.heroSubtitle}>
            Enjoy a smooth premium blend with rich flavour, crafted for a
            focused work session or a slow evening.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={handleGetStarted}
          >
            <Text style={styles.heroButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        {/* Featured */}
        <Text style={styles.sectionTitle}>Featured</Text>
        <View style={styles.cardRow}>
          {data.featured.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() => handleProductPress(item)}
            >
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productSubtitle}>{item.subtitle}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Popular</Text>
        <View style={styles.popularList}>
          {data.popular.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.popularRow}
              onPress={() => handleProductPress(item)}
            >
              <View>
                <Text style={styles.popularName}>{item.name}</Text>
                <Text style={styles.popularSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.popularPrice}>
                ${item.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: {
    color: LIGHT_TEXT,
    fontSize: 20,
    fontWeight: "700",
  },
  subGreeting: {
    color: "#f1e0ceaa",
    marginTop: 4,
  },
  tabRow: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  tabChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#f1e0ce33",
    backgroundColor: DARK,
  },
  tabChipActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  tabChipText: {
    color: "#f1e0cecc",
    fontSize: 13,
  },
  tabChipTextActive: {
    color: BROWN,
    fontWeight: "700",
  },
  heroCard: {
    backgroundColor: CARD,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  heroEyebrow: {
    color: "#f1e0ceaa",
    fontSize: 12,
    letterSpacing: 1,
  },
  heroTitle: {
    color: LIGHT_TEXT,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  heroSubtitle: {
    color: "#f1e0ceaa",
    marginTop: 8,
  },
  heroButton: {
    marginTop: 16,
    alignSelf: "flex-start",
    backgroundColor: ACCENT,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heroButtonText: {
    color: BROWN,
    fontWeight: "700",
  },
  sectionTitle: {
    color: LIGHT_TEXT,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
  },
  productCard: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 14,
  },
  productName: {
    color: LIGHT_TEXT,
    fontWeight: "700",
    fontSize: 14,
  },
  productSubtitle: {
    color: "#f1e0ceaa",
    fontSize: 12,
    marginTop: 4,
  },
  productPrice: {
    color: ACCENT,
    fontWeight: "700",
    marginTop: 10,
  },
  popularList: {
    gap: 10,
  },
  popularRow: {
    backgroundColor: CARD,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularName: {
    color: LIGHT_TEXT,
    fontWeight: "600",
  },
  popularSubtitle: {
    color: "#f1e0ceaa",
    fontSize: 12,
    marginTop: 2,
  },
  popularPrice: {
    color: ACCENT,
    fontWeight: "700",
  },
});
