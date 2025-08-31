// "use client"

// import { useState } from "react"
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   SafeAreaView,
//   ImageBackground,
//   Dimensions,
// } from "react-native"
// import Icon from 'react-native-vector-icons/FontAwesome';

// const { height } = Dimensions.get("window");

// export default function LoginScreen() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [loading, setLoading] = useState(false)

//   const handleLogin = async () => {
//     setLoading(true)
//     setTimeout(() => {
//       setLoading(false)
//       console.log("Login attempt with:", { email, password })
//     }, 1000)
//   }

//   return (
//     <ImageBackground source={require("@/assets/images/amesie/Splash Page_01.png")} style={styles.backgroundImage}>
//       <SafeAreaView style={styles.container}>
//         <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidView}>
//           <ScrollView contentContainerStyle={styles.scrollView}>
//             {/* Header Section (No Background) */}
//             <View style={styles.headerContainer}>
//               <Text style={styles.title}>Sign Up</Text>
//               <Text style={styles.subtitle}>Please sign in to get started</Text>
//             </View>
            
//             {/* White Background Starts Here */}
//             <View style={styles.overlay}>
//               {/* Form Section */}

//               <View style={styles.formContainer}>
//               <View style={styles.inputContainer}>
//                   <Text style={styles.label}>NAME</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter your email or mobile number"
//                     value={email}
//                     onChangeText={setEmail}
//                     autoCapitalize="none"
//                     keyboardType="email-address"
//                   />
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>EMAIL / MOBILE NUMBER</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter your email or mobile number"
//                     value={email}
//                     onChangeText={setEmail}
//                     autoCapitalize="none"
//                     keyboardType="email-address"
//                   />
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>PASSWORD</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry
//                   />
//                 </View>

//                 <View style={styles.inputContainer}>
//                   <Text style={styles.label}>RE-TYPE PASSWORD</Text>
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry
//                   />
//                 </View>

//                 <TouchableOpacity
//                   style={[styles.button, loading && styles.buttonDisabled]}
//                   onPress={handleLogin}
//                   disabled={loading}
//                 >
//                   <Text style={styles.buttonText}>Sign up</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.footer}>
//                 <Text style={styles.footerText}>Don't have an account? </Text>
//                 <TouchableOpacity>
//                   <Text style={styles.signUpText}>Sign Up</Text>
//                 </TouchableOpacity>
//               </View>
              
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </ImageBackground>
//   )
// }

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backgroundImage: {
//     flex: 1,
//     resizeMode: "cover",
//   },
//   keyboardAvoidView: {
//     flex: 1,
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerContainer: {
//     alignItems: "center",
//     marginTop:70,
//     zIndex: 1, // Ensures header stays above overlay
//     position: 'relative', // Needed for zIndex to work
//   },
//   title: {
//     fontFamily: "Sen",
//     fontSize: 32,
//     // fontWeight: "bold",
//     color: "white",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "white",
//     fontFamily: "Sen",
//     marginTop: "3%",
//   },
//   overlay: {
//     backgroundColor: "white",
//     width: "100%",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//     // This makes it expand to fill remaining space
//     flex: 1,
//     // Add marginTop to create space for header
//     marginTop: height * 0.15,
//   },
//   formContainer: {
//     width: "100%",
//   },
//   inputContainer: {
//     marginBottom: 40,
//   },
//   label: {
//     fontFamily: "Sen",
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#333",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: "#f9f9f9",
//   },
//   forgotPassword: {
//     fontFamily: "Sen",
//     alignSelf: "flex-end",
//     marginBottom: 15,
//   },
//   forgotPasswordText: {
//     fontFamily: "Sen",
//     color: "#4a90e2",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   button: {
//     backgroundColor: "#fdc500",
//     borderRadius: 8,
//     padding: 12,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   orText: {
//     fontFamily: "Sen",
//     fontSize: 16,
//     color: "#666",
//     marginVertical: 20,
//   },
//   socialContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   socialButton: {
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   footer: {
//     margin: 10,
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   footerText: {
//     fontFamily: "Sen",
//     fontSize: 14,
//     color: "#666",
//   },
//   signUpText: {
//     fontFamily: "Sen",
//     fontSize: 14,
//     color: "#4a90e2",
//     fontWeight: "600",
//   },
//   buttonText: {
//     marginVertical: 10, 
//     fontSize: 16,
//     color: "white",
//     fontFamily: "Sen",
//   }
// })
"use client"

import { useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'

const { height } = Dimensions.get("window")

export default function SignUpScreen() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      console.log("Login attempt with:", { name, email, password, confirmPassword })
    }, 1000)
  }

  return (
    <ImageBackground source={require("@/assets/images/amesie/Splash Page_01.png")} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidView}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subtitle}>Please sign in to get started</Text>
            </View>

            <View style={styles.overlay}>
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>NAME</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>EMAIL / MOBILE NUMBER</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email or mobile number"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>PASSWORD</Text>
                  <View style={styles.passwordWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>RE-TYPE PASSWORD</Text>
                  <View style={styles.passwordWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Icon name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.signUpText}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 70,
    zIndex: 1,
    position: 'relative',
  },
  title: {
    fontFamily: "Sen",
    fontSize: 32,
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    fontFamily: "Sen",
    marginTop: "3%",
  },
  overlay: {
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 1,
    marginTop: height * 0.15,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontFamily: "Sen",
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 14,
    zIndex: 10,
  },
  button: {
    backgroundColor: "#fdc500",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    marginVertical: 10,
    fontSize: 16,
    color: "white",
    fontFamily: "Sen",
  },
  footer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontFamily: "Sen",
    fontSize: 14,
    color: "#666",
  },
  signUpText: {
    fontFamily: "Sen",
    fontSize: 14,
    color: "#4a90e2",
    fontWeight: "600",
  },
})

