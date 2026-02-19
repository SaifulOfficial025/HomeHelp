import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for user data
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDashboardClick = () => {
    setIsDropdownOpen(false);
    if (user?.role === "owner") {
      navigate("/my_properties");
    } else if (user?.role === "buyer") {
      navigate("/buyer_dashboard");
    }
  };

  const handleLogout = () => {
    // Clear all localStorage
    localStorage.clear();
    // Clear sessionStorage
    sessionStorage.clear();
    // Clear user state
    setUser(null);
    setIsDropdownOpen(false);
    // Navigate to home
    navigate("/");
  };

  return (
    <header className="w-full px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md px-5 py-4 flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-3">
              <img src="/Logo.png" alt="HomeHelp logo" className="w-34 h-10" />
              <div className="flex flex-col leading-none"></div>
            </div>
          </Link>

          <div>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#18aa99] text-white rounded-lg hover:bg-[#158c80] transition-colors"
                >
                  <span>{user.full_name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={handleDashboardClick}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <Button color="blue" size="sm" rounded={false} shadow={true}>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
