import React from "react";
import { useProperty } from "../Layout";
import { FaPhoneAlt } from "react-icons/fa";

function NeedHelp() {
  const property = useProperty();

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 border border-slate-100 max-w-sm">
      <div className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2">
        Need Help?
      </div>
      <div className="text-slate-600 text-sm sm:text-base mb-5">
        Have questions about these documents? Contact the property owner or your
        real estate agent.
      </div>
      {property.owner_phone ? (
        <a
          href={`tel:${property.owner_phone}`}
          className="w-full bg-[#133a5c] hover:bg-[#0a2a47] text-white font-semibold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <FaPhoneAlt /> {property.owner_phone}
        </a>
      ) : (
        <button className="w-full bg-slate-400 text-white font-semibold py-2.5 sm:py-3 rounded-lg text-sm sm:text-base cursor-not-allowed">
          Contact Owner
        </button>
      )}
    </div>
  );
}

export default NeedHelp;
