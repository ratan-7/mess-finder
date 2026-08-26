import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

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
      const res = await axios.post(`${API_BASE}/verify-otp`, { phone, code });
      onLoggedIn(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-ink/60 flex items-center justify-center p-5 z-50"
      onClick={onClose}
    >
      <div
        className="bg-cream rounded-2xl p-6 w-full max-w-xs border-[1.5px] border-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "phone" ? (
          <>
            <h3 className="font-display font-semibold text-xl text-ink mb-1">
              Login to unlock
            </h3>
            <p className="text-xs text-muted mb-4">
              Enter your phone number, we'll send an OTP.
            </p>
            <input
              placeholder="10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-3 border border-dash-dark rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-turmeric"
            />
            <button
              onClick={sendOtp}
              className="w-full bg-ink text-cream font-semibold rounded-md py-3"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <h3 className="font-display font-semibold text-xl text-ink mb-1">
              Enter OTP
            </h3>
            <p className="text-xs text-muted mb-4">Sent to {phone}</p>
            <input
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-3.5 py-3 border border-dash-dark rounded-md text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-turmeric"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-ink text-cream font-semibold rounded-md py-3"
            >
              Verify
            </button>
          </>
        )}
        {error && <p className="text-chili text-xs mt-2">{error}</p>}
        <button
          onClick={onClose}
          className="w-full text-muted text-xs mt-3 py-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
