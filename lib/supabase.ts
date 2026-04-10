/**
 * Supabase Client Configuration
 * 
 * This file exports:
 * 1. Browser client (anon key) — safe for client-side queries
 * 2. Server client (service_role key) — ONLY used in Server Actions
 * 
 * SECURITY: Never import service_role client in client components!
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

/**
 * Browser client — safe for client-side use (read-only or with RLS policies)
 * Use this in Client Components when needed
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Server client — ONLY use in Server Actions and API routes
 * This has unrestricted access via service_role key
 * NEVER pass to client components or expose in browser
 */
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false, // Server-side, no session persistence
  },
});
