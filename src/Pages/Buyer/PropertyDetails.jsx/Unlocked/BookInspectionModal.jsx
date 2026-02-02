import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import { bookInspection } from "../../../../Redux/BookInspection";

// Generate dynamic schedule based on current date/time
const generateSchedule = () => {
  const schedule = [];
  const now = new Date();
  const timeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

  // Generate next 5 days starting from today
  for (let i = 0; i < 5; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);

    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    schedule.push({
      date: `${dayName}, ${monthDay}`,
      fullDate: date,
      slots: timeSlots.map((time) => ({
        time,
        booked: false, // All slots are available by default
      })),
    });
  }

  return schedule;
};

function BookInspectionModal({ onClose, onContinue, propertyId }) {
  const [schedule, setSchedule] = useState([]);
  const [selected, setSelected] = useState({ dateIdx: null, slotIdx: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customMode, setCustomMode] = useState(false);
  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");

  useEffect(() => {
    setSchedule(generateSchedule());
    // Set default custom date to today
    const today = new Date().toISOString().split("T")[0];
    setCustomDate(today);
    // Set default time to 10:00
    setCustomTime("10:00");
  }, []);

  const handleSelect = (dateIdx, slotIdx, booked) => {
    if (!booked) {
      setSelected({ dateIdx, slotIdx });
      setError("");
      setCustomMode(false);
    }
  };

  const handleCustomModeToggle = () => {
    setCustomMode(!customMode);
    if (!customMode) {
      setSelected({ dateIdx: null, slotIdx: null });
    }
    setError("");
  };

  const getSelectedTimeString = () => {
    if (customMode) {
      const date = new Date(customDate);
      const dateStr = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      // Convert 24h to 12h format
      const [hours, minutes] = customTime.split(":");
      const hour = parseInt(hours);
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${dateStr} at ${hour12}:${minutes} ${period}`;
    }
    if (selected.dateIdx === null) return "";
    const day = schedule[selected.dateIdx];
    const slot = day.slots[selected.slotIdx];
    return `${day.date} at ${slot.time}`;
  };

  const convertToISO = (dateIdx, slotIdx) => {
    if (customMode) {
      // Handle custom date/time
      const [hours, minutes] = customTime.split(":");
      const date = new Date(customDate);
      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return date.toISOString();
    }

    const day = schedule[dateIdx];
    const slot = day.slots[slotIdx];

    const date = new Date(day.fullDate);

    // Parse time (e.g., "10:00 AM")
    const [time, period] = slot.time.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    date.setHours(hours, minutes, 0, 0);

    return date.toISOString();
  };

  const handleContinue = async () => {
    if (!customMode && selected.dateIdx === null) return;
    if (customMode && (!customDate || !customTime)) return;

    setLoading(true);
    setError("");

    try {
      const inspection_datetime = convertToISO(
        selected.dateIdx,
        selected.slotIdx,
      );
      const timeStr = getSelectedTimeString();

      await bookInspection(propertyId, inspection_datetime);

      // Call parent callback with success
      if (onContinue) {
        onContinue(timeStr, true);
      }
    } catch (err) {
      setError(err.message || "Failed to book inspection");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  const isValidSelection = customMode
    ? customDate && customTime
    : selected.dateIdx !== null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#133a5c] to-[#1a2a38] px-6 py-4 flex items-center justify-between flex-shrink-0">
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
          <button
            className="text-white text-xl hover:text-slate-200"
            onClick={() => onClose && onClose()}
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Toggle between preset and custom */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setCustomMode(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                !customMode
                  ? "bg-[#18aa99] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Quick Select
            </button>
            <button
              onClick={handleCustomModeToggle}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                customMode
                  ? "bg-[#18aa99] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Custom Date & Time
            </button>
          </div>

          {customMode ? (
            /* Custom Date & Time Picker */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18aa99] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Time
                </label>
                <input
                  type="time"
                  value={customTime}
                  onChange={(e) => setCustomTime(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#18aa99] focus:border-transparent"
                />
              </div>
              {customDate && customTime && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">Selected:</span>{" "}
                    {getSelectedTimeString()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Preset Schedule */
            <div>
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
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6 flex-shrink-0 border-t border-slate-100 pt-4">
          <button
            className="flex-1 bg-slate-100 text-slate-500 font-semibold py-3 rounded-lg text-base hover:bg-slate-200"
            onClick={() => onClose && onClose()}
          >
            Cancel
          </button>
          <button
            className={`flex-1 bg-[#18aa99] text-white font-semibold py-3 rounded-lg text-base transition ${
              !isValidSelection || loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#139a89]"
            }`}
            disabled={!isValidSelection || loading}
            onClick={handleContinue}
          >
            {loading ? "Booking..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookInspectionModal;
