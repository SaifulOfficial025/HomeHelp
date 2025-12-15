import React from "react";
import { FaRegStar } from "react-icons/fa";

function Recommendation() {
  return (
    <div className="mt-8 max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-3">
        <FaRegStar className="text-[#fbbf24] text-lg" />
        <span className="text-2xl font-extrabold text-slate-800">
          Based on your search history
        </span>
      </div>
      <div className="bg-gradient-to-br from-white to-slate-50 border border-[#aee6e2] rounded-xl p-6">
        <div className="text-slate-700 mb-2">
          We found properties similar to ones you’ve viewed in Bondi Beach and
          surrounding areas
        </div>
        <a
          href="#"
          className="text-[#18aa99] font-medium hover:underline flex items-center gap-1 text-base"
        >
          View recommendations <span className="text-lg">&rarr;</span>
        </a>
      </div>
    </div>
  );
}

export default Recommendation;
