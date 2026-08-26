export default function Navbar({ isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <div className="bg-cream border-b-[1.5px] border-ink">
      <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="font-display font-bold text-xl text-ink">
          mess<span className="text-chili">khoj</span>
        </div>

        {isLoggedIn ? (
          <button
            onClick={onLogoutClick}
            className="text-xs font-semibold px-3 py-1.5 rounded-md border-[1.5px] border-chili text-chili hover:bg-chili hover:text-cream transition-colors"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-chili text-cream shadow-sm hover:bg-chili-700 hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
