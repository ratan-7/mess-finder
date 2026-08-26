import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/login`, {
        email,
        password,
      });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-kraft-dots flex items-center justify-center px-4">
      <div className="bg-cream border-[1.5px] border-ink rounded-lg p-6 w-full max-w-xs">
        <h2 className="font-display font-bold text-xl text-ink mb-4">
          Admin Login
        </h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-dash-dark rounded-md text-sm mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3.5 py-2.5 border border-dash-dark rounded-md text-sm mb-3"
        />
        {error && <p className="text-chili text-xs mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-ink text-cream font-semibold rounded-md py-2.5"
        >
          Login
        </button>
      </div>
    </div>
  );
}
