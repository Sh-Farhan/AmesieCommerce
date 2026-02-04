import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Heart } from "lucide-react-native";
import { useRouter } from "expo-router";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Scaling helpers
const scaleWidth = (px: number) => (px / 425) * screenWidth;
const scaleHeight = (px: number) => (px / 1080) * screenHeight;

// Product suggestions data
const suggestions = [
  {
    id: 1,
    image: require("../../../assets/images/shoes1.png"),
    name: "Brown tight",
    brand: "Beor",
    price: "₹ 234.90",
  },
  {
    id: 2,
    image: require("../../../assets/images/shoes2.jpg"),
    name: "Blue candy",
    brand: "HMT",
    price: "₹ 500",
  },
  {
    id: 3,
    image: require("../../../assets/images/shoes3.jpg"),
    name: "ZIZI",
    brand: "Basic mint",
    price: "₹ 344.89",
  },
];

export default function ProductPage(): JSX.Element {
    const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("S");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          {/* Product Image */}
          <Image
            source={require("../../../assets/images/lady.png")}
            style={{
              width: scaleWidth(425),
              height: scaleHeight(796),
              alignSelf: "center",
              marginTop: scaleHeight(20),
              borderTopLeftRadius: scaleWidth(18),
              borderTopRightRadius: scaleWidth(18),
            }}
            resizeMode="cover"
          />

          {/* Back Button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: scaleHeight(39),
              left: scaleWidth(16),
              width: scaleWidth(44),
              height: scaleWidth(44),
              borderRadius: scaleWidth(22),
              backgroundColor: "#DCDCDC",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
            onPress={() => router.back()}>
          
            <Image
              source={require("../../../assets/images/back.png")}
              style={{ width: "30%", height: "40%" }}
            />
          </TouchableOpacity>

          {/* Bag Button */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: scaleHeight(39),
              right: scaleWidth(16),
              width: scaleWidth(44),
              height: scaleWidth(44),
              borderRadius: scaleWidth(22),
              backgroundColor: "#DCDCDC",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Image
              source={require("../../../assets/images/notif.png")}
              style={{ width: "60%", height: "60%" }}
            />
          </TouchableOpacity>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.brand}>Peponi</Text>
            <Text style={styles.productName}>Suit Shacker Cardigan</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹ 256.90</Text>
              <Text style={styles.strikePrice}>₹ 277.99</Text>
              <Text style={styles.discount}>50% OFF</Text>
            </View>
          </View>

          {/* Bottom buttons */}
          {!showDetails && (
            <View style={styles.bottomRow}>
              <TouchableOpacity
                style={[styles.heartBtnLarge]}
                onPress={() => setIsLiked(!isLiked)}
              >
                <Heart
                  size={scaleWidth(35)}
                  color={isLiked ? "#ff4757" : "#333"}
                  fill={isLiked ? "#ff4757" : "none"}
                  strokeWidth={2.2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.orderBtn}
                onPress={() => setShowDetails(true)}
              >
                <Text style={styles.orderText}>ORDER</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Lower Section: visible after ORDER pressed */}
        {showDetails && (
          <View style={styles.detailsCard}>
            {/* SIZE */}
            <View style={styles.sizeRow}>
              <Text style={styles.sectionTitle}>SIZE</Text>
              <Text style={styles.inStock}>11 items left</Text>
            </View>
            <View style={styles.sizeBtnsRow}>
              {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                <TouchableOpacity
                  key={sz}
                  style={sz === selectedSize ? styles.sizeBtnActive : styles.sizeBtn}
                  onPress={() => setSelectedSize(sz)}
                >
                  <Text
                    style={
                      sz === selectedSize ? styles.sizeTextActive : styles.sizeText
                    }
                  >
                    {sz}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* COLOR */}
            <Text style={styles.sectionTitle}>COLOR</Text>
            <View style={styles.colorRow}>
              {["#ffb1bb", "#aabaff", "#111", "#f3f3f3"].map((clr) => (
                <View
                  key={clr}
                  style={[styles.colorCircle, { backgroundColor: clr }]}
                />
              ))}
            </View>
            {/* DESCRIPTION */}
            <Text style={styles.sectionTitle}>DESCRIPTION</Text>
            <Text style={styles.description}>
              - Celana Jeans dengan Pola Mom Fit{"\n"}- Bahan Katun Denim Tidak
              Melar{"\n"}- Pinggang Elastis memakai karet{"\n"}-
              Elastisitas/Melar hingga 2-3 cm{"\n"}- High Waist{"\n"}-
              Resleting di depan{"\n"}- Saku di depan dan belakang{"\n"}-
              Nyaman dipakai...
              <Text style={styles.readMore}> Read more</Text>
            </Text>
            {/* HR - Divider after description */}
            <View style={styles.divider} />
            {/* Bullets */}
            <View style={styles.bullets}>
              <Text style={styles.bullet}>▫ Original product</Text>
              <Text style={styles.bullet}>▫ Return of goods in 12 days</Text>
              <Text style={styles.bullet}>▫ Pay directly at your place</Text>
              <Text style={styles.bullet}>▫ Voucher code available</Text>
            </View>
            {/* Heart and BUY Button side by side */}
            <View style={styles.buyRow}>
              <TouchableOpacity
                style={[styles.heartBtn, styles.heartBtnLarge]}
                onPress={() => setIsLiked(!isLiked)}
              >
                <Heart
                  size={scaleWidth(28)}
                  color={isLiked ? "#ff4757" : "#333"}
                  fill={isLiked ? "#ff4757" : "none"}
                  strokeWidth={2.2}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buyBtn}>
                <Text style={styles.buyText}>BUY</Text>
              </TouchableOpacity>
            </View>
            {/* HR - Divider after BUY row */}
            <View style={styles.divider} />
            {/* Suggestions */}
            <Text style={styles.maybeLike}>Maybe you like it too</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.suggestRow}
              contentContainerStyle={{ paddingRight: scaleWidth(12) }}
            >
              {suggestions.map((item) => (
                <View key={item.id} style={styles.suggestItem}>
                  <Image
                    source={item.image}
                    style={styles.suggestImg}
                    resizeMode="contain"
                  />
                  <View style={styles.cardTitleRow}>
                    <Text style={styles.suggestName}>{item.name}</Text>
                    <Heart
                      size={scaleWidth(16)}
                      color="#FDC500"
                      strokeWidth={2}
                      fill="none"
                    />
                  </View>
                  <Text style={styles.suggestBrand}>{item.brand}</Text>
                  <Text style={styles.suggestPrice}>{item.price}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: {
    width: "100%",
    alignItems: "center",
    paddingBottom: scaleHeight(48),
  },
  card: {
    width: "98%",
    maxWidth: scaleWidth(430),
    borderRadius: scaleWidth(18),
    backgroundColor: "#fff",
    marginVertical: scaleHeight(10),
    alignItems: "center",
    alignSelf: "center",
  },
  infoSection: {
    width: "90%",
    alignSelf: "center",
    marginTop: scaleHeight(8),
    marginBottom: scaleHeight(8),
     marginVertical:scaleHeight(20),

  },
  brand: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: scaleWidth(19),
    color: "#161616",
    marginVertical:scaleHeight(0),
  },
  productName: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: scaleWidth(17),
    color: "#161616",
    marginBottom: scaleHeight(6),
    marginVertical:scaleHeight(0),
  },
  priceRow: { flexDirection: "row", alignItems: "center", marginBottom: scaleHeight(6) },
  price: {
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#FDC500",
    fontSize: scaleWidth(16),
    marginRight: scaleWidth(10),marginVertical:scaleHeight(0),
  },
  strikePrice: {
    fontFamily: "Sen",
    fontWeight: "400",
    color: "#777",
    textDecorationLine: "line-through",
    fontSize: scaleWidth(13),
    marginRight: scaleWidth(7),marginVertical:scaleHeight(0),
  },
  discount: { fontFamily: "Sen", fontWeight: "600", color: "#777", fontSize: scaleWidth(13) },
  bottomRow: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-start",
    marginBottom: scaleHeight(18),
   
    gap: scaleWidth(12),
  },
  heartBtn: {
    backgroundColor: "#fff",
    // borderRadius: scaleWidth(28),
    width: scaleWidth(54),
    height: scaleWidth(54),
    alignItems: "center",
    justifyContent: "center",
    // elevation: 2,
    // borderWidth: 1,
    // borderColor: "#eee",
  },
  heartBtnLarge: {
    width: scaleWidth(54),
    height: scaleWidth(54),
    borderRadius: scaleWidth(27),
    marginTop:scaleHeight(0),
  },
  orderBtn: {
    backgroundColor: "#FDC500",
    borderRadius: scaleWidth(8),
    height: scaleHeight(56),
    minWidth: scaleWidth(110),
    // maxWidth: scaleWidth(220),

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: scaleWidth(12),
    marginTop:scaleHeight(0),
    bottom:0,
  },
  orderText: {
    fontFamily: "Sen",
    color: "#fff",
    fontWeight: "700",
    fontSize: scaleWidth(17),
    letterSpacing: 1,
  },
  detailsCard: {
    width: "98%",
    maxWidth: scaleWidth(430),
    backgroundColor: "#fff",
    borderRadius: scaleWidth(18),
    padding: scaleWidth(18),
    marginTop: scaleHeight(10),
    alignSelf: "center",
  },
  sizeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scaleHeight(8),
  },
  sectionTitle: {
    fontFamily: "Sen",
    fontSize: scaleWidth(17),
    fontWeight: "600",
    color: "#161616",
  },
  inStock: { fontFamily: "Sen", fontSize: scaleWidth(13), color: "#777" },
  sizeBtnsRow: { flexDirection: "row", marginBottom: scaleHeight(14) },
  sizeBtn: {
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fff",
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(6),
    marginRight: scaleWidth(8),
  },
  sizeBtnActive: {
    borderRadius: scaleWidth(8),
    borderWidth: 1,
    borderColor: "#FDC500",
    backgroundColor: "#FDC50022",
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(6),
    marginRight: scaleWidth(8),
  },
  sizeText: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: scaleWidth(14),
    color: "#161616",
  },
  sizeTextActive: {
    fontFamily: "Sen",
    fontWeight: "600",
    fontSize: scaleWidth(14),
    color: "#FDC500",
  },
  colorRow: {
    flexDirection: "row",
    marginBottom: scaleHeight(14),
    marginTop: scaleHeight(8),
  },
  colorCircle: {
    width: scaleWidth(28),
    height: scaleWidth(28),
    borderRadius: scaleWidth(14),
    marginRight: scaleWidth(12),
    borderWidth: 1,
    borderColor: "#ddd",
  },
  description: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: scaleWidth(13),
    color: "#161616",
    marginBottom: scaleHeight(18),
    marginTop: scaleHeight(8),
  },
  readMore: { fontFamily: "Sen", color: "#00b3ea", fontWeight: "600" },
  bullets: { marginBottom: scaleHeight(18) },
  bullet: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: scaleWidth(13),
    color: "#161616",
    marginBottom: scaleHeight(7),
  },
  buyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(8),
    marginBottom: scaleHeight(18),
    gap: scaleWidth(12),
  },
  buyBtn: {
    flexGrow: 1,
    backgroundColor: "#FDC500",
    borderRadius: scaleWidth(8),
    height: scaleHeight(46),
    alignItems: "center",
    justifyContent: "center",
    minWidth: scaleWidth(110),
    // maxWidth: scaleWidth(220),
    marginLeft: scaleWidth(12),
  },
  buyText: {
    fontFamily: "Sen",
    fontWeight: "700",
    fontSize: scaleWidth(16),
    color: "#fff",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e5e5",
    marginVertical: scaleHeight(12),
  },
  maybeLike: {
    fontFamily: "Sen",
    fontWeight: "600",
    fontSize: scaleWidth(16),
    color: "#161616",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: scaleHeight(14),
    marginTop: scaleHeight(12),
  },
  suggestRow: {
    flexDirection: "row",
    marginBottom: scaleHeight(12),
  },
  suggestItem: {
    backgroundColor: "#fff",
    borderRadius: scaleWidth(10),
    elevation: 2,
    shadowColor: "#000",
    marginRight: scaleWidth(14),
    padding: scaleWidth(10),
    width: scaleWidth(125),
    minHeight: scaleHeight(170),
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
  suggestImg: {
    width: "100%",
    height: scaleHeight(80),
    alignSelf: "center",
    marginBottom: scaleHeight(5),
    borderTopLeftRadius: scaleWidth(10),
    borderTopRightRadius: scaleWidth(10),
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleWidth(8),
    marginTop: scaleHeight(4),
    marginBottom: 0,
  },
  suggestName: {
    fontFamily: "Sen",
    fontWeight: "600",
    fontSize: scaleWidth(13),
    color: "#111",
  },
  suggestBrand: {
    fontFamily: "Sen",
    fontWeight: "400",
    fontSize: scaleWidth(11),
    color: "#777",
    marginBottom: scaleHeight(3),
  },
  suggestPrice: {
    fontFamily: "Sen",
    fontWeight: "600",
    fontSize: scaleWidth(13),
    color: "#FDC500",
    marginBottom: scaleHeight(3),
  },
});
