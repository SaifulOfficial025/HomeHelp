import React from "react";
import { FaLock, FaCheckCircle } from "react-icons/fa";

function LockedHero() {
  const imageUrl =
    "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80";
  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden mb-20">
      <img
        src={imageUrl}
        alt="Elegant Family Home"
        className="w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      {/* Content */}
      <div className="absolute left-0 top-12 h-full flex flex-col justify-center pl-10 pr-10 md:pr-64 z-10 ">
        <div className="mb-3">
          <span className="inline-flex items-center gap-2 bg-[#18aa99] text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
            <FaCheckCircle className="text-base" /> Verified property
            documentation from the owner
          </span>
        </div>
        <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
          Elegant Family Home
        </div>
        <div className="text-white text-base mb-4">
          XXX Oak Street, Paddington NSW 2021
        </div>
        <div className="flex items-center gap-6 text-white text-base">
          <span>3 beds</span>
          <span>2 baths</span>
          <span>2 parking</span>
          <span>Built 2015</span>
        </div>
      </div>
      {/* Locked Reports */}
      <div className="mt-16 absolute right-10 top-1/2 -translate-y-1/2 bg-white/20 rounded-xl px-8 py-7 flex flex-col items-center shadow-lg border border-white/30 backdrop-blur-sm">
        <FaLock className="text-white text-3xl mb-2" />
        <span className="text-white text-sm font-medium">Reports Locked</span>
      </div>
    </div>
  );
}

export default LockedHero;
