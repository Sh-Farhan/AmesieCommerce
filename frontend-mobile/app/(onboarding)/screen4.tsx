import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding3() {
  const router = useRouter();

  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      <Image
      source={require("@/assets/images/amesie/onboarding4.png")}
      style = {styles.image}
      resizeMode="contain"
      />
      <Text style={{fontWeight: "bold", fontSize: 30}}>Order Delicious food</Text>
      <Text style={styles.text}>Your favorite restaurants, delivered fast</Text>
      {/* <Button title="Next" onPress={() => router.push("./screen2")} /> */}
      <TouchableOpacity
      style={styles.button}
      onPress={finishOnboarding}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
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
