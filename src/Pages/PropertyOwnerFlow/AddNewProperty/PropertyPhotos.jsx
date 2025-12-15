import React, { useRef, useState } from "react";
import Button from "../../../Shared/Button";

function PropertyPhotos({ onNext = () => {}, onBack = () => {} }) {
  // start with an empty array — only user-uploaded photos will be shown
  const [photos, setPhotos] = useState([]);
  const inputRef = useRef(null);

  const handleChooseFiles = () => {
    inputRef.current?.click();
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newPhotos = files.map((f, i) => ({
      id: Date.now() + i,
      src: URL.createObjectURL(f),
    }));
    setPhotos((p) => [...p, ...newPhotos]);
    e.target.value = null;
  };

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Property Photos
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Upload high-quality photos of your property (minimum 3 required)
        </p>

        <div className="mt-6">
          <div className="border-2 border-slate-200 rounded-lg p-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l3 3m-3-3-3 3"
                />
              </svg>
            </div>
            <div className="mt-4 text-slate-600">
              Drag and drop your photos here, or click to browse
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleChooseFiles}
                className="px-4 py-2 rounded bg-[#18aa99] text-white text-sm"
              >
                Choose Files
              </button>
            </div>
            <input
              ref={inputRef}
              type="file"
              onChange={handleFiles}
              accept="image/*"
              multiple
              className="hidden"
            />

            <div className="mt-4 text-xs text-slate-400">
              JPG, PNG up to 10MB each • Max 20MB total
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">
              Uploaded Photos
            </h3>
            <div className="text-sm text-slate-500">
              {photos.length >= 3
                ? "✓ Minimum requirement met"
                : "Minimum 3 required"}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {photos.map((p, idx) => (
              <div
                key={p.id}
                className="relative rounded-lg overflow-hidden bg-slate-100"
              >
                <img
                  src={p.src}
                  alt={`photo-${idx + 1}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2 h-6 w-6 rounded-md bg-[#0f172a]/70 text-white text-xs flex items-center justify-center font-semibold">
                  {idx + 1}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleChooseFiles}
              className="flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg h-32 text-slate-500"
            >
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-slate-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <div>Add More</div>
              </div>
            </button>
          </div>

          <div className="mt-3 text-sm text-slate-500">
            Tip: Drag photos to reorder them. The first photo will be used as
            the cover image.
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
            onClick={() => onNext(photos)}
            color="green"
            size="md"
            rounded={false}
          >
            Next: Mandatory Reports
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PropertyPhotos;
