import React, { useRef, useState, useEffect } from "react";
import Button from "../../../Shared/Button";

function MandatoryReports({
  onNext = () => {},
  onBack = () => {},
  initialData = [],
  isEditMode = false,
}) {
  const [files, setFiles] = useState([]);
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
  }, [initialData]);

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

  const completed = files.filter((f) => f).length;
  const progress = Math.round((completed / 4) * 100);

  const ReportCard = ({ idx, title, subtitle }) => {
    const file = files[idx];
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#14b8a6] text-[#ffffff] flex items-center justify-center font-semibold">
            {idx + 1}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-800">{title}</div>
            <div className="text-xs text-slate-500 mt-1">{subtitle}</div>

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
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Highly Recommended Reports
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          All four reports must be uploaded to activate your QR code
        </p>

        {/* <div className="mt-4 rounded-md bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-800">
          <div className="font-bold text-xl">Required to activate QR.</div>
          <div className="mt-1 text-sm text-yellow-700">
            These documents are essential for building buyer trust and meeting
            legal disclosure requirements.
          </div>
        </div> */}

        <div className="mt-6 space-y-4">
          <ReportCard
            idx={0}
            title="Building Inspection Report"
            subtitle="Comprehensive structural assessment including foundations, walls, roof, and overall condition"
          />

          <ReportCard
            idx={1}
            title="Timber Pest & Termite Inspection"
            subtitle="Detection and assessment of termites, borers, and other timber pests"
          />

          <ReportCard
            idx={2}
            title="Electrical Safety Check"
            subtitle="Verification of electrical wiring, switchboards, and safety compliance"
          />

          <ReportCard
            idx={3}
            title="Plumbing & Gas Safety Check"
            subtitle="Assessment of plumbing systems, hot water, and gas installations"
          />
        </div>

        <div className="mt-6">
          <div className="text-sm text-slate-600 mb-2">Upload Progress</div>
          <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
            <div
              className="h-2 bg-[#18aa99]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 mt-2">
            {completed}/4 completed
          </div>
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
            onClick={() => onNext(files)}
            color="green"
            size="md"
            rounded={false}
            disabled={completed < 4}
          >
            Next: Optional Reports
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MandatoryReports;
