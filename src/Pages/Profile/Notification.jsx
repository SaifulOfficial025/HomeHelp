import React, { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function Notification() {
  const [prefs, setPrefs] = useState({
    email: true,
    sms: false,
    report: true,
    marketing: false,
  });

  const handleToggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    // Placeholder: wire to API
    alert("Preferences saved (placeholder)");
  };

  const Switch = ({ checked, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-11 h-6 rounded-full flex items-center transition px-1 ${
        checked ? "bg-[#18aa99]" : "bg-slate-200"
      }`}
      aria-checked={checked}
      role="switch"
    >
      <span
        className={`h-5 w-5 rounded-full bg-white shadow transform transition ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-4 sm:p-8 border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
          Notification Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Choose how you want to be notified
        </p>

        <div className="mt-6 sm:mt-8 bg-slate-50 rounded-xl p-4 sm:p-6">
          <div className="font-semibold text-slate-800 mb-3 sm:mb-4 text-sm sm:text-base">
            Notification Channels
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <FaEnvelope /> Email Notifications
                </div>
                <div className="text-xs text-slate-500">
                  Receive notifications via email
                </div>
              </div>
              <Switch
                checked={prefs.email}
                onClick={() => handleToggle("email")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <FaPhone /> SMS Notifications
                </div>
                <div className="text-xs text-slate-500">
                  Receive notifications via SMS
                </div>
              </div>
              <Switch checked={prefs.sms} onClick={() => handleToggle("sms")} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="font-semibold text-slate-800 mb-4">
            What to notify me about
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-700">
                Report updates and new documents
              </div>
              <Switch
                checked={prefs.report}
                onClick={() => handleToggle("report")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-slate-700">
                Marketing emails and newsletters
              </div>
              <Switch
                checked={prefs.marketing}
                onClick={() => handleToggle("marketing")}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#18aa99] hover:bg-[#139a89] text-white font-semibold px-6 py-3 rounded-lg text-base transition"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
