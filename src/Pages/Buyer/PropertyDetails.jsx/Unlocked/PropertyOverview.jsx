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

function PropertyOverview() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [toast, setToast] = useState("");

  const features = [
    "Double-brick house with modern finishes and premium fixtures",
    "Close to transport, schools, and Bondi Beach",
    "Spacious family layout with open-plan living",
  ];
  return (
    <div className="bg-white rounded-2xl shadow p-8 border border-slate-100 w-full max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-3xl font-extrabold text-slate-800 mb-1">
            Elegant Family Home
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-base mb-2">
            <FaMapMarkerAlt />
            <span>45 Oak Street, Paddington NSW 2021</span>
          </div>
        </div>
        <div className="text-right mt-2">
          <div className="text-2xl  text-slate-800">$2.5M</div>
          <div className="text-xs text-slate-500">Negotiable</div>
        </div>
      </div>
      <hr className="my-4 border-slate-200" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaBed className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">3</div>
          <div className="text-xs text-slate-500">Bedrooms</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaBath className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">2</div>
          <div className="text-xs text-slate-500">Bathrooms</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaCar className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">2</div>
          <div className="text-xs text-slate-500">Parking</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-slate-100 rounded-lg p-3 mb-1">
            <FaExpandArrowsAlt className="text-slate-400 text-2xl" />
          </div>
          <div className="text-xl font-bold text-slate-800">450</div>
          <div className="text-xs text-slate-500">sqm</div>
        </div>
      </div>
      <hr className="my-4 border-slate-200" />
      <div className="text-xl font-extrabold text-slate-800 mb-2">
        Property Overview
      </div>
      <ul className="mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-slate-700 mb-1">
            <IoMdCheckmarkCircleOutline className="text-[#18aa99]" /> {f}
          </li>
        ))}
      </ul>
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
          onClose={() => setShowModal1(false)}
          onContinue={(timeStr) => {
            setSelectedTime(timeStr);
            setShowModal1(false);
            setShowModal2(true);
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
        <div className="fixed bottom-6 right-6 bg-[#133a5c] text-white px-4 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default PropertyOverview;
