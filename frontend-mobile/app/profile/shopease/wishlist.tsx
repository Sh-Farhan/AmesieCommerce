import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const scale = (px: number) => (px / 428) * width;






export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
  {
    id: "1",
    image: require("../assets/images/dress.png"),
    name: "Pull and deer",
    desc: "Fancy",
    price: "₹ 234.90",
  },
  {
    id: "2",
    image: require("../assets/images/glasses.png"),
    name: "Pull and deer",
    desc: "Fancy",
    price: "₹ 234.90",
  },
  {
    id: "3",
    image: require("../assets/images/pink-jacket.png"),
    name: "Pull and deer",
    desc: "Fancy",
    price: "₹ 234.90",
  },
]);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Wishlist");
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  // Toggle edit mode on Edit button press
  function toggleEditMode() {
    setEditMode((prev) => !prev);
    setSelectedIds(new Set());  // Clear selection when toggling mode
  };
  function handleDeleteItem(itemId) {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerBackWrapper}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <View style={styles.headerBackCircle}>
            <Image
              source={require("../assets/images/back.png")}
              style={styles.headerBackIcon}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.headerTextBlock}>
          <Text style={styles.headerBagText}>Wishlist</Text>

        </View>
        <TouchableOpacity onPress={toggleEditMode} activeOpacity={0.7}>
          <Text style={styles.headerEdit}>{editMode ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>

      </View>



    {wishlistItems.length === 0 ? (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: scale(350)  }}>
    <Image
      source={require("../assets/images/empty-bag-happy.png")}
      style={{ width: scale(156), height: scale(102), marginBottom: scale(10) }} // Adjust as needed
      resizeMode="contain"
    />
    <Text style={{
      fontSize: scale(20), color: "#474747", fontWeight: "500",
      marginTop: scale(10), marginBottom: scale(14),
    }}>
      Your wishlist is empty
    </Text>
    <TouchableOpacity 
      style={{
        backgroundColor: "#FDC500", borderRadius: 6, width: scale(176), height: scale(43),
        alignItems: "center", justifyContent: "center"
      }}
      activeOpacity={0.8}
      onPress={() => router.push("/category")}
    >
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>SHOP NOW</Text>
    </TouchableOpacity>
  </View>
) : (
  <ScrollView contentContainerStyle={{ paddingBottom: "100%" }}
      >
        {wishlistItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemContent}>
              <View style={styles.itemHeaderRow}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <TouchableOpacity style={styles.trashBtn} activeOpacity={0.7}
                  onPress={() => handleDeleteItem(item.id)}>
                  <Image
                    source={require("../assets/images/trash.png")}
                    style={styles.trashIcon}
                  />
                </TouchableOpacity>

              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <TouchableOpacity style={styles.addToBagBtn} activeOpacity={0.7}>
                <Text style={styles.addToBagText}>ADD TO BAG</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
)}



      {/* Wishlist Items */}
      

      {/* Footer */}
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Image source={require("../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
          <Image source={require("../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
          <Image source={require("../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
          <Image source={require("../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
          <Image source={require("../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
          <Image source={require("../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDC500",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: scale(72),
    paddingHorizontal: scale(20),
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginBottom: scale(10),
  },
  headerBackWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(50),
    height: scale(54),
  },
  headerBackCircle: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackIcon: {
    width: scale(12),
    height: scale(24),
    tintColor: "#222",
  },
  headerTextBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(23), // visually aligns "Bag" with the back button
    flex: 1,
  },
  headerBagText: {
    fontSize: scale(18.62),
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0.1,
    lineHeight: scale(27),
  },
  headerCountText: {
    fontSize: scale(12.55),
    color: "#fff",
    fontWeight: "400",
    opacity: 0.82,
    marginTop: scale(1),
    lineHeight: scale(24),
  },
  headerEdit: {
    fontSize: scale(15),
    color: "#fff",
    fontWeight: "400",
    marginRight: scale(0),
  },
  itemRow: {
    flexDirection: "row",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderColor: "#ECECEC",
    alignItems: "center",
  },
  itemImage: {
    width: scale(164),
    height: scale(192),
    borderRadius: scale(4),
    marginRight: scale(12),
    backgroundColor: "#fff",
    resizeMode: "contain",
  },
  itemContent: {
    flex: 1,
    justifyContent: "center",
  },
  itemHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: scale(18.22),
    fontWeight: "400",
    color: "#232323",
  },
  itemDesc: {
    fontSize: scale(15.94),
    color: "#B6B7B9",
    marginTop: scale(4),
    fontWeight: "400",
  },
  trashBtn: {
    padding: scale(6),
  },
  trashIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: "#B6B7B9",
    resizeMode: "contain",
  },
  itemPrice: {
    fontSize: scale(20.5),
    fontWeight: "400",
    color: "#FDC500",
    marginVertical: scale(10),
    marginBottom: scale(40),
  },
  addToBagBtn: {
    backgroundColor: "#FDC500",
    height: scale(40),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(4),
  },
  addToBagText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    bottom: 0,
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
    width: scale(32),
    height: scale(32),
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
