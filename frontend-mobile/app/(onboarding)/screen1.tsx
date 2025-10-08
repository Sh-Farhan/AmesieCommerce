import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding1() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
      source={require("@/assets/images/onboarding1.png")}
      style = {styles.image}
      resizeMode="contain"
      />
      <Text style={styles.text}>One app for everything-shop, order food, and get essentials delievered instantly.</Text>
      {/* <Button title="Next" onPress={() => router.push("./screen2")} /> */}
      <TouchableOpacity
      style={styles.button}
      // onPress={() => router.push("./screen2")}
      onPress={() => router.push("/.profile/shopease/bag.tsx")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
      // style={styles.button}
      >
        <Text style={{color: "black", fontFamily: "Sen"}}>Skip</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  image: {width:400, height:200, marginBottom: 20},
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
    button: {
    marginTop: 100,
    width:300,
    backgroundColor: "#fdc500",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
  },
    buttonText: {
    marginVertical: 10, 
    fontSize: 16,
    color: "white",
    fontFamily: "Sen",
  },
  text: {textAlign:"center", fontSize: 22, marginBottom: 20, fontFamily: "Sen", marginTop:70, },
});
