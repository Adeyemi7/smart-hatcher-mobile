


// import { useRouter } from "expo-router";
// import React from "react";
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { useAuthStore } from "../../store/authStore"; // <--- 1. Import Store

// export default function SettingsScreen() {
//   const router = useRouter();
//   const { user, signOut } = useAuthStore(); // <--- 2. Get User & SignOut

//   const handleLogout = async () => {
//     await signOut();
//     // Supabase usually handles the state change automatically via the listener in _layout,
//     // but explicit navigation ensures the user feels the logout immediately.
//     router.replace("/Auth/LoginScreen"); 
//   };

//   const navigateToChangePassword = () => {
//     router.push("/Auth/forgotPasswordScreen");
//     if (user) {
//   }

//   // Get dynamic data (fallback to "User" if missing)
//   const displayName = user?.user_metadata?.username || "SmartHatch User";
//   const displayEmail = user?.email || "No email connected";

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileSection}>
//         <View style={styles.avatarContainer}>
//           {/* You can use a placeholder or the user's avatar if stored in metadata */}
//           <Image
//             source={{ uri: "https://i.pravatar.cc/200?img=12" }}
//             style={styles.avatar}
//           />
//           <TouchableOpacity style={styles.editButton}>
//             <MaterialIcons name="edit" size={14} color="white" />
//           </TouchableOpacity>
//         </View>
        
//         {/* 3. Render Dynamic Data */}
//         <Text style={styles.name}>{displayName}</Text>
//         <Text style={styles.email}>{displayEmail}</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Account</Text>
//         <View style={styles.card}>
//           <TouchableOpacity style={styles.row}
//             onPress={navigateToChangePassword} 
//           >
//             <View style={[styles.iconCircle, styles.iconPurple]}>
//               <MaterialIcons name="lock" size={20} color="#7C3AED" />
//             </View>
//             <Text style={styles.rowText}>Change Password</Text>
//             <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
//           </TouchableOpacity>

//           {/* 4. Attach Logout Handler */}
//           <TouchableOpacity 
//             style={[styles.row, styles.logoutRow]} 
//             onPress={handleLogout}
//           >
//             <View style={[styles.iconCircle, styles.iconRed]}>
//               <MaterialIcons name="logout" size={20} color="#DC2626" />
//             </View>
//             <Text style={[styles.rowText, styles.logoutText]}>Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>About</Text>
//         <View style={styles.card}>
//           <View style={styles.row}>
//             <Text style={styles.rowText}>Version</Text>
//             <Text style={styles.versionText}>1.0.0</Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//     paddingHorizontal: 20,
//   },
//   profileSection: {
//     alignItems: "center",
//     marginVertical: 30,
//   },
//   avatarContainer: {
//     position: "relative",
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     borderWidth: 4,
//     borderColor: "#fff",
//   },
//   editButton: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     backgroundColor: "#4CAF50",
//     borderRadius: 20,
//     padding: 8, // Slightly larger touch area
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#0F172A",
//     marginTop: 8,
//   },
//   email: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginTop: 4,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#0F172A",
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   iconCircle: {
//     padding: 8,
//     borderRadius: 20,
//     marginRight: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconPurple: {
//     backgroundColor: "#7C3AED20",
//   },
//   iconRed: {
//     backgroundColor: "#FCA5A520", // Red background with transparency
//   },
//   rowText: {
//     flex: 1,
//     fontSize: 16,
//     color: "#111827",
//     fontWeight: "500",
//   },
//   versionText: {
//     fontSize: 16,
//     color: "#6B7280",
//   },
//   logoutRow: {
//     borderBottomWidth: 0,
//   },
//   logoutText: {
//     color: "#DC2626", // Red text for logout
//     fontWeight: "600",
//   },
// });



import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAuthStore } from "../../store/authStore";

export default function SettingsScreen() {
  const router = useRouter();
  const { user, signOut } = useAuthStore(); 

  const handleLogout = async () => {
    await signOut();
    router.replace("/Auth/LoginScreen"); 
  };

  const navigateToChangePassword = () => {
    // We pass a param so the next screen knows to route to Home after success
    router.push("/Auth/forgotPasswordScreen?from=settings");
  };

  // Get dynamic data (fallback to "User" if missing)
  const displayName = user?.user_metadata?.username || "SmartHatch User";
  const displayEmail = user?.email || "No email connected";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/200?img=12" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <MaterialIcons name="edit" size={14} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.email}>{displayEmail}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.row}
            onPress={navigateToChangePassword} 
          >
            <View style={[styles.iconCircle, styles.iconPurple]}>
              <MaterialIcons name="lock" size={20} color="#7C3AED" />
            </View>
            <Text style={styles.rowText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={24} color="#CBD5E1" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.row, styles.logoutRow]} 
            onPress={handleLogout}
          >
            <View style={[styles.iconCircle, styles.iconRed]}>
              <MaterialIcons name="logout" size={20} color="#DC2626" />
            </View>
            <Text style={[styles.rowText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Version</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#fff",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 8,
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  iconCircle: {
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPurple: {
    backgroundColor: "#7C3AED20",
  },
  iconRed: {
    backgroundColor: "#FCA5A520",
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  versionText: {
    fontSize: 16,
    color: "#6B7280",
  },
  logoutRow: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "600",
  },
});