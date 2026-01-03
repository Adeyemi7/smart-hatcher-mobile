




// import { Stack } from "expo-router";
// import React, { useEffect } from "react";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { ToastProvider } from "../components/Toast/ToastProvider";

// // New simplified imports (Relative paths!)
// import { supabase } from "@/lib/supabase";
// import { useAuthStore } from "@/store/authStore";

// export default function RootLayout() {
//   // Zustand hook: We only need the 'setSession' action here
//  const { setSession } = useAuthStore();

//   useEffect(() => {
//     // Check session on startup
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     // Listen for auth state changes (catches email verification)
//     const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });

//     return () => {
//       authListener.subscription.unsubscribe();
//     };
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         <ToastProvider>
//           <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="index" />
//             <Stack.Screen name="Intros/OnboardingScreen" />
//             <Stack.Screen name="Auth/WelcomeScreen" />
//             <Stack.Screen name="Auth/SignUpScreen" />
//             <Stack.Screen name="Auth/LoginScreen" />
//             <Stack.Screen name="Auth/forgotPasswordScreen" />
//             <Stack.Screen name="(tab)" />
//           </Stack>
//         </ToastProvider>
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "../components/Toast/ToastProvider";

// Adjust path if needed (e.g. "../lib/supabase")
import Toast from 'react-native-toast-message';
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../store/authStore";

// Prevent the splash screen from auto-hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setSession } = useAuthStore();

  // 1. Load Fonts for your Icons
  const [fontsLoaded] = useFonts({
    // Load the MaterialIcons font files
    ...MaterialIcons.font, 
  });

  // 2. Handle Session & Font Loading
  useEffect(() => {
    // Hide splash screen only when fonts are ready
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    // Check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fontsLoaded]);

  // Return null to keep Splash Screen up if fonts aren't loaded yet
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {/* Remove SafeAreaView here to avoid double padding */}
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Intros/OnboardingScreen" />
          <Stack.Screen name="Auth/WelcomeScreen" />
          <Stack.Screen name="Auth/SignUpScreen" />
          <Stack.Screen name="Auth/LoginScreen" />
          <Stack.Screen name="Auth/forgotPasswordScreen" />
          
          {/* FIX: Ensure this matches your folder name (usually "(tabs)") */}
          <Stack.Screen name="(tabs)" /> 
        </Stack>
        <Toast />
      </ToastProvider>
    </SafeAreaProvider>
  );
}