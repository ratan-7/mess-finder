export default function Navbar() {
  return (
    <div className="bg-cream border-b-2 border-ink">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold text-ink">
          mess<span className="text-chili">finder</span>
        </div>
        <button className="bg-ink text-cream px-4 py-2 rounded font-semibold">
          Login
        </button>
      </div>
    </div>
  );
}
