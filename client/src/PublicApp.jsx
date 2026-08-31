import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import LocationBar from "./components/LocationBar";
import StatusBar from "./components/StatusBar";
import MessCard from "./components/MessCard";
import DetailSheet from "./components/DetailSheet";
import PlanModal from "./components/PlanModal";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;
const CATEGORIES = ["all", "boys-pg", "girls-pg"];

export default function PublicApp() {
  const [messes, setMesses] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const [selectedMess, setSelectedMess] = useState(null);
  const [planMess, setPlanMess] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [pendingUnlock, setPendingUnlock] = useState(null);

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const fetchMesses = async () => {
    setLoading(true);
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const params =
        activeCategory !== "all" ? { category: activeCategory } : {};
      const res = await axios.get(`${API_BASE}/mess`, { ...config, params });
      setMesses(res.data);
    } catch (err) {
      console.error("Failed to fetch mess list:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalCount = async () => {
    try {
      const res = await axios.get(`${API_BASE}/mess`);
      setTotalCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch total count:", err.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTotalCount();
  }, []);

  const handleCardClick = (mess) => setSelectedMess(mess);
  const closeDetailSheet = () => setSelectedMess(null);

  const handleUnlockClick = (mess) => {
    setSelectedMess(null);
    setPlanMess(mess);
  };

  const handleSelectPlan = (planType) => {
    const mess = planMess;
    setPlanMess(null);
    if (!token) {
      setPendingUnlock({ mess, planType });
      setShowLogin(true);
    } else {
      startPayment(mess, planType);
    }
  };
  const navigate = useNavigate();
  const handleLoggedIn = (tok, userData) => {
    setToken(tok);
    setUser(userData);
    localStorage.setItem("token", tok);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowLogin(false);

    if (userData?.role === "mess_owner") {
      navigate("/owner/dashboard");
      return;
    }

    if (pendingUnlock) {
      startPayment(pendingUnlock.mess, pendingUnlock.planType);
      setPendingUnlock(null);
    }
  };

  const startPayment = async (mess, planType) => {
    try {
      const payload =
        planType === "category"
          ? { planType: "category", category: mess.category }
          : { planType: "full" };

      const orderRes = await axios.post(
        `${API_BASE}/payment/create-order`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const { order, keyId } = orderRes.data;

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "messkhoj",
        description:
          planType === "category"
            ? `Unlock ${mess.category}`
            : "Full access — 7 days",
        handler: async (response) => {
          await axios.post(`${API_BASE}/payment/verify`, response, {
            headers: { Authorization: `Bearer ${token}` },
          });
          fetchMesses();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed to start");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSelectedMess(null);
    setPlanMess(null);
    setShowLogin(false);
    setPendingUnlock(null);
  };

  return (
    <div className="min-h-screen bg-kraft-dots flex flex-col">
      <Navbar
        isLoggedIn={!!token}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
      />
      <LocationBar />

      <div className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-4 pt-5">
          <StatusBar count={totalCount} />

          <div className="flex gap-1.5 mb-5 justify-center flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-md capitalize ${
                  activeCategory === c
                    ? "bg-ink text-cream"
                    : "bg-transparent text-ink/70 border-[1.5px] border-dashed border-dash-dark"
                }`}
              >
                {c === "all" ? "All" : c.replace("-", " ")}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-sm text-muted py-10">
              Loading mess listings…
            </div>
          ) : messes.length === 0 ? (
            <div className="text-center text-sm text-muted py-10">
              No mess found in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
              {messes.map((mess) => (
                <MessCard
                  key={mess._id}
                  mess={mess}
                  onCardClick={handleCardClick}
                  onUnlockClick={handleUnlockClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {selectedMess && (
        <DetailSheet
          mess={selectedMess}
          onClose={closeDetailSheet}
          onUnlockClick={handleUnlockClick}
        />
      )}

      {planMess && (
        <PlanModal
          mess={planMess}
          onClose={() => setPlanMess(null)}
          onSelectPlan={handleSelectPlan}
        />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false);
            setPendingUnlock(null);
          }}
          onLoggedIn={handleLoggedIn}
        />
      )}
    </div>
  );
}
