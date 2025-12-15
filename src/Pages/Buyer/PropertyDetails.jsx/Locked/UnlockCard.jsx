import React from "react";
import { FaLock, FaShieldAlt, FaFileAlt, FaClock } from "react-icons/fa";

function UnlockCard() {
  return (
    <div className="max-w-xs mx-auto border-2 border-[#18aa99] rounded-2xl shadow bg-white p-7 flex flex-col items-center">
      <div className="bg-[#e6faf7] rounded-full p-4 mb-4">
        <FaLock className="text-[#18aa99] text-2xl" />
      </div>
      <div className="text-2xl font-extrabold text-slate-800 mb-1 text-center">
        Unlock Full Reports
      </div>
      <div className="text-slate-500 text-sm mb-4 text-center">
        Get instant access to all verified property documentation
      </div>
      <div className="text-4xl font-extrabold text-slate-800 mb-1">$50</div>
      <div className="text-slate-500 text-xs mb-5">One-time payment</div>
      <button className="w-full bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold py-3 rounded-lg text-base mb-6 transition flex items-center justify-center gap-2">
        Unlock Now <span className="text-lg">&rarr;</span>
      </button>
      <div className="flex flex-col gap-3 w-full mb-5">
        <div className="flex items-center gap-2 text-slate-700 text-sm">
          <FaShieldAlt className="text-[#18aa99]" /> Secure Stripe Payment •
          Instant Access
        </div>
        <div className="flex items-center gap-2 text-slate-700 text-sm">
          <FaFileAlt className="text-[#18aa99]" /> 4 verified documents included
        </div>
        <div className="flex items-center gap-2 text-slate-700 text-sm">
          <FaClock className="text-[#18aa99]" /> Download links expire in 5
          minutes
        </div>
      </div>
      <hr className="w-full border-slate-200 mb-3" />
      <div className="text-slate-400 text-xs text-center">
        By unlocking, you agree to our terms. Payment is processed securely
        through Stripe.
      </div>
    </div>
  );
}

export default UnlockCard;
