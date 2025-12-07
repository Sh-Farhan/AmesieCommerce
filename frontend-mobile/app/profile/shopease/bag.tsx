// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   Platform,
//   SafeAreaView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");
// const scale = (px) => (px / 428) * width;

// const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];
// const QTY_OPTIONS = [1, 2, 3, 4, 5];

// const suggested = [
//   {
//     id: "s1",
//     image: require("../assets/images/girl.png"),
//     name: "Gabriel",
//     desc: "Coco",
//     price: "₹ 500",
//     liked: true,
//   },
//   {
//     id: "s2",
//     image: require("../assets/images/pink-jacket.png"),
//     name: "Gabriel",
//     desc: "Coco",
//     price: "₹ 500",
//     liked: true,
//   },
//   {
//     id: "s3",
//     image: require("../assets/images/black-jacket.png"),
//     name: "Prada",
//     desc: "Black deem",
//     price: "₹ 344.89",
//     liked: true,
//   },
// ];

// const wishlist = [
//   {
//     id: "w1",
//     image: require("../assets/images/shoes1.png"),
//     name: "Brown tight",
//     desc: "Bear",
//     price: "₹ 234.90",
//     liked: true,
//   },
//   {
//     id: "w2",
//     image: require("../assets/images/shoes2.jpg"),
//     name: "Blue candy",
//     desc: "HMT",
//     price: "₹ 500",
//     liked: true,
//   },
//   {
//     id: "w3",
//     image: require("../assets/images/shoes3.jpg"),
//     name: "ZIZI",
//     desc: "Basic mint",
//     price: "₹ 344.89",
//     liked: true,
//   },
// ];


// const initialBagItems = [
//   {
//     id: "1",
//     image: require("../assets/images/product1.png"),
//     name: "Donatello",
//     desc: "Cream elegant",
//     price: "₹ 398.90",
//     oldPrice: "₹ 402.00",
//     size: "XL",
//     quantity: 1,
//   },
//   {
//     id: "2",
//     image: require("../assets/images/product2.png"),
//     name: "Donatello",
//     desc: "Cream elegant",
//     price: "₹ 398.90",
//     oldPrice: "₹ 402.00",
//     size: "XL",
//     quantity: 1,
//   },
//   {
//     id: "3",
//     image: require("../assets/images/product3.png"),
//     name: "Donatello",
//     desc: "Cream elegant",
//     price: "₹ 398.90",
//     oldPrice: "₹ 402.00",
//     size: "XL",
//     quantity: 1,
//   },
//   {
//     id: "4",
//     image: require("../assets/images/product4.png"),
//     name: "Donatello",
//     desc: "Cream elegant",
//     price: "₹ 398.90",
//     oldPrice: "₹ 402.00",
//     size: "XL",
//     quantity: 1,
//   },
// ];

// export default function BagPage() {
//   const [activeTab, setActiveTab] = useState("Bag");
//   const [voucher, setVoucher] = useState("");
//   const [bagItems, setBagItems] = useState(initialBagItems);
//   const router = useRouter();
//   const itemCount = bagItems.length;

//   const [editMode, setEditMode] = useState(false);
//   const [selectedIds, setSelectedIds] = useState(new Set());
//   const [likedIds, setLikedIds] = useState(new Set());

//   const handleSizeChange = (id, value) => {
//     setBagItems(items =>
//       items.map(item =>
//         item.id === id ? { ...item, size: value } : item
//       )
//     );
//   };

//   const handleQuantityChange = (id, value) => {
//     setBagItems(items =>
//       items.map(item =>
//         item.id === id ? { ...item, quantity: value } : item
//       )
//     );
//   };

//   // Toggle edit mode on Edit button press
//   function toggleEditMode() {
//     setEditMode((prev) => !prev);
//     setSelectedIds(new Set());  // Clear selection when toggling mode
//   };

//   // When a checkbox is toggled, add or remove item ID from selectedIds
//   function toggleSelect(id) {
//     setSelectedIds((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) newSet.delete(id);
//       else newSet.add(id);
//       return newSet;
//     });
//   };

//   // Remove all selected items from bagItems
//   function handleRemoveSelected() {
//     setBagItems((items) => items.filter((item) => !selectedIds.has(item.id)));
//     setSelectedIds(new Set());
//     setEditMode(false);
//   };
//   function toggleLike(id) {
//     setLikedIds(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) newSet.delete(id);
//       else newSet.add(id);
//       return newSet;
//     });
//   }

//   // Implement a similar function for Save for Later if needed:
//   // function handleSaveForLater() { ... }
//   if (bagItems.length === 0) {
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//         {/* Your header */}
//         <View style={styles.headerContainer}>
//           <TouchableOpacity
//             style={styles.headerBackWrapper}
//             onPress={() => router.back()}
//             activeOpacity={0.7}
//           >
//             <View style={styles.headerBackCircle}>
//               <Image
//                 source={require("../assets/images/back.png")}
//                 style={styles.headerBackIcon}
//               />
//             </View>
//           </TouchableOpacity>
//           <View style={styles.headerTextBlock}>
//             <Text style={styles.headerBagText}>Bag</Text>
//             <Text style={styles.headerCountText}> ({itemCount} Items)</Text>
//           </View>
//           <TouchableOpacity onPress={toggleEditMode} activeOpacity={0.7}>
//             <Text style={styles.headerEdit}>{editMode ? "Cancel" : "Edit"}</Text>
//           </TouchableOpacity>

//         </View>

//         {/* Empty bag illustration and text */}
//         <View style={styles.emptybagblock}>
//           <Image source={require("../assets/images/empty-bag.png")} style={styles.emptyImage} />
//           <Text style={styles.emptyText}>Your bag is empty</Text>
//           <TouchableOpacity style={styles.shopNowBtn} onPress={() => router.push("/category")}>
//             <Text style={styles.shopNowText}>SHOP NOW</Text>
//           </TouchableOpacity>

//           <View style={styles.toolbarBottomDivider} >


//             {/* Optionally, add recommended products/wishlist */}
//             <View style={styles.suggestionSection}>
//               {/* Suggested Items */}
//               <View style={styles.suggestionRow}>
//                 {suggested.map(item => (
//                   <View key={item.id} style={styles.suggestionCard}>
//                     <Image source={item.image} style={styles.suggestionImg} resizeMode="cover" />
//                     <View style={{ flexDirection: "row", alignItems: "center", width: scale(13),
//     height: scale(12), marginTop:scale(2), }}>
//                       <Text style={styles.suggestionName}>{item.name}</Text>
//                       <TouchableOpacity onPress={() => toggleLike(item.id)}>
//                         <Image
//                           source={
//                             likedIds.has(item.id)
//                               ? require("../assets/images/heart-filled.png")
//                               : require("../assets/images/heart-outline.png")
//                           }
//                           style={styles.heartIcon}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     {item.desc ? <Text style={styles.suggestionDesc}>{item.desc}</Text> : null}
//                     <Text style={[
//                       styles.suggestionPrice,

//                     ]}>{item.price}</Text>
//                     <Text style={styles.cardHeart}>{/* No hearts for this row */}</Text>
//                   </View>
//                 ))}
//               </View>
//             </View>
//             <View style={styles.toolbarBottomDivider} >

//               <Text style={styles.wishlistTitle}>Your wishlist item</Text>
//               <View style={styles.suggestionRow}>
//                 {wishlist.map(item => (
//                   <View key={item.id} style={styles.suggestionCard}>
//                     <Image source={item.image} style={styles.suggestionImg} resizeMode="cover" />
//                     <Text style={styles.suggestionName}>{item.name} {item.liked && <Text style={styles.heart}>♥</Text>}</Text>

//                     <Text style={styles.suggestionDesc}>{item.desc}</Text>
//                     <View style={{ flexDirection: "row", alignItems: "center" }}>
//                       <Text style={[styles.suggestionPrice, { color: "#FDC500" }]}>{item.price}</Text>

//                     </View>
//                   </View>

//                 ))}
//               </View>
//             </View>
//           </View>

//         </View>
//         {/* </View> */}



//         {/* Footer */}
//         <View style={styles.footer}>
//           <TouchableOpacity style={styles.footerItem} >
//             <Image source={require("../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
//             <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
//             <Image source={require("../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
//             <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
//             <Image source={require("../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
//             <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
//             <Image source={require("../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
//             <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
//             <Image source={require("../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
//             <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
//             <Image source={require("../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
//             <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }



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
//         <View style={styles.headerTextBlock}>
//           <Text style={styles.headerBagText}>Bag</Text>
//           <Text style={styles.headerCountText}> ({itemCount} Items)</Text>
//         </View>
//         <TouchableOpacity onPress={toggleEditMode} activeOpacity={0.7}>
//           <Text style={styles.headerEdit}>{editMode ? "Cancel" : "Edit"}</Text>
//         </TouchableOpacity>

//       </View>

//       {/* Main content: items scroll, summary sticks */}
//       <View style={{ flex: 1 }}>
//         <ScrollView contentContainerStyle={{ paddingBottom: "100%" }}>
//           {/* Product Items */}
//           {bagItems.map((item) => (
//             <View key={item.id} style={styles.itemRow}>
//               <View style={styles.itemImgWrap}>
//                 <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
//               </View>
//               <View style={styles.itemCard}>
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.itemDesc}>{item.desc}</Text>
//                   <View style={styles.itemOptions}>
//                     <View style={styles.itemOptionCol}>
//                       <Text style={styles.itemOptionLabel}>Size</Text>
//                       <View style={styles.pickerWrap}>
//                         <Picker
//                           selectedValue={item.size}
//                           onValueChange={value => handleSizeChange(item.id, value)}
//                           mode="dropdown"
//                           style={styles.picker}
//                           dropdownIconColor="#222"
//                         >
//                           {SIZE_OPTIONS.map(s => (
//                             <Picker.Item label={s} value={s} key={s} />
//                           ))}
//                         </Picker>
//                       </View>
//                     </View>
//                     <View style={styles.itemOptionCol}>
//                       <Text style={styles.itemOptionLabel}>Quantity</Text>
//                       <View style={styles.pickerWrap}>
//                         <Picker
//                           selectedValue={item.quantity}
//                           onValueChange={value => handleQuantityChange(item.id, value)}
//                           mode="dropdown"
//                           style={styles.picker}
//                           dropdownIconColor="#222"
//                         >
//                           {QTY_OPTIONS.map(q => (
//                             <Picker.Item label={q.toString()} value={q} key={q} />
//                           ))}
//                         </Picker>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//               <View style={styles.itemSidebar}>
//                 <Text style={styles.itemPrice}>{item.price}</Text>
//                 <Text style={styles.itemOldPrice}>{item.oldPrice}</Text>
//                 {editMode ? (
//                   <TouchableOpacity
//                     onPress={() => toggleSelect(item.id)}
//                     style={styles.checkboxContainer}
//                     activeOpacity={0.7}
//                   >
//                     <View style={[
//                       styles.checkboxBase,
//                       selectedIds.has(item.id) && styles.checkboxChecked
//                     ]}>
//                       {selectedIds.has(item.id) && <Text style={styles.checkboxTick}>✓</Text>}
//                     </View>
//                   </TouchableOpacity>

//                 ) : (
//                   <TouchableOpacity style={styles.trashBtn}>
//                     <Image source={require("../assets/images/trash.png")} style={styles.trashIcon} />
//                   </TouchableOpacity>
//                 )}

//               </View>
//             </View>
//           ))}
//         </ScrollView>

//         {/* Sticky voucher/summary/checkout box */}
//         <View style={styles.stickySummary}>
//           <View style={styles.voucherRow}>
//             <TextInput
//               placeholder="Voucher/gift card"
//               placeholderTextColor="#B6B7B9"
//               style={styles.voucherInput}
//               value={voucher}
//               onChangeText={setVoucher}
//             />
//             <TouchableOpacity style={styles.applyBtn}>
//               <Text style={styles.applyBtnText}>Apply</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Sub total  (4 product)</Text>
//             <Text style={styles.infoValue}>₹ 797.8</Text>
//           </View>
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Shipping</Text>
//             <Text style={{ color: "#777", height: scale(17), width: scale(51), marginRight: 10 }}>FREE</Text>
//           </View>
//           <Text style={styles.shippingSubText}>From OYAYUBI</Text>
//           <View style={styles.divider} />
//           <View style={styles.totalRow}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>₹ 797.8</Text>
//           </View>
//           <TouchableOpacity style={styles.checkoutBtn}>
//             <Text style={styles.checkoutText}>CHECKOUT</Text>
//           </TouchableOpacity>
//           {editMode && (
//             <View style={styles.actionsRow}>
//               <TouchableOpacity
//                 style={[styles.actionBtn, styles.saveBtn]}
//                 // onPress={handleSaveForLater}  // implement if needed
//                 disabled={selectedIds.size === 0}
//               >
//                 <Text style={styles.actionBtnText}>Save for Later</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionBtn, styles.removeBtn]}
//                 onPress={handleRemoveSelected}
//                 disabled={selectedIds.size === 0}
//               >
//                 <Text style={styles.actionBtnText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//         </View>
//       </View>

//       {/* Footer */}
//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/amesie")}>
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
//   headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FDC500",
//     borderTopRightRadius: 0,
//     borderTopLeftRadius: 0,
//     borderBottomLeftRadius: 0,
//     borderBottomRightRadius: 0,
//     height: scale(72),
//     paddingHorizontal: scale(20),
//     justifyContent: "space-between",
//     borderBottomWidth: 2,
//     borderBottomColor: "#fff",
//     marginBottom: scale(10),
//   },
//   headerBackWrapper: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: scale(50),
//     height: scale(54),
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
//   headerTextBlock: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: scale(23), // visually aligns "Bag" with the back button
//     flex: 1,
//   },
//   headerBagText: {
//     fontSize: scale(18.62),
//     fontWeight: "600",
//     color: "#fff",
//     letterSpacing: 0.1,
//     lineHeight: scale(27),
//   },
//   headerCountText: {
//     fontSize: scale(12.55),
//     color: "#fff",
//     fontWeight: "400",
//     opacity: 0.82,
//     marginTop: scale(1),
//     lineHeight: scale(24),
//   },
//   headerEdit: {
//     fontSize: scale(15),
//     color: "#fff",
//     fontWeight: "400",
//     marginRight: scale(0),
//   },
//   itemRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     backgroundColor: "#fff",
//     marginVertical: scale(5),
//     width: scale(427.99),
//     height: scale(102.7),
//     paddingHorizontal: scale(14),

//     // paddingVertical: scale(15),
//   },
//   itemImgWrap: {
//     width: scale(111.85),
//     height: scale(84.46),
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: scale(12),
//     borderWidth: 0,
//     borderColor: "#F2F2F2",
//     overflow: "hidden",
//   },
//   itemImg: {
//     width: scale(111.85),
//     height: scale(84.46),
//     backgroundColor: "#fff",
//   },
//   itemCard: {
//     flexDirection: "row",
//     alignItems: "stretch", // ensures children stretch full height
//     height: scale(84.46),
//     /* other styling */
//   },

//   itemInfo: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   itemName: {
//     fontSize: scale(15),
//     fontWeight: "400",
//     color: "#222",
//     marginBottom: 2,
//   },
//   itemDesc: {
//     fontSize: scale(13),
//     color: "#B6B7B9",
//     marginBottom: scale(6),
//     fontWeight: "400",
//   },
//   itemOptions: {
//     flexDirection: "row",
//   },
//   itemOptionCol: {
//     marginRight: scale(20),
//   },
//   itemOptionLabel: {
//     fontSize: scale(11),
//     color: "#555",
//     fontWeight: "400",
//     marginBottom: 2,
//   },
//   pickerWrap: {
//     borderWidth: 1,
//     fontSize: scale(10),
//     borderColor: "#161616",
//     borderRadius: scale(0),
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     minWidth: scale(39),
//     height: scale(16),

//     justifyContent: "center",
//   },
//   picker: {
//     fontSize: scale(10),
//     height: scale(16),
//     width: "100%",
//     backgroundColor: "transparent",
//     paddingTop: scale(0.75),
//     paddingBottom: scale(0.75),
//     paddingLeft: scale(0.75),
//     paddingRight: scale(0.75),
//     borderWidth: 0,
//     ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
//   },
//   itemSidebar: {
//     alignItems: "flex-end",
//     // justifyContent: "space-between",
//     height: "100%",
//     minHeight: scale(75),
//     marginLeft: scale(100),
//   },
//   itemPrice: {
//     color: "#FDC500",
//     fontWeight: "400",
//     fontSize: scale(14.5),
//   },
//   itemOldPrice: {
//     color: "#AAA",
//     fontSize: scale(9.72),
//     fontWeight: "400",
//     textDecorationLine: "line-through",
//     marginTop: scale(1),
//   },
//   trashBtn: {

//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: scale(32),

//   },
//   trashIcon: {
//     width: scale(17.2),
//     height: scale(17.2),
//     tintColor: "#B5B5B5",
//   },
//   stickySummary: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: scale(75), // height of footer
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#EEE',
//     paddingBottom: scale(8),
//     zIndex: 10,
//     // adjust height as needed, e.g. minHeight: scale(160),
//   },
//   voucherRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: scale(427.99),
//     height: scale(44.51),
//     marginBottom: scale(10),
//     backgroundColor: "#E7E7E7",
//     borderRadius: scale(0),
//     padding: 3,
//   },
//   voucherInput: {
//     flex: 1,
//     fontSize: scale(10.27),
//     color: "#A4A4A4",
//     backgroundColor: "#FFFFFF",
//     fontWeight: "400",
//     fontFamily: "Sen",
//     width: scale(299.03),
//     height: scale(25.11),
//     marginLeft: scale(10),
//     marginRight: scale(10),
//     padding: scale(9),
//     ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
//   },
//   applyBtn: {
//     backgroundColor: "#FDC500",
//     borderRadius: scale(6),
//     width: scale(83.32),
//     height: scale(25.11),
//     paddingHorizontal: scale(25),
//     paddingVertical: scale(9),
//     marginVertical: scale(3),
//     marginRight: scale(10),
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   applyBtnText: {
//     color: "#FFFFFF",
//     fontWeight: "600",
//     fontSize: scale(12.55),

//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: scale(15),

//   },
//   infoLabel: {
//     fontSize: scale(10.27),
//     color: "#000000",
//     fontWeight: "500",
//     height: scale(12),

//   },
//   infoValue: {
//     fontSize: scale(16),
//     color: "#000000",
//     fontWeight: "400",
//     width: scale(51),
//     height: scale(22),
//     marginRight: scale(10),

//   },
//   shippingSubText: {
//     marginLeft: scale(15),
//     marginTop: 1,
//     fontSize: scale(6.85),
//     color: "#777777",
//     fontWeight: "400",
//     height: scale(8),
//   },
//   divider: {
//     height: scale(0.8),
//     backgroundColor: "#A4A4A4",
//     marginVertical: scale(19),
//     width: "100%",
//     alignSelf: "center",
//   },
//   totalRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginHorizontal: scale(15),
//     marginBottom: scale(10),
//   },
//   totalLabel: {
//     fontSize: scale(18),
//     fontWeight: "500",
//     height: scale(18),
//     color: "#222",
//   },
//   totalValue: {
//     fontSize: scale(18),
//     fontWeight: "500",
//     color: "#FDC500",
//   },
//   checkoutBtn: {
//     backgroundColor: "#FDC500",
//     marginHorizontal: scale(15),
//     borderRadius: scale(10),
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: scale(14),
//     marginTop: scale(6),
//     height: scale(61),
//     width: scale(394)
//   },
//   checkoutText: {
//     color: "#fff",
//     fontSize: scale(18),
//     fontWeight: "700",
//     letterSpacing: 1,
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
//   checkboxContainer: {
//     padding: 5,
//     marginTop: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   checkboxBase: {
//     width: scale(15),
//     height: scale(15),
//     borderWidth: 2,
//     borderColor: "#BBB",
//     borderRadius: scale(4),
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   checkboxChecked: {
//     backgroundColor: "#22B573",  // vivid green as in example
//     borderColor: "#22B573",
//   },

//   checkboxTick: {
//     color: "#fff",
//     fontSize: scale(10),
//     fontWeight: "bold",
//     lineHeight: scale(10),
//     textAlign: "center",
//   },
//   checkboxInner: {
//     width: scale(12),
//     height: scale(12),
//     backgroundColor: "#fff",
//     borderRadius: scale(2),
//   },

//   // emptyContainer: {
//   //   flex: 1,

//   //   paddingHorizontal: scale(20),
//   //   backgroundColor: "#fff",
//   // },
//   emptybagblock: {
//     flex: 1,

//     alignItems: "center",
//   },
//   emptyHeader: {
//     fontSize: scale(20),
//     fontWeight: "600",
//     color: "#222",
//     paddingVertical: scale(15),
//     textAlign: "center",
//   },
//   emptyImage: {
//     width: scale(196),
//     height: scale(139),
//     marginVertical: scale(0),
//   },
//   emptyText: {
//     fontSize: scale(16.7),
//     width: scale(146),
//     height: scale(20),
//     color: "#474747",
//     marginBottom: scale(25),
//     fontWeight: "500",
//   },
//   shopNowBtn: {
//     backgroundColor: "#FDC500",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: scale(5.22),
//     width: scale(141),
//     height: scale(35),
//   },
//   shopNowText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: scale(13),
//   },
//   actionsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 4,
//     marginBottom: 12,
//     gap: 10,
//   },
//   actionBtn: {
//     flex: 1,
//     borderRadius: scale(6),
//     alignItems: "center",
//     justifyContent: "center",
//     width: scale(180),
//     height: scale(39),
//     marginLeft: scale(10),
//     marginTop: scale(10),
//     marginRight: scale(10),

//   },
//   saveBtn: {
//     backgroundColor: "#FF244178",
//     marginRight: 10,
//   },
//   removeBtn: {
//     backgroundColor: "#FE4F3C",
//     marginLeft: 0,
//   },
//   actionBtnDisabled: {
//   },
//   actionBtnText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 16,
//   },
//   suggestionSection: {
//     width: "100%",
//     marginTop: 12,
//     paddingHorizontal: 8,
//     justifyContent: "space-between",
//   },
//   suggestionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 0,
//     marginBottom: 8,
//   },
//   suggestionCard: {
//     flex: 1,
//     backgroundColor: "#fff",

//     borderRadius: scale(3.13),
//     justifyContent: "center",
//     alignContent: "center",

//     width: scale(126.26),
//     height: scale(155.48),
//     shadowColor: "#222",
//     shadowOpacity: 0.03,
//     shadowRadius: 3,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 1,
//     borderWidth: 1,
//     borderColor: "#F2F2F2",
//   },
//   suggestionImg: {
//     width: scale(126.26),
//     height: scale(96),

//   },
//   suggestionName: {
//     fontSize: scale(9.39),
//     fontWeight: "600",
//     color: "#232323",
    
//     marginBottom: scale(1),
//     marginLeft:scale(5),
//     marginRight: scale(62),
//     justifyContent: "space-between",
//   },
//   suggestionDesc: {
//     fontSize: scale(8.34),
//     color: "#B6B7B9",
//     marginBottom: scale(1),
//     marginLeft: scale(5),
//   },
//   suggestionPrice: {
//     fontSize: scale(9.39),
//     color: "#FDC500",
//     fontWeight: "400",
//     marginVertical: scale(1),
//     marginLeft: scale(5),
//   },
//   wishlistTitle: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#FDC500",
//     marginLeft: 5,
//     marginTop: 6,
//     marginBottom: 2,
//     alignSelf: "flex-start",
//   },
//   heart: {
//     color: "#FE4228",
//     fontSize: scale(13),
//     marginTop: 0,
//   },
//   heartIcon: {
//     width: scale(13),
//     height: scale(12),
//     tintColor: "#FDC500",
//     marginTop:scale(1),
    
//   },
//   cardHeart: { fontSize: 12, height: 12 }, // spacer for grid alignment
//   toolbarBottomDivider: {
//     width: scale(400.43),
//     height: scale(0.2),
//     backgroundColor: "#A4A4A4",
//     marginHorizontal: 0,
//     marginTop: scale(10),
//     justifyContent: "space-between",

//   }




// });

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const scale = (px) => (px / 428) * width;

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL"];
const QTY_OPTIONS = [1, 2, 3, 4, 5];

const suggested = [
  {
    id: "s1",
    image: require("../../../assets/images/girl.png"),
    name: "Gabriel",
    desc: "Coco",
    price: "₹ 500",
    liked: true,
  },
  {
    id: "s2",
    image: require("../../../assets/images/pink-jacket.png"),
    name: "Gabriel",
    desc: "Coco",
    price: "₹ 500",
    liked: true,
  },
  {
    id: "s3",
    image: require("../../../assets/images/black-jacket.png"),
    name: "Prada",
    desc: "Black deem",
    price: "₹ 344.89",
    liked: true,
  },
];

const wishlist = [
  {
    id: "w1",
    image: require("../../../assets/images/shoes1.png"),
    name: "Brown tight",
    desc: "Bear",
    price: "₹ 234.90",
    liked: true,
  },
  {
    id: "w2",
    image: require("../../../assets/images/shoes2.jpg"),
    name: "Blue candy",
    desc: "HMT",
    price: "₹ 500",
    liked: true,
  },
  {
    id: "w3",
    image: require("../../../assets/images/shoes3.jpg"),
    name: "ZIZI",
    desc: "Basic mint",
    price: "₹ 344.89",
    liked: true,
  },
];


const initialBagItems = [
  {
    id: "1",
    image: require("../../../assets/images/product1.png"),
    name: "Donatello",
    desc: "Cream elegant",
    price: "₹ 398.90",
    oldPrice: "₹ 402.00",
    size: "XL",
    quantity: 1,
  },
  {
    id: "2",
    // FIXED PATH
    image: require("../../../assets/images/product2.png"),
    name: "Donatello",
    desc: "Cream elegant",
    price: "₹ 398.90",
    oldPrice: "₹ 402.00",
    size: "XL",
    quantity: 1,
  },
  {
    id: "3",
    // FIXED PATH
    image: require("../../../assets/images/product3.png"),
    name: "Donatello",
    desc: "Cream elegant",
    price: "₹ 398.90",
    oldPrice: "₹ 402.00",
    size: "XL",
    quantity: 1,
  },
  {
    id: "4",
    // FIXED PATH
    image: require("../../../assets/images/product4.png"),
    name: "Donatello",
    desc: "Cream elegant",
    price: "₹ 398.90",
    oldPrice: "₹ 402.00",
    size: "XL",
    quantity: 1,
  },
];

export default function BagPage() {
  const [activeTab, setActiveTab] = useState("Bag");
  const [voucher, setVoucher] = useState("");
  const [bagItems, setBagItems] = useState(initialBagItems);
  const router = useRouter();
  const itemCount = bagItems.length;

  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [likedIds, setLikedIds] = useState(new Set());

  const handleSizeChange = (id, value) => {
    setBagItems(items =>
      items.map(item =>
        item.id === id ? { ...item, size: value } : item
      )
    );
  };

  const handleQuantityChange = (id, value) => {
    setBagItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: value } : item
      )
    );
  };

  // Toggle edit mode on Edit button press
  function toggleEditMode() {
    setEditMode((prev) => !prev);
    setSelectedIds(new Set());   // Clear selection when toggling mode
  };

  // When a checkbox is toggled, add or remove item ID from selectedIds
  function toggleSelect(id) {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Remove all selected items from bagItems
  function handleRemoveSelected() {
    setBagItems((items) => items.filter((item) => !selectedIds.has(item.id)));
    setSelectedIds(new Set());
    setEditMode(false);
  };
  function toggleLike(id) {
    setLikedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }

  // Implement a similar function for Save for Later if needed:
  // function handleSaveForLater() { ... }
  if (bagItems.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Your header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerBackWrapper}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <View style={styles.headerBackCircle}>
              <Image
                // FIXED PATH
                source={require("../../../assets/images/back.png")}
                style={styles.headerBackIcon}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerBagText}>Bag</Text>
            <Text style={styles.headerCountText}> ({itemCount} Items)</Text>
          </View>
          <TouchableOpacity onPress={toggleEditMode} activeOpacity={0.7}>
            <Text style={styles.headerEdit}>{editMode ? "Cancel" : "Edit"}</Text>
          </TouchableOpacity>

        </View>

        {/* Empty bag illustration and text */}
        <View style={styles.emptybagblock}>
          {/* FIXED PATH */}
          <Image source={require("../../../assets/images/empty-bag.png")} style={styles.emptyImage} />
          <Text style={styles.emptyText}>Your bag is empty</Text>
          <TouchableOpacity style={styles.shopNowBtn} onPress={() => router.push("/category")}>
            <Text style={styles.shopNowText}>SHOP NOW</Text>
          </TouchableOpacity>

          <View style={styles.toolbarBottomDivider} >


            {/* Optionally, add recommended products/wishlist */}
            <View style={styles.suggestionSection}>
              {/* Suggested Items */}
              <View style={styles.suggestionRow}>
                {suggested.map(item => (
                  <View key={item.id} style={styles.suggestionCard}>
                    <Image source={item.image} style={styles.suggestionImg} resizeMode="cover" />
                    <View style={{ flexDirection: "row", alignItems: "center", width: scale(13),
    height: scale(12), marginTop:scale(2), }}>
                      <Text style={styles.suggestionName}>{item.name}</Text>
                      <TouchableOpacity onPress={() => toggleLike(item.id)}>
                        <Image
                          source={
                            likedIds.has(item.id)
                              // FIXED PATH
                              ? require("../../../assets/images/heart-filled.png")
                              // FIXED PATH
                              : require("../../../assets/images/heart-outline.png")
                          }
                          style={styles.heartIcon}
                        />
                      </TouchableOpacity>
                    </View>
                    {item.desc ? <Text style={styles.suggestionDesc}>{item.desc}</Text> : null}
                    <Text style={[
                      styles.suggestionPrice,

                    ]}>{item.price}</Text>
                    <Text style={styles.cardHeart}>{/* No hearts for this row */}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.toolbarBottomDivider} >

              <Text style={styles.wishlistTitle}>Your wishlist item</Text>
              <View style={styles.suggestionRow}>
                {wishlist.map(item => (
                  <View key={item.id} style={styles.suggestionCard}>
                    <Image source={item.image} style={styles.suggestionImg} resizeMode="cover" />
                    <Text style={styles.suggestionName}>{item.name} {item.liked && <Text style={styles.heart}>♥</Text>}</Text>

                    <Text style={styles.suggestionDesc}>{item.desc}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={[styles.suggestionPrice, { color: "#FDC500" }]}>{item.price}</Text>

                    </View>
                  </View>

                ))}
              </View>
            </View>
          </View>

        </View>
        {/* </View> */}



        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem} >
            {/* FIXED PATH */}
            <Image source={require("../../../assets/images/logo.png")} style={[styles.footerLogo, activeTab === "Amesie" && styles.footerIconActive]} />
            <Text style={[styles.footerLabel, activeTab === "Amesie" && styles.footerLabelActive]}>Amesie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/")}>
            {/* FIXED PATH */}
            <Image source={require("../../../assets/images/home-active.png")} style={[styles.footerIcon, activeTab === "Home" && styles.footerIconActive]} />
            <Text style={[styles.footerLabel, activeTab === "Home" && styles.footerLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/category")}>
            {/* FIXED PATH */}
            <Image source={require("../../../assets/images/category.png")} style={[styles.footerIcon, activeTab === "Categories" && styles.footerIconActive]} />
            <Text style={[styles.footerLabel, activeTab === "Categories" && styles.footerLabelActive]}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/bag")}>
            {/* FIXED PATH */}
            <Image source={require("../../../assets/images/bag.png")} style={[styles.footerIcon, activeTab === "Bag" && styles.footerIconActive]} />
            <Text style={[styles.footerLabel, activeTab === "Bag" && styles.footerLabelActive]}>Bag</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/wishlist")}>
            {/* FIXED PATH */}
            <Image source={require("../../../assets/images/heart.png")} style={[styles.footerIcon, activeTab === "Wishlist" && styles.footerIconActive]} />
            <Text style={[styles.footerLabel, activeTab === "Wishlist" && styles.footerLabelActive]}>Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem} onPress={() => router.push("/account")}>
            {/* FIXED PATH */}
            <Image source={require("../../../assets/images/account.png")} style={[styles.footerIcon, activeTab === "Account" && styles.footerIconActive]} />
            <Text style={[styles.footerLabel, activeTab === "Account" && styles.footerLabelActive]}>Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
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
              // FIXED PATH
              source={require("../../../assets/images/back.png")}
              style={styles.headerBackIcon}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.headerTextBlock}>
          <Text style={styles.headerBagText}>Bag</Text>
          <Text style={styles.headerCountText}> ({itemCount} Items)</Text>
        </View>
        <TouchableOpacity onPress={toggleEditMode} activeOpacity={0.7}>
          <Text style={styles.headerEdit}>{editMode ? "Cancel" : "Edit"}</Text>
        </TouchableOpacity>

      </View>

      {/* Main content: items scroll, summary sticks */}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: "100%" }}>
          {/* Product Items */}
          {bagItems.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemImgWrap}>
                <Image source={item.image} style={styles.itemImg} resizeMode="contain" />
              </View>
              <View style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                  <View style={styles.itemOptions}>
                    <View style={styles.itemOptionCol}>
                      <Text style={styles.itemOptionLabel}>Size</Text>
                      <View style={styles.pickerWrap}>
                        <Picker
                          selectedValue={item.size}
                          onValueChange={value => handleSizeChange(item.id, value)}
                          mode="dropdown"
                          style={styles.picker}
                          dropdownIconColor="#222"
                        >
                          {SIZE_OPTIONS.map(s => (
                            <Picker.Item label={s} value={s} key={s} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                    <View style={styles.itemOptionCol}>
                      <Text style={styles.itemOptionLabel}>Quantity</Text>
                      <View style={styles.pickerWrap}>
                        <Picker
                          selectedValue={item.quantity}
                          onValueChange={value => handleQuantityChange(item.id, value)}
                          mode="dropdown"
                          style={styles.picker}
                          dropdownIconColor="#222"
                        >
                          {QTY_OPTIONS.map(q => (
                            <Picker.Item label={q.toString()} value={q} key={q} />
                          ))}
                        </Picker>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.itemSidebar}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemOldPrice}>{item.oldPrice}</Text>
                {editMode ? (
                  <TouchableOpacity
                    onPress={() => toggleSelect(item.id)}
                    style={styles.checkboxContainer}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.checkboxBase,
                      selectedIds.has(item.id) && styles.checkboxChecked
                    ]}>
                      {selectedIds.has(item.id) && <Text style={styles.checkboxTick}>✓</Text>}
                    </View>
                  </TouchableOpacity>

                ) : (
                  <TouchableOpacity style={styles.trashBtn}>
                    {/* FIXED PATH */}
                    <Image source={require("../../../assets/images/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                )}

              </View>
            </View>
          ))}
        </ScrollView>

        {/* Sticky voucher/summary/checkout box */}
        <View style={styles.stickySummary}>
          <View style={styles.voucherRow}>
            <TextInput
              placeholder="Voucher/gift card"
              placeholderTextColor="#B6B7B9"
              style={styles.voucherInput}
              value={voucher}
              onChangeText={setVoucher}
            />
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sub total  (4 product)</Text>
            <Text style={styles.infoValue}>₹ 797.8</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shipping</Text>
            <Text style={{ color: "#777", height: scale(17), width: scale(51), marginRight: 10 }}>FREE</Text>
          </View>
          <Text style={styles.shippingSubText}>From OYAYUBI</Text>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹ 797.8</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>CHECKOUT</Text>
          </TouchableOpacity>
          {editMode && (
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.saveBtn]}
                // onPress={handleSaveForLater}  // implement if needed
                disabled={selectedIds.size === 0}
              >
                <Text style={styles.actionBtnText}>Save for Later</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.removeBtn]}
                onPress={handleRemoveSelected}
                disabled={selectedIds.size === 0}
              >
                <Text style={styles.actionBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}

        </View>
      </View>

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
    alignItems: "flex-start",
    backgroundColor: "#fff",
    marginVertical: scale(5),
    width: scale(427.99),
    height: scale(102.7),
    paddingHorizontal: scale(14),

    // paddingVertical: scale(15),
  },
  itemImgWrap: {
    width: scale(111.85),
    height: scale(84.46),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
    borderWidth: 0,
    borderColor: "#F2F2F2",
    overflow: "hidden",
  },
  itemImg: {
    width: scale(111.85),
    height: scale(84.46),
    backgroundColor: "#fff",
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "stretch", // ensures children stretch full height
    height: scale(84.46),
    /* other styling */
  },

  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: scale(15),
    fontWeight: "400",
    color: "#222",
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: scale(13),
    color: "#B6B7B9",
    marginBottom: scale(6),
    fontWeight: "400",
  },
  itemOptions: {
    flexDirection: "row",
  },
  itemOptionCol: {
    marginRight: scale(20),
  },
  itemOptionLabel: {
    fontSize: scale(11),
    color: "#555",
    fontWeight: "400",
    marginBottom: 2,
  },
  pickerWrap: {
    borderWidth: 1,
    fontSize: scale(10),
    borderColor: "#161616",
    borderRadius: scale(0),
    overflow: "hidden",
    backgroundColor: "#fff",
    minWidth: scale(39),
    height: scale(16),

    justifyContent: "center",
  },
  picker: {
    fontSize: scale(10),
    height: scale(16),
    width: "100%",
    backgroundColor: "transparent",
    paddingTop: scale(0.75),
    paddingBottom: scale(0.75),
    paddingLeft: scale(0.75),
    paddingRight: scale(0.75),
    borderWidth: 0,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  itemSidebar: {
    alignItems: "flex-end",
    // justifyContent: "space-between",
    height: "100%",
    minHeight: scale(75),
    marginLeft: scale(100),
  },
  itemPrice: {
    color: "#FDC500",
    fontWeight: "400",
    fontSize: scale(14.5),
  },
  itemOldPrice: {
    color: "#AAA",
    fontSize: scale(9.72),
    fontWeight: "400",
    textDecorationLine: "line-through",
    marginTop: scale(1),
  },
  trashBtn: {

    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(32),

  },
  trashIcon: {
    width: scale(17.2),
    height: scale(17.2),
    tintColor: "#B5B5B5",
  },
  stickySummary: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scale(75), // height of footer
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingBottom: scale(8),
    zIndex: 10,
    // adjust height as needed, e.g. minHeight: scale(160),
  },
  voucherRow: {
    flexDirection: "row",
    alignItems: "center",
    width: scale(427.99),
    height: scale(44.51),
    marginBottom: scale(10),
    backgroundColor: "#E7E7E7",
    borderRadius: scale(0),
    padding: 3,
  },
  voucherInput: {
    flex: 1,
    fontSize: scale(10.27),
    color: "#A4A4A4",
    backgroundColor: "#FFFFFF",
    fontWeight: "400",
    fontFamily: "Sen",
    width: scale(299.03),
    height: scale(25.11),
    marginLeft: scale(10),
    marginRight: scale(10),
    padding: scale(9),
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  applyBtn: {
    backgroundColor: "#FDC500",
    borderRadius: scale(6),
    width: scale(83.32),
    height: scale(25.11),
    paddingHorizontal: scale(25),
    paddingVertical: scale(9),
    marginVertical: scale(3),
    marginRight: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: scale(12.55),

  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(15),

  },
  infoLabel: {
    fontSize: scale(10.27),
    color: "#000000",
    fontWeight: "500",
    height: scale(12),

  },
  infoValue: {
    fontSize: scale(16),
    color: "#000000",
    fontWeight: "400",
    width: scale(51),
    height: scale(22),
    marginRight: scale(10),

  },
  shippingSubText: {
    marginLeft: scale(15),
    marginTop: 1,
    fontSize: scale(6.85),
    color: "#777777",
    fontWeight: "400",
    height: scale(8),
  },
  divider: {
    height: scale(0.8),
    backgroundColor: "#A4A4A4",
    marginVertical: scale(19),
    width: "100%",
    alignSelf: "center",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: scale(15),
    marginBottom: scale(10),
  },
  totalLabel: {
    fontSize: scale(18),
    fontWeight: "500",
    height: scale(18),
    color: "#222",
  },
  totalValue: {
    fontSize: scale(18),
    fontWeight: "500",
    color: "#FDC500",
  },
  checkoutBtn: {
    backgroundColor: "#FDC500",
    marginHorizontal: scale(15),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(14),
    marginTop: scale(6),
    height: scale(61),
    width: scale(394)
  },
  checkoutText: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "700",
    letterSpacing: 1,
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
  checkboxContainer: {
    padding: 5,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBase: {
    width: scale(15),
    height: scale(15),
    borderWidth: 2,
    borderColor: "#BBB",
    borderRadius: scale(4),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#22B573",   // vivid green as in example
    borderColor: "#22B573",
  },

  checkboxTick: {
    color: "#fff",
    fontSize: scale(10),
    fontWeight: "bold",
    lineHeight: scale(10),
    textAlign: "center",
  },
  checkboxInner: {
    width: scale(12),
    height: scale(12),
    backgroundColor: "#fff",
    borderRadius: scale(2),
  },

  // emptyContainer: {
  //   flex: 1,

  //   paddingHorizontal: scale(20),
  //   backgroundColor: "#fff",
  // },
  emptybagblock: {
    flex: 1,

    alignItems: "center",
  },
  emptyHeader: {
    fontSize: scale(20),
    fontWeight: "600",
    color: "#222",
    paddingVertical: scale(15),
    textAlign: "center",
  },
  emptyImage: {
    width: scale(196),
    height: scale(139),
    marginVertical: scale(0),
  },
  emptyText: {
    fontSize: scale(16.7),
    width: scale(146),
    height: scale(20),
    color: "#474747",
    marginBottom: scale(25),
    fontWeight: "500",
  },
  shopNowBtn: {
    backgroundColor: "#FDC500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(5.22),
    width: scale(141),
    height: scale(35),
  },
  shopNowText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: scale(13),
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 12,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    borderRadius: scale(6),
    alignItems: "center",
    justifyContent: "center",
    width: scale(180),
    height: scale(39),
    marginLeft: scale(10),
    marginTop: scale(10),
    marginRight: scale(10),

  },
  saveBtn: {
    backgroundColor: "#FF244178",
    marginRight: 10,
  },
  removeBtn: {
    backgroundColor: "#FE4F3C",
    marginLeft: 0,
  },
  actionBtnDisabled: {
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  suggestionSection: {
    width: "100%",
    marginTop: 12,
    paddingHorizontal: 8,
    justifyContent: "space-between",
  },
  suggestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    marginBottom: 8,
  },
  suggestionCard: {
    flex: 1,
    backgroundColor: "#fff",

    borderRadius: scale(3.13),
    justifyContent: "center",
    alignContent: "center",

    width: scale(126.26),
    height: scale(155.48),
    shadowColor: "#222",
    shadowOpacity: 0.03,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F2F2F2",
  },
  suggestionImg: {
    width: scale(126.26),
    height: scale(96),

  },
  suggestionName: {
    fontSize: scale(9.39),
    fontWeight: "600",
    color: "#232323",
    
    marginBottom: scale(1),
    marginLeft:scale(5),
    marginRight: scale(62),
    justifyContent: "space-between",
  },
  suggestionDesc: {
    fontSize: scale(8.34),
    color: "#B6B7B9",
    marginBottom: scale(1),
    marginLeft: scale(5),
  },
  suggestionPrice: {
    fontSize: scale(9.39),
    color: "#FDC500",
    fontWeight: "400",
    marginVertical: scale(1),
    marginLeft: scale(5),
  },
  wishlistTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FDC500",
    marginLeft: 5,
    marginTop: 6,
    marginBottom: 2,
    alignSelf: "flex-start",
  },
  heart: {
    color: "#FE4228",
    fontSize: scale(13),
    marginTop: 0,
  },
  heartIcon: {
    width: scale(13),
    height: scale(12),
    tintColor: "#FDC500",
    marginTop:scale(1),
    
  },
  cardHeart: { fontSize: 12, height: 12 }, // spacer for grid alignment
  toolbarBottomDivider: {
    width: scale(400.43),
    height: scale(0.2),
    backgroundColor: "#A4A4A4",
    marginHorizontal: 0,
    marginTop: scale(10),
    justifyContent: "space-between",

  }




});