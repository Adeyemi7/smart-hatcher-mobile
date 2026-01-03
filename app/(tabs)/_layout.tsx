import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import AlertsScreen from './AlertScreen'
import ConnectScreen from './ConnectScreen'
import HomeScreen from './HomeScreen'
import SettingsScreen from './SettingsScreen'

const Tab = createBottomTabNavigator()

export default function Layout() {
  return (
    <Tab.Navigator
      initialRouteName="Connect"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#F8FAFC',
          borderTopWidth: 0.5,
        },
        tabBarIcon: ({ color, size }) => {
          // Initialize with a fallback, but we will overwrite it below
          let iconName: keyof typeof MaterialIcons.glyphMap = 'help-outline'

          if (route.name === 'Connect') {
            iconName = 'wifi' // <--- Changed to Wifi icon
          } else if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Alerts') {
            iconName = 'notifications'
          } else if (route.name === 'Settings') {
            iconName = 'settings'
          }

          return <MaterialIcons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#757575',
      })}
    >
      <Tab.Screen name="Connect" component={ConnectScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}