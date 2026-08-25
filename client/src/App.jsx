import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import MessCard from "./components/MessCard";
import LoginModal from "./components/LoginModal";
import LocationBar from "./components/LocationBar";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api ";
function App() {
  const [messList, setMessList] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    axios.get(`${API_BASE}`, config).then((res) => {
      setMessList(res.data);
    });
  }, [token]);

  const handleUnlockClick = () => {
    setShowLogin(true);
  };
  const handleLoggedIn = (token) => {
    setToken(token);
    setShowLogin(false);
  };

  return (
    <>
      <Navbar />
      <LocationBar />

      <div className="p-4 flex flex-col gap-4">
        {messList.map((mess) => (
          <MessCard
            key={mess.id}
            name={mess.name}
            category={mess.category}
            address={mess.address}
            budget={mess.budget}
            unlocked={mess.unlocked}
            onUnlockClick={() => handleUnlockClick(mess)}
          />
        ))}
      </div>
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoggedIn={handleLoggedIn}
        />
      )}
    </>
  );
}

export default App;
