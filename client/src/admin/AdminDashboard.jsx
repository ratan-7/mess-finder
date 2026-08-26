import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [messes, setMesses] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchMesses = async () => {
    const res = await axios.get(`${API_BASE}`);
    setMesses(res.data);
  };

  useEffect(() => {
    fetchMesses();
  }, []);

  const resetForm = () => {
    setName("");
    setCategory("");
    setBudget("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("adminToken");
    const payload = { name, category, budget };

    if (editingId) {
      await axios.patch(`${API_BASE}/${editingId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${API_BASE}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    resetForm();
    fetchMesses();
  };

  const handleEditClick = (mess) => {
    setName(mess.name);
    setCategory(mess.category);
    setBudget(mess.budget);
    setEditingId(mess._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");
    await axios.delete(`${API_BASE}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchMesses();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };
  return (
    <div className="min-h-screen bg-kraft-dots">
      <div className="bg-cream border-b-2 border-ink px-4 py-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="text-sm border border-muted rounded px-3 py-1.5"
        >
          Logout
        </button>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-cream border-2 border-ink rounded-lg p-5 mb-6">
          <h3 className="text-lg font-bold text-ink mb-3">
            {editingId ? "Edit Mess" : "Add New Mess"}
          </h3>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-muted rounded px-3 py-2 mb-2"
          />
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-muted rounded px-3 py-2 mb-2"
          />
          <input
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full border border-muted rounded px-3 py-2 mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-ink text-cream font-semibold px-4 py-2 rounded"
            >
              {editingId ? "Update Mess" : "Add Mess"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="border border-muted text-ink px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <h3 className="text-lg font-bold text-ink mb-2">All Mess</h3>
        <div className="bg-cream border-2 border-ink rounded-lg divide-y divide-dash">
          {messes.map((mess) => (
            <div
              key={mess._id}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-sm text-ink">
                {mess.name} — ₹{mess.budget}
              </span>
              <span className="flex gap-2">
                <button
                  onClick={() => handleEditClick(mess)}
                  className="text-xs border border-muted rounded px-2 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(mess._id)}
                  className="text-xs bg-chili text-cream rounded px-2 py-1"
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
