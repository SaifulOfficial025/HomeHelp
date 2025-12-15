import React from "react";
import { FaChevronRight } from "react-icons/fa";

function Floorplan() {
  return (
    <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition border border-slate-100 w-full max-w-full">
      <div className="text-lg font-extrabold text-slate-800">Floor Plan</div>
      <FaChevronRight className="text-slate-300 text-lg" />
    </div>
  );
}

export default Floorplan;
