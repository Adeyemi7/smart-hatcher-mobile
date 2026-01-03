



// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from "react-native";
// import Toast from "react-native-toast-message";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { useAuthStore } from "../../store/authStore";

// export default function forgotPasswordScreen() {
//   const router = useRouter();
//   const { resetPassword, loading } = useAuthStore();
//   const [email, setEmail] = useState("");

//   const handleReset = async () => {
//     if (!email) {
//       Toast.show({ type: "error", text1: "Please enter your email" });
//       return;
//     }

//     const { error } = await resetPassword(email);
    
//     if (error) {
//       Toast.show({ type: "error", text1: "Error", text2: error });
//     } else {
//       Toast.show({ type: "success", text1: "Email Sent", text2: "Check your inbox for the reset link" });
//       router.back();
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
//           <MaterialIcons name="arrow-back" size={24} color="#212121" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Reset Password</Text>
//         <View style={styles.iconButton} />
//       </View>

//       <View style={styles.content}>
//         <View>
//           <MaterialIcons name="lock-reset" size={64} color="#4CAF50" />
//         </View>

//         <Text style={styles.description}>
//           Enter the email address associated with your account and we'll send
//           you a link to reset your password.
//         </Text>

//         <View style={styles.inputWrapper}>
//           <MaterialIcons name="mail" size={28} color="#757575" />
//           <TextInput
//             placeholder="Enter your email"
//             placeholderTextColor="#757575"
//             style={styles.input}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>
//       </View>

//       <TouchableOpacity 
//         style={styles.button} 
//         onPress={handleReset}
//         disabled={loading}
//       >
//         {loading ? (
//             <ActivityIndicator color="#fff" />
//         ) : (
//             <Text style={styles.buttonText}>Send Reset Link</Text>
//         )}
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// // ... (Keep your styles exactly the same)
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F5F5F5", padding: 16, justifyContent: "space-between" },
//   header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
//   iconButton: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#F5F5F5", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 6 },
//   headerTitle: { fontSize: 18, fontWeight: "700", color: "#212121" },
//   content: { alignItems: "center", gap: 32, paddingHorizontal: 16 },
//   description: { fontSize: 14, color: "#757575", textAlign: "center" },
//   inputWrapper: { flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: 20, height: 72, borderRadius: 32, backgroundColor: "#F5F5F5", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 6 },
//   input: { flex: 1, marginLeft: 16, fontSize: 18, color: "#212121" },
//   button: { height: 56, borderRadius: 28, backgroundColor: "#4CAF50", alignItems: "center", justifyContent: "center", shadowColor: "#4CAF50", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.3, elevation: 8 },
//   buttonText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF" },
// });


import { useLocalSearchParams, useRouter } from "expo-router"; // Import params
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAuthStore } from "../../store/authStore";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  
  // 1. Check where the user came from
  const { from } = useLocalSearchParams(); 
  
  const { resetPassword, loading, user } = useAuthStore();
  const [email, setEmail] = useState("");

  // 2. Auto-fill email if user is already logged in
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleReset = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Please enter your email" });
      return;
    }

    const { error } = await resetPassword(email);
    
    if (error) {
      Toast.show({ type: "error", text1: "Error", text2: error });
    } else {
      Toast.show({ type: "success", text1: "Email Sent", text2: "Check your inbox for the reset link" });
      
      // 3. Smart Navigation
      if (from === 'settings') {
        // If logged in (from Settings), go to Home
        router.replace("/(tabs)/ConnectScreen");
      } else {
        // If logged out (from Login), just go back
        router.back();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <View style={styles.iconButton} />
      </View>

      <View style={styles.content}>
        <View>
          <MaterialIcons name="lock-reset" size={64} color="#4CAF50" />
        </View>

        <Text style={styles.description}>
          {user 
            ? "Send a password reset link to your registered email address." 
            : "Enter the email address associated with your account and we'll send you a link to reset your password."
          }
        </Text>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="mail" size={28} color="#757575" />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#757575"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            // Optional: You can make it read-only if they are logged in
            // editable={!user} 
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleReset}
        disabled={loading}
      >
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text style={styles.buttonText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 16, justifyContent: "space-between" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  iconButton: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: "#F5F5F5", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 6 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#212121" },
  content: { alignItems: "center", gap: 32, paddingHorizontal: 16 },
  description: { fontSize: 14, color: "#757575", textAlign: "center" },
  inputWrapper: { flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: 20, height: 72, borderRadius: 32, backgroundColor: "#F5F5F5", shadowColor: "#000", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 6 },
  input: { flex: 1, marginLeft: 16, fontSize: 18, color: "#212121" },
  button: { height: 56, borderRadius: 28, backgroundColor: "#4CAF50", alignItems: "center", justifyContent: "center", shadowColor: "#4CAF50", shadowOffset: { width: 4, height: 4 }, shadowOpacity: 0.3, elevation: 8 },
  buttonText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF" },
});