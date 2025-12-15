import React, { useRef, useState } from "react";
import Button from "../../../Shared/Button";

function MandatoryReports({ onNext = () => {}, onBack = () => {} }) {
  const [files, setFiles] = useState({
    building: null,
    pest: null,
    electrical: null,
    plumbing: null,
  });

  const buildingRef = useRef(null);
  const pestRef = useRef(null);
  const electricalRef = useRef(null);
  const plumbingRef = useRef(null);

  const handleChoose = (ref) => ref.current?.click();

  const handleFile = (key) => (e) => {
    const f = e.target.files?.[0] || null;
    setFiles((s) => ({ ...s, [key]: f }));
    e.target.value = null;
  };

  const completed = Object.values(files).filter(Boolean).length;
  const progress = Math.round((completed / 4) * 100);

  const ReportCard = ({ idx, title, subtitle, inputRef, name }) => (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-[#14b8a6] text-[#ffffff] flex items-center justify-center font-semibold">
          {idx}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-slate-800">{title}</div>
          <div className="text-xs text-slate-500 mt-1">{subtitle}</div>

          <div className="mt-3 border rounded-md border-slate-200 p-4 text-center">
            <div className="text-sm text-slate-500">
              {files[name] ? files[name].name : `Upload ${title}`}
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => handleChoose(inputRef)}
                className="px-3 py-1 rounded bg-[#18aa99] text-white text-sm"
              >
                Choose File
              </button>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFile(name)}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Mandatory Reports
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          All four reports must be uploaded to activate your QR code
        </p>

        <div className="mt-4 rounded-md bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-800">
          <div className="font-bold text-xl">Required to activate QR.</div>
          <div className="mt-1 text-sm text-yellow-700">
            These documents are essential for building buyer trust and meeting
            legal disclosure requirements.
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <ReportCard
            idx={1}
            title="Building Inspection Report"
            subtitle="Comprehensive structural assessment including foundations, walls, roof, and overall condition"
            inputRef={buildingRef}
            name="building"
          />

          <ReportCard
            idx={2}
            title="Timber Pest & Termite Inspection"
            subtitle="Detection and assessment of termites, borers, and other timber pests"
            inputRef={pestRef}
            name="pest"
          />

          <ReportCard
            idx={3}
            title="Electrical Safety Check"
            subtitle="Verification of electrical wiring, switchboards, and safety compliance"
            inputRef={electricalRef}
            name="electrical"
          />

          <ReportCard
            idx={4}
            title="Plumbing & Gas Safety Check"
            subtitle="Assessment of plumbing systems, hot water, and gas installations"
            inputRef={plumbingRef}
            name="plumbing"
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
