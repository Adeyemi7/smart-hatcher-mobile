import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  SectionListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ---------------------------------------------------------
// 1. TYPE DEFINITIONS
// ---------------------------------------------------------
interface Alert {
  id: number;
  message: string;
  timestamp: string;
}

interface AlertSection {
  title: string;
  data: Alert[];
}

// ---------------------------------------------------------
// 2. CONFIGURATION
// ---------------------------------------------------------
const API_URL = "http://10.228.226.224:3000/api/alerts";

export default function AlertScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState<AlertSection[]>([]);

  // -------------------------------------------------------
  // 3. FETCH AND GROUP DATA
  // -------------------------------------------------------
  const fetchAlerts = async () => {
    try {
      // Step A: Fetch data from backend
      // const response = await fetch(API_URL);
      // const data: Alert[] = await response.json();

      // --- MOCK DATA ---
      const data: Alert[] = [
        {
          id: 1,
          message: "Incubator temp critical (39°C)",
          timestamp: "2026-01-01T19:30:00",
        },
        {
          id: 2,
          message: "Humidity drop detected",
          timestamp: "2026-01-01T14:15:00",
        },
        { id: 3, message: "Power failure", timestamp: "2025-12-31T09:00:00" },
        {
          id: 4,
          message: "System restarted",
          timestamp: "2025-12-31T08:55:00",
        },
        { id: 5, message: "Door opened", timestamp: "2025-12-28T10:00:00" },
      ];

      // Step B: Sort by Time (Newest First)
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

      // Step C: Group by Date Header
      const grouped = groupDataByDate(sortedData);
      setSections(grouped);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Helper function to create the "Day/Date" headers
  const groupDataByDate = (data: Alert[]): AlertSection[] => {
    const groups = data.reduce((acc: Record<string, Alert[]>, item) => {
      const date = new Date(item.timestamp);

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      if (date.toDateString() === today.toDateString()) {
        dateKey = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = "Yesterday";
      }

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {});

    return Object.keys(groups).map((key) => ({
      title: key,
      data: groups[key],
    }));
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // -------------------------------------------------------
  // 4. UI RENDERING
  // -------------------------------------------------------

  const renderItem: SectionListRenderItem<Alert, AlertSection> = ({ item }) => {
    const timeString = new Date(item.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View style={styles.card}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: item.message.includes("critical")
                ? "#FFEBEE"
                : "#E3F2FD",
            },
          ]}
        >
          <MaterialIcons
            name={item.message.includes("critical") ? "warning" : "info"}
            size={24}
            color={item.message.includes("critical") ? "#D32F2F" : "#1976D2"}
          />
        </View>
        <View style={styles.contentBox}>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{timeString}</Text>
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: AlertSection;
  }) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{ marginTop: 50 }}
        />
      ) : (
        <SectionList<Alert, AlertSection>
          sections={sections}
          keyExtractor={(item, index) => item.id.toString() + index}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchAlerts();
              }}
            />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No alerts recorded yet.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#757575",
    textTransform: "uppercase",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contentBox: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#888",
    fontSize: 16,
  },
});
