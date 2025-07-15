import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useUser } from "./AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  // ✅ If already logged in, redirect to /admin
  if (user) {
    return <Navigate to="/admin" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://fresno-music-calendar1.vercel.app/",
      },
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Check your email for the login link!");
    }
  };

  return (
    <div className="text-white p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="w-full p-2 rounded text-black mb-2"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 p-2 rounded text-white">
          Send Magic Link
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
    </div>
  );
}
