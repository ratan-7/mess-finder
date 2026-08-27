import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function LoginModal({ onClose, onLoggedIn }) {
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API_BASE}/google`, {
        credential: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);

      onLoggedIn(res.data.token);

      onClose();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message || "Google login failed. Please try again.",
      );
    }
  };

  const handleGoogleError = () => {
    alert("Google Login Failed");
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
        <h3 className="font-display font-semibold text-xl text-ink mb-1">
          Login to unlock
        </h3>

        <p className="text-xs text-muted mb-5">
          Continue with your Google account.
        </p>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            size="large"
            text="continue_with"
            width="280"
          />
        </div>

        <button
          onClick={onClose}
          className="w-full text-muted text-xs mt-4 py-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
