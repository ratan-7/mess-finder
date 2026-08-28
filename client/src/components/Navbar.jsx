import { useState, useRef, useEffect } from "react";

export default function Navbar({
  isLoggedIn,
  user,
  onLoginClick,
  onLogoutClick,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-cream border-b-[1.5px] border-ink">
      <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <div className="font-display font-bold text-xl text-ink">
          mess<span className="text-chili">khoj</span>
        </div>

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border-[1.5px] border-ink"
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
              ) : null}

              <div
                className={`w-7 h-7 rounded-full bg-turmeric items-center justify-center text-xs font-bold text-ink flex-shrink-0 ${
                  user?.profilePicture ? "hidden" : "flex"
                }`}
              >
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <span className="text-xs font-semibold text-ink">
                {user?.name?.split(" ")[0]}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-cream border-[1.5px] border-ink rounded-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-dashed border-dash">
                  <div className="text-sm font-semibold text-ink truncate">
                    {user?.name}
                  </div>
                  <div className="text-xs text-muted truncate">
                    {user?.email}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogoutClick();
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-chili font-semibold hover:bg-chili/5"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-chili text-cream shadow-sm hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md transition-all"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
