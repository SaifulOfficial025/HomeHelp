import React, { useRef, useState } from "react";
import Button from "../../../Shared/Button";
import { CiCircleInfo } from "react-icons/ci";

function OptionalReports({ onNext = () => {}, onBack = () => {} }) {
  const [files, setFiles] = useState({
    smoke: null,
    pool: null,
    title: null,
    maintenance: null,
  });

  const refs = {
    smoke: useRef(null),
    pool: useRef(null),
    title: useRef(null),
    maintenance: useRef(null),
  };

  const handleChoose = (key) => refs[key].current?.click();
  const handleFile = (key) => (e) => {
    const f = e.target.files?.[0] || null;
    setFiles((s) => ({ ...s, [key]: f }));
    e.target.value = null;
  };

  const ReportCard = ({ title, subtitle, keyName, recommended }) => (
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
              {files[keyName] ? files[keyName].name : `Upload ${title}`}
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={() => handleChoose(keyName)}
                className="px-3 py-1 rounded bg-[#18aa99] text-white text-sm"
              >
                Choose File
              </button>
            </div>
            <input
              ref={refs[keyName]}
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFile(keyName)}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );

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
            title="Smoke Alarm Compliance"
            subtitle="Certificate of smoke alarm installation and testing compliance"
            keyName="smoke"
          />

          <ReportCard
            title="Pool / Spa Barrier Compliance"
            subtitle="Safety certificate for pool fencing and barrier compliance"
            keyName="pool"
            recommended
          />

          <ReportCard
            title="Title Search & Encumbrances"
            subtitle="Property title details and any registered encumbrances"
            keyName="title"
          />

          <ReportCard
            title="Property Maintenance History"
            subtitle="Receipts, warranties, before/after images of renovations"
            keyName="maintenance"
          />
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
            shadow
          >
            Next: Review & Publish
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OptionalReports;
