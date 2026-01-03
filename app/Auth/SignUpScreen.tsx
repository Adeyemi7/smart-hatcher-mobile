
import { signUpSchema } from "@/utils/validation"; // <--- 1. Import Schema
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

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, loading } = useAuthStore();

  // Local State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility States
  const [showPass, setShowPass] = useState(false);        // <--- 2. Toggle for Password
  const [showConfirmPass, setShowConfirmPass] = useState(false); // <--- 2. Toggle for Confirm

  const goToLogin = () => router.push("/Auth/LoginScreen");

  const handleCreateAccount = async () => {
    // 3. 🔍 VALIDATE WITH ZOD
    const formData = { username, email, password, confirmPassword };
    const result = signUpSchema.safeParse(formData);

    if (!result.success) {
      // Show the exact error from your schema (e.g. "Passwords do not match")
      const errorMessage = result.error.issues[0].message;
      Toast.show({ 
        type: "error", 
        text1: "Validation Error", 
        text2: errorMessage 
      });
      return; 
    }

    // 4. Call Supabase
    const { error } = await signUp(email, password, username);

    if (error) {
      Toast.show({ type: "error", text1: "Sign Up Failed", text2: error });
    } else {
      // 5. Success
      Toast.show({ 
        type: "success", 
        text1: "Account created!", 
        text2: "Please check your email to verify." 
      });
      router.replace("/Auth/LoginScreen");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <MaterialIcons name="eco" size={64} color="#4CAF50" />
          <Text style={styles.title}>SmartHatch</Text>
          <Text style={styles.subtitle}>Create your account</Text>
        </View>

        <View style={styles.form}>
          {/* Username */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={22} color="#777" />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#777"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="mail" size={22} color="#777" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#777"
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={22} color="#777" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#777"
              style={styles.input}
              secureTextEntry={!showPass} // <--- Toggle
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <MaterialIcons 
                name={showPass ? "visibility" : "visibility-off"} 
                size={22} 
                color="#777" 
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock-reset" size={22} color="#777" />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#777"
              style={styles.input}
              secureTextEntry={!showConfirmPass} // <--- Toggle
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
              <MaterialIcons 
                name={showConfirmPass ? "visibility" : "visibility-off"} 
                size={22} 
                color="#777" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]} 
          onPress={handleCreateAccount}
          disabled={loading}
        >
          {loading ? (
             <ActivityIndicator color="#212121" />
          ) : (
             <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.primary}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", justifyContent: "center", padding: 16 },
  wrapper: { maxWidth: 360, width: "100%", alignSelf: "center" },
  header: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 28, fontWeight: "700", marginTop: 12, color: "#212121" },
  subtitle: { fontSize: 14, marginTop: 4, color: "#555" },
  form: { gap: 20 },
  
  // inputWrapper uses 'row', so adding the icon at the end works perfectly
  inputWrapper: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 16, 
    backgroundColor: "#F5F5F5", 
    shadowColor: "#000", 
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.1, 
    elevation: 6 
  },
  
  input: { flex: 1, marginLeft: 12, fontSize: 16, color: "#212121" },
  
  button: { marginTop: 32, paddingVertical: 18, borderRadius: 12, alignItems: "center", backgroundColor: "#4CAF50", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 6 },
  buttonText: { fontWeight: "700", fontSize: 16, color: "#212121" },
  footerText: { marginTop: 24, textAlign: "center", fontSize: 13, color: "#555" },
  primary: { color: "#4CAF50", fontWeight: "600" },
});