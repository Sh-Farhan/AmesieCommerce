import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding1() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
      source={require("@/assets/images/amesie/onboarding2.png")}
      style = {styles.image}
      resizeMode="contain"
      />
      <Text style={{fontWeight: "bold", fontSize: 30}}>Shop Anything, Anytime</Text>
      <Text style={styles.text}>Browse thousands of products and get them delivered to your doorstep.</Text>
      {/* <Button title="Next" onPress={() => router.push("./screen2")} /> */}
      <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("./screen3")}
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
  image: {width:500, height:300, marginBottom: 20},
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
