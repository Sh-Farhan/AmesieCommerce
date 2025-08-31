// app/index.tsx
// import { useEffect } from "react";
// import { View, Image, StyleSheet, Dimensions } from "react-native";
// import { useRouter } from "expo-router";

// const { width, height } = Dimensions.get("window");

// export default function SplashScreen() {
//   const router = useRouter();

//   useEffect(() => {
//     console.log("main")
//     const timer = setTimeout(() => {
//       router.replace("/(tabs)");
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("@/assets/images/amesie/Splash Page_01.png")}
//         style={styles.image}
//       />
//     </View>
//   );
// }

// // 👇 Add this to hide the header
// export const screenOptions = {
//   headerShown: false,
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   image: {
//     width,
//     height,
//     resizeMode: "cover",
//   },
// });
import { useEffect } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      // const seen = await AsyncStorage.getItem("hasSeenOnboarding");
      const seen = false;
      // console.log("seen is ", true)
      setTimeout(() => {
        // router.replace(seen ? "/(tabs)" : "/onboarding/1");
        if(seen) router.replace("/(tabs)");
        else router.replace("/(onboarding)/screen1");
        // router.replace("/(tabs)");
      }, 3000);
    };
    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/amesie/Splash Page_01.png")}
        style={styles.image}
      />
    </View>
  );
}

export const screenOptions = { headerShown: false };

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width, height, resizeMode: "cover" },
});
