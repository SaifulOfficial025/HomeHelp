import React from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";

function LockedPropertyDocumentation() {
  const reports = [
    "Building Inspection Report",
    "Strata Report Sample",
    "Electrical Safety Report",
    "Swimming Pool Safety Check",
  ];
  return (
    <div className="bg-white rounded-2xl shadow p-8 border border-slate-100 max-w-3xl mx-auto">
      <div className="text-2xl font-extrabold text-slate-800 mb-3">
        Property Documentation
      </div>
      <div className="mb-3">
        <span className="inline-flex items-center gap-2 bg-[#e6faf7] text-[#18aa99] text-xs font-semibold px-4 py-2 rounded-lg border border-[#aee6e2]">
          <MdVerifiedUser className="text-[#18aa99] text-base" /> Verified
          Property Data
        </span>
      </div>
      <div className="text-slate-600 text-sm mb-6">
        This property comes with complete verified documentation including
        building inspections, compliance reports, and safety certificates. All
        reports are professionally conducted and up-to-date.
      </div>
      <div className="relative mt-2">
        <div className="flex flex-col gap-2 opacity-60 blur-sm select-none pointer-events-none">
          {reports.map((r, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-lg px-5 py-3 text-slate-500 font-medium border border-slate-100"
            >
              {r}
            </div>
          ))}
        </div>
        {/* Locked overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-white/80 rounded-xl px-10 py-8 flex flex-col items-center shadow border border-slate-200">
            <FaLock className="text-slate-400 text-3xl mb-2" />
            <div className="text-slate-700 font-semibold mb-1">
              Reports locked — unlock to view
            </div>
            <div className="text-slate-500 text-xs">
              4 verified documents available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LockedPropertyDocumentation;
