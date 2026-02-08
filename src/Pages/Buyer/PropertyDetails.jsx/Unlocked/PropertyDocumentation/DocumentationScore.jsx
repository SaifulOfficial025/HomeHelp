import React from "react";
import { useProperty } from "../Layout";

function DocumentationScore() {
  const property = useProperty();
  const mandatoryCount = property.total_inspection_reports || 0;
  const optionalCount = property.total_optional_reports || 0;
  const totalDocs = mandatoryCount + optionalCount;
  const totalPhotos = property.total_photos || 0;
  const maxMandatory = 4; // Assuming 4 is the max for Highly Recommended Reports
  const totalScore = totalDocs + totalPhotos;
  const maxScore = maxMandatory + 10; // 4 mandatory + up to 10 optional/photos

  const getCoverageText = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return "Excellent documentation coverage";
    if (percentage >= 60) return "Good documentation coverage";
    if (percentage >= 40) return "Fair documentation coverage";
    return "Limited documentation coverage";
  };

  return (
    <div className="bg-white rounded-2xl shadow p-7 border border-slate-100 w-full max-w-full mx-auto">
      <div className="text-2xl font-extrabold text-slate-800 mb-2">
        Documentation Score
      </div>
      <div className="text-4xl  text-[#18aa99] mb-1 text-center">
        {totalScore}/{maxScore}
      </div>
      <div className="text-slate-500 text-sm mb-5 text-center">
        {getCoverageText(totalScore, maxScore)}
      </div>
      <div className="flex flex-col gap-1 text-base">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Highly Recommended Reports</span>
          <span className="text-[#18aa99] font-bold">
            {mandatoryCount}/{maxMandatory}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Optional Reports</span>
          <span className="text-[#18aa99] font-bold">{optionalCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Total Documents</span>
          <span className="text-[#18aa99] font-bold">{totalDocs}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Photos</span>
          <span className="text-[#18aa99] font-bold">{totalPhotos}</span>
        </div>
      </div>
    </div>
  );
}

export default DocumentationScore;
