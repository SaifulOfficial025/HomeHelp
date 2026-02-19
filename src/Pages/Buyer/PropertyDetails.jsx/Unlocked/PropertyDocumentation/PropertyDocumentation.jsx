import React from "react";
import { FaShieldAlt, FaFileAlt, FaDownload } from "react-icons/fa";
import { useProperty } from "../Layout";

function PropertyDocumentation() {
  const property = useProperty();
  const inspectionReports = property.inspection_reports || [];
  const optionalReports = property.optional_reports || [];
  const propertyPortfolio = property.propertyPortfolio || null;

  const getFileName = (url) => {
    if (!url) return "Document";
    const parts = url.split("/");
    return parts[parts.length - 1] || "Document";
  };

  const handleView = (url) => {
    window.open(url, "_blank");
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-8 border border-slate-100 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-800">
          Property Documentation
        </div>
        {(inspectionReports.length > 0 ||
          optionalReports.length > 0 ||
          propertyPortfolio) && (
          <span className="inline-flex items-center gap-2 bg-[#e6faf7] text-[#18aa99] text-sm font-semibold px-4 py-1 rounded-full">
            <FaShieldAlt className="text-[#18aa99] text-base" /> Verified
          </span>
        )}
      </div>

      {/* Highly Recommended Reports */}
      {inspectionReports.length > 0 && (
        <>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-6 mb-2">
            Highly Recommended Reports ({inspectionReports.length})
          </div>
          <div className="flex flex-col gap-4">
            {inspectionReports.map((report, i) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border-2 border-slate-100 rounded-xl px-4 sm:px-5 py-4 shadow-sm gap-3"
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-[#18aa99] text-2xl" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      Inspection Report {i + 1}
                    </div>
                    <div className="text-xs text-slate-500">
                      {getFileName(report.report)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleView(report.report)}
                    className="text-[#18aa99] font-semibold hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(report.report, getFileName(report.report))
                    }
                    className="flex items-center gap-2 bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Property Portfolio */}
      {propertyPortfolio && (
        <>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-6 mb-2">
            Property Portfolio
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl px-4 sm:px-5 py-4 shadow-sm gap-3">
              <div className="flex items-center gap-3">
                <FaFileAlt className="text-purple-600 text-2xl" />
                <div>
                  <div className="font-semibold text-slate-800">
                    Complete Property Portfolio
                  </div>
                  <div className="text-xs text-slate-500">
                    {getFileName(propertyPortfolio)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleView(propertyPortfolio)}
                  className="text-purple-600 font-semibold hover:underline text-sm sm:text-base"
                >
                  View
                </button>
                <button
                  onClick={() =>
                    handleDownload(
                      propertyPortfolio,
                      getFileName(propertyPortfolio),
                    )
                  }
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition"
                >
                  <FaDownload /> Download
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Optional Reports */}
      {optionalReports.length > 0 && (
        <>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-6 mb-2">
            Optional Reports ({optionalReports.length})
          </div>
          <div className="flex flex-col gap-4">
            {optionalReports.map((report, i) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border-2 border-slate-100 rounded-xl px-4 sm:px-5 py-4 shadow-sm gap-3"
              >
                <div className="flex items-center gap-3">
                  <FaFileAlt className="text-[#18aa99] text-2xl" />
                  <div>
                    <div className="font-semibold text-slate-800">
                      Optional Report {i + 1}
                    </div>
                    <div className="text-xs text-slate-500">
                      {getFileName(report.report)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleView(report.report)}
                    className="text-[#18aa99] font-semibold hover:underline text-sm sm:text-base"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(report.report, getFileName(report.report))
                    }
                    className="flex items-center gap-2 bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition"
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {inspectionReports.length === 0 &&
        optionalReports.length === 0 &&
        !propertyPortfolio && (
          <div className="text-center py-12 text-slate-500 text-sm sm:text-base">
            <p>No reports available for this property yet.</p>
          </div>
        )}
    </div>
  );
}

export default PropertyDocumentation;
