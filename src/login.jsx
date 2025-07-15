import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import { useUser } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");


  const { user, loading } = useUser();

if (loading) {
  return <div className="text-white p-4">Checking session...</div>;
}

if (user) {
  return <Navigate to="/admin" />;
}

const handleLogin = async (e) => {
  e.preventDefault();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://fresno-music-calendar1.vercel.app/"
    }
  });
  if (error) {
    setError(error.message);
  } else {
    alert("Check your email for the login link!");
  }
};


  return (
    <div className="p-8 max-w-md mx-auto text-white">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-white text-black"
          required
        />
        <button type="submit" className="bg-[#216568] px-4 py-2 rounded text-white w-full">
          Send Magic Link
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  );
}
