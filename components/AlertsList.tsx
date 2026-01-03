import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AlertsList({ alerts }: { alerts: string[] }) {
  return (
    <View style={styles.container}>
      {alerts.map((alertMsg, index) => (
        <View key={index} style={styles.alertRow}>
          <View
            style={[
              styles.alertIconCircle,
              {
                backgroundColor: alertMsg.includes("Temperature")
                  ? "#FCA5A520"
                  : "#4CAF5020",
              },
            ]}
          >
            <MaterialIcons
              name={
                alertMsg.includes("Temperature") ? "thermostat" : "check-circle"
              }
              size={20}
              color={alertMsg.includes("Temperature") ? "#DC2626" : "#4CAF50"}
            />
          </View>
          <View>
            <Text style={styles.alertText}>{alertMsg}</Text>
            <Text style={styles.alertTime}>--:--</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  alertRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  alertIconCircle: { borderRadius: 50, padding: 8 },
  alertText: { fontSize: 14, fontWeight: "500", color: "#212121" },
  alertTime: { fontSize: 12, color: "#757575" },
});
