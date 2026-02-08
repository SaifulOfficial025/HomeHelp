import React, { useRef, useState, useEffect } from "react";
import Button from "../../../Shared/Button";
import { CiCircleInfo } from "react-icons/ci";

function UploadPortfolio({
  onNext = () => {},
  onBack = () => {},
  initialData = null,
  isEditMode = false,
}) {
  const [portfolioFile, setPortfolioFile] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setPortfolioFile({
        id: "existing",
        preview: initialData,
        isExisting: true,
      });
    }
  }, [initialData]);

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFile = {
      id: Date.now(),
      file,
      preview: URL.createObjectURL(file),
      isExisting: false,
    };

    setPortfolioFile(newFile);
    e.target.value = null;
  };

  const handleRemove = () => {
    if (portfolioFile?.preview && !portfolioFile.isExisting) {
      URL.revokeObjectURL(portfolioFile.preview);
    }
    setPortfolioFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Property Portfolio
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Upload a comprehensive property portfolio document (PDF) containing
          all relevant information and documents in one place
        </p>

        <div className="mt-6 grid gap-4">
          <div className="rounded-md border bg-[#eff6ff] p-4 text-sm text-sky-700 border-[#1c398e]">
            <div className="font-bold text-[#1c398e] text-xl">
              <CiCircleInfo className="inline-block mr-2" /> Professional
              Presentation
            </div>
            <div className="mt-1 text-[#1c398e] text-sm">
              A well-organized property portfolio helps buyers quickly
              understand your property's value and history. This is optional but
              highly recommended for premium properties.
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-4">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="font-semibold text-slate-800 text-lg">
                  Property Portfolio Document
                  <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                    Optional
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Upload a PDF containing property overview, floor plans,
                  certificates, warranties, and maintenance records
                </div>

                <div className="mt-4 border rounded-md border-slate-200 p-6 text-center bg-slate-50">
                  {portfolioFile ? (
                    <div className="space-y-3">
                      <div className="text-sm text-slate-700 font-medium">
                        {portfolioFile.isExisting ? (
                          <a
                            href={portfolioFile.preview}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#18aa99] hover:underline"
                          >
                            View Uploaded Portfolio
                          </a>
                        ) : (
                          <span className="text-slate-800">
                            {portfolioFile.file?.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleChoose}
                          className="px-4 py-2 rounded bg-[#18aa99] text-white text-sm hover:bg-[#159384]"
                        >
                          Change File
                        </button>
                        <button
                          type="button"
                          onClick={handleRemove}
                          className="px-4 py-2 rounded border border-red-500 text-red-500 text-sm hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <svg
                        className="mx-auto h-12 w-12 text-slate-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="text-sm text-slate-500">
                        Upload Property Portfolio (PDF)
                      </div>
                      <div className="text-xs text-slate-400">
                        Max file size: 50MB
                      </div>
                      <button
                        type="button"
                        onClick={handleChoose}
                        className="px-4 py-2 rounded bg-[#18aa99] text-white text-sm hover:bg-[#159384]"
                      >
                        Choose File
                      </button>
                    </div>
                  )}
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFile}
                    className="hidden"
                  />
                </div>

                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
                  <div className="text-xs text-amber-800">
                    <strong>Pro Tip:</strong> Include sections like property
                    overview, location benefits, floor plans, all compliance
                    certificates, warranty documents, and maintenance history
                    for maximum impact.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-md border border-slate-200 text-sm text-slate-700 bg-white hover:bg-slate-50"
          >
            Back
          </button>
          <Button
            onClick={() => onNext(portfolioFile)}
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

export default UploadPortfolio;
