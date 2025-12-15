import React from "react";
import { FaChevronRight } from "react-icons/fa";

function LocationInsights() {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition border border-slate-100 max-w-full">
        <div className="text-lg font-extrabold text-slate-800">
          Location Insights
        </div>
        <FaChevronRight className="text-slate-300 text-lg" />
      </div>
    </div>
  );
}

export default LocationInsights;
