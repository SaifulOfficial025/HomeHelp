import React from "react";
import {
  FaBell,
  FaHeart,
  FaCalendarAlt,
  FaFileAlt,
  FaFilter,
  FaMapMarkedAlt,
} from "react-icons/fa";
import filtericon from "../../../../public/filter.png";

function Hero() {
  // Demo data
  const user = "emonhasan016333";
  const savedCount = 1;
  const bookingsCount = 0;
  const reportsCount = 1;
  const notifications = 3;

  return (
    <div className="bg-gradient-to-r from-[#0a2a47] to-[#133a5c] pb-10 px-8 pt-8  relative">
      <section className="max-w-7xl mx-auto items-center">
        {/* Notification bell */}
        <div className="absolute top-6 right-10">
          <button className="relative">
            <FaBell className="text-white text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border-2 border-white">
              {notifications}
            </span>
          </button>
        </div>
        {/* Welcome */}
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Welcome back, {user} <span className="inline-block">👋</span>
        </h1>
        <div className="text-slate-200 text-base mb-7">
          Find your next home with trusted inspection details
        </div>

        {/* Search bar and actions */}
        <div className="flex items-center gap-3 mb-8 max-w-full">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by suburb, city or property ID..."
              className="w-full rounded-lg py-3 pl-5 pr-12 text-base bg-transparent border border-white text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18aa99]"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#223a5c] text-white px-5 py-3 rounded-lg  text-base hover:bg-[#1a2e4a]">
            <img src={filtericon} alt="Filters" className="w-5 h-5" /> Filters
          </button>
          <button className="flex items-center gap-2 bg-[#223a5c] text-white px-5 py-3 rounded-lg text-base hover:bg-[#1a2e4a]">
            <FaMapMarkedAlt /> Map View
          </button>
        </div>

        {/* Dashboard cards */}
        <div className="flex gap-6 max-w-7xl mx-auto">
          {/* Saved Properties */}
          <div className="flex-1 bg-white/10 rounded-2xl px-7 py-6 flex items-center gap-4 relative min-w-[220px]">
            <div className="bg-[#18aa99] bg-opacity-20 p-3 rounded-lg">
              <FaHeart className="text-[#18aa99] text-2xl" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">
                Saved Properties
              </div>
            </div>
            <span className="absolute top-4 right-5 bg-[#18aa99] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {savedCount}
            </span>
          </div>
          {/* Inspection Bookings */}
          <div className="flex-1 bg-white/10 rounded-2xl px-7 py-6 flex items-center gap-4 relative min-w-[220px]">
            <div className="bg-[#fbbf24] bg-opacity-20 p-3 rounded-lg">
              <FaCalendarAlt className="text-[#fbbf24] text-2xl" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">
                Inspection Bookings
              </div>
            </div>
            <span className="absolute top-4 right-5 bg-[#fbbf24] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {bookingsCount}
            </span>
          </div>
          {/* Downloaded Reports */}
          <div className="flex-1 bg-white/10 rounded-2xl px-7 py-6 flex items-center gap-4 relative min-w-[220px]">
            <div className="bg-[#2563eb] bg-opacity-20 p-3 rounded-lg">
              <FaFileAlt className="text-[#2563eb] text-2xl" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">
                Downloaded Reports
              </div>
            </div>
            <span className="absolute top-4 right-5 bg-[#2563eb] text-white text-xs font-bold rounded-full px-2 py-0.5">
              {reportsCount}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
