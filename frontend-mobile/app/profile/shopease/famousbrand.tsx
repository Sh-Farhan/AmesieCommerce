// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
// } from "react-native";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");
// const scale = (px: number) => (px / 428) * width;

// const brands = [
//   { name: "ARMANI JEANS", logo: require("../assets/images/armanilogo.png") },
//   { name: "ZARA COLLECTION 19", logo: require("../assets/images/zaralogo.png") },
//   { name: "BURBERRY", logo: require("../assets/images/burberrylogo.png") },
//   { name: "BALENCIAGA", logo: require("../assets/images/balenciagalogo.png") },
//   { name: "VANS OFF THE WALL", logo: require("../assets/images/vanslogo.png") },
//   { name: "GUESS", logo: require("../assets/images/guesslogo.png") },
//   { name: "STONE ISLAND", logo: require("../assets/images/stoneislandlogo.png") },
//   { name: "GIVENCHY PARIS", logo: require("../assets/images/givenchylogo.png") },
// ];

// export default function FamousBrand() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Categories");

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.headerBackWrapper}
//           onPress={() => router.back()}
//           activeOpacity={0.7}
//         >
//           <View style={styles.headerBackCircle}>
//             <Image
//               source={require("../assets/images/back.png")}
//               style={styles.headerBackIcon}
//             />
//           </View>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Famous brand</Text>
//         <View style={styles.headerBackWrapper} /> {/* For right-side symmetry */}
//       </View>

//       {/* Banner */}
//       <View style={styles.banner}>
//         <Image
//         style={styles.bannerImg}
//           source={require("../assets/images/famous-brand-girl.png")}
         
//         />
//         <Text style={styles.bannerText}>Famous Brand</Text>
//         {/* Optional: Add star/decoration images if desired */}
//       </View>

//       {/* Brands grid */}
//       <ScrollView contentContainerStyle={styles.brandsWrap}>
//         <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
//           {brands.map((brand, i) => (
//             <View
//               key={brand.name}
//               style={{
//                 width: "48%",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginVertical: scale(12),
//                 minHeight: scale(52),
//               }}
//             >
//               <Image
//                 source={brand.logo}
//                 style={{ width: scale(140), height: scale(40), resizeMode: "contain" }}
//               />
//               {/* Uncomment this if you want text labels under logos */}
//               {/* <Text style={styles.brandName}>{brand.name}</Text> */}
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Footer */}
//       {/* Footer */}
//             <View style={styles.footer}>
//               <TouchableOpacity style={styles.footerItem}>
//                 <Image source={require("../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
//                 <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
//                 <Image source={require("../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
//                 <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
//                 <Image source={require("../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
//                 <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
//                 <Image source={require("../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
//                 <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
//                 <Image source={require("../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
//                 <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
//                 <Image source={require("../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
//                 <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
//               </TouchableOpacity>
//             </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FDC500",
//     height: scale(72),
//     paddingHorizontal: scale(20),
//     borderBottomWidth: scale(0),
//   },
//   headerBackWrapper: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: scale(50),
//     height: scale(45),
//   },
//   headerBackCircle: {
//     width: scale(44),
//     height: scale(44),
//     borderRadius: scale(22),
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerBackIcon: {
//     width: scale(12),
//     height: scale(24),
//     tintColor: "#222",
//   },
//   headerTitle: {
//     marginLeft:scale(30),
//     fontSize: scale(18),
//     fontWeight: "600",
//     color: "#fff",
//     letterSpacing: 0,
//   },
//   banner: {
//     width: "100%",
//     height: scale(150),
//     backgroundColor: "#B6B7CF",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: scale(20),
//     marginBottom: scale(10),
//   },
//   bannerImg: {
//     width: scale(100),
//     height: scale(145),
//     marginLeft:scale(10),
//     marginRight: scale(65),
//   },
//   bannerText: {
//     fontSize: scale(28),
//     fontWeight: "700",
//     color: "#fff",
//     textAlign: "left",
//     flex: 1,
//   },
//   brandsWrap: {
//     paddingHorizontal: scale(18),
//     paddingBottom: scale(90),
//   },
//   brandName: {
//     marginTop: scale(3),
//     color: "#232323",
//     fontSize: scale(14),
//     fontWeight: "400",
//     textAlign: "center",
//   }, footer: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     height: scale(75),
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     elevation: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -4 },
//     shadowOpacity: 0.10,
//     shadowRadius: 16,
//     paddingHorizontal: scale(5),
//   },
//   footerItem: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   footerLogo: {
//     width: scale(32),
//     height: scale(32),
//     marginBottom: scale(2),
//   },
//   footerIcon: {
//     width: scale(20),
//     height: scale(20),
//     marginBottom: scale(2),
//     tintColor: "#B6B7B9",
//   },
//   footerIconActive: {
//     tintColor: "#FDC500",
//   },
//   footerLabel: {
//     fontSize: scale(12),
//     color: "#B6B7B9",
//     fontWeight: "500",
//   },
//   footerLabelActive: {
//     color: "#FDC500",
//     fontWeight: "700",
//   },
// });
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

// FIXED PATHS
const brands = [
  { name: "ARMANI JEANS", logo: require("../assets/images/armanilogo.png") },
  { name: "ZARA COLLECTION 19", logo: require("../assets/images/zaralogo.png") },
  { name: "BURBERRY", logo: require("../assets/images/burberrylogo.png") },
  { name: "BALENCIAGA", logo: require("../assets/images/balenciagalogo.png") },
  { name: "VANS OFF THE WALL", logo: require("../assets/images/vanslogo.png") },
  { name: "GUESS", logo: require("../assets/images/guesslogo.png") },
  { name: "STONE ISLAND", logo: require("../assets/images/stoneislandlogo.png") },
  { name: "GIVENCHY PARIS", logo: require("../assets/images/givenchylogo.png") },
];

export default function FamousBrand() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Categories");

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
              // FIXED PATH
              source={require("../assets/images/back.png")}
              style={styles.headerBackIcon}
            />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Famous brand</Text>
        <View style={styles.headerBackWrapper} /> {/* For right-side symmetry */}
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Image
          style={styles.bannerImg}
          // FIXED PATH
          source={require("../assets/images/famous-brand-girl.png")}
        />
        <Text style={styles.bannerText}>Famous Brand</Text>
      </View>

      {/* Brands grid */}
      <ScrollView contentContainerStyle={styles.brandsWrap}>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {brands.map((brand) => (
            <View
              key={brand.name}
              style={{
                width: "48%",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: scale(12),
                minHeight: scale(52),
              }}
            >
              <Image
                source={brand.logo}
                style={{ width: scale(140), height: scale(40), resizeMode: "contain" }}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          {/* FIXED PATH */}
          <Image source={require("../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
          {/* FIXED PATH */}
          <Image source={require("../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
          {/* FIXED PATH */}
          <Image source={require("../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
          {/* FIXED PATH */}
          <Image source={require("../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
          {/* FIXED PATH */}
          <Image source={require("../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
          {/* FIXED PATH */}
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
    height: scale(72),
    paddingHorizontal: scale(20),
    borderBottomWidth: scale(0),
  },
  headerBackWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(50),
    height: scale(45),
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
  headerTitle: {
    marginLeft:scale(30),
    fontSize: scale(18),
    fontWeight: "600",
    color: "#fff",
    letterSpacing: 0,
    flex: 1, // Allow title to take up available space
    textAlign: 'center', // Center the title
  },
  banner: {
    width: "100%",
    height: scale(150),
    backgroundColor: "#B6B7CF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
    marginBottom: scale(10),
  },
  bannerImg: {
    width: scale(100),
    height: scale(145),
    marginLeft:scale(10),
    marginRight: scale(65),
  },
  bannerText: {
    fontSize: scale(28),
    fontWeight: "700",
    color: "#fff",
    textAlign: "left",
    flex: 1,
  },
  brandsWrap: {
    paddingHorizontal: scale(18),
    paddingBottom: scale(90),
  },
  brandName: {
    marginTop: scale(3),
    color: "#232323",
    fontSize: scale(14),
    fontWeight: "400",
    textAlign: "center",
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

