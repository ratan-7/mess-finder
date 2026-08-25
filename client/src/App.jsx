import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import MessCard from "./components/MessCard";

function App() {
  const [messList, setMessList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api").then((res) => {
      setMessList(res.data);
    });
  }, []);

  const handleUnlockClick = (mess) => {
    alert(`Unlock clicked for: ${mess.name}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center gap-2 px-4 py-2 bg-turmeric/20 border-b border-dashed border-muted">
        <span className="text-sm text-muted">Showing mess near</span>
        <span className="text-sm font-bold text-ink">
          Kalyani,Nadia, West Bengal
        </span>
      </div>

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
    </>
  );
}

export default App;
