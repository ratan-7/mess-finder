import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const emptyForm = {
  name: "",
  category: "",
  budget: "",
  address: "",
  contact: "",
  description: "",
};

const STATUS_STYLES = {
  pending: "bg-turmeric/20 text-ink",
  approved: "bg-sage-600/20 text-sage-600",
  rejected: "bg-chili/10 text-chili",
};

export default function OwnerDashboard() {
  const [myMess, setMyMess] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchMyMess = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE}/mess/owner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyMess(res.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyMess();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.budget) {
      alert("Name, category aur budget zaroori hain");
      return;
    }

    try {
      await axios.post(`${API_BASE}/mess/owner`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm(emptyForm);
      fetchMyMess();
    } catch (err) {
      alert(err.response?.data?.message || "Submit failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-kraft-dots">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display font-bold text-2xl text-ink">
            Mess Owner Dashboard
          </h2>

          <button
            onClick={handleLogout}
            className="border border-chili text-chili rounded px-3 py-1.5 text-xs font-semibold hover:bg-chili hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>

        <p className="text-sm text-muted mb-6">
          Submit Your mess info — after admin verification show in public
          listing
        </p>

        {/* Submit Form */}
        <div className="bg-cream border-[1.5px] border-ink rounded-lg p-5 mb-6">
          <h3 className="font-display font-semibold text-lg text-ink mb-3">
            Submit New Mess
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border border-dash-dark rounded px-3 py-2 text-sm"
            />

            <input
              name="category"
              placeholder="Category (boys-pg / girls-pg)"
              value={form.category}
              onChange={handleChange}
              className="border border-dash-dark rounded px-3 py-2 text-sm"
            />

            <input
              name="budget"
              type="number"
              placeholder="Budget"
              value={form.budget}
              onChange={handleChange}
              className="border border-dash-dark rounded px-3 py-2 text-sm"
            />

            <input
              name="contact"
              placeholder="Contact number"
              value={form.contact}
              onChange={handleChange}
              className="border border-dash-dark rounded px-3 py-2 text-sm"
            />
          </div>

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-dash-dark rounded px-3 py-2 text-sm mb-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-dash-dark rounded px-3 py-2 text-sm mb-3"
            rows={3}
          />

          <button
            onClick={handleSubmit}
            className="bg-chili text-cream font-semibold px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
          >
            Submit for Review
          </button>
        </div>

        {/* My Submissions */}
        <h3 className="font-display font-semibold text-lg text-ink mb-2">
          My Submissions
        </h3>

        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : myMess.length === 0 ? (
          <p className="text-sm text-muted">Not found any Submissions !!!</p>
        ) : (
          <div className="bg-cream border-[1.5px] border-ink rounded-lg divide-y divide-dash">
            {myMess.map((mess) => (
              <div
                key={mess._id}
                className="flex items-center justify-between px-4 py-3"
              >
                <span className="text-sm text-ink">
                  {mess.name} — ₹{mess.budget}
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full capitalize ${
                    STATUS_STYLES[mess.status] || ""
                  }`}
                >
                  {mess.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
