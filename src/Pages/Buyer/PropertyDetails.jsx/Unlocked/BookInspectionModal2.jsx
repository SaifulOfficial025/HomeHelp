import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

function BookInspectionModal2({ selectedTime, onBack, onClose, onConfirm }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#133a5c] to-[#1a2a38] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-white text-lg" />
            <div>
              <div className="text-white font-bold text-lg">
                Book Inspection
              </div>
              <div className="text-xs text-slate-200">
                Modern Waterfront Villa
              </div>
            </div>
          </div>
          <button className="text-white text-xl hover:text-slate-200">
            <FaTimes />
          </button>
        </div>
        {/* Body */}
        <div className="p-6">
          <div className="bg-[#e6faf7] border border-[#18aa99] rounded-lg px-4 py-3 flex items-center justify-between mb-5">
            <div>
              <div className="text-xs text-slate-500 mb-1">Selected Time</div>
              <div className="font-semibold text-slate-700">
                Wed, Dec 10 at 2:00 PM
              </div>
            </div>
            <button className="text-[#18aa99] font-semibold text-sm hover:underline">
              Change
            </button>
          </div>
          <div className="text-base font-bold text-slate-800 mb-3">
            Your details
          </div>
          <form className="flex flex-col gap-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-slate-300 text-lg" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#18aa99] text-base"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-slate-300 text-lg" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#18aa99] text-base"
              />
            </div>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3 text-slate-300 text-lg" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+61 4XX XXX XXX"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#18aa99] text-base"
              />
            </div>
          </form>
          <div className="bg-[#e6f0fa] text-[#2563eb] text-xs rounded-lg px-4 py-3 mt-4">
            <span className="font-bold">Note:</span> You'll receive a
            confirmation email and SMS reminder 24 hours before your inspection.
          </div>
        </div>
        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            className="flex-1 bg-slate-100 text-slate-500 font-semibold py-3 rounded-lg text-base hover:bg-slate-200"
            onClick={() => onBack && onBack()}
          >
            Back
          </button>
          <button
            className="flex-1 bg-[#18aa99] text-white font-semibold py-3 rounded-lg text-base transition hover:bg-[#139a89]"
            onClick={() => {
              const timeStr = selectedTime || "the selected time";
              if (onConfirm)
                onConfirm(timeStr + (form.name ? ` - ${form.name}` : ""));
            }}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookInspectionModal2;
