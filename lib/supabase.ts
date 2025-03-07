import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export type EmailSignup = {
  id: number
  email: string
  created_at: string
}

export type LeadForm = {
  id: number
  full_name: string
  email: string
  company_name: string
  use_case: string
  created_at: string
}

export type Lead = {
  id?: number
  created_at?: string
  name: string
  email: string
  tel?: string
} 