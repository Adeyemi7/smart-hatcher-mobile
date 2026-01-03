import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useRouter } from "expo-router";

export default function WelcomeScreen({ navigation }: any) {
  const router = useRouter();

  const goToSignUp = () => {
    router.push("/Auth/SignUpScreen");
  };

  const goToLogin = () => {
    router.push("/Auth/LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoWrapper}>
          <MaterialIcons name="egg" size={100} color="#4CAF50" />
        </View>

        <Text style={styles.title}>SmartHatch</Text>
        <Text style={styles.subtitle}>Let’s get your hatchery online!</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={goToSignUp}
          >
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={goToLogin}
          >
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = "#4CAF50";
const BG_LIGHT = "#F5F5F5";
const TEXT_DARK = "#212121";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_LIGHT,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoWrapper: {
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: TEXT_DARK,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(33,33,33,0.7)",
    marginTop: 8,
    marginBottom: 48,
    textAlign: "center",
  },
  actions: {
    width: "100%",
  },
  button: {
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
    shadowOpacity: 0.15,
    elevation: 6,
  },
  primaryButton: {
    backgroundColor: PRIMARY,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: BG_LIGHT,
  },
  secondaryButtonText: {
    color: TEXT_DARK,
    fontSize: 18,
    fontWeight: "700",
  },
});
