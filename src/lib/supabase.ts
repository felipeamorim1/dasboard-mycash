import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Database interface (can be generated automatically later)
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            transactions: {
                Row: {
                    id: string
                    created_at: string
                    description: string
                    amount: number
                    type: 'income' | 'expense'
                    category: string
                    balance_after: number
                    date: string
                }
                Insert: {
                    id?: string
                    created_at?: string
                    description: string
                    amount: number
                    type: 'income' | 'expense'
                    category: string
                    balance_after?: number
                    date: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    description?: string
                    amount?: number
                    type?: 'income' | 'expense'
                    category?: string
                    balance_after?: number
                    date?: string
                }
            }
        }
    }
}

// Validate configuration
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('⚠️ Supabase URL or Anon Key is missing. Check your .env file.');
}

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
