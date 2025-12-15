import React, { useState } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

const schedule = [
  {
    date: "Mon, Dec 8",
    slots: [
      { time: "10:00 AM", booked: true },
      { time: "11:00 AM", booked: true },
      { time: "2:00 PM", booked: false },
      { time: "3:00 PM", booked: false },
      { time: "4:00 PM", booked: false },
    ],
  },
  {
    date: "Tue, Dec 9",
    slots: [
      { time: "10:00 AM", booked: false },
      { time: "11:00 AM", booked: false },
      { time: "2:00 PM", booked: true },
      { time: "3:00 PM", booked: false },
      { time: "4:00 PM", booked: false },
    ],
  },
  {
    date: "Wed, Dec 10",
    slots: [
      { time: "10:00 AM", booked: true },
      { time: "11:00 AM", booked: false },
      { time: "2:00 PM", booked: false },
      { time: "3:00 PM", booked: false },
      { time: "4:00 PM", booked: false },
    ],
  },
];

function BookInspectionModal({ onClose, onContinue }) {
  const [selected, setSelected] = useState({ dateIdx: null, slotIdx: null });

  const handleSelect = (dateIdx, slotIdx, booked) => {
    if (!booked) setSelected({ dateIdx, slotIdx });
  };

  const getSelectedTimeString = () => {
    if (selected.dateIdx === null) return "";
    const day = schedule[selected.dateIdx];
    const slot = day.slots[selected.slotIdx];
    return `${day.date} at ${slot.time}`;
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
          {schedule.map((day, dateIdx) => (
            <div key={day.date} className="mb-4">
              <div className="font-semibold text-slate-700 mb-2">
                {day.date}
              </div>
              <div className="flex flex-wrap gap-3">
                {day.slots.map((slot, slotIdx) => {
                  const isSelected =
                    selected.dateIdx === dateIdx &&
                    selected.slotIdx === slotIdx;
                  return (
                    <button
                      key={slot.time}
                      disabled={slot.booked}
                      onClick={() =>
                        handleSelect(dateIdx, slotIdx, slot.booked)
                      }
                      className={`px-5 py-2 rounded-lg border text-base font-medium transition shadow-sm min-w-[110px] ${
                        slot.booked
                          ? "bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-[#18aa99] text-white border-[#18aa99]"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {slot.time}{" "}
                      {slot.booked && (
                        <span className="text-xs ml-1">Booked</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button
            className="flex-1 bg-slate-100 text-slate-500 font-semibold py-3 rounded-lg text-base hover:bg-slate-200"
            onClick={() => onClose && onClose()}
          >
            Cancel
          </button>
          <button
            className={`flex-1 bg-[#18aa99] text-white font-semibold py-3 rounded-lg text-base transition ${
              selected.dateIdx === null
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#139a89]"
            }`}
            disabled={selected.dateIdx === null}
            onClick={() => {
              const timeStr = getSelectedTimeString();
              if (onContinue && timeStr) onContinue(timeStr);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookInspectionModal;
