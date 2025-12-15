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
  { label: "Notifications", icon: <FaBell />, component: <Notification /> },
  { label: "Account", icon: <FaShieldAlt />, component: <Account /> },
];

function Layout() {
  const [selected, setSelected] = useState(0);

  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-r from-[#0a2a47] to-[#133a5c] px-8 py-6 ">
          <h1 className="text-3xl font-extrabold text-white">Settings</h1>
        </div>
        <div className="flex">
          {/* Sidebar */}
          <div className="w-56 bg-slate-50 border-r border-slate-200 min-h-[calc(100vh-80px)] pt-8">
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
          <div className="flex-1 p-10">{menu[selected].component}</div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Layout;
