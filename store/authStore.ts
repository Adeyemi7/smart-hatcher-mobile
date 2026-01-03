import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,

  setSession: (session) => {
    set({ session, user: session?.user || null });
  },

  signIn: async (email, password) => {
    set({ loading: true });
    // Supabase will now use SecureStore under the hood automatically
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    set({ loading: false });
    return { error: error?.message || null };
  },

  signUp: async (email, password, username) => {
    set({ loading: true });

    console.log('Signing up user with email:', email, 'and username:', username);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        // Ensure you have configured this scheme in your app.json/Info.plist
        emailRedirectTo: 'smarthatcher://', 
      },
    });

    console.log("Supabase Response:", { error }); // Debug Log 2
    set({ loading: false });
    return { error: error?.message || null };
  },

  resetPassword: async (email) => {
    set({ loading: true });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'smarthatcher://reset-password',
    });
    set({ loading: false });
    return { error: error?.message || null };
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));