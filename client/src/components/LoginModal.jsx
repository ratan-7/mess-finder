import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api ";

export default function LoginModal({ onClose, onLoggedIn }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {
    setError("");
    try {
      await axios.post(`${API_BASE}/sent-otp`, { phone });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const verifyOtp = async () => {
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/verify-otp`, {
        phone,
        code,
      });
      onLoggedIn(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="fixed inset-0 bg-ink/60 flex items-center justify-center">
      <div className="bg-cream rounded-lg p-6 w-80">
        {step === "phone" ? (
          <>
            <h3 className="text-xl font-bold text-ink mb-2">Login to unlock</h3>
            <p className="text-sm text-muted mb-4">Enter your phone number</p>
            <input
              type="text"
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-muted rounded px-3 py-2 mb-3"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-ink text-cream font-semibold py-2 rounded mb-2"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-ink mb-2">Enter OTP</h3>
            <p className="text-sm text-muted mb-4">Sent to {phone}</p>
            <input
              type="text"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-muted rounded px-3 py-2 mb-3"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-ink text-cream font-semibold py-2 rounded mb-2"
            >
              Verify
            </button>
          </>
        )}
        {error && <p className="text-chili text-sm mb-2">{error}</p>}
        <button onClick={onClose} className="w-full text-muted text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
