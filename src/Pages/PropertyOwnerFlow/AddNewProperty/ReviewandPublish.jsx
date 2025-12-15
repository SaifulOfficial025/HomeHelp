import React from "react";
import Button from "../../../Shared/Button";
import dummyimg from "../../../../public/propertydummyimage.jpg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

function ReviewandPublish({
  property = {
    title: "Modern Waterfront Villa",
    address: "123 Seaside Avenue, Bondi Beach NSW 2026",
    beds: 4,
    baths: 3,
    parking: 2,
    year: 2018,
    cover: dummyimg,
  },
  photos = [],
  mandatory = [
    "Building Inspection",
    "Pest & Termite",
    "Building Inspection",
    "Pest & Termite",
  ],
  optional = ["Pool Compliance", "Smoke Alarm"],
  onBack = () => {},
  onPublish = () => {},
}) {
  const basicComplete = Boolean(property.title && property.address);
  const photosComplete = photos.length >= 3;
  const mandatoryComplete = mandatory.length >= 4;

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
            src={property.cover}
            alt="cover"
            className="w-full h-64 md:h-64 object-cover rounded-lg"
          />
          <div className="absolute left-6 top-24 bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 md:p-6 w-[90%] md:w-3/5">
            <div className="text-lg md:text-xl font-semibold text-slate-800">
              {property.title}
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {property.address}
            </div>
            <div className="text-xs text-slate-600 mt-3">
              {property.beds} beds • {property.baths} baths • {property.parking}{" "}
              parking • Built {property.year}
            </div>
          </div>
        </div>

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
                    {property.title ? property.title : "Not provided"}
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
                    {photos.length} photos uploaded (minimum 3 required)
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
                    {mandatory.length}/4 reports uploaded
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3 rounded bg-slate-50">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                    {optional.length}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-slate-800">
                    Optional Reports
                  </div>
                  <div className="text-xs text-slate-500">
                    {optional.length} additional documents
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
                  {mandatory.length}/4
                </div>
              </div>
              <ul className="text-sm text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  Building Inspection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  Pest & Termite
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  Electrical Safety
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">
                    <IoMdCheckmarkCircleOutline />
                  </span>
                  Plumbing & Gas
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border-2 border-[#c6e0ff] rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-slate-800">
                  Optional Reports
                </div>
                <div className="text-sm text-blue-700 bg-white rounded px-2 py-0.5 font-medium">
                  {optional.length} added
                </div>
              </div>
              <ul className="text-sm text-slate-700 space-y-2">
                {optional.length ? (
                  optional.map((o) => (
                    <li key={o} className="flex items-center gap-2">
                      <span className="text-blue-600">
                        <IoMdCheckmarkCircleOutline />
                      </span>
                      {o}
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">No optional reports added</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`mt-6 p-4 rounded-lg  ${
            mandatoryComplete
              ? "bg-green-50 border-2 border-[#b9f8cf]"
              : "bg-slate-50"
          }`}
        >
          <div className="flex items-start gap-3 ">
            {mandatoryComplete && (
              <div className="flex-shrink-0 text-green-600 text-xl">
                <IoMdCheckmarkCircleOutline />
              </div>
            )}
            <div>
              <div className="font-bold text-[#0d542b] text-xl ">
                {mandatoryComplete
                  ? "Ready to Publish!"
                  : "Missing required documents"}
              </div>
              <div className="text-sm text-[#0d542b] mt-1">
                {mandatoryComplete
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
          >
            Back
          </button>
          <Link to="/my_properties">
            <Button
              onClick={onPublish}
              color="green"
              size="md"
              rounded={false}
              disabled={!mandatoryComplete}
            >
              Generate QR & Publish
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReviewandPublish;
