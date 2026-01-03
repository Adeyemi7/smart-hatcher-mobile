import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ManualControls() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.controlButton}>
        <MaterialIcons name="sync" size={32} color="#4CAF50" />
        <Text style={styles.controlLabel}>Turn Eggs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton}>
        <MaterialIcons name="air" size={32} color="#4CAF50" />
        <Text style={styles.controlLabel}>Fan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.controlButton}>
        <MaterialIcons name="thermostat" size={32} color="#4CAF50" />
        <Text style={styles.controlLabel}>Boiler</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  controlButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 4,
  },
  controlLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    color: "#212121",
  },
});
