const Navbar = ({ isLoggedIn, onLoginClick }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-cream border-b-2 border-ink">
      <div className="text-xl font-bold text-ink">
        mess<span className="text-chili">khoj</span>
      </div>
      {!isLoggedIn && (
        <button
          onClick={onLoginClick}
          className="text-xs font-semibold px-3 py-1.5 rounded-md bg-ink text-cream"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
