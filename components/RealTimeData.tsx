import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RealTimeData({
  temperature,
  humidity,
}: {
  temperature: number;
  humidity: number;
}) {
  return (
    <View style={styles.dataCard}>
      <View style={styles.dataHeader}>
        <View>
          <Text style={styles.dataLabel}>Temperature & Humidity</Text>
          <Text style={styles.dataValue}>
            {temperature}°C / {humidity}%
          </Text>
        </View>
        <View style={styles.dataIcons}>
          <View style={styles.dataIconRow}>
            <MaterialIcons name="thermostat" size={16} color="#4CAF50" />
            <Text style={styles.dataIconText}>Temp.</Text>
          </View>
          <View style={styles.dataIconRow}>
            {/* <MaterialIcons name="humidity-high" size={16} color="#3B82F6" /> */}
            <Text style={styles.dataIconText}>Hum.</Text>
          </View>
        </View>
      </View>
      <View style={styles.graphPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  dataCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  dataHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dataLabel: { color: "#757575", fontSize: 12 },
  dataValue: { fontSize: 22, fontWeight: "700", color: "#212121" },
  dataIcons: { flexDirection: "row", gap: 12 },
  dataIconRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dataIconText: { fontSize: 12, color: "#212121" },
  graphPlaceholder: {
    height: 120,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
  },
});
