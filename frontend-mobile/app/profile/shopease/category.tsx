// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   Platform,
// } from "react-native";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");
// const scale = (px) => (px / 428) * width;

// const categories = [
//   {
//     id: "1",
//     title: "New Product",
//     backgroundColor: "#FF3B74",
//     image: require("../assets/images/newproduct.png"),
//     path:"newproduct",
//   },
//   {
//     id: "2",
//     title: "Famous Brand",
//     backgroundColor: "#878491",
//     image: require("../assets/images/famousbrand.png"),
//     path:"famousbrand",
//   },
//   {
//     id: "3",
//     title: "Muslim Dress",
//     backgroundColor: "#FFB94B",
//     image: require("../assets/images/muslimdress.png"),
//     path:"muslimdress",
//   },
//   {
//     id: "4",
//     title: "Sport",
//     backgroundColor: "#FA8252",
//     image: require("../assets/images/sports.png"),
//     path:"sport",
//   },
//   {
//     id: "5",
//     title: "Muslim Dress",
//     backgroundColor: "#FF47E1",
//     image: require("../assets/images/muslimdress2.png"),
//     path:"muslimdress",
//   },
//   {
//     id: "6",
//     title: "Sport",
//     backgroundColor: "#56F0E2",
//     image: require("../assets/images/sports2.png"),
//     path:"sport",
//   },
// ];

// export default function CategoryPage() {
//   const [activeTab, setActiveTab] = useState("Categories");
//   const router = useRouter();

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//       {/* Search Bar */}
//       <View style={styles.searchBar}>
//         <Image source={require("../assets/images/Search.png")} style={styles.searchIcon} />
//         <TextInput
//           placeholder="Search what you need"
//           placeholderTextColor="#969598"
//           style={styles.searchInput}
//           underlineColorAndroid="transparent"
//           selectionColor="#969598"
//         />
//         <TouchableOpacity>
//           <Image source={require("../assets/images/Group.png")} style={styles.micIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Categories Grid */}
//       <FlatList
//   data={categories}
//   keyExtractor={(item) => item.id}
//   numColumns={2}
//   showsVerticalScrollIndicator={false}
//   contentContainerStyle={styles.gridContainer}
//   renderItem={({ item }) => (
//     <TouchableOpacity onPress={() => router.push(`/${item.path}`)}
// >

//    <View style={[styles.categoryCard, { backgroundColor: item.backgroundColor }]}>
//   <Image
//     source={item.image}
//     style={styles.avatarImg}
//     resizeMode="cover" // makes image start strictly at the bottom and fill upward
//   />
//   <Text style={styles.categoryTitle}>{item.title}</Text>
// </View>
// </TouchableOpacity>


//   )}
// />


//       {/* Footer */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.footerItem} >
//           <Image source={require("../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
//           <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
//           <Image source={require("../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
//           <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
//           <Image source={require("../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
//           <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
//           <Image source={require("../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
//           <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
//           <Image source={require("../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
//           <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
//           <Image source={require("../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
//           <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   searchBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F8F8F8",
//     borderRadius: scale(15),
//     marginHorizontal: scale(18),
//     marginVertical: scale(14),
//     paddingHorizontal: scale(14),
//     paddingVertical: scale(8),
//     height:scale(53),
//   },
//   searchIcon: {
//     width: scale(18),
//     height: scale(18),
//     marginRight: scale(12),
//     tintColor: "#969598",
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: scale(17),
//     color: "#4C4C4C",
//     backgroundColor: "transparent",
//     paddingVertical: scale(3),
//     borderWidth: 0,
//     ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
//   },
//   micIcon: {
//     width: scale(16),
//     height: scale(20),
//     marginLeft: scale(10),
//     tintColor: "#969598",
//   },
//   gridContainer: {
//     paddingHorizontal: scale(20),
//     paddingBottom: scale(100),
//     marginLeft:scale(5),
//   },
//   categoryCard: {
//   flex: 1,
//   aspectRatio: 1,
//   margin: 1,             // 1px margin between cards
//   width:scale(184),
//   height:scale(248),
// //   overflow: "hidden",
//   justifyContent: "flex-end",
//   position: "relative",
//   backgroundColor: "#ccc", // fallback, will be overridden
// },
// avatarImg: {
//   position: "absolute",
//   left: 0,
//   right: 0,
//   bottom: 0,
//   width: "100%",
//   height: "80%", // Adjust: 0.65 to 0.75 for more/less vertical fill
//   zIndex: 1,
// },
// categoryTitle: {
//   color: "#fff",
//   fontWeight: "bold",
//   fontSize: scale(18),
//   position: "absolute",
//   bottom: scale(20),        // distance from bottom
//   left: 0,
//   width: "100%",
//   textAlign: "center",      // center text horizontally
//   zIndex: 2,
//   textShadowColor: "rgba(0,0,0,0.18)",
//   textShadowOffset: { width: 0, height: 2 },
//   textShadowRadius: 4,
// },


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
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const scale = (px) => (px / 428) * width;

// FIXED PATHS
const categories = [
  {
    id: "1",
    title: "New Product",
    backgroundColor: "#FF3B74",
    image: require("../../../assets/images/newproduct.png"),
    path:"newproduct",
  },
  {
    id: "2",
    title: "Famous Brand",
    backgroundColor: "#878491",
    image: require("../../../assets/images/famousbrand.png"),
    path:"famousbrand",
  },
  {
    id: "3",
    title: "Muslim Dress",
    backgroundColor: "#FFB94B",
    image: require("../../../assets/images/muslimdress.png"),
    path:"muslimdress",
  },
  {
    id: "4",
    title: "Sport",
    backgroundColor: "#FA8252",
    image: require("../../../assets/images/sports.png"),
    path:"sport",
  },
  {
    id: "5",
    title: "Muslim Dress",
    backgroundColor: "#FF47E1",
    image: require("../../../assets/images/muslimdress2.png"),
    path:"muslimdress",
  },
  {
    id: "6",
    title: "Sport",
    backgroundColor: "#56F0E2",
    image: require("../../../assets/images/sports2.png"),
    path:"sport",
  },
];

export default function CategoryPage() {
  const [activeTab, setActiveTab] = useState("Categories");
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        {/* FIXED PATH */}
        <Image source={require("../../../assets/images/Search.png")} style={styles.searchIcon} />
        <TextInput
          placeholder="Search what you need"
          placeholderTextColor="#969598"
          style={styles.searchInput}
          underlineColorAndroid="transparent"
          selectionColor="#969598"
        />
        <TouchableOpacity>
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/Group.png")} style={styles.micIcon} />
        </TouchableOpacity>
      </View>

      {/* Categories Grid */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/profile/shopease/${item.path}`)}>
            <View style={[styles.categoryCard, { backgroundColor: item.backgroundColor }]}>
              <Image
                source={item.image}
                style={styles.avatarImg}
                resizeMode="cover" 
              />
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem} >
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/profile/shopease/")}>
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/profile/shopease/category")}>
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/profile/shopease/bag")}>
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/profile/shopease/wishlist")}>
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/profile/shopease/account")}>
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
          <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Your styles object remains the same
const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: scale(15),
    marginHorizontal: scale(18),
    marginVertical: scale(14),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    height:scale(53),
  },
  searchIcon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(12),
    tintColor: "#969598",
  },
  searchInput: {
    flex: 1,
    fontSize: scale(17),
    color: "#4C4C4C",
    backgroundColor: "transparent",
    paddingVertical: scale(3),
    borderWidth: 0,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  micIcon: {
    width: scale(16),
    height: scale(20),
    marginLeft: scale(10),
    tintColor: "#969598",
  },
  gridContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(100),
    marginLeft:scale(5),
  },
  categoryCard: {
  flex: 1,
  aspectRatio: 1,
  margin: 1,             // 1px margin between cards
  width:scale(184),
  height:scale(248),
//   overflow: "hidden",
  justifyContent: "flex-end",
  position: "relative",
  backgroundColor: "#ccc", // fallback, will be overridden
},
avatarImg: {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "80%", // Adjust: 0.65 to 0.75 for more/less vertical fill
  zIndex: 1,
},
categoryTitle: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: scale(18),
  position: "absolute",
  bottom: scale(20),        // distance from bottom
  left: 0,
  width: "100%",
  textAlign: "center",      // center text horizontally
  zIndex: 2,
  textShadowColor: "rgba(0,0,0,0.18)",
  textShadowOffset: { width: 0, height: 2 },
  textShadowRadius: 4,
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