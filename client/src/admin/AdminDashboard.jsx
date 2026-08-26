import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const emptyForm = {
  name: "",
  category: "",
  gender: "any",
  budget: "",
  image: "",
  address: "",
  contact: "",
  description: "",
  isFreeSample: false,
};

export default function AdminDashboard() {
  const [messes, setMesses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const handleAuthError = (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("adminToken");
      navigate("/admin");
      return true;
    }
    return false;
  };

  const fetchMesses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}`);
      setMesses(res.data);
    } catch (err) {
      if (!handleAuthError(err)) console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.budget) {
      alert("Name, category aur budget zaroori hain");
      return;
    }
    try {
      if (editingId) {
        await axios.patch(`${API_BASE}/${editingId}`, form, authHeader);
      } else {
        await axios.post(`${API_BASE}`, form, authHeader);
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchMesses();
    } catch (err) {
      if (!handleAuthError(err))
        alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (mess) => {
    setForm({ ...emptyForm, ...mess });
    setEditingId(mess._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this mess?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, authHeader);
      fetchMesses();
    } catch (err) {
      if (!handleAuthError(err))
        alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const inputClass =
    "w-full px-3.5 py-2.5 border border-dash-dark rounded-md text-sm";
  const freeSampleCount = messes.filter((m) => m.isFreeSample).length;

  return (
    <div className="min-h-screen bg-kraft-dots">
      <div className="bg-cream border-b-[1.5px] border-ink px-4 py-3.5 flex items-center justify-between">
        <div className="font-display font-bold text-xl text-ink">
          tiffin<span className="text-chili">wala</span>{" "}
          <span className="text-muted text-sm font-sans font-normal">
            admin
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-semibold px-3 py-1.5 rounded-md border border-dash-dark text-ink"
        >
          Logout
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-cream border-[1.5px] border-ink rounded-lg p-4">
            <div className="text-2xl font-mono font-bold text-chili">
              {messes.length}
            </div>
            <div className="text-xs text-muted">Total mess listed</div>
          </div>
          <div className="bg-cream border-[1.5px] border-ink rounded-lg p-4">
            <div className="text-2xl font-mono font-bold text-turmeric">
              {freeSampleCount}/2
            </div>
            <div className="text-xs text-muted">Free samples used</div>
          </div>
          <div className="bg-cream border-[1.5px] border-ink rounded-lg p-4 col-span-2 sm:col-span-1">
            <div className="text-2xl font-mono font-bold text-ink">
              {new Set(messes.map((m) => m.category)).size}
            </div>
            <div className="text-xs text-muted">Categories in use</div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-cream border-[1.5px] border-ink rounded-lg p-5 mb-6">
          <h3 className="font-display font-semibold text-lg text-ink mb-3">
            {editingId ? "Edit Mess" : "Add New Mess"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="category"
              placeholder="Category (e.g. boys-pg)"
              value={form.category}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="budget"
              type="number"
              placeholder="Budget"
              value={form.budget}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="contact"
              placeholder="Contact number"
              value={form.contact}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className={`${inputClass} mb-3`}
            rows={3}
          />
          <label className="flex items-center gap-2 text-sm text-ink mb-4">
            <input
              type="checkbox"
              name="isFreeSample"
              checked={form.isFreeSample}
              onChange={handleChange}
            />
            Free sample{" "}
            {freeSampleCount >= 2 && !form.isFreeSample && (
              <span className="text-chili text-xs">(limit of 2 reached)</span>
            )}
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              className="bg-ink text-cream font-semibold rounded-md px-4 py-2.5 text-sm"
            >
              {editingId ? "Update" : "Add"} Mess
            </button>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className="border border-dash-dark text-ink rounded-md px-4 py-2.5 text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <h3 className="font-display font-semibold text-lg text-ink mb-2">
          All Mess
        </h3>
        {loading ? (
          <div className="text-sm text-muted py-6 text-center">Loading…</div>
        ) : messes.length === 0 ? (
          <div className="text-sm text-muted py-6 text-center">
            No mess added yet.
          </div>
        ) : (
          <div className="bg-cream border-[1.5px] border-ink rounded-lg divide-y divide-dash overflow-hidden">
            {messes.map((mess) => (
              <div
                key={mess._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3"
              >
                <div className="text-sm text-ink">
                  <span className="font-semibold">{mess.name}</span>
                  <span className="text-muted">
                    {" "}
                    — {mess.category} — ₹{mess.budget}
                  </span>
                  {mess.isFreeSample && (
                    <span className="ml-2 text-[10px] font-bold text-turmeric border border-turmeric rounded px-1.5 py-0.5">
                      FREE
                    </span>
                  )}
                </div>
                <span className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(mess)}
                    className="border border-dash-dark rounded px-3 py-1 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mess._id)}
                    className="bg-chili text-cream rounded px-3 py-1 text-xs"
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
