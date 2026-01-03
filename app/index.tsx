import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
// import SmartHatchLogo from "../components/SmartHatchLogo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/Intros/OnboardingScreen");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <MaterialIcons name="egg" size={100} color="#4CAF50" />

      {/* <SmartHatchLogo /> */}

      <Text style={styles.title}>SmartHatch</Text>
      <Text style={styles.subtitle}>
        Automate, Monitor, and Control Your Egg Incubator in Real Time.
      </Text>
    </View>
  );
};
export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    marginTop: 32,
    color: "#212121",
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    color: "rgba(33,33,33,0.7)",
    maxWidth: 320,
    lineHeight: 24,
  },
});
