import React, { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || "User");
      setUserRole(user.role || "");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setMenuOpen(false);
    navigate("/signin");
  };

  return (
    <nav className="w-full bg-[#072A44] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="">
          <div className="flex items-center gap-3">
            <img src="/footerlogo.png" alt="HomeHelp" className="w-8 h-8" />
            <span className="font-bold text-lg">HomeHelp</span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-6">
            {userRole !== "buyer" && (
              <>
                <Link to="/my_properties" className="text-sm hover:underline">
                  My Properties
                </Link>
                <Link to="/add_property" className="text-sm hover:underline">
                  Add Properties
                </Link>
              </>
            )}

            <div className="flex items-center gap-3 text-sm">
              <IoPersonOutline className="text-xl" />
              <Link to="/settings">
                <span className="hidden sm:inline hover:underline">
                  {userName}
                </span>
              </Link>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <IoIosLogOut className="text-lg" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden relative">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 rounded-md bg-transparent hover:bg-white/10"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-lg shadow-lg p-3 z-50">
                <div className="flex items-center gap-2 mb-3">
                  <IoPersonOutline className="text-xl" />
                  <div className="font-semibold">{userName}</div>
                </div>
                {userRole !== "buyer" && (
                  <>
                    <Link
                      to="/my_properties"
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 hover:underline"
                    >
                      My Properties
                    </Link>
                    <Link
                      to="/add_property"
                      onClick={() => setMenuOpen(false)}
                      className="block py-2 hover:underline"
                    >
                      Add Properties
                    </Link>
                  </>
                )}
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:underline"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left mt-2 flex items-center gap-2 text-sm text-red-600"
                >
                  <IoIosLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
