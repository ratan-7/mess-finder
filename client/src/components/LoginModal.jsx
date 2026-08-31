import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function LoginModal({ onClose, onLoggedIn }) {
  const [role, setRole] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_BASE}/google`, {
        credential: credentialResponse.credential,
        role,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLoggedIn(res.data.token, res.data.user);
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Google login failed");
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
        {!role ? (
          <>
            <h3 className="font-display font-semibold text-xl text-ink mb-1">
              Continue as
            </h3>
            <p className="text-xs text-muted mb-5">
              Choose how you want to use messkhoj.
            </p>

            <button
              onClick={() => setRole("student")}
              className="w-full text-left border-[1.5px] border-ink rounded-lg p-4 mb-3 hover:bg-turmeric/10"
            >
              <div className="font-display font-semibold text-base text-ink mb-0.5">
                🎓 Student
              </div>
              <p className="text-xs text-muted">
                Find and unlock mess details near you
              </p>
            </button>

            <button
              onClick={() => setRole("mess_owner")}
              className="w-full text-left border-[1.5px] border-ink rounded-lg p-4 mb-4 hover:bg-turmeric/10"
            >
              <div className="font-display font-semibold text-base text-ink mb-0.5">
                🍱 Mess Owner
              </div>
              <p className="text-xs text-muted">
                List your mess and reach more students
              </p>
            </button>
          </>
        ) : (
          <>
            <h3 className="font-display font-semibold text-xl text-ink mb-1">
              {role === "student" ? "Student login" : "Mess Owner login"}
            </h3>
            <p className="text-xs text-muted mb-5">
              Continue with your Google account.
            </p>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => alert("Google login failed")}
                theme="outline"
                size="large"
                text="continue_with"
                width="260"
              />
            </div>

            <button
              onClick={() => setRole(null)}
              className="w-full text-muted text-xs mt-4 py-1"
            >
              ← Back
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full text-muted text-xs mt-2 py-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
