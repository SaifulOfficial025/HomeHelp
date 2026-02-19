import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaShieldAlt } from "react-icons/fa";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import Notification from "./Notification";
import Account from "./Account";
import Navbar from "../PropertyOwnerFlow/Navbar";
import Footer from "../../Shared/Footer";

const menu = [
  { label: "Profile", icon: <FaUser />, component: <PersonalInfo /> },
  { label: "Security", icon: <FaLock />, component: <Security /> },
  // { label: "Notifications", icon: <FaBell />, component: <Notification /> },
  { label: "Account", icon: <FaShieldAlt />, component: <Account /> },
];

function Layout() {
  const [selected, setSelected] = useState(0);

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-r from-[#0a2a47] to-[#133a5c] px-4 sm:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Settings
          </h1>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Mobile tabs */}
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {menu.map((item, idx) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    selected === idx
                      ? "bg-[#18aa99] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  onClick={() => setSelected(idx)}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-56 bg-slate-50 border-r border-slate-200 min-h-[calc(100vh-80px)] pt-8">
            <div className="flex flex-col gap-2 px-2">
              {menu.map((item, idx) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-3 px-5 py-3 rounded-lg text-base font-medium transition shadow-sm text-left ${
                    selected === idx
                      ? "bg-[#18aa99] text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => setSelected(idx)}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 md:p-10">
            {menu[selected].component}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Layout;
