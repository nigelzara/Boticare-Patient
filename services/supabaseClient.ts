import { createClient } from '@supabase/supabase-js';

// Configuration for Supabase
// Using environment variables for better security and flexibility
let supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Sanitize URL: Remove trailing slash and /rest/v1 if present
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase credentials missing! Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local");
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
    return !!supabaseUrl && !!supabaseAnonKey;
};
