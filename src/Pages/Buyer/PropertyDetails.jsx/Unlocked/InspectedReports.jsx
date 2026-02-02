import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProperty } from "./Layout";

function InspectedReports() {
  const navigate = useNavigate();
  const property = useProperty();
  const reportCount = property.total_inspection_reports || 0;

  return (
    <div className="bg-gradient-to-br from-[#e2f3f2] to-[#e2e6e9] border border-[#aee6e2] rounded-xl p-6 flex items-center gap-5 max-w-full">
      <div className="bg-[#e6faf7] rounded-full p-4 flex items-center justify-center">
        <FaShieldAlt className="text-[#18aa99] text-2xl" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl font-extrabold text-slate-800">
            Inspection Reports
          </span>
          {reportCount > 0 && (
            <span className="bg-[#18aa99] text-white text-xs font-semibold px-2 py-0.5 rounded">
              Verified
            </span>
          )}
        </div>
        <div className="text-slate-600 text-sm mb-3">
          {reportCount > 0
            ? `Report prepared by certified inspectors. ${reportCount} document${reportCount !== 1 ? "s" : ""} available.`
            : "No inspection reports available yet."}
        </div>
        {reportCount > 0 && (
          <button
            className="bg-[#133a5c] hover:bg-[#0a2a47] text-white px-6 py-2 rounded-lg text-base transition"
            onClick={() => {
              navigate(
                `/property_details/${property.slug}/property_documentation`,
              );
            }}
          >
            See All Reports
          </button>
        )}
      </div>
    </div>
  );
}

export default InspectedReports;
