// import React, { useState } from "react";
// import { View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView, } from "react-native";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");
// const scale = (px: number) => (px / 428) * width;

// export default function HomeScreen() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Home");

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome</Text>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/product")}
//       >
//         <Text style={styles.buttonText}>Go to Product Page</Text>
//       </TouchableOpacity>

//     <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/discount")}
//       >
//         <Text style={styles.buttonText}>Go to Discount Page</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/popularsearch")}
//       >
//         <Text style={styles.buttonText}>Go to Popular Search Page</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/searchresult")}
//       >
//         <Text style={styles.buttonText}>Go to Search Result Page</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/category")}
//       >
//         <Text style={styles.buttonText}>Go to Category Page</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => router.push("/bag")}
//       >
//         <Text style={styles.buttonText}>Go to Bag Page</Text>
//       </TouchableOpacity>
//       </View>

//             {/* Footer */}
//                   <View style={styles.footer}>
//                     <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/amesie")}>
//                       <Image source={require("../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
//                       <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
//                       <Image source={require("../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
//                       <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
//                       <Image source={require("../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
//                       <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
//                       <Image source={require("../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
//                       <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
//                       <Image source={require("../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
//                       <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
//                       <Image source={require("../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
//                       <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
//                     </TouchableOpacity>
//                   </View>

    
//     </SafeAreaView>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f8f9fa",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
  
//   footer: {
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

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/product")}
        >
          <Text style={styles.buttonText}>Go to Product Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/discount")}
        >
          <Text style={styles.buttonText}>Go to Discount Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/popularsearch")}
        >
          <Text style={styles.buttonText}>Go to Popular Search Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/searchresult")}
        >
          <Text style={styles.buttonText}>Go to Search Result Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/category")}
        >
          <Text style={styles.buttonText}>Go to Category Page</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/bag")}
        >
          <Text style={styles.buttonText}>Go to Bag Page</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/amesie")}>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10, // Added margin for spacing between buttons
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
    shadowOpacity: 0.1,
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
