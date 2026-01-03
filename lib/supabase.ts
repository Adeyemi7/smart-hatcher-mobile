import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';

// 1. Define the SecureStore Adapter
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    return SecureStore.deleteItemAsync(key);
  },
};

// 2. Your Credentials
const SUPABASE_URL = 'https://hgrsmdlyytqdcvfcybdz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_1i3yOcmhqxXg8ZxNIF6fmQ_CTadDoiv'; // Note: It's better to use .env files for this!

// 3. Initialize the Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter, // <--- Replaced AsyncStorage here
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 4. App State Listener (Recommended for React Native)
// This tells Supabase to stop refreshing tokens when the app is in the background
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});