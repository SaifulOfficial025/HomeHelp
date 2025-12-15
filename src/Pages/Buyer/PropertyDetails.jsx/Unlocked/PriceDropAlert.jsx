import React from "react";
import { FaChartLine } from "react-icons/fa";

function PriceDropAlert() {
  return (
    <div className="bg-gradient-to-br from-[#f9ecd7] to-[#fadfb1] rounded-2xl shadow p-7 max-w-md flex flex-col items-start border border-[#fbbf24] -mt-3 h-44">
      <div className="flex items-center gap-2 text-[#000] font-bold text-xl mb-1">
        <FaChartLine /> Price Drop Alert
      </div>
      <div className="text-slate-700 text-base mb-5">
        Get notified when price changes
      </div>
      <button className="w-full bg-[#f59e0b] hover:bg-[#f5b800] text-white font-semibold py-3 rounded-lg text-base">
        Enable Alerts
      </button>
    </div>
  );
}

export default PriceDropAlert;
