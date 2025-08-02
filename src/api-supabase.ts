import { supabase } from './supabase';

export const apiService = {
  async getFighters() {
    const { data, error } = await supabase.from('fighters').select('*');
    if (error) throw new Error(error.message);
    return data;
  },
  // ... other functions will be added here
};
