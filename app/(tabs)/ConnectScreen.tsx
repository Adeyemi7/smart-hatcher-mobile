

// import { MaterialIcons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// // ---------------------------------------------------------
// // CONFIGURATION
// // ---------------------------------------------------------

// // Your Render Backend URL
// const INCUBATOR_API = "https://smart-hatcher-backend.onrender.com/api/sensor";

// export default function App() {
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("Initializing...");
//   const [data, setData] = useState({ temperature: "--", humidity: "--" });

//   // -------------------------------------------------------
//   // 1. POLLING LOGIC
//   // -------------------------------------------------------
//   useEffect(() => {
//     fetchData(); // Run once immediately

//     const interval = setInterval(() => {
//       fetchData(); // Run every 5 seconds
//     }, 300000); // Change 5000 to 300000 if you want 5 minutes instead

//     return () => clearInterval(interval);
//   }, []);

//   // -------------------------------------------------------
//   // 2. Fetch Data Logic
//   // -------------------------------------------------------
//   const fetchData = async () => {
//     try {
//       // Note: We don't set loading(true) here to avoid flickering every 5 seconds

//       const response = await fetch(INCUBATOR_API);
//       const json = await response.json();

//       console.log("Polling Backend:", json);

//       // ✅ FIX: Check for 'temperature' directly (NOT json.data)
//       if (json.temperature !== undefined) {
        
//         // ✅ FIX: Set 'json' directly as the data source
//         setData(json);

//         // --- THIS IS THE TIME LOGIC ---
//         const time = new Date().toLocaleTimeString();
//         setStatus(`Last updated: ${time}`);
//       }
//     } catch (error) {
//       console.log("Fetch Error:", error);
//       setStatus("Connection Error - Retrying...");
//     }
//   };

//   // Manual Refresh Button Handler
//   const handleManualRefresh = async () => {
//     setLoading(true); // Show spinner only on manual press
//     await fetchData();
//     setLoading(false);
//   };

//   // -------------------------------------------------------
//   // 3. UI RENDER
//   // -------------------------------------------------------
//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <View style={styles.iconCircle}>
//           <MaterialIcons name="thermostat" size={60} color="#4CAF50" />
//         </View>
//         <Text style={styles.title}>Incubator Monitor</Text>
//         <Text style={styles.status}>{status}</Text>

//         {/* DATA DISPLAY */}
//         <View style={styles.dataRow}>
//           <View style={styles.dataItem}>
//             <Text style={styles.dataLabel}>Temp</Text>
//             <Text style={styles.dataValue}>{data.temperature}°C</Text>
//           </View>
//           <View style={[styles.dataItem, styles.borderLeft]}>
//             <Text style={styles.dataLabel}>Humidity</Text>
//             <Text style={styles.dataValue}>{data.humidity}%</Text>
//           </View>
//         </View>

//         {/* BUTTON */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleManualRefresh}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Refresh Now</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f2f2f2",
//     justifyContent: "center",
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     elevation: 5,
//   },
//   iconCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#E8F5E9",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   title: { fontSize: 24, fontWeight: "bold", color: "#333" },
//   status: { fontSize: 14, color: "#888", marginBottom: 30, marginTop: 5 },
//   dataRow: { flexDirection: "row", width: "100%", marginBottom: 30 },
//   dataItem: { flex: 1, alignItems: "center" },
//   borderLeft: { borderLeftWidth: 1, borderLeftColor: "#eee" },
//   dataLabel: { fontSize: 14, color: "#888", marginBottom: 5 },
//   dataValue: { fontSize: 32, fontWeight: "bold", color: "#4CAF50" },
//   button: {
//     backgroundColor: "#4CAF50",
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     borderRadius: 30,
//     width: "100%",
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });


import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// 1. Import the new hook
import { useAudioPlayer } from 'expo-audio';

// ---------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------
const INCUBATOR_API = "https://smart-hatcher-backend.onrender.com/api/sensor";

// Safe Ranges
const TEMP_MIN = 37.5;
const TEMP_MAX = 39.4;
const HUM_MIN = 60.0;
const HUM_MAX = 65.0;

// Alarm Sound URL
const ALARM_URL = 'https://www.soundjay.com/buttons/sounds/button-10.mp3'; 

export default function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Initializing...");
  const [data, setData] = useState({ temperature: 0, humidity: 0 });
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  // 2. Initialize the Player Hook
  // This automatically manages loading/unloading the sound for you.
  const player = useAudioPlayer(ALARM_URL);

  // -------------------------------------------------------
  // 1. POLLING LOGIC
  // -------------------------------------------------------
  useEffect(() => {
    fetchData(); 
    const interval = setInterval(() => {
      fetchData(); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  // -------------------------------------------------------
  // 2. ALARM SYSTEM (Simplified)
  // -------------------------------------------------------
  const triggerAlarm = () => {
    if (!player.playing) {
      player.loop = true; // Set loop
      player.play();      // Play
      setIsAlarmActive(true);
    }
  };

  const stopAlarm = () => {
    if (player.playing) {
      player.pause();          // Stop
      player.seekTo(0);        // Reset to start
      setIsAlarmActive(false);
    }
  };

  const checkThresholds = (temp: string | number, hum: string | number) => {
    const t = parseFloat(String(temp));
    const h = parseFloat(String(hum));

    const isTempUnsafe = t < TEMP_MIN || t > TEMP_MAX;
    const isHumUnsafe = h < HUM_MIN || h > HUM_MAX;

    if (isTempUnsafe || isHumUnsafe) {
      triggerAlarm();
      setStatus(isTempUnsafe ? "CRITICAL: TEMPERATURE!" : "CRITICAL: HUMIDITY!");
    } else {
      // Only stop if the user hasn't manually stopped it? 
      // Or auto-stop if safe? usually auto-stop is better for monitoring.
      if (isAlarmActive) stopAlarm();
      
      const time = new Date().toLocaleTimeString();
      setStatus(`Normal Operation • ${time}`);
    }
  };

  // -------------------------------------------------------
  // 3. Fetch Data Logic
  // -------------------------------------------------------
  const fetchData = async () => {
    try {
      const response = await fetch(INCUBATOR_API);
      const json = await response.json();

      if (json.temperature !== undefined) {
        setData(json);
        checkThresholds(json.temperature, json.humidity);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
      setStatus("Connection Error");
    }
  };

  const handleManualRefresh = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  // -------------------------------------------------------
  // 4. UI RENDER
  // -------------------------------------------------------
  const containerColor = isAlarmActive ? "#FFEBEE" : "#f2f2f2";
  const cardColor = isAlarmActive ? "#FFCDD2" : "#fff";
  const iconColor = isAlarmActive ? "#D32F2F" : "#4CAF50";
  const statusTextColor = isAlarmActive ? "#D32F2F" : "#888";

  return (
    <View style={[styles.container, { backgroundColor: containerColor }]}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        
        <View style={[styles.iconCircle, { backgroundColor: isAlarmActive ? '#FFEBEE' : '#E8F5E9' }]}>
          <MaterialIcons 
            name={isAlarmActive ? "warning" : "thermostat"} 
            size={60} 
            color={iconColor} 
          />
        </View>

        <Text style={styles.title}>Incubator Monitor</Text>
        
        <Text style={[styles.status, { color: statusTextColor, fontWeight: isAlarmActive ? 'bold' : 'normal' }]}>
          {status}
        </Text>

        <View style={styles.dataRow}>
          <View style={styles.dataItem}>
            <Text style={styles.dataLabel}>Temp</Text>
            <Text style={[styles.dataValue, { 
              color: (typeof data.temperature === 'number' && (data.temperature < TEMP_MIN || data.temperature > TEMP_MAX)) ? "#D32F2F" : "#4CAF50" 
            }]}>
              {data.temperature}°C
            </Text>
            <Text style={styles.rangeText}>{TEMP_MIN} - {TEMP_MAX}</Text>
          </View>

          <View style={[styles.dataItem, styles.borderLeft]}>
            <Text style={styles.dataLabel}>Humidity</Text>
            <Text style={[styles.dataValue, { 
              color: (typeof data.humidity === 'number' && (data.humidity < HUM_MIN || data.humidity > HUM_MAX)) ? "#D32F2F" : "#4CAF50" 
            }]}>
              {data.humidity}%
            </Text>
            <Text style={styles.rangeText}>{HUM_MIN} - {HUM_MAX}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: isAlarmActive ? "#D32F2F" : "#4CAF50" }]}
          onPress={isAlarmActive ? stopAlarm : handleManualRefresh}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isAlarmActive ? "SILENCE ALARM" : "Refresh Now"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 5,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  status: { fontSize: 14, marginBottom: 30, marginTop: 5 },
  dataRow: { flexDirection: "row", width: "100%", marginBottom: 30 },
  dataItem: { flex: 1, alignItems: "center" },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: "#rgba(0,0,0,0.1)" },
  dataLabel: { fontSize: 14, color: "#555", marginBottom: 5 },
  dataValue: { fontSize: 32, fontWeight: "bold" },
  rangeText: { fontSize: 10, color: "#888", marginTop: 4 },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});