import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg("Invalid credentials. Please try again.");
    } else {
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1e1e] text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#2b2b2b] p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {errorMsg && (
          <div className="bg-red-700 text-sm px-4 py-2 rounded">{errorMsg}</div>
        )}

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center text-sm">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-tower-yellow text-black font-semibold py-2 rounded hover:bg-yellow-300 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/request-account"
            className="text-tower-yellow hover:underline"
          >
            Request one here
          </Link>
        </div>
      </form>
    </div>
  );
}
