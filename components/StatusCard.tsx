import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StatusCard({ connected }: { connected: boolean }) {
  return (
    <View style={styles.statusCard}>
      <View style={styles.statusLeft}>
        <View style={styles.iconCircle}>
          <MaterialIcons
            name="power-settings-new"
            size={28}
            color={connected ? "#4CAF50" : "#DC2626"}
          />
        </View>
        <View>
          <Text style={styles.statusTitle}>Incubator Status</Text>
          <Text style={styles.statusSubtitle}>
            {connected ? "Connected" : "Disconnected"}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: connected ? "#4CAF50" : "#DC2626" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  statusLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: { backgroundColor: "#4CAF5020", borderRadius: 50, padding: 8 },
  statusTitle: { fontWeight: "600", fontSize: 16, color: "#212121" },
  statusSubtitle: { fontSize: 12, color: "#757575" },
  statusDot: { width: 16, height: 16, borderRadius: 8 },
});
