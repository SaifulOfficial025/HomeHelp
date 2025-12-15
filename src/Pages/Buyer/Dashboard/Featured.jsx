import React from "react";
import {
  FaBed,
  FaBath,
  FaCar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Featured() {
  // Demo property data
  const property = {
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    title: "Modern Waterfront Villa",
    address: "123 Seaside Avenue, Bondi Beach NSW 2026",
    beds: 4,
    baths: 3,
    cars: 2,
    badges: [
      { label: "New", color: "bg-[#00c950]" },
      { label: "Inspection Report Available", color: "bg-[#18aa99]" },
      { label: "For Sale", color: "bg-[#f59e0b] text-slate-800" },
    ],
  };

  return (
    <div className="px-2 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Featured Properties
        </h2>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-500">
            <FaChevronLeft />
          </button>
          <button className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-100 text-slate-500">
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="relative rounded-3xl overflow-hidden shadow-lg max-w-7xl mx-auto">
        <img
          src={property.imageUrl}
          alt="Featured Property"
          className="w-full h-72 object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Content */}
        <div className="absolute left-0 right-0 bottom-0 p-8">
          {/* Badges */}
          <div className="flex gap-2 mb-4">
            {property.badges.map((badge, i) => (
              <span
                key={i}
                className={`text-white text-xs font-semibold px-3 py-1 rounded-full shadow ${badge.color}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">
            {property.title}
          </div>
          <div className="text-white text-base mb-4">{property.address}</div>
          <div className="flex items-center gap-6 text-white text-lg mb-6">
            <span className="flex items-center gap-2">
              <FaBed /> {property.beds}
            </span>
            <span className="flex items-center gap-2">
              <FaBath /> {property.baths}
            </span>
            <span className="flex items-center gap-2">
              <FaCar /> {property.cars}
            </span>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold px-7 py-3 rounded-lg text-base transition">
              View Details
            </button>
            <button className="  text-white font-semibold px-7 py-3 rounded-lg text-base border border-slate-300 transition hover:bg-slate-100 hover:text-slate-800">
              Book Inspection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
