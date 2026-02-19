import React from "react";
import { FaShieldAlt } from "react-icons/fa";

function SecureAccess() {
  return (
    <div className="bg-[#edf6f6] border-2 border-[#c4ebe7] rounded-xl p-4 sm:p-6 max-w-md flex gap-3 sm:gap-4 items-start">
      <FaShieldAlt className="text-[#18aa99] text-xl sm:text-2xl mt-1" />
      <div>
        <div className="text-lg sm:text-xl font-extrabold text-slate-800 mb-2">
          Secure Access
        </div>
        <ul className="text-slate-600 text-sm sm:text-base list-disc pl-5">
          <li>Documents protected by unique token</li>
          {/* <li>Download links expire in 5 minutes</li> */}
          <li>Read-only access</li>
        </ul>
      </div>
    </div>
  );
}

export default SecureAccess;
