import React from "react";

function NeedHelp() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 border border-slate-100 max-w-sm">
      <div className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2">
        Need Help?
      </div>
      <div className="text-slate-600 text-sm sm:text-base mb-5">
        Have questions about these documents? Contact the property owner or your
        real estate agent.
      </div>
      <button className="w-full bg-[#133a5c] hover:bg-[#0a2a47] text-white font-semibold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base">
        Contact Owner
      </button>
    </div>
  );
}

export default NeedHelp;
