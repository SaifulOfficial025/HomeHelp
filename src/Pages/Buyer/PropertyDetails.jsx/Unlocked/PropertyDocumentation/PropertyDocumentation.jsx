import React from "react";
import { FaShieldAlt, FaFileAlt, FaDownload } from "react-icons/fa";

const reports = [
  { name: "Building Inspection Report", type: "PDF", size: "2.4 MB" },
  { name: "Timber Pest & Termite Inspection", type: "PDF", size: "2.4 MB" },
  { name: "Electrical Safety Check", type: "PDF", size: "2.4 MB" },
  { name: "Plumbing & Gas Safety Check", type: "PDF", size: "2.4 MB" },
];

function PropertyDocumentation() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 border border-slate-100 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl font-extrabold text-slate-800">
          Property Documentation
        </div>
        <span className="inline-flex items-center gap-2 bg-[#e6faf7] text-[#18aa99] text-sm font-semibold px-4 py-1 rounded-full">
          <FaShieldAlt className="text-[#18aa99] text-base" /> Verified
        </span>
      </div>
      <div className="text-2xl font-extrabold text-slate-800 mt-6 mb-2">
        Mandatory Reports
      </div>
      <div className="flex flex-col gap-4">
        {reports.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white border-2 border-slate-100 rounded-xl px-5 py-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <FaFileAlt className="text-[#18aa99] text-2xl" />
              <div>
                <div className="font-semibold text-slate-800">{r.name}</div>
                <div className="text-xs text-slate-500">
                  {r.type} • {r.size}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-[#18aa99] font-semibold hover:underline">
                View
              </button>
              <button className="flex items-center gap-2 bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold px-4 py-2 rounded-lg text-sm transition">
                <FaDownload /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyDocumentation;
