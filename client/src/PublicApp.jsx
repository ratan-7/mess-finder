import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import MessCard from "./components/MessCard";
import LoginModal from "./components/LoginModal";
import LocationBar from "./components/LocationBar";
import PlanModal from "./components/PlanModal";
import DetailSheet from "./components/DetailSheet";
import StatsBar from "./components/StatusBar";
import Footer from "./components/Footer";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

function App() {
  const [messList, setMessList] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [pendingMess, setPendingMess] = useState(null);
  const [planMess, setPlanMess] = useState(null);
  const [selectedMess, setSelectedMess] = useState(null);

  const fetchMesses = async () => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const res = await axios.get(`${API_BASE}`, config);
    setMessList(res.data);
  };

  useEffect(() => {
    fetchMesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleUnlockClick = (mess) => {
    setPlanMess(mess);
  };

  const handleSelectPlan = (planType) => {
    const mess = planMess;
    setPlanMess(null);
    if (!token) {
      setPendingMess({ mess, planType });
      setShowLogin(true);
    } else {
      startPayment(mess, planType);
    }
  };

  const handleLoggedIn = (tok) => {
    setToken(tok);
    setShowLogin(false);
    if (pendingMess) {
      startPayment(pendingMess.mess, pendingMess.planType);
      setPendingMess(null);
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
        name: "Mess Finder",
        description: `Unlock ${mess.category}`,
        handler: async (response) => {
          await axios.post(`${API_BASE}/payment/verify`, response, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Unlocked!");
          fetchMesses();
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed to start");
    }
  };

  return (
    <>
      <Navbar />
      <LocationBar />
      <StatsBar count={messList.length} />
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {messList.map((mess) => (
          <div key={mess._id} onClick={() => setSelectedMess(mess)}>
            <MessCard
              name={mess.name}
              category={mess.category}
              address={mess.address}
              contact={mess.contact}
              budget={mess.budget}
              unlocked={mess.unlocked}
              onUnlockClick={() => handleUnlockClick(mess)}
            />
          </div>
        ))}
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoggedIn={handleLoggedIn}
        />
      )}

      {planMess && (
        <PlanModal
          mess={planMess}
          onClose={() => setPlanMess(null)}
          onSelectPlan={handleSelectPlan}
        />
      )}
      <DetailSheet mess={selectedMess} onClose={() => setSelectedMess(null)} />
      <Footer />
    </>
  );
}

export default App;
