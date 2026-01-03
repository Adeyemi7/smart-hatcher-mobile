// import ManualControls from "@/components/ManualControls";
// import RealTimeData from "@/components/RealTimeData";
// import StatusCard from "@/components/StatusCard";
// import React, { useEffect, useState } from "react";
// import { ScrollView, StyleSheet, Text } from "react-native";

// // Backend API (NOT ESP32 directly)
// const API_URL = "https://smart-hatcher-backend.onrender.com/api/sensor";

// interface SensorData {
//   temperature: number;
//   humidity: number;
//   lastUpdated: string;
// }


// export default function HomeScreen() {
//   const [temperature, setTemperature] = useState<number>(0);
//   const [humidity, setHumidity] = useState<number>(0);
//   const [lastUpdated, setLastUpdated] = useState<string>("");
//   const [alerts, setAlerts] = useState<string[]>([]);
//   const [connected, setConnected] = useState<boolean>(false);

//   useEffect(() => {
//     fetchData(); // Run immediately

//     // Poll every 5 minutes
//     const interval = setInterval(fetchData, 300000);

//     return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(API_URL);

//       // Handle HTTP errors (404, 500, etc.)
//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status}`);
//       }

//       const json = await response.json();

//       // Debug: Verify backend response
//       console.log("Backend Response:", json);

//       // Validate backend data
//       if (
//         json.temperature !== undefined &&
//         json.humidity !== undefined
//       ) {
//         setTemperature(json.temperature);
//         setHumidity(json.humidity);
//         setLastUpdated(json.lastUpdated);
//         setConnected(true);
//         setAlerts([]);
//       } else {
//         throw new Error("Invalid data format");
//       }
//     } catch (error) {
//       console.log("Backend Connection Error:", error);
//       setConnected(false);
//       setAlerts(["System Disconnected"]);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Connection Status */}
//       <StatusCard connected={connected} />

//       {/* Alerts */}
//       {alerts.map((alert, index) => (
//         <Text key={index} style={styles.alertText}>
//           {alert}
//         </Text>
//       ))}

//       <Text style={styles.sectionTitle}>Manual Controls</Text>
//       <ManualControls />

//       <Text style={styles.sectionTitle}>Real-time Data</Text>
//       <RealTimeData
//         temperature={temperature}
//         humidity={humidity}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     padding: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginBottom: 12,
//     marginTop: 16,
//   },
//   alertText: {
//     color: "red",
//     fontWeight: "600",
//     marginBottom: 8,
//   },
// });


import ManualControls from "@/components/ManualControls";
import StatusCard from "@/components/StatusCard";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";

const API_URL = "https://smart-hatcher-backend.onrender.com/api/sensor";

export default function HomeScreen() {
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const json = await response.json();

      if (json.temperature !== undefined && json.humidity !== undefined) {
        setTemperature(json.temperature);
        setHumidity(json.humidity);
        setLastUpdated(json.lastUpdated || new Date().toLocaleTimeString());
        setConnected(true);
        setAlerts([]);
      }
    } catch (error) {
      setConnected(false);
      setAlerts(["System Disconnected"]);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* 1. Header Block */}
      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.brandText}>Smart Hatcher</Text>
          <Text style={styles.statusUpdateText}>Intelligent Incubation</Text>
        </View>
        <StatusCard connected={connected} />
      </View>

      {/* 2. Hero Status Card */}
      <View style={styles.heroCard}>
        <View style={styles.statsContainer}>
          {/* Temp */}
          <View style={styles.statBox}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FF6B6B15' }]}>
              <MaterialCommunityIcons name="thermometer" size={28} color="#FF6B6B" />
            </View>
            <Text style={styles.valueText}>{temperature.toFixed(1)}°C</Text>
            <Text style={styles.labelText}>Temperature</Text>
          </View>

          <View style={styles.statDivider} />

          {/* Humidity */}
          <View style={styles.statBox}>
            <View style={[styles.iconWrapper, { backgroundColor: '#4D96FF15' }]}>
              <MaterialCommunityIcons name="water-percent" size={30} color="#4D96FF" />
            </View>
            <Text style={styles.valueText}>{humidity.toFixed(0)}%</Text>
            <Text style={styles.labelText}>Humidity</Text>
          </View>
        </View>
      </View>

      {/* 3. Alerts */}
      {alerts.length > 0 && (
        <View style={styles.alertBox}>
          <MaterialCommunityIcons name="shield-alert" size={22} color="#D32F2F" />
          <Text style={styles.alertContent}>{alerts[0]}</Text>
        </View>
      )}

      {/* 4. Controls */}
      <Text style={styles.sectionTitle}>Manual Controls</Text>
      <View style={styles.controlWrapper}>
        <ManualControls />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  headerTextGroup: {
    marginBottom: 10,
  },
  brandText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1A1A1A",
    letterSpacing: -1,
  },
  statusUpdateText: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  heroCard: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 24,
    marginBottom: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueText: {
    fontSize: 28,
    fontWeight: '800',
    color: "#1A1A1A",
  },
  labelText: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "600",
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#F0F0F0',
  },
  heroFooter: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
    alignItems: 'center',
  },
  footerTime: {
    fontSize: 11,
    color: '#ADB5BD',
    fontWeight: '600',
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  alertContent: {
    color: "#D32F2F",
    fontWeight: "700",
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
    marginBottom: 15,
  },
  controlWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 15,
    elevation: 2,
  },
});