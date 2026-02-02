import React from "react";
import { FaShieldAlt, FaFileAlt, FaDownload } from "react-icons/fa";
import { useProperty } from "../Layout";

function PropertyDocumentation() {
  const property = useProperty();
  const inspectionReports = property.inspection_reports || [];
  const optionalReports = property.optional_reports || [];

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
    <div className="bg-white rounded-2xl shadow p-8 border border-slate-100 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="text-3xl font-extrabold text-slate-800">
          Property Documentation
        </div>
        {(inspectionReports.length > 0 || optionalReports.length > 0) && (
          <span className="inline-flex items-center gap-2 bg-[#e6faf7] text-[#18aa99] text-sm font-semibold px-4 py-1 rounded-full">
            <FaShieldAlt className="text-[#18aa99] text-base" /> Verified
          </span>
        )}
      </div>

      {/* Mandatory Reports */}
      {inspectionReports.length > 0 && (
        <>
          <div className="text-2xl font-extrabold text-slate-800 mt-6 mb-2">
            Mandatory Reports ({inspectionReports.length})
          </div>
          <div className="flex flex-col gap-4">
            {inspectionReports.map((report, i) => (
              <div
                key={report.id}
                className="flex items-center justify-between bg-white border-2 border-slate-100 rounded-xl px-5 py-4 shadow-sm"
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

      {/* Optional Reports */}
      {optionalReports.length > 0 && (
        <>
          <div className="text-2xl font-extrabold text-slate-800 mt-6 mb-2">
            Optional Reports ({optionalReports.length})
          </div>
          <div className="flex flex-col gap-4">
            {optionalReports.map((report, i) => (
              <div
                key={report.id}
                className="flex items-center justify-between bg-white border-2 border-slate-100 rounded-xl px-5 py-4 shadow-sm"
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

      {inspectionReports.length === 0 && optionalReports.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p>No reports available for this property yet.</p>
        </div>
      )}
    </div>
  );
}

export default PropertyDocumentation;
