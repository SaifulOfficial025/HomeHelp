import React from "react";
import {
  FaHeart,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

function Hero() {
  const imageUrl =
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80";

  return (
    <div className="w-full relative mb-28">
      <div className="w-full h-56 md:h-96 lg:h-[420px] overflow-hidden ">
        <img
          src={imageUrl}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 flex gap-2 pointer-events-auto">
          <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Inspection Report Available
          </span>
          <span className="bg-amber-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            For Sale
          </span>
          <span className="bg-[#00c950] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            New Listing
          </span>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-3 pointer-events-auto">
          <button className="bg-white/80 hover:bg-white p-2 rounded-full shadow flex items-center justify-center">
            <FaHeart className="text-slate-700" />
          </button>
          <button className="bg-white/80 hover:bg-white p-2 rounded-full shadow flex items-center justify-center">
            <FaShareAlt className="text-slate-700" />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-auto">
          <button className="bg-white/80 p-2 rounded-full shadow">
            <FaChevronLeft className="text-slate-700" />
          </button>
          <div className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            1 / 1
          </div>
          <button className="bg-white/80 p-2 rounded-full shadow">
            <FaChevronRight className="text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
