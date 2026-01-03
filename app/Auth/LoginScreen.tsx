// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   const goToSignUp = () => {
//     router.push("/Auth/SignUpScreen");
//   };

//   const handleLogin = () => {
//     router.push("/(tabs)/ConnectScreen");
//   };

//   const forgetPassword = () => {
//     // Handle forget password logic here
//     router.push("/Auth/forgotPasswordScreen");
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.wrapper}>
//         <View style={styles.header}>
//           <MaterialIcons name="egg" size={64} color="#4CAF50" />
//           <Text style={styles.title}>SmartHatch</Text>
//           <Text style={styles.subtitle}>Welcome back!</Text>
//         </View>

//         <View style={styles.form}>
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             placeholder="Email"
//             placeholderTextColor={PLACEHOLDER}
//             style={styles.input}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <TextInput
//             value={password}
//             onChangeText={setPassword}
//             placeholder="Password"
//             placeholderTextColor={PLACEHOLDER}
//             style={styles.input}
//             secureTextEntry
//           />
//         </View>

//         <View style={styles.forgotRow}>
//           <TouchableOpacity onPress={forgetPassword}>
//             <Text style={styles.forgotText}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableOpacity>

//         <View style={styles.footer}>
//           <Text style={styles.footerText}>
//             Don’t have an account?{" "}
//             <Text style={styles.link} onPress={goToSignUp}>
//               Sign Up
//             </Text>
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const PRIMARY = "#4CAF50";
// const BG_LIGHT = "#F5F5F5";
// const TEXT_DARK = "#212121";
// const PLACEHOLDER = "#757575";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BG_LIGHT,
//   },
//   wrapper: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: TEXT_DARK,
//   },
//   subtitle: {
//     marginTop: 8,
//     fontSize: 16,
//     color: TEXT_DARK,
//   },
//   form: {
//     marginBottom: 24,
//   },
//   input: {
//     backgroundColor: BG_LIGHT,
//     borderRadius: 10,
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     fontSize: 16,
//     color: TEXT_DARK,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 6, height: 6 },
//     shadowOpacity: 0.15,
//     elevation: 6,
//   },
//   forgotRow: {
//     alignItems: "flex-end",
//     marginBottom: 32,
//   },
//   forgotText: {
//     color: PRIMARY,
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   loginButton: {
//     backgroundColor: PRIMARY,
//     paddingVertical: 18,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 6, height: 6 },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   loginText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "700",
//   },
//   footer: {
//     marginTop: 32,
//     alignItems: "center",
//   },
//   footerText: {
//     fontSize: 14,
//     color: TEXT_DARK,
//   },
//   link: {
//     color: PRIMARY,
//     fontWeight: "600",
//   },
// });
import { loginSchema } from "@/utils/validation"; // <--- 1. Import Schema
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAuthStore } from "../../store/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // <--- 2. Visibility State
  
  const { signIn, loading } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    // 3. 🔍 VALIDATE WITH ZOD
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      // Get the first error message from Zod
      const errorMessage = result.error.issues[0].message;
      Toast.show({ 
        type: "error", 
        text1: "Invalid Input", 
        text2: errorMessage 
      });
      return; 
    }

    // 4. Attempt Sign In
    const { error } = await signIn(email, password);

    // 5. Handle Logic
    if (error) {
      // Login Failed: Show error but PROCEED ANYWAY (Guest Mode logic)
      Toast.show({ 
        type: "error", // Changed to 'error' for red color
        text1: "Login Failed", 
        text2: error 
      });

      // Optional: Delay navigation slightly so user sees the toast
      setTimeout(() => {
        router.replace("/(tabs)/ConnectScreen");
        Toast.show({ type: "info", text1: "Guest Mode", text2: "Entered offline mode." });
      }, 1000);
      
    } else {
      // Login Success
      Toast.show({ 
        type: "success", 
        text1: "Login Success", 
        text2: "Welcome to SmartHatch!"
      });
      router.replace("/(tabs)/ConnectScreen"); 
    }
  };

  const goToSignUp = () => router.push("/Auth/SignUpScreen");
  const forgetPassword = () => router.push("/Auth/forgotPasswordScreen");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <MaterialIcons name="egg" size={64} color="#4CAF50" />
          <Text style={styles.title}>SmartHatch</Text>
          <Text style={styles.subtitle}>Welcome back!</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={PLACEHOLDER}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input Wrapper */}
          <View style={styles.passwordContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={PLACEHOLDER}
              style={[styles.input, styles.passwordInput]} // Combine styles
              secureTextEntry={!isPasswordVisible} // <--- Toggle this
            />
            
            {/* Eye Icon Button */}
            <TouchableOpacity 
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <MaterialIcons 
                name={isPasswordVisible ? "visibility" : "visibility-off"} 
                size={24} 
                color={PLACEHOLDER} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.forgotRow}>
          <TouchableOpacity onPress={forgetPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.loginButton, loading && { opacity: 0.7 }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <Text style={styles.link} onPress={goToSignUp}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = "#4CAF50";
const BG_LIGHT = "#F5F5F5";
const TEXT_DARK = "#212121";
const PLACEHOLDER = "#757575";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_LIGHT },
  wrapper: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  header: { alignItems: "center", marginBottom: 40 },
  title: { fontSize: 32, fontWeight: "800", color: TEXT_DARK },
  subtitle: { marginTop: 8, fontSize: 16, color: TEXT_DARK },
  form: { marginBottom: 24 },
  
  // Updated Input Styles
  input: {
    backgroundColor: BG_LIGHT, 
    borderRadius: 10, 
    paddingVertical: 16,
    paddingHorizontal: 24, 
    fontSize: 16, 
    color: TEXT_DARK, 
    marginBottom: 16,
    shadowColor: "#000", 
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.15, 
    elevation: 6,
  },
  
  // Special handling for password field
  passwordContainer: {
    position: "relative", // Needed for absolute positioning of icon
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 60, // Add padding so text doesn't hide behind the eye icon
    marginBottom: 0, // Reset margin since the container handles spacing if needed
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 16, // Adjust roughly to center vertically
    zIndex: 1,
  },

  forgotRow: { alignItems: "flex-end", marginBottom: 32, marginTop: 16 }, // Added marginTop
  forgotText: { color: PRIMARY, fontSize: 14, fontWeight: "600" },
  loginButton: {
    backgroundColor: PRIMARY, paddingVertical: 18, borderRadius: 10,
    alignItems: "center", shadowColor: "#000", shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.15, shadowRadius: 12, elevation: 6,
  },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  footer: { marginTop: 32, alignItems: "center" },
  footerText: { fontSize: 14, color: TEXT_DARK },
  link: { color: PRIMARY, fontWeight: "600" },
});