import React, { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

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
    navigate("/signin");
  };

  return (
    <nav className="w-full bg-[#072A44] text-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-3">
            <img src="/footerlogo.png" alt="HomeHelp" className="w-8 h-8" />
            <span className="font-bold text-lg">HomeHelp</span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
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
      </div>
    </nav>
  );
}

export default Navbar;
