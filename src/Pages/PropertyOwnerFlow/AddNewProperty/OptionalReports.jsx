import React, { useRef, useState, useEffect } from "react";
import Button from "../../../Shared/Button";
import { CiCircleInfo } from "react-icons/ci";

function OptionalReports({
  onNext = () => {},
  onBack = () => {},
  initialData = [],
  initialFeatures = [],
  isEditMode = false,
}) {
  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState([]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const existing = initialData.map((report, i) => ({
        id: report.id || `existing-${i}`,
        preview: report.report,
        isExisting: true,
      }));
      setFiles(existing);
    }
    if (initialFeatures && initialFeatures.length > 0) {
      setFeatures(initialFeatures.map((f) => f.feature || f));
    }
  }, [initialData, initialFeatures]);

  const handleChoose = (idx) => {
    inputRefs.current[idx]?.click();
  };

  const handleFile = (idx) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFile = {
      id: Date.now(),
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
    };

    setFiles((prev) => {
      const updated = [...prev];
      updated[idx] = newFile;
      return updated;
    });

    e.target.value = null;
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const updateFeature = (idx, value) => {
    const updated = [...features];
    updated[idx] = value;
    setFeatures(updated);
  };

  const removeFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const ReportCard = ({ idx, title, subtitle, recommended }) => {
    const file = files[idx];
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">
                  {title}{" "}
                  {recommended && (
                    <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
              </div>
            </div>

            <div className="mt-3 border rounded-md border-slate-200 p-4 text-center">
              <div className="text-sm text-slate-500">
                {file ? (
                  file.isExisting ? (
                    <a
                      href={file.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#18aa99]"
                    >
                      View Uploaded Report
                    </a>
                  ) : (
                    file.file?.name
                  )
                ) : (
                  `Upload ${title}`
                )}
              </div>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => handleChoose(idx)}
                  className="px-3 py-1 rounded bg-[#18aa99] text-white text-sm"
                >
                  {file ? "Change File" : "Choose File"}
                </button>
              </div>
              <input
                ref={(el) => (inputRefs.current[idx] = el)}
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFile(idx)}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Optional Reports
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          These additional documents enhance buyer confidence and may increase
          property value
        </p>

        <div className="mt-4 grid gap-4">
          <div className="rounded-md border  bg-[#eff6ff] p-4 text-sm text-sky-700 border-[#1c398e]">
            <div className="font-bold text-[#1c398e] text-xl">
              {" "}
              <CiCircleInfo className="inline-block mr-2" /> Boost Buyer
              Confidence
            </div>
            <div className="mt-1 text-[#1c398e] text-sm">
              Properties with complete documentation sell faster and command
              premium prices. Add these reports to stand out.
            </div>
          </div>

          <ReportCard
            idx={0}
            title="Smoke Alarm Compliance"
            subtitle="Certificate of smoke alarm installation and testing compliance"
          />

          <ReportCard
            idx={1}
            title="Pool / Spa Barrier Compliance"
            subtitle="Safety certificate for pool fencing and barrier compliance"
            recommended
          />

          <ReportCard
            idx={2}
            title="Title Search & Encumbrances"
            subtitle="Property title details and any registered encumbrances"
          />

          <ReportCard
            idx={3}
            title="Property Maintenance History"
            subtitle="Receipts, warranties, before/after images of renovations"
          />
        </div>

        {/* Features Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Additional Features
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Add custom features like "Swimming Pool", "Garden", "Security
            System", etc.
          </p>

          <div className="space-y-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  placeholder="e.g., Swimming Pool"
                  className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm bg-white"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addFeature}
            className="mt-3 px-4 py-2 border border-[#18aa99] text-[#18aa99] rounded-md text-sm hover:bg-[#18aa99] hover:text-white"
          >
            + Add Feature
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-md border border-slate-200 text-sm text-slate-700 bg-white"
          >
            Back
          </button>
          <Button
            onClick={() =>
              onNext({ files, features: features.filter((f) => f.trim()) })
            }
            color="green"
            size="md"
            rounded={false}
            shadow
          >
            Next: Property Portfolio
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OptionalReports;
