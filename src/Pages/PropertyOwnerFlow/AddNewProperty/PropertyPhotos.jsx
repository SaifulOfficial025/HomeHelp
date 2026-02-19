import React, { useRef, useState, useEffect } from "react";
import Button from "../../../Shared/Button";

function PropertyPhotos({
  onNext = () => {},
  onBack = () => {},
  initialData = {},
  isEditMode = false,
}) {
  const [featureImage, setFeatureImage] = useState(null);
  const [featurePreview, setFeaturePreview] = useState(null);
  const [photos, setPhotos] = useState([]);
  const featureRef = useRef(null);
  const photosRef = useRef(null);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      // Load existing feature image
      if (initialData.featureImage) {
        setFeaturePreview(initialData.featureImage);
      }
      // Load existing images
      if (initialData.images && initialData.images.length > 0) {
        const existingPhotos = initialData.images.map((img, i) => ({
          id: img.id || `existing-${i}`,
          src: img.image || img,
          isExisting: true,
        }));
        setPhotos(existingPhotos);
      }
    }
  }, [initialData]);

  const handleChooseFeature = () => {
    featureRef.current?.click();
  };

  const handleFeatureFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeatureImage(file);
    setFeaturePreview(URL.createObjectURL(file));
    e.target.value = null;
  };

  const handleChoosePhotos = () => {
    photosRef.current?.click();
  };

  const handlePhotosFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newPhotos = files.map((f, i) => ({
      id: Date.now() + i,
      src: URL.createObjectURL(f),
      file: f,
      isExisting: false,
    }));
    setPhotos((p) => [...p, ...newPhotos]);
    e.target.value = null;
  };

  const handleRemovePhoto = (photoId) => {
    setPhotos((p) => p.filter((photo) => photo.id !== photoId));
  };

  const totalPhotos = photos.length;
  const meetsMinimum = totalPhotos >= 3;

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Property Photos
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Upload a feature image and at least 3 property photos
        </p>

        {/* Feature Image Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Feature Image <span className="text-rose-500">*</span>
          </h3>
          <div className="border-2 border-slate-200 rounded-lg p-6 text-center">
            {featurePreview ? (
              <div className="relative">
                <img
                  src={featurePreview}
                  alt="Feature"
                  className="mx-auto h-48 w-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={handleChooseFeature}
                  className="mt-3 px-4 py-2 rounded bg-[#18aa99] text-white text-sm"
                >
                  Change Feature Image
                </button>
              </div>
            ) : (
              <>
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
                  Upload your main property photo
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleChooseFeature}
                    className="px-4 py-2 rounded bg-[#18aa99] text-white text-sm"
                  >
                    Choose Feature Image
                  </button>
                </div>
              </>
            )}
            <input
              ref={featureRef}
              type="file"
              onChange={handleFeatureFile}
              accept="image/*"
              className="hidden"
            />
            <div className="mt-3 text-xs text-slate-400">
              JPG, PNG up to 10MB
            </div>
          </div>
        </div>

        {/* Additional Photos Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Additional Photos (min. 3)
          </h3>
          <div className="border-2 border-slate-200 rounded-lg p-6 text-center">
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
                onClick={handleChoosePhotos}
                className="px-4 py-2 rounded bg-[#18aa99] text-white text-sm"
              >
                Choose Files
              </button>
            </div>
            <input
              ref={photosRef}
              type="file"
              onChange={handlePhotosFiles}
              accept="image/*"
              multiple
              className="hidden"
            />
            <div className="mt-4 text-xs text-slate-400">
              JPG, PNG up to 10MB each
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800">
              Uploaded Photos
            </h3>
            <div className="text-sm text-slate-500">
              {meetsMinimum
                ? "✓ Minimum requirement met"
                : `${totalPhotos}/3 minimum required`}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(p.id)}
                  className="absolute top-2 right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                  title="Remove photo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleChoosePhotos}
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
              onNext({ featureImage, featurePreview, images: photos })
            }
            color="green"
            size="md"
            rounded={false}
            disabled={!featurePreview || !meetsMinimum}
          >
            Next: Highly Recommended Reports
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PropertyPhotos;
