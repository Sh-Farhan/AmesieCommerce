import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform, FlatList
} from "react-native";
import { useRouter } from "expo-router";


const { width } = Dimensions.get("window");
const scale = (px) => (px / 428) * width;

const bannerData = [
  {
    id: "1",
    image: require("../../../assets/images/home-1.png")
  },
  {
    id: "1",
    image: require("../../../assets/images/home-2.webp"),
    discount: "Discount of all types of cosmetics",
    offer: "Up to 45 %",
    info: "only on the night sale 10-13 October",
  },

];

const promosData = [
  { id: "1", image: require("../../../assets/images/Rectangle-26-2.png") },
  { id: "2", image: require("../../../assets/images/Rectangle-34-2.png") },
  { id: "3", image: require("../../../assets/images/Rectangle-26-2.png") },
];

const PRODUCTS = [
  {
    id: 'p1',
    image: require("../../../assets/images/sandals.png"),
    name: "Donatello",
    brand: "Cream elegant",
    price: "₹ 399.90",
    oldPrice: "₹ 400.00",
  },
  {
    id: 'p2',
    image: require("../../../assets/images/pinkbag.png"),
    name: "Hermes",
    brand: "Antelope",
    price: "₹ 400.00",
    oldPrice: "₹ 456.00",
  },
  {
    id: 'p3',
    image: require("../../../assets/images/bluefrok.png"),
    name: "Dior",
    brand: "Donker deep",
    price: "₹ 134.89",
    oldPrice: "₹ 185.90",
  },
];

const SHOES = [
  {
    id: 's1',
    image: require("../../../assets/images/shoes1.png"),
    name: "Donatello",
    brand: "Cream elegant",
    price: "₹ 399.90",
    oldPrice: "₹ 400.00",
  },
  {
    id: 's2',
    image: require("../../../assets/images/shoes2.jpg"),
    name: "Hermes",
    brand: "Antelope",
    price: "₹ 400.00",
    oldPrice: "₹ 456.00",
  },
  {
    id: 's3',
    image: require("../../../assets/images/shoes3.jpg"),
    name: "Dior",
    brand: "Donker deep",
    price: "₹ 134.89",
    oldPrice: "₹ 185.90",
  },
];


export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Home");
  const router = useRouter();
  const [likedIds, setLikedIds] = useState(new Set());

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const toggleLiketwo = (id) => {
    setLikedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // function ProductCard({ item, liked, toggleLike }) {
  //   return (
  //     <View style={styles.card}>
  //       <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
  //       <View style={styles.cardContent}>
  //         <View style={styles.cardTitleRow}>
  //           <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
  //           <TouchableOpacity onPress={() => toggleLike(item.id)}>
  //             <Image
  //               source={
  //                 liked
  //                   ? require("../../../assets/images/heart-filled.png")
  //                   : require("../../../assets/images/heart-outline.png")
  //               }
  //               style={styles.heartIcon}
  //             />
  //           </TouchableOpacity>
  //         </View>
  //         <Text style={styles.cardBrand}>{item.brand}</Text>
  //         <View style={styles.cardPriceRow}>
  //           <Text style={styles.cardPrice}>{item.price}</Text>
  //           <Text style={styles.cardOldPrice}>{item.oldPrice}</Text>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={{
        width: scale(428),
        height: scale(187),
        backgroundColor: "#fdc500",
        paddingTop: 18,
        paddingHorizontal: 16,
      }}>

        {/* Top row: drawer, logo stack, bell */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          {/* Drawer circle box */}
          <View style={{
            width: scale(45),
            height: scale(45),
            borderRadius: 25,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
            marginRight: scale(10),
            marginBottom: scale(20)
          }}>
            <TouchableOpacity>
              <Image source={require("../../../assets/images/drawericon.png")} style={{ width: scale(24), height: scale(24), resizeMode: "contain" }} />
            </TouchableOpacity>
          </View>

          {/* Vertical stack box: Amesie, DELIVER TO, Location */}
          <View style={{
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginRight: scale(10),
          }}>
            <View style={{ marginBottom: scale(10) }}>
              <View style={{ marginTop: scale(10) }}>
                <Image source={require("../../../assets/images/Amesielogo.png")} style={{ width: scale(87), height: scale(25.28), resizeMode: "contain" }} />
              </View>
            </View>
            <View style={{ marginBottom: scale(1) }}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: scale(12), letterSpacing: 1 }}>
                DELIVER TO
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#232323", fontWeight: "500", fontSize: scale(12) }}>Location</Text>
              <Image source={require("../../../assets/images/arrow.png")} style={{ width: scale(5), height: scale(5), marginLeft: scale(5) }} />
            </View>
          </View>

          {/* Bell icon box */}
          <View style={{
            position: "relative",
            width: scale(40),
            height: scale(40),
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Image
              source={require("../../../assets/images/bell.png")}
              style={{ width: scale(20), height: scale(22.01), resizeMode: "contain" }}
            />
            <View style={{
              position: "absolute",
              top: 2, // Position lower if needed
              right: 4, // Position further right if needed
              backgroundColor: "#fff",
              borderRadius: scale(10),
              width: scale(15),
              height: scale(15),
              justifyContent: "center",
              alignItems: "center",
              elevation: 2, // subtle shadow, optional
              zIndex: 5,    // ensures on top of bell
            }}>
              <Text style={{
                color: "#232323",
                fontWeight: "bold",
                fontSize: scale(13),
                textAlign: "center",
              }}>
                3
              </Text>
            </View>
          </View>



        </View>

        {/* Search bar box below the above container */}
        <View style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          alignItems: "center",
          marginTop: scale(14),
          marginLeft: scale(10),
          paddingHorizontal: scale(13),
          width: scale(376),
          height: scale(53),
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          borderRadius: scale(10),
        }}>

          <Image source={require("../../../assets/images/Search.png")} style={{ width: scale(20), height: scale(20), tintColor: "#C6C6C8" }} />
          {/* <TouchableOpacity  onPress={() => router.push("/profile/shopease/popularsearch")}> */}
          <TextInput
            placeholder="Search what you need"
            style={{ flex: 1, fontSize: 15, marginLeft: scale(10), marginRight: scale(90), color: "#707070", ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}), }}
            placeholderTextColor="#A8A8AA"
            underlineColorAndroid="transparent"
            onFocus={() => { router.push('/profile/shopease/popularsearch'); }}
          />

          {/* </TouchableOpacity> */}
          <Image source={require("../../../assets/images/Group.png")} style={{ width: scale(20), height: scale(20), tintColor: "#C6C6C8" }} />

        </View>

      </View>



      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: scale(95) }} // Give enough bottom pad for footer
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={bannerData}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: scale(0) }}
          renderItem={({ item }) => (

            <View

              style={{
                width: scale(429.63),
                height: scale(185.7),
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: scale(429.63),
                  height: scale(185.7),
                  position: 'absolute',
                  borderRadius: 0,
                }}
                resizeMode="cover"
              />
              {/* Right-side overlay */}
              <View style={{
                width: '60%',
                alignSelf: 'flex-end',
                padding: scale(16),
              }}>
                <Text style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: scale(18),
                  marginBottom: scale(10),
                }}>
                  {item.discount}
                </Text>
                <View style={{
                  backgroundColor: '#fdc500',
                  paddingVertical: scale(7),
                  paddingHorizontal: scale(18),
                  borderRadius: scale(6),
                  marginBottom: scale(8),
                  alignSelf: 'flex-start'
                }}>
                  <Text style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: scale(20),
                  }}>
                    {item.offer}
                  </Text>
                </View>
                <Text style={{
                  color: '#fff',
                  fontSize: scale(10),
                  opacity: 0.8,
                }}>{item.info}</Text>
              </View>
            </View>

          )}
        />



        {/* BANNER SECTION */}
        {/* <Image 
        source={require("../../../assets/images/home-1.png")}
        style={styles.banner}
        resizeMode="cover"
      /> */}

        {/* DISCOUNT ENDS IN */}
        <View style={styles.countdownRow}>
          <Text style={styles.countdownText}>Discount ends in</Text>
          <View style={styles.timerWrapper}>
            <View style={styles.timerBox}><Text style={styles.timerNum}>02</Text></View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timerBox}><Text style={styles.timerNum}>24</Text></View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timerBox}><Text style={styles.timerNum}>09</Text></View>
          </View>
          <TouchableOpacity style={{ marginLeft: "auto" }} onPress={() => router.push("/profile/shopease/discount")}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        {/* DISCOUNT PRODUCTS */}
        <FlatList
          data={PRODUCTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: scale(10) }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { marginRight: scale(12) }]}>
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                  <TouchableOpacity onPress={() => toggleLike(item.id)}>
                    <Image
                      source={likedIds.has(item.id)
                        ? require("../../../assets/images/heart-filled.png")
                        : require("../../../assets/images/heart-outline.png")}
                      style={styles.heartIcon}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                <View style={styles.cardPriceRow}>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                  <Text style={styles.cardOldPrice}>{item.oldPrice}</Text>
                </View>
              </View>
            </View>
          )}
          pagingEnabled={true} // optional snap scroll
        />


        {/* PROMOTION */}
        <View style={styles.promotionRow}>
          <Text style={styles.sectionTitle}>Upcoming promotion</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
        </View>
        <FlatList
          data={promosData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginHorizontal: scale(13),
            marginVertical: scale(7)
          }}
          renderItem={({ item }) => (
            <View style={{ marginRight: scale(7) }}>
              <Image source={item.image} style={styles.promoImg} />
            </View>
          )}
        />

        {/* NEW IN SHOES */}
        <View style={styles.promotionRow}>
          <Text style={styles.sectionTitle}>New in Shoes</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
        </View>

        <FlatList
          data={SHOES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: scale(10) }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { marginRight: scale(12) }]}>
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
                  <TouchableOpacity onPress={() => toggleLiketwo(item.id)}>
                    <Image
                      source={likedIds.has(item.id)
                        ? require("../../../assets/images/heart-filled.png")
                        : require("../../../assets/images/heart-outline.png")}
                      style={styles.heartIcon}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                <View style={styles.cardPriceRow}>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                  <Text style={styles.cardOldPrice}>{item.oldPrice}</Text>
                </View>
              </View>
            </View>
          )}
          pagingEnabled={true} // optional snap scroll
        />



        {/* <View style={styles.cardsRow}>
          <View style={styles.discountCard}>
            <Image source={require("../../../assets/images/sandals.png")} style={styles.prodImg} />
            <Text style={styles.prodTitle}>Brown tight</Text>
            <Text style={styles.prodSub}>Bear</Text>
            <Text style={styles.prodPrice}>₹ 234.90</Text>
          </View>
          <View style={styles.discountCard}>
            <Image source={require("../../../assets/images/shoes2.jpg")} style={styles.prodImg} />
            <Text style={styles.prodTitle}>Blue candy</Text>
            <Text style={styles.prodSub}>MMT</Text>
            <Text style={styles.prodPrice}>₹ 500</Text>
          </View>
          <View style={styles.discountCard}>
            <Image source={require("../../../assets/images/shoes3.jpg")} style={styles.prodImg} />
            <Text style={styles.prodTitle}>ZIZI</Text>
            <Text style={styles.prodSub}>Best</Text>
            <Text style={styles.prodPrice}>₹ 344.89</Text>
          </View>
        </View> */}
      </ScrollView>

      {/* FOOTER (from your code) */}
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

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fdc500",
    width: scale(428),
    height: scale(187),
    paddingHorizontal: scale(18),
    paddingTop: scale(10)
  },
  drawerIcon: {
    width: scale(45),
    height: scale(45)
  },
  logo: {
    height: scale(26),
    width: scale(87),
    resizeMode: "contain"
  },
  bell: {
    width: scale(20),
    height: scale(22.01),
    marginLeft: scale(4)
  },
  bellBadge: {
    position: "absolute",
    right: -3,
    top: -5,
    backgroundColor: "#fff",
    borderRadius: 7,
    paddingHorizontal: 4,
    paddingVertical: 1
  },
  bellBadgeText: {
    color: "#fdc500",
    fontWeight: "bold",
    fontSize: 11
  },
  deliverRow: {
    flexDirection: "row",
    marginLeft: scale(25),
    marginTop: scale(2),
    alignItems: "center"
  },
  deliverLabel: {
    color: "#ADAEB6",
    fontSize: scale(12),
    fontWeight: "bold"
  },
  deliverLocation: {
    color: "#232323",
    fontWeight: "600",
    fontSize: scale(12)
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: scale(15),
    marginHorizontal: scale(18),
    marginVertical: scale(11),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    height: scale(53)
  },
  searchIcon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(12),
    tintColor: "#969598"
  },
  searchInput: {
    flex: 1,
    fontSize: scale(17),
    color: "#4C4C4C",
    backgroundColor: "transparent",
    paddingVertical: scale(3),
    borderWidth: 0,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {})
  },
  micIcon: {
    width: scale(16),
    height: scale(20),
    marginLeft: scale(10),
    tintColor: "#969598"
  },

  countdownRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(15),
    marginTop: scale(18)
  },
  countdownText: {
    fontWeight: "bold",
    color: "#232323",
    fontSize: scale(14)
  },
  timerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(12)
  },
  timerBox: {
    backgroundColor: "#fdc500",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginHorizontal: 2
  },
  timerNum: {
    fontWeight: "bold",
    color: "#232323",
    fontSize: scale(14)
  },
  timerColon: {
    color: "#222",
    fontWeight: "bold",
    fontSize: scale(14),
    marginHorizontal: 1
  },
  seeAllText: {
    color: "#fdc500",
    fontWeight: "bold",
    fontSize: scale(14),
    marginLeft: scale(12)
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: scale(8),
    marginBottom: scale(4)
  },
  discountCard: {
    backgroundColor: "#fff",
    borderRadius: 13,
    alignItems: "center",
    elevation: 4,
    width: width / 3 - 19,
    padding: scale(7),
    marginHorizontal: scale(5)
  },
  prodImg: {
    width: scale(138.63),
    height: scale(105.4),
    borderRadius: scale(7),
    marginBottom: scale(3),
    marginTop: scale(4),
    resizeMode: "contain"
  },
  prodTitle: {
    color: "#232323",
    fontWeight: "600",
    fontSize: scale(13)
  },
  prodSub: {
    color: "#BBBBC6",
    fontSize: scale(10),
    marginTop: -1
  },
  prodPrice: {
    color: "#fdc500",
    fontWeight: "bold",
    fontSize: scale(13)
  },
  prodStrike: {
    color: "#B6B7B9",
    textDecorationLine: "line-through",
    fontSize: scale(10)
  },
  promotionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(16),
    marginTop: scale(17)
  },
  sectionTitle: {
    color: "#272623",
    fontWeight: "bold",
    fontSize: scale(17)
  },
  promosRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scale(13),
    marginVertical: scale(7)
  },
  promoImg: {
    width: scale(185.6),
    height: scale(66.45),
    borderRadius: scale(7),
    marginRight: scale(7),
    resizeMode: "cover"
  },
  bookIcon: {
    height: scale(30),
    width: scale(27),
    borderRadius: scale(7),
    marginLeft: scale(9),
    resizeMode: "cover"
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
    zIndex: 10
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  footerLogo: {
    width: scale(32),
    height: scale(32),
    marginBottom: scale(2)
  },
  footerIcon: {
    width: scale(20),
    height: scale(20),
    marginBottom: scale(2),
    tintColor: "#B6B7B9"
  },
  footerIconActive: {
    tintColor: "#FDC500"
  },
  footerLabel: {
    fontSize: scale(12),
    color: "#B6B7B9",
    fontWeight: "500"
  },
  footerLabelActive: {
    color: "#FDC500",
    fontWeight: "700"
  }

  ,
  card: {
    width: scale(138),    // Or your needed width
    height: scale(170),
    backgroundColor: "#fff",
    borderRadius: scale(3.44),
    margin: 7,
    overflow: "hidden",
    // SHADOWS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 14 },   // closer to Figma Y: 14.35
    shadowOpacity: 0.05,                     // 1.81% (Figma), very low
    shadowRadius: 28,                         // approx. Figma blur 17.93
    // ANDROID
    elevation: 10
  },


  cardImage: {
    width: scale(138),    // or 138
    height: scale(105),   // or 105
    alignSelf: "center",  // centers image in card horizontally
    borderTopLeftRadius: scale(3.44),
    borderTopRightRadius: scale(3.44),
    resizeMode: "contain",
  },

  cardContent: {
    padding: scale(7),
  },
  cardTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardName: {
    fontWeight: "bold",
    fontSize: scale(11),
    color: "#232323",
    flex: 1,
    marginRight: 4
  },
  heartIcon: {
    width: scale(15),
    height: scale(14),
    tintColor: "#FDC500"
  },
  cardBrand: {
    color: "#B4B4B4",
    fontSize: scale(11),
    marginTop: scale(1),
    marginBottom: scale(2)
  },
  cardPriceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardPrice: {
    color: "#FDC500",
    fontWeight: "bold",
    fontSize: scale(10.31),
    marginRight: scale(3)
  },
  cardOldPrice: {
    color: "#B6B7B9",
    textDecorationLine: "line-through",
    fontSize: scale(7)
  },
  gridContent: {
    paddingHorizontal: scale(2),
    paddingBottom: scale(10)
  }

});
