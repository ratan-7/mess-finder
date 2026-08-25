const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-cream border-b-2 border-ink">
      <div className="text-xl font-bold text-ink">
        mess<span className="text-chili">khoj</span>
      </div>
      <button className="bg-ink text-cream px-4 py-2 rounded font-semibold">
        Login
      </button>
    </div>
  );
};

export default Navbar;
