import React from "react";

function DocumentationScore() {
  return (
    <div className="bg-white rounded-2xl shadow p-7 border border-slate-100 w-full max-w-full mx-auto">
      <div className="text-2xl font-extrabold text-slate-800 mb-2">
        Documentation Score
      </div>
      <div className="text-4xl  text-[#18aa99] mb-1 text-center">
        4/10
      </div>
      <div className="text-slate-500 text-sm mb-5 text-center">
        Fair documentation coverage
      </div>
      <div className="flex flex-col gap-1 text-base">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Mandatory Reports</span>
          <span className="text-[#18aa99] font-bold">4/4</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Optional Reports</span>
          <span className="text-[#18aa99] font-bold">0</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total Documents</span>
          <span className="text-[#18aa99] font-bold">4</span>
        </div>
      </div>
    </div>
  );
}

export default DocumentationScore;
