// utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Function to fetch providers from Supabase
export const fetchProvidersFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('service_providers') // The name of your table
        .select('*'); // Fetch all columns
  
      if (error) {
        console.error('Error fetching providers from Supabase:', error.message);
        return [];
      }
  
      return data || []; // Return data if available, otherwise return empty array
    } catch (err) {
      console.error('Error in fetchProvidersFromSupabase:', err);
      return [];
    }
  };

  export default supabase;
