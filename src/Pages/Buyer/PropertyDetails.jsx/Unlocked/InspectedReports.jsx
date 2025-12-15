import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

function InspectedReports() {
  const navigate = useNavigate();
  const { id } = useParams();
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
          <span className="bg-[#18aa99] text-white text-xs font-semibold px-2 py-0.5 rounded">
            Verified
          </span>
        </div>
        <div className="text-slate-600 text-sm mb-3">
          Report prepared by certified inspectors. 4 documents available.
        </div>
        <button
          className="bg-[#133a5c] hover:bg-[#0a2a47] text-white px-6 py-2 rounded-lg text-base transition"
          onClick={() => {
            if (id) navigate(`/property_details/${id}/property_documentation`);
            else navigate(`/property_details/property_documentation`);
          }}
        >
          See All Reports
        </button>
      </div>
    </div>
  );
}

export default InspectedReports;
