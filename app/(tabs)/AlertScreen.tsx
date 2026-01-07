// import { MaterialIcons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   SectionList,
//   SectionListRenderItem,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// // ---------------------------------------------------------
// // 1. TYPE DEFINITIONS
// // ---------------------------------------------------------
// interface Alert {
//   id: number;
//   message: string;
//   timestamp: string;
// }

// interface AlertSection {
//   title: string;
//   data: Alert[];
// }

// // ---------------------------------------------------------
// // 2. CONFIGURATION
// // ---------------------------------------------------------
// const API_URL = "http://10.228.226.224:3000/api/alerts";

// export default function AlertScreen() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [sections, setSections] = useState<AlertSection[]>([]);

//   // -------------------------------------------------------
//   // 3. FETCH AND GROUP DATA
//   // -------------------------------------------------------
//   const fetchAlerts = async () => {
//     try {
//       // Step A: Fetch data from backend
//       // const response = await fetch(API_URL);
//       // const data: Alert[] = await response.json();

//       // --- MOCK DATA ---
//       const data: Alert[] = [
//         {
//           id: 1,
//           message: "Incubator temp critical (39°C)",
//           timestamp: "2026-01-01T19:30:00",
//         },
//         {
//           id: 2,
//           message: "Humidity drop detected",
//           timestamp: "2026-01-01T14:15:00",
//         },
//         { id: 3, message: "Power failure", timestamp: "2025-12-31T09:00:00" },
//         {
//           id: 4,
//           message: "System restarted",
//           timestamp: "2025-12-31T08:55:00",
//         },
//         { id: 5, message: "Door opened", timestamp: "2025-12-28T10:00:00" },
//       ];

//       // Step B: Sort by Time (Newest First)
//       const sortedData = data.sort(
//         (a, b) =>
//           new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
//       );

//       // Step C: Group by Date Header
//       const grouped = groupDataByDate(sortedData);
//       setSections(grouped);
//     } catch (error) {
//       console.error("Error fetching alerts:", error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Helper function to create the "Day/Date" headers
//   const groupDataByDate = (data: Alert[]): AlertSection[] => {
//     const groups = data.reduce((acc: Record<string, Alert[]>, item) => {
//       const date = new Date(item.timestamp);

//       const today = new Date();
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);

//       let dateKey = date.toLocaleDateString("en-US", {
//         weekday: "short",
//         month: "short",
//         day: "numeric",
//       });

//       if (date.toDateString() === today.toDateString()) {
//         dateKey = "Today";
//       } else if (date.toDateString() === yesterday.toDateString()) {
//         dateKey = "Yesterday";
//       }

//       if (!acc[dateKey]) {
//         acc[dateKey] = [];
//       }
//       acc[dateKey].push(item);
//       return acc;
//     }, {});

//     return Object.keys(groups).map((key) => ({
//       title: key,
//       data: groups[key],
//     }));
//   };

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

//   // -------------------------------------------------------
//   // 4. UI RENDERING
//   // -------------------------------------------------------

//   const renderItem: SectionListRenderItem<Alert, AlertSection> = ({ item }) => {
//     const timeString = new Date(item.timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     return (
//       <View style={styles.card}>
//         <View
//           style={[
//             styles.iconBox,
//             {
//               backgroundColor: item.message.includes("critical")
//                 ? "#FFEBEE"
//                 : "#E3F2FD",
//             },
//           ]}
//         >
//           <MaterialIcons
//             name={item.message.includes("critical") ? "warning" : "info"}
//             size={24}
//             color={item.message.includes("critical") ? "#D32F2F" : "#1976D2"}
//           />
//         </View>
//         <View style={styles.contentBox}>
//           <Text style={styles.message}>{item.message}</Text>
//           <Text style={styles.time}>{timeString}</Text>
//         </View>
//       </View>
//     );
//   };

//   const renderSectionHeader = ({
//     section: { title },
//   }: {
//     section: AlertSection;
//   }) => (
//     <View style={styles.header}>
//       <Text style={styles.headerText}>{title}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.screen}>
//       {loading ? (
//         <ActivityIndicator
//           size="large"
//           color="#4CAF50"
//           style={{ marginTop: 50 }}
//         />
//       ) : (
//         <SectionList<Alert, AlertSection>
//           sections={sections}
//           keyExtractor={(item, index) => item.id.toString() + index}
//           renderItem={renderItem}
//           renderSectionHeader={renderSectionHeader}
//           contentContainerStyle={{ padding: 16 }}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={() => {
//                 setRefreshing(true);
//                 fetchAlerts();
//               }}
//             />
//           }
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>No alerts recorded yet.</Text>
//           }
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: "#F5F5F5" },
//   header: {
//     paddingVertical: 10,
//     backgroundColor: "#F5F5F5",
//   },
//   headerText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#757575",
//     textTransform: "uppercase",
//   },
//   card: {
//     flexDirection: "row",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   iconBox: {
//     width: 45,
//     height: 45,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },
//   contentBox: {
//     flex: 1,
//   },
//   message: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 4,
//   },
//   time: {
//     fontSize: 12,
//     color: "#999",
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 50,
//     color: "#888",
//     fontSize: 16,
//   },
// });



// import { MaterialIcons } from "@expo/vector-icons";
// import * as SecureStore from 'expo-secure-store';
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   SectionList,
//   SectionListRenderItem,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// // ---------------------------------------------------------
// // 1. CONFIGURATION
// // ---------------------------------------------------------
// const API_URL = "http://51.21.3.129/api/sensor";
// const STORAGE_KEY = "incubator_alerts_v1";

// const TEMP_MIN = 37.5;
// const TEMP_MAX = 39.4;
// const HUM_MIN = 60.0;
// const HUM_MAX = 65.0;
// const INCUBATION_DAYS = 21;

// interface SensorData {
//   temperature: number;
//   humidity: number;
// }

// interface AlertItem {
//   id: string;
//   message: string;
//   timestamp: string;
//   isTempIssue: boolean;
// }

// interface AlertSection {
//   title: string;
//   data: AlertItem[];
// }

// export default function AlertScreen() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [alerts, setAlerts] = useState<AlertItem[]>([]);
  
//   const insets = useSafeAreaInsets();
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // -------------------------------------------------------
//   // 2. STORAGE LOGIC
//   // -------------------------------------------------------
//   const loadAndCleanupData = useCallback(async () => {
//     try {
//       const jsonStr = await SecureStore.getItemAsync(STORAGE_KEY);
//       const allAlerts: AlertItem[] = jsonStr ? JSON.parse(jsonStr) : [];
//       const limitDate = new Date();
//       limitDate.setDate(limitDate.getDate() - INCUBATION_DAYS);
//       const filtered = allAlerts.filter(item => new Date(item.timestamp) >= limitDate);
//       setAlerts(filtered);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   // -------------------------------------------------------
//   // 3. LOGIC: INDEPENDENT CHECKS FOR TEMP & HUM
//   // -------------------------------------------------------
//   const fetchAndCheckRange = useCallback(async () => {
//     try {
//       const response = await fetch(API_URL);
//       const data: SensorData = await response.json();

//       let tempPart = "";
//       let humPart = "";
//       let isTemp = false;

//       // Check Temp independently
//       if (data.temperature < TEMP_MIN) {
//         tempPart = `Low Temp (${data.temperature.toFixed(1)}°C)`;
//         isTemp = true;
//       } else if (data.temperature > TEMP_MAX) {
//         tempPart = `High Temp (${data.temperature.toFixed(1)}°C)`;
//         isTemp = true;
//       }

//       // Check Humidity independently
//       if (data.humidity < HUM_MIN) {
//         humPart = `Low Hum (${data.humidity.toFixed(1)}%)`;
//       } else if (data.humidity > HUM_MAX) {
//         humPart = `High Hum (${data.humidity.toFixed(1)}%)`;
//       }

//       // If either has an issue, log a card
//       if (tempPart || humPart) {
//         const fullMessage = [tempPart, humPart].filter(Boolean).join(" & ");
        
//         const newEntry: AlertItem = {
//           id: Date.now().toString(),
//           message: fullMessage,
//           timestamp: new Date().toISOString(),
//           isTempIssue: isTemp
//         };

//         setAlerts((current) => {
//           // Prevent duplicates
//           if (current.length > 0 && current[0].message === newEntry.message) {
//             return current;
//           }
//           const updated = [newEntry, ...current];
//           SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
//           return updated;
//         });
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     }
//   }, []);

//   useEffect(() => {
//     loadAndCleanupData();
//     fetchAndCheckRange();
//     timerRef.current = setInterval(fetchAndCheckRange, 60000);
//     return () => { if (timerRef.current) clearInterval(timerRef.current); };
//   }, [fetchAndCheckRange, loadAndCleanupData]);

//   // -------------------------------------------------------
//   // 4. UI RENDERING (FORMER UI STYLE)
//   // -------------------------------------------------------
//   const sections = useMemo(() => {
//     const groups = alerts.reduce((acc: any, item) => {
//       const dateKey = new Date(item.timestamp).toDateString() === new Date().toDateString() 
//         ? "Today" 
//         : new Date(item.timestamp).toLocaleDateString();
//       if (!acc[dateKey]) acc[dateKey] = [];
//       acc[dateKey].push(item);
//       return acc;
//     }, {});
//     return Object.keys(groups).map(key => ({ title: key, data: groups[key] }));
//   }, [alerts]);

//   const renderItem: SectionListRenderItem<AlertItem, AlertSection> = ({ item }) => {
//     const timeString = new Date(item.timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//     return (
//       <View style={styles.card}>
//         <View
//           style={[
//             styles.iconBox,
//             { backgroundColor: item.isTempIssue ? "#FFEBEE" : "#FFF3E0" },
//           ]}
//         >
//           <MaterialIcons
//             name="warning"
//             size={24}
//             color={item.isTempIssue ? "#D32F2F" : "#EF6C00"}
//           />
//         </View>
//         <View style={styles.contentBox}>
//           <Text style={styles.message}>{item.message}</Text>
//           <Text style={styles.time}>{timeString}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={[styles.screen, { paddingTop: insets.top }]}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 50 }} />
//       ) : (
//         <SectionList
//           sections={sections}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           renderSectionHeader={({ section: { title } }) => (
//             <View style={styles.header}>
//               <Text style={styles.headerText}>{title}</Text>
//             </View>
//           )}
//           contentContainerStyle={{ padding: 16 }}
//           refreshControl={
//             <RefreshControl 
//                 refreshing={refreshing} 
//                 onRefresh={() => { setRefreshing(true); loadAndCleanupData(); fetchAndCheckRange(); }} 
//             />
//           }
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>All environment readings are stable.</Text>
//           }
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: "#F5F5F5" },
//   header: { paddingVertical: 10, backgroundColor: "#F5F5F5" },
//   headerText: { fontSize: 14, fontWeight: "bold", color: "#757575", textTransform: "uppercase" },
//   card: {
//     flexDirection: "row", backgroundColor: "#fff", padding: 15, borderRadius: 12,
//     marginBottom: 10, alignItems: "center", elevation: 3,
//     shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1, shadowRadius: 4,
//   },
//   iconBox: { width: 45, height: 45, borderRadius: 25, justifyContent: "center", alignItems: "center", marginRight: 15 },
//   contentBox: { flex: 1 },
//   message: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 4 },
//   time: { fontSize: 12, color: "#999" },
//   emptyText: { textAlign: "center", marginTop: 50, color: "#888", fontSize: 16 },
// });



// import { MaterialIcons } from "@expo/vector-icons";
// import * as SecureStore from 'expo-secure-store';
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   SectionList,
//   SectionListRenderItem,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// // ---------------------------------------------------------
// // 1. CONFIGURATION
// // ---------------------------------------------------------
// const API_URL = "http://51.21.3.129/api/sensor";
// const STORAGE_KEY = "incubator_alerts_v1";

// const TEMP_MIN = 37.5;
// const TEMP_MAX = 39.4;
// const HUM_MIN = 60.0;
// const HUM_MAX = 65.0;
// const INCUBATION_DAYS = 21;

// interface SensorData {
//   temperature: number;
//   humidity: number;
// }

// interface AlertItem {
//   id: string;
//   message: string;
//   timestamp: string;
//   isTempIssue: boolean; // If true, UI will be RED. If false, ORANGE.
// }

// interface AlertSection {
//   title: string;
//   data: AlertItem[];
// }

// export default function AlertScreen() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [alerts, setAlerts] = useState<AlertItem[]>([]);
//   const [lastCheck, setLastCheck] = useState<string>("Never"); // State for the Sync badge
  
//   const insets = useSafeAreaInsets();
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   // -------------------------------------------------------
//   // 2. STORAGE LOGIC
//   // -------------------------------------------------------
//   const loadAndCleanupData = useCallback(async () => {
//     try {
//       const jsonStr = await SecureStore.getItemAsync(STORAGE_KEY);
//       const allAlerts: AlertItem[] = jsonStr ? JSON.parse(jsonStr) : [];
//       const limitDate = new Date();
//       limitDate.setDate(limitDate.getDate() - INCUBATION_DAYS);
//       const filtered = allAlerts.filter(item => new Date(item.timestamp) >= limitDate);
//       setAlerts(filtered);
//     } catch (e) {
//       console.error("Load Error:", e);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   // -------------------------------------------------------
//   // 3. LOGIC: INDEPENDENT CHECKS
//   // -------------------------------------------------------
//   const fetchAndCheckRange = useCallback(async () => {
//     try {
//       const response = await fetch(API_URL);
//       const data: SensorData = await response.json();
      
//       // Update the sync time for the header badge
//       setLastCheck(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

//       let tempPart = "";
//       let humPart = "";
//       let isTemp = false;

//       // 1. Check Temp
//       if (data.temperature < TEMP_MIN) {
//         tempPart = `Low Temp (${data.temperature.toFixed(1)}°C)`;
//         isTemp = true;
//       } else if (data.temperature > TEMP_MAX) {
//         tempPart = `High Temp (${data.temperature.toFixed(1)}°C)`;
//         isTemp = true;
//       }

//       // 2. Check Humidity
//       if (data.humidity < HUM_MIN) {
//         humPart = `Low Hum (${data.humidity.toFixed(1)}%)`;
//       } else if (data.humidity > HUM_MAX) {
//         humPart = `High Hum (${data.humidity.toFixed(1)}%)`;
//       }

//       // 3. Log if either is bad
//       if (tempPart || humPart) {
//         const fullMessage = [tempPart, humPart].filter(Boolean).join(" & ");
        
//         const newEntry: AlertItem = {
//           id: Date.now().toString(),
//           message: fullMessage,
//           timestamp: new Date().toISOString(),
//           isTempIssue: isTemp // If BOTH are bad, isTemp is true, color is RED.
//         };

//         setAlerts((current) => {
//           if (current.length > 0 && current[0].message === newEntry.message) {
//             return current;
//           }
//           const updated = [newEntry, ...current];
//           SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
//           return updated;
//         });
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     }
//   }, []);

//   useEffect(() => {
//     loadAndCleanupData();
//     fetchAndCheckRange();
//     timerRef.current = setInterval(fetchAndCheckRange, 60000);
//     return () => { if (timerRef.current) clearInterval(timerRef.current); };
//   }, [fetchAndCheckRange, loadAndCleanupData]);

//   // -------------------------------------------------------
//   // 4. UI RENDERING
//   // -------------------------------------------------------
//   const sections = useMemo(() => {
//     const groups = alerts.reduce((acc: any, item) => {
//       const dateKey = new Date(item.timestamp).toDateString() === new Date().toDateString() 
//         ? "Today" 
//         : new Date(item.timestamp).toLocaleDateString();
//       if (!acc[dateKey]) acc[dateKey] = [];
//       acc[dateKey].push(item);
//       return acc;
//     }, {});
//     return Object.keys(groups).map(key => ({ title: key, data: groups[key] }));
//   }, [alerts]);

//   const renderItem: SectionListRenderItem<AlertItem, AlertSection> = ({ item }) => (
//     <View style={styles.card}>
//       <View style={[styles.iconBox, { backgroundColor: item.isTempIssue ? "#FFEBEE" : "#FFF3E0" }]}>
//         <MaterialIcons 
//           name="warning" 
//           size={24} 
//           color={item.isTempIssue ? "#D32F2F" : "#EF6C00"} 
//         />
//       </View>
//       <View style={styles.contentBox}>
//         <Text style={styles.message}>{item.message}</Text>
//         <Text style={styles.time}>
//           {new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//         </Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={[styles.screen, { paddingTop: insets.top }]}>
//       {/* RESTORED HEADER */}
//       <View style={styles.topHeader}>
//         <View>
//           <Text style={styles.topHeaderTitle}>Incubation Logs</Text>
//           <Text style={styles.topHeaderSub}>Monitoring Temp & Hum</Text>
//         </View>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>Sync: {lastCheck}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 50 }} />
//       ) : (
//         <SectionList
//           sections={sections}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           renderSectionHeader={({ section: { title } }) => (
//             <View style={styles.header}>
//               <Text style={styles.headerText}>{title}</Text>
//             </View>
//           )}
//           contentContainerStyle={{ padding: 16 }}
//           refreshControl={
//             <RefreshControl 
//                 refreshing={refreshing} 
//                 onRefresh={() => { setRefreshing(true); loadAndCleanupData(); fetchAndCheckRange(); }} 
//             />
//           }
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>All environment readings are stable.</Text>
//           }
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: "#F5F5F5" },
//   // HEADER STYLES
//   topHeader: { 
//     padding: 20, 
//     backgroundColor: "#FFF", 
//     flexDirection: 'row', 
//     justifyContent: 'space-between', 
//     alignItems: 'center', 
//     borderBottomWidth: 1, 
//     borderBottomColor: "#EEE" 
//   },
//   topHeaderTitle: { fontSize: 22, fontWeight: "800", color: "#1A1A1A" },
//   topHeaderSub: { fontSize: 12, color: "#666", fontWeight: "600", textTransform: "uppercase" },
//   badge: { backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
//   badgeText: { fontSize: 10, color: '#666', fontWeight: 'bold' },
  
//   // LIST STYLES
//   header: { paddingVertical: 10, paddingHorizontal: 4, backgroundColor: "#F5F5F5" },
//   headerText: { fontSize: 13, fontWeight: "bold", color: "#999", textTransform: "uppercase" },
//   card: {
//     flexDirection: "row", backgroundColor: "#fff", padding: 15, borderRadius: 12,
//     marginBottom: 10, alignItems: "center", elevation: 3,
//     shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1, shadowRadius: 4,
//   },
//   iconBox: { width: 45, height: 45, borderRadius: 25, justifyContent: "center", alignItems: "center", marginRight: 15 },
//   contentBox: { flex: 1 },
//   message: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 4 },
//   time: { fontSize: 12, color: "#999" },
//   emptyText: { textAlign: "center", marginTop: 50, color: "#888", fontSize: 16 },
// });



// import { MaterialIcons } from "@expo/vector-icons";
// import * as SecureStore from 'expo-secure-store';
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   ActivityIndicator,
//   Animated,
//   RefreshControl,
//   SectionList,
//   SectionListRenderItem,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// // ---------------------------------------------------------
// // 1. CONFIGURATION
// // ---------------------------------------------------------
// const API_URL = "http://51.21.3.129/api/sensor";
// const STORAGE_KEY = "incubator_alerts_v1";

// const TEMP_MIN = 37.5;
// const TEMP_MAX = 39.4;
// const HUM_MIN = 60.0;
// const HUM_MAX = 65.0;
// const INCUBATION_DAYS = 21;

// interface SensorData {
//   temperature: number;
//   humidity: number;
// }

// interface AlertItem {
//   id: string;
//   message: string;
//   timestamp: string;
//   isTempIssue: boolean;
// }

// interface AlertSection {
//   title: string;
//   data: AlertItem[];
// }

// export default function AlertScreen() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [alerts, setAlerts] = useState<AlertItem[]>([]);
//   const [lastCheck, setLastCheck] = useState<string>("Never");
  
//   const insets = useSafeAreaInsets();
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const blinkAnim = useRef(new Animated.Value(0.3)).current;

//   // -------------------------------------------------------
//   // 2. ANIMATION: STATUS INDICATOR (Heartbeat)
//   // -------------------------------------------------------
//   useEffect(() => {
//     const pulse = Animated.loop(
//       Animated.sequence([
//         Animated.timing(blinkAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
//         Animated.timing(blinkAnim, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
//       ])
//     );
//     pulse.start();
//     return () => pulse.stop();
//   }, [blinkAnim]);

//   // -------------------------------------------------------
//   // 3. STORAGE & AUTO-CLEANUP (21 DAYS)
//   // -------------------------------------------------------
//   const loadAndCleanupData = useCallback(async () => {
//     try {
//       const jsonStr = await SecureStore.getItemAsync(STORAGE_KEY);
//       const allAlerts: AlertItem[] = jsonStr ? JSON.parse(jsonStr) : [];
      
//       const limitDate = new Date();
//       limitDate.setDate(limitDate.getDate() - INCUBATION_DAYS);

//       const filtered = allAlerts.filter(item => new Date(item.timestamp) >= limitDate);
      
//       setAlerts(filtered);
//       await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(filtered));
//     } catch (e) {
//       console.error("Cleanup/Load Error:", e);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   // -------------------------------------------------------
//   // 4. LOGIC: DUAL SENSOR MONITORING
//   // -------------------------------------------------------
//   const fetchAndCheckRange = useCallback(async () => {
//     try {
//       const response = await fetch(API_URL);
//       const data: SensorData = await response.json();
      
//       setLastCheck(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

//       let tempPart = "";
//       let humPart = "";
//       let isTemp = false;

//       if (data.temperature < TEMP_MIN) {
//         tempPart = `Low Temp (${data.temperature.toFixed(1)}°C)`;
//         isTemp = true;
//       } else if (data.temperature > TEMP_MAX) {
//         tempPart = `High Temp (${data.temperature.toFixed(1)}°C)`;
//         isTemp = true;
//       }

//       if (data.humidity < HUM_MIN) {
//         humPart = `Low Hum (${data.humidity.toFixed(1)}%)`;
//       } else if (data.humidity > HUM_MAX) {
//         humPart = `High Hum (${data.humidity.toFixed(1)}%)`;
//       }

//       if (tempPart || humPart) {
//         const fullMessage = [tempPart, humPart].filter(Boolean).join(" & ");
        
//         const newEntry: AlertItem = {
//           id: Date.now().toString(),
//           message: fullMessage,
//           timestamp: new Date().toISOString(),
//           isTempIssue: isTemp
//         };

//         setAlerts((current) => {
//           if (current.length > 0 && current[0].message === newEntry.message) return current;
//           const updated = [newEntry, ...current];
//           SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
//           return updated;
//         });
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     }
//   }, []);

//   useEffect(() => {
//     loadAndCleanupData();
//     fetchAndCheckRange();
//     timerRef.current = setInterval(fetchAndCheckRange, 60000);
//     return () => { if (timerRef.current) clearInterval(timerRef.current); };
//   }, [fetchAndCheckRange, loadAndCleanupData]);

//   // -------------------------------------------------------
//   // 5. UI FORMATTING & RENDERING
//   // -------------------------------------------------------
//   const sections = useMemo(() => {
//     const groups = alerts.reduce((acc: any, item) => {
//       const date = new Date(item.timestamp);
//       const isToday = date.toDateString() === new Date().toDateString();
//       const dateKey = isToday ? "Today" : date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });

//       if (!acc[dateKey]) acc[dateKey] = [];
//       acc[dateKey].push(item);
//       return acc;
//     }, {});
//     return Object.keys(groups).map(key => ({ title: key, data: groups[key] }));
//   }, [alerts]);

//   const renderItem: SectionListRenderItem<AlertItem, AlertSection> = ({ item }) => (
//     <View style={styles.card}>
//       <View style={[styles.iconBox, { backgroundColor: item.isTempIssue ? "#FFEBEE" : "#FFF3E0" }]}>
//         <MaterialIcons name="warning" size={24} color={item.isTempIssue ? "#D32F2F" : "#EF6C00"} />
//       </View>
//       <View style={styles.contentBox}>
//         <Text style={styles.message}>{item.message}</Text>
//         <Text style={styles.time}>{new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={[styles.screen, { paddingTop: insets.top }]}>
//       <View style={styles.topHeader}>
//         <View>
//           <View style={styles.titleRow}>
//             <Text style={styles.topHeaderTitle}>Incubation Logs</Text>
//             <Animated.View style={[styles.statusDot, { opacity: blinkAnim }]} />
//           </View>
//           <Text style={styles.topHeaderSub}>Monitoring Temp & Hum</Text>
//         </View>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>Sync: {lastCheck}</Text>
//         </View>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 50 }} />
//       ) : (
//         <SectionList
//           sections={sections}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//           renderSectionHeader={({ section: { title } }) => (
//             <View style={styles.header}><Text style={styles.headerText}>{title}</Text></View>
//           )}
//           contentContainerStyle={{ padding: 16 }}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadAndCleanupData(); fetchAndCheckRange(); }} />
//           }
//           ListEmptyComponent={
//             <Text style={styles.emptyText}>Environment is stable. No alerts logged.</Text>
//           }
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: "#F5F5F5" },
//   topHeader: { padding: 20, backgroundColor: "#FFF", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#EEE" },
//   titleRow: { flexDirection: 'row', alignItems: 'center' },
//   topHeaderTitle: { fontSize: 22, fontWeight: "800", color: "#1A1A1A" },
//   statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginLeft: 8, marginTop: 4 },
//   topHeaderSub: { fontSize: 12, color: "#666", fontWeight: "600", textTransform: "uppercase" },
//   badge: { backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
//   badgeText: { fontSize: 10, color: '#666', fontWeight: 'bold' },
//   header: { paddingVertical: 10, backgroundColor: "#F5F5F5" },
//   headerText: { fontSize: 13, fontWeight: "bold", color: "#999", textTransform: "uppercase" },
//   card: { flexDirection: "row", backgroundColor: "#fff", padding: 15, borderRadius: 12, marginBottom: 10, alignItems: "center", elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
//   iconBox: { width: 45, height: 45, borderRadius: 25, justifyContent: "center", alignItems: "center", marginRight: 15 },
//   contentBox: { flex: 1 },
//   message: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 4 },
//   time: { fontSize: 12, color: "#999" },
//   emptyText: { textAlign: "center", marginTop: 50, color: "#888", fontSize: 16 },
// });


import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
// FIX: Import specific constants alongside the namespace
import * as FileSystem from 'expo-file-system';
import { documentDirectory } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  Alert as RNAlert,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ---------------------------------------------------------
// 1. CONFIGURATION
// ---------------------------------------------------------
const API_URL = "http://51.21.3.129/api/sensor";
const STORAGE_KEY = "incubator_alerts_v1";
const TEMP_MIN = 37.5;
const TEMP_MAX = 39.4;
const HUM_MIN = 60.0;
const HUM_MAX = 65.0;
const INCUBATION_DAYS = 21;

interface AlertItem {
  id: string;
  message: string;
  timestamp: string;
  isTempIssue: boolean;
}

// FIX: Used AlertSection in the useMemo to prevent "defined but never used"
interface AlertSection {
  title: string;
  data: AlertItem[];
}

export default function AlertScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [lastCheck, setLastCheck] = useState<string>("Never");
  
  const insets = useSafeAreaInsets();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blinkAnim = useRef(new Animated.Value(0.3)).current;

  // -------------------------------------------------------
  // 2. ANIMATION & UTILITIES
  // -------------------------------------------------------
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [blinkAnim]);

  const exportLogs = async () => {
    if (alerts.length === 0) {
      RNAlert.alert("Empty Logs", "There is no data to export.");
      return;
    }
    try {
      let fileContent = "INCUBATOR MONITORING REPORT\n==========================\n\n";
      alerts.forEach((item) => {
        fileContent += `[${new Date(item.timestamp).toLocaleString()}] ${item.message}\n`;
      });
      
      const fileName = `Incubator_Logs_${new Date().toISOString().split('T')[0]}.txt`;
      
      // FIX: Use the directly imported documentDirectory
      if (!documentDirectory) {
        throw new Error("Document directory is null");
      }

      const filePath = documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(filePath, fileContent);
      await Sharing.shareAsync(filePath);
    } catch (err) {
      // FIX: Log the error to satisfy "defined but never used"
      console.error("Export failed:", err);
      RNAlert.alert("Error", "Failed to generate report.");
    }
  };

  const clearHistory = () => {
    RNAlert.alert("Clear All Logs", "Permanently delete logs?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          await SecureStore.deleteItemAsync(STORAGE_KEY);
          setAlerts([]);
      }}
    ]);
  };

  // -------------------------------------------------------
  // 3. STORAGE & MONITORING LOGIC
  // -------------------------------------------------------
  const loadAndCleanupData = useCallback(async () => {
    try {
      const jsonStr = await SecureStore.getItemAsync(STORAGE_KEY);
      const allAlerts: AlertItem[] = jsonStr ? JSON.parse(jsonStr) : [];
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() - INCUBATION_DAYS);
      const filtered = allAlerts.filter(item => new Date(item.timestamp) >= limitDate);
      setAlerts(filtered);
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(filtered));
    } catch (err) { 
      console.error("Load Error:", err); 
    } finally { 
      setLoading(false); 
      setRefreshing(false); 
    }
  }, []);

  const fetchAndCheckRange = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLastCheck(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      let tempPart = "";
      let humPart = "";
      let isTemp = false;

      if (data.temperature < TEMP_MIN) { tempPart = `Low Temp (${data.temperature.toFixed(1)}°C)`; isTemp = true; }
      else if (data.temperature > TEMP_MAX) { tempPart = `High Temp (${data.temperature.toFixed(1)}°C)`; isTemp = true; }
      if (data.humidity < HUM_MIN) { humPart = `Low Hum (${data.humidity.toFixed(1)}%)`; }
      else if (data.humidity > HUM_MAX) { humPart = `High Hum (${data.humidity.toFixed(1)}%)`; }

      if (tempPart || humPart) {
        const fullMessage = [tempPart, humPart].filter(Boolean).join(" & ");
        const newEntry = { id: Date.now().toString(), message: fullMessage, timestamp: new Date().toISOString(), isTempIssue: isTemp };
        setAlerts((current) => {
          if (current.length > 0 && current[0].message === newEntry.message) return current;
          const updated = [newEntry, ...current];
          SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) { 
      console.error("Fetch Error:", err); 
    }
  }, []);

  useEffect(() => {
    loadAndCleanupData();
    fetchAndCheckRange();
    timerRef.current = setInterval(fetchAndCheckRange, 60000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [fetchAndCheckRange, loadAndCleanupData]);

  // -------------------------------------------------------
  // 4. UI COMPONENTS
  // -------------------------------------------------------
  const sections: AlertSection[] = useMemo(() => {
    const groups = alerts.reduce((acc: any, item) => {
      const date = new Date(item.timestamp);
      const isToday = date.toDateString() === new Date().toDateString();
      const dateKey = isToday ? "Today" : date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(item);
      return acc;
    }, {});
    return Object.keys(groups).map(key => ({ title: key, data: groups[key] }));
  }, [alerts]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <View style={styles.topHeader}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleRow}>
            <Text style={styles.topHeaderTitle}>Incubation Logs</Text>
            <Animated.View style={[styles.statusDot, { opacity: blinkAnim }]} />
          </View>
          <Text style={styles.topHeaderSub}>Sync: {lastCheck}</Text>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={exportLogs}>
            <MaterialIcons name="file-download" size={22} color="#1A1A1A" />
            <Text style={styles.btnLabel}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn, { marginLeft: 15 }]} onPress={clearHistory}>
            <MaterialIcons name="delete-sweep" size={22} color="#D32F2F" />
            <Text style={[styles.btnLabel, { color: '#D32F2F' }]}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 50 }} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: item.isTempIssue ? "#FFEBEE" : "#FFF3E0" }]}>
                <MaterialIcons name="warning" size={24} color={item.isTempIssue ? "#D32F2F" : "#EF6C00"} />
              </View>
              <View style={styles.contentBox}>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.time}>{new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.header}><Text style={styles.headerText}>{title}</Text></View>
          )}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadAndCleanupData(); fetchAndCheckRange(); }} />}
          ListEmptyComponent={<Text style={styles.emptyText}>Monitoring active. No violations found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F5F5" },
  topHeader: { padding: 20, backgroundColor: "#FFF", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#EEE" },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  topHeaderTitle: { fontSize: 20, fontWeight: "800", color: "#1A1A1A" },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginLeft: 8 },
  topHeaderSub: { fontSize: 11, color: "#999", fontWeight: "700", textTransform: "uppercase" },
  actionRow: { flexDirection: 'row' },
  iconBtn: { alignItems: 'center' },
  btnLabel: { fontSize: 9, fontWeight: 'bold', marginTop: 2 },
  header: { paddingVertical: 10, backgroundColor: "#F5F5F5" },
  headerText: { fontSize: 13, fontWeight: "bold", color: "#999", textTransform: "uppercase" },
  card: { flexDirection: "row", backgroundColor: "#fff", padding: 15, borderRadius: 12, marginBottom: 10, alignItems: "center", elevation: 2 },
  iconBox: { width: 45, height: 45, borderRadius: 25, justifyContent: "center", alignItems: "center", marginRight: 15 },
  contentBox: { flex: 1 },
  message: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 4 },
  time: { fontSize: 12, color: "#999" },
  emptyText: { textAlign: "center", marginTop: 50, color: "#888", fontSize: 16 },
});