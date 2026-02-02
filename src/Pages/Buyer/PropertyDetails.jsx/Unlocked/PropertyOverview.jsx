import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaCar,
  FaExpandArrowsAlt,
  FaCheckCircle,
  FaCalendarAlt,
  FaDownload,
} from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import BookInspectionModal from "./BookInspectionModal";
import BookInspectionModal2 from "./BookInspectionModal2";
import { useProperty } from "./Layout";

function PropertyOverview() {
  const property = useProperty();
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [toast, setToast] = useState("");

  return (
    <div className="bg-white rounded-2xl shadow p-8 border border-slate-100 w-full max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-3xl font-extrabold text-slate-800 mb-1">
            {property.propertyName}
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-base mb-2">
            <FaMapMarkerAlt />
            <span>{property.propertyAddress}</span>
          </div>
        </div>
        {property.unlock_price && (
          <div className="text-right mt-2">
            <div className="text-2xl text-slate-800">
              ${property.unlock_price}
            </div>
            <div className="text-xs text-slate-500">Unlock Price</div>
          </div>
        )}
      </div>
      <hr className="my-4 border-slate-200" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaBed className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">
            {property.propertyBedrooms || 0}
          </div>
          <div className="text-xs text-slate-500">Bedrooms</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaBath className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">
            {property.propertyBathrooms || 0}
          </div>
          <div className="text-xs text-slate-500">Bathrooms</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaCar className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">
            {property.propertyParking || 0}
          </div>
          <div className="text-xs text-slate-500">Parking</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaCalendarAlt className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">
            {property.propertyBuildYear || "N/A"}
          </div>
          <div className="text-xs text-slate-500">Build Year</div>
        </div>
      </div>
      <hr className="my-4 border-slate-200" />
      <div className="text-xl font-extrabold text-slate-800 mb-2">
        Property Overview
      </div>
      <div className="mb-6">
        {/* Property Type and Features */}
        {/* {property.features && property.features.length > 0 ? (
          <ul className="mb-3">
            {property.features.map((f, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-slate-700 mb-1"
              >
                <IoMdCheckmarkCircleOutline className="text-[#18aa99]" />{" "}
                {f.feature}
              </li>
            ))}
          </ul>
        ) : (
          <p className="flex items-center gap-2 text-slate-700 mb-1">
            <IoMdCheckmarkCircleOutline className="text-[#18aa99]" />{" "}
            {property.propertyType} property
          </p>
        )} */}

        {/* Pool and Strata Property Info */}
        {property.propertyHasPool && (
          <p className="flex items-center gap-2 text-slate-700 mb-1">
            <IoMdCheckmarkCircleOutline className="text-[#18aa99]" /> Swimming
            pool available
          </p>
        )}
        {property.propertyIsStrataProperty && (
          <p className="flex items-center gap-2 text-slate-700 mb-1">
            <IoMdCheckmarkCircleOutline className="text-[#18aa99]" /> Strata
            property
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="flex-1 bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold py-3 rounded-lg text-base flex items-center justify-center gap-2 transition"
          onClick={() => setShowModal1(true)}
        >
          <FaCalendarAlt /> Book Inspection
        </button>
      </div>

      {showModal1 && (
        <BookInspectionModal
          propertyId={property.id}
          onClose={() => setShowModal1(false)}
          onContinue={(timeStr, success) => {
            if (success) {
              setShowModal1(false);
              setToast(`✓ Inspection booked successfully for ${timeStr}`);
              setTimeout(() => setToast(""), 5000);
            }
          }}
        />
      )}

      {showModal2 && (
        <BookInspectionModal2
          selectedTime={selectedTime}
          onBack={() => {
            setShowModal2(false);
            setShowModal1(true);
          }}
          onClose={() => setShowModal2(false)}
          onConfirm={(timeStr) => {
            setShowModal2(false);
            setToast(`Booking Confirmed on ${timeStr}`);
            setTimeout(() => setToast(""), 4000);
          }}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-up">
          {toast}
        </div>
      )}
    </div>
  );
}

export default PropertyOverview;
