import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

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
    <div className="min-h-screen bg-kraft-dots flex items-center justify-center">
      <div className="bg-cream border-2 border-ink rounded-lg p-6 w-80">
        <h2 className="text-xl font-bold text-ink mb-4">Admin Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-muted rounded px-3 py-2 mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-muted rounded px-3 py-2 mb-3"
        />
        {error && <p className="text-chili text-sm mb-2">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-ink text-cream font-semibold py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
