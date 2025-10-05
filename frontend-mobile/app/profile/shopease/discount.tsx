// import React, { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     ScrollView,
//     FlatList,
//     StyleSheet,
//     Dimensions,
//     SafeAreaView,Modal,
// } from "react-native";
// import { Platform } from "react-native";
// import { useRouter } from "expo-router";


// const { width: screenWidth } = Dimensions.get("window");
// const scale = (px: number) => (px / 428) * screenWidth;

// const categoriesList = [
//     { label: "Shoes", color: "#FF2F36" },
//     { label: "High heels", color: "#FF895D" },
//     { label: "Dress", color: "#FF98B7" },
//     { label: "Watch & Accessories", color: "#8D7EFF" },
//     { label: "Bag", color: "#36A1FF" },
// ];

// const products = [
//     { id: "1", image: require("../assets/images/Rectangle-59-2.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
//     { id: "2", image: require("../assets/images/Rectangle-60-2.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
//     { id: "3", image: require("../assets/images/Rectangle-60-1.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
//     { id: "4", image: require("../assets/images/Rectangle-60.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
//     { id: "5", image: require("../assets/images/Rectangle-59.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
// ];

// const popularSearches = [
//     "Dust Jeans", "Brielle Jeans", "Lots Jeans", "Les catino", "EVERBEAST",
//     "Obermain", "Tocco", "Philipe Jourdan", "Under Armour", "New Era",
//     "Adidas Black Edition", "Urban State",
// ];

// function formatTime(num: number) {
//     return num.toString().padStart(2, "0");
// }

// export default function Discount() {
//     const [timer, setTimer] = React.useState<{ h: number; m: number; s: number }>({ h: 2, m: 24, s: 9 });
//     const [likedIds, setLikedIds] = React.useState<Set<string>>(new Set());
//     const [searchFocused, setSearchFocused] = React.useState(false);
//     const [activeTab, setActiveTab] = React.useState("Home");  // Added active tab state
//     const router = useRouter();
//     const [showAd, setShowAd] = useState(false);
//     useEffect(() => {
//     const timerHandle = setTimeout(() => setShowAd(true), 1000); // Show after 5 seconds
//     return () => clearTimeout(timerHandle);
//   }, []);

//     React.useEffect(() => {
//         const interval = setInterval(() => {
//             setTimer((prev) => {
//                 let { h, m, s } = prev;
//                 if (s > 0) s--;
//                 else if (m > 0) {
//                     m--;
//                     s = 59;
//                 } else if (h > 0) {
//                     h--;
//                     m = 59;
//                     s = 59;
//                 }
//                 return { h, m, s };
//             });
//         }, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     function toggleLike(id: string) {
//         setLikedIds((prev) => {
//             const newSet = new Set(prev);
//             if (newSet.has(id)) newSet.delete(id);
//             else newSet.add(id);
//             return newSet;
//         });
//     }

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.pageContainer} showsVerticalScrollIndicator={false}>
//                 {/* Search bar */}
//                 <View style={styles.searchBar}>
//                     <Image source={require("../assets/images/Search.png")} style={styles.searchIcon} />
//                     <TextInput
//                         placeholder="Search what you need"
//                         placeholderTextColor="#969598"
//                         style={styles.searchInput}
//                         underlineColorAndroid="transparent"
//                         selectionColor="#969598"
//                         onFocus={() => { router.push('/popularsearch'); setSearchFocused(true); }}
//                         onBlur={() => { setSearchFocused(false); }}
//                     />
//                     <Image source={require("../assets/images/Group.png")} style={styles.micIcon} />
//                 </View>

//                 {/* Timer */}
//                 <View style={styles.timerContainer}>
//   <Text style={styles.timerText}>Discount ends in</Text>
//   <View style={styles.timerBoxes}>
//     <View style={styles.timerBox}>
//       <Text style={styles.timerValue}>{formatTime(timer.h)}</Text>
//     </View>
//     <Text style={styles.timerSeparator}>:</Text>
//     <View style={styles.timerBox}>
//       <Text style={styles.timerValue}>{formatTime(timer.m)}</Text>
//     </View>
//     <Text style={styles.timerSeparator}>:</Text>
//     <View style={styles.timerBox}>
//       <Text style={styles.timerValue}>{formatTime(timer.s)}</Text>
//     </View>
//   </View>
// </View>


//                 {/* Category List */}
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow} style={{ marginBottom: scale(10) }}>
//                     {categoriesList.map((cat) => (
//                         <View key={cat.label} style={[styles.categoryPill, { backgroundColor: cat.color }]}>
//                             <Text style={styles.categoryLabel}>{cat.label}</Text>
//                         </View>
//                     ))}
//                 </ScrollView>

//                 {/* Product List */}
//                 <FlatList
//                     data={products}
//                     keyExtractor={(item) => item.id}
//                     numColumns={2}
//                     contentContainerStyle={styles.productsGrid}
//                     scrollEnabled={false}
//                     renderItem={({ item }) => (
//                         <View style={styles.card}>
//                             <Image source={item.image} style={styles.productImage} resizeMode="contain" />
//                             <View style={styles.productInfo}>
//                                 <View style={styles.productInfoTop}>
//                                     <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
//                                     <TouchableOpacity onPress={() => toggleLike(item.id)}>
//                                         <Image
//                                             source={likedIds.has(item.id) ? require("../assets/images/heart-filled.png") : require("../assets/images/heart-outline.png")}
//                                             style={styles.heartIconInline}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                                 <Text style={styles.productBrand} numberOfLines={1}>{item.brand}</Text>
//                                 <Text style={styles.productPrice}>{item.price}</Text>
//                                 <Text style={styles.productOldPrice}>{item.oldPrice}</Text>
//                             </View>
//                         </View>
//                     )}
//                 />
//             </ScrollView>

//                           {/* Ad Popup Modal */}
//      <Modal visible={showAd} transparent animationType="fade" onRequestClose={() => setShowAd(false)}>
//   <View style={styles.adOverlay}>
//     <View style={styles.adPopup}>
//       <TouchableOpacity
//         style={styles.adCloseButton}
//         onPress={() => setShowAd(false)}
//         hitSlop={{ top: 13, bottom: 13, left: 13, right: 13 }}
//       >
//         <Image
//           source={require("../assets/images/Vector.png")}
//           style={styles.adCloseIcon}
//         />
//       </TouchableOpacity>
//       <Image
//         source={require("../assets/images/addpopup.png")}
//         style={styles.adImage}
//         resizeMode="contain"
//       />
//     </View>
//   </View>
// </Modal>




//             {/* Footer Tab Bar */}
//              <View style={styles.footer}>
//                           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/amesie")}>
//                             <Image source={require("../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
//                             <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
//                             <Image source={require("../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
//                             <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
//                             <Image source={require("../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
//                             <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
//                             <Image source={require("../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
//                             <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
//                             <Image source={require("../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
//                             <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
//                           </TouchableOpacity>
//                           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
//                             <Image source={require("../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
//                             <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
//                           </TouchableOpacity>
//                         </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     pageContainer: {
//         paddingBottom: scale(90),
//         paddingTop: scale(10),
//         paddingHorizontal: scale(14),
//     },
//     searchBar: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#F8F8F8",
//         borderRadius: scale(18),
//         paddingHorizontal: scale(18),
//         paddingVertical: scale(10),
//         marginBottom: scale(16),
//         width: "100%",
//         minHeight: 44,
//     },
//     searchIcon: {
//         width: scale(17),
//         height: scale(17),
//         marginRight: scale(10),
//         tintColor: "#969598",
//     },
//     micIcon: {
//         width: scale(15),
//         height: scale(20),
//         marginLeft: scale(10),
//         tintColor: "#969598",
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: scale(17),
//         color: "#4C4C4C",
//         backgroundColor: "transparent",
//         paddingVertical: scale(6),
//         borderWidth: 0,
//         ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
//     },
//     timerContainer: {
//   flexDirection: "row",
//   alignItems: "center",
//   paddingHorizontal: scale(10),
//   marginTop: scale(10),
//   marginBottom: scale(10),
// },
// timerText: {
//   fontSize: scale(16),
//   fontWeight: "600",
//   color: "#222",
//   marginRight: scale(12),
// },
// timerBoxes: {
//   flexDirection: "row",
//   alignItems: "center",
// },
// timerBox: {
//   backgroundColor: "#FCC72C", // yellow
//   borderRadius: scale(6),
//   paddingHorizontal: scale(10),
//   paddingVertical: scale(5),
//   marginHorizontal: scale(1),
// },
// timerValue: {
//   color: "#fff",                 // white text
//   fontWeight: "700",
//   fontSize: scale(15),
// },
// timerSeparator: {
//   marginHorizontal: scale(2.5),
//   color: "#FCC72C",
//   fontWeight: "700",
//   fontSize: scale(16),
//   // No background, visually same as the box yellow
// },

//     toolbar: {
//         flexDirection: "row",
//         justifyContent: "center",
//         backgroundColor: "#fff",
//         marginHorizontal: 0,
//         marginTop: scale(10),
//         marginBottom: scale(5),
//     },
//     toolbarItem: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         paddingVertical: scale(10),
//     },
//     toolbarDivider: {
//         width: 1,
//         height: "60%",
//         backgroundColor: "#E5E5E5",
//         opacity: 1,
//         alignSelf: "center",
//     },
//     toolbarBottomDivider: {
//         height: 1,
//         backgroundColor: "#E5E5E5",
//         width: "100%",
//         marginTop: scale(5),
//     },
//     toolbarIcon: {
//         width: scale(23),
//         height: scale(23),
//         tintColor: "#FDC900",
//         marginBottom: scale(5),
//     },
//     toolbarText: {
//         fontSize: scale(13),
//         fontWeight: "600",
//         color: "#FDC900",
//         textAlign: "center",
//     },
    
//     countLabel: {
//         color: "#999",
//         fontSize: scale(14),
//         textAlign: "center",
//         marginBottom: scale(10),
//     },
//     categoryRow: {
//         flexDirection: "row",
//         marginVertical: scale(8),
//     },
//     categoryPill: {
//         minWidth: scale(90),
//         paddingVertical: scale(6),
//         paddingHorizontal: scale(16),
//         borderRadius: scale(16),
//         marginRight: scale(10),
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     categoryLabel: {
//         color: "white",
//         fontSize: scale(13),
//         fontWeight: "600",
//     },
//     productsGrid: {
//         paddingBottom: scale(160),
//     },
//     card: {
//         flex: 1,
//         margin: scale(7),
//         backgroundColor: "white",
//         borderRadius: scale(16),
//         shadowColor: "#000",
//         shadowOpacity: 0.12,
//         shadowRadius: scale(8),
//         elevation: 3,
//         overflow: "hidden",
//         minWidth: "44%",
//         maxWidth: "48%",
//     },
//     productImage: {
//         width: "100%",
//         height: scale(160),
//         borderTopLeftRadius: scale(16),
//         borderTopRightRadius: scale(16),
//         resizeMode: "cover",
//     },
//     productInfo: {
//         paddingVertical: scale(12),
//         paddingHorizontal: scale(14),
//     },
//     productInfoTop: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     productTitle: {
//         fontWeight: "600",
//         fontSize: scale(16),
//         color: "#222",
//         flexShrink: 1,
//         marginRight: scale(8),
//     },
//     heartIconInline: {
//         width: scale(22),
//         height: scale(22),
//         tintColor: "#FFD600",
//     },
//     productBrand: {
//         fontWeight: "600",
//         fontSize: scale(14),
//         color: "#999",
//         marginTop: scale(4),
//     },
//     productPrice: {
//         fontWeight: "700",
//         fontSize: scale(18),
//         color: "#FDC900",
//         marginTop: scale(8),
//     },
//     productOldPrice: {
//         fontSize: scale(14),
//         color: "#AAA",
//         textDecorationLine: "line-through",
//     },
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
//   adOverlay: {
//   flex: 1,
//   backgroundColor: 'rgba(0,0,0,0.40)',
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// adPopup: {
//   borderRadius: 24,
//   padding: 0,
//   width: scale(321),
//   // height is auto based on image, but you could set maxHeight if needed
// //   elevation: 22,
// //   shadowColor: "#000",
//   shadowOpacity: 0.18,
//   shadowRadius: 16,
//   alignItems: 'center',
//   overflow: 'visible',
// },
// adImage: {
//   width: scale(310),
//   height: scale(310),
//   borderRadius: 24,
// },
// adCloseButton: {
//   position: 'absolute',
//   top: scale(0),
//   right: scale(0),
//   zIndex: 3,
//   width: scale(32),
//   height: scale(32),
//   borderRadius: scale(16),
//   borderColor: "#ffffffff",
//   alignItems: 'center',
//   justifyContent: 'center',
//   elevation: 2,
//   shadowColor: "#ffffffff",
//   shadowOpacity: 0.12,
//   shadowRadius: 5,
// },
// adCloseIcon: {
//   width: scale(25),
//   height: scale(25),
//   opacity: 0.85,
//   borderColor: "transparent",
// },

// });
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    Dimensions,
    SafeAreaView,Modal,
} from "react-native";
import { Platform } from "react-native";
import { useRouter } from "expo-router";


const { width: screenWidth } = Dimensions.get("window");
const scale = (px: number) => (px / 428) * screenWidth;

const categoriesList = [
    { label: "Shoes", color: "#FF2F36" },
    { label: "High heels", color: "#FF895D" },
    { label: "Dress", color: "#FF98B7" },
    { label: "Watch & Accessories", color: "#8D7EFF" },
    { label: "Bag", color: "#36A1FF" },
];

// All paths here are now correct
const products = [
    { id: "1", image: require("../assets/images/Rectangle-59-2.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
    { id: "2", image: require("../assets/images/Rectangle-60-2.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
    { id: "3", image: require("../assets/images/Rectangle-60-1.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
    { id: "4", image: require("../assets/images/Rectangle-60.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
    { id: "5", image: require("../assets/images/Rectangle-59.png"), name: "Dust Jeans", brand: "Kotty", price: "₹ 398.90",  oldPrice: "₹ 402.90" },
];

const popularSearches = [
    "Dust Jeans", "Brielle Jeans", "Lots Jeans", "Les catino", "EVERBEAST",
    "Obermain", "Tocco", "Philipe Jourdan", "Under Armour", "New Era",
    "Adidas Black Edition", "Urban State",
];

function formatTime(num: number) {
    return num.toString().padStart(2, "0");
}

export default function Discount() {
    const [timer, setTimer] = React.useState<{ h: number; m: number; s: number }>({ h: 2, m: 24, s: 9 });
    const [likedIds, setLikedIds] = React.useState<Set<string>>(new Set());
    const [searchFocused, setSearchFocused] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState("Home");  // Added active tab state
    const router = useRouter();
    const [showAd, setShowAd] = useState(false);
    useEffect(() => {
    const timerHandle = setTimeout(() => setShowAd(true), 1000); // Show after 1 second
    return () => clearTimeout(timerHandle);
  }, []);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                let { h, m, s } = prev;
                if (s > 0) s--;
                else if (m > 0) {
                    m--;
                    s = 59;
                } else if (h > 0) {
                    h--;
                    m = 59;
                    s = 59;
                }
                return { h, m, s };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function toggleLike(id: string) {
        setLikedIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.pageContainer} showsVerticalScrollIndicator={false}>
                {/* Search bar */}
                <View style={styles.searchBar}>
                    <Image source={require("../assets/images/Search.png")} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search what you need"
                        placeholderTextColor="#969598"
                        style={styles.searchInput}
                        underlineColorAndroid="transparent"
                        selectionColor="#969598"
                        onFocus={() => { router.push('/popularsearch'); setSearchFocused(true); }}
                        onBlur={() => { setSearchFocused(false); }}
                    />
                    <Image source={require("../assets/images/Group.png")} style={styles.micIcon} />
                </View>

                {/* Timer */}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>Discount ends in</Text>
                    <View style={styles.timerBoxes}>
                        <View style={styles.timerBox}>
                            <Text style={styles.timerValue}>{formatTime(timer.h)}</Text>
                        </View>
                        <Text style={styles.timerSeparator}>:</Text>
                        <View style={styles.timerBox}>
                            <Text style={styles.timerValue}>{formatTime(timer.m)}</Text>
                        </View>
                        <Text style={styles.timerSeparator}>:</Text>
                        <View style={styles.timerBox}>
                            <Text style={styles.timerValue}>{formatTime(timer.s)}</Text>
                        </View>
                    </View>
                </View>


                {/* Category List */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow} style={{ marginBottom: scale(10) }}>
                    {categoriesList.map((cat) => (
                        <View key={cat.label} style={[styles.categoryPill, { backgroundColor: cat.color }]}>
                            <Text style={styles.categoryLabel}>{cat.label}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* Product List */}
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.productsGrid}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                            <View style={styles.productInfo}>
                                <View style={styles.productInfoTop}>
                                    <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
                                    <TouchableOpacity onPress={() => toggleLike(item.id)}>
                                        <Image
                                            source={likedIds.has(item.id) ? require("../assets/images/heart-filled.png") : require("../assets/images/heart-outline.png")}
                                            style={styles.heartIconInline}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.productBrand} numberOfLines={1}>{item.brand}</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                                <Text style={styles.productOldPrice}>{item.oldPrice}</Text>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>

            {/* Ad Popup Modal */}
            <Modal visible={showAd} transparent animationType="fade" onRequestClose={() => setShowAd(false)}>
                <View style={styles.adOverlay}>
                    <View style={styles.adPopup}>
                        <TouchableOpacity
                            style={styles.adCloseButton}
                            onPress={() => setShowAd(false)}
                            hitSlop={{ top: 13, bottom: 13, left: 13, right: 13 }}
                        >
                            <Image
                                source={require("../assets/images/Vector.png")}
                                style={styles.adCloseIcon}
                            />
                        </TouchableOpacity>
                        <Image
                            source={require("../assets/images/addpopup.png")}
                            style={styles.adImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Modal>

            {/* Footer Tab Bar */}
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

// Your styles object remains the same
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    pageContainer: {
        paddingBottom: scale(90),
        paddingTop: scale(10),
        paddingHorizontal: scale(14),
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        borderRadius: scale(18),
        paddingHorizontal: scale(18),
        paddingVertical: scale(10),
        marginBottom: scale(16),
        width: "100%",
        minHeight: 44,
    },
    searchIcon: {
        width: scale(17),
        height: scale(17),
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
    timerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(10),
        marginTop: scale(10),
        marginBottom: scale(10),
    },
    timerText: {
        fontSize: scale(16),
        fontWeight: "600",
        color: "#222",
        marginRight: scale(12),
    },
    timerBoxes: {
        flexDirection: "row",
        alignItems: "center",
    },
    timerBox: {
        backgroundColor: "#FCC72C", // yellow
        borderRadius: scale(6),
        paddingHorizontal: scale(10),
        paddingVertical: scale(5),
        marginHorizontal: scale(1),
    },
    timerValue: {
        color: "#fff",                         // white text
        fontWeight: "700",
        fontSize: scale(15),
    },
    timerSeparator: {
        marginHorizontal: scale(2.5),
        color: "#FCC72C",
        fontWeight: "700",
        fontSize: scale(16),
    },
    categoryRow: {
        flexDirection: "row",
        marginVertical: scale(8),
    },
    categoryPill: {
        minWidth: scale(90),
        paddingVertical: scale(6),
        paddingHorizontal: scale(16),
        borderRadius: scale(16),
        marginRight: scale(10),
        alignItems: "center",
        justifyContent: "center",
    },
    categoryLabel: {
        color: "white",
        fontSize: scale(13),
        fontWeight: "600",
    },
    productsGrid: {
        paddingBottom: scale(160),
    },
    card: {
        flex: 1,
        margin: scale(7),
        backgroundColor: "white",
        borderRadius: scale(16),
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: scale(8),
        elevation: 3,
        overflow: "hidden",
        minWidth: "44%",
        maxWidth: "48%",
    },
    productImage: {
        width: "100%",
        height: scale(160),
        borderTopLeftRadius: scale(16),
        borderTopRightRadius: scale(16),
        resizeMode: "cover",
    },
    productInfo: {
        paddingVertical: scale(12),
        paddingHorizontal: scale(14),
    },
    productInfoTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    productTitle: {
        fontWeight: "600",
        fontSize: scale(16),
        color: "#222",
        flexShrink: 1,
        marginRight: scale(8),
    },
    heartIconInline: {
        width: scale(22),
        height: scale(22),
        tintColor: "#FFD600",
    },
    productBrand: {
        fontWeight: "600",
        fontSize: scale(14),
        color: "#999",
        marginTop: scale(4),
    },
    productPrice: {
        fontWeight: "700",
        fontSize: scale(18),
        color: "#FDC900",
        marginTop: scale(8),
    },
    productOldPrice: {
        fontSize: scale(14),
        color: "#AAA",
        textDecorationLine: "line-through",
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
    adOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.40)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    adPopup: {
        borderRadius: 24,
        padding: 0,
        width: scale(321),
        shadowOpacity: 0.18,
        shadowRadius: 16,
        alignItems: 'center',
        overflow: 'visible',
    },
    adImage: {
        width: scale(310),
        height: scale(310),
        borderRadius: 24,
    },
    adCloseButton: {
        position: 'absolute',
        top: scale(0),
        right: scale(0),
        zIndex: 3,
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        borderColor: "#ffffffff",
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: "#ffffffff",
        shadowOpacity: 0.12,
        shadowRadius: 5,
    },
    adCloseIcon: {
        width: scale(25),
        height: scale(25),
        opacity: 0.85,
        borderColor: "transparent",
    },
});