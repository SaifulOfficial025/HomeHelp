import React, { useState, useEffect } from "react";
import Button from "../../../Shared/Button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { createProperty, updateProperty } from "../../../Redux/PropertyAddEdit";

function ReviewandPublish({
  formData: propsFormData = {},
  onBack = () => {},
  isEditMode = false,
  editSlug = null,
  onSuccess = () => {},
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [displayData, setDisplayData] = useState({});

  useEffect(() => {
    // Load display data from localStorage for UI (doesn't include actual files)
    const saved = localStorage.getItem("propertyFormData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDisplayData(parsed);
      } catch (err) {
        console.error("Error parsing form data:", err);
      }
    }
  }, []);

  // Use propsFormData for actual file submission, displayData for UI
  const formData = Object.keys(propsFormData).length > 0 ? propsFormData : {};
  const uiData = Object.keys(displayData).length > 0 ? displayData : formData;

  const {
    basicInfo = {},
    photos = {},
    mandatoryReports = [],
    optionalReports = {},
  } = uiData;

  const photosCount = photos.images?.length || 0;
  const mandatoryCount = mandatoryReports.filter((r) => r).length;
  const optionalCount = optionalReports.files?.filter((f) => f).length || 0;
  const featuresCount = optionalReports.features?.length || 0;

  const basicComplete = Boolean(
    basicInfo.propertyName && basicInfo.propertyAddress,
  );
  const photosComplete = photos.featurePreview && photosCount >= 3;
  const mandatoryComplete = mandatoryCount >= 4;
  const canPublish = basicComplete && photosComplete && mandatoryComplete;

  const handlePublish = async () => {
    if (!canPublish) {
      alert("Please complete all required sections");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload = new FormData();

      // Use actual formData from props (has real File objects)
      const actualData = formData;

      // Basic info
      Object.keys(actualData.basicInfo || {}).forEach((key) => {
        payload.append(key, actualData.basicInfo[key]);
      });

      // Feature image
      if (actualData.photos?.featureImage) {
        if (typeof actualData.photos.featureImage === "string") {
          // Skip existing URL in edit mode
        } else {
          payload.append(
            "propertyFeatureImage",
            actualData.photos.featureImage,
          );
        }
      }

      // Multiple images
      if (actualData.photos?.images && actualData.photos.images.length > 0) {
        actualData.photos.images.forEach((img) => {
          if (img.file) {
            payload.append("images", img.file);
          }
        });
      }

      // Mandatory reports (inspection_reports)
      (actualData.mandatoryReports || []).forEach((report) => {
        if (report && report.file) {
          payload.append("inspection_reports", report.file);
        }
      });

      // Optional reports
      if (actualData.optionalReports?.files) {
        actualData.optionalReports.files.forEach((report) => {
          if (report && report.file) {
            payload.append("optional_reports", report.file);
          }
        });
      }

      // Features
      if (
        actualData.optionalReports?.features &&
        actualData.optionalReports.features.length > 0
      ) {
        actualData.optionalReports.features.forEach((feature) => {
          if (feature.trim()) {
            payload.append("features", feature);
          }
        });
      }

      let result;
      if (isEditMode && editSlug) {
        result = await updateProperty(editSlug, payload);
      } else {
        result = await createProperty(payload);
      }

      // Clear localStorage after successful submission
      localStorage.removeItem("propertyFormData");

      alert(
        isEditMode
          ? "Property updated successfully!"
          : "Property created successfully!",
      );
      onSuccess();
    } catch (err) {
      console.error("Error publishing property:", err);
      setError(err.message || "Failed to publish property");
      alert("Error: " + (err.message || "Failed to publish property"));
    } finally {
      setSubmitting(false);
    }
  };

  const coverImage =
    photos.featurePreview || photos.featureImage || "/propertydummyimage.jpg";

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-white rounded-2xl shadow p-8 border border-slate-100">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Review & Publish
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Review your property details before generating the QR code
        </p>

        <div className="mt-6 relative">
          <img
            src={coverImage}
            alt="cover"
            className="w-full h-64 md:h-64 object-cover rounded-lg"
          />
          <div className="absolute left-6 top-24 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 md:p-6 w-[90%] md:w-3/5">
            <div className="text-lg md:text-xl font-semibold text-slate-800">
              {basicInfo.propertyName || "Property Name"}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {basicInfo.propertyAddress || "Address not provided"}
            </div>
            <div className="text-xs text-slate-600 mt-3">
              {basicInfo.propertyBedrooms || "..."} beds •{" "}
              {basicInfo.propertyBathrooms || "..."} baths •{" "}
              {basicInfo.propertyParking || "..."} parking • Built{" "}
              {basicInfo.propertyBuildYear || "..."}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-6">
          <div className="mb-4">
            <div className="font-semibold text-slate-800 mb-3">
              Completion Checklist
            </div>
            <ul className="space-y-3">
              <li
                className={`flex items-start gap-3 p-3 rounded ${
                  basicComplete
                    ? "bg-bg-[#f0fdf4] text-black border border-[#46d379] rounded-lg"
                    : "bg-slate-50"
                }`}
              >
                <div className="flex-shrink-0 ">
                  <div className="h-8 w-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                    <IoMdCheckmarkCircleOutline />
                  </div>
                </div>
                <div className="">
                  <div className="font-medium text-slate-800">
                    Basic Information
                  </div>
                  <div className="text-xs text-slate-500">
                    {basicInfo.propertyName
                      ? basicInfo.propertyName
                      : "Not provided"}
                  </div>
                </div>
              </li>

              <li
                className={`flex items-start gap-3 p-3 rounded ${
                  photosComplete
                    ? "bg-green-50 border border-green-100"
                    : "bg-slate-50"
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`h-8 w-8 rounded-full ${
                      photosComplete
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-600"
                    } flex items-center justify-center`}
                  >
                    <IoMdCheckmarkCircleOutline />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-slate-800">
                    Property Photos
                  </div>
                  <div className="text-xs text-slate-500">
                    Feature image: {photos.featureImage ? "✓" : "✗"} |{" "}
                    {photosCount} additional photos (min. 3)
                  </div>
                </div>
              </li>

              <li
                className={`flex items-start gap-3 p-3 rounded ${
                  mandatoryComplete
                    ? "bg-green-50 border border-green-100"
                    : "bg-slate-50"
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`h-8 w-8 rounded-full ${
                      mandatoryComplete
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-600"
                    } flex items-center justify-center`}
                  >
                    <IoMdCheckmarkCircleOutline />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-slate-800">
                    Mandatory Reports
                  </div>
                  <div className="text-xs text-slate-500">
                    {mandatoryCount}/4 reports uploaded
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3 rounded bg-slate-50">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                    {optionalCount}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-slate-800">
                    Optional Reports & Features
                  </div>
                  <div className="text-xs text-slate-500">
                    {optionalCount} reports • {featuresCount} features
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f3fbfa] border-2 border-[#c6eee9] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-slate-800">
                  Mandatory Reports
                </div>
                <div className="text-sm text-green-700 bg-[#dcfce7]  rounded px-2 py-0.5 font-medium">
                  {mandatoryCount}/4
                </div>
              </div>
              <ul className="text-sm text-slate-700 space-y-2">
                {[
                  "Building Inspection",
                  "Pest & Termite",
                  "Electrical Safety",
                  "Plumbing & Gas",
                ].map((label, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span
                      className={
                        mandatoryReports[i]
                          ? "text-green-600"
                          : "text-slate-400"
                      }
                    >
                      <IoMdCheckmarkCircleOutline />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-[#c6e0ff] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-slate-800">
                  Optional Reports
                </div>
                <div className="text-sm text-blue-700 bg-white rounded px-2 py-0.5 font-medium">
                  {optionalCount} added
                </div>
              </div>
              <ul className="text-sm text-slate-700 space-y-2">
                {optionalCount > 0 ? (
                  optionalReports.files
                    ?.filter((f) => f)
                    .map((report, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-blue-600">
                          <IoMdCheckmarkCircleOutline />
                        </span>
                        {report.isExisting
                          ? "Existing Report"
                          : report.file?.name || "Report"}
                      </li>
                    ))
                ) : (
                  <li className="text-slate-400">No optional reports added</li>
                )}
              </ul>
              {featuresCount > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs font-semibold text-slate-700 mb-1">
                    Features:
                  </div>
                  <div className="text-xs text-slate-600">
                    {optionalReports.features?.join(", ")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`mt-6 p-4 rounded-lg  ${
            canPublish ? "bg-green-50 border-2 border-[#b9f8cf]" : "bg-slate-50"
          }`}
        >
          <div className="flex items-start gap-3 ">
            {canPublish && (
              <div className="flex-shrink-0 text-green-600 text-xl">
                <IoMdCheckmarkCircleOutline />
              </div>
            )}
            <div>
              <div className="font-bold text-[#0d542b] text-xl ">
                {canPublish
                  ? "Ready to Publish!"
                  : "Missing required documents"}
              </div>
              <div className="text-sm text-[#0d542b] mt-1">
                {canPublish
                  ? "All mandatory requirements met. You can now generate your QR code and start sharing verified property data with buyers."
                  : "Please upload all mandatory reports to enable publishing."}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-md border border-slate-200 text-sm text-slate-700 bg-white"
            disabled={submitting}
          >
            Back
          </button>
          <Button
            onClick={handlePublish}
            color="green"
            size="md"
            rounded={false}
            disabled={!canPublish || submitting}
          >
            {submitting
              ? "Publishing..."
              : isEditMode
                ? "Update Property"
                : "Generate QR & Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewandPublish;
