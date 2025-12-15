import React from "react";
import {
  FaHome,
  FaPhoneAlt,
  FaRegEnvelope,
  FaCheckCircle,
  FaStar,
  FaRegBell,
} from "react-icons/fa";
import { MdSms } from "react-icons/md";
import { MdEmail } from "react-icons/md";

function AgentCard() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Agent Card */}
      <div className="bg-white rounded-2xl shadow p-5 flex flex-col items-start">
        <div className="w-full flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#e6faf7] flex items-center justify-center flex-none">
            <FaHome className="text-[#18aa99] text-2xl" />
          </div>

          <div className="flex-1">
            <div className="text-lg font-extrabold text-slate-800">
              Sarah Mitchell
            </div>
            <div className="text-xs text-slate-500">Premium Property Agent</div>
            <div className="flex items-center gap-2 text-[#fbbf24] text-sm mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-slate-500 text-xs">(4.9)</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-[#133a5c] hover:bg-[#0a2a47] text-white font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 mt-4">
          <FaPhoneAlt /> Call Agent
        </button>
        <button className="w-full border-2 border-[#133a5c] text-[#133a5c] font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 mb-2 mt-2">
          <MdSms /> Send Message
        </button>
        <button className="w-full border-2 border-slate-200 text-slate-700 font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2">
          <MdEmail /> Email
        </button>
        <div className="flex flex-col gap-1 w-full mt-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Agency Verified</span>
            <FaCheckCircle className="text-[#18aa99]" />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Report Trusted</span>
            <FaCheckCircle className="text-[#18aa99]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentCard;
