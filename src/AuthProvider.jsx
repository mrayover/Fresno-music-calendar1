import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

useEffect(() => {
  // Step 1: Try restoring existing session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user || null);
  });

  // Step 2: Listen for auth changes (e.g., after magic link login)
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null);
  });

  // Step 3: Cleanup
  return () => subscription.unsubscribe();
}, []);


  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useUser = () => useContext(AuthContext);
