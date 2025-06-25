import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghkvifoifoceduqjrsji.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdoa3ZpZm9pZm9jZWR1cWpyc2ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Njg5ODAsImV4cCI6MjA2NjQ0NDk4MH0.9Y9zm2A7RS9lhOvKNh0YDDTfoj--5Ky_pbgVRQp0Evk'; // <-- replace this

export const supabase = createClient(supabaseUrl, supabaseKey);