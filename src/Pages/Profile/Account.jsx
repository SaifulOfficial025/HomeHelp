import React from "react";
import { FaCheckCircle, FaExclamationCircle, FaTrashAlt } from "react-icons/fa";

function Account() {
  // These would be dynamic in a real app
  const memberSince = "December 2024";
  const accountId = "gwdcobw9";

  const handleDelete = () => {
    // Placeholder for delete logic
    alert("Account deletion not implemented (placeholder)");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold text-slate-800 mb-6">
        Account Management
      </h2>

      {/* Account Status Card */}
      <div className="bg-white rounded-2xl shadow p-7 border border-slate-100 mb-8">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-800 mb-1">
          <FaCheckCircle className="text-green-500 text-xl" />
          Account Status
        </div>
        <div className="text-slate-500 text-sm mb-6">
          Your account is active and verified
        </div>
        <div className="flex flex-wrap gap-8">
          <div>
            <div className="text-slate-500 text-sm">Member Since</div>
            <div className="text-lg font-semibold text-slate-800">
              {memberSince}
            </div>
          </div>
          <div>
            <div className="text-slate-500 text-sm">Account ID</div>
            <div className="text-lg font-semibold text-slate-800">
              {accountId}
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-red-200 bg-red-50 rounded-2xl p-7">
        <div className="flex items-center gap-2 text-xl font-bold text-red-600 mb-1">
          <FaExclamationCircle className="text-red-500 text-2xl" />
          Danger Zone
        </div>
        <div className="text-slate-700 text-sm mb-6">
          Once you delete your account, there is no going back. Please be
          certain.
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 border-2 border-red-400 text-red-600 font-semibold px-6 py-3 rounded-lg text-base transition hover:bg-red-100 hover:border-red-500"
        >
          <FaTrashAlt className="text-lg" />
          Delete My Account
        </button>
      </div>
    </div>
  );
}

export default Account;
