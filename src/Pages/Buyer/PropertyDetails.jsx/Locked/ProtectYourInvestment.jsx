import React from "react";

import { FiCheckCircle } from "react-icons/fi";

function ProtectYourInvestment() {
  return (
    <div className="bg-gradient-to-br from-[#e3f4f2] to-[#edeff2] border border-[#aee6e2] rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-start gap-3  ">
        <FiCheckCircle className="text-[#18aa99] text-5xl mt-1 bg-[#bae7e3] px-2 py-1.5 rounded-full" />
        <div>
          <div className="text-2xl font-extrabold text-slate-800 leading-tight">
            Protect Your
            <br />
            Investment
          </div>
          <div className="text-slate-500 text-sm mt-1">
            See everything before you buy —<br className="md:hidden" />{" "}
            inspection reports up-to-date
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap md:justify-end">
        <span className="inline-flex items-center gap-1 bg-white border border-[#aee6e2] text-[#18aa99] text-xs font-semibold px-3 py-1 rounded-full">
          {" "}
          <FiCheckCircle className="text-[#18aa99] text-sm" /> Secure Access
        </span>
        <span className="inline-flex items-center gap-1 bg-white border border-[#aee6e2] text-[#18aa99] text-xs font-semibold px-3 py-1 rounded-full">
          {" "}
          <FiCheckCircle className="text-[#18aa99] text-sm" /> Instant Unlock
        </span>
        <span className="inline-flex items-center gap-1 bg-white border border-[#aee6e2] text-[#18aa99] text-xs font-semibold px-3 py-1 rounded-full">
          {" "}
          <FiCheckCircle className="text-[#18aa99] text-sm" /> Trusted by Buyers
        </span>
      </div>
    </div>
  );
}

export default ProtectYourInvestment;
