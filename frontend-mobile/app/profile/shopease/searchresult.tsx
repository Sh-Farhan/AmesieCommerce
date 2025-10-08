import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");
const scale = (px: number) => (px / 428) * screenWidth;

const PRODUCTS = [
  {
    id: "1",
    image: require("../../../assets/images/brown-jeans.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
  {
    id: "2",
    image: require("../../../assets/images/blue-jeans.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
  {
    id: "3",
    image: require("../../../assets/images/lblue-jeans.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
  {
    id: "4",
    image: require("../../../assets/images/brwon-jeans-2.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
  {
    id: "5",
    image: require("../../../assets/images/blue-jeans-3.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
  {
    id: "6",
    image: require("../../../assets/images/blue-jeans-4.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
  {
    id: "7",
    image: require("../../../assets/images/blue-jeans-3.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
  {
    id: "8",
    image: require("../../../assets/images/blue-jeans-4.png"),
    name: "Dust Jeans",
    brand: "Kotty",
    price: "₹ 398.90",
    oldPrice: "₹ 402.90",
  },
];

export default function SearchResult() {
  const [likedIds, setLikedIds] = useState(new Set());
  const [activeTab, setActiveTab] = useState("Home");
  const router = useRouter();

  function toggleLike(id) {
    setLikedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentWrapper}>
        {/* Search bar */}
        <View style={styles.searchBar}>
          <Image source={require("../../../assets/images/Search.png")} style={styles.searchIcon} />
          <TextInput
            placeholder="Search what you need"
            placeholderTextColor="#969598"
            style={styles.searchInput}
            underlineColorAndroid="transparent"
            selectionColor="#969598"
          />
          <TouchableOpacity>
            <Image source={require("../../../assets/images/Group.png")} style={styles.micIcon} />
          </TouchableOpacity>
        </View>
        {/* Sort/Filter/View controls */}
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.toolbarItem}>
            <Image source={require("../../../assets/images/sort.png")} style={styles.toolbarIcon} />
            <Text style={styles.toolbarText}>Sort</Text>
          </TouchableOpacity>
          <View style={styles.toolbarDivider} />
          <TouchableOpacity style={styles.toolbarItem}>
            <Image source={require("../../../assets/images/filter.png")} style={styles.toolbarIcon} />
            <Text style={styles.toolbarText}>Filter</Text>
          </TouchableOpacity>
          <View style={styles.toolbarDivider} />
          <TouchableOpacity style={styles.toolbarItem}>
            <Image source={require("../../../assets/images/view.png")} style={styles.toolbarIcon} />
            <Text style={styles.toolbarText}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.toolbarBottomDivider} />
        <Text style={styles.countLabel}>1244 items found</Text>
        {/* Product grid */}
        <FlatList
          data={PRODUCTS}
          numColumns={2}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                  <TouchableOpacity onPress={() => toggleLike(item.id)}>
                    <Image
                      source={
                        likedIds.has(item.id)
                          ? require("../../../assets/images/heart-filled.png")
                          : require("../../../assets/images/heart-outline.png")
                      }
                      style={styles.heartIcon}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <Text style={styles.cardOldPrice}>{item.oldPrice}</Text>
              </View>
            </View>
          )}
        />
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}onPress={() => router.push("/")}>
          <Image
            source={require("../../../assets/images/logo.png")}
            style={[
              styles.footerLogo,
              activeTab === "Amesie" && styles.footerIconActive
            ]}
          />
          <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
          <Image
            source={require("../../../assets/images/home-active.png")}
            style={[
              styles.footerIcon,
              activeTab === "Home" && styles.footerIconActive,
            ]}
          />
          <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
          <Image
            source={require("../../../assets/images/category.png")}
            style={[
              styles.footerIcon,
              activeTab === "Categories" && styles.footerIconActive,
            ]}
          />
          <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
          <Image
            source={require("../../../assets/images/bag.png")}
            style={[
              styles.footerIcon,
              activeTab === "Bag" && styles.footerIconActive,
            ]}
          />
          <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => setActiveTab("/wishlist")}>
          <Image
            source={require("../../../assets/images/heart.png")}
            style={[
              styles.footerIcon,
              activeTab === "Wishlist" && styles.footerIconActive,
            ]}
          />
          <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => setActiveTab("/account")}>
          <Image
            source={require("../../../assets/images/account.png")}
            style={[
              styles.footerIcon,
              activeTab === "Account" && styles.footerIconActive,
            ]}
          />
          <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flex: 1,
    paddingTop: scale(14),
    paddingHorizontal: scale(10),
    paddingBottom: scale(80),
    backgroundColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: scale(18),
    paddingHorizontal: scale(18),
    paddingVertical: scale(10),
    marginBottom: scale(10),
    width: "100%",
    minHeight: scale(44),
  },
  searchIcon: {
    width: scale(17),
    height: scale(18.5),
    marginRight: scale(10),
    tintColor: "#969598",
  },
  micIcon: {
    width: scale(15),
    height: scale(20),
    marginLeft: scale(10),
    tintColor: "#969598",
  },
  searchInput: {
    flex: 1,
    fontSize: scale(17),
    color: "#4C4C4C",
    backgroundColor: "transparent",
    paddingVertical: scale(6),
    borderWidth: 0,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: scale(0),
  },
  toolbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(10),
  },
  toolbarDivider: {
    width: 1,
    height: "60%",
    backgroundColor: "#E5E5E5",
  },
  toolbarBottomDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 0,
    marginTop: 0,
  },
  toolbarText: {
    color: "#FDC500",
    fontWeight: "400",
    fontSize: scale(15),
    marginTop: scale(2),
    textAlign: "center",
  },
  toolbarIcon: {
    width: scale(24.35),
    height: scale(24.35),
    tintColor: "#FDC500",
    marginBottom: scale(2),
  },
  countLabel: {
    alignSelf: "center",
    color: "#888",
    fontSize: scale(15),
    marginBottom: scale(10),
  },
  gridContent: {
    paddingBottom: 100,
  },
  card: {
    flex: 1,
    margin: scale(7),
    backgroundColor: "#fff",
    borderRadius: scale(10),
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    position: "relative",
    minWidth: "44%",
    maxWidth: "48%",
  },
  cardImage: {
    width: "100%",
    height: scale(110),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  cardContent: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  cardName: {
    fontWeight: "400",
    fontSize: scale(16),
    color: "#161616",
    flex: 1,
  },
  heartIcon: {
    width: scale(22),
    height: scale(22),
    tintColor: "#FDC500",
    marginLeft: scale(6),
  },
  cardBrand: {
    color: "#888",
    fontSize: scale(13),
    marginBottom: 2,
  },
  cardPrice: {
    color: "#FDC500",
    fontWeight: "400",
    fontSize: scale(17),
    marginBottom: 2,
  },
  cardOldPrice: {
    color: "#A0A0A0",
    fontSize: scale(13),
    textDecorationLine: "line-through",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: scale(75),
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    paddingHorizontal: scale(5),
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  footerLogo: {
    width: scale(26),
    height: scale(26),
    marginBottom: scale(2),
  },
  footerIcon: {
    width: scale(20),
    height: scale(20),
    marginBottom: scale(2),
    tintColor: "#B6B7B9",
  },
  footerIconActive: {
    tintColor: "#FDC500",
  },
  footerLabel: {
    fontSize: scale(12),
    color: "#B6B7B9",
    fontWeight: "500",
  },
  footerLabelActive: {
    color: "#FDC500",
    fontWeight: "700",
  },
});
